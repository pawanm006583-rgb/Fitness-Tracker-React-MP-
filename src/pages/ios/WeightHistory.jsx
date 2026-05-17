import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { 
  ArrowDown, 
  Info,
  Calendar,
  Plus
} from 'lucide-react';

const weightData = [
  { val: 85.2 }, { val: 84.8 }, { val: 84.9 }, { val: 84.5 }, 
  { val: 84.2 }, { val: 83.8 }, { val: 84.0 }, { val: 83.5 },
  { val: 83.2 }, { val: 82.8 }, { val: 82.9 }, { val: 82.4 },
];

export const WeightHistory = () => {
  return (
    <div className="px-4 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-tight">Weight</h1>
        <button className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Main Weight Card */}
      <div className="ios-card p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="caption-text font-bold uppercase tracking-widest">Current Weight</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[48px] font-bold tracking-tighter">82.4</span>
              <span className="text-[20px] text-[#8E8E93] font-semibold">kg</span>
            </div>
            <div className="flex items-center gap-1.5 text-brand-green mt-1">
              <ArrowDown className="w-4 h-4" />
              <span className="body-text font-bold">-0.4kg since last week</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-brand-green/10 text-brand-green flex flex-col items-center">
            <span className="text-[15px] font-bold leading-none">24.2</span>
            <span className="caption-text !text-brand-green font-bold text-[9px] uppercase mt-1">Normal BMI</span>
          </div>
        </div>

        {/* Sparkline Chart */}
        <div className="h-24 w-full -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007AFF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="#007AFF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorWeight)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="ios-card p-4">
          <p className="caption-text font-bold uppercase tracking-widest mb-1">Body Fat</p>
          <p className="text-[20px] font-bold">18.4%</p>
          <p className="caption-text !text-brand-green mt-1 font-semibold">-1.2% this month</p>
        </div>
        <div className="ios-card p-4">
          <p className="caption-text font-bold uppercase tracking-widest mb-1">Muscle Mass</p>
          <p className="text-[20px] font-bold">64.2kg</p>
          <p className="caption-text !text-brand-blue mt-1 font-semibold">+0.5kg this month</p>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        <h2 className="title-1 px-1">History</h2>
        {[
          { date: 'May 10', weight: '82.4kg', change: '-0.4' },
          { date: 'May 03', weight: '82.8kg', change: '-0.2' },
          { date: 'Apr 26', weight: '83.0kg', change: '-0.5' },
        ].map((log, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.98 }}
            className="ios-card p-4 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[15px] font-bold">{log.date}</p>
                <p className="caption-text">Measured at 07:15 AM</p>
              </div>
            </div>
            <div className="text-right">
              <p className="body-text font-bold">{log.weight}</p>
              <p className="caption-text !text-brand-green font-bold">{log.change}kg</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="ios-card p-4 flex items-center gap-3 bg-[#F2F2F7]/50 border-none">
        <Info className="w-5 h-5 text-[#8E8E93] shrink-0" />
        <p className="caption-text leading-tight">
          Consistent morning measurements provide the most accurate data for long-term tracking.
        </p>
      </div>
    </div>
  );
};
