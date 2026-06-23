// Inicialización de Firebase
//
// Nota sobre seguridad: actualmente este archivo contiene valores de configuración
// directamente en el código. Es recomendable mover estas credenciales a variables
// de entorno y no subir claves sensibles al control de versiones.
//
// En un proyecto con Vite se puede usar un archivo `.env` y acceder con
// `import.meta.env.VITE_FIREBASE_API_KEY` y variables con prefijo `VITE_`.
// Para operaciones administrativas (importación masiva) use `firebase-admin`
// en un entorno servidor y mantenga la clave de servicio fuera del repositorio.

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Ejemplo de uso con variables de entorno (descomente y configure en .env):
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// Configuración actual incluida en el repositorio. Reemplazar por variables
// de entorno y borrar estos valores antes de publicar el repositorio.
const firebaseConfig = {
  apiKey: "AIzaSyA4oRVsr1ufCmRNG_fQiSUhncMKV-4_ft0",
  authDomain: "black-frame-studio.firebaseapp.com",
  projectId: "black-frame-studio",
  storageBucket: "black-frame-studio.firebasestorage.app",
  messagingSenderId: "615920571249",
  appId: "1:615920571249:web:c7002d3dff3376830e1cd0",
  measurementId: "G-XKEEJJRDDK"
};

// Inicializa Firebase con la configuración anterior
const app = initializeApp(firebaseConfig);

// Servicios usados por la aplicación React
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;