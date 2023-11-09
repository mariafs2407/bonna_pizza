import React, { useState } from 'react';
import InformeIngreso from './InformeIngreso';
import InformeSalida from './InformeSalida';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


const InformeIngSal = (props) => {
    const [mostrarSalida, setMostrarSalida] = useState(false);

    const handleClick = () => {
        setMostrarSalida(!mostrarSalida);
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Informe de Ingredientes</h1>
                        </div>

                        <div className="col-md-3 col-sm-6 col-12" onClick={handleClick}>
                            <div className="info-box">
                                <span className="info-box-icon bg-info">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <div className="info-box-content">
                                    <span className="info-box-text">{mostrarSalida ? 'Ingreso' : 'Salida'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    {mostrarSalida ? <InformeSalida /> : <InformeIngreso />}
                </div>
            </section>
        </div>
    );
}

export default InformeIngSal;