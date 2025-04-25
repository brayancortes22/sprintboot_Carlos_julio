package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.repository.IAprendiz;
import java.util.List;

@Service
public class AprendizService {

    @Autowired
    private IAprendiz aprendizRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Aprendiz> findAll() {
        return (List<Aprendiz>) aprendizRepository.findAll();
    }

    public Aprendiz findById(Integer id) {
        return aprendizRepository.findById(id).orElse(null);
    }

    public Aprendiz save(Aprendiz aprendiz) {
        // Encriptar la contraseña antes de guardar
        String rawPassword = aprendiz.getPassword();
        if (rawPassword != null && !rawPassword.isEmpty()) {
            // Solo encriptar si hay una contraseña y no está ya encriptada
            if (!rawPassword.startsWith("$2a$")) {
                String encodedPassword = passwordEncoder.encode(rawPassword);
                aprendiz.setPassword(encodedPassword);
            }
        }
        return aprendizRepository.save(aprendiz);
    }

    public Aprendiz update(Aprendiz aprendiz) {
        // Verificar si es necesario actualizar la contraseña
        if (aprendiz.getId_aprendiz() > 0) {
            Aprendiz existingAprendiz = findById(aprendiz.getId_aprendiz());
            if (existingAprendiz != null) {
                String newPassword = aprendiz.getPassword();
                // Si la contraseña no ha cambiado o está vacía, mantener la existente
                if (newPassword == null || newPassword.isEmpty()) {
                    aprendiz.setPassword(existingAprendiz.getPassword());
                } 
                // Si ha cambiado y no está encriptada, encriptarla
                else if (!newPassword.startsWith("$2a$")) {
                    String encodedPassword = passwordEncoder.encode(newPassword);
                    aprendiz.setPassword(encodedPassword);
                }
            }
        }
        return aprendizRepository.save(aprendiz);
    }

    public boolean delete(Integer id) {
        try {
            aprendizRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}