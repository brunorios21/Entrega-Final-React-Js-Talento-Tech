import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Nav from '../components/Nav/Nav';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.brand} aria-label="Ir al inicio">
          <img src="/logo.svg" alt="BlackFrame" className={styles.logoImg} />
          <div>
            <p className={styles.brandName}>Black Frame Studio <span className={styles.alias}>BlackFrame</span></p>
            <p className={styles.brandTag}>Equipos fotográficos profesionales</p>
          </div>
        </Link>
        <Nav />
      </div>
    </header>
  );
}

