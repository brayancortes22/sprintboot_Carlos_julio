package com.sena_proyecto_car_2025.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    // Define aquí todos tus orígenes permitidos en un solo lugar
    public static final String[] ALLOWED_ORIGINS = {
        // Localhost
        "http://localhost:5173",
        
        // IPs de la red local - añade todas las necesarias
        "http://192.168.1.23:5173", 
        "http://172.30.1.191:5173",
        "http://172.30.208.1:5173",
        "http://172.30.5.207:5173",
        "http://192.168.1.3:5173"
        
        
        // Wildcard para permitir cualquier origen en desarrollo (opcional, comenta en producción)
        // "*"
    };
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins(ALLOWED_ORIGINS)
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                    .allowedHeaders("*")
                    .exposedHeaders("Authorization")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}