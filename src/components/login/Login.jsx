import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login';

function Login(props) {
    
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const FormData = new URLSearchParams();
        FormData.append('usuario', usuario);
        FormData.append('clave', clave);

        try {
            const response = await fetch('https://profinal-production-2983.up.railway.app/inicio_sesion.php', {
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
                    setMensaje("");
                    localStorage.setItem('datosUsuario', JSON.stringify(data))
                    navigate("/");                                
                } else {
                    if (data === -1) {
                        setMensaje("Usuario no encontrado");
                    }
                    if (data === -2) {
                        setMensaje("Contraseña incorrecta");
                    }
                }

            } else {
                console.error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className='login-page'>
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Bonna</b>PIZZA</a>
                    </div>
                    <div className="card-body">
                        {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
                        <form onSubmit={handleSubmit} action="../../index3.html" method="post" >                            
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    className="form-control"
                                    placeholder="Usuario" />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    value={clave}
                                    onChange={(e) => setClave(e.target.value)}
                                    className="form-control"
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
                                        <input type="checkbox" id="remember" />
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