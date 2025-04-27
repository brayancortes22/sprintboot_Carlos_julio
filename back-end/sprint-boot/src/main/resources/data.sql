-- Crear usuario administrador por defecto
INSERT INTO aprendiz (nombre, numero_documento, correo, contraseña, tipo_usuario)
SELECT 'Administrador', 123456789, 'admin@sena.edu.co', '$2a$10$X/3eiAIxKMnRLZKOUPu0pefBbzUfinxEpW9JNjDtPHwK.S8gLEWzS', true
WHERE NOT EXISTS (SELECT 1 FROM aprendiz WHERE correo = 'admin@sena.edu.co');
-- La contraseña cifrada es 'admin123'