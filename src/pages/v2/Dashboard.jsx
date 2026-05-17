import { motion } from 'framer-motion';
import { 
  ActivityRingsV2 
} from '../../components/ai/AIComponents';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  AreaChart,
  Area
} from 'recharts';
import { 
  Moon,
  Trophy,
  Zap,
  Droplets,
  Plus,
  Flame,
  ChevronRight,
  ArrowRight,
  Sparkles,
  PlayCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { DailyPlanView } from '../../components/training/DailyPlanView';

const trendData = [
  { day: 'Mon', score: 65, calories: 400 },
  { day: 'Tue', score: 72, calories: 520 },
  { day: 'Wed', score: 85, calories: 600 },
  { day: 'Thu', score: 78, calories: 480 },
  { day: 'Fri', score: 92, calories: 750 },
  { day: 'Sat', score: 88, calories: 700 },
  { day: 'Sun', score: 95, calories: 850 },
];

const MetricCard = ({ title, value, unit, icon: Icon, color, children, onAdd }) => (
  <div className="os-glass p-6 space-y-4 relative group">
    <div className="flex items-center justify-between">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", color)}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      {onAdd && (
        <button 
          onClick={onAdd}
          className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}
      {!onAdd && <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />}
    </div>
    <div>
      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-3xl font-black italic tracking-tighter">{value}</span>
        <span className="text-[10px] font-black text-white/30 uppercase">{unit}</span>
      </div>
    </div>
    {children}
  </div>
);

const WorkoutThumbnail = ({ title, time, type, img, onClick }) => (
  <div 
    onClick={onClick}
    className="relative os-glass p-1 rounded-[32px] overflow-hidden group cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
  >
    <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full os-glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayCircle className="w-5 h-5 text-brand" />
      </div>
      <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">{type}</p>
          <p className="text-lg font-black tracking-tighter uppercase italic leading-none">{title}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/60">
          <Clock className="w-3 h-3" />
          <span>{time}m</span>
        </div>
      </div>
    </div>
  </div>
);

export const DashboardV2 = () => {
  const { caloriesBurned, waterIntake, addWater, recoveryScore, addNotification, openPlan } = useStore();

  const handleAddWater = () => {
    addWater(0.25);
    addNotification("Hydration Updated", "Added 250ml to your daily intake.", "success");
  };

  return (
    <div className="space-y-12 pb-20 max-w-[1400px] mx-auto px-4 md:px-8 pt-8">
      <DailyPlanView />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Core Active</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">Athletic <span className="text-white/20">Overview</span></h1>
          <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Performance Protocol Alpha-28 . Cycle 12</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="os-glass px-6 py-3 flex items-center gap-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] leading-none">Streak</p>
              <p className="text-xl font-black italic tracking-tighter mt-1">14 <span className="text-[10px]">DAYS</span></p>
            </div>
          </div>
          <button 
            onClick={openPlan}
            className="os-button-primary px-10 h-14 shadow-2xl"
          >
            <Zap className="w-4 h-4" /> Start Plan
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Activity & Insights */}
        <div className="lg:col-span-8 space-y-10">
          
          <div className="space-y-6">
            <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.5em] px-2">Neural Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WorkoutThumbnail 
                title="Neural Hypertrophy" 
                type="STR / POWER" 
                time="55" 
                img="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" 
                onClick={openPlan}
              />
              <WorkoutThumbnail 
                title="Metabolic Resilience" 
                type="END / VO2" 
                time="32" 
                img="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80" 
                onClick={openPlan}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="os-glass p-8 flex items-center gap-10">
              <ActivityRingsV2 />
              <div className="flex-1 space-y-6">
                {[
                  { label: 'Move', color: 'bg-brand', val: '85%', text: 'text-brand' },
                  { label: 'Exercise', color: 'bg-violet-500', val: '65%', text: 'text-violet-500' },
                  { label: 'Stand', color: 'bg-pink-500', val: '45%', text: 'text-pink-500' },
                ].map((r) => (
                  <div key={r.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", r.text)}>{r.label}</span>
                      <span className="text-xs font-black italic">{r.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: r.val }} className={cn("h-full", r.color)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="os-glass p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-[50px] rounded-full group-hover:bg-brand/10 transition-colors" />
              <div className="relative z-10">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Recovery Score</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-6xl font-black italic tracking-tighter">{recoveryScore}</span>
                  <span className="text-xs font-black text-brand uppercase tracking-[0.3em]">Exceptional</span>
                </div>
              </div>
              <div className="h-24 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      fill="url(#colorScore)" 
                      strokeWidth={3} 
                    />
                    <defs>
                      <linearGradient id="colorScore" x1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metrics & Progress */}
        <div className="lg:col-span-4 space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
            <MetricCard title="Total Burn" value={caloriesBurned} unit="KCAL" icon={Flame} color="bg-orange-500/20" />
            
            <MetricCard 
              title="Hydration" 
              value={waterIntake.toFixed(2)} 
              unit="LITERS" 
              icon={Droplets} 
              color="bg-brand/20"
              onAdd={handleAddWater}
            >
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-4">
                <motion.div 
                  animate={{ width: `${(waterIntake / 3) * 100}%` }}
                  className="h-full bg-brand transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </MetricCard>

            <MetricCard title="Sleep" value="7.5" unit="HOURS" icon={Moon} color="bg-amber-500/20">
              <div className="flex items-center gap-1.5 mt-2">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={cn("h-6 flex-1 rounded-md transition-colors", i <= 5 ? "bg-amber-500" : "bg-white/5")} />
                ))}
              </div>
            </MetricCard>
          </div>

          <div className="os-glass p-8 space-y-6">
            <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.4em]">Neural Trends</h3>
            <div className="space-y-4">
              {[
                { label: 'Work Capacity', val: '+12%', color: 'text-brand' },
                { label: 'HRV Baseline', val: '+4ms', color: 'text-emerald-500' },
                { label: 'Sleep Quality', val: '94%', color: 'text-violet-500' },
              ].map(t => (
                <div key={t.label} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/60 uppercase">{t.label}</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={cn("w-3 h-3", t.color)} />
                    <span className={cn("text-xs font-black italic", t.color)}>{t.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="os-glass p-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Metabolic <span className="text-white/20">Flux</span></h2>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">AI-driven caloric expenditure analysis</p>
          </div>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '1Y'].map(t => (
              <button key={t} className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] transition-all",
                t === '1W' ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white"
              )}>
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 900 }} dy={15} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-card)', 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}
                itemStyle={{ color: 'var(--text-main)', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                cursor={{ stroke: 'rgba(59,130,246,0.2)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#3b82f6" 
                strokeWidth={5} 
                dot={{ r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: 'var(--bg-main)' }} 
                activeDot={{ r: 8, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
