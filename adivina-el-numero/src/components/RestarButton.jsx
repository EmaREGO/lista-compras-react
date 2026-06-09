function RestartButton({ onReiniciar, visible }) {
    if (!visible) return null; // Renderizado condicional implícito

    return (
        <button className="btn-limpiar" onClick={onReiniciar} style={{ marginTop: '15px' }}>
            Jugar de nuevo
        </button>
    );
}

export default RestartButton;