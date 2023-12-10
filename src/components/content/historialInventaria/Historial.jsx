import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPrint, faCopy,faFileCsv,
    faFileExcel,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchInput, { createFilter } from 'react-search-input';
import ReactPaginate from 'react-paginate';
import { usePDF } from 'react-to-pdf';
import '../../../index';
import * as XLSX from "xlsx";
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // estilos CSS
import SinResultados from "../animacion/SinResultados";

const KEYS_TO_FILTERS = ['Nombre']

const Historial = (props) => {
    const [inventariado, setInventariado] = useState([]);
    const [startDate, setStartDate] = useState(new Date("8-09-2023"));
    const [endDate, setendDate] = useState(new Date("11-08-2023"));
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 10; //elementos por pagina

    const { toPDF, targetRef } = usePDF({
        filename: 'page.pdf', page: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            width: '10%',
            orientation: 'landscape',
        },
        view: {
            width: '100%',
            height: '100%',
            padding: 0,
            backgroundColor: 'white',
        },
        image: {
            objectFit: 'cover',
        }
    });

    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await fetch('https://profinal-production.up.railway.app/listar_inventariado.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setInventariado(data);
                console.log(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al obtener lista de historial de inventariado:', error);
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



    const handleFechaInicioChange = (fecha) => {
        setStartDate(fecha);
    };

    const handleFechaFinChange = (fecha) => {
        setendDate(fecha);
    };

    function convertirFecha(fecha) {
        const partes = fecha.split("/");
        return new Date(partes[2], partes[1] - 1, partes[0]);
    };

    //filtrados
    let filtoentrefechas


    filtoentrefechas = inventariado.filter(function (fechas) {
        return convertirFecha(fechas.Fecha_Accion) >= startDate && convertirFecha(fechas.Fecha_Accion) <= endDate
    })


    //para filtar por proveedor en buscador:
    const filterInvetariado = filtoentrefechas.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

    //filtrado por paginacion
    const pageCount = Math.ceil(filterInvetariado.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentInventariado = filterInvetariado.slice(starIndex, endIndex);

    //Exportación en EXCEL
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(inventariado);//datos de la tabla
        const wb = XLSX.utils.book_new();//crear una hoja vacia
        //agregar la hoja con los datos y ponerle nombre 
        XLSX.utils.book_append_sheet(wb, ws, "Registro");

        // Guardar el archivo en formato XLSX
        XLSX.writeFile(wb, "Registro_de_actividad.xlsx");
    };

    // Copiar tabla
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
    )

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Historial de cambios en ingredientes</h1>
                        </div>
                    </div>
                </div>
            </section>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card ">
                                <div className="card-body">
                                    <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                        <div className="row">
                                            <div className="col-sm-12 col-md-6" >
                                                <div className="dt-buttons btn-group flex-wrap margin-buttons">
                                                    <button className="btn btn-secondary buttons-copy buttons-html5 " tabindex="0" aria-controls="example1" type="button"
                                                        onClick={copiarTabla}>
                                                        <FontAwesomeIcon icon={faCopy} className="pr-2" />
                                                        <span className='text-informe-responsive'>Copiar</span>
                                                    </button>
                                                    <CSVLink filename={"Registro_de_actividad.csv"} data={inventariado} className="btn btn-secondary buttons-csv buttons-html5" tabindex="0" aria-controls="example1" type="button">
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
                                                        <FontAwesomeIcon icon={faPrint} className="pr-2" />
                                                        <span className='text-informe-responsive'>Imprimir</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <div className="input-group" data-widget="sidebar-search">
                                                    <SearchInput
                                                        type="search"
                                                        className='form-control custom-search'
                                                        onChange={searchUpdated}
                                                        placeholder="Buscar por nombre de ingrediente ..."
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
                                            <div className="col-12 d-flex  justify-content-end pb-2 flex-wrap">
                                                <div id='filtrofechas' className='align-items-center mt-3'>
                                                    <div className='d-flex'>
                                                        <div className="form-inline mr-4 ml-4">
                                                            <label htmlFor="inputFechaReciente" className='mr-3'>Desde:</label>
                                                            <DatePicker
                                                                select={startDate}
                                                                className="form-control "
                                                                selected={startDate}
                                                                onChange={handleFechaInicioChange}
                                                                dateFormat="dd-MM-yyyy"
                                                            />
                                                        </div>

                                                        <div className="form-inline mr-4 ml-4">
                                                            <label htmlFor="inputFechaUltima" className='mr-3'>Hasta:</label>
                                                            <DatePicker
                                                                select={endDate}
                                                                className="form-control "
                                                                selected={endDate}
                                                                onChange={handleFechaFinChange}
                                                                dateFormat="dd-MM-yyyy"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 card-body table-responsive p-3 estiloScroll" ref={targetRef}>
                                                <table ref={componentRef} id="example1" className="table table-head-fixed table-hover text-nowrap" aria-describedby="example1_info">
                                                    <thead>
                                                        <tr>
                                                            <th>CodProducto</th>
                                                            <th>Producto</th>
                                                            <th>Precio Unitario</th>
                                                            <th>Stock Actual</th>
                                                            <th>Stock Minimo</th>
                                                            <th>Descontinuado</th>
                                                            <th>Estado</th>
                                                            <th>Fecha de Registro</th>
                                                            <th>Usuario Registro</th>
                                                            <th>Usuario Modificacion</th>
                                                            <th>Accion</th>
                                                            <th>Fecha de Accion</th>
                                                        </tr>
                                                    </thead>
                                                    {currentInventariado.length === 0 ? (
                                                        <SinResultados columns={12} />
                                                    ) : (
                                                        <tbody>
                                                            {currentInventariado.map((item, index) => (
                                                                <tr key={index} >
                                                                    <td>{item.CodProducto} </td>
                                                                    <td>{item.Nombre}</td>
                                                                    <td>{item.Precio_Unitario}</td>
                                                                    <td>{item.Stock_Actual}</td>
                                                                    <td>{item.Stock_Minimo}</td>
                                                                    <td>{item.Descontinuado}</td>
                                                                    <td>{item.Estado}</td>
                                                                    <td>{item.Fecha_Registro}</td>
                                                                    <td>{item.Usuario_Registro}</td>
                                                                    <td>{item.Usu_Ult_Mod}</td>
                                                                    <td>{item.Accion}</td>
                                                                    <td>{item.Fecha_Accion}</td>
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
                                                pageRangeDisplayed={2}
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
                </div>
            </div>

        </div>
    )
}
export default Historial;
