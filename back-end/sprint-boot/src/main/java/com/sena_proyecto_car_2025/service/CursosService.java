package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.repository.IAprendizCurso;
import com.sena_proyecto_car_2025.repository.ICursos;
import com.sena_proyecto_car_2025.repository.ILecciones;

@Service
public class CursosService {

    @Autowired
    private ICursos cursosRepository;
    
    @Autowired
    private ILecciones leccionesRepository;
    
    @Autowired
    private IAprendizCurso aprendizCursoRepository;

    public Cursos save(Cursos curso) {
        return cursosRepository.save(curso);
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
    public Cursos update(Cursos curso) {
        if (cursosRepository.existsById(curso.getIdCurso())) {
            return cursosRepository.save(curso);
        }
        return null;
    }

    
}