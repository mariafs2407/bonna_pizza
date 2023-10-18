import React, { useEffect, useState } from 'react';
import logo from '../../../assets/AdminLTELogo.png';
import fotoperfil from '../../../assets/avatar5.png';
import { Link } from 'react-router-dom';
import '../../../index';


function Sidebar(props) {

    const datos = JSON.parse(localStorage.getItem('datosUsuario'))

    return (

        <aside className="main-sidebar  sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">Imagen bonna pizza</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={fotoperfil} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    {datos.map(item =>
                        <div className="info" key={item.Login_Usuario}>
                            <a href="#" className="d-block">{item.Login_Usuario}</a>
                        </div>
                    )}
                </div>

                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw pr-2"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item">
                            <Link to='/salidaProducto' className="nav-link">
                                <i className="nav-icon fa-solid bi bi-house-door-fill pr-2"></i>
                                <p> Inicio</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fa-solid bi bi-cash pr-2"></i>
                                <p>Gastos</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link ">
                                <i className="nav-icon fa-solid bi bi-boxes pr-2"></i>
                                <p>Inventario</p>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="nav-icon fa-solid bi-bar-chart-fill pr-2"></i>
                                <p> Informe</p>
                            </a>
                            <ul className='dropdown-menu'>
                                <li className="nav-item">
                                    <a href="#" className="nav-link" >
                                        <i className="fa-regular fa-file-invoice-dollar nav-icon pr-2"></i>
                                        <p>Informe de Gastos</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="fa-regular fa-file-lines nav-icon pr-2"></i>
                                        <p>Informe de Stock</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <p>Informe de Ingreso y Salida</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link to='/salidaProducto' className="nav-link">
                                <i class="bi bi-arrow-bar-left pr-2 "></i>
                                <p>Salida</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/compras" className="nav-link">
                                <i class="bi bi-arrow-bar-right pr-2"></i>
                                <p> Ingreso</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/productos" className="nav-link">
                                <i class="bi bi-apple pr-2"></i>
                                <p>Ingredientes</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/proveedores" className="nav-link">
                                <i class="bi bi-people-fill pr-2"></i>
                                <p>Proveedores</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/categorias" className="nav-link">
                                <i className="nav-icon bi bi-card-list pr-2"></i>
                                <p>Categorías</p>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>


    );
}

export default Sidebar;
