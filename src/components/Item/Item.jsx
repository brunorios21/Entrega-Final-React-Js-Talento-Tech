import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import styles from './Item.module.css';
import Lightbox from '../Lightbox/Lightbox';

const Item = ({ id, nombre, precio, stock, imagen, imagenes = [], descripcion }) => {
  const [esFavorito, setEsFavorito] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [fotoIndex, setFotoIndex] = useState(0);
  const [mostrarLightbox, setMostrarLightbox] = useState(false);
  const { addToCart } = useContext(CartContext);

  const fotos = Array.isArray(imagenes) && imagenes.length > 0 ? imagenes : [imagen];
  const fotoActual = fotos[fotoIndex] || imagen || 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';

  const alternarFavorito = () => setEsFavorito((prev) => !prev);
  const incrementar = () => { if (cantidad < stock) setCantidad((prev) => prev + 1); };
  const decrementar = () => { if (cantidad > 0) setCantidad((prev) => prev - 1); };
  const agregarAlCarrito = () => {
    if (cantidad > 0) {
      addToCart({ id, nombre, precio, imagen: fotos[0] || imagen }, cantidad);
      setCantidad(0);
    }
  };
  const imagenAnterior = () => setFotoIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  const imagenSiguiente = () => setFotoIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));

  return (
    <>
      <div className={styles.card}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '22px', marginBottom: '18px' }}>
          <div className={styles.imageWrap} onClick={() => setMostrarLightbox(true)} style={{ cursor: 'zoom-in' }}>
            <img src={fotoActual} alt={nombre} />
          </div>
          {fotos.length > 1 && (
            <>
              <button
                aria-label="Imagen anterior"
                onClick={imagenAnterior}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(15, 23, 42, 0.7)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
                type="button"
              >
                ‹
              </button>
              <button
                aria-label="Siguiente imagen"
                onClick={imagenSiguiente}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(15, 23, 42, 0.7)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
                type="button"
              >
                ›
              </button>
            </>
          )}
        </div>
        <div className={styles.content}>
          {fotos.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
              {fotos.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setFotoIndex(index)}
                  aria-label={`Ver foto ${index + 1}`}
                  style={{
                    border: fotoIndex === index ? '2px solid var(--accent)' : '1px solid #d1d5db',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    width: '64px',
                    height: '64px',
                    padding: 0,
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <img src={src} alt={`${nombre} vista ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <button
              onClick={alternarFavorito}
              style={{
                cursor: 'pointer',
                fontSize: '14px',
                padding: '8px 12px',
                background: esFavorito ? '#fef08a' : '#f8fafc',
                border: '1px solid #d1d5db',
                borderRadius: '999px',
                color: '#334155',
              }}
              title={esFavorito ? 'Remover de favoritos' : 'Agregar a favoritos'}
            >
              {esFavorito ? 'Favorito' : 'Agregar a favoritos'}
            </button>
            <span style={{ fontSize: '12px', color: '#64748b' }}>#{id}</span>
          </div>

          <h3 style={{ margin: '10px 0', color: '#0f172a', fontSize: '1.25rem' }}>{nombre}</h3>
          {descripcion && (
            <p style={{ color: '#475569', fontSize: '0.95rem', margin: '6px 0 12px', lineHeight: '1.75' }}>
              {descripcion}
            </p>
          )}
          <p style={{ color: stock > 0 ? '#16a34a' : '#dc2626', margin: '6px 0', fontWeight: 700 }}>
            {stock > 0 ? `${stock} disponibles` : 'Agotado'}
          </p>
          <p style={{ fontSize: '22px', fontWeight: 800, margin: '10px 0', color: '#111827' }}>
            ${typeof precio === 'number' ? precio.toLocaleString('es-AR') : precio}
          </p>

          <div className={styles.qtyRow}>
            <div className={styles.qtyControls}>
              <button
                onClick={decrementar}
                style={{
                  padding: '10px 14px',
                  cursor: cantidad > 0 ? 'pointer' : 'not-allowed',
                  border: '1px solid #d1d5db',
                  backgroundColor: cantidad > 0 ? '#fff' : '#f1f5f9',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
                disabled={cantidad === 0}
                title="Disminuir cantidad"
              >
                −
              </button>
              <p style={{ margin: 0, minWidth: '42px', textAlign: 'center', fontSize: '18px', fontWeight: 700 }}>{cantidad}</p>
              <button
                onClick={incrementar}
                style={{
                  padding: '10px 14px',
                  cursor: cantidad < stock ? 'pointer' : 'not-allowed',
                  border: '1px solid #d1d5db',
                  backgroundColor: cantidad < stock ? '#fff' : '#f1f5f9',
                  borderRadius: '12px',
                  fontWeight: 700,
                }}
                disabled={cantidad >= stock}
                title={cantidad >= stock ? 'Stock máximo alcanzado' : 'Aumentar cantidad'}
              >
                +
              </button>
            </div>

            <div className={styles.addArea}>
              <button
                onClick={agregarAlCarrito}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: cantidad > 0 ? 'linear-gradient(90deg,var(--accent),var(--accent-2))' : '#94a3b8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: cantidad > 0 ? 'pointer' : 'not-allowed',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                }}
                disabled={cantidad === 0 || stock === 0}
                title={stock === 0 ? 'Producto sin stock' : 'Agregue una cantidad'}
              >
                {cantidad > 0 ? `Agregar (${cantidad})` : 'Selecciona cantidad'}
              </button>
              <Link to={`/producto/${id}`} style={{ display: 'block', marginTop: '12px', textAlign: 'center', color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>
                Ver detalle
              </Link>
            </div>
          </div>
        </div>
      </div>

      {mostrarLightbox && <Lightbox fotos={fotos} startIndex={fotoIndex} onClose={() => setMostrarLightbox(false)} />}
    </>
  );
};

export default Item;
