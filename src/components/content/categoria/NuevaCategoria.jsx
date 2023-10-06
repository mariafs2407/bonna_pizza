import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NuevaCategoria = (props) =>{
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');

    const validacionForm = () => {
        const solo_letra = /^[a-zA-Z\s]+$/;
        if ( nombre === '' || descripcion === '' ) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false; // La validación falla
        }else if (!solo_letra.test(nombre) || !solo_letra.test(descripcion)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo solo acepta letras',
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
            FormData.append('nombre', nombre);
            FormData.append('descripcion', descripcion);
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
                    fetch('...', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: FormData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data === -1) {
                        navigate('/categorias')
                    }
                    if (data === -2) {
                        setMensaje("Error al registrar");
                    }   
                })
                .catch((error) => {
                    console.log('Error al guardar los cambios del categoria: ', error);
                });
                Swal.fire('Producto registrado con exito', '', 'success')

                } else if (result.isDenied) {
                Swal.fire('Los cambios no se guardaron', '', 'info')
                }
            })
        }
    };

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Nueva Categoria</h1>
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
                                    <label for="inputName">Nombre</label>
                                    <input type="text" id="inputName" 
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}className="form-control" 
                                    placeholder="Nombre de la categoria" />
                                </div>
                            
                                <div className="form-group">
                                    <label for="inputDescripcion">Descripcion</label>
                                    <input type="text" id="inputUnidadMedida" 
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    className="form-control"
                                    placeholder="Descripcion de la categoria" />
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to="/categorias" className="btn btn-secondary">Cancelar cambios</Link>
                            <button type="submit" 
                            className="btn btn-success float-right">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default NuevaCategoria;