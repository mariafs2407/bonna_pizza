import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function NuevoProducto(props) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [nombre, setNombre] = useState('');
    const [idproveedor, setIdproveedor] = useState('');
    const [idcategoria, setIdcategoria] = useState('');
    const [unidadmedida, setUnidadMedida] = useState('');
    const [nombreProductoExiste, setnombreProductoExiste] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [isValid ,setIsValid] = useState(false);

 
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

    

    function handleSelectChangeProv(event) {
        const selectedProvtId = event.target.value;
        setIdproveedor(selectedProvtId)
    }

    function handleSelectChangeCat(event) {
        const selectedCattId = event.target.value;
        setIdcategoria(selectedCattId)
    }

    useEffect(() => {
        leerProveedores();
    }, []);

    useEffect(() => {
        leerCategorias();
    }, []);

    const leerProveedores = (e) => {
        const rutaServicio = "https://profinal-production-2983.up.railway.app/listar_proveedores.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProveedores(data);
            })
    }

    const leerCategorias = (e) => {
        const rutaServicio = "https://profinal-production-2983.up.railway.app/listar_categorias.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategorias(data);
            })
    }

    const validarNombreProducto = (e) => {
        const rutaServicio = "...";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setnombreProductoExiste(data);
            })
    }

    //validaciones:
    const validacionForm = () => {
        const solo_letra = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/;
        if ( nombre === '' || idproveedor=== ''  || idcategoria=== ''  || unidadmedida=== '' ) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false; // La validación falla
        }else if (!solo_letra.test(nombre)) {
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
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

            const FormData = new URLSearchParams();
            FormData.append('Nom_pro', nombre);
            FormData.append('Id_prv', idproveedor);
            FormData.append('Id_cat', idcategoria);
            FormData.append('Uni_med', unidadmedida);
            FormData.append('Usu_registro', usuarioActual);

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {

                if (result.isConfirmed) {
                    fetch('https://profinal-production-2983.up.railway.app/insert_producto.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: FormData,
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
                            console.log('Error al guardar los cambios del proveedor: ', error);
                        });
                    Swal.fire('Producto registrado con exito', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire('Los cambios no se guardaron', '', 'info')
                }
            })
        }
    };

    return (
        <div className="wrapper m-4">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Nuevo Ingrediente :</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content mr-2 ml-2">
                    <form onSubmit={handleSubmit} method="post">
                        <div className="card card-primary">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card-body">
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

                                        <div className="form-group">
                                            <label for="inputProveedor">Proveedor</label>
                                            <select id="inputProveedor"
                                                onChange={handleSelectChangeProv}
                                                className="form-control custom-select"
                                                data-placeholder="Seleccione una opcion">
                                                <option value=''> Seleccionar un proveedor</option>
                                                {proveedores.map((proveedor) => (
                                                    <option key={proveedor.Codigo} value={proveedor.Codigo}>
                                                        {proveedor.Contacto}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="card-body">
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



                </section>
            </div>
        </div>
    );
}

export default NuevoProducto;



