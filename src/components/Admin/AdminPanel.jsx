import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminPanel.module.css';
import { useAuth } from '../../context/AuthContext';

export default function AdminPanel(){
  const { user, logout } = useAuth();

  return (
    <div className={`container ${styles.adminContainer}`}>
      <div className={styles.headerRow}>
        <div className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <img src="/images/icons/gear.svg" alt="admin" className={styles.headerIcon} />
            <div>
              <h1>Panel de Administración</h1>
              <p className={styles.badge}>Admin</p>
            </div>
          </div>
          <div className={styles.headerRight}>
            {user && <div className={styles.userEmail}>{user.email}</div>}
            <button className="btn btn-primary" onClick={() => logout()}>Cerrar sesión</button>
          </div>
        </div>
      </div>

      <div className={styles.actionsRow}>
        <Link to="/admin/productos" className={styles.actionCard}>
          <img src="/images/icons/truck.svg" alt="productos" className={styles.actionIcon} />
          <h3>Gestionar Productos</h3>
          <span>Crear, editar y eliminar productos del catálogo</span>
        </Link>

        <Link to="/admin/usuarios" className={styles.actionCard}>
          <img src="/images/icons/check.svg" alt="usuarios" className={styles.actionIcon} />
          <h3>Usuarios</h3>
          <span>Ver y administrar permisos de usuarios</span>
        </Link>
      </div>
    </div>
  );
}
