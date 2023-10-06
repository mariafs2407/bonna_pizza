import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NuevaSalidaProducto = (props) =>{
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [mensaje, setMensaje] = useState('');

    // para los combox
    const [productos, setProductos] = useState([]);

    function handleSelectChangeProd(event) {
        const selectedProdId = event.target.value;
        setIdProducto(selectedProdId)
    }

    useEffect(() => {
        leerProductos();
    }, []);

    const leerProductos = (e) => {
        const rutaServicio = "....";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProductos(data);
            })
    };

    //validaciones:
    const validacionForm = () => {
        const solo_numero = /^[0-9]+$/;

        if ( idProducto === '' || cantidad=== ''  ) {
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
        } else {
            console.log("validacion exitosa")
            return true; // La validación es exitosa
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem('datosUsuario'));
            console.log(datos)
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            console.log(usuarioActual)

            const FormData = new URLSearchParams();
            FormData.append('nombre', nombreProducto);
            FormData.append('Cant', cantidad);
            FormData.append('Usu_registro', usuarioActual);

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch('....', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: FormData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                navigate('/salidas')
                            }
                            if (data === -2) {
                                setMensaje("Error al registrar");
                            }
                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios del salida de producto: ', error);
                        });
                    Swal.fire('Producto registrado con exito', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire('Los cambios no se guardaron', '', 'info')
                }
            })
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Nueva Salida de Producto</h1>
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

                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Link to="/salida" className="btn btn-secondary">Cancel</Link>
                            <button type="submit"
                            className="btn btn-success float-right">
                            Guardar
                            </button>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default NuevaSalidaProducto;