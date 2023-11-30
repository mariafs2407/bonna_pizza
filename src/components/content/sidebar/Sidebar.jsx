import React, { useEffect, useState } from 'react';
import logo from '../../../assets/AdminLTELogo.png';
import logobonnapizza from '../../../assets/logo_bonapizza.jpeg';
import fotoperfil from '../../../assets/masculino.png';
import avatarFemenina  from '../../../assets/femenino.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolder, faMoneyBillTrendUp, faBoxesStacked,
    faUserGear, faMagnifyingGlass, faPersonWalkingDashedLineArrowRight,faBars
} from '@fortawesome/free-solid-svg-icons';
import '../../../index';
import axios from 'axios';

function Sidebar(props) {
    
    const navigate = useNavigate();
    
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));

    const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

    const [empleados, setEmpleados] = useState([]);

    var egreso = "";
    var inventario = "";
    var informe_ingsal = "";
    var informe_stock = "";
    var informe = "";
    var salida = "";
    var ingreso = "";
    var ingredientes = "";
    var proveedores = "";
    var categorias = "";
    var usuarios = "";

    const handleLogout = () =>{
        localStorage.removeItem('datosUsuario');
        Cookies.remove('usuarioRecordado');
        Cookies.remove('claveRecordada');
        navigate('/Login');
    };

    const leerEmpleados = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_usuarios.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setEmpleados(data);
            })
    }
    useEffect(() => {
        leerEmpleados();        
    }, []);

    const getGenero = (login) => {
        const empleado = empleados.find((empleado) => empleado.Login === login);
        if (empleado) {
            return `${empleado.Genero}`;
        }
        return "Empleado no encontrado";
    };

    const getNivel = (login) => {
        const empleado = empleados.find((empleado) => empleado.Login === login);
        if (empleado) {
            return `${empleado.Nivel}`;
        }
        return "Empleado no encontrado";
    };

    const generousuario = getGenero(usuarioActual); 
    const nivelusuario = getNivel(usuarioActual); 

    const getAvatarImage = (gender) => {
        if (gender === 'Femenino') { 
            return avatarFemenina;
        } else {
            return fotoperfil;
        }
    };

    const limitarfuncion = (nivel) => {
        if (nivel === 'Empleado') { 
            egreso = "none";
            inventario = "none";
            informe = "none";
            informe_ingsal = "";
            informe_stock = "";
            salida = "";
            ingreso = "none";
            ingredientes = "";
            proveedores = "none";
            categorias = "";
            usuarios = "none";
        }else if(nivel === 'Gerente'){
            egreso = "";
            inventario = "";
            informe = "";
            informe_ingsal = "";
            informe_stock = "";
            salida = "none";
            ingreso = "";
            ingredientes = "";
            proveedores = "";
            categorias = "";
            usuarios = "none";
        }else if(nivel === 'Gestor de operaciones'){
            egreso = "none";
            inventario = "none";
            informe = "none";
            informe_ingsal = "";
            informe_stock = "";
            salida = "none";
            ingreso = "none";
            ingredientes = "";
            proveedores = "";
            categorias = "";
            usuarios = "none";
        }
    };

    limitarfuncion(nivelusuario);

    return (
        <>
            {/* MENU SUPERIOR PARA SALIR Y MOSTRAR EL SIDEBAR */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <FontAwesomeIcon icon={faBars} className='pl-4' />
                        </a>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto ">
                    <li className="nav-item d-none d-sm-inline-block ">
                        <a href="#" className="nav-link" onClick={handleLogout}>
                            Salir
                            <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight}
                            className='pr-4 pl-2'/>
                        </a>
                    </li>
                </ul>
            </nav>
            
            {/* SIDEBAR */}
            <aside className="main-sidebar  sidebar-dark-primary elevation-4">
                <a href="#" className="brand-link text-decoration-none">
                    <img src={logobonnapizza} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                    <span className="font-weight-light">BONNA PIZZA</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            {datos.map(item =>
                                <img src={getAvatarImage(generousuario)} className="img-circle elevation-2" alt="User Image" key={item.Login_Usuario} />
                             )}
                        </div>
                        {datos.map(item =>
                            <div className="info" key={item.Login_Usuario}>
                                <a href="#" className="d-block text-decoration-none">{item.Login_Usuario}</a>
                            </div>
                        )}
                    </div>

                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item">
                                <Link to='/#' className="nav-link">
                                    <i className="nav-icon fa-solid bi bi-house-door-fill pr-2"></i>
                                    <p> Inicio</p>
                                </Link>
                            </li>
                            <li className="nav-item" style={{display: egreso}}>
                                <Link to='/gastos' className="nav-link">
                                    <FontAwesomeIcon icon={faMoneyBillTrendUp} className="pr-2" />
                                    <p>Egreso</p>
                                </Link>
                            </li>
                            <li className="nav-item" style={{display: inventario}}>
                                <a href="#" className="nav-link ">
                                    <i className="nav-icon fa-solid bi bi-boxes pr-2"></i>
                                    <p>Inventario</p>
                                </a>
                            </li>
                            <li className="nav-item dropdown" style={{display: informe}}>
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="nav-icon fa-solid bi-bar-chart-fill pr-2"></i>
                                    <p> Informe</p>
                                </a>
                                <ul className='dropdown-menu'>

                                    <li className="nav-item" style={{display: informe_stock}}>
                                        <Link to='/stockProducto' className="nav-link">
                                            <FontAwesomeIcon icon={faBoxesStacked} className="bi pr-2" />
                                            <p>Informe de Stock</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item" style={{display: informe_ingsal}}>
                                        <Link to='/informeIngSal' className="nav-link">
                                            <FontAwesomeIcon icon={faFolder} className="bi pr-2" />
                                            <p>Informe de Ingreso y Salida</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item" style={{display: salida}}>
                                <Link to='/salidaProducto' className="nav-link">
                                    <i className="bi bi-arrow-bar-left pr-2 "></i>
                                    <p>Salida</p>
                                </Link>
                            </li>

                            <li className="nav-item" style={{display: ingreso}}>
                                <Link to="/compras" className="nav-link">
                                    <i className="bi bi-arrow-bar-right pr-2"></i>
                                    <p> Ingreso</p>
                                </Link>
                            </li>

                            <li className="nav-item" style={{display: ingredientes}}>
                                <Link to="/productos" className="nav-link">
                                    <i className="bi bi-apple pr-2"></i>
                                    <p>Ingredientes</p>
                                </Link>
                            </li>

                            <li className="nav-item" style={{display: proveedores}}>
                                <Link to="/proveedores" className="nav-link">
                                    <i className="bi bi-people-fill pr-2"></i>
                                    <p>Proveedores</p>
                                </Link>
                            </li>

                            <li className="nav-item" style={{display: categorias}}>
                                <Link to="/categorias" className="nav-link">
                                    <i className="nav-icon bi bi-card-list pr-2"></i>
                                    <p>Categorías</p>
                                </Link>
                            </li>

                            <li className="nav-item" style={{display: usuarios}}>
                                <Link to="/usuarios" className="nav-link">
                                    <FontAwesomeIcon icon={faUserGear} className="bi pr-2" />
                                    <p>usuarios</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
