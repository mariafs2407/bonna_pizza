import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
=======
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarrot } from '@fortawesome/free-solid-svg-icons';
import NuevoProducto from './NuevoProducto';
import EditarProducto from './EditarProducto';
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
import './Productos';
import '../../../index';

const KEYS_TO_FILTERS = ['Producto']

const Productos = (props) => {
    const navigate = useNavigate();
<<<<<<< HEAD
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina
=======

    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina    
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Activo'); //FILTRADO POR ESTADO
    const [descontinuadoSeleccionado, setdescontinuadoSeleccionado] = useState('Disponible'); //FILTRADO POR DESCONTINUADO
    const [categoriaSeleccionado, setCategoriaSeleccionado] = useState('Todos'); //FILTRADO POR DESCONTINUADO
    const [categorias, setCategorias] = useState([]);

<<<<<<< HEAD
    const leerCategorias = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_categorias.php";
=======
    //ProductoModal
    const [productoEditando, setProductoEditando] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [NuevaProductoModalOpen, setNuevaProductoModalOpen] = useState(false);

    const actualizarProductos = async () => {
        const response = await fetch('https://profinal-production-2983.up.railway.app/listar_productos.php');
        const data = await response.json();
        setProductos(data);
    }

    const handleEditarProducto = (id) => {
        setProductoEditando(id);
        //console.log(isModalOpen);
        setIsModalOpen(true);
    };

    const openNuevaProductoModal = () => {
        setNuevaProductoModalOpen(true);
    };

    const closeNuevaProductoModal = () => {
        setNuevaProductoModalOpen(false);
        setReloadData(!reloadData)
    };

    //Recargar pagina
    const [reloadData, setReloadData] = useState(false);


    const leerCategorias = (e) => {
        const rutaServicio = "https://profinal-production-2983.up.railway.app/listar_categorias.php";
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategorias(data);
            })
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production-2983.up.railway.app/listar_productos.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setProductos(data);
                console.log(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al obtener lista de Productos:', error);
                setLoading(true);
            }
        };
        fecthData();
        leerCategorias();
<<<<<<< HEAD
    }, []);
=======
    }, [reloadData]);
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    //Actulizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
    }

    //para filtrar producto
    const filterProductos = productos.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

    const pageCount = Math.ceil(filterProductos.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentProductos = filterProductos.slice(starIndex, endIndex);

<<<<<<< HEAD
    let productoEstado = currentProductos.filter( (producto) => {
=======
    let productoEstado = currentProductos.filter((producto) => {
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
        const cumpleEstado = estadoSeleccionado === "Todos" || producto.Estado === estadoSeleccionado;
        const cumpleDescontinuado = descontinuadoSeleccionado === "Todos" || producto.Descontinuado === descontinuadoSeleccionado;
        const cumpleCategoria = categoriaSeleccionado === "Todos" || producto.Categoria === categoriaSeleccionado;

        return cumpleEstado && cumpleDescontinuado && cumpleCategoria;
    });


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
<<<<<<< HEAD
                            <h1>Lista de Igredientes :</h1>
=======
                            <h1>Lista de Ingredientes :</h1>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
                                    <div className="col-12 ">
                                        <button type="submit" className="btn btn-success float-left ml-4 mt-3"
<<<<<<< HEAD
                                            onClick={() => navigate('./nuevo')}>
                                            <i class="bi bi-patch-plus pr-2"></i> Nuevo Ingrediente
=======
                                            onClick={openNuevaProductoModal}>
                                            <FontAwesomeIcon className='pr-2' icon={faCarrot} style={{ color: "#fff", }} />
                                            Nuevo Ingrediente
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                        </button>

                                        <div className="form-inline float-right mr-4 mt-3">
                                            <div className="input-group" data-widget="sidebar-search">
                                                <SearchInput
                                                    type="search"
                                                    className='form-control custom-search'
                                                    onChange={searchUpdated}
                                                    placeholder="Buscar producto ..."
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" >
                                                        <i className="fas fa-search fa-fw"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-12 d-flex align-items-center justify-content-center">
                                        <div className="form-inline mr-4 mt-3">
                                            <label htmlFor="inputEstado" className='mr-3'>Seleccionar Estado :</label>
                                            <select
                                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                                id="inputEstado"
                                                name='Estado'
<<<<<<< HEAD
                                                className="form-control custom-select pr-4"                                                                                                 >
=======
                                                className="form-control custom-select pr-4">
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                                <option value="Todos">Todos</option>
                                            </select>
                                        </div>

                                        <div className="form-inline mr-4 mt-3">
                                            <label htmlFor="inputDescontinuado" className='mr-3'>Seleccionar Disponibilidad :</label>
                                            <select
                                                onChange={(e) => setdescontinuadoSeleccionado(e.target.value)}
                                                id="inputDescontinuado"
                                                name='Descontinuado'
                                                className="form-control custom-select pr-4"                                                                                                 >
                                                <option value="Disponible">Disponible</option>
                                                <option value="No disponible">No disponible</option>
                                                <option value="Todos">Todos</option>
                                            </select>
                                        </div>

                                        <div className="form-inline mr-4 mt-3">
                                            <label htmlFor="inputDescontinuado" className='mr-3'>Seleccionar Categoría :</label>
                                            <select id="inputCategoria"
                                                onChange={(e) => setCategoriaSeleccionado(e.target.value)}
<<<<<<< HEAD
                                                className="form-control custom-select pr-4"  
=======
                                                className="form-control custom-select pr-4"
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                data-placeholder="Seleccione una opcion">
                                                {categorias.map((categoria) => (
                                                    <option key={categoria.Id_Cat} value={categoria.nombre}>
                                                        {categoria.nombre}
                                                    </option>
                                                ))}
                                                <option value="Todos">Todos</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body table-responsive p-3 estiloScroll">
                                    <table className="table table-head-fixed table-hover text-nowrap">
                                        <thead>
                                            <tr>
<<<<<<< HEAD
                                                <th>Codigo</th>
                                                <th>Ingrediente</th>
                                                <th>Proveedor</th>
=======
                                                <th></th>
                                                <th>Codigo</th>
                                                <th>Ingrediente</th>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                <th>Categoria</th>
                                                <th>Stock Minimo</th>
                                                <th>Unidad de Medida</th>
                                                <th>Descontinuado</th>
                                                <th>Estado</th>
<<<<<<< HEAD
                                                <th>Acciones</th>
=======

>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productoEstado.map((producto) => (
                                                <tr key={producto.Codigo}>
<<<<<<< HEAD
                                                    <td>{producto.Codigo}</td>
                                                    <td>{producto.Producto}</td>
                                                    <td>{producto.Proveedor}</td>
=======
                                                    <td className="project-actions text-right">
                                                        <button
                                                            onClick={() => handleEditarProducto(producto.Codigo)}
                                                            className="btn btn-info btn-sm"                                                        >
                                                            <i className="fas fa-pencil-alt pr-2"></i>
                                                            Editar
                                                        </button>
                                                    </td>
                                                    <td>{producto.Codigo}</td>
                                                    <td>{producto.Producto}</td>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                    <td>{producto.Categoria}</td>
                                                    <td>{producto.StockMinimo}</td>
                                                    <td>{producto.U_Medida}</td>
                                                    <td>{producto.Descontinuado}</td>
                                                    <td>{producto.Estado}</td>
<<<<<<< HEAD
                                                    <td className="project-actions text-right">
                                                        <Link
                                                            to={`./editar/${producto.Codigo}`}
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            <i className="fas fa-pencil-alt pr-2"></i>
                                                            Editar
                                                        </Link>
                                                    </td>
=======

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
            {isModalOpen && (
                <EditarProducto
                    productoCodigo={productoEditando}
                    closeModal={() => {
                        setIsModalOpen(false);                       
                    }}      
                    actualizarProductos={actualizarProductos}
                    productos={productos}
                />
            )}
            {/* Modal para nueva producto */}
            {NuevaProductoModalOpen && (
                <NuevoProducto
                closeModal={closeNuevaProductoModal}
                actualizarProductos={actualizarProductos}
                productos={productos}
                />

            )}
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
        </div>
    );
}

export default Productos;