import { motion } from 'framer-motion';
import { 
  Award, 
  Flame, 
  Heart, 
  Zap, 
  Trophy, 
  Star,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../utils/cn';

const badgeData = [
  { id: 1, label: 'Early Bird', desc: '5AM Workout', icon: Zap, color: 'text-amber-500', unlocked: true },
  { id: 2, label: 'Centurion', desc: '100 Workouts', icon: Trophy, color: 'text-brand-blue', unlocked: true },
  { id: 3, label: 'Fire Starter', desc: '7 Day Streak', icon: Flame, color: 'text-orange-500', unlocked: true },
  { id: 4, label: 'Heart of Gold', desc: 'Cardio Pro', icon: Heart, color: 'text-rose-500', unlocked: false },
  { id: 5, label: 'Master Elite', desc: 'Top 1% User', icon: Star, color: 'text-purple-500', unlocked: false },
  { id: 6, label: 'Legionnaire', desc: 'Leg Day King', icon: Award, color: 'text-brand-green', unlocked: false },
];

export const Badges = () => {
  return (
    <div className="px-4 py-4 space-y-6">
      <header>
        <h1 className="text-[28px] font-bold tracking-tight">Achievements</h1>
        <p className="caption-text mt-1">You have unlocked 3 of 12 badges.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {badgeData.map((badge) => (
          <motion.div 
            key={badge.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "ios-card p-6 flex flex-col items-center text-center gap-3 relative overflow-hidden",
              !badge.unlocked && "opacity-60 bg-[#F2F2F7]/50"
            )}
          >
            {!badge.unlocked && (
              <div className="absolute top-2 right-2">
                <Lock className="w-3.5 h-3.5 text-[#C7C7CC]" />
              </div>
            )}
            
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center relative",
              badge.unlocked ? "bg-white shadow-md" : "bg-[#E5E5EA]"
            )}>
              <badge.icon className={cn("w-8 h-8", badge.unlocked ? badge.color : "text-[#8E8E93]")} />
              {badge.unlocked && (
                <div className="absolute -bottom-1 -right-1 bg-brand-green text-white rounded-full p-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </div>

            <div>
              <p className="text-[15px] font-bold">{badge.label}</p>
              <p className="caption-text mt-0.5 leading-tight">{badge.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Dashed placeholder for upcoming badges */}
      <div className="dashed-item p-8 flex flex-col items-center gap-2">
        <Star className="w-8 h-8 text-[#C7C7CC]" />
        <p className="caption-text font-semibold uppercase tracking-widest">More Coming Soon</p>
      </div>
    </div>
  );
};
