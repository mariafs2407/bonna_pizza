<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './Categoria.css';

const EditarCategoria = ({ categoria, closeModal }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    //const { id } = useParams();
    const [idcategoria, setIdCategoria] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [estado, setEstado] = useState("");

    const validacionForm = () => {
        const solo_numero = /^[0-9]+$/;

        if (nombre === '' || descripcion === '') {
            Swal.fire({
                icon: "info",
                title: "Error de validación",
                text: "Todos los campos son obligatorios",
            });
            console.log("error");
            return false; // La validación falla
        } else if (solo_numero.test(nombre) || solo_numero.test(descripcion)) {
            Swal.fire({
                icon: "info",
                title: "Error de validación",
                text: " El campo solo acepta letras",
            });
            console.log("error");
            return false;
        } else {
            console.log("validacion exitosa");
            return true; // La validación es exitosa
        }
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
    };

    //EDITAR CATEGORIA
    const handleSaveChanges = (e) => {
        e.preventDefault();

        if (validacionForm()) {
<<<<<<< HEAD

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
=======
            const datos = JSON.parse(localStorage.getItem("datosUsuario"));
            const usuarioActual = datos ? datos.Login_Usuario : "";

            let estadoNumerico;
            if(estado === "Inactivo"){
                estadoNumerico = 0;
            }else{
                estadoNumerico = 1;
            }
            console.log("Estado antes de enviar:", estado); // Agrega esta línea
            console.log("Estado numérico antes de enviar:", estadoNumerico); // Agrega esta línea

            const formData = new URLSearchParams();
            formData.append("Id_cat", idcategoria);
            formData.append("Nom_cat", nombre);
            formData.append("Des_cat", descripcion);
            formData.append("Est_cat", estadoNumerico)
            formData.append("Usu_Ult_Mod", usuarioActual);

            Swal.fire({
                title: "¿Quieres guardar los cambios?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
<<<<<<< HEAD
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
=======
                    fetch("https://profinal-production-2983.up.railway.app/update_categoria.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                navigate("/categorias");
                            }
                            if (data === -2) {
                                Swal.fire("Error al registrar");
                            }
                        })
                        .catch((error) => {
                            console.log(
                                "Error al guardar los cambios del categoria: ",
                                error
                            );
                        });
                    Swal.fire("Categoría actualizado con exito", "", "success");
                    closeModal()
                } else if (result.isDenied) {
                    Swal.fire("No se guardaron los cambios", "", "info");
                    closeModal()
                }
            });
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
        }
    };

    useEffect(() => {
<<<<<<< HEAD
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
=======
        if (categoria) {
            setIdCategoria(categoria.Id_Cat);
            setNombre(categoria.nombre);
            setDescripcion(categoria.Des_Cat);
            setEstado(categoria.estado);
        }
    }, [categoria]);

    return (
        <div className="wrapper">
            <div class="content-wrapper" >
                <div
                    class="modal fade show "
                    id="modal-sm"
                    aria-modal="true"
                    role="dialog"
                    style={{ display: "block", paddingRight: "17px" }}
                >
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Editar Categoría</h4>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        onClick={closeModal}
                                    >
                                        <span>x</span>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={handleSaveChanges} method="post">
                                        <div className="">
                                            <div class="col-12 ">
                                                <div className="form-group">
                                                    <label for="inputName">Nombre</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="inputName"
                                                        value={nombre}
                                                        onChange={(e) => setNombre(e.target.value)}
                                                        placeholder="Nombre de Categoría"
                                                    />
                                                </div>
                                            </div>

                                            <div class="col-12 ">
                                                <div className="form-group">
                                                    <label>Descripción</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={descripcion}
                                                        onChange={(e) => setDescripcion(e.target.value)}
                                                        placeholder="Descripción de Categoría"
                                                    />
                                                </div>
                                            </div>

                                            <div class="col-12 ">
                                                <div className="form-group">
                                                    <label htmlFor="inputEstado">Estado</label>
                                                    <select
                                                        id="inputEstado"
                                                        className="form-control custom-select"
                                                        name='Est_pro'
                                                        value={estado}
                                                        onChange={(e) => setEstado(e.target.value)} >
                                                        <option value="Inactivo">Inactivo</option>
                                                        <option value="Activo">Activo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit"
                                            className="btn btn-success float-right">Guardar Cambios</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="modal-backdrop show"></div> */}
            </div>
        </div>

    );
};

export default EditarCategoria;
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
