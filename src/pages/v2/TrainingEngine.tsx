import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Search, 
  Filter, 
  Dumbbell, 
  Target, 
  TrendingUp,
  Award,
  Plus,
  Download,
  Flame,
  ArrowUpRight,
  ChevronLeft,
  Clock
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ExerciseCard } from '../../components/training/ExerciseCard';
import { ActiveTracker } from '../../components/training/ActiveTracker';
import { DailyPlanView } from '../../components/training/DailyPlanView';
import { useStore } from '../../store/useStore';
import { WorkoutModifier } from '../../components/training/WorkoutModifier';

const weeklyData = [
  { day: 'Mon', completed: true, focus: 'Legs' },
  { day: 'Tue', completed: true, focus: 'Push' },
  { day: 'Wed', completed: false, focus: 'Rest', active: true },
  { day: 'Thu', completed: false, focus: 'Pull' },
  { day: 'Fri', completed: false, focus: 'Legs' },
  { day: 'Sat', completed: false, focus: 'Upper' },
  { day: 'Sun', completed: false, focus: 'HIIT' },
];

const analyticsData = [
  { name: 'Strength', value: 85, color: '#3b82f6' },
  { name: 'Endurance', value: 65, color: '#8b5cf6' },
  { name: 'Mobility', value: 45, color: '#10b981' },
  { name: 'Power', value: 75, color: '#f59e0b' },
];

const categories = ['Chest', 'Back', 'Legs', 'Shoulders', 'Cardio', 'HIIT', 'Mobility'];

export const TrainingEngine = () => {
  const { openPlan, workoutHistory } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('Chest');
  const [isModifierOpen, setIsModifierOpen] = useState(false);

  return (
    <div className="space-y-12 pb-20">
      <DailyPlanView />
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-brand mb-1">
            <Zap className="w-5 h-5 fill-current" />
            <span className="text-sm font-bold uppercase tracking-widest">AESTHER Neural Engine</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter">Training Command</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="premium-card px-5 py-3 flex items-center gap-2 bg-brand/10 border-brand/20 text-brand font-bold hover:bg-brand/20 transition-all">
            <Plus className="w-4 h-4" /> AI Generator
          </button>
          <button className="premium-card px-5 py-3 flex items-center gap-2 hover:bg-white/5 transition-all">
            <Download className="w-4 h-4" /> Offline Plan
          </button>
        </div>
      </div>

      {/* Hero AI Training Plan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card p-1 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative z-10 p-8 md:p-10 flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest border border-brand/20">
                  Daily Neural Plan
                </span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">May 12, 2026</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter max-w-xl leading-none">
                Functional Hypertrophy: <span className="ai-gradient-text text-brand">Posterior Power</span>
              </h2>
              <p className="text-muted leading-relaxed max-w-lg">
                Your neural load capacity is optimized for high-intensity power output today. 
                Focus on explosive concentric movements and 3-second eccentric control.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Intensity', value: '8/10', icon: Zap, color: 'text-brand' },
                { label: 'Time', value: '55m', icon: Clock, color: 'text-emerald-500' },
                { label: 'Est. Burn', value: '580', icon: Flame, color: 'text-orange-500' },
                { label: 'Recovery', value: 'High', icon: Award, color: 'text-emerald-500' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <stat.icon className={cn("w-3.5 h-3.5", stat.color)} />
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={openPlan}
                className="px-8 py-4 rounded-2xl bg-brand text-white font-bold shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all"
              >
                View Today’s Plan
              </button>
              <button 
                onClick={() => setIsModifierOpen(true)}
                className="px-8 py-4 rounded-2xl bg-foreground/5 font-bold hover:bg-foreground/10 transition-all"
              >
                Modify Plan
              </button>
            </div>
          </div>
          
          <WorkoutModifier 
            isOpen={isModifierOpen} 
            onClose={() => setIsModifierOpen(false)} 
          />

          <div className="lg:w-80 space-y-6">
            <div className="premium-card bg-foreground/[0.02] p-6 space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Target className="w-4 h-4 text-brand" /> Target Groups
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Hamstrings', pct: 85 },
                  { name: 'Glutes', pct: 70 },
                  { name: 'Lower Back', pct: 60 },
                  { name: 'Core', pct: 45 },
                ].map((m) => (
                  <div key={m.name} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-muted">{m.name}</span>
                      <span>{m.pct}%</span>
                    </div>
                    <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${m.pct}%` }} 
                        className="h-full bg-brand" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Session & Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold tracking-tight">Active Workout Monitor</h2>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-brand uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse" /> Live Session
              </span>
            </div>
            <ActiveTracker />
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold tracking-tight">Weekly Roadmap</h2>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="premium-card p-2">
              <div className="grid grid-cols-7 gap-2">
                {weeklyData.map((day, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "p-4 rounded-xl flex flex-col items-center gap-3 transition-all",
                      day.active ? "bg-brand/10 border border-brand/20" : "bg-foreground/[0.02] border border-transparent"
                    )}
                  >
                    <span className={cn("text-xs font-bold", day.active ? "text-brand" : "text-muted")}>{day.day}</span>
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      day.completed ? "bg-emerald-500/10 text-emerald-500" : day.active ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-foreground/5 text-muted/30"
                    )}>
                      {day.completed ? <Award className="w-5 h-5" /> : <Dumbbell className="w-5 h-5" />}
                    </div>
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest truncate w-full text-center", day.active ? "text-brand" : "text-muted/60")}>
                      {day.focus}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Analytics & Insights */}
        <div className="lg:col-span-4 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight px-1">Neural Insights</h2>
            <div className="space-y-3">
              {[
                { title: 'Peak Recovery', desc: 'Neural capacity is at 94% today.', icon: Sparkles, color: 'text-brand' },
                { title: 'Volume Milestone', desc: '12% increase in total tonnage.', icon: TrendingUp, color: 'text-violet-500' },
                { title: 'Sleep Quality', desc: 'REM cycles improved by 15m.', icon: Award, color: 'text-emerald-500' },
              ].map((insight, i) => (
                <div key={i} className="premium-card p-4 flex items-center gap-4 group cursor-pointer hover:bg-foreground/5 transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center transition-colors group-hover:scale-110", insight.color)}>
                    <insight.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{insight.title}</h4>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-tight">{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight px-1">Load Distribution</h2>
            <div className="premium-card p-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData} layout="vertical" margin={{ left: -20 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--muted)', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {analyticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.3} stroke={entry.color} strokeWidth={1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-subtle">
                <div>
                  <p className="text-xs font-bold text-muted uppercase tracking-widest">Consistency</p>
                  <p className="text-lg font-bold">94%</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-brand" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Exercise Library Preview */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Exercise Library</h2>
            <p className="text-muted text-sm">Discover and filter movements from the neural database.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Search database..." 
                className="bg-foreground/5 border border-border-subtle rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand/50 transition-colors w-64"
              />
            </div>
            <button className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-all">
              <Filter className="w-5 h-5 text-muted" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                selectedCategory === cat 
                  ? "bg-brand text-white shadow-lg shadow-brand/20" 
                  : "bg-foreground/5 text-muted hover:bg-foreground/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4">
          <ExerciseCard 
            title="Barbell Back Squat" 
            category="Legs • Compound" 
            difficulty="Intermediate" 
            duration="15" 
            calories="120" 
          />
          <ExerciseCard 
            title="Romanian Deadlift" 
            category="Legs • Pull" 
            difficulty="Intermediate" 
            duration="12" 
            calories="95" 
          />
          <ExerciseCard 
            title="Walking Lunges" 
            category="Legs • Unilateral" 
            difficulty="Beginner" 
            duration="10" 
            calories="80" 
          />
          <ExerciseCard 
            title="Pistol Squats" 
            category="Legs • Skills" 
            difficulty="Advanced" 
            duration="8" 
            calories="70" 
          />
          <ExerciseCard 
            title="Leg Press" 
            category="Legs • Machine" 
            difficulty="Beginner" 
            duration="12" 
            calories="110" 
          />
        </div>
      </section>

      {/* History Timeline */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight px-1">Session History</h2>
        <div className="space-y-4">
          {workoutHistory.map((item, i) => (
            <div key={i} className="premium-card p-5 flex items-center justify-between group cursor-pointer hover:bg-foreground/5 transition-all">
              <div className="flex items-center gap-6">
                <div className="text-center w-24">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="w-1.5 h-12 bg-foreground/5 rounded-full relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-brand", i === 0 ? "opacity-100" : "opacity-20")} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{item.title}</h4>
                    {item.pr && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                        <Award className="w-3 h-3" /> PR Achieved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted font-bold uppercase tracking-widest mt-1">{item.duration} • {item.calories} kcal</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
