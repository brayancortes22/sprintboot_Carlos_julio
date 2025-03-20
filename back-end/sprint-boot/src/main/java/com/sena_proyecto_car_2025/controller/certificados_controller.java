package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sena_proyecto_car_2025.model.Certificados;
import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.service.CertificadosService;
import com.sena_proyecto_car_2025.Dto.CertificadosDTO;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/certificados")
@CrossOrigin(origins = "*")
public class certificados_controller {

    @Autowired
    private CertificadosService certificadosService;

    // Crear nuevo certificado
    @PostMapping("")
    public ResponseEntity<GenericResponseDTO<CertificadosDTO>> crear(@RequestBody CertificadosDTO dto) {
        try {
            Certificados entity = convertToEntity(dto);
            certificadosService.save(entity);
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Certificado creado exitosamente", dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al crear certificado: " + e.getMessage(), null));
        }
    }

    // Obtener todos los certificados
    @GetMapping("")
    public ResponseEntity<GenericResponseDTO<List<CertificadosDTO>>> obtenerTodos() {
        try {
            Iterable<Certificados> entities = certificadosService.findAll();
            List<CertificadosDTO> dtos = new ArrayList<>();
            entities.forEach(entity -> dtos.add(convertToDTO(entity)));
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Certificados obtenidos exitosamente", dtos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener certificados: " + e.getMessage(), null));
        }
    }

    // Obtener certificado por ID
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<CertificadosDTO>> obtenerPorId(@PathVariable Integer id) {
        try {
            Certificados entity = certificadosService.findById(id);
            if (entity != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Certificado encontrado", convertToDTO(entity)));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener certificado: " + e.getMessage(), null));
        }
    }

    // Actualizar certificado
    @PutMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<CertificadosDTO>> actualizar(
            @PathVariable Integer id, 
            @RequestBody CertificadosDTO dto) {
        try {
            Certificados existente = certificadosService.findById(id);
            if (existente != null) {
                Certificados entity = convertToEntity(dto);
                entity.setIdCertificado(id);
                certificadosService.update(entity);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Certificado actualizado exitosamente", dto));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al actualizar certificado: " + e.getMessage(), null));
        }
    }

    // Eliminar certificado
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> eliminar(@PathVariable Integer id) {
        try {
            Certificados existente = certificadosService.findById(id);
            if (existente != null) {
                certificadosService.delete(id);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Certificado eliminado exitosamente", null));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al eliminar certificado: " + e.getMessage(), null));
        }
    }

    // Métodos auxiliares para convertir entre DTO y Entity
    private CertificadosDTO convertToDTO(Certificados entity) {
        CertificadosDTO dto = new CertificadosDTO();
        dto.setIdCertificado(entity.getIdCertificado());
        if (entity.getLecciones() != null) {
            dto.setId_lecciones(entity.getLecciones().getId_leccion());
        }
        if (entity.getAprendiz() != null) {
            dto.setId_aprendiz(entity.getAprendiz().getId_aprendiz());
        }
        dto.setNombreCertificado(entity.getNombreCertificado());
        dto.setNumeroDocumentoCertificado(entity.getNumeroDocumentoCertificado());
        dto.setFechaFin(entity.getFechaFin());
        return dto;
    }

    private Certificados convertToEntity(CertificadosDTO dto) {
        Certificados entity = new Certificados();
        entity.setIdCertificado(dto.getIdCertificado());
        
        if (dto.getId_lecciones() > 0) {
            lecciones leccion = new lecciones();
            leccion.setId_leccion(dto.getId_lecciones());
            entity.setLecciones(leccion);
        }
        
        if (dto.getId_aprendiz() > 0) {
            Aprendiz aprendiz = new Aprendiz();
            aprendiz.setId_aprendiz(dto.getId_aprendiz());
            entity.setAprendiz(aprendiz);
        }
        
        entity.setNombreCertificado(dto.getNombreCertificado());
        entity.setNumeroDocumentoCertificado(dto.getNumeroDocumentoCertificado());
        entity.setFechaFin(dto.getFechaFin());
        
        return entity;
    }
} 