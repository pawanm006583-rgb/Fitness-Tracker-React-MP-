import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Dumbbell, 
  ArrowRightCircle,
  Filter
} from 'lucide-react';
import { cn } from '../../utils/cn';

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

const exercises = [
  { name: 'Barbell Bench Press', muscle: 'Chest', level: 'Intermediate' },
  { name: 'Deadlift', muscle: 'Back', level: 'Advanced' },
  { name: 'Squat', muscle: 'Legs', level: 'Intermediate' },
  { name: 'Overhead Press', muscle: 'Shoulders', level: 'Intermediate' },
  { name: 'Pull-up', muscle: 'Back', level: 'Intermediate' },
  { name: 'Lunges', muscle: 'Legs', level: 'Beginner' },
  { name: 'Plank', muscle: 'Core', level: 'Beginner' },
];

export const ExerciseLibrary = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = exercises.filter(ex => 
    (activeTab === 'All' || ex.muscle === activeTab) &&
    ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-4 space-y-6">
      <header>
        <h1 className="text-[28px] font-bold tracking-tight">Library</h1>
        <p className="caption-text mt-1">Explore 240+ professional exercises.</p>
      </header>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
        <input 
          type="text" 
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#E5E5EA]/50 rounded-xl py-3 pl-11 pr-4 body-text outline-none focus:bg-[#E5E5EA] transition-all"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-blue">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
        {muscleGroups.map((group) => (
          <button
            key={group}
            onClick={() => setActiveTab(group)}
            className={cn(
              "px-4 py-2 rounded-full body-text font-semibold whitespace-nowrap transition-all",
              activeTab === group ? "bg-black text-white" : "bg-[#E5E5EA]/60 text-[#8E8E93] hover:bg-[#E5E5EA]"
            )}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.map((ex, i) => (
          <motion.div 
            key={ex.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="ios-card p-4 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] group-hover:text-brand-blue">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[15px] font-bold">{ex.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="caption-text bg-[#F2F2F7] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{ex.muscle}</span>
                  <span className="caption-text !text-[#C7C7CC]">•</span>
                  <span className="caption-text">{ex.level}</span>
                </div>
              </div>
            </div>
            <ArrowRightCircle className="w-6 h-6 text-[#C7C7CC] group-hover:text-brand-blue transition-colors" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
