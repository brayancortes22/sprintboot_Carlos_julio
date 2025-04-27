# Frontend SENA CAR 2025

Este proyecto constituye el frontend de la aplicación SENA CAR 2025, desarrollado con React y Vite.

## Tecnologías Utilizadas

- **React 18**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de construcción que proporciona un entorno de desarrollo más rápido
- **Tailwind CSS**: Framework de CSS utilizado para el diseño


## Características Principales

- **Interfaces de Usuario Diferenciadas**:
  - Panel de Administrador con gestión completa del sistema
  - Panel de Aprendiz para acceso a cursos y certificados

- **Gestión Completa de Entidades**:
  - Aprendices
  - Cursos
  - Lecciones
  - Certificados

- **Autenticación y Autorización**:
  - Sistema de login seguro
  - Control de acceso basado en roles (RBAC)
  - Manejo de tokens JWT
  - Protección de rutas según el rol del usuario

## Implementación de Seguridad

El frontend implementa un sistema de seguridad completo que incluye:

### Autenticación con JWT

- Manejo de tokens JWT para autenticación
- Almacenamiento seguro de tokens en localStorage
- Renovación automática de tokens expirados
- Cierre de sesión automático cuando expira el token

### Protección de Rutas

- Componente de ruta protegida que verifica la autenticación
- Redirección a login para usuarios no autenticados
- Validación de permisos por rol (Admin/Aprendiz)

### Cliente HTTP Seguro

- Interceptores para añadir tokens a las solicitudes
- Manejo centralizado de errores de autenticación
- Redirección automática al login cuando expira la sesión

### Validación de Formularios

- Validación en el cliente para mejorar la experiencia del usuario
- Sanitización de entradas para prevenir ataques XSS
- Mensajes de error descriptivos

## Estructura del Proyecto

```
src/
├── App.jsx             # Componente principal y configuración de rutas
├── components/         # Componentes de la aplicación
│   ├── AdminPanel.jsx       # Panel de administrador
│   ├── AprendizPanel.jsx    # Panel de aprendiz
│   ├── Login.jsx            # Pantalla de inicio de sesión
│   ├── Registro.jsx         # Registro general
│   ├── RegistroAprendiz.jsx # Formulario de registro de aprendices
│   ├── RegistroCurso.jsx    # Formulario de registro de cursos
│   ├── ui/                  # Componentes de UI reutilizables
│       ├── Button.jsx       # Botón personalizado
│       └── Card.jsx         # Tarjeta para mostrar información
├── services/           # Servicios para comunicación con la API
│   ├── aprendizService.js   # Servicio para gestionar aprendices
│   ├── authService.js       # Servicio de autenticación
│   ├── cursosService.js     # Servicio para gestionar cursos
│   └── securityService.js   # Funciones de seguridad
├── utils/              # Utilidades
│   ├── formStyles.js         # Estilos comunes para formularios
│   ├── httpClient.js         # Cliente HTTP con interceptores
│   └── securityUtils.js      # Utilidades de seguridad
```

## Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

## Configuración

La configuración de la API se encuentra en `src/config/apiConfig.js`. Asegúrese de actualizar la URL base según su entorno:

```javascript
// Para desarrollo local
export const API_URL = 'http://localhost:8080';

// Para producción
// export const API_URL = 'https://su-servidor-produccion.com';
```

## Configuración para Ejecución Remota

Si necesitas ejecutar la aplicación en un entorno remoto o permitir que otros usuarios accedan a ella desde diferentes dispositivos en la red, debes realizar los siguientes ajustes:

### Configuración de Direcciones IP

#### En el archivo de configuración de la API
Ubicación: `src/config/apiConfig.js`

```javascript
// Configuración para entorno local
export const API_URL = 'http://localhost:8080';

// Configuración para red local (LAN) - Descomentar y ajustar la IP
// export const API_URL = 'http://192.168.1.100:8080';

// Configuración para ambiente de producción - Descomentar y ajustar
// export const API_URL = 'https://tu-dominio.com/api';
```

Es necesario modificar este archivo y cambiar la URL a la dirección IP donde se está ejecutando el backend.

#### Ejecución de Vite con host específico

Para hacer que tu aplicación React sea accesible desde otros dispositivos en la red, debes iniciar Vite con el siguiente comando:

```bash
# Ejecutar la aplicación exponiéndola en la red
npm run dev -- --host
```

Esto permitirá que Vite muestre las URLs de acceso, incluyendo la IP local:

```
  VITE v4.5.0  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
```

### Solución de problemas comunes

Si encuentras problemas de acceso o errores de CORS al ejecutar la aplicación de forma remota:

1. **Error de CORS**: Si ves errores como "Access to fetch at 'http://192.168.1.100:8080/api/auth/login' from origin 'http://192.168.1.101:5173' has been blocked by CORS policy", debes configurar correctamente el backend para permitir solicitudes desde esa IP.

2. **Error de conexión**: Si aparece "Failed to fetch" o "Network Error", verifica:
   - Que el backend esté ejecutándose
   - Que la dirección IP configurada sea correcta
   - Que los puertos no estén bloqueados por firewalls

3. **Error de autenticación**: Si después de actualizar las IPs los tokens de autenticación no funcionan correctamente, es posible que debas:
   - Borrar el localStorage (en el navegador: F12 → Application → Local Storage → Clear)
   - Cerrar sesión e iniciar sesión nuevamente

### Verificación de configuración correcta

Para verificar que la configuración es correcta:

1. Abre las herramientas de desarrollo del navegador (F12)
2. Ve a la pestaña "Network"
3. Realiza una acción como iniciar sesión o cargar datos
4. Verifica que las solicitudes se estén realizando a la dirección IP correcta
5. Comprueba que la respuesta sea 200 OK

## Credenciales por Defecto

Al ejecutar la aplicación por primera vez junto con el backend, se crea automáticamente un usuario administrador con las siguientes credenciales:

- **Correo**: admin@sena.edu.co
- **Contraseña**: admin123

## Notas Sobre Seguridad

Para mejorar la seguridad en un entorno de producción, considere:

1. Implementar cookies HttpOnly para almacenar tokens en lugar de localStorage
2. Configurar HTTPS en el servidor
3. Implementar protección contra CSRF mediante tokens
4. Configurar una política de Content Security Policy (CSP)
5. Limitar los intentos de inicio de sesión para prevenir ataques de fuerza bruta

## Contribución

1. Clonar el repositorio
2. Crear una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Realizar los cambios necesarios
4. Hacer commit de tus cambios (`git commit -m 'Add some amazing feature'`)
5. Hacer push a la rama (`git push origin feature/amazing-feature`)
6. Abrir un Pull Request
