import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkipForward, Flame } from 'lucide-react';

export const RestTimer = ({ duration, onComplete, onSkip }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-bg-main/60 backdrop-blur-3xl"
    >
      <div className="w-full max-w-sm glass-panel p-10 rounded-[40px] flex flex-col items-center text-center space-y-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-foreground/5"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="552.92"
              animate={{ strokeDashoffset: 552.92 - (552.92 * progress) / 100 }}
              className="text-brand"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-bold tracking-tighter tabular-nums">{timeLeft}</span>
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">SECONDS REST</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-brand">
            <Flame className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">Neural Recovery Active</span>
          </div>
          <p className="text-sm text-muted">AESTHER is monitoring your heart rate recovery.</p>
        </div>

        <div className="flex gap-4 w-full pt-4">
          <button 
            onClick={onSkip}
            className="flex-1 py-4 bg-foreground/5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-foreground/10 transition-all"
          >
            <SkipForward className="w-4 h-4" /> Skip
          </button>
          <button 
            onClick={() => setTimeLeft(prev => prev + 30)}
            className="flex-1 py-4 bg-brand/10 text-brand border border-brand/20 rounded-2xl font-bold text-sm transition-all"
          >
            +30s
          </button>
        </div>
      </div>
    </motion.div>
  );
};
