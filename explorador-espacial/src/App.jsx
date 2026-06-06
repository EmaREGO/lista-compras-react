import { useState, useEffect, useMemo, useRef } from 'react';
import Planeta from './Planeta';
import './App.css';

function App() {
  // Panel control
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");

  // Estado
  const [planetas, setPlanetas] = useState(() => {
    const guardados = localStorage.getItem('bitacora-espacial');
    return guardados ? JSON.parse(guardados) : [];
  });
  const [nombrePlaneta, setNombrePlaneta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);

  useEffect(() => {
    console.log("%c¡El panel de control está listo y encendido! ", "color: #61dafb; font-weight: bold;");

    const intervaloVuelo = setInterval(() => {
      // Usar funciones
      setCombustible((prevCombustible) => {
        if (prevCombustible <= 1) {
          setEstadoNave("Varado en el espacio sin combustible");
          clearInterval(intervaloVuelo);
          return 0;
        }
        return prevCombustible - 1;
      });

      setDistancia((prevDistancia) => prevDistancia + 100);
    }, 1000);

    return () => {
      // Apagar - desmontar
      clearInterval(intervaloVuelo);
      console.log("%cEl panel de control se ha apagado de forma segura. ", "color: #9ca3af;");
    };
  }, []);

  // Actualizacion
  useEffect(() => {
    if (combustible > 0) {
      console.log(`%c¡Combustible actualizado!: ${combustible}%`, "color: #eab308;");
    }
  }, [combustible]);

  // Persistencia - local Storage
  useEffect(() => {
    localStorage.setItem('bitacora-espacial', JSON.stringify(planetas));
  }, [planetas]);

  // Optimizacion con memo
  const mensajeEstado = useMemo(() => {
    return `Estado de la Misión: ${estadoNave}`;
  }, [estadoNave]);

  const registrarAterrizaje = (e) => {
    e.preventDefault();

    if (nombrePlaneta.trim() && descripcion.trim()) {
      const nuevoPlaneta = {
        nombre: nombrePlaneta.trim(),
        descripcion: descripcion.trim(),
        imagen: imagen ? URL.createObjectURL(imagen) : null
      };

      setPlanetas([...planetas, nuevoPlaneta]);
      setEstadoNave(`Aterrizado en ${nombrePlaneta.trim()}`);
      
      // Limpiar 
      setNombrePlaneta('');
      setDescripcion('');
      setImagen(null);
      if (inputImagenRef.current) inputImagenRef.current.value = '';
    }
  };

  const eliminarPlaneta = (indexAEliminar) => {
    const filtrados = planetas.filter((_, indexActual) => indexActual !== indexAEliminar);
    setPlanetas(filtrados);
  };

  return (
    <div className="app-container">
      <div className="contador-box" style={{ maxWidth: '600px' }}>
        <h1>Panel del Explorador Espacial</h1>
        
        <div className="form-container" style={{ backgroundColor: '#2d2d2d', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#61dafb' }}>{mensajeEstado}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
            <div>Distancia: <span style={{ color: '#61dafb', fontWeight: 'bold' }}>{distancia} km</span></div>
            <div>Combustible: <span style={{ color: combustible < 20 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{combustible}%</span></div>
          </div>
        </div>

        <h2>Registrar Aterrizaje en Planeta</h2>
        <form onSubmit={registrarAterrizaje} className="form-container">
          <input 
            type="text" 
            placeholder="Nombre del planeta" 
            value={nombrePlaneta}
            onChange={(e) => setNombrePlaneta(e.target.value)}
            required
          />
          <textarea 
            placeholder="Descripción del ecosistema..." 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#2d2d2d', color: '#fff', border: '1px solid #374151', minHeight: '60px', outline: 'none' }}
            required
          />
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            ref={inputImagenRef}
            style={{ fontSize: '14px' }}
          />
          <button type="submit" className="btn-agregar" disabled={combustible === 0}>
            Aterrizar y Registrar
          </button>
        </form>

        <h2>Bitácora de Exploración</h2>
        <ul className="tareas-lista" style={{ maxHeight: '350px' }}>
          {planetas.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: '14px' }}>Ningún planeta registrado en el cuadrante.</p>
          ) : (
            planetas.map((planeta, index) => (
              <Planeta 
                key={index} 
                nombre={planeta.nombre} 
                descripcion={planeta.descripcion} 
                imagen={planeta.imagen} 
                onEliminar={() => eliminarPlaneta(index)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;