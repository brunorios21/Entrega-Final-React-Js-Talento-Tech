import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const col = collection(db, 'users');
      const snap = await getDocs(col);
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleAdmin = async (u) => {
    try {
      const ref = doc(db, 'users', u.id);
      await updateDoc(ref, { isAdmin: !u.isAdmin });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-4">
      <h3>Administrar Usuarios</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <div>Cargando usuarios...</div> : (
        <table className="table table-dark table-striped">
          <thead>
            <tr><th>Email</th><th>isAdmin</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.isAdmin ? 'Sí' : 'No'}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => toggleAdmin(u)}>{u.isAdmin ? 'Quitar admin' : 'Hacer admin'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
