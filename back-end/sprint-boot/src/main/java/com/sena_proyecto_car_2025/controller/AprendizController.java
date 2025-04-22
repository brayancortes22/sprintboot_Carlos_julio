package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.service.AprendizService;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/aprendices")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AprendizController {

    @Autowired
    private AprendizService aprendizService;

    @GetMapping("/obtener")
    public ResponseEntity<GenericResponseDTO<List<Aprendiz>>> getAllAprendices() {
        try {
            List<Aprendiz> aprendices = new ArrayList<>();
            aprendizService.findAll().forEach(aprendices::add);
            
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Aprendices obtenidos exitosamente",
                aprendices
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al obtener aprendices: " + e.getMessage(),
                    null
                ));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponseDTO<Aprendiz>> getAprendizById(@PathVariable Integer id) {
        try {
            Aprendiz aprendiz = aprendizService.findById(id);
            if (aprendiz != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Aprendiz encontrado exitosamente",
                    aprendiz
                ));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al obtener el aprendiz: " + e.getMessage(),
                    null
                ));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<GenericResponseDTO<Aprendiz>> createAprendiz(@RequestBody Aprendiz aprendiz) {
        try {
            // Validar que el número de documento no sea 0
            if (aprendiz.getNumeroDocumento() <= 0) {
                return ResponseEntity.badRequest()
                    .body(new GenericResponseDTO<>(
                        400,
                        "El número de documento debe ser mayor que 0",
                        null
                    ));
            }

            // Validar que el tipo de usuario sea 1 o 2
            if (aprendiz.getTipoUsuario() != 1 && aprendiz.getTipoUsuario() != 2) {
                return ResponseEntity.badRequest()
                    .body(new GenericResponseDTO<>(
                        400,
                        "El tipo de usuario debe ser 1 (Administrador) o 2 (Aprendiz)",
                        null
                    ));
            }

            Aprendiz savedAprendiz = aprendizService.save(aprendiz);
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Aprendiz creado exitosamente",
                savedAprendiz
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al crear el aprendiz: " + e.getMessage(),
                    null
                ));
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<GenericResponseDTO<Aprendiz>> updateAprendiz(
            @PathVariable Integer id,
            @RequestBody Aprendiz aprendiz) {
        try {
            aprendiz.setId_aprendiz(id);
            Aprendiz updatedAprendiz = aprendizService.update(aprendiz);
            if (updatedAprendiz != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Aprendiz actualizado exitosamente",
                    updatedAprendiz
                ));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al actualizar el aprendiz: " + e.getMessage(),
                    null
                ));
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> deleteAprendiz(@PathVariable Integer id) {
        try {
            if (aprendizService.delete(id)) {
                return ResponseEntity.ok(new GenericResponseDTO<>(
                    200,
                    "Aprendiz eliminado exitosamente",
                    null
                ));
            } else {
                return ResponseEntity.notFound()
                    .build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error al eliminar el aprendiz: " + e.getMessage(),
                    null
                ));
        }
    }
}
