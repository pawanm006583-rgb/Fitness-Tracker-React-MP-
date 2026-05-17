import { ActivityRings } from '../../components/ios/ActivityRings';
import { motion } from 'framer-motion';
import { 
  Heart,
  Footprints,
  ChevronRight,
  Droplets,
  Scale,
  Search
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';

import { UserAvatar } from '../../components/shared/UserAvatar';

const MetricCard = ({ 
  label, 
  value, 
  unit, 
  icon: Icon, 
  color, 
  accentColor,
  onClick
}) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="ios-card p-4 flex flex-col gap-3 group cursor-pointer"
  >
    <div className="flex items-center justify-between">
      <div className={cn("p-1.5 rounded-md", color)}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <ChevronRight className="w-4 h-4 text-[#C7C7CC]" />
    </div>
    <div>
      <p className="caption-text uppercase font-bold tracking-tight">{label}</p>
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className="text-[20px] font-bold">{value}</span>
        <span className="text-[13px] text-[#8E8E93] font-medium">{unit}</span>
      </div>
    </div>
    {/* Minimal Sparkline representation */}
    <div className="h-6 flex items-end gap-0.5">
      {[40, 60, 35, 70, 50, 80, 45, 90].map((h, i) => (
        <div 
          key={i} 
          style={{ height: `${h}%` }} 
          className={cn("flex-1 rounded-t-[1px]", accentColor)} 
        />
      ))}
    </div>
  </motion.div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="caption-text font-bold uppercase tracking-widest">Monday, May 11</p>
          <h1 className="text-[28px] font-bold tracking-tight">Summary</h1>
        </div>
        <UserAvatar size="custom" className="w-10 h-10" innerClassName="w-full h-full rounded-full border-none" />
      </header>

      {/* Activity Overview */}
      <section className="ios-card p-6 flex items-center gap-8">
        <ActivityRings />
        <div className="flex-1 space-y-4">
          <div className="space-y-0.5">
            <p className="caption-text !text-brand-red font-bold uppercase tracking-widest">Move</p>
            <div className="flex items-baseline gap-1">
              <span className="title-1">540</span>
              <span className="body-text text-[#8E8E93]">/ 600 kcal</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="caption-text !text-brand-green font-bold uppercase tracking-widest">Exercise</p>
            <div className="flex items-baseline gap-1">
              <span className="title-1">32</span>
              <span className="body-text text-[#8E8E93]">/ 30 min</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="caption-text !text-brand-blue font-bold uppercase tracking-widest">Stand</p>
            <div className="flex items-baseline gap-1">
              <span className="title-1">10</span>
              <span className="body-text text-[#8E8E93]">/ 12 hr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trends Grid */}
      <div>
        <h2 className="title-1 mb-3 px-1">Trends</h2>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            label="Heart Rate" 
            value="72" 
            unit="BPM" 
            icon={Heart} 
            color="bg-brand-red" 
            accentColor="bg-brand-red/20"
          />
          <MetricCard 
            label="Steps" 
            value="8,432" 
            unit="STEPS" 
            icon={Footprints} 
            color="bg-brand-green" 
            accentColor="bg-brand-green/20"
          />
          <MetricCard 
            label="Hydration" 
            value="1.5" 
            unit="LITERS" 
            icon={Droplets} 
            color="bg-brand-blue" 
            accentColor="bg-brand-blue/20"
            onClick={() => navigate('/hydration')}
          />
          <MetricCard 
            label="Weight" 
            value="82.4" 
            unit="KG" 
            icon={Scale} 
            color="bg-emerald-600" 
            accentColor="bg-emerald-600/20"
            onClick={() => navigate('/weight')}
          />
           <MetricCard 
            label="Library" 
            value="240+" 
            unit="EXERCISES" 
            icon={Search} 
            color="bg-purple-600" 
            accentColor="bg-purple-600/20"
            onClick={() => navigate('/library')}
          />
        </div>
      </div>
    </div>
  );
};
