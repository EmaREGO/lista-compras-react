import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, User, LogOut, LogIn } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

const DockLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={to} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200"
    >
      {/* Indicador lateral */}
      {isActive && (
        <motion.div 
          layoutId="activeIndicator"
          className="absolute left-0 w-1 h-4 bg-apple-blue rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Burbuja de fondo elástica en Hover */}
      <motion.div 
        className="absolute inset-1 rounded-full -z-10"
        animate={{ 
          backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : isHovered ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0)"
        }}
      />

      {/* Icono */}
      <motion.div animate={{ scale: isHovered ? 1.1 : 1 }}>
        <Icon className={`w-5 h-5 transition-colors duration-200 ${
          isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-200"
        }`} />
      </motion.div>

      {/* Tooltip desplegable */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: -5, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -5, scale: 0.95 }}
            className="absolute left-16 bg-zinc-950/90 text-white text-[11px] font-bold tracking-wide px-2.5 py-1.5 rounded-lg border border-white/10 shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="flex min-h-screen w-full text-[#f5f5f7] box-border">
        
        {/* Flotante */}
        <div className="fixed bottom-4 left-0 right-0 h-16 md:h-auto md:bottom-auto md:right-auto md:top-1/2 md:-translate-y-1/2 md:left-6 z-50 flex justify-center items-center px-4 md:px-0">
          <aside className="flex flex-row md:flex-col items-center gap-2 p-2 rounded-full bg-zinc-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] w-full max-w-100 md:w-16 justify-around md:justify-start">
            
            {/* Logo en la parte superior del dock */}
            <div className="hidden md:flex items-center justify-center w-10 h-10 text-xl font-black text-white/40 select-none border-b border-white/5 pb-2 mb-1">
              X
            </div>
            <DockLink to="/" icon={HomeIcon} label="Home" />
            <DockLink to="/profile" icon={User} label="Mi Perfil" />
            <div className="hidden md:block w-8 h-px bg-white/10 my-1" />
            {/* Acción de sesión */}
            <div className="w-12 h-12 flex items-center justify-center">
              {user ? (
                <button 
                  onClick={logout}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-apple-red hover:bg-apple-red/10 transition-colors duration-200 cursor-pointer"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              ) : (
                <Link to="/login" className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-colors duration-200" title="Iniciar Sesión">
                  <LogIn className="w-5 h-5" />
                </Link>
              )}
            </div>

          </aside>
        </div>

        {/* CONTENIDO EXPANDIDO */}
        <main className="flex-1 flex justify-center px-4 pt-8 pb-24 md:pb-8 box-border overflow-x-hidden md:pl-28">
          <div className="w-full max-w-150">
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={login} />} />
              <Route path="/" element={<Home user={user} logout={logout} />} />
              <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
        
      </div>
    </Router>
  );
};

export default App;