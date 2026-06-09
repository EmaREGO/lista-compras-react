// Capturar numero de usuario, usando composicion, 
// si usuario adivina numero ocultar formulario y no mas ingreso de datos

import { useState } from 'react';

function InputNumber({ onAdivinar, desactivado }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            onAdivinar(parseInt(inputValue));
            setInputValue(''); // Limpiar el input
        }
    };

  if (desactivado) return null; // Renderizado condicional: desaparece si ya ganó

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input
                type="number"
                min="1"
                max="100"
                placeholder="Escribe del 1 al 100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
            />
            <button type="submit" className="btn-agregar">Probar Suerte</button>
        </form>
    );
}

export default InputNumber;