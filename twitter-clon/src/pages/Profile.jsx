import { Link } from "react-router-dom";

const Profile = ({ user }) => {
    return (
        <div className="contador-box" style={{ maxWidth: '500px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#1d9bf0', borderRadius: '50%', margin: '0 auto 15px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', color: '#fff', fontWeight: 'bold' }}>
                {user?.username.charAt(0).toUpperCase()}
            </div>
            <h2>Perfil de Usuario</h2>
            <div className="form-container" style={{ backgroundColor: '#15181c', padding: '20px', borderRadius: '12px', border: '1px solid #2f3336', margin: '20px 0', textAlign: 'left' }}>
                <p style={{ margin: 0 }}><strong>Nombre de usuario:</strong> {user?.username}</p>
            </div>
            <Link to="/"><button className="btn-limpiar hover:text-apple-blue transition-colors duration-200" style={{ width: '100%' }}>Volver al Inicio</button></Link>
        </div>
    );
};

export default Profile;