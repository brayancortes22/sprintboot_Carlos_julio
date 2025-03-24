package com.sena_proyecto_car_2025.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "aprendiz")
public class Aprendiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aprendiz")
    private int id_aprendiz;

    @Column(name = "nombre", length = 150)
    private String nombre;

    @Column(name = "numero_documento")
    private long numeroDocumento;

    @Column(name = "correo", length = 150)
    private String correo;

    @Column(name = "contraseña", length = 12)
    private String contraseña;

    @Column(name = "tipoUsuario")
    private boolean tipoUsuario;

    // Constructor vacío
    public Aprendiz() {}

    // Constructor con parámetros
    public Aprendiz(int id_aprendiz, String nombre, long numeroDocumento, String correo, String contraseña, boolean tipoUsuario) {
        this.id_aprendiz = id_aprendiz;
        this.nombre = nombre;
        this.numeroDocumento = numeroDocumento;
        this.correo = correo;
        this.contraseña = contraseña;
        this.tipoUsuario = tipoUsuario;
    }

    // Getters y Setters
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

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public boolean isTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(boolean tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getTipoUsuario() {
        return tipoUsuario ? "Aprendiz" : "Administrador";
    }
}