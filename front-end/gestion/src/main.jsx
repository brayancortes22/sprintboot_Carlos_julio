import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeSecurityProtection } from './utils/securityUtils.js'

// Inicializar protecciones de seguridad
// eslint-disable-next-line no-constant-condition
if (import.meta.env.PROD || true) {  // True para activar en desarrollo también, quitar en caso de depuración
  initializeSecurityProtection();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
