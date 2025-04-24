package com.sena_proyecto_car_2025.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.sena_proyecto_car_2025.model.lecciones;
import com.sena_proyecto_car_2025.model.Cursos;
import com.sena_proyecto_car_2025.service.LeccionesService;
import com.sena_proyecto_car_2025.Dto.LeccionesDTO;
import com.sena_proyecto_car_2025.Dto.GenericResponseDTO;
import com.sena_proyecto_car_2025.repository.ICursos; 
import com.sena_proyecto_car_2025.exceptions.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/lecciones")
// Corregimos la anotación CrossOrigin para usar valores literales
@CrossOrigin(origins = {"http://localhost:5173", "http://192.168.1.23:5173"}, allowCredentials = "true")
public class lecciones_controller {

    @Autowired
    private LeccionesService leccionesService;

    // Inyectar el repositorio de Cursos
    @Autowired
    private ICursos cursosRepository;

    // Crear nueva lección
    @PostMapping("/create")
    public ResponseEntity<GenericResponseDTO<LeccionesDTO>> crear(@RequestBody LeccionesDTO dto) {
        // Añadir validación explícita para id_curso null
        if (dto.getId_curso() == null) {
             return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "El ID del curso no puede ser nulo.", null));
        }
        try {
            lecciones entity = convertToEntity(dto);
            leccionesService.save(entity); 
            LeccionesDTO savedDto = convertToDTO(entity); 
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección creada exitosamente", savedDto));
        } catch (ResourceNotFoundException e) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new GenericResponseDTO<>(404, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al crear lección: " + e.getMessage(), null));
        }
    }

    // Obtener todas las lecciones
    @GetMapping("/obtener")
    public ResponseEntity<GenericResponseDTO<List<LeccionesDTO>>> obtenerTodos() {
        try {
            System.out.println("Obteniendo todas las lecciones...");
            Iterable<lecciones> entities = leccionesService.findAll();
            List<LeccionesDTO> dtos = new ArrayList<>();
            entities.forEach(entity -> {
                LeccionesDTO dto = convertToDTO(entity);
                System.out.println("Lección convertida: " + dto);
                dtos.add(dto);
            });
            System.out.println("Total de lecciones encontradas: " + dtos.size());
            return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lecciones obtenidas exitosamente", dtos));
        } catch (Exception e) {
            System.err.println("Error al obtener lecciones: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener lecciones: " + e.getMessage(), null));
        }
    }

    // Obtener lección por ID
    @GetMapping("/obtener/{id}")
    public ResponseEntity<GenericResponseDTO<LeccionesDTO>> obtenerPorId(@PathVariable Integer id) {
        try {
            lecciones entity = leccionesService.findById(id);
            if (entity != null) {
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección encontrada", convertToDTO(entity)));
            } else {
                // Devolver 404 explícito con mensaje
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new GenericResponseDTO<>(404, "Lección no encontrada con ID: " + id, null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al obtener lección: " + e.getMessage(), null));
        }
    }

    // Actualizar lección
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<GenericResponseDTO<LeccionesDTO>> actualizar(
            @PathVariable Integer id,
            @RequestBody LeccionesDTO dto) {
         // Añadir validación explícita para id_curso null si se intenta actualizar
        if (dto.getId_curso() == null) {
             return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "El ID del curso no puede ser nulo para actualizar.", null));
        }
        try {
            lecciones existente = leccionesService.findById(id);
            if (existente != null) {
                updateEntityFromDTO(existente, dto);
                leccionesService.update(existente); 
                LeccionesDTO updatedDto = convertToDTO(existente);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección actualizada exitosamente", updatedDto));
            } else {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new GenericResponseDTO<>(404, "Lección no encontrada para actualizar con ID: " + id, null));
            }
         } catch (ResourceNotFoundException e) { 
             return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new GenericResponseDTO<>(404, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al actualizar lección: " + e.getMessage(), null));
        }
    }

    // Eliminar lección
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<GenericResponseDTO<Void>> eliminar(@PathVariable Integer id) {
        try {
            lecciones existente = leccionesService.findById(id);
            if (existente != null) {
                leccionesService.delete(id);
                return ResponseEntity.ok(new GenericResponseDTO<>(200, "Lección eliminada exitosamente", null));
            } else {
                 return ResponseEntity.status(HttpStatus.NOT_FOUND)
                     .body(new GenericResponseDTO<>(404, "Lección no encontrada para eliminar con ID: " + id, null));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new GenericResponseDTO<>(400, "Error al eliminar lección: " + e.getMessage(), null));
        }
    }

    // Métodos auxiliares para convertir entre DTO y Entity
    private LeccionesDTO convertToDTO(lecciones entity) {
        LeccionesDTO dto = new LeccionesDTO();
        dto.setId_leccion(entity.getId_leccion());
        dto.setNombre_leccion(entity.getNombre_leccion());
        dto.setDescripcion(entity.getDescripcion());
        dto.setRuta_leccion(entity.getRuta_leccion());
        if (entity.getCurso() != null) {
            // getIdCurso() devuelve Integer, se asigna directamente
            dto.setId_curso(entity.getCurso().getIdCurso()); 
        }
        return dto;
    }

    // Método corregido para convertir DTO a Entidad (ya maneja Integer)
    private lecciones convertToEntity(LeccionesDTO dto) throws ResourceNotFoundException {
        // La validación de null se hizo en el método 'crear'
        Cursos curso = cursosRepository.findById(dto.getId_curso()) 
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + dto.getId_curso()));

        lecciones entity = new lecciones();
        entity.setNombre_leccion(dto.getNombre_leccion());
        entity.setDescripcion(dto.getDescripcion());
        entity.setRuta_leccion(dto.getRuta_leccion());
        entity.setCurso(curso);
        return entity;
    }
    
    // Método de conversión para actualización (ajustado para Integer)
    private void updateEntityFromDTO(lecciones entity, LeccionesDTO dto) throws ResourceNotFoundException {
        entity.setNombre_leccion(dto.getNombre_leccion());
        entity.setDescripcion(dto.getDescripcion());
        entity.setRuta_leccion(dto.getRuta_leccion());
        
        // La validación de null se hizo en el método 'actualizar'
        Integer currentCursoId = (entity.getCurso() != null) ? entity.getCurso().getIdCurso() : null;
        
        // Comparamos el Integer actual con el Integer del DTO
        if (!Objects.equals(currentCursoId, dto.getId_curso())) { 
            Cursos nuevoCurso = cursosRepository.findById(dto.getId_curso())
               .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con ID: " + dto.getId_curso()));
            entity.setCurso(nuevoCurso);
        }
    }

    // Asegúrate de tener una clase de excepción personalizada o usa una existente
    // Puedes crear este archivo si no existe:
    // src/main/java/com/sena_proyecto_car_2025/exceptions/ResourceNotFoundException.java
    /*
    package com.sena_proyecto_car_2025.exceptions;
    
    import org.springframework.http.HttpStatus;
    import org.springframework.web.bind.annotation.ResponseStatus;
    
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message){
            super(message);
        }
    }
    */
}