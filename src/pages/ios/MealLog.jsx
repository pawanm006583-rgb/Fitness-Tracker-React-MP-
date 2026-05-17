import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { 
  Plus, 
  ChevronRight,
  Flame,
  UtensilsCrossed,
  Clock
} from 'lucide-react';

const macroData = [
  { name: 'Protein', value: 30, color: '#FF2D55' },
  { name: 'Carbs', value: 45, color: '#34C759' },
  { name: 'Fats', value: 25, color: '#007AFF' },
];

export const MealLog = () => {
  return (
    <div className="px-4 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold tracking-tight">Nutrition</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#E5E5EA] rounded-full">
          <Flame className="w-4 h-4 text-orange-500 fill-current" />
          <span className="body-text font-bold">1,840 / 2,400</span>
        </div>
      </header>

      {/* Macro Card */}
      <div className="ios-card p-6 flex items-center justify-between">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                innerRadius={35}
                outerRadius={50}
                paddingAngle={4}
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="body-text font-bold leading-none">160g</span>
            <span className="caption-text !text-[9px] uppercase font-bold">Protein</span>
          </div>
        </div>
        <div className="flex-1 ml-6 space-y-3">
          {macroData.map((macro) => (
            <div key={macro.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: macro.color }} />
                <span className="body-text font-medium">{macro.name}</span>
              </div>
              <span className="body-text font-bold">{macro.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-3">
        {[
          { label: 'Breakfast', time: '08:30 AM', cal: '540', items: 'Oatmeal, Eggs, Blueberries' },
          { label: 'Lunch', time: '12:45 PM', cal: '720', items: 'Grilled Chicken, Rice, Broccoli' },
          { label: 'Dinner', time: 'Pending', cal: '0', items: 'Add items...' },
        ].map((meal, i) => (
          <motion.div 
            key={i}
            whileTap={{ scale: 0.98 }}
            className="ios-card p-4 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] group-hover:text-brand-blue">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[15px] font-bold">{meal.label}</p>
                <p className="caption-text mt-0.5">{meal.items}</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="body-text font-bold">{meal.cal} <span className="text-[11px] text-[#8E8E93] font-medium tracking-tight">kcal</span></span>
                <span className="caption-text flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {meal.time}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
            </div>
          </motion.div>
        ))}

        <div className="dashed-item p-4 h-16 cursor-pointer group mt-4">
          <div className="flex items-center gap-2 text-[#8E8E93] group-hover:text-brand-blue">
            <Plus className="w-5 h-5" />
            <span className="body-text font-semibold">Log Water or Snack</span>
          </div>
        </div>
      </div>
    </div>
  );
};
