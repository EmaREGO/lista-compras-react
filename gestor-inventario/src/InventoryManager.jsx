import { useReducer, useRef, useCallback, useState, useEffect } from "react";

// Estado inicial que intenta recuperar datos de localStorage
const initialState = {
    products: JSON.parse(localStorage.getItem("inventario-ecommerce")) || []
};

// Reducer centraliza todas las mutaciones del estado
function reducer(state, action) {
    switch (action.type) {
        case "add":
            return { 
                products: [...state.products, { 
                    id: Date.now(), 
                    name: action.name, 
                    quantity: 1 
                }] 
            };
        case "increment":
            return { 
                products: state.products.map(p =>
                    p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
                ) 
            };
        case "decrement":
            return { 
                products: state.products.map(p =>
                    p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                ) 
            };
        case "remove":
            return { 
                products: state.products.filter(p => p.id !== action.id) 
            };
        case "clear": // Vaciar todo el inventario
            return { products: [] };
        default:
            return state;
    }
}

function InventoryManager() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState(""); // 🔍 Ejercicio 1: Estado para el buscador
    const inputRef = useRef(null);

    // Guardar en localStorage automáticamente al cambiar productos
    useEffect(() => {
        localStorage.setItem("inventario-ecommerce", JSON.stringify(state.products));
    }, [state.products]);

    // useRef para dar foco automático al input al montar el componente
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleAddProduct = () => {
        const value = inputRef.current.value.trim();
        if (value !== "") {
            dispatch({ type: "add", name: value });
            inputRef.current.value = ""; // Limpiar input sin causar re-render
            inputRef.current.focus();
        }
    };

    // useCallback: Memoriza las funciones para evitar que se re-creen en cada render
    const handleIncrement = useCallback((id) => {
        dispatch({ type: "increment", id });
    }, []);

    const handleDecrement = useCallback((id) => {
        dispatch({ type: "decrement", id });
    }, []);

    const handleRemove = useCallback((id) => {
        dispatch({ type: "remove", id });
    }, []);

    const handleClear = useCallback(() => {
        dispatch({ type: "clear" });
    }, []);

    // Filtrado dinámico de productos según la búsqueda
    const filteredProducts = state.products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="contador-box" style={{ maxWidth: '500px' }}>
            <h1>Gestor de Inventario</h1>

            {/* AGREGAR PRODUCTO */}
            <div className="form-container" style={{ marginBottom: '20px' }}>
                <input ref={inputRef} type="text" placeholder="Nombre del nuevo producto (Ej. Tenis, Gorra)" />
                <button className="btn-agregar" onClick={handleAddProduct}>Agregar al Inventario</button>
            </div>

            {/* BARRA DE BÚSQUEDA (Solo se muestra si hay productos) */}
            {state.products.length > 0 && (
                <div className="form-container" style={{ marginBottom: '20px' }}>
                    <input 
                        type="text" 
                        placeholder="Buscar producto en almacén..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ borderColor: search ? '#61dafb' : '#374151' }}
                    />
                </div>
            )}

            <h2>Existencias en Almacén</h2>
            <ul className="tareas-lista" style={{ maxHeight: '280px' }}>
                {filteredProducts.length === 0 ? (
                    <p style={{ color: '#9ca3af', textAlign: 'center', fontSize: '14px', margin: '20px 0' }}>
                        {state.products.length === 0 ? "El inventario está vacío." : "No se encontraron productos coincidentes."}
                    </p>
                ) : (
                    filteredProducts.map((product) => (
                        <li key={product.id} className="tarea-item">
                            <span className="tarea-nombre">{product.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="tarea-duracion" style={{ fontSize: '14px', padding: '6px 12px' }}>
                                    Cant: {product.quantity}
                                </span>
                                <button className="btn-agregar" style={{ padding: '4px 10px' }} onClick={() => handleIncrement(product.id)}>+</button>
                                <button className="btn-agregar" style={{ padding: '4px 12px', backgroundColor: '#eab308' }} onClick={() => handleDecrement(product.id)}>-</button>
                                <button className="btn-eliminar" style={{ padding: '4px 10px' }} onClick={() => handleRemove(product.id)}>x</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {/* BOTÓN VACIAR TODO */}
            {state.products.length > 0 && (
                <button className="btn-limpiar" onClick={handleClear} style={{ marginTop: '20px', width: '100%' }}>
                Vaciar Todo el Inventario
                </button>
            )}
        </div>
    );
}

export default InventoryManager;