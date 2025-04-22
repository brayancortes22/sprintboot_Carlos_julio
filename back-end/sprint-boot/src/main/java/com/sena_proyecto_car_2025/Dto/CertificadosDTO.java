package com.sena_proyecto_car_2025.Dto;

import java.util.Date;

public class CertificadosDTO {
    private int idCertificado;
    private String nombre_certificado;
    private Integer numero_documento_certificado;
    private Date fecha_fin;
    private Integer id_aprendiz;
    private Integer id_lecciones;

    // Constructor
    public CertificadosDTO() {}

    // Getters
    public int getIdCertificado() {
        return idCertificado;
    }

    public void setIdCertificado(int idCertificado) {
        this.idCertificado = idCertificado;
    }

    public String getNombre_certificado() {
        return nombre_certificado;
    }

    public Integer getNumero_documento_certificado() {
        return numero_documento_certificado;
    }

    public Date getFecha_fin() {
        return fecha_fin;
    }

    public Integer getId_aprendiz() {
        return id_aprendiz;
    }

    public Integer getId_lecciones() {
        return id_lecciones;
    }

    // Setters
    public void setNombre_certificado(String nombre_certificado) {
        this.nombre_certificado = nombre_certificado;
    }

    public void setNumero_documento_certificado(Integer numero_documento_certificado) {
        this.numero_documento_certificado = numero_documento_certificado;
    }

    public void setFecha_fin(Date fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public void setId_aprendiz(Integer id_aprendiz) {
        this.id_aprendiz = id_aprendiz;
    }

    public void setId_lecciones(Integer id_lecciones) {
        this.id_lecciones = id_lecciones;
    }
}