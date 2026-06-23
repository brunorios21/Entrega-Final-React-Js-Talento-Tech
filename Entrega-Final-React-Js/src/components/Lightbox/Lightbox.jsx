import React, { useEffect, useState } from 'react';

export default function Lightbox({ fotos = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex || 0);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  const prev = () => setIndex((i) => (i === 0 ? fotos.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === fotos.length - 1 ? 0 : i + 1));

  if (!fotos || fotos.length === 0) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.7)', display: 'grid', placeItems: 'center', zIndex: 9999
    }} onClick={onClose}>
      <div style={{ maxWidth: '92%', maxHeight: '88%', width: 980, display: 'grid', gridTemplateColumns: '1fr 120px', gap: 18 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#000' }}>
          <img src={fotos[index]} alt={`Imagen ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '88vh' }} />
          <button aria-label="Anterior" onClick={prev} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', width: 44, height: 44, borderRadius: 22, cursor: 'pointer' }}>‹</button>
          <button aria-label="Siguiente" onClick={next} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', width: 44, height: 44, borderRadius: 22, cursor: 'pointer' }}>›</button>
          <button aria-label="Cerrar" onClick={onClose} style={{ position: 'absolute', right: 12, top: 12, background: 'rgba(255,255,255,0.06)', color: '#fff', border: 'none', padding: '8px 10px', borderRadius: 10, cursor: 'pointer' }}>Cerrar</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', overflowY: 'auto' }}>
          {fotos.map((src, i) => (
            <button key={src + i} onClick={() => setIndex(i)} style={{ border: i === index ? '2px solid var(--accent)' : '1px solid #e5e7eb', padding: 0, width: 100, height: 70, borderRadius: 8, overflow: 'hidden', background: '#fff', cursor: 'pointer' }}>
              <img src={src} alt={`thumb ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
