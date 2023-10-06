import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const IngresoProducto = () => {
    return (
        <div className="content-wrapper ">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Realizar Compra de Ingredientes</h1>
                        </div>

                    </div>
                </div>
            </section>
            {/* ingresar primero la compra */}
            <section className='content'>
                <div class="container-fluid ">
                    <div class="card card-default">
                        <div class="card-header">
                            <h3 class="card-title">Ingresar Compra :</h3>

                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div class="form-group">
                                        <label>Empleado :</label>
                                        <select class="form-control select2 select2-danger" data-dropdown-css-class="select2-danger" >
                                            <option selected="selected">Alabama</option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-6">
                                    <label>Fecha de compra :</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="far fa-calendar-alt"></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control float-right" id="reservation" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-12">
                                    <div class="card-footer">
                                        <button type="button" class="btn btn-primary float-right"><i class="fas fa-plus"></i> Agregar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
            {/* ingresar los ingredientes para el detalle de compra */}
            <section className='content'>
                <div class="container-fluid ">
                    <div class="card card-default">
                        <div class="card-header">
                            <h3 class="card-title">Ingresar Ingrediente :</h3>

                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-4">
                                    <div class="form-group">
                                        <label>Empleado :</label>
                                        <select class="form-control select2 select2-danger" data-dropdown-css-class="select2-danger" >
                                            <option selected="selected">Seleccionar ingrediente</option>
                                            <option>Tomate</option>
                                            <option>Cebolla</option>
                                            <option>Papa</option>
                                            <option>Harina</option>
                                            <option>Queso</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-12 col-sm-4">
                                    <label>Cantidad :</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="bi bi-apple"></i>
                                            </span>
                                        </div>
                                        <input type="number" class="form-control float-right" id="reservation" />
                                    </div>
                                </div>

                                <div class="col-12 col-sm-4">
                                    <label>Precio :</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <i class="bi bi-cash"></i>
                                            </span>
                                        </div>
                                        <input type="number" class="form-control float-right" id="reservation" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-12">
                                    <div class="card-footer">
                                        <button type="button" class="btn btn-primary float-right"><i class="fas fa-plus"></i> Agregar </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
            {/* tabla de ingredientes para la compra */}
            <section className='content'>
                <div class="container-fluid ">
                    <div class="card">
                        <div class="card-header ui-sortable-handle" >
                            <h3 class="card-title">
                                <i class="ion ion-clipboard mr-2"></i>
                                Detalle de Compra :
                            </h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="card-body p-0">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th >#</th>
                                            <th>Ingrediente</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>Tomate</td>
                                            <td> 20</td>
                                            <td><div class="tools">
                                                <i class="fas fa-edit"></i>
                                                <i class="fas fa-trash-o"></i>
                                            </div></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="card-footer clearfix">
                            <div className="row">
                                <div className="col-12">
                                    <Link to="/" className="btn btn-secondary">Cancelar Compra</Link>
                                    <button type="submit"
                                        className="btn btn-success float-right">
                                        Realizar Compra
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div >
    );
}

export default IngresoProducto;