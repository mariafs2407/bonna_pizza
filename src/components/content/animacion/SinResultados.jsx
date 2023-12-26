import React from 'react';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';


const SinResultados = ({columns}) => {
    return (
        <tbody className="no-results">
            <tr>
                <td colspan={columns} className="text-center align-middle">
                    <DotLottiePlayer className="AnimTamaño"
                        src="https://lottie.host/5cc4ed31-c967-47ab-b478-3680421b077b/O1kwPkZY1H.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '300px' }}
                    />
                    <p className="text-muted" style={{ fontWeight: 'bold' }} >¡No se encontraron resultados!</p>
                </td>
            </tr>
        </tbody>
    );
}

export default SinResultados;