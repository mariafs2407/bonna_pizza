import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import './compra.css';
import '../../../index';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // estilos CSS

const Compras = (props) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date("8-09-2023"));
    const [endDate, setendDate] = useState(new Date("11-08-2023"));
    const [loading, setLoading] = useState(true);
    
    const [currentPage, setCurrentPage] = useState(0);
    const elemntsPage = 8; //elementos por pagina 

    const [modalIsOpen, setModalIsOpen] = useState(false); // estado para el modal
    const [estadoEditado, setEstadoEditado] = useState(""); // estado que se está editando
    const [fechaLoteEditado, setFechaLoteEditado] = useState(new Date());
    const [fechaVencimientoEditado, setFechaVencimientoEditado] = useState(new Date());
    const [compraEditada, setCompraEditada] = useState(null);
    const [compras, setCompras] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('reciente'); //FILTRADO POR ESTADO

    //nuevo
    Modal.setAppElement('#root');
    const [IdCompra, setIdCompra] = useState("");

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Cuando cambies el estado de una compra a 'Entregado', actualiza el estado alerta en el LocalStorage:
    if (estadoEditado === 'Entregado') {

    }

    const pageCount = Math.ceil(compras.length / elemntsPage);

    const fecthData = async () => {
        try {
            const response = await fetch('https://profinal-production.up.railway.app/listar_comprasrealizadas.php');
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setCompras(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener lista de Proveedores:', error);
            setLoading(true);
        }
    };

    useEffect(() => {
        fecthData();
    }, []);


    const handleEditarClick = (compra) => {
        setCompraEditada(compra);
        setModalIsOpen(true);
    };

    const handleGuardarCambiosClick = () => {
        setCompras(compras.map((compra) => {
            if (compra.id === compraEditada.id) {
                return {  ...compra,
                    estado: estadoEditado,
                    fecha_lote: fechaLoteEditado,
                    fecha_vencimiento: fechaVencimientoEditado
                };
                
            }
            return compra;
        }));
        fecthData()
        setModalIsOpen(false);
    };

    

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected)
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
    let fechasfiltradas2
    let filtoentrefechas

    fechasfiltradas2 = compras.sort((a, b) => {
        const fechaA = convertirFecha(a.fecha_compra);
        const fechaB = convertirFecha(b.fecha_compra)

        if (estadoSeleccionado === "reciente") {
            return fechaB - fechaA;
        } else {
            return fechaA - fechaB;
        }
    });

    const starIndex = currentPage * elemntsPage;
    const endIndex = starIndex + elemntsPage;
    
    filtoentrefechas = fechasfiltradas2.filter(function(fechas){
        return convertirFecha(fechas.fecha_compra) >= startDate && convertirFecha(fechas.fecha_compra) <= endDate
    })

    const currentCompras = filtoentrefechas.slice(starIndex, endIndex);

    

    const validacionForm = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if(fechaLoteEditado >= today){
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'La fecha del lote debe ser menor a la fecha actual',
            })
            console.log("error")
            return false; // La validación falla
        }else if(today >= fechaVencimientoEditado){
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'La fecha de vencimiento debe ser mayor a la fecha actual',
            })
            console.log("error")
            return false; // La validación falla
        }else if(estadoEditado === "Pendiente"){
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Selección de estado no válida',
            })
            console.log("error")
            return false; // La validación falla
        }else{
            console.log("validacion exitosa")            
            return true; // La validación es exitosa
        }
    }

    //editar estado de compra
    const handleSaveChanges = (e) => {
        e.preventDefault();
        handleGuardarCambiosClick();
        function formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            
            //2023-10-15 
            return `${year}-${month}-${day}`;
        }

        const fechaLoteFormateada = formatDate(fechaLoteEditado);
        const fechaVenciFormateada = formatDate(fechaVencimientoEditado);

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem("datosUsuario"));
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            console.log(compraEditada.IdCompra);
            console.log("fechaLoteEditado : ", fechaLoteFormateada);
            console.log("fechaVencimientoEditado : ", fechaVenciFormateada);

            let estadoNumerico;
            if (estadoEditado === "Pendiente") {
                estadoNumerico = 0;
            } else {
                estadoNumerico = 1;
            }

            const formData = new URLSearchParams();
            formData.append("idcompra", compraEditada.IdCompra);
            formData.append("estado_ingreso", estadoNumerico);
            formData.append("Usu_registro", usuarioActual);
            formData.append("fecha_lote", fechaLoteFormateada);
            formData.append("fecha_vencimiento", fechaVenciFormateada);

            Swal.fire({
                title: "¿Quieres guardar los cambios?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                denyButtonText: `Cancelar`,
            }).then((result) => {

                if (result.isConfirmed) {                  

                    fetch("https://profinal-production.up.railway.app/update_comprarealizada_estado.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                Swal.fire('Se guargo los cambios', '', 'success')
                                fecthData();
                                localStorage.setItem('alerta', 'true');
                            }
                            if (data === -2) {
                                Swal.fire("Error al registrar");
                            }
                        })
                        .catch((error) => {
                            console.log(
                                "Error al guardar los cambios de compra: ",
                                error
                            );
                        });
                    Swal.fire("Compra actualizada con exito", "", "success");
                    closeModal()
                } else if (result.isDenied) {
                    Swal.fire("No se guardaron los cambios", "", "info");
                    closeModal()
                }
            });
        }
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
                            <h1>Lista de Compras :</h1>
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
                                        <button type="submit"
                                            className="btn btn-success ml-4 mt-3"
                                            onClick={() => navigate('./ingresoProducto')}>
                                            <FontAwesomeIcon className='mr-2' icon={faShareFromSquare} style={{ color: "#fff", }} />
                                            Realizar Compra
                                        </button>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 d-flex  justify-content-between pb-2">
                                        <div className="form-inline mr-4 mt-4 ml-4">
                                            <label htmlFor="inputEstado" className='mr-3'>Filtrar por:</label>
                                            <select
                                                onChange={(e) => setEstadoSeleccionado(e.target.value)}
                                                id="inputEstado"
                                                className="form-control custom-select pr-4">
                                                <option value="reciente">Mas reciente</option>
                                                <option value="antiguo">Mas antiguo</option>
                                            </select>
                                        </div>

                                        <div id='filtrofechas' className='align-items-center mt-3'>
                                            <h6 class="text-center fw-bold">Filtrar por fechas:</h6>
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

                                <div className="card-body table-responsive p-3 estiloScroll" >
                                    <table className="table table-head-fixed table-hover text-nowrap" >
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Estado de compra</th>
                                                <th>Codigo de compra</th>
                                                <th>Fecha de compra</th>
                                                <th>Usuario de registro</th>
                                                <th>Nombre de empleado</th>
                                                <th>Cargo de empleado</th>
                                                <th>Productos comprados</th>
                                                <th>Total de Productos</th>
                                                <th>Precio Total </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentCompras.map((compra) => (
                                                <tr key={compra.IdCompra}>
                                                    <td className="project-actions text-right">
                                                        <button
                                                            className="btn btn-info btn-sm"
                                                            onClick={() => handleEditarClick(compra)}
                                                            disabled={compra.Estado === 'Entregado'}
                                                        >
                                                            <i className="fas fa-pencil-alt pr-2"></i>
                                                            Editar
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <span className={`rounded-circle badge fs-4 mr-1 p-0  ${compra.Estado === 'Entregado' ? 'badge-success' : 'badge-warning'}`}>
                                                            <i class="bi bi-circle"></i>
                                                        </span>
                                                        {compra.Estado}
                                                    </td>
                                                    <td>{compra.IdCompra}</td>
                                                    <td>{compra.fecha_compra}</td>
                                                    <td>{compra.Usu_Registro}</td>
                                                    <td>{compra.NomEmpleado}</td>
                                                    <td>{compra.cargoEmpleado}</td>
                                                    <td>{compra.NomProductos}</td>
                                                    <td>{compra.total_de_productos}</td>
                                                    <td>{compra.precio_total_compra}</td>
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
            </section >

            <Modal isOpen={modalIsOpen} className="modal-dialog">
                <div className="modal-content"
                    style={{
                        backgroundColor: 'white',
                        maxWidth: '500px',
                        margin: '0 auto',
                        padding: '16px', marginTop: '28px', borderRadius: '15px'
                    }}>
                    <div className="modal-header" style={{ padding: '16px' }}>
                        <h5 className="modal-title"
                            style={{ fontSize: 'calc(1.275rem + .3vw)' }}
                        >
                            Editar Ingrediente
                        </h5>
                        <button type="button" className="close" onClick={() => setModalIsOpen(false)}>
                            <span>×</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ padding: '16px' }}>
                        <form onSubmit={handleSaveChanges} method="post">
                            <div className="form-group">
                                <label>Estado:</label>
                                <select class="form-control select2 select2-danger"
                                    value={estadoEditado}
                                    onChange={(e) => setEstadoEditado(e.target.value)}                                    
                                >
                                    <option value='Entregado' >Entregado</option>
                                    <option value='Pendiente' >Pendiente</option>
                                </select>
                            </div>
                            <div className="form-group"
                                style={{ display: "flex", flexDirection: "column" }}>
                                <label>Fecha de lote:</label>
                                <DatePicker
                                    className="form-control "
                                    selected={fechaLoteEditado}
                                    onChange={(date) => setFechaLoteEditado(date)}
                                />
                            </div>
                            <div className="form-group"
                                style={{ display: "flex", flexDirection: "column" }}>
                                <label>Fecha de vencimiento:</label>
                                <DatePicker
                                    className="form-control "
                                    selected={fechaVencimientoEditado}
                                    onChange={(date) =>  setFechaVencimientoEditado(date)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit"
                            className="btn btn-success"
                            onClick={handleSaveChanges}
                        >
                            Guardar Cambios</button>
                    </div>
                </div>
            </Modal>

        </div >
    );
}

export default Compras;