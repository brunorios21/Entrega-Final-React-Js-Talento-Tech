import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Nav() {
  const { getTotalItems } = useContext(CartContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const enlaces = [
    { id: 1, nombre: 'Inicio', to: '/' },
    { id: 2, nombre: 'Productos', to: '/productos' },
    { id: 3, nombre: 'Contacto', to: '/contacto' }
  ];

  return (
    <nav className={styles.nav}>
      <ul>
        {enlaces.map((enlace) => (
          <li key={enlace.id}>
            <NavLink to={enlace.to} title={`Ir a ${enlace.nombre}`} className={({ isActive }) => isActive ? styles.active : styles.link}>
              {enlace.nombre}
            </NavLink>
          </li>
        ))}
        {!user && (
          <>
            <li><NavLink to="/login" className={({ isActive }) => isActive ? styles.active : styles.link}>Ingresar</NavLink></li>
            <li><NavLink to="/register" className={({ isActive }) => isActive ? styles.active : styles.link}>Registrarse</NavLink></li>
          </>
        )}
        {user && (
          <>
            <li><NavLink to="/perfil" className={({ isActive }) => isActive ? styles.active : styles.link}>Perfil</NavLink></li>
            <li><NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : styles.link}>Admin</NavLink></li>
            <li><button className={styles.linkButton} onClick={async () => { await logout(); navigate('/'); }}>Salir</button></li>
          </>
        )}
        <li>
          <NavLink to="/carrito" className={({ isActive }) => isActive ? styles.cartActive : styles.cartLink}>
            Carrito ({getTotalItems()})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

