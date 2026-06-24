# Black Frame Studio - E-Commerce Estudio Fotográfico

Plataforma de comercio electrónico de alta fidelidad orientada a la comercialización de servicios visuales, alquiler de equipamiento y contratación de sesiones fotográficas profesionales. El sistema ha sido concebido como una solución integral que fusiona una experiencia de usuario fluida para el cliente final con una robusta interfaz de gestión interna para el personal técnico y administrativo.

El desarrollo se encuentra estructurado bajo arquitectura de componentes desacoplados en React, utilizando Vite como empaquetador de alto rendimiento para optimizar los tiempos de carga y la renderización en el navegador. La persistencia de datos, el flujo de autenticación y la lógica de permisos se delegan en la infraestructura en la nube de Firebase, garantizando transacciones seguras y actualizaciones de estado en tiempo real.

## Visualización y Acceso al Sistema

La versión de producción se encuentra desplegada y disponible para su navegación pública a través del servicio de hosting de Netlify. Para evaluar las capacidades del sistema de permisos y el comportamiento de las interfaces restringidas, se proporcionan credenciales de acceso con nivel de privilegio máximo.

* **Demostración en Línea:** https://6a3b25972e15bf02bb054d8d--blackframestudio.netlify.app/
* **Acceso Administrativo de Pruebas (Email):** brunorioscorp4@gmail.com
* **Acceso Administrativo de Pruebas (Contraseña):** bruno00120

## Análisis Detallado del Sistema

La arquitectura de la plataforma se divide en dos grandes áreas funcionales que operan de manera síncrona mediante el consumo de servicios unificados.

### Capa de Cliente y Flujo de Conversión

La interfaz pública expone un catálogo dinámico parametrizado por colecciones que se conecta directamente con Firestore. Las consultas optimizadas permiten segmentar los servicios fotográficos y productos por categorías específicas, minimizando la latencia de respuesta y el consumo de lecturas en la base de datos. 

El módulo de adquisición incluye un carrito de compras global administrado mediante la API de Context de React. Este estado persistente gestiona la lógica interna de validación de existencias, sumatoria matemática de aranceles en tiempo real, mutación de cantidades por ítem y el procesamiento estructurado para la generación de órdenes de compra unívocas.

### Capa Administrativa y Control de Acceso

El ecosistema cuenta con un módulo de Backoffice protegido mediante un interceptor de rutas (Guards) basado en React Router DOM. El flujo valida la sesión activa del usuario contra el servicio de Firebase Authentication y realiza una verificación cruzada con el documento de identidad del usuario en la base de datos para recuperar su rol asignado.

Los usuarios con rango de Administrador o Empleado acceden a un panel de control avanzado que otorga capacidades operativas de creación, lectura, actualización y borrado de registros sobre el inventario. Adicionalmente, el panel centraliza el monitoreo de los perfiles de usuarios registrados en el sistema para auditorías internas de operación.

## Especificación Técnica

* **Núcleo de la Aplicación:** React v18 y Vite.
* **Manejo de Estado y Enrutamiento:** React Context API y React Router DOM v6.
* **Infraestructura Cloud:** Firebase v9 (Módulos de Authentication y Firestore Database).
* **Capa Estilística y Consistencia Visual:** Styled Components para el encapsulamiento de estilos CSS a nivel de componente y React Bootstrap v5 para la grilla adaptativa.

## Organización del Repositorio

La arquitectura del directorio de código fuente sigue los patrones de diseño modulares para aplicaciones SPA:

* `src/components/`: Unidades de software visuales independientes y reutilizables encargadas de la renderización del carrito, formularios de acceso y vistas del panel de control.
* `src/context/`: Proveedores de estado global que distribuyen los datos de autenticación y persistencia de artículos seleccionados sin incurrir en acoplamiento excesivo.
* `src/services/`: Abstracción de llamadas API y consultas estructuradas hacia los SDKs de la base de datos en la nube.
* `src/config/`: Archivos de inicialización tecnológica, asignación de variables de entorno y definición de políticas operativas.
* `public/`: Almacenamiento de recursos estáticos del sistema, incluyendo vectores escalables y recursos gráficos base.

## Ejecución en Entornos de Desarrollo

Para inicializar de forma local el proyecto y auditar su comportamiento, es mandatorio contar con Node.js en el sistema y ejecutar la siguiente secuencia de comandos desde la terminal en el directorio raíz:

Instalación de paquetes y dependencias del sistema:
```bash
npm install
$
