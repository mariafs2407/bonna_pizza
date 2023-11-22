import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function NuevoProveedor(props) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombreContacto, SetNombreContacto] = useState('');
    const [cargoContacto, setCargoContacto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [distrito, setDistrito] = useState('');
<<<<<<< HEAD
    const [telefono, setTelefono] = useState('');
    const [ruc, SetRuc] = useState('');
    const [rucExiste, setrucExiste] = useState([]);
    const [distritocombo, setdistritocombo] = useState([]);
=======
    const [telefono, setTelefono] = useState('');   
    const [distritocombo, setdistritocombo] = useState([]);

    const [ruc, SetRuc] = useState('');
    const [rucExiste, setrucExiste] = useState([]);
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

    const opcionesCargoConacto = [
        'Gerente de ventas',
        'Asesor de ventas',
        'Administrador',
        'Gerente'
    ];

    useEffect(() => {
        leerDistritos();
<<<<<<< HEAD
    }, []);    

    useEffect(() => {
        validarRUC();
    }, []);    

    
    const validarRUC = () =>{
=======
    }, []);

    useEffect(() => {
       validarRUCBD();
    }, []);

   /* const validarRucAPI = async () => {
        try {
            const FormData = new URLSearchParams();
            FormData.append("vruc", ruc)
            const apiUrl = `https://profinal-production-2983.up.railway.app/ruc_existe.php`;

            fetch(apiUrl, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                }),
                body: FormData
            })
                .then((response) => response.json())
                .then((data) => {
                    setrucExiste(data);
                    console.log(rucExiste);
                })
        } catch (error) {
            console.error('Ruc ingresado no es válido', error);

        }
    }*/

    const validarRUCBD = () => {
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
        const FormData = new URLSearchParams();
        FormData.append("vruc", ruc)

        fetch("https://profinal-production-2983.up.railway.app/validar_ruc.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: FormData
        })
<<<<<<< HEAD
        .then((response) => response.json())
        .then((data) => {
            setrucExiste(data);
            console.log(rucExiste);
        })
=======
            .then((response) => response.json())
            .then((data) => {
                setrucExiste(data);
                console.log(rucExiste);
            })
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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

<<<<<<< HEAD
    

    //validaciones:
    const validacionForm = () => {
        const solo_letra = /^[a-zA-Z\s]+$/;
=======


    //validaciones:
    const validacionForm = async () => {
        const solo_numero = /^[0-9]+$/;
        const rucEmpiezaEn10o20 = /^(10|20)\d{9}$/;
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

        if (!nombre === '' || !apellido === '' || !nombreContacto === '' ||
            !cargoContacto === '' || !direccion === '' || !distrito === '' ||
            !telefono === '' ||
            !ruc === '') {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'Todos los campos son obligatorios',
            })
            console.log("error")
            return false;
<<<<<<< HEAD
=======
        }else if (!ruc.match(rucEmpiezaEn10o20)) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: 'El campo RUC debe comenzar con 10 o 20 y tener 11 digitos',
            })
            console.log("error")
            return false;
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
<<<<<<< HEAD
        } else if (!solo_letra.test(nombre) || !solo_letra.test(apellido)) {
=======
        } else if (solo_numero.test(nombre) || solo_numero.test(apellido)) {
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El campo solo acepta letras',
            })
            console.log("error")
            return false;
<<<<<<< HEAD
        }
        else if (rucExiste === -1) {
            Swal.fire({
                icon: 'info',
                title: 'Error de validación',
                text: ' El RUC ingresado ya se encuentra en uso',
            })            
            return false;
        }
        else {
=======
        } else {
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
            console.log("validacion exitosa")
            return true;
        }
    }


    const handleSubmit = async (e) => {
<<<<<<< HEAD
        
        e.preventDefault();        
        if (validacionForm()) {
=======
        e.preventDefault();

        const esValido = await validacionForm();

        if (esValido) {
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf

            const datos = JSON.parse(localStorage.getItem('datosUsuario'));
            console.log(datos)
            const usuarioActual = datos[0] ? datos[0].Login_Usuario : '';
            console.log(usuarioActual)

            const FormData = new URLSearchParams();
            FormData.append('Nombre', nombre);
            FormData.append('Apellido', apellido);
            FormData.append('Nom_cont', nombreContacto);
            FormData.append('RUC', ruc);
            FormData.append('Telefono', telefono)
            FormData.append('Cargo_cont', cargoContacto);
            FormData.append('Direccion', direccion);
            FormData.append('Distrito', distrito);
            FormData.append('Usu_Registro', usuarioActual);

            Swal.fire({
                title: '¿Quieres guardar los cambios?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then((result) => {

                if (result.isConfirmed) {
                    fetch('https://profinal-production-2983.up.railway.app/insert_proveedor.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: FormData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data === -1) {
                                navigate('/proveedores')
                            }
                            if (data === -2) {
<<<<<<< HEAD
                                Swal.fire("Error al registrar",'','error');
=======
                                Swal.fire("Error al registrar", '', 'error');
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                            }
                        })
                        .catch((error) => {
                            console.log('Error al guardar los cambios del proveedor: ', error);
                        });
                    Swal.fire('Proveedor registrado con exito', '', 'success')

                } else if (result.isDenied) {
                    Swal.fire('No se guardaron los cambios', '', 'info')
                }
            })
        }

    }



    return (
<<<<<<< HEAD
        <div className="wrapper m-4">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
=======
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2 mt-3 ml-2">
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                            <div className="col-sm-6">
                                <h1>Nuevo Proveedor :</h1>
                            </div>
                        </div>
                    </div>
                </section>

<<<<<<< HEAD
                <section className="content">
                    <form onSubmit={handleSubmit}  method="post">
=======
                <section className="content mr-4 ml-4">
                    <form onSubmit={handleSubmit} method="post">
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                        <div className=" container-fluid">
                            <div class="row">
                                <div className="col-12">
                                    <div className="card card-primary card-default">
                                        <div className="card-body">

                                            <div class="row ">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputName">Nombre</label>
                                                        <input type="text"
                                                            value={nombre}
                                                            onChange={(e) => setNombre(e.target.value)}
                                                            id="inputName" className="form-control"
                                                            placeholder="Nombre del Proveedor" required />

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputApellido">Apellido</label>
                                                        <input type="text"
                                                            value={apellido}
                                                            onChange={(e) => setApellido(e.target.value)}
                                                            id="inputApellido" className="form-control" placeholder="Apellido del Proveedor" required />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row ">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputRuc">Ruc</label>
                                                        <input type="text"
<<<<<<< HEAD
                                                            value={ruc}                                                            
                                                            onChange={(e) => {                                                                
                                                                const val = e.target.value;
                                                                if (/^\d*$/.test(val) && val.length <= 11) {
                                                                    SetRuc(val);                                                                    
                                                                }                                                                
=======
                                                            value={ruc}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (/^\d*$/.test(val) && val.length <= 11) {
                                                                    SetRuc(val);
                                                                    
                                                                }
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
                                                            }}
                                                            id="inputRuc" className="form-control"
                                                            placeholder="Numero de RUC"
                                                            required />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputNombreContacto">Nombre de Contacto</label>
                                                        <input type="text"
                                                            value={nombreContacto}
                                                            onChange={(e) => SetNombreContacto(e.target.value)}
                                                            id="inputNombreContacto" className="form-control" placeholder="Nombre de Contacto" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row ">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputCargoContacto">Cargo del Contacto</label>
                                                        <select class="form-control custom-select"
                                                            id="inputCargoContacto"
                                                            onChange={(e) => setCargoContacto(e.target.value)}
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
                                                        <input type="number"
                                                            value={telefono}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (/^\d*$/.test(val) && val.length <= 9) {
                                                                    setTelefono(val);
                                                                }
                                                            }}
                                                            id="inputTelefono" className="form-control"
                                                            placeholder="Ingrese su numero de telefono"
                                                            data-inputmask='"mask": "999-999-999"' data-mask required />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row ">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="inputDireccion">Direccion</label>
                                                        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} id="inputDireccion" className="form-control" placeholder="Direccion" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
<<<<<<< HEAD
                                                    <label htmlFor="inputDistrito">Distrito</label>
                                                    <select class="form-control custom-select"
                                                        value={distrito}
                                                        onChange={(e) => setDistrito(e.target.value)}
                                                        id="inputCargoContacto"
                                                        data-placeholder="Seleccione una opcion">
                                                        <option value="">Seleccionar un distrito</option>
                                                        {distritocombo.map((item) => (
                                                            <option key={item.id} value={item.nombre}>
                                                                {item.nombre}
                                                            </option>
                                                        ))}
                                                    </select>    
=======
                                                        <label htmlFor="inputDistrito">Distrito</label>
                                                        <select class="form-control custom-select"
                                                            value={distrito}
                                                            onChange={(e) => setDistrito(e.target.value)}
                                                            id="inputCargoContacto"
                                                            data-placeholder="Seleccione una opcion">
                                                            <option value="">Seleccionar un distrito</option>
                                                            {distritocombo.map((item) => (
                                                                <option key={item.id} value={item.nombre}>
                                                                    {item.nombre}
                                                                </option>
                                                            ))}
                                                        </select>
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
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
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default NuevoProveedor;



