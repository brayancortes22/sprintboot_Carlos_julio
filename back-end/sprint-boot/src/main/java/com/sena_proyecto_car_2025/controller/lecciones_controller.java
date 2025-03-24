package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.service.LeccionesService;
import com.sena_proyecto_car_2025.Dto.LeccionesDTO;
import com.sena_proyecto_car_2025.Dto.CursosDTO;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/lecciones")
@CrossOrigin(origins = "*")
public class lecciones_controller {

    @Autowired
    private LeccionesService leccionesService;

    // Crear nueva lección
    @PostMapping("")
    public ResponseEntity<GenericResponseDTO<LeccionesDTO>> crear(@RequestBody LeccionesDTO dto) {
        try {
            lecciones entity = convertToEntity(dto);
            leccionesService.save(entity);
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección creada exitosamente", dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al crear lección: " + e.getMessage(), null));
        }
    }

    // Obtener todas las lecciones
    @GetMapping("")
    public ResponseEntity<GenericResponseDTO<List<LeccionesDTO>>> obtenerTodos() {
        try {
            Iterable<lecciones> entities = leccionesService.findAll();
            List<LeccionesDTO> dtos = new ArrayList<>();
            entities.forEach(entity -> dtos.add(convertToDTO(entity)));
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lecciones obtenidas exitosamente", dtos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener lecciones: " + e.getMessage(), null));
        }
    }

    // Obtener lección por ID
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<LeccionesDTO>> obtenerPorId(@PathVariable Integer id) {
        try {
            lecciones entity = leccionesService.findById(id);
            if (entity != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección encontrada", convertToDTO(entity)));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener lección: " + e.getMessage(), null));
        }
    }

    // Actualizar lección
    @PutMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<LeccionesDTO>> actualizar(
            @PathVariable Integer id, 
            @RequestBody LeccionesDTO dto) {
        try {
            lecciones existente = leccionesService.findById(id);
            if (existente != null) {
                lecciones entity = convertToEntity(dto);
                entity.setId_leccion(id);
                leccionesService.update(entity);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección actualizada exitosamente", dto));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al actualizar lección: " + e.getMessage(), null));
        }
    }

    // Eliminar lección
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> eliminar(@PathVariable Integer id) {
        try {
            lecciones existente = leccionesService.findById(id);
            if (existente != null) {
                leccionesService.delete(id);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección eliminada exitosamente", null));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al eliminar lección: " + e.getMessage(), null));
        }
    }

    // Métodos auxiliares para convertir entre DTO y Entity
    private LeccionesDTO convertToDTO(lecciones entity) {
        LeccionesDTO dto = new LeccionesDTO();
        dto.setId_leccion(entity.getId_leccion());
        dto.setNombre_leccion(entity.getNombre_leccion());
        dto.setDescripcion(entity.getDescripcion());
        dto.setRuta_leccion(entity.getRuta_leccion());
        if (entity.getCurso() != null) {
            dto.setId_curso(entity.getCurso().getIdCurso());
        }
        return dto;
    }

    private lecciones convertToEntity(LeccionesDTO dto) {
        Cursos curso = new Cursos();
        curso.setIdCurso(dto.getId_curso());

        return  new lecciones (
            dto.getId_leccion(),
            dto.getNombre_leccion(),
            dto.getDescripcion(),
            dto.getRuta_leccion(),
            curso 
        );
    }
}