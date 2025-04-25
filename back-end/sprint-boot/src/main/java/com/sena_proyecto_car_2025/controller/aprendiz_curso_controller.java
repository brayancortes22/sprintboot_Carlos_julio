package com.sena_proyecto_car_2025.controller;
//se importan las librerias necesarias
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sena_proyecto_car_2025.model.aprendiz_curso;
import com.sena_proyecto_car_2025.service.AprendizCursoService;
import com.sena_proyecto_car_2025.Dto.AprendizCursoDTO;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.model.Cursos;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/aprendiz-curso")
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.1.23:5173", "http://172.30.1.191:5173"}, allowCredentials = "true")
public class aprendiz_curso_controller {
    @Autowired
    private AprendizCursoService aprendizCursoService;

    // Crear nuevo registro
    @PostMapping("")
    public ResponseEntity<GenericResponseDTO<AprendizCursoDTO>> crear(@RequestBody AprendizCursoDTO dto) {
        try {
            // Asegurarnos de que la fecha de inscripción no sea nula
            if (dto.getFechaInscripcion() == null) {
                dto.setFechaInscripcion(new Timestamp(System.currentTimeMillis()));
            }
            
            aprendiz_curso entity = convertToEntity(dto);
            aprendizCursoService.save(entity);
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Registro creado exitosamente", dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al crear registro: " + e.getMessage(), null));
        }
    }

    // Obtener todos los registros
    @GetMapping("")
    public ResponseEntity<GenericResponseDTO<List<AprendizCursoDTO>>> obtenerTodos() {
        try {
            Iterable<aprendiz_curso> entities = aprendizCursoService.findAll();
            List<AprendizCursoDTO> dtos = new ArrayList<>();
            entities.forEach(entity -> dtos.add(convertToDTO(entity)));
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Registros obtenidos exitosamente", dtos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener registros: " + e.getMessage(), null));
        }
    }

    // Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<AprendizCursoDTO>> obtenerPorId(@PathVariable Long id) {
        try {
            aprendiz_curso entity = aprendizCursoService.findById(id);
            if (entity != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Registro encontrado", convertToDTO(entity)));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener registro: " + e.getMessage(), null));
        }
    }

    // Obtener cursos por aprendiz
    @GetMapping("/aprendiz/{id}")
    public ResponseEntity<GenericResponseDTO<List<aprendiz_curso>>> getCursosByAprendiz(@PathVariable Integer id) {
        try {
            Aprendiz aprendiz = new Aprendiz();
            aprendiz.setId_aprendiz(id);
            List<aprendiz_curso> inscripciones = aprendizCursoService.findByAprendiz(aprendiz);
            
            if (inscripciones != null && !inscripciones.isEmpty()) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Cursos encontrados", inscripciones));
            } else {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "El aprendiz no está inscrito en ningún curso", new ArrayList<>()));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener los cursos del aprendiz: " + e.getMessage(), null));
        }
    }

    // Actualizar registro
    @PutMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<AprendizCursoDTO>> actualizar(
            @PathVariable Long id, 
            @RequestBody AprendizCursoDTO dto) {
        try {
            aprendiz_curso existente = aprendizCursoService.findById(id);
            if (existente != null) {
                aprendiz_curso entity = convertToEntity(dto);
                entity.setId_aprendiz_curso(id.intValue());
                aprendizCursoService.update(entity);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Registro actualizado exitosamente", dto));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al actualizar registro: " + e.getMessage(), null));
        }
    }

    // Eliminar registro
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> eliminar(@PathVariable Long id) {
        try {
            aprendiz_curso existente = aprendizCursoService.findById(id);
            if (existente != null) {
                aprendizCursoService.delete(id);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Registro eliminado exitosamente", null));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al eliminar registro: " + e.getMessage(), null));
        }
    }

    // Métodos auxiliares para convertir entre DTO y Entity
    private AprendizCursoDTO convertToDTO(aprendiz_curso entity) {
        AprendizCursoDTO dto = new AprendizCursoDTO();
        dto.setId_aprendiz_curso(entity.getId_aprendiz_curso());
        dto.setId_curso(entity.getCurso().getIdCurso());
        dto.setId_aprendiz(entity.getAprendiz().getId_aprendiz());
        dto.setFechaInscripcion(entity.getFechaInscripcion());
        return dto;
    }

    private aprendiz_curso convertToEntity(AprendizCursoDTO dto) {
        Cursos curso = new Cursos();
        curso.setIdCurso(dto.getId_curso());

        Aprendiz aprendiz = new Aprendiz();
        aprendiz.setId_aprendiz(dto.getId_aprendiz());

        return new aprendiz_curso(curso, aprendiz, dto.getFechaInscripcion());
    }
}
