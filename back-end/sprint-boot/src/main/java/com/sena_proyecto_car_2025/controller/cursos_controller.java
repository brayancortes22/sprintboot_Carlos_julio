package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.service.CursosService;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cursos")
public class cursos_controller {

    @Autowired
    private CursosService cursosService;

    @GetMapping
    public ResponseEntity<GenericResponseDTO<List<Cursos>>> getAllCursos() {
        try {
            List<Cursos> cursos = new ArrayList<>();
            cursosService.findAll().forEach(cursos::add);
            
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Cursos obtenidos exitosamente",
                cursos
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al obtener cursos: " + e.getMessage(),
                    null
                ));
        }
    }

    @PostMapping
    public ResponseEntity<GenericResponseDTO<Cursos>> createCurso(@RequestBody Cursos curso) {
        try {
            Cursos savedCurso = cursosService.save(curso);
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Curso creado exitosamente",
                savedCurso
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al crear el curso: " + e.getMessage(),
                    null
                ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Cursos>> getCursoById(@PathVariable Integer id) {
        try {
            Cursos curso = cursosService.findById(id);
            if (curso != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Curso encontrado exitosamente",
                    curso
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al obtener el curso: " + e.getMessage(),
                    null
                ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Cursos>> updateCurso(
            @PathVariable Integer id,
            @RequestBody Cursos curso) {
        try {
            curso.setIdCurso(id);
            Cursos updatedCurso = cursosService.update(curso);
            if (updatedCurso != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Curso actualizado exitosamente",
                    updatedCurso
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al actualizar el curso: " + e.getMessage(),
                    null
                ));
        }
    }
    
    // Endpoint adicional para compatibilidad con frontend existente
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<GenericResponseDTO<Cursos>> updateCursoAlt(
            @PathVariable Integer id,
            @RequestBody Cursos curso) {
        return updateCurso(id, curso);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> deleteCurso(@PathVariable Integer id) {
        try {
            // Primero verificamos si el curso existe
            Cursos curso = cursosService.findById(id);
            if (curso == null) {
                return ResponseEntity.status(404)
                    .body(new GenericResponseDTO<>(
                        404,
                        "No se encontró el curso con ID: " + id,
                        null
                    ));
            }
            
            if (cursosService.delete(id)) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Curso eliminado exitosamente",
                    null
                ));
            } else {
                return ResponseEntity.status(400)
                    .body(new GenericResponseDTO<>(
                        400,
                        "No se pudo eliminar el curso. Es posible que existan lecciones o inscripciones asociadas a este curso.",
                        null
                    ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(400)
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al eliminar el curso: " + e.getMessage(),
                    null
                ));
        }
    }
    
    // Endpoint adicional para compatibilidad con frontend existente
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> deleteCursoAlt(@PathVariable Integer id) {
        return deleteCurso(id);
    }

    // para la tabla de obtener cursos por nombre
    // Endpoint para buscar cursos por nombre
    @GetMapping("/buscar/{nombre}")
    public ResponseEntity<GenericResponseDTO<List<Cursos>>> getCursosByNombre(@PathVariable String nombre) {
        try {
            Iterable<Cursos> cursosIterable = cursosService.findByNombreCurso(nombre);
            List<Cursos> cursos = new ArrayList<>();
            cursosIterable.forEach(cursos::add);
            
            if (cursos != null && !cursos.isEmpty()) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Cursos encontrados exitosamente",
                    cursos
                ));
            } else {
                return ResponseEntity.status(404)
                    .body(new GenericResponseDTO<>(
                        404,
                        "No se encontraron cursos con el nombre: " + nombre,
                        null
                    ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al buscar cursos: " + e.getMessage(),
                    null
                ));
        }
    }
}