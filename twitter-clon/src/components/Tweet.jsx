import { motion } from "framer-motion";

const Tweet = ({ tweet, onLike, estaReaccionado }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="py-4 border-b border-white/5 hover:bg-white/1 transition-colors duration-200 box-border"
        >
            <span className="block font-semibold text-white text-[15px] mb-1">
                @{tweet.autor || "Anónimo"}
            </span>
            <p className="text-[15px] text-zinc-200 m-0 mb-3 leading-relaxed whitespace-pre-wrap">
                {tweet.text}
            </p>
            <motion.button 
                onClick={() => onLike(tweet.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.92, rotate: [0, -5, 5, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                    estaReaccionado 
                        ? 'bg-apple-red/10 text-apple-red border-apple-red/30' 
                        : 'bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10'
                }`}
                >
                {estaReaccionado ? '❤️' : '🖤'} {tweet.likes}
            </motion.button>
        </motion.div>
    );
};

export default Tweet;