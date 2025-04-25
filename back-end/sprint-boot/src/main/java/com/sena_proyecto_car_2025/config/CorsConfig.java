package com.sena_proyecto_car_2025.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "http://192.168.1.23:5173", "http://172.30.1.191:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                    .allowedHeaders("*")
                    .exposedHeaders("Authorization")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
    
    // Esta propiedad será usada para identificar los orígenes válidos en filtros de seguridad
    public static final String[] ALLOWED_ORIGINS = {"http://localhost:5173", "http://192.168.1.23:5173", "http://172.30.1.191:5173"};
}