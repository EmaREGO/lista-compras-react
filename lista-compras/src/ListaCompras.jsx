import { useState } from "react";
import "./ListaCompras.css";

function ListaCompras() {
  // Definir el estado para la lista de compras
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState("");

  // Función para agregar un nuevo producto a la lista
    const agregarProducto = () => {
        if (nuevoProducto.trim() !== "") {
            setProductos([...productos, nuevoProducto]);
            setNuevoProducto("");
        }
    };

  // Función para eliminar un producto de la lista
    const eliminarProducto = (indexAEliminar) => {
        const nuevaLista = productos.filter((_, indexActual) => indexActual !== indexAEliminar);
        setProductos(nuevaLista);
    };

    const vaciarLista = () => {
        setProductos([]);
    };

    return (
        <div className="compras-contenedor">
            <h2>Lista de Compras</h2>

            <div className="compras-input-box">
                    <input
                        type="text"
                        placeholder="Ej. Manzanas, Pollo..."
                        value={nuevoProducto}
                        onChange={(e) => setNuevoProducto(e.target.value)}
                    />
                <button className="btn-agregar" onClick={agregarProducto}>Agregar</button>
            </div>

            <ul className="compras-lista">
                    {productos.map((producto, index) => (
                        <li key={index} className="compras-item">
                            <span>{producto}</span>
                            <button className="btn-eliminar" onClick={() => eliminarProducto(index)}>Eliminar</button>
                        </li>
                    ))}
            </ul>

        {/* Renderizado condicional: Solo se muestra el botón si hay productos */}
            {productos.length > 0 && (
                    <button className="btn-vaciar" onClick={vaciarLista}>
                        Vaciar Lista
                    </button>
            )}
        </div>
    );
}

export default ListaCompras;