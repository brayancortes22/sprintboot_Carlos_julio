package com.sena_proyecto_car_2025.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utilidad para codificar contraseñas para inserción manual en la base de datos
 */
public class PasswordEncoder {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Lista de contraseñas a encriptar
        String[] passwords = {"1234", "1222", "ftrcf"};
        
        System.out.println("Contraseñas encriptadas para inserción en la base de datos:");
        System.out.println("=====================================================");
        
        for (String password : passwords) {
            String encodedPassword = encoder.encode(password);
            System.out.println("Contraseña original: " + password);
            System.out.println("Contraseña encriptada: " + encodedPassword);
            System.out.println("-----------------------------------------------------");
        }
    }
}