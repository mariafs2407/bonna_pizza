import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserPen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import SinResultados from "../animacion/SinResultados";
import '../../../index';
import './Usuario.css';

const KEYS_TO_FILTERS = ['Login']

const Usuarios = (props) => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const elemntsPage = 10;


    //Actulizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
    }

    //para filtrar producto
    const filterUsuarios = usuarios.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
    const pageCount = Math.ceil(filterUsuarios.length / elemntsPage);

    //Recargar pagina
    const [reloadData, setReloadData] = useState(false);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
    };

    //para filtrar por paginación:
    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentUsuarios = filterUsuarios.slice(starIndex, endIndex);

    //filtrar estado
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos'); //FILTRADO POR ESTADO
    const [nivelSeleccionado, setNivelSeleccionado] = useState("Todos");//FILTRADO POR NIVEL

    const usuariosEstado = currentUsuarios.filter((usuario) => {
        const cumpleEstado = estadoSeleccionado === "Todos" || usuario.Estado === estadoSeleccionado;
        const cumpleNivel = nivelSeleccionado === "Todos" || usuario.Nivel === nivelSeleccionado;

        return cumpleEstado && cumpleNivel;
    });


    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production.up.railway.app/listar_usuarios.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setUsuarios(data);
                console.log(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al obtener lista de Usuarios:', error);
                setLoading(true);
            }
        };
        fecthData();
    }, [reloadData]);


    if (loading) return (
        <div className="content-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '90vh' }}>
            <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )

    return (
        <div className='content-wrapper'>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Lista de Usuarios :</h1>
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
                                    <div className="col-12 d-flex align-items-center justify-content-between  flex-wrap">
                                        <button type="submit" className="btn btn-success ml-4 mt-3 mr-4"
                                            onClick={() => navigate('./nuevo')}>
                                            <FontAwesomeIcon icon={faUserPlus} className='pr-2' />
                                            Nuevo Usuario
                                        </button>
                                        <div className="form-inline mr-4 mt-3 ml-4">
                                            <div className="input-group">
                                                <SearchInput
                                                    type="search"
                                                    className='form-control custom-search'
                                                    onChange={searchUpdated}
                                                    placeholder="Buscar usuario por login"
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

                                <div className="row">
                                    <div className="col-12 d-flex align-items-center justify-content-center flex-wrap">
                                        <div className="form-inline mr-4 mt-3 ">
                                            <label htmlFor="inputEstado" className='mr-3'>Estado:</label>
                                            <select
                                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                                value={estadoSeleccionado}
                                                id="inputEstado"
                                                name='Estado'
                                                className="form-control custom-select pr-4">
                                                <option value="Todos">Todos</option>
                                                <option selected value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </select>
                                        </div>

                                        <div className="form-inline mr-4 mt-3 ml-4">
                                            <label htmlFor="inputDescontinuado" className='mr-3'>Nivel de usuario :</label>
                                            <select
                                                onChange={(e) => setNivelSeleccionado(e.target.value)}
                                                value={nivelSeleccionado}
                                                id="inputNivelUsuario"
                                                name='Estado'
                                                className="form-control custom-select pr-4">
                                                <option value="Todos">Todos</option>
                                                <option value="Empleado" >Empleado</option>
                                                <option value="Gerente" >Gerente</option>
                                                <option value="Administrador" >Administrador</option>
                                                <option value="Gestor de operaciones" >Gestor de operaciones</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-3 estiloScroll">
                                    <table className="table table-head-fixed table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Usuario</th>
                                                <th>Empleado</th>
                                                <th>Estado</th>
                                                <th>Genero</th>
                                                <th>Nivel de Usuario</th>
                                                <th>Tipo de Documento</th>
                                                <th>Nro de Documento</th>
                                                <th>Fecha de Nacimiento</th>
                                                <th>Fecha de Ingreso</th>
                                            </tr>
                                        </thead>

                                        {usuariosEstado.length === 0 ? (
                                            <SinResultados columns={10}/>
                                        ) : (
                                            <tbody>
                                                {usuariosEstado.map((usuario) => (
                                                    <tr key={usuario.Login}>
                                                        <td className="project-actions text-right">
                                                            <Link
                                                                to={`./editar/${usuario.Login}`}
                                                                className="btn btn-info btn-sm">
                                                                <FontAwesomeIcon icon={faUserPen} className='pr-2' />
                                                                Editar
                                                            </Link>
                                                        </td>
                                                        <td>{usuario.Login}</td>
                                                        <td>{usuario.Nombre}</td>
                                                        <td>{usuario.Estado}</td>
                                                        <td>{usuario.Genero}</td>
                                                        <td>{usuario.Nivel}</td>
                                                        <td>{usuario.Tipo_doc}</td>
                                                        <td>{usuario.Nro_doc}</td>
                                                        <td>{usuario.Fecha_Naci}</td>
                                                        <td>{usuario.Fecha_Ingreso}</td>
                                                    </tr>
                                                ))
                                                } </tbody>
                                        )}


                                    </table>
                                </div>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=" >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< "
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

export default Usuarios;