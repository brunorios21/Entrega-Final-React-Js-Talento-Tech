// Lista local de administradores (fallback cuando Firestore no devuelve datos)
// Úsala solo para desarrollo; en producción gestiona admins en Firestore o con Custom Claims.
export const ADMINS = {
  emails: [
    'brunorioscorp4@gmail.com'
  ].map(e => e.toLowerCase()),
  uids: [
    // Puedes añadir UIDs aquí si lo prefieres
  ]
};

export default ADMINS;
