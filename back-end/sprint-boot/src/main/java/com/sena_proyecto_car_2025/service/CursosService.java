package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.repository.ICursos;

@Service
public class CursosService {

    @Autowired
    private ICursos cursosRepository;

    public boolean save(Cursos curso) {
        cursosRepository.save(curso);
        return true;
    }
} 