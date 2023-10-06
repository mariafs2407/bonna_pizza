import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const KEYS_TO_FILTERS = ['nombre']

const Categorias = (props) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
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

    //Actulizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
    }

    //para filtrar categoria:
    const filterCategorias = categorias.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

    //filtrar por paginacion:
    const pageCount = Math.ceil(filterCategorias.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentCategorias = filterCategorias.slice(starIndex, endIndex);

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
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success float-left ml-4 mt-3"
                                            onClick={() => navigate('./nuevo')}>
                                            Nueva Categoria
                                        </button>
                                        <div className="form-inline float-right mr-4 mt-3">
                                            <div className="input-group" data-widget="sidebar-search">
                                                <SearchInput
                                                    type="search"
                                                    className='form-control custom-search'
                                                    onChange={searchUpdated}
                                                    placeholder="Buscar Categoria ..."
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

                                <div className="card-body">
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

export default Categorias;