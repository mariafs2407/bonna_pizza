import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import './Proveedor.css';
import '../../../index';

const KEYS_TO_FILTERS = ['Contacto']

const Proveedores = (props) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 8; //elementos por pagina

    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Activo'); //FILTRADO POR ESTADO

    const [empleados, setEmpleados] = useState([]);

    const datos = JSON.parse(localStorage.getItem('datosUsuario'));

    const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

    var nuevoproveedor = "";
    var editarproveedor = "";

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

    const getNivel = (login) => {
        const empleado = empleados.find((empleado) => empleado.Login === login);
        if (empleado) {
            return `${empleado.Nivel}`;
        }
        return "Empleado no encontrado";
    };

    const nivelusuario = getNivel(usuarioActual); 

    const limitarfuncion = (nivel) => {
        if (nivel === 'Empleado') {
            nuevoproveedor = "none";
            editarproveedor = "none";
        }else if(nivel === 'Gerente'){
            nuevoproveedor = "none";
            editarproveedor = "none";
        }else if(nivel === 'Gestor de operaciones'){
            nuevoproveedor = "";
            editarproveedor = "";
        }
    };

    limitarfuncion(nivelusuario);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production.up.railway.app/listar_proveedores.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setProveedores(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener lista de Proveedores:', error);
                setLoading(true);
            }
        };
        fecthData();
    }, []);



    //Actualizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
    }

    //para filtar por proveedor en buscador:
    const filterProveedores = proveedores.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

    const pageCount = Math.ceil(filterProveedores.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
    };

    //para filtrar por paginación:
    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentProveedores = filterProveedores.slice(starIndex, endIndex);

    let proveedoresEstado = currentProveedores.filter(proveedor => proveedor.Estado === "Activo");

    //filtrar por estado:    
    if (estadoSeleccionado === "Todos") {
        proveedoresEstado = currentProveedores
    } else {
        proveedoresEstado = currentProveedores.filter(proveedor => proveedor.Estado === estadoSeleccionado);
    }


    if (loading) return (
        <div className="content-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '90vh' }}>
            <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Lista de Proveedores :</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                                <div className="row">
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <button type="submit" className="btn btn-success ml-4 mt-3"
                                            onClick={() => navigate('./nuevo')} style={{display: nuevoproveedor}}>
                                            <i class="bi bi-patch-plus pr-2"></i>Nuevo Proveedor
                                        </button>

                                        <div className="form-inline mr-4 mt-3 ml-4">
                                            <label htmlFor="inputEstado" className='mr-3'>Seleccionar Estado :</label>
                                            <select
                                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                                id="inputEstado"
                                                name='Estado'
                                                className="form-control custom-select pr-4">
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                                <option value="Todos">Todos</option>
                                            </select>
                                        </div>

                                        <div className="form-inline  mr-4 mt-3">
                                            <div className="input-group">
                                                <SearchInput
                                                    type="search"
                                                    className='form-control custom-search'
                                                    onChange={searchUpdated}
                                                    placeholder="Buscar contacto..."
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type='button'>
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-3 estiloScroll" >
                                    <table className="table table-head-fixed table-hover text-nowrap" >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Codigo</th>
                                                <th>Nombre Completo</th>
                                                <th>RUC</th>
                                                <th>Contacto</th>
                                                <th>Telefono</th>
                                                <th>Estado</th>
                                                <th>Dirección</th>
                                                <th>Distrito</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proveedoresEstado.map((proveedor) => (
                                                <tr key={proveedor.Codigo}>
                                                    <td className="project-actions text-right">
                                                        <Link style={{display: nuevoproveedor}}
                                                            to={`./editar/${proveedor.Codigo}`}
                                                            className="btn btn-info btn-sm">
                                                            <i className="fas fa-pencil-alt pr-2"></i>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                    <td>{proveedor.Codigo}</td>
                                                    <td>{proveedor.Nombre_Completo}</td>
                                                    <td>{proveedor.RUC}</td>
                                                    <td>{proveedor.Contacto}</td>
                                                    <td>{proveedor.Telefono}</td>
                                                    <td>{proveedor.Estado}</td>
                                                    <td>{proveedor.Direccion}</td>
                                                    <td>{proveedor.Distrito}</td>
                                                </tr>
                                            ))}

                                        </tbody>

                                    </table>
                                </div>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="Siguiente >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< Anterior"
                                    renderOnZeroPageCount={null}
                                    // estilos
                                    containerClassName="pagination justify-content-center"
                                    previousClassName="page-item"
                                    nextClassName="page-item"
                                    activeClassName='active'
                                    previousLinkClassName="page-link"
                                    nextLinkClassName="page-link"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousLabelClassName="page-link"
                                    nextLabelClassName="page-link"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Proveedores;