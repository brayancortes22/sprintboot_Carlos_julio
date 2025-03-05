package com.sena_proyecto_car_2025.service;
//se importan las librerias necesarias el @Autowired para inyectar el repositorio
//SERVICE para indicar que es un servicio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.model.aprendiz_curso;
import com.sena_proyecto_car_2025.repository.IAprendiz_curso;

//se inicia el @Service para indicar que es un servicio
@Service
public class AprendizCursoService {

    //se inyecta el repositorio
    @Autowired
    private IAprendiz_curso aprendiz_cursoRepository;
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
    
    
}