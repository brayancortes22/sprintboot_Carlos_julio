package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.repository.IAprendiz;

@Service
public class AprendizService{

    //se inyecta el repositorio
    @Autowired
    private IAprendiz IAprendizRepository;
    /*
     * crud
     * create  
     * read list completo
     * road by id
     * update
     * delete
    */
    public boolean save(Aprendiz aprendiz) {
        IAprendizRepository.save(aprendiz);
        return true;
    }
}