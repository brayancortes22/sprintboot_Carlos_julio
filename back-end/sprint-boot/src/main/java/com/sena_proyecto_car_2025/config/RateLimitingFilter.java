package com.sena_proyecto_car_2025.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// @Component
// public class RateLimitingFilter extends OncePerRequestFilter {

//     private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
//             throws ServletException, IOException {
        
//         // String ip = getClientIP(request);
//         // Bucket bucket = buckets.computeIfAbsent(ip, this::createNewBucket);
        
//     //     if (bucket.tryConsume(1)) {
//     //         filterChain.doFilter(request, response);
//     //     } else {
//     //         // Establecer tipo de contenido como JSON
//     //         response.setContentType("application/json");
//     //         response.setStatus(429); // Too Many Requests
//     //         response.getWriter().write("{\"status\": 429, \"message\": \"Demasiadas peticiones. Por favor, intente más tarde.\"}");
//     //     }
//     // }

//     // private Bucket createNewBucket(String ip) {
//     //     // 50 peticiones en 10 segundos (aumentado desde el valor original)
//     //     Bandwidth limit = Bandwidth.classic(50, Refill.intervally(50, Duration.ofSeconds(10)));
//     //     return Bucket4j.builder().addLimit(limit).build();
//     // }

//     private String getClientIP(HttpServletRequest request) {
//         String xfHeader = request.getHeader("X-Forwarded-For");
//         if (xfHeader == null) {
//             return request.getRemoteAddr();
//         }
//         return xfHeader.split(",")[0];
//     }
// }