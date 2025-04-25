package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.service.AprendizService;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/aprendices")
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.1.23:5173", "http://172.30.1.191:5173"}, allowCredentials = "true")
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
    public ResponseEntity<GenericResponseDTO<Aprendiz>> createAprendiz(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("Recibiendo petición de creación de aprendiz:");
            System.out.println("Payload completo: " + payload);
            
            // Extraer datos del payload
            Aprendiz aprendiz = new Aprendiz();
            aprendiz.setNombre((String) payload.get("nombre"));
            aprendiz.setCorreo((String) payload.get("correo"));
            
            // Extraer y procesar el número de documento
            long numeroDocumento = 0;
            if (payload.get("numeroDocumento") instanceof Number) {
                numeroDocumento = ((Number) payload.get("numeroDocumento")).longValue();
            } else if (payload.get("numeroDocumento") instanceof String) {
                numeroDocumento = Long.parseLong((String) payload.get("numeroDocumento"));
            }
            aprendiz.setNumeroDocumento(numeroDocumento);
            
            // Extraer y procesar el tipo de usuario
            int tipoUsuario = 0;
            if (payload.get("tipoUsuario") instanceof Number) {
                tipoUsuario = ((Number) payload.get("tipoUsuario")).intValue();
            } else if (payload.get("tipoUsuario") instanceof String) {
                tipoUsuario = Integer.parseInt((String) payload.get("tipoUsuario"));
            }
            aprendiz.setTipoUsuario(tipoUsuario);
            
            // Procesar la contraseña - probando ambas formas de obtenerla
            String contraseña = null;
            if (payload.containsKey("contraseña")) {
                contraseña = (String) payload.get("contraseña");
                System.out.println("Contraseña obtenida con 'contraseña': " + (contraseña != null ? "PRESENTE" : "null"));
            } else if (payload.containsKey("contrasena")) {
                contraseña = (String) payload.get("contrasena");
                System.out.println("Contraseña obtenida con 'contrasena': " + (contraseña != null ? "PRESENTE" : "null"));
            } else if (payload.containsKey("password")) {
                contraseña = (String) payload.get("password");
                System.out.println("Contraseña obtenida con 'password': " + (contraseña != null ? "PRESENTE" : "null"));
            } else {
                System.out.println("No se encontró contraseña en el payload. Claves disponibles: " + payload.keySet());
            }
            
            if (contraseña != null && !contraseña.isEmpty()) {
                aprendiz.setPassword(contraseña); // Usar el método setPassword para evitar problemas con la ñ
                System.out.println("Contraseña establecida correctamente");
            } else {
                System.out.println("ADVERTENCIA: No se estableció contraseña");
            }
            
            // Validar que el número de documento no sea 0 o negativo
            if (aprendiz.getNumeroDocumento() <= 0) {
                String mensaje = "El número de documento debe ser mayor que 0. Valor recibido: " + aprendiz.getNumeroDocumento();
                System.out.println("Error de validación: " + mensaje);
                return ResponseEntity.badRequest()
                    .body(new GenericResponseDTO<>(400, mensaje, null));
            }

            // Validar que el tipo de usuario sea 1 o 2
            if (aprendiz.getTipoUsuario() != 1 && aprendiz.getTipoUsuario() != 2) {
                String mensaje = "El tipo de usuario debe ser 1 (Administrador) o 2 (Aprendiz). Valor recibido: " + aprendiz.getTipoUsuario();
                System.out.println("Error de validación: " + mensaje);
                return ResponseEntity.badRequest()
                    .body(new GenericResponseDTO<>(400, mensaje, null));
            }

            System.out.println("Validaciones pasadas correctamente, procediendo a guardar el aprendiz...");
            Aprendiz savedAprendiz = aprendizService.save(aprendiz);
            System.out.println("Aprendiz guardado exitosamente con ID: " + savedAprendiz.getId_aprendiz());
            System.out.println("¿La contraseña se guardó? " + (savedAprendiz.getPassword() != null ? "SÍ" : "NO"));
            
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Aprendiz creado exitosamente", savedAprendiz));
        } catch (Exception e) {
            String mensaje = "Error al crear el aprendiz: " + e.getMessage();
            System.err.println(mensaje);
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, mensaje, null));
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
