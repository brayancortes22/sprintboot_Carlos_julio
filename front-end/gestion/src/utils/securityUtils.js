/**
 * Utilidades de seguridad para proteger la aplicación frontend
 * Con bloqueo por IP al detectar herramientas de desarrollo
 */

import { SecurityService } from '../services/securityService';

// Variable para almacenar si ya se ha reportado un uso de DevTools
let devToolsReported = false;
// Almacena la última vez que se intentó recargar la página
let lastReloadAttempt = 0;

export function initializeSecurityProtection() {
  // Verificar si el usuario está bloqueado al cargar la página
  checkIfUserIsBlocked();
  
  // 1. Prevenir acceso a herramientas de desarrollo (F12, Ctrl+Shift+I, etc)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))) {
      e.preventDefault();
      reportDevToolsUsage();
      return false;
    }
  });

  // Nueva protección: Deshabilitar el menú contextual (clic derecho)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, false);
  
  // Detección de intento de inspeccionar mediante eventos de mouse
  document.addEventListener('mousedown', checkRightClick);
  document.addEventListener('mouseup', checkRightClick);
  
  function checkRightClick(e) {
    // Botón derecho (botón 2)
    if (e.button === 2) {
      e.preventDefault();
      return false;
    }
  }
  
  // Protección adicional contra devtools - ahora reporta al backend
  window.addEventListener('devtoolschange', function(e) {
    if (e.detail.open) {
      reportDevToolsUsage();
    }
  });

  // Detector de devtools con umbral más alto para evitar falsos positivos
  function detectDevTools() {
    const threshold = 250;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    
    if (widthDiff > threshold || heightDiff > threshold) {
      reportDevToolsUsage();
    }
  }
  
  setInterval(detectDevTools, 3000);

  // Añadimos encriptación simple para confundir el análisis del código
  obfuscateCodeForDevTools();
  
  // Detector avanzado de DevTools
  detectDevToolsAdvanced();
  
  // Prevenir recargas frecuentes
  window.addEventListener('beforeunload', function(e) {
    // Bloquear recargas si el usuario está bloqueado
    if (checkIsUserBlockedSync()) {
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
    
    const now = new Date().getTime();
    // Si se intenta recargar más de una vez en 2 segundos, reportar
    if (now - lastReloadAttempt < 2000) {
      reportDevToolsUsage();
      e.preventDefault();
      e.returnValue = '';
      return '';
    }
    lastReloadAttempt = now;
  });
  
  // Prevenir ejecución de scripts en la consola del navegador
  preventConsoleExecution();
}

// Nueva función para prevenir la ejecución de scripts en la consola
function preventConsoleExecution() {
  // Detector de ejecución de comandos en la consola
  let consoleOpenCount = 0;
  let lastConsoleCheck = Date.now();
  let loginInProgress = false;
  let navigationInProgress = false;

  // Detector específico para formularios de login para evitar falsos positivos
  document.addEventListener('submit', function(e) {
    // Si el formulario contiene campos de usuario/contraseña, consideramos que es un login
    const form = e.target;
    const inputs = form.querySelectorAll('input');
    const hasPasswordField = Array.from(inputs).some(input => input.type === 'password');
    
    if (hasPasswordField) {
      // Marcar que hay un login en progreso para evitar falsos positivos
      loginInProgress = true;
      setTimeout(() => {
        loginInProgress = false;
      }, 5000); // Dar 5 segundos para que se complete el proceso
    }
  });

  // Detectar navegación y clics para reducir falsos positivos
  document.addEventListener('click', function(e) {
    // Cualquier clic en un elemento interactivo puede generar logs
    // así que desactivamos temporalmente la detección
    navigationInProgress = true;
    setTimeout(() => {
      navigationInProgress = false;
    }, 3000); // 3 segundos de gracia después de un clic
    
    // Si es un botón de login, dar más tiempo
    if (e.target.tagName === 'BUTTON' || 
        (e.target.tagName === 'INPUT' && e.target.type === 'submit') ||
        e.target.closest('button') || 
        e.target.classList.contains('btn') || 
        e.target.classList.contains('button')) {
      
      // Verificamos si hay campos de contraseña cerca
      const form = e.target.closest('form');
      if (form) {
        const hasPasswordField = form.querySelector('input[type="password"]');
        if (hasPasswordField) {
          loginInProgress = true;
          setTimeout(() => {
            loginInProgress = false;
          }, 5000);
        }
      }
    }
  });
  
  // Detectar cambios de ruta/navegación
  window.addEventListener('popstate', function() {
    navigationInProgress = true;
    setTimeout(() => {
      navigationInProgress = false;
    }, 3000);
  });
  
  // También detectar navegación al cargar la página
  window.addEventListener('DOMContentLoaded', function() {
    navigationInProgress = true;
    setTimeout(() => {
      navigationInProgress = false;
    }, 5000); // Dar más tiempo al cargarse la página
  });

  // Protección contra eval, Function, etc.
  const protectFromConsole = () => {
    // Proteger eval para evitar inyección de código
    const originalEval = window.eval;
    window.eval = function() {
      const stack = new Error().stack || '';
      if (stack.includes('console')) {
        // Recargar la página inmediatamente si se detecta ejecución desde consola
        forceReload("Ejecución de scripts bloqueada");
        return undefined;
      }
      return originalEval.apply(window, arguments);
    };

    // Proteger Function constructor que también puede ejecutar código
    const originalFunction = window.Function;
    window.Function = function() {
      const stack = new Error().stack || '';
      if (stack.includes('console')) {
        forceReload("Ejecución de scripts bloqueada");
        return function(){};
      }
      return originalFunction.apply(window, arguments);
    };
    
    // Proteger setTimeout y setInterval que pueden ejecutar código
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback, timeout) {
      const stack = new Error().stack || '';
      if (typeof callback === 'string' || stack.includes('console')) {
        // Bloquear setTimeout con string callback (ejecuta código) o desde consola
        if (typeof callback === 'string') {
          forceReload("Ejecución de scripts bloqueada");
          return 0;
        }
      }
      return originalSetTimeout.apply(window, arguments);
    };
    
    const originalSetInterval = window.setInterval;
    window.setInterval = function(callback, timeout) {
      const stack = new Error().stack || '';
      if (typeof callback === 'string' || stack.includes('console')) {
        // Bloquear setInterval con string callback (ejecuta código) o desde consola
        if (typeof callback === 'string') {
          forceReload("Ejecución de scripts bloqueada");
          return 0;
        }
      }
      return originalSetInterval.apply(window, arguments);
    };
    
    // Proteger createElement para detectar inyección de scripts
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const element = originalCreateElement.call(document, tagName);
      if (tagName.toLowerCase() === 'script') {
        const stack = new Error().stack || '';
        if (stack.includes('console')) {
          forceReload("Ejecución de scripts bloqueada");
          return element;
        }
        
        // Monitor de cambios en el script
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name, value) {
          if (name === 'src' || name === 'textContent' || name === 'text') {
            const stack = new Error().stack || '';
            if (stack.includes('console')) {
              forceReload("Ejecución de scripts bloqueada");
              return;
            }
          }
          return originalSetAttribute.call(this, name, value);
        };
      }
      return element;
    };
    
    // Sobrescribir métodos de consola para detectar su uso frecuente
    ['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
      const original = console[method];
      console[method] = function() {
        // No activar detección si estamos en login o navegación
        if (loginInProgress || navigationInProgress) {
          return original.apply(console, arguments);
        }
        
        // Verificar si realmente es un intento de escribir comandos en la consola
        // y no solo logs automáticos de la aplicación
        const stack = new Error().stack || '';
        const isConsoleInput = stack.includes('console-api') || 
                              stack.includes('console.js') || 
                              stack.includes('debugger');
        
        // Solo contar los logs que parecen venir directamente de la consola
        if (isConsoleInput) {
          // Verificar si las ejecuciones de consola son demasiado frecuentes
          const now = Date.now();
          if (now - lastConsoleCheck < 1000) { // 1 segundo
            consoleOpenCount++;
            // Umbral muy alto para eliminar falsos positivos
            if (consoleOpenCount > 30) { // Mucho más tolerante
              forceReload("Uso excesivo de consola detectado");
              consoleOpenCount = 0;
            }
          } else {
            consoleOpenCount = 1;
            lastConsoleCheck = now;
          }
        }
        
        return original.apply(console, arguments);
      };
    });
  };
  
  // Ejecutar la protección
  protectFromConsole();
  
  // Seguir monitoreando para asegurarse de que no sobreescriban nuestros protectores
  setInterval(protectFromConsole, 1000);
}

// Función para forzar una recarga de la página
function forceReload(reason) {
  // Reportar uso de herramientas de desarrollo
  reportDevToolsUsage();
  
  // Forzar recarga para interrumpir cualquier ejecución
  try {
    // Crear elemento que ocupe toda la pantalla para bloquear interacción
    const blocker = document.createElement('div');
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100vw';
    blocker.style.height = '100vh';
    blocker.style.backgroundColor = 'black';
    blocker.style.color = 'white';
    blocker.style.zIndex = '999999999';
    blocker.style.fontSize = '24px';
    blocker.style.display = 'flex';
    blocker.style.justifyContent = 'center';
    blocker.style.alignItems = 'center';
    blocker.textContent = reason || 'Acceso denegado';
    document.body.appendChild(blocker);
    
    // Forzar recarga después de mostrar el mensaje
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (e) {
    // Si hay algún error, simplemente recargar
    window.location.reload();
  }
}

// Verificar si el usuario está bloqueado (asíncrono)
async function checkIfUserIsBlocked() {
  try {
    const response = await SecurityService.checkIfBlocked();
    if (response.data === true) {
      // El usuario está bloqueado
      renderBlockScreen(response.message);
    }
  } catch (error) {
    // En caso de error, seguimos permitiendo el acceso
    console.error("Error al verificar bloqueo:", error);
  }
}

// Versión síncrona para uso en eventos (utiliza almacenamiento local)
function checkIsUserBlockedSync() {
  const blockedUntil = localStorage.getItem('blockedUntil');
  if (blockedUntil && parseInt(blockedUntil) > new Date().getTime()) {
    return true;
  }
  return false;
}

// Función para reportar el uso de herramientas de desarrollo
async function reportDevToolsUsage() {
  if (devToolsReported) return; // Evitar múltiples reportes
  
  devToolsReported = true;
  
  try {
    // Guardar localmente para bloqueos sin necesidad de llamar al servidor cada vez
    localStorage.setItem('blockedUntil', new Date().getTime() + (2 * 60 * 1000)); // 2 minutos
    
    // Mostrar pantalla de bloqueo inmediatamente
    renderBlockScreen("Usuario bloqueado por uso de herramientas de desarrollo");
    
    // Informar al servidor para bloquear la IP
    await SecurityService.blockDevToolsUser();
  } catch (error) {
    console.error("Error al reportar uso de DevTools:", error);
  }
}

// Función para mostrar la pantalla de bloqueo
function renderBlockScreen(message) {
  if (document.getElementById('security-block-screen')) return;

  const blockDiv = document.createElement('div');
  blockDiv.id = 'security-block-screen';
  blockDiv.style.position = 'fixed';
  blockDiv.style.top = '0';
  blockDiv.style.left = '0';
  blockDiv.style.width = '100%';
  blockDiv.style.height = '100%';
  blockDiv.style.backgroundColor = 'black';
  blockDiv.style.zIndex = '999999';
  blockDiv.style.color = 'white';
  blockDiv.style.display = 'flex';
  blockDiv.style.flexDirection = 'column';
  blockDiv.style.justifyContent = 'center';
  blockDiv.style.alignItems = 'center';
  blockDiv.style.fontSize = '24px';
  
  // Agregar contador regresivo
  const remainingTime = document.createElement('div');
  remainingTime.id = 'block-countdown';
  remainingTime.style.marginTop = '20px';
  remainingTime.style.fontSize = '18px';
  
  blockDiv.innerHTML = `<p>${message}</p><p>Tu acceso ha sido bloqueado durante 2 minutos.</p>`;
  blockDiv.appendChild(remainingTime);
  
  document.body.appendChild(blockDiv);
  
  // Iniciar contador regresivo
  startCountdown();
}

// Función para iniciar el contador regresivo
function startCountdown() {
  const countdownElement = document.getElementById('block-countdown');
  if (!countdownElement) return;
  
  const blockedUntil = parseInt(localStorage.getItem('blockedUntil') || '0');
  
  const updateCountdown = () => {
    const now = new Date().getTime();
    const timeLeft = blockedUntil - now;
    
    if (timeLeft <= 0) {
      // Desbloqueo
      countdownElement.textContent = 'Desbloqueo completado';
      localStorage.removeItem('blockedUntil');
      devToolsReported = false;
      
      // Eliminar pantalla de bloqueo después de 2 segundos
      setTimeout(() => {
        const blockScreen = document.getElementById('security-block-screen');
        if (blockScreen) {
          document.body.removeChild(blockScreen);
        }
      }, 2000);
      
      clearInterval(interval);
    } else {
      // Actualizar contador
      const minutes = Math.floor(timeLeft / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      countdownElement.textContent = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  };
  
  // Actualizar inmediatamente
  updateCountdown();
  
  // Actualizar cada segundo
  const interval = setInterval(updateCountdown, 1000);
}

// Función para detectar DevTools de forma avanzada
function detectDevToolsAdvanced() {
  // Crear un detector personalizado para devtools
  const devtools = {
    isOpen: false,
    orientation: undefined
  };
  
  // Definir el detector como una propiedad en la ventana
  Object.defineProperty(window, 'devtools', {
    get: function() { return devtools; }
  });
  
  // Emitir evento personalizado de devtools
  const emitEvent = function(isOpen, orientation) {
    window.dispatchEvent(new CustomEvent('devtoolschange', {
      detail: {
        isOpen: isOpen,
        orientation: orientation
      }
    }));
  };
  
  // Método principal de detección basado en dimensiones de la ventana
  const main = function() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    const orientation = widthThreshold ? 'vertical' : 'horizontal';
    
    if (
      !(heightThreshold && widthThreshold) &&
      ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
    ) {
      if (!devtools.isOpen || devtools.orientation !== orientation) {
        emitEvent(true, orientation);
      }
      
      devtools.isOpen = true;
      devtools.orientation = orientation;
    } else {
      if (devtools.isOpen) {
        emitEvent(false, undefined);
      }
      
      devtools.isOpen = false;
      devtools.orientation = undefined;
    }
  };
  
  main();
  setInterval(main, 1000);
}

// Función para "encriptar" (ofuscar) el código JavaScript en tiempo de ejecución
// para dificultar su análisis en las herramientas de desarrollo
function obfuscateCodeForDevTools() {
  // Sobrescribir console.log y otros métodos de consola para evitar depuración
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };

  // 1. Reemplazar métodos de consola para dificultar la depuración
  console.log = function() {
    // Solo pasar al método original en modo desarrollo para depuración interna
    // eslint-disable-next-line no-constant-condition
    if (window.location.hostname === 'localhost' && false) { // Cambiar a true para depurar
      originalConsole.log.apply(console, arguments);
    }
  };
  console.warn = console.log;
  console.error = console.log;
  console.info = console.log;
  console.debug = console.log;

  // 2. Añadir variables falsas y mezcladas para confundir
  window._0x12a8 = function() { return Math.random(); };
  window._0x38f1 = function() { return new Date().getTime(); };
  window._0x7a3d = function() { return document.cookie; };
  window._0xf82c = function() { return navigator.userAgent; };
  
  // 3. Llamar a las funciones para que se vean en la pila de llamadas
  setInterval(function() {
    const a = window._0x12a8();
    const b = window._0x38f1();
    const c = [a, b, window._0xf82c()].join('');
    // Esto genera "ruido" en la consola y en el analizador
    const d = c.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return d;
  }, 2500);

  // 4. Sobrescribir métodos de Array/Object para dificultar inspección
  const originalToString = Object.prototype.toString;
  Object.prototype.toString = function() {
    if (this === window || this === document) {
      return originalToString.call(this);
    }
    
    // Alterar resultado para objetos en depuración
    const isBeingDebugged = new Error().stack.includes('debug') || 
                            new Error().stack.includes('console');
    
    if (isBeingDebugged) {
      return '[object Protected]';
    }
    
    return originalToString.call(this);
  };
  
  // 5. Añadir "trampas" antidepuración que solo confunden y no bloquean
  setInterval(function() {
    const script = document.createElement('script');
    const scriptContent = `
      try {
        // Esta función se ejecuta y luego se elimina, dejando rastros confusos
        (function() {
          const _0x${Math.random().toString(36).substring(2, 8)} = ${Date.now()};
          // Más variables aleatorias...
        })();
      } catch(e) {}
    `;
    script.textContent = scriptContent;
    document.head.appendChild(script);
    setTimeout(() => document.head.removeChild(script), 100);
  }, 5000);
}