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

    // Obtener todos los registros
    public Iterable<Certificados> findAll() {
        return certificadosRepository.findAll();
    }

    // Obtener un registro por ID
    public Certificados findById(Integer id) {
        return certificadosRepository.findById(id).orElse(null);
    }

    // Actualizar un registro
    public boolean update(Certificados certificado) {
        certificadosRepository.save(certificado);
        return true;
    }

    // Eliminar un registro
    public boolean delete(Integer id) {
        certificadosRepository.deleteById(id);
        return true;
    }
} 