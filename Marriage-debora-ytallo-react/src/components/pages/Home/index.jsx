import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import music from './music/music1.mp3';

import './styles.css';

function Home() {

    const calculateTimeLeft = () => {
        let year = new Date().getFullYear(); // ano atual

        //ano atual, mês outubro, dia 17
        let difference = +new Date(`${year}-10-17 00:00`) - +new Date();
        /*O + antes do novo objeto Date é uma forma abreviada de dizer ao JavaScript para converter o objeto para um inteiro,
          o que fornece o carimbo de data / hora Unix do objeto representado como microssegundos desde a época. */

        let timeLeft = {};

        if (difference >= 0) {
            /*Neste código, você arredonda os números do dia, horas, minutos e segundos para baixo e elimina o
             restante para obter um valor de número inteiro. Você pode então comparar a diferença para ver se ela é maior
             que 0.*/
            timeLeft = {
                dias: Math.floor(difference / (1000 * 60 * 60 * 24)) || '0',
                // h: Math.floor((difference / (1000 * 60 * 60)) % 24) || '0',
                // m: Math.floor((difference / 1000 / 60) % 60) || '0',
                // s: Math.floor((difference / 1000) % 60) || '0',
            };
        }
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    //const [year] = useState(new Date().getFullYear()); // Para usar o ano atual em vez da codificação permanente de 2020

    // ciclo de vida do componente
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
            //setYear(new Date().getFullYear()); // Para usar o ano atual em vez da codificação permanente de 2020
        }, 1000);

        //Limpar timeout se o componente for desmontado
        return () => clearTimeout(timer);
    });

    /*Depois de iterar as chaves em timeLeft, usaremos essa variável 
      para enviar um novo componente JSX com o tempo restante.*/
    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) return; // == false (null, undefined)

        /*Depois de iterar as chaves em timeLeft, você usará essa variável para enviar 
          um novo componente JSX com o tempo restante. */
        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div className="home">

            <div className="header-content">
                <div className="engaged">
                    <h1>Débora e Ytallo</h1>
                </div>
                <div className="date">
                    <h2>17/10/2020</h2>
                    <h3>Faltam:</h3>

                    {timerComponents.length ? timerComponents : <span> Chegou a hora! É hoje!!!</span>}

                </div>

            </div>

            <div className="description-content">
                <h1 className="description-title">Seja Bem Vindo(a) a nossa história</h1>

                <p className="description-main">&nbsp;&nbsp;&nbsp;Queremos compartilhar com vocês um pouco do nosso sonho: o casamento.
                Agradecemos a Deus por você fazer parte da nossa história. Somos gratos a Deus por tão grandes bençãos. A Ele a Glória para todo o sempre. Amém!</p>
                <div className="player"> 
                    <ReactAudioPlayer
                        src={music}
                        controls
                        autoPlay
                        loop
                    />
                </div>
            </div>

        </div >
    );
}

export default Home;