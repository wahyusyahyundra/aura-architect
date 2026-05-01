import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInterface = ({ onSend, isThinking }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isThinking) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <form 
        onSubmit={handleSubmit}
        className="glass-card p-2 md:p-3 flex items-center gap-4 group focus-within:ring-2 focus-within:ring-aura-primary/30 transition-all duration-300"
      >
        <div className="pl-3 text-aura-accent">
          <Sparkles className={`w-6 h-6 ${isThinking ? 'animate-pulse' : 'group-hover:rotate-12 transition-transform'}`} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your vision or ask for guidance..."
          className="flex-1 bg-transparent border-none outline-none py-3 text-lg text-white placeholder-white/30"
          disabled={isThinking}
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="aura-button !p-4 !rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          <Send className={`w-5 h-5 ${input.trim() ? 'text-white' : 'text-white/50'}`} />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatInterface;
