import React, { useEffect, useState } from 'react';
import logo from '../../../assets/AdminLTELogo.png';
import logobonnapizza from '../../../assets/logo_bonapizza.jpeg';
import fotoperfil from '../../../assets/avatar5.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faMoneyBillTrendUp,faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import '../../../index';


function Sidebar(props) {

    const datos = JSON.parse(localStorage.getItem('datosUsuario'))

    return (

        <aside className="main-sidebar  sidebar-dark-primary elevation-4">
            <a href="#" className="brand-link text-decoration-none">
                <img src={logobonnapizza} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                <span className="font-weight-light">BONNA PIZZA</span>
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
                            <Link to='/gastos' className="nav-link">
                                <FontAwesomeIcon icon={faMoneyBillTrendUp} className="pr-2" />
                                <p>Egreso</p>
                            </Link>
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
                                    <Link to='/stockProducto' className="nav-link">
                                        <FontAwesomeIcon icon={faBoxesStacked} className="bi pr-2" />                                       
                                        <p>Informe de Stock</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/informeIngSal' className="nav-link">
                                        <FontAwesomeIcon icon={faFolder} className="bi pr-2" />
                                        <p>Informe de Ingreso y Salida</p>
                                    </Link>
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
