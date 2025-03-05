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
} 