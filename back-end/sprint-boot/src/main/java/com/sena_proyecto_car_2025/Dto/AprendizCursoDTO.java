 package com.sena_proyecto_car_2025.Dto;

import java.sql.Timestamp;

public class AprendizCursoDTO {
    private int id_aprendiz_curso;
    private int id_curso;      // Para la relación con Cursos
    private int id_aprendiz;   // Para la relación con Aprendiz
    private Timestamp fechaInscripcion;

    // Constructor
    public AprendizCursoDTO() {}

    // Getters y Setters
    public int getId_aprendiz_curso() {
        return id_aprendiz_curso;
    }

    public void setId_aprendiz_curso(int id_aprendiz_curso) {
        this.id_aprendiz_curso = id_aprendiz_curso;
    }

    public int getId_curso() {
        return id_curso;
    }

    public void setId_curso(int id_curso) {
        this.id_curso = id_curso;
    }

    public int getId_aprendiz() {
        return id_aprendiz;
    }

    public void setId_aprendiz(int id_aprendiz) {
        this.id_aprendiz = id_aprendiz;
    }

    public Timestamp getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(Timestamp fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }
}