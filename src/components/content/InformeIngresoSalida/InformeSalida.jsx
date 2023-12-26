import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faPrint, faCopy, faMagnifyingGlass, faFileCsv ,faFileExcel} from '@fortawesome/free-solid-svg-icons'; import SearchInput, { createFilter } from 'react-search-input';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import * as XLSX from "xlsx";
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import SinResultados from "../animacion/SinResultados";


const KEYS_TO_FILTERS = ['Proveedor', 'Producto', 'Fecha_Orden']

const InformeSalida = (props) => {
    const navigate = useNavigate();
    const [salida, setSalida] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina    


    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production.up.railway.app/listar_ordenesrealizadas.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setSalida(data);
                console.log(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al obtener lista de salida:', error);
                setLoading(true);
            }
        };
        fecthData();

    }, []);

    //Actualizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
        setCurrentPage(0);
    };

    //para filtar por proveedor en buscador:
    const filterOrden = salida.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

    //filtrado por paginacion
    const pageCount = Math.ceil(filterOrden.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0);
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentSalida = filterOrden.slice(starIndex, endIndex);

    //Exportación en EXCEL
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(salida);//datos de la tabla
        const wb = XLSX.utils.book_new();//crear una hoja vacia
        //agregar la hoja con los datos y ponerle nombre 
        XLSX.utils.book_append_sheet(wb, ws, "Salida");

        // Guardar el archivo en formato XLSX
        XLSX.writeFile(wb, "Informe_de_Salida.xlsx");
    };

    const copiarTabla = () => {
        const table = document.querySelector("table");
        const range = document.createRange();
        range.selectNode(table);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    const componentRef = useRef();
    const imprimirtabla = useReactToPrint({
        content: () => componentRef.current,
    });

    if (loading) return (
        <div className="content-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '90vh' }}>
            <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    );


    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h1 className="card-title">Salida de Ingredientes</h1>
                    </div>
                    <div className="card-body">
                        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-4 col-md-6" >
                                    <div className="dt-buttons btn-group flex-wrap margin-buttons">
                                        <button className="btn btn-secondary buttons-copy buttons-html5 " tabindex="0" aria-controls="example1" type="button"
                                            onClick={copiarTabla}>
                                            <FontAwesomeIcon icon={faCopy} className="pr-2" />
                                            <span className='text-informe-responsive'>Copiar</span>
                                        </button>
                                        <CSVLink filename={"informe_salida.csv"} data={salida} className="btn btn-secondary buttons-csv buttons-html5" tabindex="0" aria-controls="example1" type="button">
                                            <FontAwesomeIcon icon={faFileCsv} className="pr-2" />
                                            <span className='text-informe-responsive'>CSV</span>
                                        </CSVLink>
                                        <button className="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="example1" type="button"
                                            onClick={exportToExcel}>
                                            <FontAwesomeIcon icon={faFileExcel} className="pr-2" />
                                            <span className='text-informe-responsive'>Excel</span>
                                        </button>
                                        <button className="btn btn-secondary buttons-print" tabindex="0" aria-controls="example1" type="button"
                                            onClick={imprimirtabla}>
                                            <FontAwesomeIcon icon={faPrint} className="pr-2"
                                            />
                                            <span className='text-informe-responsive'>Imprimir</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-8 col-md-6">
                                    <div className="input-group" data-widget="sidebar-search">
                                        <SearchInput
                                            type="search"
                                            className='form-control custom-search'
                                            onChange={searchUpdated}
                                            placeholder="Buscar por Proveedor, Fecha de Orden o Producto..."
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 card-body table-responsive p-3 estiloScroll">
                                    <table ref={componentRef} id="example1" className="table table-head-fixed table-hover text-nowrap" aria-describedby="example1_info">
                                        <thead>
                                            <tr>
                                                <th className="sorting" >IdOrden</th>
                                                <th className="sorting" >IdProducto</th>
                                                <th className="sorting" >Empleado</th>
                                                <th className="sorting" >Producto</th>
                                                <th className="sorting" >Cantidad</th>
                                                <th className="sorting" >Proveedor</th>
                                                <th className="sorting" >Fecha Orden</th>
                                                <th className="sorting" >Usuario de Registro</th>
                                            </tr>
                                        </thead>
                                        {currentSalida.length === 0 ? (
                                            <SinResultados columns={8} />
                                        ) : (
                                            <tbody>
                                                {currentSalida.map((item, index) => (
                                                    <tr key={index} className="odd">
                                                        <td>{item.IdOrden} </td>
                                                        <td>{item.IdProducto}</td>
                                                        <td>{item.Empleado} </td>
                                                        <td>{item.Producto}</td>
                                                        <td>{item.Cantidad}</td>
                                                        <td>{item.Proveedor}</td>
                                                        <td>{item.Fecha_Orden}</td>
                                                        <td>{item.Usu_Registro}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        )}

                                    </table>
                                </div>
                            </div>
                            <div className="row">
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
            </div>
        </div>

    );
};

export default InformeSalida;