import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    // Configuración de minificación avanzada para producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Eliminar console.log en producción
        drop_debugger: true  // Eliminar declaraciones debugger
      },
      mangle: {
        // Ofuscar nombres de variables, incluso propiedades
        properties: {
          regex: /^_/  // Solo mangle propiedades que empiezan con _
        }
      },
      format: {
        comments: false  // Eliminar todos los comentarios
      }
    },
    // Dividir el código en chunks más pequeños
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Otros módulos grandes que quieras separar
        }
      }
    }
  }
});
