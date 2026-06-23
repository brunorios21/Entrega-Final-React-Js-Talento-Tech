/**
 * ARCHIVO: main.jsx
 * 
 * Este es el PUNTO DE ENTRADA de la aplicación React.
 * 
 * Responsabilidades:
 * 1. Importar React y las herramientas necesarias
 * 2. Importar el componente raíz (App)
 * 3. Importar estilos globales
 * 4. Renderizar la aplicación en el DOM
 * 
 * Este archivo es ejecutado por Vite automáticamente cuando
 * inicias la aplicación con `npm run dev`.
 * 
 * Es el equivalente a lo que en HTML tradicional sería:
 * <script src="app.js"></script>
 */

// ========== IMPORTACIONES ==========

/**
 * React: Librería principal de React
 * Necesaria para usar JSX y componentes React
 */
import React from 'react';

/**
 * createRoot: Función de React 18 que crea la raíz de la aplicación
 * 
 * Antes (React 17):
 * import ReactDOM from 'react-dom'
 * ReactDOM.render(<App />, document.getElementById('root'))
 * 
 * Ahora (React 18):
 * import { createRoot } from 'react-dom/client'
 * createRoot(document.getElementById('root')).render(<App />)
 */
import { createRoot } from 'react-dom/client';

/**
 * App: Componente raíz de la aplicación
 * Contiene toda la lógica y estructura de la app
 */
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * index.css: Estilos globales de la aplicación
 * Se aplican a todos los componentes
 */
import './index.css';
import './utils/scrollReveal';

// ========== RENDERIZACIÓN ==========

/**
 * PROCESO DE RENDERIZACIÓN:
 * 
 * 1. document.getElementById('root'):
 *    - Busca el elemento <div id="root"></div> en index.html
 *    - Este es el punto de montaje de React
 * 
 * 2. createRoot(...):
 *    - Crea una raíz React en ese elemento del DOM
 *    - Retorna un objeto con método .render()
 * 
 * 3. .render(<React.StrictMode><App /></React.StrictMode>):
 *    - Renderiza el componente App dentro de la raíz
 *    - StrictMode es un envoltorio para detectar problemas
 */
createRoot(document.getElementById('root')).render(
  /**
   * React.StrictMode: Herramienta de desarrollo
   * 
   * Beneficios:
   * ✅ Detecta componentes con ciclos de vida inseguros
   * ✅ Advierte sobre APIs obsoletas
   * ✅ Identifica componentes que no están memoizados
   * ✅ Verifica que el estado se maneja correctamente
   * 
   * NOTA: Solo funciona en desarrollo, no en producción
   * 
   * Ejemplo: Si un efecto se ejecuta dos veces accidentalmente,
   * StrictMode lo detectará y te avisará en la consola.
   */
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
);



