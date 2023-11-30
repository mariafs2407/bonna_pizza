import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './Categoria.css';

const NuevaCategoria = ({ closeModal }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const validacionForm = () => {
        const solo_letra = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
        const solo_numero = /^[0-9]+$/;
        if (nombre === "" || descripcion === "") {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem("datosUsuario"));
            console.log(datos);
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : "";
            console.log(usuarioActual);

            const FormData = new URLSearchParams();
            FormData.append("Nom_cat", nombre);
            FormData.append("Des_Cat", descripcion);
            FormData.append("Usu_registro", usuarioActual);

            Swal.fire({
                title: "¿Quieres guardar los cambios?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch("https://profinal-production.up.railway.app/insert_categoria.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: FormData,
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
                    Swal.fire("Categoria registrado con exito", "", "success");
                    closeModal()
                } else if (result.isDenied) {
                    Swal.fire("Los cambios no se guardaron", "", "info");
                    closeModal()
                }
            });
        }
    };

    return (
        <div class="content-wrapper">
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
                                <h4>Nueva Categoría</h4>
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
                                <form onSubmit={handleSubmit} method="post">
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
                                        
                                    </div>

                                    <button type="submit" className="btn btn-success float-right">
                                        Guardar Cambios
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             {/* <div className="modal-backdrop show"></div> */}
        </div>
    );
};

export default NuevaCategoria;
