package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.service.AprendizService;

@RestController
@RequestMapping("/aprendiz")
public class AprendizController {

    @Autowired
    private AprendizService aprendizService;

    @GetMapping
    public ResponseEntity<Iterable<Aprendiz>> getAllAprendices() {
        return ResponseEntity.ok(aprendizService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aprendiz> getAprendizById(@PathVariable Integer id) {
        Aprendiz aprendiz = aprendizService.findById(id);
        if (aprendiz != null) {
            return ResponseEntity.ok(aprendiz);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Aprendiz> createAprendiz(@RequestBody Aprendiz aprendiz) {
        aprendizService.save(aprendiz);
        return ResponseEntity.ok(aprendiz);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aprendiz> updateAprendiz(@PathVariable Integer id, @RequestBody Aprendiz aprendiz) {
        Aprendiz existingAprendiz = aprendizService.findById(id);
        if (existingAprendiz != null) {
            aprendiz.setId_aprendiz(id);
            aprendizService.update(aprendiz);
            return ResponseEntity.ok(aprendiz);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAprendiz(@PathVariable Integer id) {
        if (aprendizService.delete(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
