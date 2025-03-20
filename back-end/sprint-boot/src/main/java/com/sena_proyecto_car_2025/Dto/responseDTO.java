package com.sena_proyecto_car_2025.Dto;

// una clase 
public class responseDTO {
    // Atributos
    private String status;
    private String message;
    private String type;
    // Metodos
    // Constructor
    public void message(String message,String status, String type) {
        this.status=status;
        this.message = message;
        this.type = type;
    }
    
    // Getters y Setters
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}