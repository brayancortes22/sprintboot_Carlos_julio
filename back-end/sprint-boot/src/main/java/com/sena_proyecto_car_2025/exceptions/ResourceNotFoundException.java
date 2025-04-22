package com.sena_proyecto_car_2025.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    
    private static final long serialVersionUID = 1L; // Buena práctica añadir serialVersionUID

    public ResourceNotFoundException(String message){
        super(message);
    }
} 