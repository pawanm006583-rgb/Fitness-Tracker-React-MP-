import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, 
  Plus, 
  Minus,
  GlassWater,
  Info
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Hydration = () => {
  const [glasses, setGlasses] = useState(5);
  const target = 10;

  return (
    <div className="px-4 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-tight">Hydration</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full">
          <Droplets className="w-4 h-4 text-brand-blue fill-current" />
          <span className="body-text font-bold text-brand-blue">{glasses * 250} / {target * 250} ml</span>
        </div>
      </header>

      {/* Tracker Card */}
      <div className="ios-card p-8 flex flex-col items-center gap-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 overflow-visible">
            <circle cx="96" cy="96" r="88" fill="none" stroke="#E5E5EA" strokeWidth="12" />
            <motion.circle 
              cx="96" cy="96" r="88" fill="none" stroke="#007AFF" strokeWidth="12"
              strokeDasharray={552.9}
              initial={{ strokeDashoffset: 552.9 }}
              animate={{ strokeDashoffset: 552.9 - (glasses / target) * 552.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-[40px] font-bold leading-none">{Math.round((glasses/target)*100)}%</span>
            <span className="caption-text font-bold uppercase tracking-widest mt-1">Daily Goal</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <button 
            onClick={() => setGlasses(Math.max(0, glasses - 1))}
            className="w-12 h-12 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93]"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-bold">{glasses}</span>
            <span className="caption-text font-bold">GLASSES</span>
          </div>
          <button 
            onClick={() => setGlasses(Math.min(target, glasses + 1))}
            className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: target }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "ios-card aspect-square flex items-center justify-center",
              i < glasses ? "bg-brand-blue text-white shadow-md" : "bg-white text-[#C7C7CC]"
            )}
          >
            <GlassWater className={cn("w-6 h-6", i < glasses ? "fill-current" : "")} />
          </div>
        ))}
      </div>

      <div className="ios-card p-4 flex items-center gap-3 bg-brand-blue/5 border-none">
        <Info className="w-5 h-5 text-brand-blue shrink-0" />
        <p className="caption-text !text-brand-blue leading-tight">
          Drinking water helps maintain energy levels and metabolic function during workouts.
        </p>
      </div>
    </div>
  );
};
