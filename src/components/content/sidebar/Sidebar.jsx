import React, { useEffect, useState } from 'react';
import logo from '../../../assets/AdminLTELogo.png';
import logobonnapizza from '../../../assets/logo_bonapizza.jpeg';
import fotoperfil from '../../../assets/masculino.png';
import avatarFemenina from '../../../assets/femenino.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolder, faMoneyBillTrendUp, faBoxesStacked,
    faUserGear, faMagnifyingGlass, faPersonWalkingDashedLineArrowRight,
    faBars, faUserGroup, faHouse, faChartColumn,
    faArrowRight, faArrowLeft,faFileContract
} from '@fortawesome/free-solid-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import '../../../index';
import axios from 'axios';

function Sidebar(props) {
    const navigate = useNavigate();
    const datos = JSON.parse(localStorage.getItem('datosUsuario'));
    const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
    const [empleados, setEmpleados] = useState([]);
    //buscador
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleLogout = () => {
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
        } else if (nivel === 'Gerente') {
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
        } else if (nivel === 'Gestor de operaciones') {
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

    //FILTRADOR PARA EL BUSCADOR
    const filterMenuItems = [
        { label: "Inicio", path: "/#", icon: faHouse , display: true },
        { label: "Egreso", path: "/gastos", icon: faMoneyBillTrendUp , display: egreso !== "none" },
        { label: "Registro de actividad", path: "/inventariado", icon: faFileContract , display: inventario !== "none" },
        {
            label: "Informe",
            icon: faChartColumn,
            display: informe !== "none",
            submenu: [
                { label: "Informe de Stock", path: "/stockProducto", icon: "faBoxesStacked", display: informe_stock !== "none" },
                { label: "Informe de Ingreso y Salida", path: "/informeIngSal", icon: "faFolder", display: informe_ingsal !== "none" }
            ]
        },
        { label: "Salida", path: "/salidaProducto", icon: faArrowLeft , display: salida !== "none" },
        { label: "Ingreso", path: "/compras", icon: faArrowRight , display: ingreso !== "none" },
        { label: "Ingredientes", path: "/productos", icon: faApple , display: ingredientes !== "none" },
        { label: "Proveedores", path: "/proveedores", icon: faUserGroup , display: proveedores !== "none" },
        { label: "Categorías", path: "/categorias", icon: faRectangleList , display: categorias !== "none" },
        { label: "Usuarios", path: "/usuarios", icon: faUserGear , display: usuarios !== "none" },
    ];

    const FilterMenuSidebar = filterMenuItems
        .filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((item, index) => {
            if (item.submenu) {
                return (
                    <li className="nav-item dropdown" key={index} style={{ display: item.display ? 'block' : 'none' }}>
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={item.icon} className="bi pr-2" />
                            <p>{item.label}</p>
                        </a>
                        <ul className='dropdown-menu'>
                            {item.submenu.map((subitem, subindex) => (
                                <li className="nav-item" key={subindex} style={{ display: subitem.display ? 'block' : 'none' }}>
                                    <Link to={subitem.path} className="nav-link">
                                        <FontAwesomeIcon icon={subitem.icon} className="bi pr-2" />
                                        <p>{subitem.label}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            } else {
                return (
                    <li className="nav-item" key={index} style={{ display: item.display ? 'block' : 'none' }}>
                        <Link to={item.path} className="nav-link">
                            <FontAwesomeIcon icon={item.icon} className="bi pr-2" />
                            <p>{item.label}</p>
                        </Link>
                    </li>
                );
            }
        });

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
                    <li className="nav-item  ">
                        <a href="#" className="nav-link" onClick={handleLogout}>
                            Salir
                            <FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight}
                                className='pr-4 pl-2' />
                        </a>
                    </li>
                </ul>
            </nav>

            {/* SIDEBAR */}
            <aside className="main-sidebar  sidebar-dark-primary colorSidebar  elevation-4">
                <a href="#" className="brand-link text-decoration-none">
                    <div className="d-flex justify-content-between">
                        <div>
                            <img src={logobonnapizza} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                            <span className="font-weight">BONNA PIZZA</span>
                        </div>
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                            <FontAwesomeIcon icon={faBars} className='pl-4' />
                        </a>
                    </div>
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
                            <input
                                className="form-control form-control-sidebar "
                                type="search"
                                placeholder="Buscar"
                                aria-label="Search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {FilterMenuSidebar}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
