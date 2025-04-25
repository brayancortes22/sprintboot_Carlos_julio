package com.sena_proyecto_car_2025.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.repository.IAprendiz;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private IAprendiz aprendizRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        // Filtrar aprendices para encontrar uno con el correo especificado
        Optional<Aprendiz> aprendizOptional = filterAprendizByCorreo(correo);
        
        // Si no se encuentra el aprendiz, lanzar excepción
        Aprendiz aprendiz = aprendizOptional.orElseThrow(() -> 
            new UsernameNotFoundException("Usuario con correo " + correo + " no encontrado"));
        
        // Crear y devolver una instancia de UserDetailsImpl con el aprendiz encontrado
        return new UserDetailsImpl(aprendiz);
    }
    
    // Método auxiliar para filtrar aprendices por correo
    private Optional<Aprendiz> filterAprendizByCorreo(String correo) {
        Iterable<Aprendiz> aprendices = aprendizRepository.findAll();
        for (Aprendiz aprendiz : aprendices) {
            if (aprendiz.getCorreo().equals(correo)) {
                return Optional.of(aprendiz);
            }
        }
        return Optional.empty();
    }
}