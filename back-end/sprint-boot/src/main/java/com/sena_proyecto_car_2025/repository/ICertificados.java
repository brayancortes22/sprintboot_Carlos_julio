package com.sena_proyecto_car_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena_proyecto_car_2025.model.Certificados;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.model.lecciones;
import java.util.List;
import java.sql.Timestamp;

public interface ICertificados extends JpaRepository<Certificados, Integer> {
    
    // Buscar por nombre de certificado
    @Query("SELECT c FROM certificados c WHERE LOWER(c.nombreCertificado) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Certificados> findByNombreCertificadoContaining(@Param("nombre") String nombre);
    
    // Buscar por número de documento del certificado
    @Query("SELECT c FROM certificados c WHERE c.numeroDocumentoCertificado = :numero")
    Certificados findByNumeroDocumentoCertificado(@Param("numero") int numero);
    
    // Buscar por aprendiz
    @Query("SELECT c FROM certificados c WHERE c.aprendiz = :aprendiz")
    List<Certificados> findByAprendiz(@Param("aprendiz") Aprendiz aprendiz);
    
    // Buscar por lección
    @Query("SELECT c FROM certificados c WHERE c.lecciones = :leccion")
    List<Certificados> findByLeccion(@Param("leccion") lecciones leccion);
    
    // Buscar por rango de fechas de finalización
    @Query("SELECT c FROM certificados c WHERE c.fechaFin BETWEEN :fechaInicio AND :fechaFin")
    List<Certificados> findByFechaFinBetween(@Param("fechaInicio") Timestamp fechaInicio, @Param("fechaFin") Timestamp fechaFin);
} 