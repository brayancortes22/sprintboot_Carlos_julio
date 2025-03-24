package com.sena_proyecto_car_2025.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.sql.Timestamp;

@Entity(name = "certificados")
public class Certificados {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_certificado")
    private int idCertificado;

    @ManyToOne
    @JoinColumn(name = "id_lecciones")
    private lecciones lecciones;

    @ManyToOne
    @JoinColumn(name = "id_aprendiz")
    private Aprendiz aprendiz;

    @Column(name = "nombre_certificado", length = 150)
    private String nombreCertificado;

    @Column(name = "numeroDocumento_certificado")
    private int numeroDocumentoCertificado;

    @Column(name = "fecha_fin")
    private Timestamp fechaFin;

    // Constructor vacío
    public Certificados() {}

    // Constructor con parámetros
    public Certificados(int idCertificado, lecciones lecciones, Aprendiz aprendiz, String nombreCertificado, int numeroDocumentoCertificado, Timestamp fechaFin) {
        this.idCertificado = idCertificado;
        this.lecciones = lecciones;
        this.aprendiz = aprendiz;
        this.nombreCertificado = nombreCertificado;
        this.numeroDocumentoCertificado = numeroDocumentoCertificado;
        this.fechaFin = fechaFin;
    }

    // Getters y Setters
    public int getIdCertificado() {
        return idCertificado;
    }

    public void setIdCertificado(int idCertificado) {
        this.idCertificado = idCertificado;
    }

    public lecciones getLecciones() {
        return lecciones;
    }

    public void setLecciones(lecciones lecciones) {
        this.lecciones = lecciones;
    }

    public Aprendiz getAprendiz() {
        return aprendiz;
    }

    public void setAprendiz(Aprendiz aprendiz) {
        this.aprendiz = aprendiz;
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
