import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const EditarProducto = (props) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const { id } = useParams();
    const [producto, setProducto] = useState([]);
    const [nomProducto, setNomProducto] = useState('');
    const [idProveedor, setIdProveedor] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [U_Medida, setU_Medida] = useState('');
    const [descontinuado, setDescontinuado] = useState('');
    const [estado, setEstado] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [stockMinimo, setStockMinimo] = useState('');

    // para los combox
    const [proveedores, setProveedores] = useState([]);
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

    function handleSelectChangeProv(event) {
        const selectedProvtId = event.target.value;
        setIdProveedor(selectedProvtId)
    }

    // consultar producto
    const fecthProducto = () => {
        const formData = new URLSearchParams();
        formData.append('codigo', id);

        fetch('https://profinal-production-2983.up.railway.app/consultar_producto.php', {
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
                console.error('Error al obtener producto:', error);
            });
    };

    const fectchProveedores = () => {
        fetch('https://profinal-production-2983.up.railway.app/listar_proveedores.php')
            .then((response) => response.json())
            .then((data) => {
                setProveedores(data);
            })
            .catch((error) => {
                console.error('Error al obtener lista de proveedores:', error);
            });
    };

    const fetchCategorias = () => {
        fetch('https://profinal-production-2983.up.railway.app/listar_categorias.php')
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

        if (nomProducto === '' || idProveedor === '' || idCategoria === '' || U_Medida === '' || stockMinimo === '') {
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

    // editar producto
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (validacionForm()) {

            const datos = JSON.parse(localStorage.getItem('datosUsuario'));
            console.log(datos)
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            console.log(usuarioActual)

            const formData = new URLSearchParams();
            formData.append('Id_pro', id);
            formData.append('Nom_pro', nomProducto);
            formData.append('Id_prv', idProveedor);
            formData.append('Id_cat', idCategoria);
            formData.append('Uni_med', U_Medida);
            formData.append('Stock_minimo', stockMinimo);           
            formData.append('Descontinuado', descontinuado);
            formData.append('Est_pro', estado);            
            formData.append('Usu_Ult_Mod', usuarioActual);

            console.log(usuarioActual, id, nomProducto)
            console.log(formData)

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch('https://profinal-production-2983.up.railway.app/update_producto.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },

                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {

                            if (data === -1) {

                                navigate('/productos')
                            }
                            if (data === -2) {
                                setMensaje("Error al registrar");
                            }

                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios del producto:', error);
                        });
                    Swal.fire('Producto editado con exito', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire('Los cambios no se guardaron', '', 'info')
                }
            })
        }

    };

    useEffect(() => {
        fectchProveedores();
        fetchCategorias();
        fecthProducto();
        console.log(producto);
    }, []);

    useEffect(() => {
        if (producto[0]) {
            const productData = producto[0];
            setNomProducto(productData.Producto);
            setIdProveedor(productData.Proveedor);
            setIdCategoria(productData.Categoria);
            setU_Medida(productData.U_Medida);
            setDescontinuado(productData.Descontinuado);
            setStockMinimo(productData.StockMinimo);
            setEstado(productData.Est_pro);
        }
    }, [producto])


    return (
        <div className="wrapper m-4">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Editar Ingrediente :</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSaveChanges} className="content mr-2 ml-2"  >
                    <div className="card card-primary">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card-body">
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

                                    {proveedores.length > 0 ? (
                                        <div className="form-group">
                                            <label htmlFor="Proveedor">Proveedor</label>
                                            <select
                                                id="Proveedor"
                                                className="form-control custom-select"
                                                name='Proveedor'
                                                value={idProveedor}
                                                onChange={(handleSelectChangeProv)}                                            >
                                                <option value=''> Seleccionar un proveedor</option>
                                                {proveedores.map((proveedor) => (
                                                    <option key={proveedor.Codigo} value={proveedor.Codigo}>
                                                        {proveedor.Contacto}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <p>Cargando Proveedores...</p>
                                    )}

                                    {categorias.length > 0 ? (
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
                                    ) : (
                                        <p>Cargando categorías...</p>
                                    )}
                                </div>
                            </div>


                            <div className="col-md-6">
                                <div className="card-body">
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
                                    </div>

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

                            <div className="col-md-12">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="inputStockMinimo">Stock Minimo</label>
                                        <input
                                            type="number"
                                            id="inputStockMinimo"
                                            className="form-control"
                                            name='StockMinimo'
                                            value={stockMinimo}
                                            onChange={(e) => setStockMinimo(e.target.value)}
                                            placeholder="Ingrese el Stock Minimo" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link to="/productos" className="btn btn-secondary">Cancelar cambios</Link>
                            <button type="submit"
                                className="btn btn-success float-right">
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditarProducto;



