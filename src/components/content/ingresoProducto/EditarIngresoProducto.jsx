import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditarIngresoProducto = (props) =>{
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const { id } = useParams();
    const [ingreso, setIngreso] = useState([]);
    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [mensaje, setMensaje] = useState('');

    // para los combox
    const [productos, setProductos] = useState([]);

    function handleSelectChangeProd(event) {
        const selectedProdId = event.target.value;
        setIdProducto(selectedProdId)
    }

    // consultar ingreso
    const fecthIngresoProducto = () => {
        const formData = new URLSearchParams();
        formData.append('codigo', id);

        fetch('....', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                setProducto(data);
            })
            .catch((error) => {
                console.error('Error al obtener el ingreso de producto:', error);
            });
    };

    const fectchProductos = () => {
        fetch('...')
            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
            })
            .catch((error) => {
                console.error('Error al obtener lista de productos:', error);
            });
    };

    // editar ingreso de  producto
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem('datosUsuario'));
            console.log(datos)
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            console.log(usuarioActual)

            const formData = new URLSearchParams();
            formData.append('Id', id);
            formData.append('idProducto', idProducto);
            formData.append('cantidad', cantidad);
            formData.append('precioUnitario', precioUnitario);


            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch('...', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },

                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            if (data === -1) {

                                navigate('/ingresos')
                            }
                            if (data === -2) {
                                setMensaje("Error al registrar");
                            }

                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios del ingreso de producto:', error);
                        });
                    Swal.fire('Producto editado con exito', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire('Los cambios no se guardaron', '', 'info')
                }
            })
        }
    };

    useEffect(() => {
        fectchProductos();
        fecthIngresoProducto();
        console.log(ingreso);
    }, []);

    useEffect(() => {
        if (ingreso[0]) {
            const ingresoData = ingreso[0];
            setIdProducto(ingresoData.Producto);
            setCantidad(ingresoData.cantidad);
            setPrecioUnitario(ingresoData.precioUnitario);
        }
    }, [ingreso])

    //validaciones:
    const validacionForm = () => {
        const solo_letra = /^[a-zA-Z\s]+$/;
        const solo_numero = /^[0-9]+$/;
        const numero_decimal = /^\d+(\.\d{1,2})?$/;

        if ( idProducto === '' || cantidad=== ''  || precioUnitario=== '' ) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false; // La validación falla
        }else if (!solo_numero.test(cantidad)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo stock mínimo solo acepta números',
            })            
            console.log("error")
            return false;
        } else if (!numero_decimal.test(precioUnitario)) { 
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo precio unitario solo acepta números (enteros o decimales)',
            })
            console.log("error")
            return false;
        } else {
            console.log("validacion exitosa")
            return true; // La validación es exitosa
        }
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Editar Ingreso de Producto</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-primary">
                            <div className="card-body">

                                <div className="form-group">
                                    <label for="inputProducto">Producto</label>
                                    <select id="inputProducto" className="form-control custom-select" data-placeholder="Seleccione una opcion">
                                        <option value=''> Seleccionar un Producto</option>
                                        <option ></option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label for="inputCantidad">Cantidad</label>
                                    <input type="text" 
                                    id="inputCantidad" className="form-control" 
                                    placeholder="Cantidad de Producto" />
                                </div>

                                <div className="form-group">
                                    <label for="inputPrecioUnitario">Precio Unitario</label>
                                    <input type="text" 
                                    id="inputPrecioUnitario" className="form-control" 
                                    placeholder="Ingrese de Precio Unitario" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Link to="/ingreso" className="btn btn-secondary">Cancel</Link>
                            <button type="submit"
                            className="btn btn-success float-right">
                            Guardar cambios
                            </button>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default EditarIngresoProducto;