import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


function NuevoProducto({ closeModal, actualizarProductos, productos }) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [nombre, setNombre] = useState('');
    const [idcategoria, setIdcategoria] = useState('');
    const [unidadmedida, setUnidadMedida] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [justificacionStockMinimo, setJustificacionStockMinimo] = useState('');    

    const [categorias, setCategorias] = useState([]);
    const opcionesUnidadMedida = [
        'Litro ( l.)',
        'Mililitro ( ml.)',
        'Kilogramos (kg.)',
        'Gramos (gr.)',
        'Libra (lb.)',
        'Onza (oz.)'
    ];


    function handleSelectChangeCat(event) {
        const selectedCattId = event.target.value;
        setIdcategoria(selectedCattId)
    }

    useEffect(() => {
        leerCategorias();
    }, []);


    const leerCategorias = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_categorias.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategorias(data);
            })
    }

    //validaciones:
    const validacionForm = () => {
        const solo_letra = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;
        if (nombre === '' || idcategoria === '' || unidadmedida === '' 
            || stockMinimo === '' || justificacionStockMinimo === '') {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false; // La validación falla
        } else if (!solo_letra.test(nombre)) {
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

    const validarNombreProducto = () => {
        // Verificar si el nombre del producto ya existe en la lista actual
        return productos.some((producto) => producto.Producto === nombre);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validacionForm()) {
            if (validarNombreProducto()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre del producto ya existe',
                });
            } else {
                const datos = JSON.parse(localStorage.getItem('datosUsuario'));
                const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

                const FormData = new URLSearchParams();
                FormData.append('Nom_pro', nombre);
                FormData.append('Id_cat', idcategoria);
                FormData.append('Uni_med', unidadmedida);
                FormData.append('stock_min', stockMinimo);
                FormData.append('justificacion', justificacionStockMinimo);
                FormData.append('Usu_registro', usuarioActual);

                Swal.fire({
                    title: '¿Quieres guardar los cambios?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    denyButtonText: `Cancelar`,
                }).then((result) => {

                    if (result.isConfirmed) {
                        fetch('https://profinal-production.up.railway.app/insert_producto.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: FormData,
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then((data) => {
                                try {
                                    JSON.parse(data);
                                    const jsonData = JSON.parse(data);

                                    if (data === -1) {
                                        navigate('/productos')
                                    }
                                    if (data === -2) {
                                        Swal.fire("Error al registrar");
                                    }
                                } catch (error) {
                                    console.error('La respuesta no es JSON válido:', data);
                                }
                                actualizarProductos(); 
                            })
                            .catch((error) => {
                                console.log('Error al guardar los cambios del proveedor: ', error);
                            });
                        Swal.fire('Producto registrado con exito', '', 'success')
                        closeModal()                       
                    } else if (result.isDenied) {
                        Swal.fire('Los cambios no se guardaron', '', 'info')
                        closeModal()
                    }
                })
            }
        }
    };

    return (
        <div className="wrapper">
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
                                <h4>Nuevo Ingrediente</h4>
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
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                    id="inputName"
                                                    className="form-control"
                                                    placeholder="Nombre de Ingrediente"
                                                />

                                            </div>
                                        </div>

                                        <div class="col-12 ">
                                            <div className="form-group">
                                                <label for="inputCategoria">Categoria</label>
                                                <select id="inputCategoria"
                                                    onChange={handleSelectChangeCat}
                                                    className="form-control custom-select"
                                                    data-placeholder="Seleccione una opcion">
                                                    <option value=''> Seleccionar una categoria</option>
                                                    {categorias.map((categoria) => (
                                                        <option key={categoria.Id_Cat} value={categoria.Id_Cat}>
                                                            {categoria.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>



                                        <div className="col-12 ">
                                            <div className='row'>
                                                <div class="col-lg-8 col-sm-12 ">
                                                    <div className="form-group">
                                                        <label for="inputUnidadMedida">Unidad de Medida</label>
                                                        <select id="inputmedida"
                                                            onChange={(e) => setUnidadMedida(e.target.value)} className="form-control custom-select"

                                                            data-placeholder="Seleccione una unidad de medida">
                                                            <option value=''> Seleccionar una unidad de medida</option>
                                                            {opcionesUnidadMedida.map((item) => (
                                                                <option key={item} value={item}>
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className='col-lg-4 col-sm-12'>
                                                    <div className="form-group">
                                                        <label for="inputStockMinimo">Stock Minimo</label>
                                                        <input
                                                            type="number"
                                                            value={stockMinimo}
                                                            onChange={(e) => setStockMinimo(e.target.value)}
                                                            id="inputStockMinimo"
                                                            className="form-control"
                                                            placeholder="Stock Minimo del Ingrediente"
                                                        />

                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                        <div className='col-12'>
                                            <div className="form-group">
                                                <label for="inputCustificacionStockMinimo">Justificacion del Stock Minimo</label>
                                                <textarea
                                                    type="text"
                                                    value={justificacionStockMinimo}
                                                    onChange={(e) => setJustificacionStockMinimo(e.target.value)}
                                                    id="inputCustificacionStockMinimo"
                                                    className="form-control text-white"
                                                    placeholder="Justificacion del Stock Minimo"
                                                    style={{ backgroundColor: '#007bff', color: '#fff', height: '120px' }}
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
}

export default NuevoProducto;



