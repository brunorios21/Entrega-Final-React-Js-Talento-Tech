# 🔧 Setup de Firebase - Black Frame Studio

## ✅ Estado Actual
- ✓ App React configurada
- ✓ Credenciales Firebase añadidas en `src/firebase.js`
- ✓ UI modernizada (botones, footer, colores)
- ⏳ Falta: Configurar Firestore y Autenticación

---

## 📋 Pasos Finales (MANUAL en Firebase Console)

### 1️⃣ Habilitar Autenticación por Email
```
1. Ve a: https://console.firebase.google.com/
2. Proyecto: "black-frame-studio"
3. Menú izquierdo → "Autenticación"
4. Pestaña "Métodos de registro"
5. Busca "Email/Contraseña" → Click en ella
6. Activa el toggle "Habilitado"
7. Click "Guardar"
```

### 2️⃣ Configurar Reglas de Firestore
```
1. Menú izquierdo → "Firestore Database"
2. Pestaña "Reglas"
3. Borra el contenido actual y reemplaza por:
```

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

```
4. Click "Publicar"
```

### 3️⃣ Crear Colección "productos" en Firestore
```
1. Menú izquierdo → "Firestore Database"
2. Click "+ Crear Colección"
3. Nombre: "productos"
4. Click "Siguiente"
5. Crear primer documento (ID: "1")
6. Campos:
   - nombre (string): "Cámara Canon EOS R5"
   - precio (number): 3299.99
   - descripcion (string): "Cámara profesional full-frame"
   - stock (number): 5
7. Click "Guardar"
```

---

## 🚀 Ejecutar Localmente

```bash
# Navegar al proyecto
cd /Users/martinalevczuk/Desktop/Pre-Entrega-React-Js-TalentoTech-main

# Iniciar servidor de desarrollo
npm run dev
```

Abre: **http://localhost:5173**

---

## 🧪 Pruebas Finales

### Usuario Nuevo
1. Click "Registrarse"
2. Email: `test@ejemplo.com`
3. Contraseña: `123456`
4. Click botón "Registrar" (moderno, con gradiente)
5. ✓ Debe ir a `/perfil`

### Admin Panel
1. Estando logeado, ve a: http://localhost:5173/admin
2. ✓ Deberías ver "👤 Panel de Administración" con badge "⚙️ Admin"
3. Click "📦 Gestionar Productos"

### Footer
- ✓ Reducido al mínimo (compact)
- ✓ Visible en todas las secciones
- ✓ Con colores del nuevo tema

---

## 📱 Cambios Realizados

| Componente | Cambio |
|---|---|
| **Paleta** | Gradiente moderno: azul oscuro → violeta → cian |
| **Botones** | Gradientes, sombras, animación hover |
| **Footer** | Reducido 70%, padding mínimo |
| **Admin Panel** | Nuevo diseño con cards modernas |
| **Formularios** | Fondo glass, estilos consistentes |

---

## ⚠️ Troubleshooting

### Error: "auth/api-key-not-valid"
→ Verifica que `src/firebase.js` tenga las credenciales correctas

### Botones no se ven
→ Limpia caché: `npm run dev` + `Ctrl+Shift+R` en navegador

### No puedo registrarme
→ Verifica que "Email/Contraseña" esté activado en Autenticación Firebase

---

**Hecho con ❤️ por GitHub Copilot**
