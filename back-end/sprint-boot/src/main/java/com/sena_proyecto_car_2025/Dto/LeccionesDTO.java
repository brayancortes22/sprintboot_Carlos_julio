 package com.sena_proyecto_car_2025.Dto;

public class LeccionesDTO {
    private int id_leccion;
    private String nombre_leccion;
    private String descripcion;
    private String ruta_leccion;
    private int id_curso; // Para la relación con Cursos

    // Constructor
    public LeccionesDTO() {}

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

    public int getId_curso() {
        return id_curso;
    }

    public void setId_curso(int id_curso) {
        this.id_curso = id_curso;
    }
}