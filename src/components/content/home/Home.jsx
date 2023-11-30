import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserClock, faUsersRays, faCircleRight,
    faPizzaSlice, faFolder, faComment, faTruckFast
} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import fotoperfil from '../../../assets/masculino.png';
import avatarFemenina from '../../../assets/femenino.png';
import '../../../index';

const Home = (props) => {
    const showAlert = localStorage.getItem('alerta') === 'true';

    var ingreso_ing = "";
    var salida_ing = "";
    var usuarios2 = "";
    var proveedores = "";
    var stock = "";
    var compras = "";

    const handleCloseAlert = () => {
        localStorage.setItem('alerta', 'false');
    };

    const datos = JSON.parse(localStorage.getItem('datosUsuario'))
    const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [cant_emp, setCant_emp] = useState([]);
    const [cant_prv, setCant_prv] = useState([]);
    const [cant_ing, setCant_ing] = useState([]);
    const [cant_sal, setCant_sal] = useState([]);
    const [productosConBajoStock, setProductosConBajoStock] = useState([]);
    const [datos_usuario, setDatos_usuario] = useState([]);
    const [comprasPendientes, setComprasPendientes] = useState([]);

    const leerEmpleados = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_empleados.php";
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


    const leerUsuarios = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_usuarios.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUsuarios(data);
            })
    }
    useEffect(() => {
        leerUsuarios();        
    }, []);

    //Notificaciones:
    const leerNotf_Emp = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_empleados.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCant_emp(data);
            })
    }
    const leerNotf_Prv = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_proveedores.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCant_prv(data);
            })
    }
    const leerNotf_Ing = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_ingresos.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCant_ing(data);
            })
    }
    const leerNotf_sal = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_salidas.php ";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCant_sal(data);
            })
    }

    const leerNotf_Productos = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_productos.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProductosConBajoStock(data);
            })
    }

    const leerNotf_UsuarioIngresado = (e) => {
        const formData = new URLSearchParams();
        formData.append('login', usuarioActual);
        console.log(usuarioActual);

        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_usuarioingresado.php ";
        fetch(rutaServicio, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                setDatos_usuario(data);
            })
            .catch((error) => {
                console.error('Error al obtener datos de usuario:', error);
            });
    }

    const leerNotf_ComprasPendientes = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/notificacion_compraspendientes.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setComprasPendientes(data);
            })
    }
    useEffect(() => {
        leerEmpleados();
        leerNotf_Emp();
        leerNotf_Ing();
        leerNotf_Prv();
        leerNotf_sal();
        leerNotf_Productos();
        leerNotf_UsuarioIngresado();
        leerNotf_ComprasPendientes();
        console.log(productosConBajoStock)
    }, []);

    const getNombreEmpleado = (login) => {
        const empleado = empleados.find((empleado) => empleado.Login === login);
        if (empleado) {
            return `${empleado.Nomyape}`;
        }
        return "Empleado no encontrado";
    };

    const getAvatarImagen = (login) => {
        const dato = datos_usuario.find((dato) => dato.Login === login);
        if (dato) {
            return dato.Genero === 'Femenino' ? avatarFemenina : fotoperfil;
        }
        return "Empleado no encontrado";
    };

    const getNivel = (login) => {
        const usuario = usuarios.find((usuario) => usuario.Login === login);
        if (usuario) {
            return `${usuario.Nivel}`;
            
        }
        return "Empleado no encontrado";
    };

    const nivelusuario = getNivel(usuarioActual);

    const limitarfuncion = (nivel) => {
        if (nivel === 'Empleado') {
            ingreso_ing = "none";
            salida_ing = "none";
            usuarios2 = "none";
            proveedores = "";
            stock = "none";
            compras = "none";
        } else if (nivel === 'Gerente') {
            ingreso_ing = "";
            salida_ing = "";
            usuarios2 = "none";
            proveedores = "";
            stock = "";
            compras = "";
        } else if (nivel === 'Gestor de operaciones') {
            ingreso_ing = "none";
            salida_ing = "none";
            usuarios2 = "none";
            proveedores = "";
            stock = "none";
            compras = "none";
        }
    };

    limitarfuncion(nivelusuario);

    console.log(usuarioActual)

    return (
        <div className='content-wrapper'>
            {showAlert &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Compra entregada</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                        onClick={handleCloseAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
            <div className='content-header'>
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6 p-2">
                            <h1 className='m-0'>Bienvenido/a
                                "{getNombreEmpleado(usuarioActual)}"</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="content">
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-info">
                                <div class="inner">
                                    {cant_sal.map((item) => (
                                        <h3 key={item.cant_orden}>
                                            {item.cant_orden}
                                        </h3>
                                    ))}
                                    <p>Salida de ingredientes</p>
                                </div>
                                <div class="icon">
                                    <FontAwesomeIcon icon={faFolder} />
                                </div>
                                <Link to="/informeIngSal" class="small-box-footer" style={{display: salida_ing}}>Ver más
                                    <FontAwesomeIcon icon={faCircleRight} className="pl-2" />
                                </Link>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-success">
                                <div class="inner">
                                    {cant_ing.map((item) => (
                                        <h3 key={item.cant_compra}>
                                            {item.cant_compra}
                                        </h3>
                                    ))}

                                    <p>Ingreso de ingredientes</p>
                                </div>
                                <div class="icon">
                                    <FontAwesomeIcon icon={faFolder} />
                                </div>
                                <Link to="/informeIngSal" class="small-box-footer" style={{display: ingreso_ing}}>Ver más
                                    <FontAwesomeIcon icon={faCircleRight} className="pl-2" />
                                </Link>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-warning">
                                <div class="inner">
                                    {cant_emp.map((item) => (
                                        <h3 key={item.cant_empleados}>
                                            {item.cant_empleados}
                                            <sup style={{ fontSize: "20px" }}>emp.</sup>
                                        </h3>
                                    ))}

                                    <p>Usuarios</p>
                                </div>
                                <div class="icon">
                                    <FontAwesomeIcon icon={faUserClock} />
                                </div>
                                <Link to='/usuarios' class="small-box-footer" style={{display: usuarios2}}>Ver más
                                    <FontAwesomeIcon icon={faCircleRight} className="pl-2" />
                                </Link>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6">

                            <div class="small-box bg-secondary">
                                <div class="inner">
                                    {cant_prv.map((item) => (
                                        <h3 key={item.cant_proveedores}>
                                            {item.cant_proveedores}
                                        </h3>
                                    ))}

                                    <p>Proveedores</p>
                                </div>
                                <div class="icon">
                                    <FontAwesomeIcon icon={faUsersRays} />
                                </div>
                                <Link to='/proveedores' class="small-box-footer " style={{display: proveedores}}>Ver más
                                    <FontAwesomeIcon icon={faCircleRight} className="pl-2" />
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <h5 className='pb-4'>Notificaciones Recientes
                            <FontAwesomeIcon icon={faComment} beat className='pl-2' />
                        </h5>
                        <div className='row'>
                            <div className="col ">
                                <div class="col-md-6 col-lg-12">
                                    <div class="info-box bg-danger">
                                        <span class="info-box-icon">
                                            <FontAwesomeIcon icon={faPizzaSlice} bounce size="xl" />
                                        </span>

                                        <div class="info-box-content">
                                            {productosConBajoStock.length > 0 ? (
                                                <div>
                                                    <span class="info-box-text">Ingredientes con stock actual bajo:</span>
                                                    <div style={{ display: "flex", fontWeight: "bold", flexWrap: "wrap" }}>
                                                        {productosConBajoStock.map((item, index) => (
                                                            <h5 class="info-box-text pt-2" key={item.IdProducto}>
                                                                {item.Nombre}
                                                                {index < productosConBajoStock.length - 1 && ', '}
                                                            </h5>
                                                        ))}
                                                    </div>
                                                    <Link to='/stockProducto' className='stock_ver pr-2' style={{ textAlign: 'right',  display: stock }}>
                                                        Ver más
                                                        <FontAwesomeIcon icon={faCircleRight} className="pl-2" />
                                                    </Link>
                                                </div>

                                            ) : (
                                                <span class="info-box-text">
                                                    No hay ingredientes con stock actual bajo.
                                                </span>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-12">
                                    <div class="info-box bg-primary">
                                        <span class="info-box-icon">
                                            <FontAwesomeIcon icon={faTruckFast} beatFade size="xl" />
                                        </span>

                                        <div class="info-box-content">
                                            {comprasPendientes.length > 0 ? (
                                                <div>
                                                    <span class="info-box-text">Compras por Actualizar:</span>
                                                    <div style={{ display: "flex", fontWeight: "bold", flexWrap: "wrap" }}>
                                                        {comprasPendientes.map((item) => (
                                                            <h5 class="info-box-text p-2" key={item.ComprasPendientes}>
                                                                {`${item.ComprasPendientes} Pendientes`}
                                                            </h5>
                                                        ))}
                                                    </div>
                                                    <Link to='/compras' className='stock_ver pr-2' style={{ textAlign: 'right', display: compras }}>
                                                        Ver más
                                                        <FontAwesomeIcon icon={faCircleRight} className="pl-2" />
                                                    </Link>
                                                </div>

                                            ) : (
                                                <span class="info-box-text">
                                                    "Cargando compras pendientes"
                                                </span>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div class="col-md-6 col-lg-12">
                                    {datos_usuario.length > 0 ? (
                                        datos_usuario.map((item) => (
                                            <div class="card card-widget widget-user" key={item.Login}>
                                                <div class="widget-user-header bg-info">
                                                    <h3 class="widget-user-username">{`${item.Nombre} , ${item.Apellido} `}</h3>
                                                    <h5 class="widget-user-desc"> {item.Nivel}</h5>
                                                </div>
                                                <div class="widget-user-image">
                                                    <img class="img-circle elevation-2" src={getAvatarImagen(item.Login)} alt="User Avatar" />
                                                </div>
                                                <div class="card-footer">
                                                    <div class="row">
                                                        <div class="col-sm-4 border-right">
                                                            <div class="description-block">
                                                                <h5 class="description-header">Telefono</h5>
                                                                <span class="description-text">{item.Telefono}</span>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-4 border-right">
                                                            <div class="description-block">
                                                                <h5 class="description-header">Descripción de cargo</h5>
                                                                <span class="description-text">{item.Descripcion}</span>
                                                            </div>
                                                        </div>

                                                        <div class="col-sm-4">
                                                            <div class="description-block">
                                                                <h5 class="description-header">Años de servicio</h5>
                                                                <span class="description-text">{item.A_Servicios}</span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <span class="info-box-text">
                                            "Cargando datos de usuario"
                                        </span>
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;