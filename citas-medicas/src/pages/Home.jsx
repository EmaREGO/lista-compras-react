import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="contador-box" style={{ textAlign: 'center' }}>
            <h1>Bienvenido a AXOMA</h1>
            <p style={{ color: '#9ca3af', margin: '15px 0' }}>
                La forma más rápida y eficiente de gestionar tus consultas y expedientes médicos.
            </p>
            <Link to="/citas">
                <button className="btn-agregar" style={{ width: 'auto', padding: '12px 24px' }}>
                Gestionar Citas Médicas
                </button>
            </Link>
        </div>
    );
}

export default Home;