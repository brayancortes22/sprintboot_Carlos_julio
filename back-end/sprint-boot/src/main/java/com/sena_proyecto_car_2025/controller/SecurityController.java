package com.sena_proyecto_car_2025.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.sena_proyecto_car_2025.service.SecurityBlockService;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/security")

public class SecurityController {

    @Autowired
    private SecurityBlockService securityBlockService;
    
    @PostMapping("/block-devtools")
    public ResponseEntity<GenericResponseDTO<String>> blockDevToolsUser(HttpServletRequest request) {
        String clientIp = getClientIP(request);
        securityBlockService.blockIpAddress(clientIp);
        
        return ResponseEntity.ok(new GenericResponseDTO<>(200, 
            "Usuario bloqueado por uso de herramientas de desarrollo", 
            "El acceso ha sido restringido durante 2 minutos"));
    }
    
    @GetMapping("/check-blocked")
    public ResponseEntity<GenericResponseDTO<Boolean>> isUserBlocked(HttpServletRequest request) {
        String clientIp = getClientIP(request);
        boolean isBlocked = securityBlockService.isIpBlocked(clientIp);
        
        String message = isBlocked ? 
            "El usuario está bloqueado por uso de herramientas de desarrollo" : 
            "El usuario no está bloqueado";
            
        return ResponseEntity.ok(new GenericResponseDTO<>(200, message, isBlocked));
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty() || "unknown".equalsIgnoreCase(xfHeader)) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}