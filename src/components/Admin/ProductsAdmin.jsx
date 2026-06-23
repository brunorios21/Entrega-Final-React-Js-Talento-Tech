import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/productsService';
import { Modal, Button } from 'react-bootstrap';
import styles from './ProductsAdmin.module.css';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ nombre: '', precio: 0, descripcion: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.nombre || Number(form.precio) <= 0) throw new Error('Nombre y precio validos');
      if (editingId) {
        await updateProduct(editingId, { ...form, precio: Number(form.precio) });
        setEditingId(null);
      } else {
        await addProduct({ ...form, precio: Number(form.precio) });
      }
      setForm({ nombre: '', precio: 0, descripcion: '', imageUrl: '' });
      fetch();
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = (id) => { setToDeleteId(id); setShowConfirm(true); };

  const handleDelete = async () => {
    try {
      await deleteProduct(toDeleteId);
      setShowConfirm(false);
      setToDeleteId(null);
      fetch();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (p) => { setEditingId(p.id); setForm({ nombre: p.nombre || '', precio: p.precio || 0, descripcion: p.descripcion || '', imageUrl: p.imageUrl || '' }); };

  return (
    <div className="container py-4">
      <h3>Administrar Productos</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <div>Cargando productos...</div> : (
        <div className={styles.gridWrap}>
          <aside className={styles.formCard}>
            <form onSubmit={handleSubmit} className="mb-0">
              <div className={styles.formRow}>
                <input name="nombre" className="form-control" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
                <input name="precio" className="form-control" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                <input name="descripcion" className="form-control" placeholder="Descripcion" value={form.descripcion} onChange={handleChange} />
                <input name="imageUrl" className="form-control" placeholder="URL de imagen (opcional)" value={form.imageUrl} onChange={handleChange} />
                <div>
                  <button className="btn btn-primary w-100" type="submit">{editingId ? 'Guardar' : 'Agregar'}</button>
                </div>
              </div>
            </form>
          </aside>

          <section className={styles.tableWrap}>
            <table className="table table-dark table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td style={{width: 100}}>
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.nombre} className={styles.thumbnail} />
                      ) : (
                        <div style={{width:84, height:84, display:'flex', alignItems:'center', justifyContent:'center', background:'#222', borderRadius:6, color:'#aaa', fontSize:12}}>Sin foto</div>
                      )}
                    </td>
                    <td>{p.nombre}</td>
                    <td>{p.precio}</td>
                    <td className="actionsCell">
                      <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(p)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Confirma eliminar este producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
