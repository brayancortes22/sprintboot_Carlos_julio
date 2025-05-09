package com.sena_proyecto_car_2025.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena_proyecto_car_2025.model.aprendiz_curso;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.model.Cursos;
import java.util.List;
import java.sql.Timestamp;
import org.springframework.lang.NonNull;

public interface IAprendizCurso extends CrudRepository<aprendiz_curso, Long> {
    
    // Guardar entidad
    @NonNull
    @Override
    <S extends aprendiz_curso> S save(@NonNull S entity);
    
    // Buscar por aprendiz
    @Query("SELECT ac FROM aprendiz_curso ac WHERE ac.aprendiz = :aprendiz")
    List<aprendiz_curso> findByAprendiz(@Param("aprendiz") Aprendiz aprendiz);
    
    // Buscar por curso
    @Query("SELECT ac FROM aprendiz_curso ac WHERE ac.curso = :curso")
    List<aprendiz_curso> findByCurso(@Param("curso") Cursos curso);
    
    // Buscar por rango de fechas de inscripción
    @Query("SELECT ac FROM aprendiz_curso ac WHERE ac.fechaInscripcion BETWEEN :fechaInicio AND :fechaFin")
    List<aprendiz_curso> findByFechaInscripcionBetween(
        @Param("fechaInicio") Timestamp fechaInicio, 
        @Param("fechaFin") Timestamp fechaFin
    );
    
    // Buscar inscripciones activas (basado en la fecha de fin del curso)
    @Query("SELECT ac FROM aprendiz_curso ac WHERE ac.curso.fechaFin > :fechaActual")
    List<aprendiz_curso> findActiveEnrollments(@Param("fechaActual") Timestamp fechaActual);
    
    // Eliminar todas las inscripciones asociadas a un curso
    @Modifying
    @Query("DELETE FROM aprendiz_curso ac WHERE ac.curso.idCurso = :idCurso")
    void deleteByIdCurso(@Param("idCurso") Integer idCurso);
}