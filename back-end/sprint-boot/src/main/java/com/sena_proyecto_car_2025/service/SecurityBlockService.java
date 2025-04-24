package com.sena_proyecto_car_2025.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SecurityBlockService {
    
    // Almacena IP y tiempo hasta el que está bloqueada
    private final Map<String, LocalDateTime> blockedIps = new ConcurrentHashMap<>();
    
    // Tiempo de bloqueo en minutos
    private static final int BLOCK_MINUTES = 2;
    
    /**
     * Bloquea una dirección IP por el tiempo configurado
     */
    public void blockIpAddress(String ipAddress) {
        blockedIps.put(ipAddress, LocalDateTime.now().plusMinutes(BLOCK_MINUTES));
    }
    
    /**
     * Verifica si una IP está bloqueada y limpia entradas expiradas
     */
    public boolean isIpBlocked(String ipAddress) {
        // Limpiar IPs cuyo bloqueo ha expirado
        cleanExpiredBlocks();
        
        // Verificar si la IP está en la lista de bloqueados
        return blockedIps.containsKey(ipAddress);
    }
    
    /**
     * Elimina los bloqueos que ya han expirado
     */
    private void cleanExpiredBlocks() {
        LocalDateTime now = LocalDateTime.now();
        blockedIps.entrySet().removeIf(entry -> entry.getValue().isBefore(now));
    }
}