import { useEffect } from "react";

function Planeta({ nombre, descripcion, imagen, onEliminar }) {
    useEffect(() => {
        // Cuando el planeta aparece en pantalla
        console.log(`%c¡El planeta "${nombre}" ha aparecido en el radar! `, "color: #10b981; font-weight: bold;");

        return () => {
            console.log(`%c¡El planeta "${nombre}" ha desaparecido del radar! `, "color: #ef4444; font-weight: bold;");
        };
    }, [nombre]); //nombre para rastrear planeta especifico

        return (
        <li className="tarea-item animate-fade-in" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#61dafb' }}>{nombre}</h3>
                <button className="btn-eliminar" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={onEliminar}>
                Eliminar
                </button>
            </div>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px' }}>{descripcion}</p>
            {imagen && (
                <img 
                src={imagen} 
                alt={nombre} 
                style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '6px', marginTop: '5px' }} 
                />
            )}
        </li>
    );
}

export default Planeta;
