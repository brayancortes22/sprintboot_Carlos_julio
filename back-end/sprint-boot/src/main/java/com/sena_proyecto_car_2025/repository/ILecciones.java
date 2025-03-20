package com.sena_proyecto_car_2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.model.Cursos;
import java.util.List;

public interface ILecciones extends JpaRepository<lecciones, Integer> {
    
    // Buscar por nombre de lección
    @Query("SELECT l FROM lecciones l WHERE LOWER(l.nombre_leccion) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<lecciones> findByNombreLeccionContaining(@Param("nombre") String nombre);
    
    // Buscar por curso
    @Query("SELECT l FROM lecciones l WHERE l.curso = :curso")
    List<lecciones> findByCurso(@Param("curso") Cursos curso);
    
    // Buscar por descripción que contenga
    @Query("SELECT l FROM lecciones l WHERE LOWER(l.descripcion) LIKE LOWER(CONCAT('%', :descripcion, '%'))")
    List<lecciones> findByDescripcionContaining(@Param("descripcion") String descripcion);
    
    // Buscar por ruta de lección
    @Query("SELECT l FROM lecciones l WHERE l.ruta_leccion = :ruta")
    lecciones findByRutaLeccion(@Param("ruta") String ruta);
} 