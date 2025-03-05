package com.sena_proyecto_car_2025.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sena_proyecto_car_2025.model.aprendiz_curso;


//extendemos de jpa repository para generar la conexion
//javaRepository<modelo,tipo pk >

public interface IAprendiz_curso extends JpaRepository<aprendiz_curso, Integer> {
    //from apr
    //metodo para buscar por id

}
