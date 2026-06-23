import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Lightbox from '../Lightbox/Lightbox';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        setProduct(found || null);
        if (found) {
          const defaultImage = Array.isArray(found.imagenes) && found.imagenes.length > 0 ? found.imagenes[0] : found.imagen;
          setSelectedImage(defaultImage);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Cargando...</div>;
  if (!product) return <div style={{ padding: 20 }}>Producto no encontrado</div>;

  const fotos = Array.isArray(product.imagenes) && product.imagenes.length > 0 ? product.imagenes : [product.imagen];
  const imageUrl = selectedImage || fotos[0] || 'https://via.placeholder.com/700x520?text=No+image';
  const selectedIndex = fotos.findIndex((src) => src === selectedImage);

  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  const incrementar = () => setCantidad((prev) => (prev < product.stock ? prev + 1 : prev));

  return (
    <section style={{ padding: '28px 18px', maxWidth: 1180, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 28, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 18 }}>
          <div
            onClick={() => setShowLightbox(true)}
            role="button"
            tabIndex={0}
            style={{ width: '100%', borderRadius: 20, overflow: 'hidden', cursor: 'zoom-in', background: '#f8fafc' }}
          >
            <img
              src={imageUrl}
              alt={product.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 420 }}
            />
          </div>

          {fotos.length > 1 && (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              {fotos.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(src)}
                  aria-label={`Seleccionar imagen ${index + 1}`}
                  style={{
                    width: 84,
                    height: 84,
                    padding: 0,
                    borderRadius: 18,
                    border: selectedIndex === index ? '2px solid var(--accent)' : '1px solid #d1d5db',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#fff',
                  }}
                >
                  <img src={src} alt={`${product.nombre} vista ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 26 }}>
          <div>
            <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)', fontWeight: 800, fontSize: '0.85rem' }}>
              Detalle del producto
            </p>
            <h2 style={{ margin: '14px 0 18px', fontSize: '2.6rem', color: '#0f172a' }}>{product.nombre}</h2>
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.9, fontSize: '1rem' }}>{product.descripcion}</p>
          </div>

          <div style={{ display: 'grid', gap: 16, padding: 28, background: '#fff', borderRadius: 28, boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155', fontSize: '1rem' }}>
              <span>Precio</span>
              <strong style={{ fontSize: '1.35rem', color: '#0f172a' }}>${typeof product.precio === 'number' ? product.precio.toLocaleString('es-AR') : product.precio}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: product.stock > 0 ? '#16a34a' : '#dc2626', fontWeight: 700 }}>
              <span>Stock disponible</span>
              <span>{product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}</span>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              <span style={{ color: '#475569', fontSize: '0.95rem' }}>Cantidad</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  type="button"
                  onClick={decrementar}
                  disabled={cantidad <= 1}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    border: '1px solid #d1d5db',
                    background: cantidad > 1 ? '#ffffff' : '#f1f5f9',
                    cursor: cantidad > 1 ? 'pointer' : 'not-allowed',
                    fontSize: '1.35rem',
                    color: '#334155',
                  }}
                >
                  −
                </button>
                <span style={{ minWidth: 46, textAlign: 'center', fontWeight: 700, fontSize: '1.05rem' }}>{cantidad}</span>
                <button
                  type="button"
                  onClick={incrementar}
                  disabled={cantidad >= product.stock}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    border: '1px solid #d1d5db',
                    background: cantidad < product.stock ? '#ffffff' : '#f1f5f9',
                    cursor: cantidad < product.stock ? 'pointer' : 'not-allowed',
                    fontSize: '1.35rem',
                    color: '#334155',
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => addToCart(product, cantidad)}
              disabled={product.stock === 0}
              style={{
                border: 'none',
                borderRadius: 18,
                padding: '16px 22px',
                background: product.stock > 0 ? 'linear-gradient(90deg,var(--accent),var(--accent-2))' : '#94a3b8',
                color: '#fff',
                fontWeight: 700,
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s',
              }}
            >
              {product.stock > 0 ? `Agregar ${cantidad}` : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>

      {showLightbox && (
        <Lightbox fotos={fotos} startIndex={selectedIndex >= 0 ? selectedIndex : 0} onClose={() => setShowLightbox(false)} />
      )}
    </section>
  );
}
