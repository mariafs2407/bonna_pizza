import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './Login';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'
import AppContext from '../../App';
import logo from '../../assets/logo.png';
import '../../index';

const Login = ({ onLogin }) => {
    //const { onLogin } = useContext(AppContext);
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const [recordar, setRecordar] = useState(false);
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
    const [isUsuarioIncorrect, setIsUsuarioIncorrect] = useState(false);
    const passwordRef = React.useRef(null);
    const usuarioRef = React.useRef(null);

    const handleCheckboxChange = (event) => {
        setRecordar(event.target.checked);
    }

    const validacionForm = () => {
        if (!usuario && !clave) {
            setIsUsuarioIncorrect(true);
            setIsPasswordIncorrect(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingresa tu usuario y contraseña.',
            });
            usuarioRef.current.focus();
            passwordRef.current.focus();
            return false;
        } else if (!usuario) {
            setIsUsuarioIncorrect(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingresa tu usuario.',
            });
            usuarioRef.current.focus();
            return false;
        } else if (!clave) {
            setIsPasswordIncorrect(true);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingresa tu contraseña.',
            });
            passwordRef.current.focus();
            return false;
        } else {
            console.log("validacion exitosa");
            return true; // La validación es exitosa
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validacionForm()) {
            const FormData = new URLSearchParams();
            FormData.append('usuario', usuario);
            FormData.append('clave', clave);

            try {
                const response = await fetch('https://profinal-production.up.railway.app/inicio_sesion.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: FormData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Respuesta de la API:', data);

                    if (Array.isArray(data)) {
                        setIsPasswordIncorrect(false);
                        localStorage.setItem('datosUsuario', JSON.stringify(data))

                        if (recordar) {
                            Cookies.set('usuarioRecordado', usuario, { secure: true });
                            Cookies.set('claveRecordada', clave, { secure: true });

                            localStorage.setItem('usuarioRecordado', usuario);
                        }
                        Swal.fire({
                            icon: 'success',
                            title: '¡Inicio de sesión exitoso!',
                            text: 'Bienvenido de nuevo, ' + usuario + '!',
                        });

                        if (typeof onLogin === 'function') {
                            onLogin();
                        }
                        navigate('/');
                    } else {
                        if (data === -1) {
                            setIsUsuarioIncorrect(true);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Usuario no encontrado!',
                            });
                            usuarioRef.current.focus();
                        }
                        if (data === -2) {
                            setIsPasswordIncorrect(true);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Contraseña incorrecta!',
                            });
                            passwordRef.current.focus();
                        }
                    }

                } else {
                    console.error('Error al iniciar sesión');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        }


    };

    useEffect(() => {
        const usuarioRecordado = Cookies.get('usuarioRecordado');
        const claveRecordada = Cookies.get('claveRecordada');
        if (usuarioRecordado && claveRecordada) {
            setUsuario(usuarioRecordado);
            setClave(claveRecordada);
            setIsChecked(true);
        }
    }, []);


    return (
        <div className='login-page fondoLogin'>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="text-center">
                        <img src={logo} alt="" />
                    </div>
                    <div className="card-body">
                        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
                        <form onSubmit={handleSubmit} action="../../index3.html" method="post" >
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    ref={usuarioRef}
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className={`form-control ${isUsuarioIncorrect ? 'is-invalid' : ''}`}
                                    placeholder="Usuario" />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    value={clave}
                                    onChange={(e) => setClave(e.target.value)}
                                    className={`form-control ${isPasswordIncorrect ? 'is-invalid' : ''}`}
                                    placeholder="Contraseña" />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember"
                                            checked={recordar}
                                            onChange={handleCheckboxChange} />
                                        <label for="remember">
                                            Recordar contraseña
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <button type="submit" className="btn btn-primary btn-block">Iniciar Sesion</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;