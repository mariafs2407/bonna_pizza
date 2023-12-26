import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

const GastosMensuales = (props) => {
    const canvasRef = useRef();
    const [idAnio, setIdAnio] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const [gastosM, setGastosM] = useState([]);
    const [anios, setAnios] = useState([]);

    const leerAnios = (e) => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_gastosa%C3%B1o.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAnios(data);
            })
    }

    const fetchData = async () => {

        try {
            const formData = new URLSearchParams();
            formData.append('anio', idAnio);
            console.log(idAnio);

            const response = await fetch("https://profinal-production.up.railway.app/consultar_gastosmensuales.php",
                {
                    method: 'POST',
                    body: formData
                }
            );
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const text = await response.text();

            try {                 
                const data = JSON.parse(text);
                setGastosM(data);
                console.log(data);
                setLoading(false);

            } catch (error) {

                console.error("Error al parsear la respuesta como JSON:", text);
            }

        } catch (error) {
            console.error("Error al obtener lista de gastos mensuales:", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        leerAnios();
        fetchData();
    }, [idAnio]);


    const createChart = (canvas, config) => {
        const chart = new Chart(canvas, config);
        return chart;
    };

    useEffect(() => {
        if (!loading) {
            const data = {
                labels: gastosM.map(row => `Mes ${row.Mes}`),
                datasets: [
                    {
                        label: "Egreso por mes",
                        data: gastosM.map(row => row.GastoMensual),
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
                            text: "Mes",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Egresos",
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
    }, [gastosM, loading]);


    if (loading) return (
        <div className="content-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '90vh' }}>
            <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )

    // cambio del select
    const handleSelectCAnio = (event) => {
        const selectedAnioId = event.target.value;
        setIdAnio(selectedAnioId);
        console.log("selectedOption:", event.target.value);
    };

    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-12 d-flex align-items-center flex-end">
                    <div class="form-inline mr-4  ">
                        <label for="inputEstado" class="mr-3">Seleccionar Año:
                        </label>
                        <select
                            id="input"
                            name="Anio"
                            class="form-control custom-select pr-4"
                            value={idAnio}
                            onChange={handleSelectCAnio}
                        >
                            {anios.map((item) => (
                                <option key={item.Anio} value={item.Anio}>
                                    {item.Anio}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <div style={{ maxHeight: "530px", minHeight: "500px" }}>
                        <canvas ref={canvasRef} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GastosMensuales;