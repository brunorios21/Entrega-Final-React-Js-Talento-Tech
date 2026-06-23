import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Greeting from './components/Greeting/Greeting';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import Contact from './components/Contact/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminPanel from './components/Admin/AdminPanel';
import ProductsAdmin from './components/Admin/ProductsAdmin';
import UsersAdmin from './components/Admin/UsersAdmin';
import AdminRoute from './components/Auth/AdminRoute';
import UsersDebug from './components/Debug/UsersDebug';
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<ProtectedRoute><div className="container py-4">Perfil privado</div></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPanel/></AdminRoute>} />
          <Route path="/admin/productos" element={<AdminRoute><ProductsAdmin/></AdminRoute>} />
          <Route path="/admin/usuarios" element={<AdminRoute><UsersAdmin/></AdminRoute>} />
          <Route path="/debug-users" element={<UsersDebug/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
