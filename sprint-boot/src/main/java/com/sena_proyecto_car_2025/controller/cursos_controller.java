package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.service.CursosService;

@RestController
@RequestMapping("/cursos")
public class cursos_controller {

    @Autowired
    private CursosService cursosService;

    @PostMapping("/Cursos")
    public String registrarCurso(@RequestBody Cursos curso) {
        try {
            cursosService.save(curso);
            return "Curso registrado exitosamente";
        } catch (Exception e) {
            return "Error al registrar curso: " + e.getMessage();
        }
    }
} 