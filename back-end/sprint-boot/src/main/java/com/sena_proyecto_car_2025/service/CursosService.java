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

    // Obtener todos los registros
    public Iterable<Cursos> findAll() {
        return cursosRepository.findAll();
    }

    // Obtener un registro por ID
    public Cursos findById(Integer id) {
        return cursosRepository.findById(id).orElse(null);
    }

    // Actualizar un registro
    public boolean update(Cursos curso) {
        cursosRepository.save(curso);
        return true;
    }

    // Eliminar un registro
    public boolean delete(Integer id) {
        cursosRepository.deleteById(id);
        return true;
    }
} 