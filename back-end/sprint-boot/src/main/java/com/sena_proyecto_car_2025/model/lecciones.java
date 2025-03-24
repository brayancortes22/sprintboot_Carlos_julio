package com.sena_proyecto_car_2025.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity(name = "lecciones")
public class lecciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_leccion;

    @Column(name = "nombre_leccion", length = 150)
    private String nombre_leccion;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "ruta_leccion")
    private String ruta_leccion;

    @ManyToOne
    @JoinColumn(name = "id_curso")
    private Cursos curso;

    // Constructor vacío
    public lecciones() {}

    // Constructor con parámetros
    public lecciones(int id_leccion, String nombre_leccion, String descripcion, String ruta_leccion, Cursos curso) {
        this.id_leccion = id_leccion;
        this.nombre_leccion = nombre_leccion;
        this.descripcion = descripcion;
        this.ruta_leccion = ruta_leccion;
        this.curso = curso;
    }

    // Getters y Setters
    public int getId_leccion() {
        return id_leccion;
    }

    public void setId_leccion(int id_leccion) {
        this.id_leccion = id_leccion;
    }

    public String getNombre_leccion() {
        return nombre_leccion;
    }

    public void setNombre_leccion(String nombre_leccion) {
        this.nombre_leccion = nombre_leccion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getRuta_leccion() {
        return ruta_leccion;
    }

    public void setRuta_leccion(String ruta_leccion) {
        this.ruta_leccion = ruta_leccion;
    }

    public Cursos getCurso() {
        return curso;
    }

    public void setCurso(Cursos curso) {
        this.curso = curso;
    }
}
