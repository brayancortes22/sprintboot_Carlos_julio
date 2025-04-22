package com.sena_proyecto_car_2025.Dto;

public class LeccionesDTO {
    private Integer id_leccion;
    private String nombre_leccion;
    private String descripcion;
    private String ruta_leccion;
    private Integer id_curso;

    // Constructor vacío
    public LeccionesDTO() {}

    // Constructor con parámetros
    public LeccionesDTO(Integer id_leccion, String nombre_leccion, String descripcion, String ruta_leccion, Integer id_curso) {
        this.id_leccion = id_leccion;
        this.nombre_leccion = nombre_leccion;
        this.descripcion = descripcion;
        this.ruta_leccion = ruta_leccion;
        this.id_curso = id_curso;
    }

    // Getters y setters
    public Integer getId_leccion() {
        return id_leccion;
    }

    public void setId_leccion(Integer id_leccion) {
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

    public Integer getId_curso() {
        return id_curso;
    }

    public void setId_curso(Integer id_curso) {
        this.id_curso = id_curso;
    }

    @Override
    public String toString() {
        return "LeccionesDTO{" +
                "id_leccion=" + id_leccion +
                ", nombre_leccion='" + nombre_leccion + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", ruta_leccion='" + ruta_leccion + '\'' +
                ", id_curso=" + id_curso +
                '}';
    }
}