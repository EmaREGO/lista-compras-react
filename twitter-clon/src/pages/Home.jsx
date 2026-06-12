import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TweetList from "../components/TweetList";
import TweetForm from "../components/TweetForm";

const Home = ({ user, logout }) => {
    const [tweets, setTweets] = useState(() => {
        const storedTweets = localStorage.getItem("tweets");
        return storedTweets ? JSON.parse(storedTweets) : [
            { id: 1, autor: "DevF_sasasamaes", text: "¡Bienvenidos al proyecto final de React!", likes: 2 },
            { id: 2, autor: "React_JS", text: "Manejar componentes modulares y rutas protegidas es clave.", likes: 5 }
        ];
    });

    useEffect(() => {
        if (tweets.length > 0) {
            localStorage.setItem("tweets", JSON.stringify(tweets));
        }
    }, [tweets]);

    const addTweet = (text) => {
        const newTweet = {
            id: Date.now(),
            autor: user ? user.username : "Anónimo",
            text,
            likes: 0,
        };
        setTweets([newTweet, ...tweets]);
    };

    const [likeError, setLikeError] = useState("");
    const [misLikes, setMisLikes] = useState([]);

    const likeTweet = (id) => {
        if (!user) {
            setLikeError("Debes iniciar sesión para reaccionar a los posts.");
            setTimeout(() => setLikeError(""), 3000);
            return;
        }

        const yaTieneLike = misLikes.includes(id);

        if (yaTieneLike) {
            setTweets(tweets.map((t) => t.id === id ? { ...t, likes: Math.max(0, t.likes - 1) } : t));
            setMisLikes(misLikes.filter(likeId => likeId !== id));
        } else {
            setTweets(tweets.map((t) => t.id === id ? { ...t, likes: t.likes + 1 } : t));
            setMisLikes([...misLikes, id]);
        }
    };

    return (
        <>
            {/* Caja optimizada según recomendaciones de Tailwind v4 */}
            <div className="w-full max-w-150 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl box-border">
            
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-white m-0">Inicio</h1>
                {user ? (
                    <button onClick={logout} className="px-4 py-2 text-xs font-bold rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all duration-200">
                        Cerrar sesión
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="px-4 py-2 text-xs font-bold rounded-full bg-white text-black hover:opacity-90 transition-all duration-200">
                            Iniciar Sesión
                        </button>
                    </Link>
                )}
            </div>

            {user && (
                <p className="text-sm text-zinc-400 m-0 mb-4">
                    Hola, <span className="text-white font-semibold">@{user.username}</span>!
                </p>
            )}

            {/* Editor de Tweet */}
            {user ? (
                <TweetForm onAddTweet={addTweet} />
            ) : (
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-center mb-6">
                    <p className="text-sm text-zinc-400 m-0">Inicia sesión para publicar un nuevo Tweet.</p>
                </div>
            )}

            {likeError && (
                <div className="p-3 mb-4 rounded-xl bg-apple-red/10 border border-apple-red/20 text-apple-red text-center text-sm transition-all duration-300">
                    {likeError}
                </div>
            )}

            <TweetList tweets={tweets} onLike={likeTweet} misLikes={misLikes} />
            </div>
        </>
    );
};

export default Home;