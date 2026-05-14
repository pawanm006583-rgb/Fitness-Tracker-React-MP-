import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Dumbbell,
  Activity,
  Award,
  Zap,
  Calendar,
  Info,
  Sparkles,
  Flame,
  Camera
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../../utils/cn';

const weightData = [
  { label: 'Mon', value: 83.2 },
  { label: 'Tue', value: 82.9 },
  { label: 'Wed', value: 82.7 },
  { label: 'Thu', value: 82.8 },
  { label: 'Fri', value: 82.5 },
  { label: 'Sat', value: 82.4 },
  { label: 'Sun', value: 82.3 },
];

const fatData = [
  { label: 'W1', value: 16.2 },
  { label: 'W2', value: 15.8 },
  { label: 'W3', value: 15.4 },
  { label: 'W4', value: 15.0 },
  { label: 'W5', value: 14.6 },
  { label: 'W6', value: 14.2 },
];

const muscleHeatmap = [
  { muscle: 'Chest', value: 85, color: '#3b82f6' },
  { muscle: 'Back', value: 70, color: '#3b82f6' },
  { muscle: 'Quads', value: 90, color: '#3b82f6' },
  { muscle: 'Arms', value: 65, color: '#3b82f6' },
  { muscle: 'Shoulders', value: 75, color: '#3b82f6' },
];

const InsightChip = ({ icon: Icon, title, desc, color }: any) => (
  <div className="premium-card p-5 flex items-start gap-4 hover:border-brand/30 transition-all">
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="space-y-1">
      <h4 className="font-bold text-sm leading-tight">{title}</h4>
      <p className="text-[11px] text-muted leading-relaxed uppercase tracking-wider font-medium">{desc}</p>
    </div>
  </div>
);

export const BodyAnalytics = () => {
  const [activeMetric, setActiveMetric] = useState('weight');

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 pb-20">
      {/* Transformation Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Transformation Intelligence</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tighter leading-tight">
              Physiological <br />
              <span className="ai-gradient-text">Evolution</span>
            </h1>
            <p className="text-sm text-muted max-w-md leading-relaxed">
              Analyzing real-time biometric shifts to quantify your physical adaptation and metabolic resilience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Transformation Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">92</span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">+4.2%</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-brand shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Lean Mass Gain</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">2.4</span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">KG</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              </div>
            </div>
            <div className="space-y-1 hidden md:block">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Recovery Efficiency</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">88</span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Optimal</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-brand/20 to-violet-500/20 rounded-[40px] blur opacity-50 group-hover:opacity-100 transition-all" />
          <div className="relative premium-card h-full min-h-[300px] overflow-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="8" className="text-foreground/5" />
                <motion.circle 
                  cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="8" 
                  strokeDasharray="282.7" animate={{ strokeDashoffset: 282.7 - (282.7 * 84) / 100 }}
                  className="text-brand" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold tracking-tighter">84%</span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest mt-1">Goal Sync</span>
              </div>
            </div>
            <div className="mt-8 text-center space-y-1">
              <p className="text-lg font-bold">12 Days to Milestone</p>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Est. Completion: June 24, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Journey Slider */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Camera className="w-5 h-5 text-brand" /> Visual Journey
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 glass-panel rounded-full text-[10px] font-bold uppercase tracking-widest">Compare</button>
            <button className="px-4 py-1.5 bg-brand text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand/20">Upload</button>
          </div>
        </div>

        <div className="premium-card overflow-hidden bg-black relative group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src="/Users/pawansushilmiahra/.gemini/antigravity/brain/07958bdf-0a32-4896-b266-795082fc04a6/body_transformation_preview_1778602508650.png" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt="Before" />
              <div className="absolute bottom-6 left-6 px-4 py-2 glass-panel rounded-xl">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Week 1 • May 01</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src="/Users/pawansushilmiahra/.gemini/antigravity/brain/07958bdf-0a32-4896-b266-795082fc04a6/body_transformation_preview_1778602508650.png" className="w-full h-full object-cover transition-all duration-700" style={{ transform: 'scaleX(-1)' }} alt="After" />
              <div className="absolute bottom-6 left-6 px-4 py-2 glass-panel rounded-xl border-brand/50">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
                   Current • Week 6 <Sparkles className="w-3 h-3 text-brand" />
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/20 backdrop-blur-md z-10" />
        </div>
      </section>

      {/* Advanced Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 premium-card p-8 space-y-8 bg-gradient-to-b from-white/[0.01] to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex gap-6">
              {['weight', 'fat', 'muscle'].map(m => (
                <button 
                  key={m}
                  onClick={() => setActiveMetric(m)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest pb-2 border-b-2 transition-all",
                    activeMetric === m ? "text-brand border-brand" : "text-muted border-transparent"
                  )}
                >
                  {m} Trends
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Last 30 Days</span>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeMetric === 'weight' ? weightData : fatData}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--brand)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-foreground/5)" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10, fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10, fontWeight: 'bold' }} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--color-foreground/10)', borderRadius: '16px' }}
                  itemStyle={{ fontWeight: 'bold', fontSize: '12px', color: 'var(--foreground)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value"
                  stroke="var(--brand)" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorMetric)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest px-1">AI Intelligence</h3>
          <InsightChip icon={TrendingUp} title="Lean mass increased 2.4kg" desc="Hypertrophy trend optimized" color="bg-brand shadow-brand/20" />
          <InsightChip icon={Zap} title="Metabolic speed +12%" desc="Resting expenditure elevated" color="bg-amber-500 shadow-amber-500/20" />
          <InsightChip icon={Activity} title="Recovery efficiency improved" desc="Sleep latency reduction: 18m" color="bg-emerald-500 shadow-emerald-500/20" />
        </div>
      </section>

      {/* Muscle Heatmap & Composition */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="premium-card p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-brand" /> Muscle Load Dist.
            </h3>
            <Info className="w-4 h-4 text-muted" />
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={muscleHeatmap} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="muscle" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10, fontWeight: 'bold' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                  {muscleHeatmap.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.4} stroke={entry.color} strokeWidth={1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-muted text-center uppercase tracking-widest font-bold">Neural heatmap reflects cumulative volume over 7 days.</p>
        </div>

        <div className="premium-card p-8 space-y-8 bg-foreground/[0.01]">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" /> Recent Achievements
          </h3>
          <div className="space-y-4">
            {[
              { title: 'The Architect', desc: 'Gained 1kg of pure muscle mass.', xp: '+500', icon: Target },
              { title: 'Sleep Master', desc: '7 days of optimal recovery score.', xp: '+300', icon: Activity },
              { title: 'Consistent Core', desc: '15 day workout streak achieved.', xp: '+1000', icon: Flame },
            ].map((ach, i) => (
              <div key={i} className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:border-brand/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <ach.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{ach.title}</h5>
                    <p className="text-[10px] text-muted">{ach.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-brand">{ach.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="premium-card p-8 space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Transformation Timeline</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand animate-ping" />
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Neural Journey Syncing</span>
          </div>
        </div>

        <div className="relative pt-10 pb-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-foreground/5 -translate-y-1/2" />
          <div className="relative flex justify-between">
            {[
              { label: 'Week 1', date: 'May 01', status: 'completed' },
              { label: 'Week 2', date: 'May 08', status: 'completed' },
              { label: 'Week 4', date: 'May 22', status: 'completed' },
              { label: 'Week 6', date: 'June 05', status: 'active' },
              { label: 'Goal', date: 'June 24', status: 'pending' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className={cn(
                  "w-4 h-4 rounded-full relative z-10 border-4 border-bg-card transition-all duration-500",
                  step.status === 'completed' ? "bg-brand" : step.status === 'active' ? "bg-brand animate-pulse scale-150 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-foreground/20"
                )} />
                <div className="text-center">
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest", step.status === 'active' ? "text-brand" : "text-muted")}>{step.label}</p>
                  <p className="text-[8px] text-muted font-bold">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
