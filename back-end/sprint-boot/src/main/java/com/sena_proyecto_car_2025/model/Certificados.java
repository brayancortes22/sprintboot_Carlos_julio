package com.sena_proyecto_car_2025.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "certificados")
public class Certificados {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_certificado")
    private Integer idCertificado;

    @Column(name = "nombre_certificado")
    private String nombreCertificado;

    @Column(name = "numero_documento_certificado")
    private Integer numeroDocumentoCertificado;

    @Column(name = "fecha_fin")
    private Date fechaFin;

    @Column(name = "id_aprendiz")
    private Integer idAprendiz;

    @Column(name = "id_lecciones")
    private Integer idLecciones;

    // Constructor vacío
    public Certificados() {}

    // Constructor con parámetros
    public Certificados(Integer idCertificado, String nombreCertificado, Integer numeroDocumentoCertificado, Date fechaFin, Integer idAprendiz, Integer idLecciones) {
        this.idCertificado = idCertificado;
        this.nombreCertificado = nombreCertificado;
        this.numeroDocumentoCertificado = numeroDocumentoCertificado;
        this.fechaFin = fechaFin;
        this.idAprendiz = idAprendiz;
        this.idLecciones = idLecciones;
    }

    // Getters
    public Integer getIdCertificado() {
        return idCertificado;
    }

    public String getNombreCertificado() {
        return nombreCertificado;
    }

    public Integer getNumeroDocumentoCertificado() {
        return numeroDocumentoCertificado;
    }

    public Date getFechaFin() {
        return fechaFin;
    }

    public Integer getIdAprendiz() {
        return idAprendiz;
    }

    public Integer getIdLecciones() {
        return idLecciones;
    }

    // Setters
    public void setIdCertificado(Integer idCertificado) {
        this.idCertificado = idCertificado;
    }

    public void setNombreCertificado(String nombreCertificado) {
        this.nombreCertificado = nombreCertificado;
    }

    public void setNumeroDocumentoCertificado(Integer numeroDocumentoCertificado) {
        this.numeroDocumentoCertificado = numeroDocumentoCertificado;
    }

    public void setFechaFin(Date fechaFin) {
        this.fechaFin = fechaFin;
    }

    public void setIdAprendiz(Integer idAprendiz) {
        this.idAprendiz = idAprendiz;
    }

    public void setIdLecciones(Integer idLecciones) {
        this.idLecciones = idLecciones;
    }
}
