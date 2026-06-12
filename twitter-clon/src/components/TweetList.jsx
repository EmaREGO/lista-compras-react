import { motion, AnimatePresence } from "framer-motion";
import Tweet from "./Tweet";

// Recibir misLikes desde Home
const TweetList = ({ tweets, onLike, misLikes = [] }) => {
    return (
        <div className="mt-4 flex flex-col">
            <AnimatePresence initial={false}>
                {tweets.map((tweet) => (
                    <motion.div
                        key={tweet.id}
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="overflow-hidden"
                    >
                    {/* Evaluar si id esta incluido dentro de id */}
                    <Tweet 
                        tweet={tweet} 
                        onLike={onLike} 
                        estaReaccionado={misLikes.includes(tweet.id)} 
                    />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TweetList;