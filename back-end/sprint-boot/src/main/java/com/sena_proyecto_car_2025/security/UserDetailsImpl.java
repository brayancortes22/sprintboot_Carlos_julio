package com.sena_proyecto_car_2025.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.sena_proyecto_car_2025.model.Aprendiz;

public class UserDetailsImpl implements UserDetails {

    private final Aprendiz aprendiz;

    public UserDetailsImpl(Aprendiz aprendiz) {
        this.aprendiz = aprendiz;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Asignar autoridades basadas en el tipo de usuario
        String role = aprendiz.getTipoUsuario() == 1 ? "ROLE_ADMIN" : "ROLE_APRENDIZ";
        return Collections.singletonList(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getPassword() {
        return aprendiz.getContraseña();
    }

    @Override
    public String getUsername() {
        // Utilizamos el correo como identificador único
        return aprendiz.getCorreo();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
    // Método para obtener el aprendiz
    public Aprendiz getAprendiz() {
        return aprendiz;
    }
}