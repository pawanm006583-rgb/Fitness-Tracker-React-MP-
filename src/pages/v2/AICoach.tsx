import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Clock,
  Play,
  Send,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Brain,
  Wind,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { NeuralOrb } from '../../components/ui/NeuralOrb';

const BiometricWave = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{label}</span>
      <span className={cn("text-xs font-bold", color)}>{value}</span>
    </div>
    <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.random() * 40 + 60}%` }}
        className={cn("h-full transition-all duration-1000", color.replace('text-', 'bg-'))}
      />
    </div>
  </div>
);

const IntelligenceChip = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="px-4 py-2 rounded-full glass-panel text-[10px] font-bold text-muted uppercase tracking-widest hover:text-brand hover:border-brand/30 transition-all active:scale-95 whitespace-nowrap"
  >
    {text}
  </button>
);

const SessionCardV2 = ({ title, duration, intensity, color, onStart }: any) => (
  <div 
    className="premium-card p-5 flex flex-col gap-4 group cursor-pointer hover:border-brand/30 transition-all relative overflow-hidden" 
    onClick={onStart}
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Target className="w-16 h-16" />
    </div>
    
    <div className="flex items-center gap-4 relative z-10">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", color)}>
        <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
      </div>
      <div>
        <h4 className="font-bold text-lg leading-tight">{title}</h4>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {duration} MIN
          </span>
          <div className="w-1 h-1 rounded-full bg-muted/30" />
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> {intensity}
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between pt-2 mt-auto relative z-10">
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-bg-card bg-foreground/5" />
        ))}
        <div className="w-6 h-6 rounded-full border-2 border-bg-card bg-brand/10 flex items-center justify-center text-[8px] font-bold text-brand">
          +4k
        </div>
      </div>
      <span className="text-[10px] font-bold text-muted uppercase tracking-widest group-hover:text-brand flex items-center gap-1">
        Begin Optimization <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  </div>
);

export const AICoach = () => {
  const { chatHistory, addMessage, startWorkout, addNotification } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = (text?: string) => {
    const msgText = text || input;
    if (!msgText.trim()) return;
    
    addMessage(msgText, 'user');
    setInput('');
    setIsTyping(true);
    
    // Simulate Intelligent Response
    setTimeout(() => {
      const responses = [
        "CNS recovery is elevated today. Prioritize explosive compound movements early in the session.",
        "Bio-rhythm analysis suggests a high-density metabolic window at 18:00. Optimal for glycogen depletion.",
        "Mechanical tension is the primary stimulus needed for adaptation today. Increasing volume on primary lifts.",
        "Heart rate variability (HRV) is trending upward. System capacity can handle extreme intensity protocols."
      ];
      addMessage(responses[Math.floor(Math.random() * responses.length)], 'ai');
      setIsTyping(false);
    }, 1500);
  };

  const handleStartSession = (title: string) => {
    startWorkout(title);
    addNotification("Neural Link Active", `Initializing ${title} optimization.`, "success");
  };

  const chips = [
    "Analyze CNS recovery",
    "Optimize today's volume",
    "Protein timing advice",
    "Neural fatigue report"
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 pb-20">
      {/* Immersive Neural Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-brand">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Neural Link v4.28</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter">AESTHER <span className="ai-gradient-text">Core</span></h1>
          <p className="text-sm text-muted max-w-sm">Invisible intelligence optimizing your performance architecture in real time.</p>
        </div>

        <div className="relative">
          <NeuralOrb size="lg" active={isTyping} />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 glass-panel rounded-full flex items-center gap-2 whitespace-nowrap">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">System Balanced</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Intelligence Interface (Chat) */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-[650px]">
          <div className="flex-1 premium-card bg-foreground/[0.01] overflow-hidden flex flex-col border-white/5 shadow-2xl">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Brain className="w-4 h-4 text-brand" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Intelligence Stream</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand" />
                <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Live Optimization</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              <AnimatePresence initial={false}>
                {chatHistory.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col gap-2 max-w-[85%]",
                      msg.role === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "p-5 rounded-[24px] text-sm leading-relaxed transition-all",
                      msg.role === 'ai' 
                        ? "bg-foreground/[0.03] border border-white/5 shadow-sm text-white/90" 
                        : "bg-brand text-white font-semibold shadow-xl shadow-brand/20"
                    )}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest px-2">
                      {msg.role === 'ai' ? 'Neural Response' : 'User Uplink'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-1.5 p-2">
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-brand rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand rounded-full" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {chips.map(c => (
                <IntelligenceChip key={c} text={c} onClick={() => handleSend(c)} />
              ))}
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand/20 to-violet-500/20 rounded-[22px] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Command neural link..." 
                  className="w-full bg-bg-card border border-white/5 rounded-[22px] py-5 pl-8 pr-16 focus:outline-none focus:border-brand/40 transition-all shadow-2xl text-base placeholder:text-muted/50"
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand text-white rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Intelligence Dash */}
        <div className="lg:col-span-5 space-y-10">
          <section className="premium-card p-8 space-y-8 bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand" /> Biometric Analysis
              </h3>
              <Wind className="w-4 h-4 text-brand/40 animate-pulse" />
            </div>
            
            <div className="space-y-6">
              <BiometricWave label="CNS Recovery" value="92%" color="text-brand" />
              <BiometricWave label="Metabolic Flux" value="High" color="text-violet-400" />
              <BiometricWave label="Neural Fatigue" value="18%" color="text-pink-400" />
            </div>

            <div className="pt-4 grid grid-cols-2 gap-6">
              <div className="p-4 glass-panel rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-emerald-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Ready State</span>
                </div>
                <p className="text-xl font-bold">Optimal</p>
              </div>
              <div className="p-4 glass-panel rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-amber-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Adaptation</span>
                </div>
                <p className="text-xl font-bold">Linear</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand" /> Performance Protocols
              </h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <SessionCardV2 
                title="Neural Hypertrophy" 
                duration="45" 
                intensity="High Density" 
                color="bg-brand shadow-brand/20" 
                onStart={() => handleStartSession("Neural Hypertrophy")}
              />
              <SessionCardV2 
                title="Metabolic Resilience" 
                duration="25" 
                intensity="Extreme Output" 
                color="bg-rose-500 shadow-rose-500/20" 
                onStart={() => handleStartSession("Metabolic Resilience")}
              />
              <SessionCardV2 
                title="Neuro-Recuperation" 
                duration="15" 
                intensity="Parasympathetic" 
                color="bg-emerald-500 shadow-emerald-500/20" 
                onStart={() => handleStartSession("Neuro-Recuperation")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
