import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container" style={{ flexDirection: 'column', gap: '20px', minHeight: '100vh', paddingTop: '40px' }}>
        
        {/* Barra de Navegación Global */}
        <nav className="contador-box" style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '15px', maxWidth: '500px' }}>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/citas" className="nav-link">Ver Citas</Link>
        </nav>

        {/* Inyección Dinámica de Vistas según la URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/cita/:id" element={<CitaDetalle />} /> {/* Ruta dinámica con parámetro :id */}
          <Route path="*" element={<NotFound />} /> {/* Captura cualquier otra ruta errónea */}
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;