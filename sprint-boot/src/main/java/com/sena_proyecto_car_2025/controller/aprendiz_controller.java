package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.service.AprendizService;

@RestController
@RequestMapping("/aprendiz") 
public class aprendiz_controller {

    @Autowired
    private AprendizService aprendizService;
    
    @PostMapping("/Aprendiz")
    public String registrarAprendiz(@RequestBody Aprendiz aprendiz) {
        try {
            aprendizService.save(aprendiz);
            return "Aprendiz registrado";
        } catch (Exception e) {
            return "Error al registrar aprendiz: " + e.getMessage();
        }
    }
}
