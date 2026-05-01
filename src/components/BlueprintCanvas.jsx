import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Layout } from 'lucide-react';

const BlueprintCanvas = ({ blueprint }) => {
  if (!blueprint) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-4xl mx-auto mt-12 pb-32"
    >
      <div className="flex items-center gap-3 mb-8 px-4">
        <Layout className="text-aura-accent w-6 h-6" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
          {blueprint.title}
        </h2>
      </div>

      <div className="grid gap-4 px-4">
        <AnimatePresence mode="popLayout">
          {blueprint.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex items-start gap-4 hover:border-aura-accent/30 transition-colors"
            >
              <div className="mt-1">
                <Circle className="w-5 h-5 text-aura-accent/50" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white/90 mb-1">{milestone.task}</h3>
                <div className="flex items-center gap-4 text-sm text-white/40">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {milestone.duration}
                  </span>
                  <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/10 uppercase text-[10px] tracking-wider">
                    {milestone.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BlueprintCanvas;
