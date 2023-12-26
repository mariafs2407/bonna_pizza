import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faPlus } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import "react-datepicker/dist/react-datepicker.css"; // estilos CSS
import MapView from './MapView';
import Modal from 'react-modal';

const EditarUsuario = (props) => {

    const navigate = useNavigate();
    const { login } = useParams();

    //usuario:  
    const [loginU, setLoginU] = useState('');
    const [contra, setContra] = useState('');
    const [nivel, setNivel] = useState('1');
    const [estado, setEstado] = useState('1');
    //empleado:
    const [idEmpleado, setIdEmpleado] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cargo, setCargo] = useState('');
    const [startDateNaci, setStartDateNaci] = useState(new Date()); // fecha seleccionada    
    const [startDateIng, setStartDateIng] = useState(new Date()); // fecha seleccionada 
    const [tipoDoc, setTipoDoc] = useState('1');
    const [nroDoc, setNroDoc] = useState('');
    const [nroDocExiste, setnroDocExiste] = useState([]);
    const [direccion, setDireccion] = useState('');
    const [distrito, setDistrito] = useState('');
    const [telefono, setTelefono] = useState('');
    const [genero, setGenero] = useState('');

    //combox:
    const [usuarioEmp, setUsuarioEmp] = useState([]);
    const [distritocombo, setdistritocombo] = useState([]);
    const [isUsuarioActive, setIsUsuarioActive] = useState(false);//boton usuario  

    const [hasVerifiedDocument, setHasVerifiedDocument] = useState(false);
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

    const validarDocBD = () => {
        const FormData = new URLSearchParams();
        FormData.append("vdoc", nroDoc)

        fetch("https://profinal-production.up.railway.app/validar_documento.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: FormData
        })
            .then((response) => response.json())
            .then((data) => {
                setnroDocExiste(data);
                console.log(nroDocExiste);
            })
    }

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

    //consultar usuario-empleado
    const fecthUsuarioEmp = () => {
        const formData = new URLSearchParams();
        formData.append('login', login);
        fetch('https://profinal-production.up.railway.app/consultar_usuarioempleado.php', {
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
                setUsuarioEmp(data)
            })
            .catch((error) => {
                console.error('Error al obtener usuario: ', error);
            })
    };

    useEffect(() => {
        leerDistritos();
        fecthUsuarioEmp();
        validarDocBD();
    }, [login]);

    useEffect(() => {
        if (usuarioEmp[0]) {
            const usuarioData = usuarioEmp[0];

            function formatoFechaIngFec(dateString) {
                if (!isNaN(Date.parse(dateString))) {
                    return new Date(dateString);
                } else {
                    console.error('Fecha no válida:', dateString);
                    return null;
                }
            }

            const fechaNac = formatoFechaIngFec(usuarioData.Fec_nac);
            const fechaIng = formatoFechaIngFec(usuarioData.Fec_ing);

            setLoginU(usuarioData.Login);
            setContra(usuarioData.Contra);
            setNivel(usuarioData.Nivel);
            setEstado(usuarioData.Estado);
            setIdEmpleado(usuarioData.idEmpleado);
            setNombre(usuarioData.Nombre);
            setApellido(usuarioData.Apellido);
            setCargo(usuarioData.Cargo);
            setStartDateNaci(fechaNac);
            setStartDateIng(fechaIng);
            setTipoDoc(usuarioData.Tipo_documento)
            setNroDoc(usuarioData.Nro_documento)
            setDireccion(usuarioData.Direccion);
            setDistrito(usuarioData.Distrito);
            setTelefono(usuarioData.Telefono);
            setGenero(usuarioData.genero)
        }
        console.log(usuarioEmp)
    }, [usuarioEmp])

    const handleUsuarioClick = () => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;
        if (contra && nivel && estado) {
            setIsUsuarioActive(true);

        } else {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Debe completar todos los campos',
            });
        }
    };

    const docTypes = {
        '1': 'LIBRETA ELECTORAL O DNI',
        '2': 'CARNET DE EXTRANJERIA',
        '3': 'PASAPORTE'
    };
    
    const checkIfDniExists = async (dni, tipoDoc) => {
        try {
            console.log('Verificando DNI:', dni);
            const response = await fetch('https://profinal-production.up.railway.app/listar_usuarios.php');
            const data = await response.json();
            console.log('Datos recibidos de la API:', data);
            console.log(data);
            console.log(data.filter(user => String(user.Nro_doc).trim() === String(dni).trim() && user.Tipo_doc === docTypes[tipoDoc]));
            const usersWithSameDni = data.filter(user => String(user.Nro_doc).trim() === String(dni).trim() && user.Tipo_doc === docTypes[tipoDoc]);
            console.log('Usuarios con el mismo nro. documento:', usersWithSameDni);
            if (usersWithSameDni.length > 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Error de validación',
                    text: `El Nro de Documento de ${docTypes[tipoDoc]} ya existe. Por favor, elige otro.`,
                });
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error('Ocurrió un error al verificar el nro. de documento:', error);
            return false;
        }
    };

    const handleDocTypeChange = async (e) => {
        await setTipoDoc(e.target.value);
        if (e.target.value === '2') {
            Swal.fire({
                title: '¿Quieres verificar tu carné de extranjería?',
                text: 'Serás redirigido a la página del gobierno para verificar tu carné de extranjería.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, verificar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open('https://sistemasdgc.rree.gob.pe/carext_consulta_webapp/', '_blank');
                    setHasVerifiedDocument(true);
                }
            });
        } else if (e.target.value === '3') {
            Swal.fire({
                title: '¿Quieres verificar tu pasaporte?',
                text: 'Serás redirigido a la página del gobierno para verificar tu pasaporte.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, verificar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open('https://sel.migraciones.gob.pe/servmig-valreg/VerificarPAS', '_blank');
                    setHasVerifiedDocument(false);
                }
            });
        }
    }

    const validacionForm = () => {
        const solo_numero = /^[0-9]+$/;
        const fechaNacimiento = new Date(startDateNaci);
        const fechaIngreso = new Date(startDateIng);
        const fechaHoy = new Date();
        const diferenciaAnios = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();

        if (nombre === '' || apellido === '' || cargo === '' || startDateNaci === ''
            || startDateIng === '' || direccion === '' || tipoDoc === '' ||
            nroDoc === '' || distrito === '' || telefono === '' || genero === '') {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false;
        } else if (solo_numero.test(nombre) || solo_numero.test(apellido)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'El campo Nombre  y Apellido solo acepta letras',
            })
            console.log("error")
            return false;
        } else if (!solo_numero.test(nroDoc) || !solo_numero.test(telefono)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'El campo Nro. Documento y Teléfono solo acepta numeros',
            })
            console.log("error")
            return false;
        } else if (telefono.length !== 9) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El Teléfono debe tener 9 dígitos',
            })
            console.log("error")
            return false;
        } else if (tipoDoc === '1' && nroDoc.length !== 8) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'El DNI debe tener 8 dígitos',
            });
            return false;
        } else if (tipoDoc === '2' && nroDoc.length !== 12) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'El Carnet de Extranjería debe tener 12 dígitos',
            });
            return false;
        } else if (tipoDoc === '3' && nroDoc.length !== 12) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'El Pasaporte debe tener 12 dígitos',
            });
            return false;
        } else if (fechaNacimiento >= fechaHoy) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'La fecha de nacimiento debe ser anterior a la fecha actual',
            });
            return false;
        } else if (fechaIngreso > fechaHoy) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'La fecha de ingreso no puede ser mayor a la fecha actual',
            });
            return false;
        } else if (diferenciaAnios < 18) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'La persona debe ser mayor de edad',
            });
            return false;
        } else {
            console.log("validacion exitosa")
            return true;
        }
    }

    //Ingresar usuario y empleado:
    const handleSaveChanges = async (e) => {
        e.preventDefault();

        function formatDate(date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            // 2023-01-01 00:00:00
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

        const fechaNacimiento = formatDate(startDateNaci);
        const fechaIngreso = formatDate(startDateIng);

        if (validacionForm()) {
            const datos = JSON.parse(localStorage.getItem("datosUsuario"));
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';

            const formData = new URLSearchParams();
            formData.append('idempleado', idEmpleado);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('cargo', cargo);
            formData.append('fecha_nac', fechaNacimiento);
            formData.append('fecha_ing', fechaIngreso);
            formData.append('direccion', direccion);
            formData.append('tipo_doc', tipoDoc);
            formData.append('num_doc', nroDoc);
            formData.append('distrito', distrito);
            formData.append('telefono', telefono);
            formData.append('login_usu', loginU);
            formData.append('password', contra);
            formData.append('nivel_usu', nivel);
            formData.append('estado', estado);
            formData.append('genero', genero);
            formData.append('usu_ult_mod', usuarioActual);

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('https://profinal-production.up.railway.app/update_usuarioempleado.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                Swal.fire('Usuario actualizado con exito', '', 'success')
                                navigate('/usuarios')
                            }
                            else {
                                Swal.fire('Error al registrar', '', 'error')
                            }
                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios:', error);
                        });
                } else if (result.isDenied) {
                    Swal.fire('Los cambios no se guardaron', '', 'info')
                }
            })
        }
    };



    return (
        <div className="content-wrapper ">
            <form onSubmit={handleSaveChanges} className="m-4">
                {/* ingresar primero el usuario */}
                <section className='content'>
                    <div className="container-fluid ">
                        <div className="card card-default">
                            <div className="card-header">
                                <h3 className="card-title">Actualizar Usuario:</h3>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <h3 className="card-title mb-4">
                                        <i className="ion ion-clipboard mr-2"></i>
                                        Usuario:
                                    </h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <label>Login:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control float-right"
                                                    id="reservation"
                                                    value={loginU}
                                                    disabled={true}
                                                    onChange={(e) => setLoginU(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-4">
                                            <label>Contraseña:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faKey} />
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control float-right"
                                                    id="reservation"
                                                    value={contra}
                                                    onChange={(e) => setContra(e.target.value)}
                                                //disabled={isUsuarioActive}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Nivel de usuario :</label>
                                                <select
                                                    className="form-control select2 select2-danger"
                                                    data-dropdown-css-className="select2-danger"
                                                    value={nivel}
                                                    onChange={(e) => setNivel(e.target.value)}
                                                >
                                                    <option value="1" >Empleado</option>
                                                    <option value="2" >Gerente</option>
                                                    <option value="3" >Administrador</option>
                                                    <option value="4">Gestor de operaciones</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Estado:</label>
                                                <select
                                                    className="form-control select2 select2-danger"
                                                    data-dropdown-css-className="select2-danger"
                                                    value={estado}
                                                    onChange={(e) => setEstado(e.target.value)}

                                                >
                                                    <option value="0" >Inactivo</option>
                                                    <option value="1" >Activo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4 mt-4">
                                            <button type="button"
                                                className="btn btn-primary float-right"
                                                disabled={!contra || !nivel || !estado}
                                                onClick={handleUsuarioClick}
                                            >
                                                <FontAwesomeIcon icon={faPlus} /> Agregar
                                            </button>
                                        </div>
                                    </div>


                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="card-footer">
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <h3 className="card-title mb-4">
                                        <i className="ion ion-clipboard mr-2"></i>
                                        Empleado
                                    </h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Nombre:</label>
                                                <input type="text" className="form-control float-right"
                                                    id="reservation"
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                    disabled={!isUsuarioActive}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Apellido:</label>
                                                <input type="text" className="form-control float-right"
                                                    id="reservation"
                                                    value={apellido}
                                                    onChange={(e) => setApellido(e.target.value)}
                                                    disabled={!isUsuarioActive}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Cargo:</label>
                                                <input type="text" className="form-control float-right"
                                                    id="reservation"
                                                    value={cargo}
                                                    onChange={(e) => setCargo(e.target.value)}
                                                    disabled={!isUsuarioActive}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div
                                                className="form-group"
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <label>Fecha de Nacimiento:</label>
                                                <DatePicker
                                                    className="form-control "
                                                    selected={startDateNaci}
                                                    disabled={!isUsuarioActive}
                                                    onChange={(date) => setStartDateNaci(date)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div
                                                className="form-group"
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <label>Fecha de Ingreso:</label>
                                                <DatePicker
                                                    className="form-control "
                                                    selected={startDateIng}
                                                    disabled={!isUsuarioActive}
                                                    onChange={(date) => setStartDateIng(date)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Tipo de documento :</label>
                                                <select
                                                    className="form-control select2 select2-danger"
                                                    data-dropdown-css-className="select2-danger"
                                                    value={tipoDoc}
                                                    onChange={handleDocTypeChange}
                                                    disabled={!isUsuarioActive}
                                                >
                                                    <option value="1" >LIBRETA ELECTORAL O DNI</option>
                                                    <option value="2" >CARNET DE EXTRANJERIA</option>
                                                    <option value="3" >PASAPORTE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Nro de documento:</label>
                                                <input type="number"
                                                    className="form-control float-right"
                                                    id="reservation"
                                                    onBlur={async () => {
                                                        //verificar solo si se cambie el numero 
                                                        if (usuarioEmp[0]?.Nro_documento !== nroDoc) {
                                                            const dniExists = await checkIfDniExists(nroDoc, tipoDoc);
                                                            
                                                        }
                                                    }}
                                                    value={nroDoc}
                                                    onChange={(e) => setNroDoc(e.target.value)}
                                                    disabled={!isUsuarioActive}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Dirección:</label>
                                                <input type="text"
                                                    id=""
                                                    value={direccion}
                                                    onChange={(e) => setDireccion(e.target.value)}
                                                    onClick={handleOpenMap}
                                                    disabled={!isUsuarioActive}
                                                    class="form-control"
                                                    placeholder="Ingrese su Direccion"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Distrito:</label>
                                                <select class="form-control custom-select"
                                                    value={distrito}
                                                    onChange={(e) => setDistrito(e.target.value)}
                                                    id="inputCargoContacto"
                                                    data-placeholder="Seleccione una opcion"
                                                    disabled={!isUsuarioActive}
                                                >
                                                    <option value="">Seleccionar un distrito</option>
                                                    {distritocombo.map((item) => (
                                                        <option key={item.id} value={item.nombre}>
                                                            {item.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Telefono:</label>
                                                <input type="number" className="form-control float-right"
                                                    id="reservation"
                                                    value={telefono}
                                                    onChange={(e) => setTelefono(e.target.value)}
                                                    disabled={!isUsuarioActive}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <label>Genero:</label>
                                                <select class="form-control custom-select"
                                                    id="inputGenero"
                                                    value={genero}
                                                    onChange={(e) => setGenero(e.target.value)}
                                                    data-placeholder="Seleccione una opcion"
                                                    disabled={!isUsuarioActive}
                                                >
                                                    <option value="">Seleccionar un Genero</option>
                                                    <option value="0">Masculino</option>
                                                    <option value="1">Femenino</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="card-footer clearfix">
                                <div className="row">
                                    <div className="col-12">
                                        <Link to="/usuarios" className="btn btn-secondary">Regresar</Link>
                                        <button type="submit"
                                            className="btn btn-success float-right"
                                            onClick={handleSaveChanges}
                                            disabled={!isUsuarioActive}
                                        >
                                            Actualizar Usuario
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
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
        </div >
    );
}

export default EditarUsuario;