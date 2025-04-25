package com.sena_proyecto_car_2025.Dto;

public class AuthResponseDTO {
    private String token;
    private int id_aprendiz;
    private String nombre;
    private long numeroDocumento;
    private String correo;
    private int tipoUsuario;

    // Constructor
    public AuthResponseDTO(String token, int id_aprendiz, String nombre, long numeroDocumento, String correo, int tipoUsuario) {
        this.token = token;
        this.id_aprendiz = id_aprendiz;
        this.nombre = nombre;
        this.numeroDocumento = numeroDocumento;
        this.correo = correo;
        this.tipoUsuario = tipoUsuario;
    }

    // Getters y Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getId_aprendiz() {
        return id_aprendiz;
    }

    public void setId_aprendiz(int id_aprendiz) {
        this.id_aprendiz = id_aprendiz;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public long getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(long numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public int getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(int tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}