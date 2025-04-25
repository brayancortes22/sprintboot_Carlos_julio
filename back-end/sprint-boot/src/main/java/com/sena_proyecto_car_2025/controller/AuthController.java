package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena_proyecto_car_2025.Dto.AuthRequestDTO;
import com.sena_proyecto_car_2025.Dto.AuthResponseDTO;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;
import com.sena_proyecto_car_2025.security.AuthService;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<GenericResponseDTO<AuthResponseDTO>> login(@RequestBody AuthRequestDTO request) {
        try {
            AuthResponseDTO response = authService.authenticate(request);
            return ResponseEntity.ok(new GenericResponseDTO<>(
                200,
                "Autenticación exitosa",
                response
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(
                    400,
                    "Error en la autenticación: " + e.getMessage(),
                    null
                ));
        }
    }
}