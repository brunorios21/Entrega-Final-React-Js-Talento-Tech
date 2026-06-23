import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const yearActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <h4>Black Frame Studio</h4>
          <p>contacto@blackframestudio.com · +54 9 11 4321-8765</p>
        </div>

        <div className={styles.bottomBar} role="contentinfo">
          <div className={styles.bottomOverlay} />
          <div className={styles.barContent}>
            <div className={styles.links}><a href="/terminos.html" target="_blank" rel="noreferrer">Términos y Condiciones</a></div>
            <div className={styles.copyright}>© {yearActual} Black Frame Studio</div>
          </div>
        </div>
      </div>
    </footer>
  );
}



