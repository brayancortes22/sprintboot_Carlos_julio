package com.sena_proyecto_car_2025.Dto;

public class GenericResponseDTO<T> {
    private int status;
    private String message;
    private T data;

    public GenericResponseDTO(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    // Getters y Setters
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
} 