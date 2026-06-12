import { useState } from "react";

const TweetForm = ({ onAddTweet }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAddTweet(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="border-b border-white/5 pb-4 mb-4 box-border">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="¿Qué estás pensando?"
                className="w-full p-3 rounded-xl bg-black/20 text-white text-[15px] border border-white/10 outline-none resize-none min-h-22.5 box-border focus:border-white/20 focus:bg-black/40 transition-all duration-200"
                maxLength={280}
                required
            /> {/* Asegurar el cierre correcto de la etiqueta */}
            <div className="flex justify-end mt-2">
                <button type="submit" className="px-5 py-2 rounded-full text-sm font-bold bg-white text-black hover:opacity-90 active:scale-95 transition-all duration-200">
                    Postear
                </button>
            </div>
        </form>
    );
};

export default TweetForm;