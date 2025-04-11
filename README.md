# Proyecto SENA CAR 2025 - API REST

## Descripción
API REST desarrollada para el proyecto SENA CAR 2025, que gestiona aprendices, cursos, lecciones y certificados.

## Tecnologías Utilizadas
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

## Estructura del Proyecto
```
back-end/sprint-boot/
├── src/main/java/com/sena_proyecto_car_2025/
│   ├── controller/         # Controladores REST
│   ├── model/             # Entidades
│   ├── repository/        # Repositorios JPA
│   ├── service/          # Servicios
│   └── Dto/              # Objetos de Transferencia de Datos
```

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
#### Front-end
1. Instalar dependencias dentro de la terminal de comandos del proyecto:
    a) Ingresar a la carpeta del front con el comando: `cd front-end/gestion`
    b) Descargar dependencias con el comando: `npm install`
    c) Hacer funcionar el proyecto con el comando: `npm run dev`

#### Back-end
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
    spring.jpa.hibernate.ddl-auto=create-drop
    # Mostrar las consultas SQL
    spring.jpa.show-sql=true
    ```
2. Ejecutar el backend:
    ```sh
    ./mvnw spring-boot:run
    ```

## Operaciones CRUD con Thunder Client

### Crear un Aprendiz
- **Método:** POST
- **URL:** `http://localhost:8080/aprendiz/Aprendiz`
- **Body:**
    ```json
    {
        "nombre": "Juan Perez",
        "numeroDocumento": 123456789,
        "correo": "juan.perez@example.com",
        "contraseña": "password123",
        "tipoUsuario": true
    }
    ```

### Obtener Todos los Aprendices
- **Método:** GET
- **URL:** `http://localhost:8080/aprendiz`

### Obtener Aprendiz por ID
- **Método:** GET
- **URL:** `http://localhost:8080/aprendiz/{id}`

### Actualizar Aprendiz
- **Método:** PUT
- **URL:** `http://localhost:8080/aprendiz/{id}`
- **Body:**
    ```json
    {
        "nombre": "Juan Perez Actualizado",
        "numeroDocumento": 987654321,
        "correo": "juan.perez.actualizado@example.com",
        "contraseña": "newpassword123",
        "tipoUsuario": false
    }
    ```

### Eliminar Aprendiz
- **Método:** DELETE
- **URL:** `http://localhost:8080/aprendiz/{id}`

### Crear un Curso
- **Método:** POST
- **URL:** `http://localhost:8080/api/cursos`
- **Body:**
    ```json
    {
        "codigoFicha": 1234,
        "nombrePrograma": "Programación Java",
        "descripcion": "Curso de programación en Java",
        "fechaInicio": "2025-03-24T00:00:00",
        "fechaFin": "2025-06-24T00:00:00"
    }
    ```

### Obtener Todos los Cursos
- **Método:** GET
- **URL:** `http://localhost:8080/api/cursos`

### Obtener Curso por ID
- **Método:** GET
- **URL:** `http://localhost:8080/api/cursos/{id}`

### Actualizar Curso
- **Método:** PUT
- **URL:** `http://localhost:8080/api/cursos/{id}`
- **Body:**
    ```json
    {
        "codigoFicha": 5678,
        "nombrePrograma": "Programación Avanzada en Java",
        "descripcion": "Curso avanzado de programación en Java",
        "fechaInicio": "2025-04-01T00:00:00",
        "fechaFin": "2025-07-01T00:00:00"
    }
    ```

### Eliminar Curso
- **Método:** DELETE
- **URL:** `http://localhost:8080/api/cursos/{id}`

### Crear una Lección
- **Método:** POST
- **URL:** `http://localhost:8080/api/lecciones`
- **Body:**
    ```json
    {
        "nombre_leccion": "Introducción a Java",
        "descripcion": "Lección sobre los fundamentos de Java",
        "ruta_leccion": "/ruta/a/la/leccion",
        "id_curso": 1
    }
    ```

### Obtener Todas las Lecciones
- **Método:** GET
- **URL:** `http://localhost:8080/api/lecciones`

### Obtener Lección por ID
- **Método:** GET
- **URL:** `http://localhost:8080/api/lecciones/{id}`

### Actualizar Lección
- **Método:** PUT
- **URL:** `http://localhost:8080/api/lecciones/{id}`
- **Body:**
    ```json
    {
        "nombre_leccion": "Introducción a Java Actualizada",
        "descripcion": "Lección actualizada sobre los fundamentos de Java",
        "ruta_leccion": "/ruta/a/la/leccion/actualizada",
        "id_curso": 1
    }
    ```

### Eliminar Lección
- **Método:** DELETE
- **URL:** `http://localhost:8080/api/lecciones/{id}`

### Crear un Certificado
- **Método:** POST
- **URL:** `http://localhost:8080/api/certificados`
- **Body:**
    ```json
    {
        "id_lecciones": 1,
        "id_aprendiz": 1,
        "nombreCertificado": "Certificado de Java",
        "numeroDocumentoCertificado": 123456,
        "fechaFin": "2025-06-24T00:00:00"
    }
    ```

### Obtener Todos los Certificados
- **Método:** GET
- **URL:** `http://localhost:8080/api/certificados`

### Obtener Certificado por ID
- **Método:** GET
- **URL:** `http://localhost:8080/api/certificados/{id}`

### Actualizar Certificado
- **Método:** PUT
- **URL:** `http://localhost:8080/api/certificados/{id}`
- **Body:**
    ```json
    {
        "id_lecciones": 1,
        "id_aprendiz": 1,
        "nombreCertificado": "Certificado de Java Actualizado",
        "numeroDocumentoCertificado": 654321,
        "fechaFin": "2025-12-24T00:00:00"
    }
    ```

### Eliminar Certificado
- **Método:** DELETE
- **URL:** `http://localhost:8080/api/certificados/{id}`

# Configuración para Acceso Remoto a la API

Este documento describe los pasos necesarios para permitir el acceso remoto a la API y realizar pruebas desde otros dispositivos en la red.

## 1. Configuración de CORS en el Backend

### 1.1 Modificar CorsConfig.java
Ubicación: `back-end/sprint-boot/src/main/java/com/sena_proyecto_car_2025/config/CorsConfig.java`

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir solicitudes desde cualquier origen durante testing
        config.addAllowedOriginPattern("*");
        
        // Permitir todos los métodos HTTP necesarios
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permitir todos los headers necesarios
        config.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"
        ));
        
        // Deshabilitar credenciales para testing
        config.setAllowCredentials(false);
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

### 1.2 Agregar anotación CORS a los controladores
Ejemplo en `AprendizController.java`:
```java
@RestController
@RequestMapping("/aprendiz")
@CrossOrigin(origins = "*")
public class AprendizController {
    // ... resto del código
}
```

## 2. Configuración del Frontend

### 2.1 Modificar las URLs de la API
En todos los archivos de servicio del frontend (`src/services/*.js`), actualizar la URL base:

```javascript
// Cambiar de localhost a la IP del servidor
const API_URL = 'http://TU_IP:8080';
```

Archivos a modificar:
- `src/services/aprendizService.js`
- `src/services/certificadosService.js`
- `src/services/cursosService.js`
- `src/services/leccionesService.js`
- `src/services/aprendizCursoService.js`

## 3. Pasos para Compartir la API

1. **Obtener la IP del servidor**:
   - En Windows: Abrir CMD y ejecutar `ipconfig`
   - Buscar la dirección IPv4 (ejemplo: 192.168.x.x)

2. **Iniciar el Backend**:
   ```bash
   cd back-end/sprint-boot
   ./mvnw spring-boot:run
   ```
   El backend estará disponible en: `http://TU_IP:8080`

3. **Iniciar el Frontend**:
   ```bash
   cd front-end/gestion
   npm run dev
   ```
   El frontend estará disponible en: `http://TU_IP:5173`

## 4. Endpoints Disponibles

### 4.1 Aprendices
- GET `/aprendiz` - Obtener todos los aprendices
- GET `/aprendiz/{id}` - Obtener un aprendiz por ID
- POST `/aprendiz` - Crear nuevo aprendiz
- PUT `/aprendiz/{id}` - Actualizar aprendiz
- DELETE `/aprendiz/{id}` - Eliminar aprendiz

### 4.2 Certificados
- GET `/api/certificados` - Obtener todos los certificados
- GET `/api/certificados/{id}` - Obtener certificado por ID
- POST `/api/certificados` - Crear nuevo certificado
- PUT `/api/certificados/{id}` - Actualizar certificado
- DELETE `/api/certificados/{id}` - Eliminar certificado

### 4.3 Cursos
- GET `/api/cursos` - Obtener todos los cursos
- GET `/api/cursos/{id}` - Obtener curso por ID
- POST `/api/cursos` - Crear nuevo curso
- PUT `/api/cursos/{id}` - Actualizar curso
- DELETE `/api/cursos/{id}` - Eliminar curso

## 5. Requisitos para Testers

1. Estar conectado a la misma red que el servidor
2. Tener acceso a:
   - Frontend: `http://TU_IP:5173`
   - Backend: `http://TU_IP:8080`
3. Para probar los endpoints directamente:
   - Usar herramientas como Postman o Insomnia
   - Configurar el header `Content-Type: application/json`

## 6. Consideraciones de Seguridad

⚠️ **Importante**: Esta configuración está pensada para entornos de desarrollo y pruebas. Para producción:

1. No usar `allowedOriginPattern("*")`
2. Configurar orígenes específicos
3. Implementar autenticación
4. Usar HTTPS
5. Configurar firewalls apropiadamente

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
