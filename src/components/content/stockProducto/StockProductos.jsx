import React, { useState, useEffect } from 'react';

const StockProductos = (props) => {
    const [idIngrediente, setIdIngrediente] = useState(""); // idproducto 
    const [productos, setProductos] = useState([]);
    const [stock, setStock] = useState({});
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    function handleSelectChangePrd(event) {
        const selectedProdId = event.target.value;
        setIdIngrediente(selectedProdId)
    }

    useEffect(() => {
        leerProductos();
    }, []);

    const leerProductos = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_productos_combo.php ";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProductos(data);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append('nombre', idIngrediente);
        console.log(idIngrediente);


        fetch('https://profinal-production.up.railway.app/consultar_productos_stockactual.php', {
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

                return response.text();
            })
            .then((data) => {
                console.log(data);
                setStock(JSON.parse(data)[0]);
                setMostrarFormulario(true);
            })
            .catch((error) => {
                console.error('Error al obtener producto:', error);
            });
    }

    const parseIntStockActual = parseInt(stock.Stock_Actual);
    const parseIntStockMinimo = parseInt(stock.Stock_Minimo);

    return (
        <div className="wrapper">
            <div className="content-wrapper ">
                <section className="content-header ">
                    <div className="container-fluid">
                        <h2 class="text-center display-4">Consultar Stock de Ingredientes :</h2>
                        <div class="row">
                            <div class="col-md-8 offset-md-2 mt-4 mb-5">
                                <form>
                                    {productos.length > 0 ? (
                                        <div className="input-group">
                                            <select
                                                className="form-control form-control-lg select2 select2-danger"
                                                data-dropdown-css-className="select2-danger"
                                                value={idIngrediente}
                                                onChange={(handleSelectChangePrd)}
                                            >
                                                <option value="">Seleccionar ingrediente</option>
                                                {productos.map((producto) => (
                                                    <option key={producto.Producto} value={producto.Producto}>
                                                        {producto.Producto}
                                                    </option>
                                                ))}

                                            </select>
                                            <div class="input-group-append">
                                                <button type="submit"
                                                    class="btn btn-lg btn-default"
                                                    onClick={handleSubmit}
                                                >
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Cargando ingredientes...</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="content mr-4 ml-4 ">
                    {mostrarFormulario ? (
                        <form method="post">
                            <div className="card card-primary">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="Producto">Ingrediente </label>
                                                <input
                                                    type="text"
                                                    id="Producto"
                                                    className="form-control"
                                                    name='Producto'
                                                    disabled={true}
                                                    value={stock.Nombre}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="Precio">Precio</label>
                                                <input
                                                    type="text"
                                                    id="Precio"
                                                    className="form-control"
                                                    name='Precio'
                                                    disabled={true}
                                                    value={stock.Precio}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="StockMinimo">Stock Minimo</label>
                                                <input
                                                    type="text"
                                                    id="StockMinimo"
                                                    className="form-control"
                                                    name='StockMinimo'
                                                    disabled={true}
                                                    value={stock.Stock_Minimo}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="Categoria">Categoria</label>
                                                <input
                                                    type="text"
                                                    id="Categoria"
                                                    className="form-control"
                                                    name='Categoria'
                                                    disabled={true}
                                                    value={stock.Categoria}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="UnidadMedida">Unidad de Medida</label>
                                                <input
                                                    type="text"
                                                    id="UnidadMedida"
                                                    className="form-control"
                                                    name='UnidadMedida'
                                                    disabled={true}
                                                    value={stock.Unidad_Medida}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="StockActual">Stock Actual</label>
                                                <input
                                                    type="text"
                                                    id="StockActual"
                                                    className="form-control text-white"
                                                    name='StockActual'
                                                    disabled={true}
                                                    value={stock.Stock_Actual}
                                                    style={{ backgroundColor: parseIntStockActual > parseIntStockMinimo ? '#28a745' : '#DC1D18'  }}
                                                    
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card-body pt-0">
                                            <div className="form-group">
                                                <label htmlFor="JustificacionStockMinimo">Justificacion del Stock Minimo</label>
                                                <input
                                                    type="text"
                                                    id="JustificacionStockMinimo"
                                                    className="form-control text-white"
                                                    name='JustificacionStockMinimo'
                                                    disabled={true}
                                                    value={stock.justificacionStockMinimo}
                                                    style={{ backgroundColor: '#007bff', color: '#fff' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : null}
                </section>


            </div>
        </div>
    );
}

export default StockProductos;