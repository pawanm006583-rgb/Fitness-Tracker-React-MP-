import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Zap } from 'lucide-react';

export const AIInsightCard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="premium-card p-6 bg-gradient-to-br from-brand/20 via-transparent to-transparent border-brand/20 relative group overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles className="w-24 h-24 text-brand" />
      </div>
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-brand/20 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-brand" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-brand">Daily Insight</span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl font-bold leading-tight">
            Your cardiovascular recovery is <span className="ai-gradient-text">peak optimized</span> today.
          </h3>
          <p className="text-muted leading-relaxed max-w-md">
            Based on your sleep heart rate variability and yesterday's high-intensity session, 
            the AI recommends a focused zone 4 power interval training.
          </p>
        </div>
        
        <button className="flex items-center gap-2 text-sm font-bold text-brand hover:gap-3 transition-all">
          View Today's Plan <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export const ActivityRingsV2 = () => {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      {/* Move */}
      <svg className="absolute w-full h-full -rotate-90">
        <circle cx="96" cy="96" r="80" fill="none" stroke="var(--border-subtle)" strokeWidth="14" />
        <motion.circle 
          cx="96" cy="96" r="80" fill="none" stroke="#3b82f6" strokeWidth="14"
          strokeDasharray={502.6}
          initial={{ strokeDashoffset: 502.6 }}
          animate={{ strokeDashoffset: 502.6 - (0.85 * 502.6) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      {/* Exercise */}
      <svg className="absolute w-full h-full -rotate-90">
        <circle cx="96" cy="96" r="62" fill="none" stroke="var(--border-subtle)" strokeWidth="14" />
        <motion.circle 
          cx="96" cy="96" r="62" fill="none" stroke="#8b5cf6" strokeWidth="14"
          strokeDasharray={389.5}
          initial={{ strokeDashoffset: 389.5 }}
          animate={{ strokeDashoffset: 389.5 - (0.65 * 389.5) }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      {/* Stand */}
      <svg className="absolute w-full h-full -rotate-90">
        <circle cx="96" cy="96" r="44" fill="none" stroke="var(--border-subtle)" strokeWidth="14" />
        <motion.circle 
          cx="96" cy="96" r="44" fill="none" stroke="#ec4899" strokeWidth="14"
          strokeDasharray={276.4}
          initial={{ strokeDashoffset: 276.4 }}
          animate={{ strokeDashoffset: 276.4 - (0.45 * 276.4) }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold tracking-tighter">85%</span>
        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Total</span>
      </div>
    </div>
  );
};
