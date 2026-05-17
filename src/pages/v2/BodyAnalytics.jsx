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
  Camera,
  Layers,
  Cpu
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

const HEATMAP_IMG = 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80';

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

const InsightChip = ({ icon: Icon, title, desc, color }) => (
  <div className="os-glass p-6 flex items-start gap-5 hover:border-brand/40 transition-all cursor-default">
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xl", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="space-y-1">
      <h4 className="font-black text-sm uppercase italic tracking-tight">{title}</h4>
      <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-black">{desc}</p>
    </div>
  </div>
);

export const BodyAnalytics = () => {
  const [activeMetric, setActiveMetric] = useState('weight');

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20 px-4 md:px-8 pt-8">
      {/* Transformation Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-brand">
              <Cpu className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Neural Morphology Sync</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase italic">
              Physiological <br />
              <span className="text-white/20">Evolution</span>
            </h1>
            <p className="text-lg text-white/40 max-w-lg leading-relaxed font-medium italic">
              "Analyzing real-time biometric shifts to quantify your physical adaptation and metabolic resilience."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Transformation Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic tracking-tighter">92</span>
                <span className="text-[10px] font-black text-brand uppercase tracking-widest">+4.2%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-brand shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Lean Mass Index</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic tracking-tighter">2.4</span>
                <span className="text-[10px] font-black text-white/30 uppercase">KG</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
              </div>
            </div>
            <div className="space-y-3 hidden md:block">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Metabolic State</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic tracking-tighter">88</span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">PEAK</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-1 bg-brand/10 rounded-[40px] blur-2xl group-hover:bg-brand/20 transition-all duration-700" />
          <div className="relative os-glass h-full min-h-[350px] overflow-hidden flex flex-col items-center justify-center p-10 rounded-[40px]">
             <img src={HEATMAP_IMG} alt="Neural Heatmap" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] opacity-40 group-hover:opacity-60 transition-all duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent z-10" />
             
             <div className="relative z-20 w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                <motion.circle 
                  cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="8" 
                  strokeDasharray="282.7" animate={{ strokeDashoffset: 282.7 - (282.7 * 84) / 100 }}
                  className="text-brand" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black italic tracking-tighter">84</span>
                <span className="text-[9px] font-black text-brand uppercase tracking-[0.4em] mt-1">Goal Sync</span>
              </div>
            </div>
            <div className="mt-8 text-center space-y-2 relative z-20">
              <p className="text-xl font-black italic uppercase tracking-tight">12 Days to Milestone</p>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Est. Completion: June 24, 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Journey Slider */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] flex items-center gap-3">
            <Camera className="w-5 h-5 text-brand" /> Visual Progression
          </h2>
          <div className="flex gap-4">
            <button className="px-6 py-2 os-glass rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">Compare</button>
            <button className="px-6 py-2 bg-brand text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all">Upload</button>
          </div>
        </div>

        <div className="os-glass overflow-hidden bg-black relative group rounded-[48px] p-1 border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 overflow-hidden rounded-[44px]">
            <div className="relative aspect-[4/5] overflow-hidden group/img">
              <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale-[0.8] transition-all duration-1000 group-hover/img:grayscale-[0.3] group-hover/img:scale-105" alt="Before" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 px-6 py-2.5 os-glass rounded-full border-white/20">
                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Week 01 . BASELINE</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden group/img">
              <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover/img:grayscale-0 group-hover/img:scale-105" alt="After" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 px-6 py-2.5 os-glass rounded-full border-brand/50">
                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                   Week 06 . EVOLVED <Sparkles className="w-3.5 h-3.5 text-brand" />
                </p>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/20 backdrop-blur-3xl z-10 hidden md:block" />
        </div>
      </section>

      {/* Advanced Analytics */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 os-glass p-10 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex gap-10">
              {['weight', 'fat', 'muscle'].map(m => (
                <button 
                  key={m}
                  onClick={() => setActiveMetric(m)}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.3em] pb-4 border-b-2 transition-all",
                    activeMetric === m ? "text-brand border-brand" : "text-white/20 border-transparent hover:text-white/40"
                  )}
                >
                  {m} Trends
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-white/20">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural History . 30D</span>
            </div>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeMetric === 'weight' ? weightData : fatData}>
                <defs>
                  <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 900 }} dy={15} />
                <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
                  itemStyle={{ fontWeight: 900, fontSize: '12px', color: 'var(--text-main)', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value"
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorMetric)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-2">Adaptive Insights</h3>
          <InsightChip icon={TrendingUp} title="Lean mass +2.4kg" desc="Neural baseline elevated" color="bg-brand/20 shadow-brand/10" />
          <InsightChip icon={Zap} title="Metabolic speed +12%" desc="Base expenditure protocol" color="bg-amber-500/20 shadow-amber-500/10" />
          <InsightChip icon={Activity} title="Efficiency improved" desc="Sleep latency down 18m" color="bg-emerald-500/20 shadow-emerald-500/10" />
        </div>
      </section>

      {/* Muscle Heatmap & Composition */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="os-glass p-10 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] flex items-center gap-3">
              <Layers className="w-5 h-5 text-brand" /> Load Distribution
            </h3>
            <Info className="w-4 h-4 text-white/20" />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={muscleHeatmap} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="muscle" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 900 }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
                  {muscleHeatmap.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.4} stroke={entry.color} strokeWidth={2} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9px] text-white/20 text-center uppercase tracking-[0.3em] font-black italic">Neural heatmap reflects cumulative adaptive volume over cycle 12.</p>
        </div>

        <div className="os-glass p-10 space-y-8 bg-white/[0.01]">
          <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-500" /> Milestone Feed
          </h3>
          <div className="space-y-4">
            {[
              { title: 'The Architect', desc: 'Gained 1kg of pure muscle mass.', xp: '+500', icon: Target },
              { title: 'Sleep Master', desc: '7 days of peak recovery score.', xp: '+300', icon: Activity },
              { title: 'Consistent Core', desc: '15 day workout streak achieved.', xp: '+1000', icon: Flame },
            ].map((ach, i) => (
              <div key={i} className="flex items-center justify-between p-5 os-glass-light rounded-[28px] hover:border-brand/40 transition-all cursor-pointer group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <ach.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-black text-sm uppercase italic">{ach.title}</h5>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-wider mt-0.5">{ach.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-brand tracking-widest">{ach.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
