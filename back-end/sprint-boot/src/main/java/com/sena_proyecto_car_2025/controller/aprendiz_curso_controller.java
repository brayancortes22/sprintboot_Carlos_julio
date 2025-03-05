package com.sena_proyecto_car_2025.controller;
//se importan las librerias necesarias
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sena_proyecto_car_2025.model.aprendiz_curso;
import com.sena_proyecto_car_2025.service.AprendizCursoService;
//se inicia el @RestController para indicar que es un controlador rest
@RestController // indica que es un controlador rest

public class aprendiz_curso_controller {
    @Autowired
    private AprendizCursoService aprendizCursoService;
   // metodo post
   @PostMapping("/aprendiz_curso")
   public String registreraprendiz_curso(@RequestBody aprendiz_curso aprendizCurso) {
       try {
           aprendizCursoService.save(aprendizCurso);
           return "AprendizCurso guardado";
       } catch (Exception e) {
           // Manejo de errores
           return "Error al guardar AprendizCurso: " + e.getMessage();
       }
   }
}
