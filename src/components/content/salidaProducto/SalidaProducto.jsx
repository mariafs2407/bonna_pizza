import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import "react-datepicker/dist/react-datepicker.css"; // estilos CSS
import Modal from 'react-modal';

const SalidaProducto = (props) => {
    const [idEmpleado, setIdEmpleado] = useState(""); // idempleado 
    const [startDate, setStartDate] = useState(new Date()); // fecha seleccionada
    const [idIngrediente, setIdIngrediente] = useState(""); // idproducto 
    const [cantidad, setCantidad] = useState(""); // cantidad 

    const [isOrdenActive, setIsOrdenActive] = useState(false); // estado del primer botón
    const [isIngredienteActive, setIsIngredienteActive] = useState(false);// estado del segundo botón
    const [isGuardarActive, setIsGuardarActive] = useState(false); // estado del tercer botón
    const [tabla, setTabla] = useState([]); // estado para la tabla

    const [modalIsOpen, setModalIsOpen] = useState(false); // estado para el modal
    const [ingredienteEditado, setIngredienteEditado] = useState(""); // ingrediente que se está editando
    const [cantidadEditada, setCantidadEditada] = useState(""); // cantidad que se está editando

    //combo
    const [productos, setProductos] = useState([]);
    const [empleados, setEmpleados] = useState([]);

    const datos = JSON.parse(localStorage.getItem("datosUsuario"));

    function handleSelectChangePrd(event) {
        const selectedProdId = event.target.value;
        setIdIngrediente(selectedProdId)
    }

    //combox
    const leerEmpleados = (e) => {
        const rutaServicio = "https://profinal-production-2983.up.railway.app/listar_empleados.php ";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setEmpleados(data);
            })
    }

    const leerProductos = (e) => {
        const rutaServicio = "https://profinal-production-2983.up.railway.app/listar_productos_combo.php ";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProductos(data);
            })
    }

    useEffect(() => {
        leerEmpleados();
        leerProductos();
    }, []);


    const resetForm = () => {
        setIdEmpleado("");
        setStartDate(new Date());
        setIdIngrediente("");
        setCantidad("");
        setIsOrdenActive(false);
        setIsIngredienteActive(false);
        setIsGuardarActive(false);
        setTabla([]);
        setModalIsOpen(false);
        setIngredienteEditado("");
        setCantidadEditada("");
    };

    const handleOrdenClick = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (startDate && startDate >= today) {
            setIsOrdenActive(true);
            setIsIngredienteActive(true); // activa el combo de ingrediente y cantidad
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Debe seleccionar un empleado y una fecha válida (hoy o una fecha futura)',
            });
        }
    };

    //Nombre del producto seleccionado para la tabla:
    const nombreIngrediente = (idIngrediente) => {
        const nombres = {};

        productos.forEach((producto) => {
            nombres[producto.Codigo] = producto.Producto;
        });

        return nombres[idIngrediente] || 'Nombre no encontrado';
    };

    

    // manejo del modal detalle orden:
    const handleIngredienteClick = () => {
        const solo_numero = /^[0-9]+$/;

        if (idIngrediente && cantidad && solo_numero.test(cantidad) && parseInt(cantidad) > 0) {
            //verificar si el producto seleccionado ya exista en la tabla
            const existeIngrediente = tabla.findIndex(item => item.idIngrediente === idIngrediente);
            if (existeIngrediente !== -1) {
                const updatedTabla = [...tabla];
                updatedTabla[existeIngrediente].cantidad = (parseInt(updatedTabla[existeIngrediente].cantidad) + parseInt(cantidad)).toString();
                setTabla(updatedTabla);

            } else {
                // Agrega los datos a la tabla...
                setTabla([...tabla, { idIngrediente, cantidad }]);
            }
            setIdIngrediente("");
            setCantidad("");
            setIsGuardarActive(true); // activa el botón de guardar
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Debe seleccionar un ingrediente y una cantidad válida',
            });
        }
    };

    const handleEliminarClick = (index, event) => {
        event.preventDefault(); // Evita que se recargue la página

        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Quieres eliminar este ingrediente de la tabla?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setTabla(tabla.filter((fila, i) => i !== index)); // Elimina la fila de la tabla
                Swal.fire(
                    'Eliminado',
                    'El ingrediente ha sido eliminado.',
                    'success'
                )
            }
        })
    };

    const handleEditarClick = (idIngrediente, cantidad, event) => {
        event.preventDefault();
        setIngredienteEditado(idIngrediente);
        setCantidadEditada(cantidad);
        setModalIsOpen(true);
    };

    const handleGuardarClick = () => {
        // Encuentra el índice del ingrediente que se está editando en la tabla
        const index = tabla.findIndex(fila => fila.idIngrediente === ingredienteEditado);

        if (index !== -1) {
            // actualiza la cantidad
            const nuevaTabla = [...tabla];
            nuevaTabla[index].cantidad = cantidadEditada;
            setTabla(nuevaTabla);
        }

        // Cierra el modal
        setModalIsOpen(false);

    };

    //validaciones:
    const validacionForm = () => {

        if (tabla.length == 0) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Agrege datos al detalle de compra',
            })
            console.log("error")
            return false;
        } else {
            console.log("validacion exitosa")
            return true; // La validación es exitosa
        }
    }

    const getNombreEmpleado = (login) => {
        const empleado = empleados.find((empleado) => empleado.Login === login);
        if (empleado) {
            return `${empleado.Nomyape}`;
        }
        return "Empleado no encontrado";
    };

    const getIdEmpleado = (login) => {
        const empleado = empleados.find((empleado) => empleado.Login === login);
        if (empleado) {
            return `${empleado.Codigo}`;
        }
        return "Empleado no encontrado";
    };

    useEffect(() => {
        if (isOrdenActive) {
            const datos = JSON.parse(localStorage.getItem("datosUsuario"));
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            const empleadoId = getIdEmpleado(usuarioActual);
            console.log("idEmpleado: " + empleadoId);
            setIdEmpleado(empleadoId);
        }
    }, [isOrdenActive]);

    //Ingresar Orden y detalle de orden :
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        //transformación de formato fecha:
        function formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            //2023-10-15 01:08:23
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        console.log(startDate)
        //transformación de la tabla
        const detalles = tabla.map(item => ({
            id_producto: item.idIngrediente,
            cantidad: parseInt(item.cantidad)
        }));

        const fechaFormateada = formatDate(startDate);
        const jsonDetalle = JSON.stringify(detalles);

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem("datosUsuario"));
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

            console.log("idEmpleado: " + idEmpleado)

            const formData = new URLSearchParams();
            formData.append('idempleado', idEmpleado);
            formData.append('fecha', fechaFormateada);
            formData.append('detalles', jsonDetalle);
            formData.append('Usu_registro', usuarioActual);

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('https://profinal-production-2983.up.railway.app/insert_ordencondetalle2.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                Swal.fire('Orden guardada con exito', '', 'success')
                                resetForm()
                            }
                            else {
                                Swal.fire('Error al registrar', '', 'error')
                            }
                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios:', error);
                        });
                } else if (result.isDenied) {
                    Swal.fire('Los cambios no se guardaron', '', 'info')
                    console.log(idEmpleado);
                    console.log(fechaFormateada);
                    console.log(jsonDetalle);
                    console.log(usuarioActual);
                }
            })
        }
    };

    return (
        <div className="content-wrapper ">

            <form onSubmit={handleSaveChanges} className="m-4">
                <section className="content">
                    <div className="container-fluid ">
                        <div className="card card-default">
                            <div className="card-header">
                                <h3 className="card-title">Realizar Orden de Ingredientes</h3>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <h3 className="card-title mb-4">
                                        <i className="ion ion-clipboard mr-2"></i>
                                        Ingresar Orden
                                    </h3>
                                    <div className="col-12 col-sm-4">

                                        {empleados.length > 0 ? (
                                            <div className="form-group">
                                                <label>Empleado :</label>
                                                <select
                                                    className="form-control select2 select2-danger"
                                                    data-dropdown-css-className="select2-danger"
                                                    value={idEmpleado}
                                                    disabled={true}
                                                >
                                                    {datos.map((item) => (
                                                        <option key={item.Login_Usuario}>
                                                            {getNombreEmpleado(item.Login_Usuario)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ) : (
                                            <p>Cargando empleados...</p>
                                        )}

                                    </div>

                                    <div className="col-12 col-sm-4">
                                        <div
                                            className="form-group"
                                            style={{ display: "flex", flexDirection: "column" }}
                                        >
                                            <label>Fecha de Salida:</label>
                                            <DatePicker
                                                className="form-control "
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4 mt-4">
                                        <button type="button" className="btn btn-primary float-right"
                                            disabled={!startDate}
                                            onClick={handleOrdenClick}>
                                            <i className="fas fa-plus"></i> Agregar
                                        </button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card-footer"></div>
                                    </div>
                                </div>

                                <div className="row">
                                    <h3 className="card-title mb-4">
                                        <i className="ion ion-clipboard mr-2"></i>
                                        Ingresar Ingrediente
                                    </h3>
                                    <div className="col-12 col-sm-4">
                                        {productos.length > 0 ? (
                                            <div className="form-group">
                                                <label>Ingrediente :</label>
                                                <select
                                                    className="form-control select2 select2-danger"
                                                    data-dropdown-css-className="select2-danger"
                                                    value={idIngrediente}
                                                    onChange={(handleSelectChangePrd)}
                                                    disabled={!isOrdenActive}
                                                >
                                                    <option value="">Seleccionar ingrediente</option>
                                                    {productos.map((producto) => (
                                                        <option key={producto.Codigo} value={producto.Codigo}>
                                                            {producto.Producto} 
                                                        </option>
                                                    ))}

                                                </select>
                                            </div>
                                        ) : (
                                            <p>Cargando ingredientes...</p>
                                        )}

                                    </div>

                                    <div className="col-12 col-sm-4">
                                        <label>Cantidad :</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <FontAwesomeIcon icon={faBasketShopping} style={{ color: "#2c2d30", }} />
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                className="form-control float-right"
                                                id="reservation"
                                                value={cantidad}
                                                onChange={(e) => setCantidad(e.target.value)}
                                                disabled={!isOrdenActive} // desactiva el campo de cantidad hasta que se haga clic en el primer botón
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-4 mt-4">
                                        <button type="button" className="btn btn-primary float-right"
                                            disabled={!isOrdenActive || !idIngrediente || !cantidad}
                                            onClick={handleIngredienteClick}>
                                            <i className="fas fa-plus"></i> Agregar
                                        </button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card-footer"></div>
                                    </div>
                                </div>
                                <h3 className="card-title mb-4">
                                    <i className="ion ion-clipboard mr-2"></i>
                                    Detalle de Orden
                                </h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>CodIngrediente</th>
                                            <th>Ingrediente</th>                                            
                                            <th>Cantidad</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabla.map((fila, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}.</td>
                                                <td>{fila.idIngrediente}</td>
                                                <td>{nombreIngrediente(fila.idIngrediente)}</td>
                                                <td>{fila.cantidad}</td>
                                                <td>
                                                    <a className="btn btn-success"
                                                        onClick={(event) => handleEditarClick(fila.idIngrediente, fila.cantidad, event)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#d1d1d1", }} />
                                                    </a>

                                                </td>
                                                <th>
                                                    <a className="btn btn-danger"
                                                        onClick={(event) => handleEliminarClick(index, event)}>
                                                        <FontAwesomeIcon className="fas fa-users"
                                                            icon={faTrashCan} style={{ color: "#d1d1d1", }} />
                                                    </a>
                                                </th>
                                            </tr>))}
                                    </tbody>
                                </table>
                                <div className="card-footer clearfix">
                                    <div className="row">
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn btn-success float-right"
                                                disabled={!isGuardarActive} // desactiva el botón de guardar hasta que se haga clic en el segundo botón
                                                onClick={handleSaveChanges}
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>

            <Modal isOpen={modalIsOpen} className="modal-dialog">
                <div className="modal-content" style={{
                    backgroundColor: 'white', maxWidth: '500px', margin: '0 auto',
                    padding: '16px', marginTop: '28px', borderRadius: '15px'
                }}>
                    <div className="modal-header" style={{ padding: '16px' }}>
                        <h5 className="modal-title" style={{ fontSize: 'calc(1.275rem + .3vw)' }}>Editar Ingrediente</h5>
                        <button type="button" className="close" onClick={() => setModalIsOpen(false)}>
                            <span>×</span>
                        </button>
                    </div>
                    <div className="modal-body" style={{ padding: '16px' }}>
                        <form>
                            {productos.length > 0 ? (
                                <div className="form-group">
                                    <label>Ingrediente :</label>
                                    <select
                                        className="form-control select2 select2-danger"
                                        data-dropdown-css-className="select2-danger"
                                        name='Ingrediente'
                                        value={ingredienteEditado}
                                        disabled={true}
                                    >
                                        <option selected="">Seleccionar ingrediente</option>
                                        {productos.map((producto) => (
                                            <option key={producto.Codigo} value={producto.Codigo}>
                                                {producto.Producto}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            ) : (
                                <p>Cargando ingredientes...</p>
                            )}

                            {productos.length > 0 ? (
                                    <div className="form-group">
                                        <label>Ingrediente :</label>
                                        <select
                                            className="form-control select2 select2-danger"
                                            data-dropdown-css-className="select2-danger"
                                            name='Ingrediente'
                                            value={ingredienteEditado}
                                            disabled={true}
                                        >
                                            <option value="">Seleccionar ingrediente</option>
                                            {productos.map((producto) => (
                                                <option key={producto.Codigo} value={producto.Codigo}>
                                                    {producto.Proveedor}
                                                </option>
                                            ))}
                                        </select></div>
                                ) : (
                                    <p>Cargando ingredientes...</p>
                                )}
                            <div className="form-group">
                                <label>Cantidad:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={cantidadEditada}
                                    onChange={(e) => setCantidadEditada(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success"
                            onClick={handleGuardarClick}>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </Modal>




        </div>
    );
};

export default SalidaProducto;
