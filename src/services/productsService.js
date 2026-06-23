import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const col = collection(db, 'productos');

export async function getProducts() {
  const snap = await getDocs(col);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addProduct(product) {
  const ref = await addDoc(col, product);
  return ref.id;
}

export async function updateProduct(id, data) {
  const ref = doc(db, 'productos', id);
  await updateDoc(ref, data);
}

export async function deleteProduct(id) {
  const ref = doc(db, 'productos', id);
  await deleteDoc(ref);
}
