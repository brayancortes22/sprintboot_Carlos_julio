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
### instalacion del proyecto
    ##front-end
1. instalar dependencias dentro de la terminal de comandos de proyecto
   
    a) ingresar a la carpeta del front con el comando : cd front-end/gestion
   
    b) descargar dependecias con el comando : npm install
   
    c) hacer funcionar el proyecto con el comando : npm run dev
    
3. correr el el backend
    a) 
