import React, { useEffect } from 'react';
import styles from './PurchaseToast.module.css';

export default function PurchaseToast({ open, onClose, orderId }){
  useEffect(()=>{
    if(open){
      const t = setTimeout(()=> onClose && onClose(), 5000);
      return ()=> clearTimeout(t);
    }
  },[open,onClose]);

  if(!open) return null;

  return (
    <div className={styles.toast} role="status">
      <div className={styles.inner}>
        <strong>Compra confirmada</strong>
        <div className={styles.msg}>Orden <span className={styles.order}>{orderId}</span>. Revisa tu correo para más detalles.</div>
      </div>
    </div>
  );
}
