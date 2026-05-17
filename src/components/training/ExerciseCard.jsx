import { motion } from 'framer-motion';
import { 
  Clock, 
  Flame, 
  ChevronRight, 
  Zap, 
  Play, 
  Plus, 
  Bookmark,
  Target,
  Dumbbell
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const ExerciseCard = ({ 
  title, 
  category, 
  difficulty, 
  duration, 
  calories, 
  image,
  muscles = [],
  equipment = 'Barbell',
  isRecommended = false,
  onClick 
}) => {
  const difficultyColor = {
    Beginner: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5',
    Intermediate: 'text-brand border-brand/20 bg-brand/5',
    Advanced: 'text-rose-500 border-rose-500/20 bg-rose-500/5',
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="os-glass group cursor-pointer w-[320px] md:w-[380px] shrink-0 rounded-[40px] overflow-hidden border-white/5 hover:border-brand/30 transition-all duration-500 shadow-2xl"
    >
      {/* Media Section */}
      <div className="relative aspect-[16/10] overflow-hidden" onClick={onClick}>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <Dumbbell className="w-12 h-12 text-white/10" />
          </div>
        )}
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.6)]">
            <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border backdrop-blur-md", difficultyColor[difficulty])}>
            {difficulty}
          </span>
          {isRecommended && (
            <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-brand text-white shadow-lg shadow-brand/40 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Coach Recommended
            </span>
          )}
        </div>

        {/* Muscle Focus Mini-Map (Visual representation of text) */}
        <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
           <div className="flex gap-1">
             {muscles.map((m, i) => (
               <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
             ))}
           </div>
           <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Target Zones</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand">
             <Target className="w-3.5 h-3.5" />
             <p className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">{category}</p>
          </div>
          <h4 className="font-black text-2xl tracking-tighter uppercase italic leading-none group-hover:text-brand transition-colors duration-500">
            {title}
          </h4>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Time</span>
               <div className="flex items-center gap-2">
                 <Clock className="w-3.5 h-3.5 text-white/40" />
                 <span className="text-sm font-black italic">{duration}m</span>
               </div>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Intensity</span>
               <div className="flex items-center gap-2">
                 <Flame className="w-3.5 h-3.5 text-orange-500" />
                 <span className="text-sm font-black italic">{calories}k</span>
               </div>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Type</span>
               <div className="flex items-center gap-2">
                 <Zap className="w-3.5 h-3.5 text-brand" />
                 <span className="text-sm font-black italic">{equipment}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button className="flex-1 py-4 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all">
             <Play className="w-3.5 h-3.5 fill-current" /> Start Movement
          </button>
          <div className="flex gap-2">
            <button className="w-14 h-14 rounded-2xl os-glass flex items-center justify-center hover:bg-white/10 transition-colors group/btn">
               <Plus className="w-5 h-5 text-white/40 group-hover/btn:text-white transition-colors" />
            </button>
            <button className="w-14 h-14 rounded-2xl os-glass flex items-center justify-center hover:bg-white/10 transition-colors group/btn">
               <Bookmark className="w-5 h-5 text-white/40 group-hover/btn:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Sparkles = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
