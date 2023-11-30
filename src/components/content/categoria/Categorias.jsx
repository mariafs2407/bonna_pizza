import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchInput, { createFilter } from "react-search-input";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import EditarCategoria from "./EditarCategoria";
import NuevaCategoria from './NuevaCategoria';

const KEYS_TO_FILTERS = ["nombre"];

const Categorias = (props) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    //categoriaModal
    const [categoriaEditando, setCategoriaEditando] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [NuevaCategoriaModalOpen, setNuevaCategoriaModalOpen] = useState(false);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Activo'); //FILTRADO POR ESTADO

    const [empleados, setEmpleados] = useState([]);

    const datos = JSON.parse(localStorage.getItem('datosUsuario'));

    const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

    var nuevacategoria = "";
    var editarcategoria = "";

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
            nuevacategoria = "none";
            editarcategoria = "none";
        }else if(nivel === 'Gerente'){
            nuevacategoria = "none";
            editarcategoria = "none";
        }else if(nivel === 'Gestor de operaciones'){
            nuevacategoria = "";
            editarcategoria = "";
        }
    };

    limitarfuncion(nivelusuario);

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
                "https://profinal-production.up.railway.app/listar_categorias.php"
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

    //Actulizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
    };

    //para filtrar categoria:
    const filterCategorias = categorias.filter(
        createFilter(searchTerm, KEYS_TO_FILTERS)
    );

    //filtrar por paginacion:
    const pageCount = Math.ceil(filterCategorias.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentCategorias = filterCategorias.slice(starIndex, endIndex);


    let categoriasEstado = currentCategorias.filter(categoria => categoria.estado === "Activo");

    //filtrar por estado:    
    if (estadoSeleccionado === "Todos") {
        categoriasEstado = currentCategorias
    } else {
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
                                    <div className="col-12 d-flex align-items-center justify-content-between">
                                        <button
                                            type="submit"
                                            style={{ display: nuevacategoria }}
                                            className="btn btn-success float-left ml-4 mt-3"
                                            onClick={openNuevaCategoriaModal}
                                        ><i class="bi bi-patch-plus pr-2"></i>
                                            Nueva Categoria
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

                                        <div className="form-inline float-right mr-4 mt-3">
                                            <div className="input-group" data-widget="sidebar-search">
                                                <SearchInput
                                                    type="search"
                                                    className="form-control custom-search"
                                                    onChange={searchUpdated}
                                                    placeholder="Buscar Categoria ..."
                                                />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary">
                                                        <i className="fas fa-search fa-fw"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <table
                                        id="example1"
                                        className="table table-head-fixed table-hover text-nowrap"
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
                                                    <button style={{ display: editarcategoria }}
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
                                    activeClassName="active"
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
