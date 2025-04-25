package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sena_proyecto_car_2025.model.Certificados;
import com.sena_proyecto_car_2025.service.CertificadosService;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;
import com.sena_proyecto_car_2025.Dto.CertificadosDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/certificados")
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.1.23:5173", "http://172.30.1.191:5173"}, allowCredentials = "true")
public class certificados_controller {

    @Autowired
    private CertificadosService certificadosService;

    @GetMapping("/obtener")
    public ResponseEntity<GenericResponseDTO<List<Certificados>>> getAllCertificados() {
        try {
            List<Certificados> certificados = new ArrayList<>();
            certificadosService.findAll().forEach(certificados::add);
            
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Certificados obtenidos exitosamente",
                certificados
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al obtener certificados: " + e.getMessage(),
                    null
                ));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<GenericResponseDTO<Certificados>> createCertificado(@RequestBody CertificadosDTO certificadoDTO) {
        try {
            Certificados certificado = new Certificados();
            certificado.setNombreCertificado(certificadoDTO.getNombre_certificado());
            certificado.setNumeroDocumentoCertificado(certificadoDTO.getNumero_documento_certificado());
            certificado.setFechaFin(certificadoDTO.getFecha_fin());
            certificado.setIdAprendiz(certificadoDTO.getId_aprendiz());
            certificado.setIdLecciones(certificadoDTO.getId_lecciones());
            
            Certificados savedCertificado = certificadosService.save(certificado);
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Certificado creado exitosamente",
                savedCertificado
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al crear el certificado: " + e.getMessage(),
                    null
                ));
        }
    }

    @GetMapping("/obtener/{id}")
    public ResponseEntity<GenericResponseDTO<Certificados>> getCertificadoById(@PathVariable Integer id) {
        try {
            Certificados certificado = certificadosService.findById(id);
            if (certificado != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Certificado encontrado exitosamente",
                    certificado
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al obtener el certificado: " + e.getMessage(),
                    null
                ));
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<GenericResponseDTO<Certificados>> updateCertificado(
            @PathVariable Integer id,
            @RequestBody CertificadosDTO certificadoDTO) {
        try {
            Certificados certificado = certificadosService.findById(id);
            if (certificado != null) {
                certificado.setNombreCertificado(certificadoDTO.getNombre_certificado());
                certificado.setNumeroDocumentoCertificado(certificadoDTO.getNumero_documento_certificado());
                certificado.setFechaFin(certificadoDTO.getFecha_fin());
                certificado.setIdAprendiz(certificadoDTO.getId_aprendiz());
                certificado.setIdLecciones(certificadoDTO.getId_lecciones());
                
                Certificados updatedCertificado = certificadosService.update(certificado);
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Certificado actualizado exitosamente",
                    updatedCertificado
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al actualizar el certificado: " + e.getMessage(),
                    null
                ));
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> deleteCertificado(@PathVariable Integer id) {
        try {
            if (certificadosService.delete(id)) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Certificado eliminado exitosamente",
                    null
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al eliminar el certificado: " + e.getMessage(),
                    null
                ));
        }
    }

    @GetMapping("/aprendiz/{id}")
    public ResponseEntity<GenericResponseDTO<List<Certificados>>> getCertificadosByAprendiz(@PathVariable Integer id) {
        try {
            List<Certificados> certificados = certificadosService.findByAprendiz(id);
            
            if (certificados != null && !certificados.isEmpty()) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Certificados encontrados", certificados));
            } else {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "El aprendiz no tiene certificados", new ArrayList<>()));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener los certificados del aprendiz: " + e.getMessage(), null));
        }
    }
}