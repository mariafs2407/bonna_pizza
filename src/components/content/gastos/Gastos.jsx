import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import GastosMensuales from "./GastosMensuales";
import GastosTrimestrales from "./GastosTrimestrales";

const Gastos = () => {
    const canvasRef = useRef();
    const [selectedOption, setSelectedOption] = useState("Año");
    const [loading, setLoading] = useState(true);
    const [gastos, setGastos] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://profinal-production-2983.up.railway.app/listar_gastosa%C3%B1o.php");
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const text = await response.text();

            try {
                // Intenta parsear el texto como JSON
                const data = JSON.parse(text);
                setGastos(data);
                console.log(data);
                setLoading(false);
            }
            catch (error) {
                // Si el parseo falla, muestra el texto en la consola
                console.error("Error al parsear la respuesta como JSON:", text);
            }
        } catch (error) {
            console.error("Error al obtener lista de gastos mensuales:", error);
            setLoading(true);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);


    const createChart = (canvas, config) => {
        const chart = new Chart(canvas, config);
        return chart;
    };

    useEffect(() => {
        if (!loading) {
            const data = {
                labels: gastos.map(row => row.Anio),
                datasets: [
                    {
                        label: "Egreso por año",
                        data: gastos.map(row => row.GastoAnual),
                    },
                ],
            };

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Año",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Total de Egreso",
                        },
                    },
                },
            };

            const chart = createChart(canvasRef.current, {
                type: "bar",
                data,
                options,
            });

            return () => chart.destroy();
        }
    }, [canvasRef, gastos, loading, selectedOption]);


    // cambio del select
    const handleSelectChange = (event) => {
        const selectOpcion = event.target.value;
        setSelectedOption(selectOpcion);
        console.log("selectedOption:", event.target.value);
                

    };

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-12 d-flex align-items-center justify-content-around">
                            <div className="col-sm-6">
                                <h1>Egresos de ingredientes</h1>
                            </div>
                            <div class="form-inline mr-4 mt-">
                                <label for="inputEstado" class="mr-3">Seleccionar :
                                </label>
                                <select
                                    id="input"
                                    name="gastos"
                                    class="form-control custom-select pr-4"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                >
                                    <option value="Año">Por Año</option>
                                    <option value="Trimestre">Por Trimestre</option>
                                    <option value="Mes">Por Mes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                {selectedOption === "Mes" ? (
                    <GastosMensuales /> // Renderizar GastosMensuales cuando se selecciona "Mes"
                ) : selectedOption === "Trimestre" ? (
                    <GastosTrimestrales /> // Renderizar GastosTrimestrales cuando se selecciona "Trimestre"
                ) : selectedOption === "Año" ? (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div style={{ maxHeight: "530px", minHeight: "500px" }}>
                                    <canvas ref={canvasRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div style={{ maxHeight: "530px", minHeight: "500px" }}>
                                    <canvas ref={canvasRef} />
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </section>
        </div>


    );
};

export default Gastos;
