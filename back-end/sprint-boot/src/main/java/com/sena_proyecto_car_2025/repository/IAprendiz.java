package com.sena_proyecto_car_2025.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sena_proyecto_car_2025.model.Aprendiz;
import java.util.List;

public interface IAprendiz extends JpaRepository<Aprendiz, Integer> {
    //from apr
    //metodo para buscar por id
    
    // Buscar por número de documento
    @Query("SELECT a FROM aprendiz a WHERE a.numeroDocumento = :documento")
    Aprendiz findByNumeroDocumento(@Param("documento") long documento);
    
    // Buscar por correo
    @Query("SELECT a FROM aprendiz a WHERE a.correo = :correo")
    Aprendiz findByCorreo(@Param("correo") String correo);
    
    // Buscar por tipo de usuario
    @Query("SELECT a FROM aprendiz a WHERE a.tipoUsuario = :tipo")
    List<Aprendiz> findByTipoUsuario(@Param("tipo") boolean tipo);
    
    // Buscar por nombre que contenga
    @Query("SELECT a FROM aprendiz a WHERE LOWER(a.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))")
    List<Aprendiz> findByNombreContaining(@Param("nombre") String nombre);
}
