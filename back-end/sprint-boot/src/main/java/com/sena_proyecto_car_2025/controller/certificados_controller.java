package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena_proyecto_car_2025.model.Certificados;
import com.sena_proyecto_car_2025.service.CertificadosService;

@RestController
@RequestMapping("/certificados")
public class certificados_controller {

    @Autowired
    private CertificadosService certificadosService;

    @PostMapping("/Certificados")
    public String registrarCertificado(@RequestBody Certificados certificado) {
        try {
            certificadosService.save(certificado);
            return "Certificado registrado exitosamente";
        } catch (Exception e) {
            return "Error al registrar certificado: " + e.getMessage();
        }
    }
} 