import React from 'react';
import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

const Consultar = (props) =>{
    return (
        <div>
            <DotLottiePlayer
                        src="https://lottie.host/59c3d866-b3a0-4214-aa07-410597ff22e9/JmJo0brPdD.json"
                        autoplay
                        loop
                        style={{ width: '100%', height: '400px' }}
            />
        </div>
    );
}

export default Consultar;