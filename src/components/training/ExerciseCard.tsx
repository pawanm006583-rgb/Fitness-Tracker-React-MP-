import { motion } from 'framer-motion';
import { Clock, Flame, ChevronRight, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ExerciseCardProps {
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: string;
  image?: string;
  onClick?: () => void;
}

export const ExerciseCard = ({ 
  title, 
  category, 
  difficulty, 
  duration, 
  calories, 
  image,
  onClick 
}: ExerciseCardProps) => {
  const difficultyColor = {
    Beginner: 'text-emerald-500 bg-emerald-500/10',
    Intermediate: 'text-brand bg-brand/10',
    Advanced: 'text-rose-500 bg-rose-500/10',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="premium-card premium-card-hover group cursor-pointer w-[280px] shrink-0"
    >
      <div className="h-40 bg-foreground/5 relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <Zap className="w-12 h-12" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", difficultyColor[difficulty])}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{category}</p>
          <h4 className="font-bold text-lg leading-tight mt-1 group-hover:text-brand transition-colors">{title}</h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted" />
              <span className="text-xs font-bold">{duration}m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-bold">{calories}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted group-hover:text-brand transition-all" />
        </div>
      </div>
    </motion.div>
  );
};
