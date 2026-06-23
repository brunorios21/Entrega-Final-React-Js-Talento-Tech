import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { ADMINS } from '../../config/admins';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    let mounted = true;
    const checkAdmin = async () => {
      try {
        // comprobando permisos
        // Primero intentamos por UID
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (!mounted) return;
        if (snap.exists()) {
          const data = snap.data();
          const is = (data.isAdmin === true) || (data.esAdmin === true) || (data.admin === true);
          // user doc encontrado por UID
          setIsAdmin(is);
          return;
        }

        // Fallback: buscar por email en caso de que el doc no use UID como id
        if (user.email) {
          const col = collection(db, 'users');
          const q = query(col, where('email', '==', user.email));
          const res = await getDocs(q);
          if (!mounted) return;
          if (!res.empty) {
            const d = res.docs[0].data();
            const is2 = (d.isAdmin === true) || (d.esAdmin === true) || (d.admin === true);
            // user doc encontrado por email
            setIsAdmin(is2);
            return;
          }
        }

        // no se encontró documento de usuario (ni por UID ni por email)
        // Fallback local: comprobar lista de admins en código (solo para desarrollo)
        const emailLower = user.email ? user.email.toLowerCase() : null;
        if ((emailLower && ADMINS.emails.includes(emailLower)) || (ADMINS.uids.includes(user.uid))) {
          // fallback local: conceder permisos (solo para desarrollo)
          setIsAdmin(true);
          return;
        }
        setIsAdmin(false);
      } catch (error) {
        console.error('Error validando admin:', error);
        if (mounted) setIsAdmin(false);
      }
    };
    checkAdmin();
    return () => { mounted = false; };
  }, [user]);

  if (loading || isAdmin === null) return <div className="p-4">Cargando permisos...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <div className="p-4">Acceso denegado — No eres administrador</div>;
  return children;
}