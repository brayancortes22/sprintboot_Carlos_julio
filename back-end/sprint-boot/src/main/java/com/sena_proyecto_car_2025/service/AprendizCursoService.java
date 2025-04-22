package com.sena_proyecto_car_2025.service;
//se importan las librerias necesarias el @Autowired para inyectar el repositorio
//SERVICE para indicar que es un servicio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.model.aprendiz_curso;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.repository.IAprendizCurso;
import java.util.List;

//se inicia el @Service para indicar que es un servicio
@Service
public class AprendizCursoService {

    //se inyecta el repositorio
    @Autowired
    private IAprendizCurso aprendiz_cursoRepository;

    /*
     * crud
     * create
     * read list completo
     * road by id
     * update
     * delete
    */
    public boolean save(aprendiz_curso aprendizCurso) {
        aprendiz_cursoRepository.save(aprendizCurso);
        return true;
    }

    // Obtener todos los registros
    public Iterable<aprendiz_curso> findAll() {
        return aprendiz_cursoRepository.findAll();
    }

    // Obtener un registro por ID
    public aprendiz_curso findById(Long id) {
        return aprendiz_cursoRepository.findById(id).orElse(null);
    }

    // Actualizar un registro
    public boolean update(aprendiz_curso aprendizCurso) {
        aprendiz_cursoRepository.save(aprendizCurso);
        return true;
    }

    // Eliminar un registro
    public boolean delete(Long id) {
        aprendiz_cursoRepository.deleteById(id);
        return true;
    }

    // Obtener cursos por aprendiz
    public List<aprendiz_curso> findByAprendiz(Aprendiz aprendiz) {
        return aprendiz_cursoRepository.findByAprendiz(aprendiz);
    }
}