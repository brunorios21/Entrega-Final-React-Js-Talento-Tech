import React, { useState, useEffect } from 'react';
import { ItemList } from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (Array.isArray(datos)) {
          setProductos(datos);
        } else {
          throw new Error('Los datos recibidos no son válidos');
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error('Error al obtener productos:', err);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  return (
    <div className={styles.productsSection} style={{ padding: '20px' }}>
      <h2>Tienda de Equipos Fotográficos</h2>

      {cargando && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Cargando productos...</p>
          <div style={{
            display: 'inline-block',
            width: '30px',
            height: '30px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginTop: '10px'
          }} />
        </div>
      )}

      {error && !cargando && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <h3>Error al cargar los productos</h3>
          <p>{error}</p>
        </div>
      )}

      {!cargando && !error && (
        <>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Se encontraron <strong>{productos.length}</strong> producto{productos.length !== 1 ? 's' : ''}
          </p>
          <ItemList productos={productos} />
        </>
      )}
    </div>
  );
};

export default ItemListContainer;