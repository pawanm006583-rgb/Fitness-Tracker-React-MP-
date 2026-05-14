import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { 
  Target, 
  CheckCircle2, 
  Circle,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../utils/cn';

const progressData = [
  { day: 'Mon', value: 85 },
  { day: 'Tue', value: 87 },
  { day: 'Wed', value: 84 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 91 },
  { day: 'Sat', value: 89 },
  { day: 'Sun', value: 92 },
];

export const GoalProgress = () => {
  return (
    <div className="px-4 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-tight">Goals</h1>
        <button className="text-brand-blue font-semibold text-[17px]">Edit</button>
      </header>

      {/* Main Progress Chart */}
      <div className="ios-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="caption-text font-bold uppercase tracking-widest">Weight Loss Journey</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[24px] font-bold">82.4</span>
              <span className="text-[13px] text-brand-green font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> -1.2kg
              </span>
            </div>
          </div>
          <Target className="w-8 h-8 text-brand-blue/20" />
        </div>
        
        <div className="h-48 w-full -ml-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#8E8E93' }} 
                dy={10}
              />
              <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#007AFF" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#007AFF', strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-3">
        <h2 className="title-1 px-1">Milestones</h2>
        {[
          { label: 'Initial Baseline', date: 'May 01', completed: true },
          { label: 'First 5kg Lost', date: 'May 10', completed: true },
          { label: 'Consistency Streak: 14 Days', date: 'In Progress', completed: false },
          { label: 'Target Weight: 75kg', date: 'Est. June 20', completed: false },
        ].map((milestone, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.98 }}
            className="ios-card p-4 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                milestone.completed ? "bg-brand-green/10 text-brand-green" : "bg-[#F2F2F7] text-[#C7C7CC]"
              )}>
                {milestone.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
              </div>
              <div>
                <p className={cn("text-[15px] font-bold", !milestone.completed && "text-[#8E8E93]")}>
                  {milestone.label}
                </p>
                <p className="caption-text mt-0.5">{milestone.date}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
