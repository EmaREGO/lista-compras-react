import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="contador-box" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '50px', color: '#ef4444', margin: 0 }}>404</h1>
            <h2>Ruta Galáctica Perdida</h2>
            <p style={{ color: '#9ca3af', margin: '15px 0' }}>La página médica o dirección que buscas no existe.</p>
            <Link to="/"><button className="btn-agregar">Regresar a Inicio</button></Link>
        </div>
    );
}

export default NotFound;