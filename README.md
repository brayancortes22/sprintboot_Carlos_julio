# Proyecto SENA CAR 2025 - API REST

## Descripción
API REST desarrollada para el proyecto SENA CAR 2025, que gestiona aprendices, cursos, lecciones y certificados. La plataforma permite administrar el registro de aprendices, la creación de cursos, lecciones y la emisión de certificados.

## Tecnologías Utilizadas
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL/MariaDB
- Maven
- React
- Vite
- Tailwind CSS

## Estructura del Proyecto
```
back-end/sprint-boot/
├── src/main/java/com/sena_proyecto_car_2025/
│   ├── controller/         # Controladores REST
│   ├── model/             # Entidades
│   ├── repository/        # Repositorios JPA
│   ├── service/          # Servicios
│   ├── Dto/              # Objetos de Transferencia de Datos
│   ├── config/           # Configuraciones (CORS, seguridad)
│   ├── exceptions/       # Manejo de excepciones
│   └── security/         # Configuración de seguridad
```

## Características Principales
- Sistema de autenticación y autorización
- Gestión de aprendices, cursos, lecciones y certificados
- Diferentes vistas según el tipo de usuario (Admin, Aprendiz)
- API REST completamente documentada
- Frontend interactivo desarrollado con React

## Implementación de Seguridad

### Backend
El proyecto implementa un sistema de seguridad robusto con las siguientes características:

1. **Autenticación JWT (JSON Web Token)**:
   - Generación de tokens seguros para cada sesión
   - Validación de tokens en cada solicitud
   - Manejo de tokens expirados y renovación automática

2. **Cifrado de Contraseñas**:
   - Las contraseñas se almacenan cifradas usando BCrypt
   - No se guardan en texto plano en la base de datos
   - Salt único para cada contraseña

3. **Control de Acceso Basado en Roles (RBAC)**:
   - Roles definidos: ADMIN y USER (Aprendiz)
   - Restricción de acceso a endpoints según el rol del usuario
   - Validación de permisos en cada endpoint protegido

4. **Protección contra Ataques Comunes**:
   - CSRF (Cross-Site Request Forgery)
   - XSS (Cross-Site Scripting)
   - SQL Injection (mediante JPA y validación de parámetros)
   - Ataques de Fuerza Bruta (limitación de intentos de inicio de sesión)

5. **Configuración CORS Segura**:
   - Restricción de dominios permitidos
   - Control de métodos HTTP permitidos
   - Gestión de headers permitidos

### Frontend
El frontend implementa medidas de seguridad adicionales:

1. **Almacenamiento Seguro de Tokens**:
   - Uso de localStorage para tokens (en entorno de desarrollo)
   - Opción para utilizar cookies HttpOnly en producción

2. **Validación de Formularios**:
   - Sanitización de entradas para prevenir XSS
   - Validación en cliente para mejorar UX
   - Validación adicional en servidor

3. **Protección de Rutas**:
   - Componentes de rutas protegidas
   - Redirección automática a login para usuarios no autenticados
   - Separación de interfaces según roles (Admin/Aprendiz)

4. **Cierre de Sesión Automático**:
   - Detección de tokens expirados
   - Redirección a página de login al expirar la sesión

## Credenciales de Administrador por Defecto
Al ejecutar la aplicación por primera vez, se crea automáticamente un usuario administrador con las siguientes credenciales:

- **Correo**: admin@sena.edu.co
- **Contraseña**: 1234
- **Tipo de Usuario**: Administrador

Estas credenciales le permitirán acceder al panel de administración inmediatamente después de iniciar el sistema.

## Endpoints de la API

### Aprendiz-Curso
Base URL: `/api/aprendiz-curso`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/`      | Crear nueva inscripción |
| GET    | `/`      | Obtener todas las inscripciones |
| GET    | `/{id}`  | Obtener inscripción por ID |
| PUT    | `/{id}`  | Actualizar inscripción |
| DELETE | `/{id}`  | Eliminar inscripción |

### Cursos
Base URL: `/api/cursos`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/`      | Crear nuevo curso |
| GET    | `/`      | Obtener todos los cursos |
| GET    | `/{id}`  | Obtener curso por ID |
| PUT    | `/{id}`  | Actualizar curso |
| DELETE | `/{id}`  | Eliminar curso |

### Lecciones
Base URL: `/api/lecciones`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/`      | Crear nueva lección |
| GET    | `/`      | Obtener todas las lecciones |
| GET    | `/{id}`  | Obtener lección por ID |
| PUT    | `/{id}`  | Actualizar lección |
| DELETE | `/{id}`  | Eliminar lección |

### Certificados
Base URL: `/api/certificados`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST   | `/`      | Crear nuevo certificado |
| GET    | `/`      | Obtener todos los certificados |
| GET    | `/{id}`  | Obtener certificado por ID |
| PUT    | `/{id}`  | Actualizar certificado |
| DELETE | `/{id}`  | Eliminar certificado |

## Formato de Respuestas

Todas las respuestas siguen el siguiente formato:

```json
{
    "status": 200,
    "message": "Mensaje descriptivo",
    "data": {
        // Datos de la respuesta
    }
}
```

### Códigos de Estado
- 200: Operación exitosa
- 400: Error en la solicitud
- 404: Recurso no encontrado
- 500: Error interno del servidor

## DTOs (Data Transfer Objects)

### AprendizDTO
```json
{
    "id_aprendiz": 1,
    "nombre": "Nombre Aprendiz",
    "numeroDocumento": 123456789,
    "correo": "correo@ejemplo.com",
    "contraseña": "********",
    "tipoUsuario": true
}
```

### CursosDTO
```json
{
    "idCurso": 1,
    "codigoFicha": 12345,
    "nombrePrograma": "Nombre del Curso",
    "descripcion": "Descripción del curso",
    "fechaInicio": "2024-03-20T00:00:00"
}
```

### Instalación del Proyecto
### Requisitos Previos
- Java 17 o superior
- Node.js 16 o superior
- MySQL/MariaDB
- Maven

### Base de Datos
1. Crear una base de datos llamada `carlos_julio` en MySQL/MariaDB.
2. El esquema y las tablas se crearán automáticamente al ejecutar el backend.
3. Un usuario administrador se creará automáticamente en la primera ejecución.

### Back-end
1. Configurar la base de datos en `application.properties`:
    ```properties
    spring.application.name=sprint-boot
    # URL del servidor y base de datos
    spring.datasource.url=jdbc:mariadb://localhost:3306/carlos_julio
    # Usuario de la base de datos
    spring.datasource.username=root
    # Contraseña del usuario
    spring.datasource.password=123456
    # Driver de la base de datos
    spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
    # Dialecto de Hibernate para MariaDB
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
    # Tipo de SQL
    spring.jpa.hibernate.ddl-auto=update
    # Mostrar las consultas SQL
    spring.jpa.show-sql=true
    # Inicializar datos SQL
    spring.sql.init.mode=always
    spring.jpa.defer-datasource-initialization=true
    
    # Configuración del servidor
    server.address=0.0.0.0
    server.port=8080
    ```
2. Navegue a la carpeta del backend:
    ```sh
    cd back-end/sprint-boot
    ```
3. Ejecute el backend:
    ```sh
    ./mvnw spring-boot:run
    ```
   En Windows, puede usar:
    ```sh
    mvnw.cmd spring-boot:run
    ```

### Front-end
1. Instalar dependencias dentro de la terminal de comandos del proyecto:
    ```sh
    # Ingresar a la carpeta del front 
    cd front-end/gestion
    
    # Descargar dependencias
    npm install
    
    # Hacer funcionar el proyecto
    npm run dev
    ```

## Resumen del Desarrollo

### Backend (Spring Boot)
- Arquitectura REST API con controladores, servicios y repositorios
- Modelo de datos con entidades JPA
- DTOs para transferencia de datos
- Manejo de excepciones personalizado
- Configuración de CORS para permitir solicitudes desde el frontend
- Seguridad básica con autenticación
- Inicialización automática de datos (usuario admin)

### Frontend (React + Vite)
- Interfaz de usuario moderna con Tailwind CSS
- Comunicación con la API mediante servicios
- Manejo de estados con React Hooks
- Formularios para registro y gestión de entidades
- Tablas para visualización de datos
- Paneles específicos para administradores y aprendices
- Cliente HTTP para comunicación con el backend

# Solución de Problemas Comunes

## Error: ERR_CONNECTION_REFUSED

Si recibes el error `net::ERR_CONNECTION_REFUSED` al intentar acceder a la API, sigue estos pasos:

1. **Verificar que el servidor backend está corriendo**:
   ```bash
   # Navegar al directorio del backend
   cd back-end/sprint-boot
   
   # Iniciar el servidor
   ./mvnw spring-boot:run
   ```

2. **Verificar el firewall de Windows**:
   - Abrir "Firewall de Windows Defender con seguridad avanzada"
   - Ir a "Reglas de entrada"
   - Crear una nueva regla:
     1. Seleccionar "Puerto"
     2. TCP, puertos específicos: 8080, 5173
     3. "Permitir la conexión"
     4. Marcar todos los perfiles
     5. Nombrar la regla (ej: "API SENA")

3. **Verificar la configuración de red**:
   - Asegurarse de que el servidor y el cliente están en la misma red
   - Verificar que no hay restricciones de red corporativas
   - Probar con estos comandos:
     ```bash
     # Verificar si el puerto está abierto localmente
     netstat -ano | findstr :8080
     
     # Probar conexión desde otro dispositivo
     ping 172.30.5.207
     ```

4. **Verificar application.properties**:
   ```properties
   # Agregar esta línea para permitir conexiones externas
   server.address=0.0.0.0
   ```

5. **Verificar la URL en el frontend**:
   ```javascript
   // Asegurarse de usar la IP correcta
   const API_URL = 'http://172.30.5.207:8080';
   ```

## Pasos de Verificación Rápida

1. **¿Está corriendo el backend?**
   - Abrir `http://localhost:8080/aprendiz` en el navegador del servidor
   - Debería ver datos o un mensaje JSON

2. **¿Está configurado CORS correctamente?**
   - Revisar los headers de respuesta usando las herramientas de desarrollo
   - Buscar `Access-Control-Allow-Origin` en los headers

3. **¿Los puertos están abiertos?**
   - Usar el comando: `netstat -ano | findstr :8080`
   - Debería ver una entrada para el puerto 8080

4. **¿La red permite la conexión?**
   - Hacer ping a la IP del servidor: `ping 172.30.5.207`
   - Probar telnet: `telnet 172.30.5.207 8080`

## Lista de Verificación para Testers

✅ El servidor backend está corriendo  
✅ Los puertos necesarios están abiertos (8080, 5173)  
✅ Estás conectado a la misma red que el servidor  
✅ La IP del servidor es accesible (puedes hacer ping)  
✅ No hay restricciones de firewall bloqueando la conexión  
✅ La configuración CORS permite tu origen  
✅ Estás usando la URL correcta con la IP y puerto adecuados  

## Comandos Útiles para Diagnóstico

```bash
# Ver puertos en uso
netstat -ano | findstr :8080

# Ver IP del servidor
ipconfig

# Probar conexión
ping 172.30.5.207

# Ver procesos usando el puerto 8080
tasklist /fi "PID eq PUERTO_PID"

# Matar proceso si es necesario
taskkill /PID NUMERO_PID /F
```

## Autores
- Brayan stid cortes lombana - SENA 2025

## Licencia
Este proyecto está bajo la Licencia bscl

