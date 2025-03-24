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
