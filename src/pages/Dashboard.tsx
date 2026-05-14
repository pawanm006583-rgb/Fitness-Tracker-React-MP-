import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { 
  Flame, 
  Heart, 
  Brain,
  ChevronRight,
  Plus,
  Activity,
  ArrowUpRight,
  Calendar,
  MoreHorizontal,
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'performance', label: 'Performance' },
  { id: 'analytics', label: 'Analytics' },
];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Overview</h1>
          <p className="text-white/40 text-sm mt-1">Real-time health telemetry and AI coaching insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Calendar className="w-3.5 h-3.5" />
            Last 7 Days
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-3.5 h-3.5" />
            New Session
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-1.5 text-xs font-medium rounded-md transition-all relative",
              activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/60"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white/10 rounded-md z-[-1]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Insight - Asymmetric Spanning */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="bg-gradient-to-br from-bg-card to-bg-main">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Live AI Coaching</span>
                    </div>
                    <Badge variant="outline">Session optimization active</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <h2 className="text-3xl font-bold leading-tight max-w-lg">
                      Recovery complete. Your metabolism is primed for <span className="text-brand-accent italic">Peak Power</span>.
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xl">
                      Based on your HRV data from the last 24 hours and a 20% increase in baseline oxygen efficiency, today is the optimal window for a maximal effort squat session.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/20 uppercase font-bold">Recommended Load</span>
                        <span className="text-lg font-bold">145kg <span className="text-xs text-white/40 font-medium">@ RPE 8.5</span></span>
                      </div>
                      <div className="w-px h-10 bg-border-subtle" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/20 uppercase font-bold">Estimated Output</span>
                        <span className="text-lg font-bold">1,240 <span className="text-xs text-white/40 font-medium">kJ</span></span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-card bg-white/10 flex items-center justify-center overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                        </div>
                      ))}
                      <div className="w-6 h-6 rounded-full border-2 border-bg-card bg-white/5 flex items-center justify-center text-[8px] font-bold">
                        +12
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Start Session
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </CardFooter>
                </Card>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card hover>
                    <CardHeader>
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Metabolic Stress</span>
                      <ArrowUpRight className="w-4 h-4 text-white/20" />
                    </CardHeader>
                    <CardContent className="h-40 flex flex-col justify-end">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold">84</span>
                        <span className="text-sm text-emerald-400 font-bold">+12%</span>
                      </div>
                      <div className="flex items-end gap-1 h-12">
                        {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${h}%` }} 
                            className={cn(
                              "flex-1 rounded-t-sm transition-all duration-500",
                              i === 7 ? "bg-brand-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-white/5 group-hover:bg-white/10"
                            )} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card hover>
                    <CardHeader>
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Core Stability</span>
                      <MoreHorizontal className="w-4 h-4 text-white/20" />
                    </CardHeader>
                    <CardContent className="h-40 flex flex-col items-center justify-center text-center">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                          <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="251.2" strokeDashoffset="75.3" className="text-brand-accent transition-all duration-1000" />
                        </svg>
                        <span className="absolute text-xl font-bold">70%</span>
                      </div>
                      <p className="text-[10px] text-white/40 mt-4 uppercase font-bold tracking-widest">Target: 85%</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar/Context Cards */}
              <div className="lg:col-span-4 space-y-6">
                <Card border={false} className="bg-bg-hover/30">
                  <CardHeader className="border-none pb-0">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Recent Milestones</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { icon: Activity, title: 'Session consistency', desc: '14 day streak maintained', time: '1h ago', color: 'text-brand-accent' },
                      { icon: Flame, title: 'Caloric peak', desc: 'Highest output this month', time: '4h ago', color: 'text-orange-400' },
                      { icon: Heart, title: 'HR Recovery', desc: 'Efficiency increased by 4%', time: 'Yesterday', color: 'text-rose-400' },
                    ].map((m, i) => (
                      <div key={i} className="flex gap-4 group/item cursor-pointer">
                        <div className={cn("w-8 h-8 rounded border border-border-subtle bg-bg-card flex items-center justify-center shrink-0", m.color)}>
                          <m.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 border-b border-border-subtle pb-4 group-last/item:border-none">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold truncate group-hover/item:text-brand-accent transition-colors">{m.title}</p>
                            <span className="text-[9px] text-white/20 whitespace-nowrap">{m.time}</span>
                          </div>
                          <p className="text-[10px] text-white/40 mt-1">{m.desc}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="border-none bg-transparent">
                    <Button variant="ghost" size="sm" className="w-full text-[10px] uppercase tracking-widest">
                      View full log
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-brand-accent/5 border-brand-accent/20">
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-brand-accent">
                      <Brain className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">AI Agent Active</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed italic">
                      "I've noticed your sleep quality dropped slightly. Increasing magnesium recommendations for today's recovery cycle."
                    </p>
                    <Button variant="subtle" size="sm" className="w-full">Open Coach</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} hover>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-white/40" />
                        <span className="text-xs font-bold uppercase tracking-widest">Exercise {i}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                       <div className="h-32 bg-white/2 rounded animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
             </div>
          )}

          {activeTab === 'analytics' && (
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-border-subtle rounded-xl">
               <div className="text-center">
                 <Activity className="w-10 h-10 text-white/10 mx-auto mb-4" />
                 <p className="text-white/40 text-sm">Deep analytics loading...</p>
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* New Session Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Start New Session"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm">Create Workout</Button>
          </>
        }
      >
        <div className="space-y-6">
          <p className="text-sm text-white/60">Choose your focus for this session. AI will adjust intensity in real-time.</p>
          <div className="grid grid-cols-2 gap-4">
            {['Hypertrophy', 'Strength', 'Endurance', 'Mobility'].map(type => (
              <button 
                key={type}
                className="p-4 rounded-lg border border-border-subtle bg-white/2 hover:border-brand-accent hover:bg-brand-accent/5 transition-all text-left group"
              >
                <p className="text-sm font-bold group-hover:text-brand-accent transition-colors">{type}</p>
                <p className="text-[10px] text-white/30 mt-1">AI Optimized for today</p>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
