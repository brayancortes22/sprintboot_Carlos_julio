package com.sena_proyecto_car_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena_proyecto_car_2025.model.Certificados;
import java.util.List;
import java.sql.Timestamp;

public interface ICertificados extends JpaRepository<Certificados, Integer> {
    
    // Buscar por nombre de certificado
    @Query("SELECT c FROM Certificados c WHERE LOWER(c.nombreCertificado) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Certificados> findByNombreCertificadoContaining(@Param("nombre") String nombre);
    
    // Buscar por número de documento del certificado
    @Query("SELECT c FROM Certificados c WHERE c.numeroDocumentoCertificado = :numero")
    Certificados findByNumeroDocumentoCertificado(@Param("numero") int numero);
    
    // Buscar por aprendiz
    @Query("SELECT c FROM Certificados c WHERE c.idAprendiz = :aprendiz")
    List<Certificados> findByAprendiz(@Param("aprendiz") Integer aprendiz);
    
    // Buscar por lección
    @Query("SELECT c FROM Certificados c WHERE c.idLecciones = :leccion")
    List<Certificados> findByLeccion(@Param("leccion") Integer leccion);
    
    // Buscar por rango de fechas de finalización
    @Query("SELECT c FROM Certificados c WHERE c.fechaFin BETWEEN :fechaInicio AND :fechaFin")
    List<Certificados> findByFechaFinBetween(@Param("fechaInicio") Timestamp fechaInicio, @Param("fechaFin") Timestamp fechaFin);

    List<Certificados> findByIdAprendiz(Integer idAprendiz);
    
    // Eliminar certificados por ID de lección
    @Modifying
    @Query("DELETE FROM Certificados c WHERE c.idLecciones = :idLeccion")
    void deleteByIdLeccion(@Param("idLeccion") Integer idLeccion);
    
    // Eliminar certificados asociados con lecciones de un curso específico
    @Modifying
    @Query("DELETE FROM Certificados c WHERE c.idLecciones IN (SELECT l.id_leccion FROM lecciones l WHERE l.curso.idCurso = :idCurso)")
    void deleteByCursoId(@Param("idCurso") Integer idCurso);
}