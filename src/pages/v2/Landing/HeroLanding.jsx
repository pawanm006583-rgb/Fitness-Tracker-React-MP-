import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Target, 
  Activity,
  ChevronDown,
  Brain,
  Dumbbell,
  Scale,
  Wifi,
  Star,
  Shield,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';
import { Hero3D } from './Hero3D';
import { CinematicModal } from './CinematicModal';
import { Logo, Wordmark } from '../../../components/layout/Logo';
import { cn } from '../../../utils/cn';

const BG_IMAGE = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80';

const SectionHeader = ({ title, highlight, subtitle }) => (
  <div className="space-y-4 text-center mb-20">
    <div className="flex items-center justify-center gap-2 text-brand">
      <Sparkles className="w-4 h-4" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Specification</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">
      {title} <span className="ai-gradient-text">{highlight}</span>
    </h2>
    <p className="text-muted text-sm md:text-base font-medium max-w-md mx-auto opacity-70">
      {subtitle}
    </p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="os-glass p-8 space-y-6 hover:border-brand/30 transition-all group cursor-default"
  >
    <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className="w-7 h-7 text-brand" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold italic uppercase tracking-tight">{title}</h3>
      <p className="text-xs text-muted leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

export const HeroLanding = () => {
  const navigate = useNavigate();
  const [isCinematicOpen, setIsCinematicOpen] = useState(false);
  const scrollContainer = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollContainer });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={scrollContainer} className="relative bg-[#020203] text-white selection:bg-brand/30 no-scrollbar">
      <CinematicModal isOpen={isCinematicOpen} onClose={() => setIsCinematicOpen(false)} />

      {/* ── HERO SECTION ── */}
      <section className="relative h-[110vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic Background Layer */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale-[0.2] contrast-[1.1]"
            style={{ 
              backgroundImage: `url(${BG_IMAGE})`,
            }}
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020203] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-0" />
        </motion.div>
        
        {/* 3D Scene Layer (Optional/Layered) */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay">
          <Hero3D />
        </motion.div>

        {/* Top Branding */}
        <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[1400px] h-16 px-10 flex justify-between items-center os-glass rounded-full">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <Wordmark className="text-white scale-90 origin-left" />
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Training', 'Neural OS', 'Science', 'Elite'].map(item => (
              <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <button 
            onClick={() => navigate('/auth')}
            className="px-6 py-2.5 bg-brand text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)]"
          >
            Access Portal
          </button>
        </header>

        {/* Hero Content */}
        <main className="relative z-20 w-full max-w-[1400px] px-10 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl space-y-10"
          >
            <div className="flex items-center gap-3 text-brand">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-black uppercase tracking-[0.5em]">Neural Performance OS v2.4</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter uppercase italic leading-[0.85]">
              TRAIN <span className="ai-gradient-text">SMARTER</span><br />
              EVOLVE <span className="text-white/20">DAILY</span>
            </h1>

            <p className="max-w-xl text-white/50 text-xl md:text-2xl font-medium leading-relaxed">
              Real-time biometric intelligence.<br />
              Adaptive neural training protocols.<br />
              <span className="text-white">Designed for the 0.01%.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/auth')}
                className="px-12 py-6 bg-brand text-white rounded-full font-black text-sm uppercase tracking-[0.3em] flex items-center gap-4 shadow-[0_20px_40px_rgba(59,130,246,0.4)] group"
              >
                Initiate Induction <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <button 
                onClick={() => setIsCinematicOpen(true)}
                className="flex items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-full os-glass flex items-center justify-center group-hover:scale-110 transition-all border-white/20">
                  <PlayCircle className="w-6 h-6 text-white group-hover:text-brand transition-colors" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Watch Concept</p>
                  <p className="text-xs font-bold uppercase tracking-widest">Neural Sync . 01</p>
                </div>
              </button>
            </div>
          </motion.div>
        </main>

        {/* Scroll Indicator */}
        <motion.button 
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-white/20 hover:text-brand transition-colors group"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Explore Systems</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
        </motion.button>
      </section>

      {/* ── SECTION A: AI INTELLIGENCE ── */}
      <section className="relative py-40 px-10 max-w-[1400px] mx-auto">
        <SectionHeader 
          title="Neural" 
          highlight="Synthesis" 
          subtitle="AESTHER processes 4,000+ biometric data points per second to adapt your training environment in real-time." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Brain} 
            title="Cognitive Load" 
            desc="Tracking neurological fatigue to optimize rep-range efficiency and recovery windows." 
            delay={0.1}
          />
          <FeatureCard 
            icon={Activity} 
            title="HRV Synthesis" 
            desc="Automatic strain adjustment based on heart rate variability and sleep latency data." 
            delay={0.2}
          />
          <FeatureCard 
            icon={Shield} 
            title="Recovery Guard" 
            desc="AI-driven injury prevention system monitoring movement velocity and form breakdown." 
            delay={0.3}
          />
        </div>
      </section>

      {/* ── SECTION B: THE SYSTEM (With real imagery) ── */}
      <section className="relative py-40 bg-[#050507] border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs font-black text-brand uppercase tracking-[0.4em]">Protocol 01: Adaptive Engine</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
                EVOLVE AT THE <br />
                <span className="ai-gradient-text">SPEED OF THOUGHT</span>
              </h2>
            </div>
            <p className="text-white/40 text-xl leading-relaxed font-medium">
              Every set is analyzed by the neural core to determine the optimal load for your next movement. AESTHER doesn't just track—it predicts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {[
                "Live Biometric Feedback Loops",
                "Dynamic Set Optimization",
                "Neural Form Analysis (NFA)",
                "Automated Recovery Windows"
              ].map(f => (
                <div key={f} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand" />
                  <span className="font-bold text-[10px] uppercase tracking-widest text-white/60">{f}</span>
                </div>
              ))}
            </div>
            <button className="text-sm font-black uppercase tracking-[0.3em] text-brand hover:text-white transition-colors flex items-center gap-2 pt-4">
              Explore the science <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="absolute -inset-10 bg-brand/10 blur-[100px] rounded-full" />
             <div className="relative os-glass p-2 rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" 
                  alt="Elite Athlete" 
                  className="w-full h-full object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand">Real-time Analysis</p>
                      <p className="text-2xl font-bold tracking-tight">NEURAL LOAD: 84%</p>
                   </div>
                   <Activity className="w-10 h-10 text-brand" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION C: TRANSFORMATION ── */}
      <section className="relative py-40 px-10 max-w-[1400px] mx-auto overflow-hidden">
        <SectionHeader 
          title="Physical" 
          highlight="Evolution" 
          subtitle="Quantify your physical transformation with precision body analytics and AI-generated trends." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Lean Mass', val: '+2.4kg', icon: Dumbbell, color: 'text-brand' },
            { label: 'Body Fat', val: '-4.2%', icon: Scale, color: 'text-emerald-500' },
            { label: 'Strength Index', val: '+18%', icon: Zap, color: 'text-amber-500' },
            { label: 'Neural Sync', val: '92%', icon: Brain, color: 'text-violet-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="os-glass p-10 flex flex-col items-center text-center space-y-6"
            >
               <stat.icon className={cn("w-10 h-10", stat.color)} />
               <div>
                  <p className="text-5xl font-black tracking-tighter italic">{stat.val}</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-2">{stat.label}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-60 px-10 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 bg-brand/5 blur-[150px] rounded-full" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
           <div className="space-y-6">
              <span className="text-sm font-black text-brand uppercase tracking-[0.6em]">Induction Protocol Active</span>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8]">
                YOUR EVOLUTION <br />
                <span className="ai-gradient-text">STARTS NOW</span>
              </h2>
           </div>
           
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth')}
              className="px-20 py-8 bg-brand text-white rounded-full font-black text-xl uppercase tracking-[0.4em] flex items-center gap-6 shadow-[0_40px_80px_rgba(59,130,246,0.5)] mx-auto group"
            >
              Enter the System <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.5em]">Secure Induction · 0.01% Standard · Neural Baseline Included</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-10 border-t border-white/5 bg-[#050507]">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <Wordmark className="text-white scale-75 origin-left" />
            </div>
            <div className="flex gap-12">
               {["Terms", "Privacy", "Science", "Performance"].map(l => (
                 <a key={l} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors">{l}</a>
               ))}
            </div>
            <p className="text-[10px] text-white/10 font-black uppercase tracking-[0.3em]">© 2026 AESTHER Intelligence. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};
