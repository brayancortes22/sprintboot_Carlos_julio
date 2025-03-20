package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.service.CursosService;
import com.sena_proyecto_car_2025.Dto.CursosDTO;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "*")
public class cursos_controller {

    @Autowired
    private CursosService cursosService;

    // Crear nuevo curso
    @PostMapping("")
    public ResponseEntity<GenericResponseDTO<CursosDTO>> crear(@RequestBody CursosDTO dto) {
        try {
            Cursos entity = convertToEntity(dto);
            cursosService.save(entity);
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Curso creado exitosamente", dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al crear curso: " + e.getMessage(), null));
        }
    }

    // Obtener todos los cursos
    @GetMapping("")
    public ResponseEntity<GenericResponseDTO<List<CursosDTO>>> obtenerTodos() {
        try {
            Iterable<Cursos> entities = cursosService.findAll();
            List<CursosDTO> dtos = new ArrayList<>();
            entities.forEach(entity -> dtos.add(convertToDTO(entity)));
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Cursos obtenidos exitosamente", dtos));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener cursos: " + e.getMessage(), null));
        }
    }

    // Obtener curso por ID
    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<CursosDTO>> obtenerPorId(@PathVariable Integer id) {
        try {
            Cursos entity = cursosService.findById(id);
            if (entity != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Curso encontrado", convertToDTO(entity)));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener curso: " + e.getMessage(), null));
        }
    }

    // Actualizar curso
    @PutMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<CursosDTO>> actualizar(
            @PathVariable Integer id, 
            @RequestBody CursosDTO dto) {
        try {
            Cursos existente = cursosService.findById(id);
            if (existente != null) {
                Cursos entity = convertToEntity(dto);
                entity.setIdCurso(id);
                cursosService.update(entity);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Curso actualizado exitosamente", dto));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al actualizar curso: " + e.getMessage(), null));
        }
    }

    // Eliminar curso
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> eliminar(@PathVariable Integer id) {
        try {
            Cursos existente = cursosService.findById(id);
            if (existente != null) {
                cursosService.delete(id);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Curso eliminado exitosamente", null));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al eliminar curso: " + e.getMessage(), null));
        }
    }

    // Métodos auxiliares para convertir entre DTO y Entity
    private CursosDTO convertToDTO(Cursos entity) {
        CursosDTO dto = new CursosDTO();
        dto.setIdCurso(entity.getIdCurso());
        dto.setCodigoFicha(entity.getCodigoFicha());
        dto.setNombrePrograma(entity.getNombrePrograma());
        dto.setDescripcion(entity.getDescripcion());
        dto.setFechaInicio(entity.getFechaInicio());
        dto.setFechaFin(entity.getFechaFin());
        return dto;
    }

    private Cursos convertToEntity(CursosDTO dto) {
        return new Cursos(
            dto.getNombrePrograma(),
            dto.getDescripcion(),
            dto.getCodigoFicha(),
            dto.getFechaInicio(),
            dto.getFechaFin()
        );
    }
} 