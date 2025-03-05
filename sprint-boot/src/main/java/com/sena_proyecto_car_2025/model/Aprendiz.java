package com.sena_proyecto_car_2025.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;                              

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

    // Constructor
    public Aprendiz() {
        this.tipoUsuario = false;
    }

    public Aprendiz(String nombre, long numero_documento, String correo, String contraseña) {
        this.nombre = nombre;
        this.numeroDocumento = numero_documento;
        this.correo = correo;
        this.contraseña = contraseña;
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

    public long getNumero_documento() {
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