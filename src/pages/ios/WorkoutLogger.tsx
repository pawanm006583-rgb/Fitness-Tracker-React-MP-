import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Play, 
  Square, 
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const WorkoutLogger = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  return (
    <div className="px-4 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-tight">Leg Day</h1>
        <button className="text-brand-blue font-semibold text-[17px]">Finish</button>
      </header>

      {/* Rest Timer Card */}
      <div className="ios-card p-4 flex items-center justify-between bg-white overflow-hidden relative">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-blue flex items-center justify-center">
            <span className="text-[15px] font-bold text-brand-blue">{timeLeft}s</span>
          </div>
          <div>
            <p className="text-[15px] font-semibold">Rest Timer</p>
            <p className="caption-text">Target: 60s</p>
          </div>
        </div>
        <button 
          onClick={() => { setIsActive(!isActive); if (timeLeft === 0) setTimeLeft(60); }}
          className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue"
        >
          {isActive ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
      </div>

      {/* Exercise List */}
      <div className="space-y-4">
        {[
          { name: 'Back Squat', sets: 4, reps: '8-10', color: 'accent-bar-red' },
          { name: 'Leg Press', sets: 3, reps: '12-15', color: 'accent-bar-green' },
          { name: 'Bulgarian Split Squat', sets: 3, reps: '10 ea', color: 'accent-bar-blue' },
        ].map((ex, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn("ios-card p-0 overflow-hidden", ex.color)}
          >
            <div className="px-4 py-3 border-b border-border-ios flex items-center justify-between">
              <h3 className="text-[15px] font-bold">{ex.name}</h3>
              <MoreVertical className="w-4 h-4 text-[#C7C7CC]" />
            </div>
            <div className="px-4 py-2">
              <table className="w-full">
                <thead>
                  <tr className="caption-text !font-bold text-left uppercase tracking-widest border-b border-border-ios/50">
                    <th className="py-2 w-12">Set</th>
                    <th className="py-2">Previous</th>
                    <th className="py-2 w-16">Weight</th>
                    <th className="py-2 w-12 text-right">Reps</th>
                    <th className="py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody className="body-text">
                  {[1, 2, 3].map((s) => (
                    <tr key={s} className="border-b border-border-ios/30 last:border-none">
                      <td className="py-3 font-semibold text-[#8E8E93]">{s}</td>
                      <td className="py-3 text-[#8E8E93]">140kg x 10</td>
                      <td className="py-3">
                        <input type="text" placeholder="145" className="w-full bg-[#F2F2F7] rounded px-1 text-center outline-none" />
                      </td>
                      <td className="py-3 text-right">
                        <input type="text" placeholder="10" className="w-full bg-[#F2F2F7] rounded px-1 text-center outline-none" />
                      </td>
                      <td className="py-3 text-right">
                        <CheckCircle2 className="w-4 h-4 text-[#C7C7CC] ml-auto hover:text-brand-green cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="w-full py-3 bg-[#F2F2F7] body-text font-semibold text-brand-blue flex items-center justify-center gap-1 border-t border-border-ios">
              <Plus className="w-4 h-4" /> Add Set
            </button>
          </motion.div>
        ))}
        
        {/* Dashed Add Item State */}
        <div className="dashed-item p-4 h-16 cursor-pointer hover:bg-white/50 transition-all group">
          <div className="flex items-center gap-2 text-[#8E8E93] group-hover:text-brand-blue">
            <Plus className="w-5 h-5" />
            <span className="body-text font-semibold">Add Exercise</span>
          </div>
        </div>
      </div>
    </div>
  );
};
