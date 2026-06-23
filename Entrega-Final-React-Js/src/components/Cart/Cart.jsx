import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import styles from './Cart.module.css';
import PurchaseToast from '../PurchaseToast/PurchaseToast';

export default function Cart() {
  const { cart, removeFromCart, clearCart, getTotalItems, getTotalPrice, updateQuantity } = useContext(CartContext);

  const companyAlias = 'BlackFrame';

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
    setOrder(summary);
    setShowToast(true);
    clearCart();
  };

  const closeToast = () => setShowToast(false);

  if (cart.length === 0) return (
    <div style={{ padding: 20 }}>
      <h2>Carrito</h2>
      <p>Tu carrito está vacío.</p>
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <img src="/logo.svg" alt="logo" style={{ width: 56, height: 56 }} />
        <div>
          <h2 style={{ margin: 0 }}>Carrito <small className={styles.titleSmall}>· {companyAlias}</small></h2>
          <div className={styles.titleSmall}>{getTotalItems()} artículo{getTotalItems() !== 1 ? 's' : ''} · Total ${getTotalPrice().toLocaleString('es-AR')}</div>
        </div>
      </div>

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
          <p style={{ margin: 0 }}><strong>Alias de la empresa:</strong> {companyAlias}</p>
          <p style={{ margin: '8px 0 0' }}><strong>Instrucciones:</strong> Si elegís Rapipago/Pago Fácil, recibirás los datos de depósito por email y/o WhatsApp.</p>
        </div>
        </section>
        </aside>
      </div>

      <PurchaseToast open={showToast} onClose={closeToast} orderId={order?.id} />

      {order && (
        <div className={styles.successCard}>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <img src="/logo.svg" alt="logo" style={{width:44,height:44,borderRadius:8}} />
            <div>
              <h4>Compra exitosa</h4>
              <p>Gracias {order.buyer.name}. Su orden <strong>{order.id}</strong> se generó correctamente.</p>
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
    </div>
  );
}
