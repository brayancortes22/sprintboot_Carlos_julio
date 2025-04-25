package com.sena_proyecto_car_2025.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sena_proyecto_car_2025.Dto.AuthRequestDTO;
import com.sena_proyecto_car_2025.Dto.AuthResponseDTO;
import com.sena_proyecto_car_2025.model.Aprendiz;
import com.sena_proyecto_car_2025.repository.IAprendiz;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private IAprendiz aprendizRepository;

    public AuthResponseDTO authenticate(AuthRequestDTO request) {
        // Autenticar el usuario
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getCorreo(),
                request.getContraseña()
            )
        );
        
        // Obtener el usuario a partir del correo
        Optional<Aprendiz> aprendizOptional = filterAprendizByCorreo(request.getCorreo());
        Aprendiz aprendiz = aprendizOptional.orElseThrow(() -> 
            new UsernameNotFoundException("Usuario no encontrado"));
        
        // Verificar si el tipo de usuario coincide
        if (aprendiz.getTipoUsuario() != request.getTipoUsuario()) {
            throw new RuntimeException("Tipo de usuario incorrecto");
        }
        
        // Obtener los detalles del usuario autenticado
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        // Generar el token
        String token = jwtService.generateToken(userDetails);
        
        // Crear y devolver la respuesta
        return new AuthResponseDTO(
            token, 
            aprendiz.getId_aprendiz(), 
            aprendiz.getNombre(), 
            aprendiz.getNumeroDocumento(), 
            aprendiz.getCorreo(), 
            aprendiz.getTipoUsuario()
        );
    }
    
    // Método auxiliar para filtrar aprendices por correo
    private Optional<Aprendiz> filterAprendizByCorreo(String correo) {
        Iterable<Aprendiz> aprendices = aprendizRepository.findAll();
        for (Aprendiz aprendiz : aprendices) {
            if (aprendiz.getCorreo().equals(correo)) {
                return Optional.of(aprendiz);
            }
        }
        return Optional.empty();
    }
}