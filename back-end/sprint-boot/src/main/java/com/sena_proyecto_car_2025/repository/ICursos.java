package com.sena_proyecto_car_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena_proyecto_car_2025.model.Cursos;
import java.util.List;
import java.sql.Timestamp;

public interface ICursos extends JpaRepository<Cursos, Integer> {
    
    // Buscar por código de ficha
    @Query("SELECT c FROM cursos c WHERE c.codigoFicha = :codigo")
    Cursos findByCodigoFicha(@Param("codigo") int codigo);
    
    // Buscar por nombre de programa
    @Query("SELECT c FROM cursos c WHERE LOWER(c.nombrePrograma) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Cursos> findByNombreProgramaContaining(@Param("nombre") String nombre);
    
    // Buscar cursos activos (fecha fin mayor a la actual)
    @Query("SELECT c FROM cursos c WHERE c.fechaFin > :fechaActual")
    List<Cursos> findActiveCourses(@Param("fechaActual") Timestamp fechaActual);
    
    // Buscar cursos por rango de fechas
    @Query("SELECT c FROM cursos c WHERE c.fechaInicio >= :fechaInicio AND c.fechaFin <= :fechaFin")
    List<Cursos> findByDateRange(@Param("fechaInicio") Timestamp fechaInicio, @Param("fechaFin") Timestamp fechaFin);
} 