package com.sena_proyecto_car_2025.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "cursos")
public class Cursos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private int idCurso;
    
    @Column(name = "codigo_ficha")
    private int codigoFicha;
    
    @Column(name = "nombre_programa", length = 150)
    private String nombrePrograma;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "fecha_inicio")
    private Timestamp fechaInicio;
    
    @Column(name = "fecha_fin")
    private Timestamp fechaFin;
    
    // Constructor
    public Cursos(String nombre_programa, String descripcion, int codigo_ficha,
     Timestamp fecha_inicio, Timestamp fecha_fin) {
        this.nombrePrograma = nombre_programa;
        this.descripcion = descripcion;
        this.codigoFicha = codigo_ficha;
        this.fechaInicio = fecha_inicio;
        this.fechaFin = fecha_fin;
    }
    public Cursos() {}
    // Getters y Setters
    public int getIdCurso() {
        return idCurso;
    }
    
    public void setIdCurso(int idCurso) {
        this.idCurso = idCurso;
    }
    
    public String getNombrePrograma() {
        return nombrePrograma;
    }
    
    public void setNombrePrograma(String nombrePrograma) {
        this.nombrePrograma = nombrePrograma;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getCodigoFicha() {
        return codigoFicha;
    }
    
    public void setCodigoFicha(int codigoFicha) {
        this.codigoFicha = codigoFicha;
    }

    public Timestamp getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Timestamp fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Timestamp getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Timestamp fechaFin) {
        this.fechaFin = fechaFin;
    }
} 