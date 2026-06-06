import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas-workshop');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');

  // Guardar localstorage
  useEffect(() => {
    localStorage.setItem('tareas-workshop', JSON.stringify(tareas));
  }, [tareas]);

    // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);  // Se ejecuta cada vez que las tareas cambian

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const limpiarTareas = () => {
    setTareas([]);
  };

  return (
    <div className="app-container">
      <div className="contador-box">
        <h1>Contador de Tareas</h1>
        
        <div className="form-container">
          <input 
            type="text" 
            value={nuevaTarea} 
            onChange={(e) => setNuevaTarea(e.target.value)} 
            placeholder="Nombre de la tarea" 
          />
          <input 
            type="number" 
            value={duracion} 
            onChange={(e) => setDuracion(e.target.value)} 
            placeholder="Minutos" 
          />
          <button className="btn-agregar" onClick={agregarTarea}>Agregar tarea</button>
        </div>

        <h2>Tareas Registradas</h2>
        <ul className="tareas-lista">
          {tareas.map((tarea, index) => (
            <li key={index} className="tarea-item">
              <span className="tarea-nombre">{tarea.nombre}</span>
              <span className="tarea-duracion">{tarea.duracion} min</span>
            </li>
          ))}
        </ul>

        <div className="totales-container">
          <h3>Total de tiempo: <span>{calcularTiempoTotal}</span> minutos</h3>
          {tareas.length > 0 && (
            <button className="btn-limpiar" onClick={limpiarTareas}>Borrar Todo</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;