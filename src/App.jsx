import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuraAvatar from './components/AuraAvatar';
import ChatInterface from './components/ChatInterface';
import BlueprintCanvas from './components/BlueprintCanvas';
import { getAuraResponse } from './lib/openrouter';
import { Sparkles, Star } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [blueprint, setBlueprint] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [auraReply, setAuraReply] = useState("Welcome, seeker of stars. I am Aura. Share your vision with me, and together we shall architect your destiny.");

  const handleSendMessage = async (text) => {
    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsThinking(true);

    const result = await getAuraResponse(newMessages);
    
    setAuraReply(result.reply);
    if (result.blueprint) {
      setBlueprint(result.blueprint);
    }
    setMessages([...newMessages, { role: 'assistant', content: result.reply }]);
    setIsThinking(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aura-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-aura-accent/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="p-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Aura Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Aura Architect
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/40">
          <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-aura-secondary text-aura-secondary" /> v1.0</span>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-12 pb-48 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <AuraAvatar isThinking={isThinking} />
          
          <motion.div
            key={auraReply}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 glass-card p-8 md:p-10 relative"
          >
            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-aura-primary to-transparent opacity-50" />
            
            <div className="absolute -top-5 -left-5 w-12 h-12 bg-aura-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(138,43,226,0.6)] z-20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-white font-light italic">
              {isThinking ? (
                <span className="flex items-center gap-3 justify-center md:justify-start">
                  Channeling the stars
                  <span className="flex gap-1.5">
                    <span className="w-2 h-2 bg-aura-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-aura-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-aura-accent rounded-full animate-bounce"></span>
                  </span>
                </span>
              ) : (
                `"${auraReply}"`
              )}
            </p>
          </motion.div>
        </div>

        <AnimatePresence>
          {blueprint && <BlueprintCanvas blueprint={blueprint} />}
        </AnimatePresence>

        <div className="mt-12">
          <ChatInterface onSend={handleSendMessage} isThinking={isThinking} />
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-20 text-center relative z-10">
        <div className="w-16 h-px bg-white/10 mx-auto mb-8" />
        <p className="text-white/20 text-xs uppercase tracking-[0.3em] font-light">
          Crystallizing Dreams into Blueprints &bull; Powered by Aura AI
        </p>
      </footer>
    </div>
  );
}

export default App;
