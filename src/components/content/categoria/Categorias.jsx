<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const KEYS_TO_FILTERS = ['nombre']
=======
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput, { createFilter } from "react-search-input";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import EditarCategoria from "./EditarCategoria";
import NuevaCategoria from './NuevaCategoria';

const KEYS_TO_FILTERS = ["nombre"];
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

const Categorias = (props) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production.up.railway.app/listar_categorias.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                const data = await response.json();
                setCategorias(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener lista de categorias:', error);
                setLoading(true);
            }
        };
        fecthData();
    }, []);
=======
    const [searchTerm, setSearchTerm] = useState("");

    //categoriaModal
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [NuevaCategoriaModalOpen, setNuevaCategoriaModalOpen] = useState(false);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Activo'); //FILTRADO POR ESTADO
    
    

    const handleEditarCategoria = (categoria) => {
        setCategoriaEditando(categoria);
        //console.log(isModalOpen);
        setIsModalOpen(true);
    };

    const openNuevaCategoriaModal = () => {
        setNuevaCategoriaModalOpen(true);
    };

    const closeNuevaCategoriaModal = () => {
        setNuevaCategoriaModalOpen(false);
        setReloadData(!reloadData)
    };

    

    //Recargar pagina
    const [reloadData, setReloadData] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://profinal-production-2983.up.railway.app/listar_categorias.php"
            );
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            setCategorias(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener lista de categorias:", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, [reloadData]);
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    //Actulizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
<<<<<<< HEAD
    }

    //para filtrar categoria:
    const filterCategorias = categorias.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
=======
    };

    //para filtrar categoria:
    const filterCategorias = categorias.filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
    );
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    //filtrar por paginacion:
    const pageCount = Math.ceil(filterCategorias.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
<<<<<<< HEAD
        setCurrentPage(selected)
=======
        setCurrentPage(selected);
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentCategorias = filterCategorias.slice(starIndex, endIndex);

<<<<<<< HEAD
    if (loading) return (
        <div className="content-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '90vh' }}>
            <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
=======
    
    let categoriasEstado = currentCategorias.filter(categoria => categoria.estado === "Activo");

    //filtrar por estado:    
    if(estadoSeleccionado === "Todos"){
        categoriasEstado = currentCategorias
    }else{
        categoriasEstado = currentCategorias.filter(categoria => categoria.estado === estadoSeleccionado);
    }



    if (loading)
        return (
            <div
                className="content-wrapper d-flex justify-content-center align-items-center"
                style={{ height: "90vh" }}
            >
                <div
                    class="spinner-border"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        );
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Categorias</h1>
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
<<<<<<< HEAD
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success float-left ml-4 mt-3"
                                            onClick={() => navigate('./nuevo')}>
                                            Nueva Categoria
                                        </button>
=======
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <button
                                            type="submit"
                                            className="btn btn-success float-left ml-4 mt-3"
                                            onClick={openNuevaCategoriaModal}
                                        ><i class="bi bi-patch-plus pr-2"></i>
                                            Nueva Categoria
                                        </button>

                                        <div className="form-inline mr-4 mt-3">
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

>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                        <div className="form-inline float-right mr-4 mt-3">
                                            <div className="input-group" data-widget="sidebar-search">
                                                <SearchInput
                                                    type="search"
<<<<<<< HEAD
                                                    className='form-control custom-search'
=======
                                                    className="form-control custom-search"
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                    onChange={searchUpdated}
                                                    placeholder="Buscar Categoria ..."
                                                />
                                                <div className="input-group-append">
<<<<<<< HEAD
                                                    <button className="btn btn-outline-secondary" >
=======
                                                    <button className="btn btn-outline-secondary">
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                        <i className="fas fa-search fa-fw"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
<<<<<<< HEAD
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCategorias.map((categoria) => (
                                                <tr key={categoria.Id_Cat}>
                                                    <td>{categoria.Id_Cat}</td>
                                                    <td>{categoria.nombre}</td>
                                                    <td>{categoria.Des_Cat}</td>
                                                    <td className="project-actions text-right">
                                                        <Link
                                                            to={`./editar/${categoria.Id_Cat}`}
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                            Editar
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}

=======
                                    <table
                                        id="example1"
                                        className="table table-bordered table-striped"
                                    >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Codigo</th>
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                                <th>Estado</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoriasEstado.map((categoria) => (
                                                <tr key={categoria.Id_Cat}>
                                                    <td className="project-actions text-right">
                                                    <button
                                                    onClick={() => handleEditarCategoria(categoria)}
                                                    className="btn btn-info btn-sm"                                                        >
                                                    <i className="fas fa-pencil-alt pr-2"></i>
                                                    Editar
                                                    </button>
                                                    </td>
                                                    <td>{categoria.Id_Cat}</td>
                                                    <td>{categoria.nombre}</td>
                                                    <td>{categoria.Des_Cat}</td>
                                                    <td>{categoria.estado}</td>                                                    
                                                </tr>
                                            ))}
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
<<<<<<< HEAD
                                    activeClassName='active'
=======
                                    activeClassName="active"
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
        </div>
    );
}

export default Categorias;
=======
            {/* Modal para editar categoría */}
            {isModalOpen && (
                <EditarCategoria
                    categoria={categoriaEditando}
                    closeModal={() => {
                        setIsModalOpen(false);
                        setReloadData(!reloadData);
                    }}
                />
            )}

            {/* Modal para nueva categoría */}
            {NuevaCategoriaModalOpen && (
                <NuevaCategoria
                    closeModal={closeNuevaCategoriaModal}
                />
            )}
        </div>
    );
};

export default Categorias;
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
