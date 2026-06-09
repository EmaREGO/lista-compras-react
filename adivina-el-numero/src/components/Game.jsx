// Logica de negocio, 

import { useState } from "react";
import InputNumber from "./InputNumber";
import Message from "./Message";
import RestartButton from "./RestarButton";

// Funcion para generar numero
const GenerarNumAleatorio = () => Math.floor(Math.random() * 100 ) + 1;
function Game() {
    const [numeroSecreto, setNumeroSecreto] = useState(() => GenerarNumAleatorio());
    const [mensaje, setMensaje] = useState('');
    const [haGanado, setHaGanado] = useState(false);
    const [intentos, setIntentos] = useState(0);

    const procesarIntento = (numeroUsuario) => {
        const nuevoIntentoCount = intentos + 1;
        setIntentos(nuevoIntentoCount);

        if (numeroUsuario === numeroSecreto) {
            setMensaje(`Acertaste en ${nuevoIntentoCount} intentos. El número era ${numeroSecreto}.`);
            setHaGanado(true);
        } else if (numeroUsuario < numeroSecreto) {
            setMensaje('El número secreto es MAYOR.');
        } else {
            setMensaje('El número secreto es MENOR.');
        }
    };

    const reiniciarJuego = () => {
        setNumeroSecreto(GenerarNumAleatorio());
        setMensaje('');
        setHaGanado(false);
        setIntentos(0);
    };

    return (
        <div className="contador-box">
            <h1>Adivina el Número</h1>
            <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '20px' }}>
            Se ha generado un número entre 1 y 100.
            </p>

            {/* Composición de componentes con paso de Props y Estados */}
            <InputNumber onAdivinar={procesarIntento} desactivado={haGanado} />
        
            <Message texto={mensaje} haGanado={haGanado} />

            {intentos > 0 && !haGanado && (
                <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '10px' }}>
                Número de intentos: <span style={{ color: '#61dafb', fontWeight: 'bold' }}>{intentos}</span>
                </p>
            )}

            <RestartButton onReiniciar={reiniciarJuego} visible={haGanado} />
        </div>
    );
}

export default Game;