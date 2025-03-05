package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.service.LeccionesService;

@RestController
@RequestMapping("/lecciones")
public class lecciones_controller {

    @Autowired
    private LeccionesService leccionesService;

    @PostMapping("/Lecciones")
    public String registrarLeccion(@RequestBody lecciones leccion) {
        try {
            leccionesService.save(leccion);
            return "Lección registrada exitosamente";
        } catch (Exception e) {
            return "Error al registrar lección: " + e.getMessage();
        }
    }
} 