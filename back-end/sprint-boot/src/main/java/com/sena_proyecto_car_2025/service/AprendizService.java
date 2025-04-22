package com.sena_proyecto_car_2025.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.repository.IAprendiz;
import java.util.List;

@Service
public class AprendizService {

    @Autowired
    private IAprendiz aprendizRepository;

    public List<Aprendiz> findAll() {
        return (List<Aprendiz>) aprendizRepository.findAll();
    }

    public Aprendiz findById(Integer id) {
        return aprendizRepository.findById(id).orElse(null);
    }

    public Aprendiz save(Aprendiz aprendiz) {
        return aprendizRepository.save(aprendiz);
    }

    public Aprendiz update(Aprendiz aprendiz) {
        return aprendizRepository.save(aprendiz);
    }

    public boolean delete(Integer id) {
        try {
            aprendizRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}