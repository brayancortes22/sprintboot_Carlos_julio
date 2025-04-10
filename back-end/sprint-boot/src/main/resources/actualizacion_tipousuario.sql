-- Actualizar el tipo de usuario del registro existente con ID 1
-- Cambiamos de booleano (0: Administrador, 1: Aprendiz) a entero (1: Administrador, 2: Aprendiz)
UPDATE aprendiz SET tipoUsuario = 1 WHERE id_aprendiz = 1;

-- Para futuras inserciones, usar el nuevo formato
-- Por ejemplo, para insertar un nuevo administrador:
-- INSERT INTO aprendiz (nombre, numero_documento, correo, contraseña, tipoUsuario) VALUES ('NombreAdmin', 12345678, 'admin@example.com', 'password', 1);

-- Para insertar un nuevo aprendiz:
-- INSERT INTO aprendiz (nombre, numero_documento, correo, contraseña, tipoUsuario) VALUES ('NombreAprendiz', 87654321, 'aprendiz@example.com', 'password', 2); 