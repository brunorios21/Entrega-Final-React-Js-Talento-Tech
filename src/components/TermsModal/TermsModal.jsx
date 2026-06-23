import React, { useEffect, useState } from 'react';
import styles from './TermsModal.module.css';
import { Link } from 'react-router-dom';

export default function TermsModal(){
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    try{
      const accepted = localStorage.getItem('bf_terms_accepted');
      if(!accepted) setOpen(true);
    }catch(e){ setOpen(true) }
  },[]);

  const accept = ()=>{
    try{ localStorage.setItem('bf_terms_accepted','1') }catch(e){}
    setOpen(false);
  };

  if(!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.card}>
        <h3>¿Aceptas los Términos y Condiciones?</h3>
        <p>Antes de continuar, necesitamos tu consentimiento para nuestras políticas. Puedes leer los detalles en la página de términos.</p>
        <div className={styles.actions}>
          <a className={styles.linkBtn} href="/terminos.html" target="_blank" rel="noopener noreferrer">Ver términos</a>
          <button className={styles.acceptBtn} onClick={accept}>Aceptar y continuar</button>
        </div>
      </div>
    </div>
  );
}
