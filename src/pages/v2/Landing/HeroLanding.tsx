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
  CheckCircle2
} from 'lucide-react';
import { Hero3D } from './Hero3D';
import { CinematicModal } from './CinematicModal';
import { Logo, Wordmark } from '../../../components/layout/Logo';
import { cn } from '../../../utils/cn';

const BG_IMAGE = '/Users/pawansushilmiahra/.gemini/antigravity/brain/07958bdf-0a32-4896-b266-795082fc04a6/futuristic_training_lab_background_1778682997135.png';

const SectionHeader = ({ title, highlight, subtitle }: { title: string; highlight: string; subtitle: string }) => (
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

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="premium-card p-8 space-y-6 hover:border-brand/30 transition-all group cursor-default bg-black/20"
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
  const athleteOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={scrollContainer} className="relative bg-[#050505] text-white selection:bg-brand/30">
      <CinematicModal isOpen={isCinematicOpen} onClose={() => setIsCinematicOpen(false)} />

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex flex-col items-center justify-center">
        {/* Cinematic Background Layer */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen grayscale pointer-events-none"
          style={{ 
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* 3D Scene Layer */}
        <motion.div style={{ opacity: athleteOpacity }} className="absolute inset-0 z-0">
          <Hero3D />
        </motion.div>

        {/* Atmospheric Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/20" />

        {/* Top Branding - CINEMATIC FIXED */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[1400px] h-16 px-8 flex justify-between items-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <Wordmark className="text-white scale-90 origin-left" />
          </div>
          <button 
            onClick={() => navigate('/hub')}
            className="px-5 py-2 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Access Portal
          </button>
        </header>

        {/* Hero Content */}
        <main className="relative z-20 flex flex-col items-center text-center px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-2 text-brand">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-black uppercase tracking-[0.4em]">Neural Performance OS</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black premium-tracking cinematic-leading uppercase italic">
              Train <span className="ai-gradient-text px-2">Smarter</span><br />
              Evolve <span className="text-brand">Daily</span>
            </h1>

            <p className="max-w-xl mx-auto text-muted text-lg md:text-xl font-medium leading-relaxed opacity-80">
              Harnessing peak human potential through real-time biometric intelligence and neural-adaptive training protocols.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/hub')}
                className="px-10 py-5 bg-brand text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-[0_0_40px_rgba(59,130,246,0.4)] group active-glow"
              >
                Initiate Training <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-brand/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                <button 
                  onClick={() => setIsCinematicOpen(true)}
                  className="relative px-10 py-5 glass-panel rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2"
                >
                  Watch Cinematic <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Scroll Indicator */}
        <motion.button 
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted hover:text-brand transition-colors group cursor-pointer"
        >
          <span className="text-[9px] font-black uppercase tracking-widest">Explore Intelligence</span>
          <ChevronDown className="w-4 h-4 group-hover:scale-125 transition-transform" />
        </motion.button>
      </section>

      {/* ── SECTION A: AI INTELLIGENCE ── */}
      <section className="relative py-32 px-6 max-w-[1400px] mx-auto overflow-hidden">
        <SectionHeader 
          title="Neural" 
          highlight="Performance" 
          subtitle="Real-time biometric synthesis and neural load balancing for peak physiological output." 
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

      {/* ── SECTION B: THE SYSTEM ── */}
      <section className="relative py-32 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-xs font-black text-brand uppercase tracking-widest">Protocol 01: Training</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-tight">
                Adaptive <br />
                <span className="ai-gradient-text">Training Engine</span>
              </h2>
            </div>
            <p className="text-muted text-lg leading-relaxed font-medium">
              AESTHER doesn't just track workouts—it builds them in real-time. Every set is analyzed by the neural core to determine the optimal load for your next movement.
            </p>
            <div className="space-y-4">
              {[
                "Live Biometric Feedback Loops",
                "Dynamic Set/Rep Optimization",
                "Neural Form Analysis (NFA)",
                "Automated Recovery Windows"
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand" />
                  <span className="font-bold text-sm tracking-tight">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative premium-card p-1 aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.2)]"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
             <div className="relative w-full h-full bg-[#050505] rounded-[22px] flex items-center justify-center overflow-hidden">
                <Dumbbell className="w-20 h-20 text-brand/20 animate-pulse" />
                <div className="absolute inset-x-0 bottom-0 p-8 flex justify-between items-end">
                   <div className="space-y-2">
                      <div className="w-32 h-2 bg-brand/30 rounded-full" />
                      <div className="w-48 h-2 bg-brand/10 rounded-full" />
                   </div>
                   <Activity className="w-12 h-12 text-brand animate-bounce" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION C: TRANSFORMATION ── */}
      <section className="relative py-32 px-6 max-w-[1400px] mx-auto overflow-hidden">
        <SectionHeader 
          title="Physical" 
          highlight="Evolution" 
          subtitle="Quantify your physical transformation with precision body analytics and AI-generated trends." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="premium-card p-8 flex flex-col items-center text-center space-y-4"
            >
               <stat.icon className={cn("w-8 h-8", stat.color)} />
               <div>
                  <p className="text-4xl font-black tracking-tighter italic">{stat.val}</p>
                  <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{stat.label}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SECTION D: ECOSYSTEM ── */}
      <section className="relative py-32 px-6 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-16">
          <div className="space-y-4">
            <h3 className="text-sm font-black text-brand uppercase tracking-[0.4em]">Integrated Intelligence</h3>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Unified <span className="ai-gradient-text">Ecosystem</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-1000">
             {["Apple Health", "WHOOP", "Garmin", "Oura Ring", "Strava"].map(brand => (
               <div key={brand} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Wifi className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{brand}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── SECTION E: TESTIMONIALS ── */}
      <section className="relative py-32 px-6 max-w-[1400px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "Marcus Thorne", role: "Pro Athlete", quote: "AESTHER isn't just an app. It's a second brain in the gym. My recovery has never been this predictable." },
             { name: "Elena Vance", role: "Hybrid Athlete", quote: "The neural load tracking changed everything. I used to overtrain constantly. Now, I peak every week." },
             { name: "David Chen", role: "Elite Performance", quote: "The most intelligent training system I've ever experienced. It's like having a team of sports scientists in my pocket." },
           ].map((t, i) => (
             <motion.div
               key={t.name}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="premium-card p-10 space-y-6 bg-gradient-to-br from-white/[0.02] to-transparent border-white/5"
             >
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-brand text-brand" />)}
                </div>
                <p className="text-lg font-medium italic opacity-80 leading-relaxed">"{t.quote}"</p>
                <div>
                   <p className="font-black text-sm uppercase tracking-tight">{t.name}</p>
                   <p className="text-[10px] text-brand font-bold uppercase tracking-widest">{t.role}</p>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* ── SECTION F: FINAL CTA ── */}
      <section className="relative py-48 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brand/5 blur-[120px]" />
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-12">
           <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none max-w-4xl">
             Your Evolution <br />
             <span className="ai-gradient-text">Starts Now</span>
           </h2>
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/hub')}
              className="px-16 py-8 bg-brand text-white rounded-3xl font-black text-xl uppercase tracking-widest flex items-center gap-4 shadow-[0_0_80px_rgba(59,130,246,0.6)] group active-glow"
            >
              Initiate Neural Sync <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            <p className="text-[10px] text-muted font-bold uppercase tracking-[0.3em] opacity-50">Secure Access · No Credit Card Required · AI Baseline Test Included</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 border-t border-white/5">
         <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <Logo className="w-8 h-8" />
              <Wordmark className="text-white scale-75 origin-left" />
            </div>
            <div className="flex gap-10">
               {["Terms", "Privacy", "Science", "Performance"].map(l => (
                 <a key={l} href="#" className="text-[10px] font-bold text-muted uppercase tracking-widest hover:text-white transition-colors">{l}</a>
               ))}
            </div>
            <p className="text-[10px] text-muted font-bold uppercase tracking-widest opacity-40">© 2026 AESTHER Intelligence. All rights reserved.</p>
         </div>
      </footer>

      {/* Background Floating Particles (Simulated) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               y: [0, -100, 0],
               x: [0, Math.random() * 50 - 25, 0],
               opacity: [0, 1, 0]
             }}
             transition={{ 
               duration: 5 + Math.random() * 5, 
               repeat: Infinity,
               delay: Math.random() * 5 
             }}
             className="absolute w-1 h-1 bg-brand rounded-full"
             style={{ 
               top: `${Math.random() * 100}%`, 
               left: `${Math.random() * 100}%` 
             }}
           />
         ))}
      </div>
    </div>
  );
};

const Play = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" />
  </svg>
);
