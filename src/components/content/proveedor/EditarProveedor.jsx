import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import MapView from '../usuarios/MapView';
import Modal from 'react-modal';

const EditarProveedor = (props) => {
    const navigate = useNavigate();

    const MySwal = withReactContent(Swal);

    const { id } = useParams();
    const [proveedor, setProveedor] = useState({});
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombrecontacto, setNombreContacto] = useState('');
    const [cargocontacto, setCargoContacto] = useState('');
    const [estado, setEstado] = useState('');
    const [direccion, setDireccion] = useState('');
    const [distrito, setDistrito] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [telefono, setTelefono] = useState('');
    const [ruc, setRuc] = useState('');
    const [distritocombo, setdistritocombo] = useState([]);

    const [isMapOpen, setIsMapOpen] = useState(false);
    Modal.setAppElement('#root');

    const handleOpenMap = () => {
        setIsMapOpen(true);
    };

    const handleCloseMap = () => {
        setIsMapOpen(false);
        console.log(isMapOpen)
    };

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDIPkzk4HFDFDh6luCvOUEPzp1F6pXhxaY`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.results[0].address_components);
                const addressComponents = data.results[0].address_components;
                const districtComponent = addressComponents.find(component => component.types.includes('administrative_area_level_2'));
                const district = districtComponent ? districtComponent.long_name : '';
                setDireccion(data.results[0].formatted_address);
                setDistrito(district);
            })
            .catch(error => console.error(error));

        handleCloseMap();
    };

    const opcionesCargoConacto = [
        'Gerente de ventas',
        'Asesor de ventas',
        'Administrador',
        'Gerente'
    ];
    const leerDistritos = () => {
        const rutaServicio = "https://651ed0d944a3a8aa47690e4c.mockapi.io/bonnapizza/distritos/distritos-lima";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setdistritocombo(data);
            });
    };

    function handleSelectChangeEst(event) {
        const selectedEstado = event.target.value;
        setEstado(selectedEstado)
    }

    //consultar proveedor
    const fecthProveedor = () => {
        const formData = new URLSearchParams();
        formData.append('codigo', id);
        fetch('https://profinal-production.up.railway.app/consultar_proveedor.php', {
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
                setProveedor(data)
            })
            .catch((error) => {
                console.error('Error al obtener proveedor: ', error);
            })
    };

    //validaciones:
    const validacionForm = () => {
        const solo_numero = /^[0-9]+$/;

        if (!nombre === '' || !apellido === '' || !nombrecontacto === '' ||
            !cargocontacto === '' || !direccion === '' || !distrito === '' ||
            !telefono === '' || !ruc === '') {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false;
        } else if (ruc.length !== 11) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo RUC debe tener 11 dígitos',
            })
            console.log("error")
            return false;
        } else if (telefono.length !== 9) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo Telefono debe tener 9 dígitos',
            })
            console.log("error")
            return false;
        } else if (solo_numero.test(nombre) || solo_numero.test(apellido)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo solo acepta letras',
            })
            console.log("error")
            return false;
        } else {
            console.log("validacion exitosa")
            return true;
        }
    }

    //EDITAR PROVEEDOR
    const handleSaveChanges = (e) => {
        e.preventDefault();

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem('datosUsuario'));
            console.log(datos)
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            console.log(usuarioActual)

            const formData = new URLSearchParams();
            formData.append('Id_prv', id);
            formData.append('Nombre', nombre);
            formData.append('Apellido', apellido);
            formData.append('Nom_cont', nombrecontacto);
            formData.append('Cargo_cont', cargocontacto);
            formData.append('RUC', ruc);
            formData.append('Telefono', telefono);
            formData.append('Est_prv', estado);
            formData.append('Direccion', direccion);
            formData.append('Distrito', distrito);
            formData.append('Usu_Ult_Mod', usuarioActual);


            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    fetch('https://profinal-production.up.railway.app/update_proveedor.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                navigate('/proveedores')
                            }
                            if (data === -2) {
                                setMensaje("Error al registrar");
                            }
                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios del proveedor: ', error);
                        });
                    Swal.fire('Proveedor actualizado con exito', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire('No se guardaron los cambios', '', 'info')
                }
            })
        }
    };

    useEffect(() => {
        fecthProveedor();
        leerDistritos();
        console.log(proveedor)
    }, []);

    useEffect(() => {
        if (proveedor[0]) {
            const proveedortData = proveedor[0];
            setNombre(proveedortData.Nombre);
            setApellido(proveedortData.Apellido);
            setNombreContacto(proveedortData.Contacto);
            setCargoContacto(proveedortData.Cargo);
            setEstado(proveedortData.Estado);
            setDireccion(proveedortData.Direccion);
            setDistrito(proveedortData.Distrito);
            setRuc(proveedortData.RUC);
            setTelefono(proveedortData.Telefono);
        }
    }, [proveedor])

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2 mt-3 ml-2">
                            <div className="col-sm-6 ">
                                <h1>Editar Proveedor :</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content mr-4 ml-4">
                    <form onSubmit={handleSaveChanges}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-primary">
                                    <div className="card-body">

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputName">Nombre</label>
                                                    <input
                                                        type="text"
                                                        id="inputName"
                                                        name='Nombre'
                                                        className="form-control"
                                                        value={nombre}
                                                        placeholder="Nombre del Proveedor"
                                                        onChange={(e) => setNombre(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputApellido">Apellido</label>
                                                    <input
                                                        type="text"
                                                        id="inputApellido"
                                                        name='Apellido'
                                                        value={apellido}
                                                        className="form-control"
                                                        placeholder="Apellido del Proveedor"
                                                        onChange={(e) => setApellido(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputRuc">Ruc</label>
                                                    <input
                                                        type="text"
                                                        id="inputRuc"
                                                        name='Ruc'
                                                        className="form-control"
                                                        value={ruc}
                                                        placeholder="Ingrese su numero de RUC"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (/^\d*$/.test(val) && val.length <= 11) {
                                                                setRuc(val);
                                                            }
                                                        }}
                                                        data-inputmask='"mask": "99999999999"'
                                                        data-mask
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputNombreContacto">Nombre de Contacto</label>
                                                    <input
                                                        type="text"
                                                        id="inputNombreContacto"
                                                        name='Contacto'
                                                        className="form-control"
                                                        value={nombrecontacto}
                                                        placeholder="Nombre de Contacto"
                                                        onChange={(e) => setNombreContacto(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputCargoContacto">Cargo del Contacto</label>
                                                    <select class="form-control custom-select"
                                                        value={cargocontacto}
                                                        onChange={(e) => setCargoContacto(e.target.value)}
                                                        id="inputCargoContacto"
                                                        data-placeholder="Seleccione una opcion">
                                                        <option value="">Seleccionar un Cargo del Contacto</option>
                                                        {opcionesCargoConacto.map((item) => (
                                                            <option key={item} value={item}>
                                                                {item}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputTelefono">Telefono</label>
                                                    <input
                                                        type="text"
                                                        id="inputTelefono"
                                                        name='Telefono'
                                                        className="form-control"
                                                        value={telefono}
                                                        placeholder="Ingrese su numero de telefono"
                                                        onChange={(e) => { 
                                                            const val = e.target.value;
                                                            if (/^\d*$/.test(val) && val.length <= 9) {
                                                                setTelefono(val);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="inputDireccion">Direccion</label>
                                                    <input
                                                        type="text"
                                                        name='Direccion'
                                                        id="inputDireccion"
                                                        value={direccion}
                                                        onClick={handleOpenMap}
                                                        className="form-control"
                                                        placeholder="Direccion"
                                                        onChange={(e) => setDireccion(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            {distritocombo.length > 0 ? (
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputDistrito">Distrito</label>
                                                        <select class="form-control custom-select"
                                                            value={distrito}
                                                            onChange={(e) => setDistrito(e.target.value)}
                                                            id="inputDistrito"
                                                            data-placeholder="Seleccione una opcion">
                                                            <option value="">Seleccionar un distrito</option>
                                                            {distritocombo.map((item) => (
                                                                <option key={item.id} value={item.nombre}>
                                                                    {item.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            ) : (<p>Cargando Distritos...</p>
                                            )}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="inputEstado">Estado</label>
                                                    <select
                                                        id="inputEstado"
                                                        name='Estado'
                                                        value={estado}
                                                        className="form-control custom-select"
                                                        onChange={handleSelectChangeEst}                                                  >
                                                        <option value="0">Inactivo</option>
                                                        <option value="1">Activo</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Link to="/proveedores" className="btn btn-secondary">Cancelar cambios</Link>
                                <button type="submit"
                                    className="btn btn-success float-right">
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            <Modal
                isOpen={isMapOpen}
                onRequestClose={handleCloseMap}
                contentLabel="Mapa"
                style={{
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '50%',
                        marginLeft: '10%',

                        transform: 'translate(-50%, -50%)',
                        width: '60%',
                        height: '60%',
                    },
                }}
            >
                <MapView onMapClick={handleMapClick} />
            </Modal>
        </div>
    );
}

export default EditarProveedor;