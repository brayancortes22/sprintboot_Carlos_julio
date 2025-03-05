package com.sena_proyecto_car_2025.model;


import java.sql.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity(name = "aprendiz_curso")
public class aprendiz_curso{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_aprendiz_curso;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_curso")
    private Cursos curso;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_aprendiz")
    private Aprendiz aprendiz;

    @Column(name = "fecha_inscripcion")
    private Timestamp fechaInscripcion;
    
    // Constructor
    public aprendiz_curso(Cursos curso, Aprendiz aprendiz, Timestamp fechaInscripcion) {
        this.curso = curso;
        this.aprendiz = aprendiz;
        this.fechaInscripcion = fechaInscripcion;
    }
    
    // Getters y Setters
    public int getId_aprendiz_curso() {
        return id_aprendiz_curso;
    }

    public void setId_aprendiz_curso(int id_aprendiz_curso) {
        this.id_aprendiz_curso = id_aprendiz_curso;
    }

    public Cursos getCurso() {
        return curso;
    }

    public void setCurso(Cursos curso) {
        this.curso = curso;
    }

    public Aprendiz getAprendiz() {
        return aprendiz;
    }

    public void setAprendiz(Aprendiz aprendiz) {
        this.aprendiz = aprendiz;
    }

    public Timestamp getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(Timestamp fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

}