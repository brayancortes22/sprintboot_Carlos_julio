package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena_proyecto_car_2025.model.Certificados;
import com.sena_proyecto_car_2025.repository.ICertificados;
import java.util.Optional;

@Service
public class CertificadosService {

    @Autowired
    private ICertificados certificadosRepository;

    public Iterable<Certificados> findAll() {
        return certificadosRepository.findAll();
    }

    public Certificados findById(Integer id) {
        Optional<Certificados> optionalCertificado = certificadosRepository.findById(id);
        return optionalCertificado.orElse(null);
    }

    public Certificados save(Certificados certificado) {
        return certificadosRepository.save(certificado);
    }

    public Certificados update(Certificados certificado) {
        if (certificadosRepository.existsById(certificado.getIdCertificado())) {
            return certificadosRepository.save(certificado);
        }
        return null;
    }

    public boolean delete(Integer id) {
        if (certificadosRepository.existsById(id)) {
            certificadosRepository.deleteById(id);
            return true;
        }
        return false;
    }
}