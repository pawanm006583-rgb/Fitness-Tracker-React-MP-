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
  Sparkles
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

const MetricCard = ({ title, value, unit, icon: Icon, color, children, onAdd }: any) => (
  <div className="premium-card premium-card-hover p-5 space-y-4 relative group">
    <div className="flex items-center justify-between">
      <div className={cn("p-2 rounded-xl", color)}>
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
      {!onAdd && <ChevronRight className="w-4 h-4 text-muted" />}
    </div>
    <div>
      <p className="text-xs font-bold text-muted uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs font-bold text-muted">{unit}</span>
      </div>
    </div>
    {children}
  </div>
);

export const DashboardV2 = () => {
  const { caloriesBurned, waterIntake, addWater, recoveryScore, addNotification, openPlan } = useStore();

  const handleAddWater = () => {
    addWater(0.25);
    addNotification("Hydration Updated", "Added 250ml to your daily intake.", "success");
  };

  return (
    <div className="space-y-8 pb-10">
      <DailyPlanView />
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Daily Overview</h1>
          <p className="text-muted mt-1">Monday, May 11 • AESTHER AI is active</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="premium-card px-4 py-2 flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">Streak</p>
              <p className="text-sm font-bold">14 Days</p>
            </div>
          </div>
          <button 
            onClick={openPlan}
            className="premium-card px-6 py-2 bg-brand text-white font-bold flex items-center gap-2 shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4" /> Start Plan
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Activity & Insights */}
        <div className="lg:col-span-8 space-y-6">
          <div className="premium-card p-6 bg-gradient-to-br from-brand/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6 group cursor-pointer" onClick={openPlan}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Neural Recommendation</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Today's Hypertrophy Session</h2>
              <p className="text-muted text-sm max-w-sm">Targeting Posterior Chain & Core. Your recovery is optimal for high load volume today.</p>
              <div className="flex items-center gap-2 text-brand text-xs font-bold group-hover:translate-x-1 transition-transform">
                View Workout Plan <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">55</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">MIN</p>
              </div>
              <div className="w-px h-10 bg-border-subtle" />
              <div className="text-center">
                <p className="text-2xl font-bold">480</p>
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">KCAL</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="premium-card p-6 flex items-center gap-8">
              <ActivityRingsV2 />
              <div className="flex-1 space-y-5">
                {[
                  { label: 'Move', color: 'bg-brand', val: '85%', text: 'text-brand' },
                  { label: 'Exercise', color: 'bg-violet-500', val: '65%', text: 'text-violet-500' },
                  { label: 'Stand', color: 'bg-pink-500', val: '45%', text: 'text-pink-500' },
                ].map((r) => (
                  <div key={r.label} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={cn("text-xs font-bold uppercase tracking-widest", r.text)}>{r.label}</span>
                      <span className="text-xs font-bold text-muted">{r.val}</span>
                    </div>
                    <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: r.val }} className={cn("h-full", r.color)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-card p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-widest">Recovery Score</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-bold tracking-tighter">{recoveryScore}</span>
                  <span className="text-sm font-bold text-brand uppercase tracking-widest">Exceptional</span>
                </div>
              </div>
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      fill="url(#colorScore)" 
                      strokeWidth={2} 
                    />
                    <defs>
                      <linearGradient id="colorScore" x1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
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
        <div className="lg:col-span-4 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
            <MetricCard title="Total Burn" value={caloriesBurned} unit="KCAL" icon={Flame} color="bg-orange-500/20" />
            
            <MetricCard 
              title="Hydration" 
              value={waterIntake.toFixed(2)} 
              unit="LITERS" 
              icon={Droplets} 
              color="bg-brand/20"
              onAdd={handleAddWater}
            >
              <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden mt-4">
                <motion.div 
                  animate={{ width: `${(waterIntake / 3) * 100}%` }}
                  className="h-full bg-brand transition-all duration-500" 
                />
              </div>
            </MetricCard>

            <MetricCard title="Sleep" value="7.5" unit="HOURS" icon={Moon} color="bg-amber-500/20">
              <div className="flex items-center gap-1 mt-2">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={cn("h-4 flex-1 rounded-[2px]", i <= 5 ? "bg-amber-500" : "bg-foreground/5")} />
                ))}
              </div>
            </MetricCard>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="premium-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Metabolic Performance</h2>
            <p className="text-muted text-sm">Real-time calorie expenditure analysis</p>
          </div>
          <div className="flex gap-2">
            {['1D', '1W', '1M', '1Y'].map(t => (
              <button key={t} className={cn(
                "px-3 py-1 rounded-lg text-xs font-bold transition-colors",
                t === '1W' ? "bg-brand text-white" : "bg-foreground/5 text-muted hover:bg-foreground/10"
              )}>
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-card)', 
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                }}
                itemStyle={{ color: 'var(--foreground)', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: 'var(--bg-card)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
