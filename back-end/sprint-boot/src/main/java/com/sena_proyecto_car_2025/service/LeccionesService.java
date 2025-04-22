package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.repository.ILecciones;
import java.util.List;

@Service
public class LeccionesService {

    @Autowired
    private ILecciones leccionesRepository;

    public List<lecciones> findAll() {
        return (List<lecciones>) leccionesRepository.findAll();
    }

    public lecciones findById(Integer id) {
        return leccionesRepository.findById(id).orElse(null);
    }

    public lecciones save(lecciones leccion) {
        return leccionesRepository.save(leccion);
    }

    public lecciones update(lecciones leccion) {
        return leccionesRepository.save(leccion);
    }

    public boolean delete(Integer id) {
        try {
            leccionesRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}