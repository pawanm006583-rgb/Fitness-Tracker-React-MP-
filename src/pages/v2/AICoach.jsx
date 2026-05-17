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
  TrendingUp,
  MessageSquare,
  Cpu
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { NeuralOrb } from '../../components/ui/NeuralOrb';
import neuralCoreImg from '../../assets/neural_core.png';

const COACH_PORTRAIT = neuralCoreImg;

const BiometricWave = ({ label, value, color }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-end">
      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{label}</span>
      <span className={cn("text-xs font-black italic", color)}>{value}</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.random() * 40 + 60}%` }}
        className={cn("h-full transition-all duration-1000", color.replace('text-', 'bg-'))}
      />
    </div>
  </div>
);

const IntelligenceChip = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-5 py-2.5 rounded-full os-glass text-[10px] font-black text-white/40 uppercase tracking-[0.2em] hover:text-brand hover:border-brand/40 transition-all active:scale-95 whitespace-nowrap"
  >
    {text}
  </button>
);

const ProtocolCard = ({ title, duration, intensity, color, onStart, img }) => (
  <div
    className="os-glass p-2 flex flex-col gap-4 group cursor-pointer hover:border-brand/30 transition-all rounded-[32px]"
    onClick={onStart}
  >
    <div className="relative aspect-[16/9] rounded-[26px] overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center shadow-2xl shadow-brand/40">
          <Play className="w-5 h-5 text-white fill-current translate-x-0.5" />
        </div>
      </div>
      <div className="absolute bottom-4 left-5">
        <p className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">{intensity}</p>
        <p className="text-lg font-black italic tracking-tighter uppercase">{title}</p>
      </div>
    </div>

    <div className="px-3 pb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-white/20" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{duration} MIN</span>
      </div>
      <span className="text-[10px] font-black text-white/60 uppercase tracking-widest group-hover:text-brand flex items-center gap-1 transition-colors">
        Begin Sync <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  </div>
);

export const AICoach = () => {
  const { chatHistory, addMessage, startWorkout, addNotification } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = (text) => {
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

  const handleStartSession = (title) => {
    startWorkout(title);
    addNotification("Neural Link Active", `Initializing ${title} optimization.`, "success");
  };

  const chips = [
    "Analyze CNS recovery",
    "Optimize volume",
    "Protein timing",
    "Fatigue report"
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20 px-4 md:px-8 pt-8">
      {/* Immersive Neural Header */}
      <header className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-brand">
            <Cpu className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">System Core . v4.28</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">AESTHER <span className="text-white/20">COACH</span></h1>
          <p className="text-lg text-white/40 max-w-sm font-medium leading-relaxed italic">"Peak potential is a data point waiting to be reached."</p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-brand/10 blur-[40px] rounded-full group-hover:bg-brand/20 transition-all" />
          <div className="relative w-40 h-40 md:w-48 md:h-48 os-glass p-1 rounded-full overflow-hidden">
            <img src={COACH_PORTRAIT} alt="AI Coach" className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-brand/10 mix-blend-overlay" />
            <div className="absolute inset-0 border-[6px] border-black/20 rounded-full" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-5 py-2 os-glass rounded-full flex items-center gap-2 whitespace-nowrap shadow-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Neural Core Online</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Intelligence Interface (Chat) */}
        <div className="lg:col-span-7 flex flex-col gap-8 h-[700px]">
          <div className="flex-1 os-glass overflow-hidden flex flex-col rounded-[40px] shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg-main via-transparent to-transparent z-10 pointer-events-none" />

            <div className="p-6 border-b border-white/5 flex items-center justify-between relative z-20 bg-bg-main/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-brand" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Neural Stream</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">Syncing Biometrics</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar relative z-0">
              <AnimatePresence initial={false}>
                {chatHistory.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col gap-3 max-w-[88%]",
                      msg.role === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "p-6 rounded-[32px] text-base leading-relaxed transition-all shadow-2xl",
                      msg.role === 'ai'
                        ? "os-glass border-white/10 text-white/90"
                        : "bg-brand text-white font-bold shadow-brand/20"
                    )}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-3">
                      {msg.role === 'ai' ? 'Neural Core Response' : 'Athlete Uplink'} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-2 p-3">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-2 bg-brand rounded-full"
                    />
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-2">
              {chips.map(c => (
                <IntelligenceChip key={c} text={c} onClick={() => handleSend(c)} />
              ))}
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-brand/20 rounded-[30px] blur-xl opacity-0 group-focus-within:opacity-100 transition-all duration-700" />
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Command the neural link..."
                  className="os-input py-6 pl-10 pr-20 rounded-[28px] text-lg"
                />
                <button
                  onClick={() => handleSend()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-brand text-white rounded-2xl shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group/btn"
                >
                  <Send className="w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Intelligence Dash */}
        <div className="lg:col-span-5 space-y-12">
          <section className="os-glass p-10 space-y-10 relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand/5 blur-[80px] rounded-full group-hover:bg-brand/10 transition-colors" />
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] flex items-center gap-3">
                <Activity className="w-5 h-5 text-brand" /> Live Biometrics
              </h3>
              <Wind className="w-5 h-5 text-brand/40 animate-pulse" />
            </div>

            <div className="space-y-8 relative z-10">
              <BiometricWave label="CNS System Recovery" value="92.4%" color="text-brand" />
              <BiometricWave label="Metabolic Adaptation" value="Linear Up" color="text-violet-400" />
              <BiometricWave label="Neural Fatigue" value="Minimal" color="text-emerald-400" />
            </div>

            <div className="pt-6 grid grid-cols-2 gap-8 relative z-10">
              <div className="p-6 os-glass-light rounded-[32px] space-y-2">
                <div className="flex items-center gap-3 text-emerald-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">State</span>
                </div>
                <p className="text-3xl font-black italic tracking-tighter">OPTIMAL</p>
              </div>
              <div className="p-6 os-glass-light rounded-[32px] space-y-2">
                <div className="flex items-center gap-3 text-amber-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Flux</span>
                </div>
                <p className="text-3xl font-black italic tracking-tighter">+8.2%</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.5em] px-4">Performance Protocols</h2>

            <div className="flex flex-col gap-6">
              <ProtocolCard
                title="Neural Hypertrophy"
                duration="45"
                intensity="STR / POWER"
                img="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80"
                onStart={() => handleStartSession("Neural Hypertrophy")}
              />
              <ProtocolCard
                title="Metabolic Resilience"
                duration="25"
                intensity="VO2 / COND"
                img="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80"
                onStart={() => handleStartSession("Metabolic Resilience")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
