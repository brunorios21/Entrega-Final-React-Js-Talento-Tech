import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Cart.module.css';
import PurchaseToast from '../PurchaseToast/PurchaseToast';

export default function Cart() {
  const { cart, removeFromCart, clearCart, getTotalItems, getTotalPrice, updateQuantity } = useContext(CartContext);

  const companyAlias = 'BlackFrame';
  const companyInfo = {
    name: 'Black Frame S.R.L.',
    alias: companyAlias,
    cuit: '30-12345678-9',
    email: 'ventas@blackframe.example',
    phone: '+54 9 11 1234-5678',
    bank: 'Banco Ejemplo - CBU: 1234567890123456789012',
  };

  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [order, setOrder] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [paymentMenuOpen, setPaymentMenuOpen] = useState(false);

  const confirmPurchase = () => {
    if (!buyerName || !buyerEmail) {
      alert('Por favor completa tu nombre y correo para finalizar la compra.');
      return;
    }
    const orderId = `BF-${Date.now().toString(36).toUpperCase().slice(-8)}`;
    const summary = {
      id: orderId,
      buyer: { name: buyerName, email: buyerEmail },
      items: cart,
      total: getTotalPrice(),
      paymentMethod,
    };

    // Guardar la orden primero para poder mostrar el comprobante aunque el carrito quede vacío
    setOrder(summary);
    setShowToast(true);

    // Intento enviar un email prellenado (mailto) y abrir la pasarela de pago correspondiente
    try {
      const lines = [];
      lines.push(`Hola ${summary.buyer.name},`);
      lines.push('Gracias por tu compra. Aquí están los detalles:');
      lines.push('');
      summary.items.forEach(it => lines.push(`${it.nombre} x ${it.quantity} — $${(it.quantity * it.precio).toLocaleString('es-AR')}`));
      lines.push('');
      lines.push(`Total: $${summary.total.toLocaleString('es-AR')}`);
      lines.push(`Método de pago: ${summary.paymentMethod}`);
      if (summary.paymentMethod === 'rapipago' || summary.paymentMethod === 'pagofacil' || summary.paymentMethod === 'efectivo') {
        lines.push('Para pagar en efectivo, podés usar PagoFácil o Rapipago. Presiona el enlace desde la pantalla para abrir la pasarela.');
        lines.push('Alias de la empresa: ' + companyAlias);
      }
      const body = encodeURIComponent(lines.join('\n'));
      const subject = encodeURIComponent(`Confirmación de compra ${orderId}`);
      // abrir cliente de correo del usuario con el resumen
      window.open(`mailto:${buyerEmail}?subject=${subject}&body=${body}`);
    } catch (e) {
      // ignore
    }

    // Copiar alias al portapapeles para facilitar pago en efectivo
    if (navigator.clipboard) navigator.clipboard.writeText(companyAlias).catch(() => {});

    // Abrir la pasarela externa en nueva pestaña si corresponde
    if (paymentMethod === 'rapipago' || paymentMethod === 'pagofacil') {
      const url = paymentMethod === 'rapipago' ? 'https://www.rapipago.com.ar' : 'https://www.pagofacil.com.ar';
      setTimeout(() => window.open(url, '_blank', 'noopener'), 700);
    }

    // por último limpiamos el carrito local
    clearCart();
  };

  const closeToast = () => setShowToast(false);

  // Render empty state inside the same wrapper so the background shows

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <img src="/logo.svg" alt="logo" style={{ width: 56, height: 56 }} />
        <div>
          <h2 style={{ margin: 0 }}>Carrito <small className={styles.titleSmall}>· {companyAlias}</small></h2>
          <div className={styles.titleSmall}>{getTotalItems()} artículo{getTotalItems() !== 1 ? 's' : ''} · Total ${getTotalPrice().toLocaleString('es-AR')}</div>
        </div>
      </div>

      {cart.length === 0 && !order ? (
        <div className={styles.emptyCard}>
          <h2>Carrito</h2>
          <p style={{marginTop:8}}>Tu carrito está vacío.</p>
          <p style={{marginTop:12}}>Explorá nuestros productos y agregá lo que necesites.</p>
        </div>
      ) : (
      <div className={styles.cartGrid}>
        <div>
          <ul className={styles.list}>
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <img src={item.imagen || '/logo.svg'} alt={item.nombre} className={styles.thumb} />
                <div>
                  <div className={styles.itemTitleRow}>
                    <strong className={styles.itemName}>{item.nombre}</strong>
                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn} aria-label="Eliminar">
                      <img src="/images/icons/trash.svg" alt="Eliminar" style={{ width:18, height:18 }} />
                    </button>
                  </div>
                  <div className={styles.meta}>Precio unitario: ${item.precio.toLocaleString('es-AR')}</div>
                  <div className={styles.subtotal}>Subtotal: ${(item.quantity * item.precio).toLocaleString('es-AR')}</div>
                </div>
                <div className={styles.qtyBlock}>
                  <div className={styles.qtyControls}>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 0) - 1)} disabled={item.quantity <= 1} className={styles.qtyBtn} aria-label="Disminuir">
                      <img src="/images/icons/minus.svg" alt="-" style={{ width:14, height:14 }} />
                    </button>
                    <div className={styles.qtyNum}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 0) + 1)} className={styles.qtyBtn} aria-label="Aumentar">
                      <img src="/images/icons/plus.svg" alt="+" style={{ width:14, height:14 }} />
                    </button>
                  </div>
                  <div className={styles.stock}>Stock disponible: {item.stock ?? '—'}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.footerRow}>
            <div>
              <button onClick={clearCart} className={styles.ghostBtn}>Vaciar carrito</button>
            </div>
            <div className={styles.total}>Total: ${getTotalPrice().toLocaleString('es-AR')}</div>
          </div>
        </div>

        <aside>
          <section className={styles.paymentCard}>
        <h3 className={styles.paymentTitle}>Opciones de pago</h3>
        <p className={styles.paymentDesc}>Seleccioná el método de pago. También podés pagar en efectivo o a través de Rapipago / Pago Fácil (depósito bancario).</p>

        <div>
          <div className={styles.paymentOptionsInline}>
            <label className={styles.paymentLabel}>
              <input type="radio" name="pago" value="efectivo" checked={paymentMethod === 'efectivo'} onChange={() => setPaymentMethod('efectivo')} />
              <span className={styles.paymentIconBtn}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </span>
              Efectivo
            </label>
            <label className={styles.paymentLabel}>
              <input type="radio" name="pago" value="rapipago" checked={paymentMethod === 'rapipago'} onChange={() => setPaymentMethod('rapipago')} />
              <span className={styles.paymentIconBtn}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </span>
              Rapipago
            </label>
            <label className={styles.paymentLabel}>
              <input type="radio" name="pago" value="pagofacil" checked={paymentMethod === 'pagofacil'} onChange={() => setPaymentMethod('pagofacil')} />
              <span className={styles.paymentIconBtn}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10h18M7 15h1M12 15h5" />
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                </svg>
              </span>
              Pago Fácil
            </label>
          </div>

          <button className={styles.paymentToggle} onClick={() => setPaymentMenuOpen((s) => !s)} aria-expanded={paymentMenuOpen}>
            <div className={styles.hamb}><span></span><span></span><span></span></div>
            <div style={{ fontSize: 14 }}>Métodos</div>
          </button>

          <div className={`${styles.paymentList} ${paymentMenuOpen ? 'open' : ''}`}>
            <button type="button" className={`${styles.payBtn} ${paymentMethod === 'efectivo' ? 'active' : ''}`} onClick={() => { setPaymentMethod('efectivo'); setPaymentMenuOpen(false); }}>Efectivo</button>
            <button type="button" className={`${styles.payBtn} ${paymentMethod === 'rapipago' ? 'active' : ''}`} onClick={() => { setPaymentMethod('rapipago'); setPaymentMenuOpen(false); }}>Rapipago</button>
            <button type="button" className={`${styles.payBtn} ${paymentMethod === 'pagofacil' ? 'active' : ''}`} onClick={() => { setPaymentMethod('pagofacil'); setPaymentMenuOpen(false); }}>Pago Fácil</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label style={{ fontSize: 14, color: '#334155' }}>Nombre completo</label>
          <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Tu nombre" className={styles.formInput} />
          <label style={{ fontSize: 14, color: '#334155' }}>Correo electrónico</label>
          <input value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" className={styles.formInput} />
        </div>

        <div className={styles.actionsRow}>
          <button onClick={confirmPurchase} className={styles.primaryBtn}>Confirmar compra</button>
          <button onClick={() => { clearCart(); setOrder(null); }} className={styles.ghostBtn}>Cancelar</button>
        </div>

        <div className={styles.confirmCard}>
          <div className="left">
            <strong>Datos de la empresa</strong>
            <div style={{fontSize:13,color:'rgba(230,255,250,0.85)'}}>Revisá los datos antes de confirmar. Podés copiarlos o ver más detalles.</div>
          </div>
          <div className="actions">
            <button className={styles.viewBtn} onClick={() => setShowCompanyModal(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:8}}>
                <path d="M3 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" stroke="#e6fdf6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="#e6fdf6" />
              </svg>
              Ver datos
            </button>
            <button className={styles.ghostBtn} onClick={() => navigator.clipboard?.writeText(companyInfo.alias)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:6}}>
                <path d="M9 12H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="9" y="9" width="10" height="10" rx="2" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copiar alias
            </button>
          </div>
          <div style={{ width: '100%', marginTop: 10, color: 'rgba(230,255,250,0.85)', fontSize:13 }}><strong>Instrucciones:</strong> Si elegís Rapipago/Pago Fácil, recibirás los datos de depósito por email y/o WhatsApp.</div>
        </div>
        </section>
        </aside>
        </div>
      )}

      <PurchaseToast open={showToast} onClose={closeToast} orderId={order?.id} />

      {order && (
        <div className={styles.successCard}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <img src="/logo.svg" alt="logo" style={{width:54,height:54,borderRadius:10}} />
            <div>
              <h4>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:6}}>
                  <path d="M12 2L13.545 7.455L19.513 6.09099L15.257 10.145L16.364 16.01L12 13.27L7.636 16.01L8.743 10.145L4.487 6.09099L10.455 7.455L12 2Z" fill="#FFDD57" stroke="#F59E0B" strokeWidth="0.5"/>
                </svg>
                Compra exitosa
              </h4>
              <p>Gracias <strong>{order.buyer.name}</strong>. Su orden <strong>{order.id}</strong> se generó correctamente.</p>
            </div>
            <div style={{marginLeft:'auto', display:'flex', gap:8}}>
              <button className={styles.ghostBtn} onClick={() => setShowCompanyModal(true)}>Ver datos de la empresa</button>
            </div>
          </div>

          <div style={{marginTop:12}}>
            <strong>Resumen:</strong>
            <ul style={{marginTop:8}}>
              {order.items.map((it) => (
                <li key={it.id} style={{color:'rgba(230,255,250,0.95)'}}>{it.nombre} x {it.quantity} — ${ (it.quantity * it.precio).toLocaleString('es-AR') }</li>
              ))}
            </ul>
            <div style={{marginTop:8}}><strong>Total:</strong> ${order.total.toLocaleString('es-AR')}</div>
            <div style={{ marginTop: 8 }}><strong>Método de pago:</strong> {order.paymentMethod}</div>
            <p style={{marginTop:10,color:'rgba(230,255,250,0.95)'}}>Se enviará un correo a <strong>{order.buyer.email}</strong> con los datos de la compra y las instrucciones de pago.</p>
          </div>
        </div>
      )}

      {showCompanyModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.companyModal}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <img src="/logo.svg" alt="logo" style={{width:48,height:48,borderRadius:8}} />
                <div>
                  <strong style={{fontSize:16}}>{companyInfo.name}</strong>
                  <div style={{fontSize:13,color:'rgba(230,255,250,0.85)'}}>{companyInfo.email} · {companyInfo.phone}</div>
                </div>
                <button onClick={() => setShowCompanyModal(false)} className={styles.closeBtn} style={{marginLeft:'auto'}} aria-label="Cerrar ventana">✕</button>
              </div>

              <div className={styles.companyFields}>
                <div className={styles.companyField}>
                  <div><strong>Alias</strong><div className="" style={{fontSize:13, opacity:0.95, marginTop:4}}>{companyInfo.alias}</div></div>
                  <button className={styles.copyBtn} onClick={() => navigator.clipboard?.writeText(companyInfo.alias)} aria-label="Copiar alias">
                    <svg className={styles.copyIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#081225" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="10" height="10" rx="2" stroke="#081225" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Copiar
                  </button>
                </div>

                <div className={styles.companyField}>
                  <div><strong>CUIT</strong><div style={{fontSize:13, opacity:0.95, marginTop:4}}>{companyInfo.cuit}</div></div>
                  <div style={{width:8}} />
                </div>

                <div className={styles.companyField}>
                  <div><strong>Banco / CBU</strong><div style={{fontSize:13, opacity:0.95, marginTop:4}}>{companyInfo.bank}</div></div>
                  <button className={styles.copyBtn} onClick={() => navigator.clipboard?.writeText(companyInfo.bank)} aria-label="Copiar CBU">
                    <svg className={styles.copyIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="#081225" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="9" width="10" height="10" rx="2" stroke="#081225" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Copiar
                  </button>
                </div>

                <div style={{marginTop:6,color:'rgba(230,255,250,0.85)', fontSize:13}}>Estos datos serán incluidos en el email de confirmación y pueden usarse para pago en efectivo.</div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
