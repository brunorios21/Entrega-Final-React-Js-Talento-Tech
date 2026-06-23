import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function UsersDebug() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const col = collection(db, 'users');
        const snap = await getDocs(col);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // listado obtenido (modo debug)
        setDocs(list);
      } catch (err) {
        console.error('UsersDebug error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Cargando documentos users...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h3>Debug: colección `users`</h3>
      {docs.length === 0 ? (
        <p>No se encontraron documentos en la colección <strong>users</strong>.</p>
      ) : (
        <table className="table table-dark table-striped">
          <thead><tr><th>ID</th><th>Campos</th></tr></thead>
          <tbody>
            {docs.map(d => (
              <tr key={d.id}>
                <td style={{maxWidth: '220px', wordBreak: 'break-all'}}>{d.id}</td>
                <td><pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(d, null, 2)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
