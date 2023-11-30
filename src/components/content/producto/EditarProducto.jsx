import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditarProducto = ({ productoCodigo, closeModal, actualizarProductos, productos }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    //const [idProducto, setIdProducto] = useState('');
    const [nomProducto, setNomProducto] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [U_Medida, setU_Medida] = useState('');
    const [descontinuado, setDescontinuado] = useState('');
    const [estado, setEstado] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');
    const [justificacionStockMinimo, setJustificacionStockMinimo] = useState('');

    // para los combox    
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
        setIdCategoria(selectedCattId)
    }

    // consultar producto
    const fecthProducto = () => {
        const formData = new URLSearchParams();
        formData.append('codigo', productoCodigo);

        fetch('https://profinal-production.up.railway.app/consultar_producto.php', {
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
                setNomProducto(data[0].Producto);
                setIdCategoria(data[0].Categoria);
                setU_Medida(data[0].U_Medida);
                setDescontinuado(data[0].Descontinuado);
                setStockMinimo(data[0].StockMinimo);
                setJustificacionStockMinimo(data[0].justificacion);
                setEstado(data[0].Est_pro);
            })
            .catch((error) => {
                console.error('Error al obtener producto:', error);
            });
    };

    const fetchCategorias = () => {
        fetch('https://profinal-production.up.railway.app/listar_categorias.php')
            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((error) => {
                console.error('Error al obtener lista de categorias:', error);
            });
    };

    //validaciones:
    const validacionForm = () => {
        const solo_numero = /^[0-9]+$/;

        if (nomProducto === '' || idCategoria === '' || U_Medida === ''
            || stockMinimo === '' || justificacionStockMinimo === '') {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false; // La validación falla
        } else if (!solo_numero.test(stockMinimo)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo stock mínimo solo acepta números',
            })
            console.log("error")
            return false;
        } else if (solo_numero.test(nomProducto)) {
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
        return productos.some((producto) => producto.Producto === nomProducto);
    };

    // editar producto
    const handleSaveChanges = async (e) => {
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
                console.log(datos)
                const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
                console.log(usuarioActual)

                const formData = new URLSearchParams();
                formData.append('Id_pro', productoCodigo);
                formData.append('Nom_pro', nomProducto);
                formData.append('Id_cat', idCategoria);
                formData.append('Uni_med', U_Medida);
                formData.append('Stock_minimo', stockMinimo);
                formData.append('justificacion', justificacionStockMinimo);
                formData.append('Descontinuado', descontinuado);
                formData.append('Est_pro', estado);
                formData.append('Usu_Ult_Mod', usuarioActual);

                console.log('Datos enviados en la solicitud:', {
                    Id_pro: productoCodigo,
                    Nom_pro: nomProducto,
                    Id_cat: idCategoria,
                    Uni_med: U_Medida,
                    Stock_minimo: stockMinimo,
                    Descontinuado: descontinuado,
                    Est_pro: estado,
                    Usu_Ult_Mod: usuarioActual
                });

                Swal.fire({
                    title: '¿Quieres guardar los cambios?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    denyButtonText: `Cancelar`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        fetch('https://profinal-production.up.railway.app/update_producto.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },

                            body: formData,
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
                                console.log('Error al guardar los cambios del producto:', error);
                            });
                        Swal.fire('Producto editado con exito', '', 'success')
                        closeModal()
                    } else if (result.isDenied) {
                        Swal.fire('Los cambios no se guardaron', '', 'info')
                        closeModal()
                    }
                })
            }
        }
    };

    useEffect(() => {
        fetchCategorias();
        fecthProducto();
        console.log(nomProducto)
    }, []);


    return (
        <div className="wrapper">
            <div className="content-wrapper" >
                <div
                    className="modal fade show "
                    id="modal-sm"
                    aria-modal="true"
                    role="dialog"
                    style={{ display: "block", paddingRight: "17px" }}
                >
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4>Editar Ingrediente</h4>
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

                                            <div className="col-12 ">
                                                <div className="form-group">
                                                    <label htmlFor="Producto">Nombre</label>
                                                    <input
                                                        type="text"
                                                        id="Producto"
                                                        className="form-control"
                                                        name='Producto'
                                                        value={nomProducto}
                                                        placeholder="Nombre de Producto"
                                                        onChange={(e) => setNomProducto(e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            {categorias.length > 0 ? (
                                                <div className="col-12 ">
                                                    <div className="form-group">
                                                        <label htmlFor="inputCategoria">Categoria</label>
                                                        <select
                                                            id="inputCategoria"
                                                            className="form-control custom-select"
                                                            name="Categoria"
                                                            value={idCategoria}
                                                            onChange={(handleSelectChangeCat)}
                                                        >
                                                            <option value="">Seleccionar una categoria</option>
                                                            {categorias.map((categoria) => (
                                                                <option key={categoria.Id_Cat} value={categoria.Id_Cat}>
                                                                    {categoria.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Cargando categorías...</p>
                                            )}


                                            <div className="col-12 ">
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="inputDescontinuado">Descontinuado</label>
                                                            <select
                                                                id="inputDescontinuado"
                                                                className="form-control custom-select"
                                                                name='Descontinuado'
                                                                value={descontinuado}
                                                                onChange={(e) => setDescontinuado(e.target.value)}
                                                            >
                                                                <option value="0">Disponible</option>
                                                                <option value="1">No Disponible</option>
                                                            </select>
                                                        </div></div>


                                                    <div className='col-6'>
                                                        <div className="form-group">
                                                            <label htmlFor="inputEstado">Estado</label>
                                                            <select
                                                                id="inputEstado"
                                                                className="form-control custom-select"
                                                                name='Est_pro'
                                                                value={estado}
                                                                onChange={(e) => setEstado(e.target.value)} >
                                                                <option value="0">Inactivo</option>
                                                                <option value="1">Activo</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 ">
                                                <div className='row'>
                                                    <div className="col-8 ">
                                                        <div className="form-group">
                                                            <label htmlFor="inputUnidadMedida">Unidad de Medida</label>
                                                            <select
                                                                id="inputmedida"
                                                                value={U_Medida}
                                                                className="form-control custom-select"
                                                                onChange={(e) => setU_Medida(e.target.value)}
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

                                                    <div className='col-4'>
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
                                                    <label for="inputJustificacionStockMinimo">Justificacion del Stock Minimo</label>
                                                    <textarea
                                                        type="text"
                                                        value={justificacionStockMinimo}
                                                        onChange={(e) => setJustificacionStockMinimo(e.target.value)}
                                                        id="inputJustificacionStockMinimo"
                                                        className="form-control "
                                                        placeholder="Justificacion del Stock Minimo"
                                                        style={{ backgroundColor: '#007bff', color: '#fff', height: '90px' }}

                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit"
                                            className="btn btn-success float-right">Guardar Cambios
                                        </button>

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
}

export default EditarProducto;



