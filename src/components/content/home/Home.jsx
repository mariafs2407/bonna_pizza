<<<<<<< HEAD
import React from 'react';

const Home = (props) =>{
    return (
        <div className='content-wrapper'>
=======
import React, { useState } from 'react';

const Home = (props) =>{
    const showAlert = localStorage.getItem('alerta') === 'true';

    const handleCloseAlert = () => {
        localStorage.setItem('alerta', 'false');
    };

    return (
        <div className='content-wrapper'>
             {showAlert && 
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Compra entregada</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" 
                    onClick={handleCloseAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
>>>>>>> 2a5a3431bd016962a35e892ea4a9c34a6abe5faf
            <div className='content-header'>
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className='m-0'>Bienvenido</h1>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* botones para producto y proveedor */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;