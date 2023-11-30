import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

const GastosTrimestrales = (props) => {

    const canvasRef = useRef();
    const [idAnio, setIdAnio] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const [gastosT, setGastosT] = useState([]);

    const [anios, setAnios] = useState([]);

    const fetchYears = async () => {
        const rutaServicio = "https://profinal-production.up.railway.app/listar_gastosa%C3%B1o.php";
        fetch(rutaServicio)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setAnios(data);
            })
    };

    const fetchData = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('anio', idAnio);
            console.log(idAnio);

            const response = await fetch(
                "https://profinal-production.up.railway.app/consultar_gastostrimestre.php",
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
                // Intenta parsear el texto como JSON
                const data = JSON.parse(text);
                setGastosT(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                // Si el parseo falla, muestra el texto en la consola
                console.error("Error al parsear la respuesta como JSON:", text);
            }
        } catch (error) {
            console.error("Error al obtener lista de gastos mensuales:", error);
            setLoading(true);
        }
    };



    useEffect(() => {
        fetchYears();
        fetchData();
    }, [idAnio]);


    const createChart = (canvas, config) => {
        const chart = new Chart(canvas, config);
        return chart;
    };

    useEffect(() => {
        if (!loading) {
            const data = {
                labels: gastosT.map(row => `Trimestre ${row.Trimestre}`),
                datasets: [
                    {
                        label: "Egreso por trimestre",
                        data: gastosT.map(row => row.GastoTrimestral),
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
                            text: "Trimestre",
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
    }, [gastosT, loading]);


    const handleSelectCAnio = (event) => {
        const selectedAnioId = event.target.value;
        setIdAnio(selectedAnioId);
        console.log("selectedOption:", event.target.value);
    };


    if (loading) return (
        <div className="content-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '90vh' }}>
            <div class="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )

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
}

export default GastosTrimestrales;