import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  Clock,
  Cpu,
  Layers
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

const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Mobility', 'Recovery'];

const EXERCISES = [
  { 
    title: "Barbell Back Squat", 
    category: "Legs • Compound", 
    difficulty: "Intermediate", 
    duration: "15", 
    calories: "120", 
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80",
    muscles: [1, 2, 3],
    equipment: 'Barbell',
    isRecommended: true
  },
  { 
    title: "Romanian Deadlift", 
    category: "Legs • Pull", 
    difficulty: "Intermediate", 
    duration: "12", 
    calories: "95", 
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80",
    muscles: [1, 2],
    equipment: 'Barbell'
  },
  { 
    title: "Dumbbell Bench Press", 
    category: "Chest • Push", 
    difficulty: "Beginner", 
    duration: "10", 
    calories: "85", 
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
    muscles: [1, 2, 3, 4],
    equipment: 'Dumbbell',
    isRecommended: true
  },
  { 
    title: "Pull-ups", 
    category: "Back • Skill", 
    difficulty: "Advanced", 
    duration: "8", 
    calories: "70", 
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80",
    muscles: [1, 2, 3],
    equipment: 'Bodyweight'
  },
  { 
    title: "Shoulder Press", 
    category: "Shoulders • Push", 
    difficulty: "Intermediate", 
    duration: "10", 
    calories: "80", 
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80",
    muscles: [1, 2],
    equipment: 'Barbell'
  }
];

export const TrainingEngine = () => {
  const { openPlan, workoutHistory, startWorkout } = useStore();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModifierOpen, setIsModifierOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartWorkout = (title) => {
    startWorkout(title || "Posterior Power Cycle");
    navigate('/session');
  };

  const filteredExercises = EXERCISES.filter(ex => 
    (selectedCategory === 'All' || ex.category.includes(selectedCategory)) &&
    ex.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20 px-4 md:px-8 pt-8">
      <DailyPlanView />
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-brand">
            <Cpu className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Neural Training Core</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">Command <span className="text-white/20">Center</span></h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Induction Cycle 12 . Bio-Sync Active</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="os-glass px-8 py-3.5 flex items-center gap-3 text-brand border-brand/30 font-black text-[10px] uppercase tracking-widest hover:bg-brand/10 transition-all">
            <Plus className="w-4 h-4" /> Generate Protocol
          </button>
          <button className="os-glass px-8 py-3.5 flex items-center gap-3 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest">
            <Download className="w-4 h-4" /> Export OS
          </button>
        </div>
      </div>

      {/* Hero AI Training Plan */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="os-glass p-1 relative overflow-hidden group rounded-[48px] shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative z-10 p-10 md:p-14 flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 rounded-full os-glass text-brand text-[9px] font-black uppercase tracking-[0.3em] border-brand/20 shadow-lg">
                  Neural Induction Protocol
                </span>
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Cycle Day 12 . 2026</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">
                Adaptive <span className="ai-gradient-text">Hypertrophy:</span><br />
                <span className="text-white/40">Posterior Power</span>
              </h2>
              <p className="text-white/40 text-xl font-medium leading-relaxed max-w-xl italic">
                "Your neural load capacity is optimized for high-intensity power output today. 
                Focus on explosive concentric movements and 3-second eccentric control."
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { label: 'Intensity', value: '8.4', unit: '/10', icon: Zap, color: 'text-brand' },
                { label: 'Duration', value: '55', unit: 'MIN', icon: Clock, color: 'text-emerald-500' },
                { label: 'Metabolic', value: '580', unit: 'KCAL', icon: Flame, color: 'text-orange-500' },
                { label: 'Recovery', value: 'PEAK', unit: '', icon: Award, color: 'text-emerald-500' },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-black italic tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-black text-white/20">{stat.unit}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStartWorkout()}
                className="px-12 py-6 rounded-[24px] bg-brand text-white font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-brand/40 group flex items-center gap-3"
              >
                Initiate Protocol <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <button 
                onClick={() => setIsModifierOpen(true)}
                className="px-12 py-6 rounded-[24px] os-glass font-black text-sm uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
              >
                Modify Sequence
              </button>
            </div>
          </div>
          
          <WorkoutModifier 
            isOpen={isModifierOpen} 
            onClose={() => setIsModifierOpen(false)} 
          />

          <div className="lg:w-96 space-y-8">
            <div className="os-glass p-8 space-y-8 relative overflow-hidden group/card">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/5 blur-[50px] rounded-full group-hover/card:bg-brand/10 transition-colors" />
              <h4 className="text-xs font-black text-white/20 uppercase tracking-[0.5em] flex items-center gap-3 relative z-10">
                <Target className="w-5 h-5 text-brand" /> Targeted Load
              </h4>
              <div className="space-y-6 relative z-10">
                {[
                  { name: 'Posterior Chain', pct: 85 },
                  { name: 'Core Stability', pct: 70 },
                  { name: 'Neuro-Drive', pct: 60 },
                  { name: 'Base Recovery', pct: 45 },
                ].map((m) => (
                  <div key={m.name} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
                      <span className="text-white/40">{m.name}</span>
                      <span className="text-brand italic">{m.pct}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${m.pct}%` }} 
                        className="h-full bg-brand shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] flex items-center gap-3">
                <Layers className="w-5 h-5 text-brand" /> Neural Load Monitor
              </h2>
              <div className="flex items-center gap-3 px-4 py-1.5 os-glass rounded-full">
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
                <span className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">Live Uplink</span>
              </div>
            </div>
            <ActiveTracker />
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em]">Induction Roadmap</h2>
              <div className="flex gap-2">
                <button className="p-3 rounded-2xl os-glass hover:bg-white/5 transition-all group">
                  <ChevronLeft className="w-5 h-5 text-white/20 group-hover:text-white" />
                </button>
                <button className="p-3 rounded-2xl os-glass hover:bg-white/5 transition-all group">
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white" />
                </button>
              </div>
            </div>
            
            <div className="os-glass p-2 rounded-[32px]">
              <div className="grid grid-cols-7 gap-3">
                {weeklyData.map((day, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-6 rounded-[28px] flex flex-col items-center gap-4 transition-all duration-500",
                      day.active ? "os-glass-light border-brand/40 shadow-xl" : "bg-white/[0.02] border border-transparent"
                    )}
                  >
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", day.active ? "text-brand" : "text-white/20")}>{day.day}</span>
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                      day.completed ? "bg-emerald-500/10 text-emerald-500" : day.active ? "bg-brand text-white shadow-2xl shadow-brand/40" : "bg-white/5 text-white/10"
                    )}>
                      {day.completed ? <Award className="w-6 h-6" /> : <Dumbbell className="w-6 h-6" />}
                    </div>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest truncate w-full text-center mt-1", day.active ? "text-white" : "text-white/20")}>
                      {day.focus}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Analytics & Insights */}
        <div className="lg:col-span-4 space-y-12">
          <section className="space-y-6">
            <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] px-2">Neural Intelligence</h2>
            <div className="space-y-4">
              {[
                { title: 'Peak Recovery', desc: 'Neural capacity is at 94% today.', icon: Sparkles, color: 'text-brand' },
                { title: 'Volume Milestone', desc: '12% increase in total tonnage.', icon: TrendingUp, color: 'text-violet-500' },
                { title: 'Sleep Quality', desc: 'REM cycles improved by 15m.', icon: Award, color: 'text-emerald-500' },
              ].map((insight, i) => (
                <div key={i} className="os-glass p-6 flex items-center gap-5 group cursor-pointer hover:border-brand/40 transition-all">
                  <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:scale-110", insight.color)}>
                    <insight.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase italic tracking-tight">{insight.title}</h4>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-tight mt-1">{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] px-2">Capacity Distribution</h2>
            <div className="os-glass p-10 h-72 relative group">
              <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData} layout="vertical" margin={{ left: -20 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 900 }} 
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                      {analyticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.4} stroke={entry.color} strokeWidth={2} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5 relative z-10">
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Adaptive Base</p>
                  <p className="text-3xl font-black italic tracking-tighter">94%</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-brand" />
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Exercise Library Preview - Netflix Style */}
      <section className="space-y-10 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">Training <span className="text-white/20">Database</span></h2>
            <p className="text-white/40 text-sm font-medium italic">"Netflix for elite human movement protocols."</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-brand/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movements..." 
                className="os-input py-4 pl-12 pr-6 rounded-2xl text-base w-72 md:w-96"
              />
            </div>
            <button className="p-4 rounded-2xl os-glass hover:bg-white/5 transition-all group">
              <Filter className="w-6 h-6 text-white/20 group-hover:text-brand transition-colors" />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all",
                selectedCategory === cat 
                  ? "bg-brand text-white shadow-2xl shadow-brand/40 scale-105" 
                  : "os-glass text-white/30 hover:text-white hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 -mx-4 px-8 scroll-smooth">
          {filteredExercises.map((ex, i) => (
            <ExerciseCard 
              key={i}
              {...ex}
              onClick={() => handleStartWorkout(ex.title)}
            />
          ))}
          {/* Trending Badge for extra flavor */}
          <div className="os-glass w-[320px] md:w-[380px] shrink-0 rounded-[40px] flex flex-col items-center justify-center p-10 border-dashed border-white/10 opacity-40 hover:opacity-100 transition-opacity group">
             <Plus className="w-10 h-10 text-white/20 group-hover:text-brand transition-colors mb-4" />
             <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] group-hover:text-white transition-colors">Request Protocol</p>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="space-y-8">
        <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] px-2">Uplink Session History</h2>
        <div className="space-y-4">
          {workoutHistory.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="os-glass p-8 flex items-center justify-between group cursor-pointer hover:bg-white/[0.03] transition-all rounded-[32px]"
            >
              <div className="flex items-center gap-10">
                <div className="text-center w-24">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  <p className="text-xl font-black italic tracking-tighter mt-1">{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
                </div>
                <div className="w-1.5 h-16 bg-white/5 rounded-full relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-brand transition-opacity duration-1000", i === 0 ? "opacity-100" : "opacity-20")} />
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <h4 className="text-2xl font-black tracking-tighter uppercase italic">{item.title}</h4>
                    {item.pr && (
                      <span className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/20">
                        <Award className="w-3.5 h-3.5" /> PR UNLOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-2 flex items-center gap-4">
                    <span>{item.duration} MIN</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{item.calories} KCAL BURN</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-emerald-500">PEAK RECOVERY</span>
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl os-glass flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all shadow-xl group-hover:shadow-brand/40">
                <ChevronRight className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
