import React from 'react';
import { motion } from 'framer-motion';

const AuraAvatar = ({ isThinking }) => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
      {/* Glow Effect */}
      <motion.div
        animate={isThinking ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.9, 0.5],
        } : {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: isThinking ? 1.5 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-aura-primary/40 rounded-full blur-3xl"
      />
      
      {/* Character Image */}
      <motion.img
        src="/assets/aura.png"
        alt="Aura"
        animate={isThinking ? {
          y: [0, -10, 0],
          rotate: [0, 1, -1, 0],
          filter: [
            'drop-shadow(0 0 15px rgba(138,43,226,0.5)) brightness(1)',
            'drop-shadow(0 0 25px rgba(0,255,255,0.8)) brightness(1.2)',
            'drop-shadow(0 0 15px rgba(138,43,226,0.5)) brightness(1)'
          ]
        } : {
          y: [0, -5, 0],
          filter: 'drop-shadow(0 0 15px rgba(138,43,226,0.5))'
        }}
        transition={{
          duration: isThinking ? 2 : 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 w-full h-full object-contain"
      />

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-aura-accent rounded-full"
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            top: '50%',
            left: '50%'
          }}
        />
      ))}
    </div>
  );
};

export default AuraAvatar;
