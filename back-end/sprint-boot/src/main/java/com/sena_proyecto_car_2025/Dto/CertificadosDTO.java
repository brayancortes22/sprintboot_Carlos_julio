 package com.sena_proyecto_car_2025.Dto;

import java.sql.Timestamp;

public class CertificadosDTO {
    private int idCertificado;
    private int id_lecciones; // Para la relación con Lecciones
    private int id_aprendiz;  // Para la relación con Aprendiz
    private String nombreCertificado;
    private int numeroDocumentoCertificado;
    private Timestamp fechaFin;

    // Constructor
    public CertificadosDTO() {}

    // Getters y Setters
    public int getIdCertificado() {
        return idCertificado;
    }

    public void setIdCertificado(int idCertificado) {
        this.idCertificado = idCertificado;
    }

    public int getId_lecciones() {
        return id_lecciones;
    }

    public void setId_lecciones(int id_lecciones) {
        this.id_lecciones = id_lecciones;
    }

    public int getId_aprendiz() {
        return id_aprendiz;
    }

    public void setId_aprendiz(int id_aprendiz) {
        this.id_aprendiz = id_aprendiz;
    }

    public String getNombreCertificado() {
        return nombreCertificado;
    }

    public void setNombreCertificado(String nombreCertificado) {
        this.nombreCertificado = nombreCertificado;
    }

    public int getNumeroDocumentoCertificado() {
        return numeroDocumentoCertificado;
    }

    public void setNumeroDocumentoCertificado(int numeroDocumentoCertificado) {
        this.numeroDocumentoCertificado = numeroDocumentoCertificado;
    }

    public Timestamp getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Timestamp fechaFin) {
        this.fechaFin = fechaFin;
    }
}