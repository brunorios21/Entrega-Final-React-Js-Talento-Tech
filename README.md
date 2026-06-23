# Black Frame Studio - E-Commerce Ferretería

Proyecto desarrollado en React con Vite para la entrega final del curso de Desarrollo de Interfaces Web de Talento Tech. La aplicación consiste en una plataforma de comercio electrónico para una ferretería, integrada con Firebase para la gestión de productos, autenticación de usuarios y control de roles (administradores y empleados).
## Visualizar proyecto

https://blackframestudio.netlify.app/

## Ingresar como administrador
email:
brunorioscorp4@gmail.com
contraseña: 
brunorios00120
## Características Principales

* **Catálogo Dinámico:** Listado de productos con filtros por categoría cargados de forma eficiente desde Firebase Firestore.
* **Carrito de Compras:** Gestión de productos, cálculo de totales en tiempo real e incremento/decremento de cantidades.
* **Autenticación Completa:** Registro e inicio de sesión de usuarios mediante Firebase Authentication.
* **Panel de Administración (Backoffice):** Rutas protegidas según el rol del usuario que permiten gestionar el inventario de productos y visualizar los usuarios registrados.
* **Diseño Responsivo:** Interfaz moderna adaptada a dispositivos móviles y escritorios utilizando React Bootstrap y Styled Components.

## Tecnologías Utilizadas

* React (v18)
* Vite
* Firebase (Auth & Firestore v9)
* React Router DOM (v6)
* React Bootstrap & Bootstrap (v5)
* Styled Components

## Estructura del Proyecto

El código fuente principal se encuentra dentro de la carpeta del proyecto, organizada de la siguiente manera:

* `src/components/`: Componentes reutilizables de la interfaz (Cart, Auth, Admin, ItemList).
* `src/context/`: Contextos globales de React para el manejo del estado del carrito y la autenticación.
* `src/services/`: Capa de servicios para la comunicación directa con la base de datos de Firestore.
* `src/config/`: Archivos de configuración local para variables del sistema y permisos.
* `public/`: Archivos estáticos, imágenes de productos y vectores SVG.

## Configuración y Despliegue Local

Para ejecutar el proyecto en un entorno de desarrollo local, se deben seguir los siguientes comandos en la terminal dentro de la carpeta correspondiente:

Instalar todas las dependencias declaradas en el archivo de configuración:
```bash
npm install
