import { Link } from 'react-router-dom';

// Datos simulados de citas médicas
const CITAS_DATA = [
    { id: "101", paciente: "Juan Pérez", especialidad: "Cardiología" },
    { id: "102", paciente: "María López", especialidad: "Pediatría" },
    { id: "103", paciente: "Carlos Mendoza", especialidad: "Dermatología" },
    { id: "104", paciente: "Ana Gómez", especialidad: "Medicina General" }
];

function Citas() {
    return (
        <div className="contador-box">
            <h2>Agenda de Citas Activas</h2>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '15px' }}>
                Selecciona un paciente para ver el expediente y detalles de la consulta.
            </p>
            
            <ul className="tareas-lista">
                {CITAS_DATA.map((cita) => (
                <li key={cita.id} className="tarea-item" style={{ alignItems: 'center' }}>
                    <div>
                    <span className="tarea-nombre" style={{ display: 'block' }}>{cita.paciente}</span>
                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>{cita.especialidad}</span>
                    </div>
                    {/* Genera dinámicamente el enlace usando el ID */}
                    <Link to={`/cita/${cita.id}`}>
                    <button className="btn-agregar" style={{ padding: '6px 12px', fontSize: '13px' }}>Ver Detalles
                    </button>
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Citas;