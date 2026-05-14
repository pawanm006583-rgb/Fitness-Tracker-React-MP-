import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Zap, 
  Dumbbell, 
  Flame, 
  Clock, 
  Activity, 
  Target, 
  Brain, 
  RotateCcw, 
  Save, 
  Sparkles,
  ChevronRight,
  GripVertical,
  Minus,
  Plus,
  RefreshCw,
  Info
} from 'lucide-react';
import { cn } from '../../utils/cn';

const GOALS = [
  { id: 'hyp', label: 'Hypertrophy', icon: Dumbbell },
  { id: 'str', label: 'Strength', icon: Zap },
  { id: 'fat', label: 'Fat Loss', icon: Flame },
  { id: 'ath', label: 'Athletic', icon: Activity },
  { id: 'end', label: 'Endurance', icon: Clock },
];

const MUSCLES = [
  { id: 'chest', label: 'Chest', intensity: 40 },
  { id: 'back', label: 'Back', intensity: 85 },
  { id: 'legs', label: 'Legs', intensity: 70 },
  { id: 'shoulders', label: 'Shoulders', intensity: 30 },
  { id: 'arms', label: 'Arms', intensity: 20 },
  { id: 'core', label: 'Core', intensity: 50 },
];

const INITIAL_EXERCISES = [
  { id: '1', name: 'Barbell Back Squat', sets: 4, reps: '6-8', load: '100kg' },
  { id: '2', name: 'Romanian Deadlift', sets: 3, reps: '10-12', load: '80kg' },
  { id: '3', name: 'Leg Press', sets: 3, reps: '12-15', load: '140kg' },
  { id: '4', name: 'Calf Raises', sets: 4, reps: '15-20', load: '60kg' },
];

export const WorkoutModifier = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [goal, setGoal] = useState('hyp');
  const [intensity, setIntensity] = useState(8);
  const [volume, setVolume] = useState(7);
  const [duration, setDuration] = useState(55);
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);
  const [isGenerating, setIsGenerating] = useState(false);

  // AI Recalculation mock
  const [stats, setStats] = useState({
    calories: 580,
    recovery: '48h',
    neuralLoad: 'High',
    cnsReadiness: 94
  });

  useEffect(() => {
    // Dynamic recalculation based on sliders
    const burn = Math.floor((intensity * 40) + (volume * 30) + (duration * 0.5));
    const rec = intensity > 8 ? '72h' : intensity > 5 ? '48h' : '24h';
    const readiness = 100 - (intensity * 2) - (volume * 1.5);
    
    setStats({
      calories: burn,
      recovery: rec,
      neuralLoad: intensity > 7 ? 'Extreme' : 'Moderate',
      cnsReadiness: Math.round(readiness)
    });
  }, [intensity, volume, duration]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1500);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 font-['Outfit']"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            className="w-full max-w-6xl h-full max-h-[900px] bg-[#0d0d0d] border border-white/10 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand">
                  <Brain className="w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Engineering Console</span>
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase italic">Modify <span className="ai-gradient-text">Neural Plan</span></h2>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Sidebar: Controls */}
              <div className="lg:col-span-5 p-10 border-r border-white/5 space-y-10">
                
                {/* 1. Goal Selector */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Training Directive</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {GOALS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGoal(g.id)}
                        className={cn(
                          "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300",
                          goal === g.id 
                            ? "bg-brand/10 border-brand/50 text-brand shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
                            : "bg-white/5 border-transparent text-muted hover:border-white/20"
                        )}
                      >
                        <g.icon className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-tight">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Muscle Map Mockup */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Neural Targeting</h3>
                    <span className="text-[10px] font-bold text-brand uppercase">Adaptive Heatmap</span>
                  </div>
                  <div className="premium-card p-6 grid grid-cols-2 gap-4 bg-white/[0.02]">
                    {MUSCLES.map((m) => (
                      <div key={m.id} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-muted">{m.label}</span>
                          <span>{m.intensity}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${m.intensity}%` }}
                            className={cn(
                              "h-full transition-colors",
                              m.intensity > 80 ? "bg-red-500" : m.intensity > 50 ? "bg-brand" : "bg-white/20"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Sliders */}
                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="flex justify-between">
                        <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Load Intensity</label>
                        <span className="text-xs font-bold text-brand">{intensity}/10</span>
                      </div>
                      <input 
                        type="range" min="1" max="10" step="1"
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value))}
                        className="w-full accent-brand h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between">
                        <label className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Volume Density</label>
                        <span className="text-xs font-bold text-brand">{volume}/10</span>
                      </div>
                      <input 
                        type="range" min="1" max="10" step="1"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="w-full accent-brand h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                   </div>
                </div>

                {/* AI Recommendations */}
                <div className="p-6 bg-brand/5 border border-brand/20 rounded-3xl space-y-3">
                   <div className="flex items-center gap-2 text-brand">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">AI Adaptation</span>
                   </div>
                   <p className="text-xs font-medium text-white/80 leading-relaxed italic">
                      "Current CNS readiness is {stats.cnsReadiness}%. Posterior chain overload detected—AI suggests reducing eccentric volume by 15% to maintain recovery window."
                   </p>
                </div>

              </div>

              {/* Right Sidebar: Plan Preview & Exercise Editor */}
              <div className="lg:col-span-7 flex flex-col bg-black/40">
                
                {/* Stats Bar */}
                <div className="p-8 border-b border-white/5 grid grid-cols-4 gap-4 bg-white/[0.01]">
                   {[
                     { label: 'Duration', val: `${duration}m`, icon: Clock },
                     { label: 'Neural Load', val: stats.neuralLoad, icon: Zap },
                     { label: 'Burn Est.', val: `${stats.calories} kcal`, icon: Flame },
                     { label: 'Rec. Window', val: stats.recovery, icon: RotateCcw },
                   ].map((s) => (
                     <div key={s.label} className="space-y-1">
                        <div className="flex items-center gap-2 text-muted">
                           <s.icon className="w-3 h-3" />
                           <span className="text-[9px] font-black uppercase tracking-widest">{s.label}</span>
                        </div>
                        <p className="text-sm font-black italic">{s.val}</p>
                     </div>
                   ))}
                </div>

                {/* Exercise List */}
                <div className="flex-1 p-8 space-y-4 overflow-y-auto no-scrollbar">
                   <div className="flex justify-between items-center px-2">
                      <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.3em]">Sequence Architecture</h3>
                      <button className="flex items-center gap-2 text-[10px] font-black text-brand uppercase tracking-widest hover:text-white transition-colors">
                         <Plus className="w-3 h-3" /> Add Movement
                      </button>
                   </div>

                   <div className="space-y-3">
                      {exercises.map((ex, i) => (
                        <motion.div
                          key={ex.id}
                          layout
                          className="premium-card p-4 flex items-center justify-between group bg-white/5 border-white/10 hover:border-brand/30 transition-all"
                        >
                           <div className="flex items-center gap-4">
                              <GripVertical className="w-4 h-4 text-muted/40 cursor-grab" />
                              <div>
                                 <h4 className="text-sm font-bold tracking-tight">{ex.name}</h4>
                                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{ex.sets} sets • {ex.reps} reps • {ex.load}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 rounded-lg bg-white/5 hover:bg-brand/20 text-brand transition-all">
                                 <RefreshCw className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeExercise(ex.id)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-500 transition-all"
                              >
                                 <Minus className="w-4 h-4" />
                              </button>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                </div>

                {/* Final Actions */}
                <div className="p-10 border-t border-white/5 flex gap-4">
                   <button 
                     onClick={handleGenerate}
                     disabled={isGenerating}
                     className="flex-1 h-16 rounded-3xl bg-white/5 border border-white/10 font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-3 overflow-hidden relative"
                   >
                      {isGenerating ? (
                        <>
                           <RefreshCw className="w-4 h-4 animate-spin text-brand" />
                           <span className="text-brand">Syncing Neural Core...</span>
                        </>
                      ) : (
                        <>
                           <RefreshCw className="w-4 h-4" />
                           Generate AI Variant
                        </>
                      )}
                      {isGenerating && (
                        <motion.div 
                          layoutId="gen-bar"
                          className="absolute bottom-0 left-0 h-1 bg-brand"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5 }}
                        />
                      )}
                   </button>
                   <button 
                     onClick={onClose}
                     className="px-10 h-16 rounded-3xl bg-brand text-white font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3"
                   >
                      <Save className="w-4 h-4" />
                      Apply Protocol
                   </button>
                </div>

              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
