import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditarCategoria = (props) =>{
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    
    const { id } = useParams();
    const [categoria, setCategoria] = useState({});
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

    //consultar categoria
    const fecthCategoria = () => {
        const formData = new URLSearchParams();
        formData.append('codigo', id);

        fetch('...', {
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
                setCategoria(data)
            })
            .catch((error) => {
                console.error('Error al obtener categoria: ', error);
            })
    };

    //EDITAR CATEGORIA
    const handleSaveChanges = (e) => {
        e.preventDefault();

        if (validacionForm()) {

            const datos = JSON.parse(localStorage.getItem('datosUsuario'));
            const usuarioActual = datos ? datos.Login_Usuario : '';

            const formData= new URLSearchParams();
            formData.append('id',id);
            formData.append('Nombre',nombre);
            formData.append('Descripcion',descripcion);
            formData.append('Usu_Ult_Mod',usuarioActual);

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch('.....', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
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
                Swal.fire('Proveedor actualizado con exito', '', 'success')

                } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios', '', 'info')
                }
            })
        }
    };

    useEffect(() => {
        fecthCategoria();
        console.log(categoria)
    }, []);

    useEffect(() =>{
        if (categoria[0]) {
            const categoriatData = categoria[0];
            setNombre(categoriatData.Nombre);
            setDescripcion(categoriatData.Descripcion);
        }
    },[categoria])


    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Editar Categoria</h1>
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
                                    className="form-control" 
                                    value={nombre} 
                                    placeholder="Nombre de la categoria" 
                                    onChange={(e) => setNombre(e.target.value)} />
                                </div>
                            
                                <div className="form-group">
                                    <label for="inputDescripcion">Descripcion</label>
                                    <input type="text" id="inputUnidadMedida" className="form-control" 
                                    value={descripcion} 
                                    placeholder="Descripcion de la categoria" 
                                    onChange={(e) => setDescripcion(e.target.value)} />
                                </div>

                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to="/categorias" className="btn btn-secondary">Cancel</Link>
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

export default EditarCategoria;