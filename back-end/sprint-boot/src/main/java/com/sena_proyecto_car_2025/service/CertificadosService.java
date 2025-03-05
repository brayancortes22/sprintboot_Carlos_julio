package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.model.Certificados;
import com.sena_proyecto_car_2025.repository.ICertificados;

@Service
public class CertificadosService {

    @Autowired
    private ICertificados certificadosRepository;

    public boolean save(Certificados certificado) {
        certificadosRepository.save(certificado);
        return true;
    }
} 