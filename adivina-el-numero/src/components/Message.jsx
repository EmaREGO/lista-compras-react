function Message({ texto, haGanado }) {
    if (!texto) return null; // No renderizar si no hay texto
    // uso de if segun el estado del juego
    return (
        <div className={`mensaje-alerta ${haGanado ? 'ganaste' : 'intentando'}`}> 
            {texto}
        </div>  // prop
    );
}

export default Message;