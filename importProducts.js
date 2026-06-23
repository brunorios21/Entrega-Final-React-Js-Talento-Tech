const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Asegúrate de mover tu archivo de clave de servicio al root del proyecto
// y renombrarlo a `serviceAccountKey.json` (no lo comites).
const serviceKeyPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(serviceKeyPath)) {
  console.error('No se encontró serviceAccountKey.json en el directorio del proyecto.');
  console.error('Coloca la clave de servicio (JSON) en el root y renómbrala a serviceAccountKey.json');
  process.exit(1);
}

const serviceAccount = require(serviceKeyPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const productsPath = path.join(__dirname, 'products.json');
if (!fs.existsSync(productsPath)) {
  console.error('No se encontró products.json. Crea el archivo con el array de productos.');
  process.exit(1);
}

const products = require(productsPath);

async function run() {
  try {
    for (const p of products) {
      const docRef = await db.collection('productos').add(p);
      console.log('Añadido:', docRef.id, '-', p.nombre);
    }
    console.log('Importación completada.');
    process.exit(0);
  } catch (err) {
    console.error('Error importando productos:', err);
    process.exit(1);
  }
}

run();
