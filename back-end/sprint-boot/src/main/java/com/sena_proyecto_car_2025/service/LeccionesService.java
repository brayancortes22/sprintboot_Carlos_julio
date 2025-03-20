package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.repository.ILecciones;

@Service
public class LeccionesService {

    @Autowired
    private ILecciones leccionesRepository;

    public boolean save(lecciones leccion) {
        leccionesRepository.save(leccion);
        return true;
    }

    // Obtener todos los registros
    public Iterable<lecciones> findAll() {
        return leccionesRepository.findAll();
    }

    // Obtener un registro por ID
    public lecciones findById(Integer id) {
        return leccionesRepository.findById(id).orElse(null);
    }

    // Actualizar un registro
    public boolean update(lecciones leccion) {
        leccionesRepository.save(leccion);
        return true;
    }

    // Eliminar un registro
    public boolean delete(Integer id) {
        leccionesRepository.deleteById(id);
        return true;
    }
} 