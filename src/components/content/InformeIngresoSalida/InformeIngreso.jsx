import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint, faCopy } from '@fortawesome/free-solid-svg-icons';
import SearchInput, { createFilter } from 'react-search-input';
import ReactPaginate from 'react-paginate';
import { usePDF } from 'react-to-pdf';
import '../../../index';
import Modal from 'react-modal';
import * as XLSX from "xlsx";
import { useReactToPrint } from 'react-to-print';
import { CSVLink, CSVDownload } from "react-csv";

const KEYS_TO_FILTERS = ['Proveedor','Producto', 'Fecha_compra'];

const InformeIngreso = (props) => {
    const [ingreso, setIngreso] = useState([]);
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
                const response = await fetch('https://profinal-production-2983.up.railway.app/listar_comprasrealizadas_entregado.php');
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setIngreso(data);
                console.log(data);
                setLoading(false);

            } catch (error) {
                console.error('Error al obtener lista de ingreso:', error);
                setLoading(true);
            }
        };
        fecthData();

    }, []);

    //Actualizar campo de busqueda
    const searchUpdated = (term) => {
        setSearchTerm(term);
    }
    //para filtrar producto
    const filterIngreso = ingreso.filter(createFilter(searchTerm, KEYS_TO_FILTERS));


    //filtrado por paginacion
    const pageCount = Math.ceil(filterIngreso.length / elemntsPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
    };

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    const currentIngreso = filterIngreso.slice(starIndex, endIndex);


    //Exportación en EXCEL
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(ingreso);//datos de la tabla
        const wb = XLSX.utils.book_new();//crear una hoja vacia
        //agregar la hoja con los datos y ponerle nombre 
        XLSX.utils.book_append_sheet(wb, ws, "Ingreso");        

        // Guardar el archivo en formato XLSX
        XLSX.writeFile(wb, "Informe_de_Ingreso.xlsx");
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
    )

    return (

        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Ingreso de ingredientes</h3>
                    </div>
                    <div className="card-body">
                        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                            <div className="row">
                                <div className="col-sm-12 col-md-6" >
                                    <div className="dt-buttons btn-group flex-wrap">
                                        <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="example1" type="button"
                                            onClick={copiarTabla}>
                                            <FontAwesomeIcon icon={faCopy} className="pr-2" />
                                            <span>Copiar</span>
                                        </button>
                                        <CSVLink filename={"informe_ingreso.csv"} data={ingreso} className="btn btn-secondary buttons-csv buttons-html5" tabindex="0" aria-controls="example1" type="button">
                                            <FontAwesomeIcon icon={faDownload} className="pr-2" />
                                            <span>CSV</span>
                                        </CSVLink>
                                        <button className="btn btn-secondary buttons-excel buttons-html5" tabindex="0" aria-controls="example1" type="button"
                                            onClick={exportToExcel}>
                                            <FontAwesomeIcon icon={faDownload} className="pr-2" />
                                            <span>Excel</span>
                                        </button>                                        
                                        <button className="btn btn-secondary buttons-print" tabindex="0" aria-controls="example1" type="button"
                                        onClick={imprimirtabla}>
                                            <FontAwesomeIcon icon={faPrint} className="pr-2"/>
                                            <span>Imprimir</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group" data-widget="sidebar-search">
                                        <SearchInput
                                            type="search"
                                            className='form-control custom-search'
                                            onChange={searchUpdated}
                                            placeholder="Buscar por Proveedor,Fecha de compra o Producto..."
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary" >
                                                <i className="fas fa-search fa-fw"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 card-body table-responsive p-3 estiloScroll" ref={targetRef}>
                                    <table ref={componentRef} id="example1" className="table table-head-fixed table-hover text-nowrap" aria-describedby="example1_info">
                                        <thead>
                                            <tr>                                                
                                                <th>IdCompra</th>
                                                <th>IdProducto</th>
                                                <th>Empleado</th>
                                                <th>Producto</th>
                                                <th>Proveedor</th>
                                                <th>Fecha Lote</th>
                                                <th>Fecha Vencimiento</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Total</th>
                                                <th>Fecha de Compra</th>
                                                <th>Usr. de Registro</th>
                                                <th>Fecha de Modif.</th>
                                                <th>Usr. de Modif.</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentIngreso.map((item, index) => (
                                                <tr key={index} >
                                                    <td>{item.IdCompra} </td>
                                                    <td>{item.IdProducto}</td>
                                                    <td>{item.Empleado}</td>
                                                    <td>{item.Producto}</td>
                                                    <td>{item.Proveedor}</td>
                                                    <td>{item.Fecha_Lote}</td>
                                                    <td>{item.Fecha_Vencimiento}</td>
                                                    <td>{item.Precio}</td>
                                                    <td>{item.Cantidad}</td>
                                                    <td>{item.Total}</td>
                                                    <td>{item.Fecha_compra}</td>
                                                    <td>{item.Usu_Registro}</td>
                                                    <td>{item.Fecha_modificacion}</td>
                                                    <td>{item.Usu_Ult_Mod}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
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
            </div>

        </div>
    );
}

export default InformeIngreso;