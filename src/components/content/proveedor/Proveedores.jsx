import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
<<<<<<< HEAD
=======

>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
import './Proveedor.css';
import '../../../index';

const KEYS_TO_FILTERS = ['Contacto']

const Proveedores = (props) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
<<<<<<< HEAD
    const elemntsPage = 10; //elementos por pagina
=======
    const elemntsPage = 8; //elementos por pagina
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Activo'); //FILTRADO POR ESTADO
<<<<<<< HEAD
=======

    
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
    
    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production-2983.up.railway.app/listar_proveedores.php');
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

<<<<<<< HEAD
=======
    

>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
<<<<<<< HEAD
    
    let proveedoresEstado = currentProveedores.filter(proveedor => proveedor.Estado === "Activo");

    //filtrar por estado:    
    if(estadoSeleccionado === "Todos"){
        proveedoresEstado = currentProveedores
    }else{
        proveedoresEstado = currentProveedores.filter(proveedor => proveedor.Estado === estadoSeleccionado);
    }
    
=======

    let proveedoresEstado = currentProveedores.filter(proveedor => proveedor.Estado === "Activo");

    //filtrar por estado:    
    if (estadoSeleccionado === "Todos") {
        proveedoresEstado = currentProveedores
    } else {
        proveedoresEstado = currentProveedores.filter(proveedor => proveedor.Estado === estadoSeleccionado);
    }

>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

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
                                            onClick={() => navigate('./nuevo')}>
                                            <i class="bi bi-patch-plus pr-2"></i>Nuevo Proveedor
                                        </button>

<<<<<<< HEAD
                                        <div className="form-inline mr-4 mt-3">
=======
                                        <div className="form-inline mr-4 mt-3 ml-4">
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                            <label htmlFor="inputEstado" className='mr-3'>Seleccionar Estado :</label>
                                            <select
                                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                                id="inputEstado"
                                                name='Estado'
<<<<<<< HEAD
                                                className="form-control custom-select pr-4">                                                
=======
                                                className="form-control custom-select pr-4">
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
                                                        <i className="fas fa-search fa-fw"></i>
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
<<<<<<< HEAD
=======
                                                <th></th>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                <th>Codigo</th>
                                                <th>Nombre Completo</th>
                                                <th>RUC</th>
                                                <th>Contacto</th>
                                                <th>Telefono</th>
<<<<<<< HEAD
                                                <th>Estado</th>                                                                                               
                                                <th>Dirección</th>                                               
                                                <th>Distrito</th>
                                                <th>Acciones</th>
=======
                                                <th>Estado</th>
                                                <th>Dirección</th>
                                                <th>Distrito</th>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proveedoresEstado.map((proveedor) => (
                                                <tr key={proveedor.Codigo}>
<<<<<<< HEAD
                                                    <td>{proveedor.Codigo}</td>
                                                    <td>{proveedor.Nombre_Completo}</td>
                                                    <td>{proveedor.RUC}</td>
                                                    <td>{proveedor.Contacto}</td>
                                                    <td>{proveedor.Telefono}</td>
                                                    <td>{proveedor.Estado}</td>
                                                    <td>{proveedor.Direccion}</td>
                                                    <td>{proveedor.Distrito}</td>
=======
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                    <td className="project-actions text-right">
                                                        <Link
                                                            to={`./editar/${proveedor.Codigo}`}
                                                            className="btn btn-info btn-sm">
                                                            <i className="fas fa-pencil-alt pr-2"></i>
                                                            Editar
                                                        </Link>
                                                    </td>
<<<<<<< HEAD
=======
                                                    <td>{proveedor.Codigo}</td>
                                                    <td>{proveedor.Nombre_Completo}</td>
                                                    <td>{proveedor.RUC}</td>
                                                    <td>{proveedor.Contacto}</td>
                                                    <td>{proveedor.Telefono}</td>
                                                    <td>{proveedor.Estado}</td>
                                                    <td>{proveedor.Direccion}</td>
                                                    <td>{proveedor.Distrito}</td>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
<<<<<<< HEAD
=======
            
            
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
        </div>
    );
}

export default Proveedores;