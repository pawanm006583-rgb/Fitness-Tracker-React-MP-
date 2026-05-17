import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';
import { 
  Plus, 
  Search, 
  Clock, 
  Flame, 
  ChevronRight,
  TrendingUp,
  Apple,
  Coffee,
  Sun,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';

const macroData = [
  { name: 'Protein', value: 160, color: '#3b82f6' },
  { name: 'Carbs', value: 240, color: '#8b5cf6' },
  { name: 'Fats', value: 70, color: '#ec4899' },
];

const MealCard = ({ type, time, calories, macros, icon: Icon, color }) => (
  <div className="premium-card premium-card-hover p-4 flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-bold">{type}</h4>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1">
            <Clock className="w-3 h-3" /> {time}
          </span>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1">
            <Flame className="w-3 h-3" /> {calories} kcal
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex gap-2">
        {Object.entries(macros).map(([k, v]) => (
          <div key={k} className="text-center px-2 py-1 bg-foreground/5 rounded-lg">
            <p className="text-[8px] font-bold text-muted uppercase tracking-widest">{k}</p>
            <p className="text-[10px] font-bold">{v}g</p>
          </div>
        ))}
      </div>
      <ChevronRight className="w-5 h-5 text-muted group-hover:text-brand transition-colors" />
    </div>
  </div>
);

export const Nutrition = () => {
  const { addNotification } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMeal = () => {
    addNotification("Meal Added", "Breakfast session successfully logged.", "success");
    setIsAdding(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter">Nutrition Tracker</h1>
          <p className="text-muted mt-1">Fueling your neural performance.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="premium-card px-6 py-3 bg-brand text-white font-bold flex items-center gap-2 shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" /> Log Meal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Macros & Progress */}
        <div className="lg:col-span-4 space-y-6">
          <div className="premium-card p-8 flex flex-col items-center">
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold tracking-tighter tabular-nums">2,140</span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">KCAL REMAINING</span>
              </div>
            </div>
            
            <div className="w-full space-y-4 mt-6">
              {macroData.map((m) => (
                <div key={m.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                    <span className="text-sm font-bold text-muted">{m.name}</span>
                  </div>
                  <span className="text-sm font-bold">{m.value}g <span className="text-[10px] text-muted">/ 200g</span></span>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card p-6 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> AI Metabolism
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              "Your TDEE has increased by 150kcal based on today's high neural output. I've adjusted your carbohydrate targets to compensate."
            </p>
          </div>
        </div>

        {/* Meal History */}
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight px-1">Daily Log</h2>
            <div className="grid grid-cols-1 gap-3">
              <MealCard 
                type="Breakfast" 
                time="08:30 AM" 
                calories="450" 
                macros={{ p: 35, c: 50, f: 12 }} 
                icon={Apple} 
                color="bg-brand/20" 
              />
              <MealCard 
                type="Lunch" 
                time="01:15 PM" 
                calories="720" 
                macros={{ p: 55, c: 80, f: 22 }} 
                icon={Sun} 
                color="bg-violet-500/20" 
              />
              <MealCard 
                type="Snack" 
                time="04:45 PM" 
                calories="210" 
                macros={{ p: 20, c: 15, f: 5 }} 
                icon={Coffee} 
                color="bg-pink-500/20" 
              />
              <div className="premium-card p-8 border-dashed border-2 flex flex-col items-center justify-center gap-3 text-muted hover:text-brand hover:border-brand/30 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest">Log Dinner</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight px-1">Hydration Performance</h2>
            <div className="premium-card p-8 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Daily Target</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tighter">2.8</span>
                  <span className="text-lg font-bold text-muted">/ 3.5 L</span>
                </div>
              </div>
              <div className="flex gap-2">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className={cn(
                    "w-6 h-12 rounded-lg transition-all",
                    i <= 6 ? "bg-brand" : "bg-foreground/5"
                  )} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-bg-main/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="premium-card p-8 w-full max-w-lg space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold tracking-tighter">Log New Meal</h3>
                <button onClick={() => setIsAdding(false)} className="p-2 bg-foreground/5 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input placeholder="Search foods..." className="w-full bg-foreground/5 border border-border-subtle rounded-xl py-3 pl-10 pr-4" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={handleAddMeal} className="premium-card p-4 hover:border-brand/50 text-left">
                    <p className="font-bold">Oatmeal w/ Berries</p>
                    <p className="text-xs text-muted">320 kcal • 12g Protein</p>
                  </button>
                  <button onClick={handleAddMeal} className="premium-card p-4 hover:border-brand/50 text-left">
                    <p className="font-bold">Greek Yogurt Bowl</p>
                    <p className="text-xs text-muted">240 kcal • 24g Protein</p>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
