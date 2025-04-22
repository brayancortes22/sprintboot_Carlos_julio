package com.sena_proyecto_car_2025.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.sena_proyecto_car_2025.model.Aprendiz;

@Repository
public interface IAprendiz extends CrudRepository<Aprendiz, Integer> {
}
