import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanUsername = username.trim().toLowerCase().replace("@", "");

        if (cleanUsername.length < 3) {
            setError("El nombre de usuario debe tener al menos 3 caracteres.");
            return;
        }

        // Obtener base de datos simulada
        const registrados = JSON.parse(localStorage.getItem("twitter-usuarios-db")) || [];
        
        if (!registrados.includes(cleanUsername)) {
            registrados.push(cleanUsername);
            localStorage.setItem("twitter-usuarios-db", JSON.stringify(registrados));
        }

        onLogin(cleanUsername);
        navigate("/"); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] w-full box-border">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="w-full max-w-96 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center box-border"
            >
            {/* Icono */}
            <div className="text-3xl font-bold text-white mb-2 tracking-tighter">𝕏</div>

            <h3 className="text-xl font-bold text-white tracking-tight m-0 mb-1">¿Qué está pasando?</h3>
            <p className="text-sm text-zinc-400 m-0 mb-6">
                Ingresa tu usuario para unirte a la conversación.
            </p>
                
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Nombre de usuario (ej: ema_dev)"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (error) setError(""); 
                        }}
                        className="w-full p-3.5 rounded-xl bg-black/30 text-white text-[15px] border border-white/10 outline-none box-border focus:border-white/20 focus:bg-black/50 transition-all duration-200"
                        required
                    />
                </div>
                
                {/* Alerta de error estilizada */}
                {error && (
                    <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-apple-red text-left m-0 px-1"
                    >
                {error}
                    </motion.p>
                )}
                
                {/* Botón sólido de alto contraste estilo Threads */}
                <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-sm font-bold bg-white text-black cursor-pointer hover:opacity-90 transition-all duration-200 mt-2"
                >
                Registrarse / Iniciar Sesión
                </motion.button>
            </form>
            </motion.div>
        </div>
    );
};

export default Login;