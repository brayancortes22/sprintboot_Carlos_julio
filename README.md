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
    "fechaInicio": "2024-03-20T00:00:00",

}
´´´

### instalacion del proyecto
front-end
1. instalar dependencias dentro de la terminal de comandos de proyecto
   
    a) ingresar a la carpeta del front con el comando : cd front-end/gestion
   
    b) descargar dependecias con el comando : npm install
   
    c) hacer funcionar el proyecto con el comando : npm run dev
    
2. correr el el backend
    a) Configurar la base de datos en application.properties
    ´´´
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
    ´´´
    b) Ejecutar el backend:
    ´´´
    ./mvnw spring-boot:run
    ´´´
## Operaciones CRUD con Thunder Client
    Crear un Aprendiz
    Método: POST
    URL: http://localhost:8080/aprendiz/Aprendiz
    Body:
    ´´´
        {
        "nombre": "Juan Perez",
        "numeroDocumento": 123456789,
        "correo": "juan.perez@example.com",
        "contraseña": "password123",
        "tipoUsuario": true
        }
    ´´´
    ## Obtener Todos los Aprendices
    Método: GET
    URL: http://localhost:8080/aprendiz
    Crear un Curso
    Método: POST
    URL: http://localhost:8080/api/cursos
    Body:
    ´´´
        {
        "codigoFicha": 1234,
        "nombrePrograma": "Programación Java",
        "descripcion": "Curso de programación en Java",
        "fechaInicio": "2025-03-24T00:00:00",
        "fechaFin": "2025-06-24T00:00:00"
        }
    ´´´
    ## Obtener Todos los Cursos
    Método: GET
    URL: http://localhost:8080/api/cursos
    Crear una Lección
    Método: POST
    URL: http://localhost:8080/api/lecciones
    Body:
    ´´´
        {
            "nombre_leccion": "Introducción a Java",
            "descripcion": "Lección sobre los fundamentos de Java",
            "ruta_leccion": "/ruta/a/la/leccion",
            "id_curso": 1
        }
    ´´´
    ## Obtener Todas las Lecciones
    Método: GET
    URL: http://localhost:8080/api/lecciones
    Crear un Certificado
    Método: POST
    URL: http://localhost:8080/api/certificados
    Body:
    ´´´
    {
    "id_lecciones": 1,
    "id_aprendiz": 1,
    "nombreCertificado": "Certificado de Java",
    "numeroDocumentoCertificado": 123456,
    "fechaFin": "2025-06-24T00:00:00"
    }
    ´´´
    ## Obtener Todos los Certificados
    Método: GET
    URL: http://localhost:8080/api/certificados
