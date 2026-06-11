import { useParams, Link } from 'react-router-dom';

// Diccionario extendido para simular la búsqueda por ID
const DETALLES_CITAS = {
    "101": { paciente: "Juan Pérez", doctor: "Dr. Ricardo Torres", hora: "09:00 AM", consultorio: "A-12", diagnostico: "Chequeo rutinario de presión arterial." },
    "102": { paciente: "María López", doctor: "Dra. Elena Rostova", hora: "11:30 AM", consultorio: "Pediatría B", diagnostico: "Vacunación anual y control de crecimiento." },
    "103": { paciente: "Carlos Mendoza", doctor: "Dr. Hugo Sánchez", hora: "04:00 PM", consultorio: "C-05", diagnostico: "Revisión de alergia cutánea y seguimiento." },
    "104": { paciente: "Ana Gómez", doctor: "Dra. Patricia Armendáriz", hora: "06:15 PM", consultorio: "A-01", diagnostico: "Consulta general por síntomas de resfriado." }
};

function CitaDetalle() {
    const { id } = useParams();
    const cita = DETALLES_CITAS[id];

    if (!cita) {
        return (
            <div className="contador-box" style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#ef4444' }}>Cita No Encontrada</h2>
                <p style={{ color: '#9ca3af', margin: '15px 0' }}>El código de consulta #{id} no existe en la base de datos.</p>
                <Link to="/citas"><button className="btn-agregar">Volver a la Agenda</button></Link>
            </div>
        );
    }

    return (
        <div className="contador-box">
            <h2>Expediente de Consulta #{id}</h2>
            
            <div className="form-container" style={{ backgroundColor: '#2d2d2d', padding: '16px', borderRadius: '8px', gap: '8px', margin: '15px 0' }}>
                <p style={{ margin: 0 }}>🚹<strong>Paciente:</strong> {cita.paciente}</p>
                <p style={{ margin: 0 }}>🩺<strong>Médico Asignado:</strong> {cita.doctor}</p>
                <p style={{ margin: 0 }}>🕒<strong>Horario:</strong> {cita.hora}</p>
                <p style={{ margin: 0 }}>🚪<strong>Consultorio:</strong> {cita.consultorio}</p>
                <hr style={{ borderColor: '#374151', margin: '10px 0' }} />
                <p style={{ margin: 0, fontSize: '14px', color: '#9ca3af' }}>
                <strong>Motivo / Diagnóstico preliminar:</strong><br />
                {cita.diagnostico}
                </p>
            </div>

            <Link to="/citas">
                <button className="btn-limpiar" style={{ width: '100%' }}>  Volver al Listado</button>
            </Link>
        </div>
    );
}

export default CitaDetalle;