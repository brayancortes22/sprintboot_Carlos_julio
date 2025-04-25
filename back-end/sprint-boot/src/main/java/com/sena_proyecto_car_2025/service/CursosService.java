package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.repository.IAprendizCurso;
import com.sena_proyecto_car_2025.repository.ICertificados;
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
    
    @Autowired
    private ICertificados certificadosRepository;

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
    //filtar por nombre del curso
    public Iterable<Cursos> findByNombreCurso(String nombreCurso) {
        return cursosRepository.findByNombreCurso(nombreCurso);
    }


    public Cursos findByNombreCursoExacto(String nombreCurso) {
        return cursosRepository.findByNombreCursoExacto(nombreCurso).orElse(null);
    }

    // Eliminar un registro con manejo de dependencias
    @Transactional
    public boolean delete(Integer id) {
        try {
            if (cursosRepository.existsById(id)) {
                // Primero eliminar los certificados asociados a las lecciones del curso
                certificadosRepository.deleteByCursoId(id);
                
                // Luego eliminar las lecciones asociadas al curso
                leccionesRepository.deleteByIdCurso(id);
                
                // Después eliminar todas las inscripciones de aprendices a este curso
                aprendizCursoRepository.deleteByIdCurso(id);
                
                // Finalmente eliminar el curso
                cursosRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            // Registrar el error para diagnóstico
            System.err.println("Error al eliminar curso " + id + ": " + e.getMessage());
            e.printStackTrace();
            return false;
        }

    }
}