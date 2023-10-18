import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Login from './components/login/Login';
import Home from './components/content/home/Home';
//productos
import Productos from './components/content/producto/Productos';
import EditarProducto from './components/content/producto/EditarProducto';
import NuevoProducto from './components/content/producto/NuevoProducto';
//proveedores
import Proveedores from './components/content/proveedor/Proveedores';
import EditarProveedor from './components/content/proveedor/EditarProveedor';
import NuevoProveedor from './components/content/proveedor/NuevoProveedor';
//categorias
import Categorias from './components/content/categoria/Categorias';
import EditarCategoria from './components/content/categoria/EditarCategoria';
import NuevaCategoria from './components/content/categoria/NuevaCategoria';
//ingreso de productos(compra)
import IngresoProducto from './components/content/ingresoProducto/IngresoProducto';
import Compra from './components/content/ingresoProducto/Compras';
//salida de productos(orden)
import SalidaProducto from './components/content/salidaProducto/SalidaProducto';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} >
        <Route index element={<Home/>} />
        <Route path='/productos' element={<App/>} >
          <Route index element={<Productos/>} />
          <Route path='editar/:id' element={<EditarProducto/>} />
          <Route path='nuevo' element={<NuevoProducto/>} />
        </Route>
        <Route path='/proveedores' element={<App/>} >
          <Route index element={<Proveedores/>} />
          <Route path='editar/:id' element={<EditarProveedor/>} />
          <Route path='nuevo' element={<NuevoProveedor/>} />
        </Route>
        <Route path='/categorias' element={<App/>} >
          <Route index element={<Categorias/>} />
          <Route path='editar/:id' element={<EditarCategoria/>} />
          <Route path='nuevo' element={<NuevaCategoria/>} />
        </Route>
        {/* compra de productos */}
        <Route path='/compras' element={<App/>} >
          <Route index element={<Compra/>} /> 
          <Route path='ingresoProducto' element={<IngresoProducto/>} />
        </Route>
        {/* orden de productos */}
        <Route path='/salidaProducto' element={<App/>} > 
          <Route index element={<SalidaProducto/>} />  
        </Route>
      </Route>     
      <Route path='login' element={<Login/>} /> 
    </Routes>    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
