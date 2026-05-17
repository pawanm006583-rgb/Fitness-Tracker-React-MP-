import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Globe, 
  Fingerprint, 
  ShieldCheck, 
  Sparkles,
  Cpu,
  Zap,
  CheckCircle2,
  Lock,
  Mail,
  ChevronRight
} from 'lucide-react';
import { Logo, Wordmark } from '../../components/layout/Logo';
import { useNavigate } from 'react-router-dom';

const AUTH_BG = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80';

export const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Neural Induction
    setTimeout(() => {
      setLoading(false);
      navigate('/hub');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-bg-main flex overflow-hidden font-['Inter'] selection:bg-brand/30 transition-colors duration-500">
      
      {/* ── Left Side: Cinematic Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#020203] overflow-hidden items-center justify-center border-r border-white/5">
        {/* Cinematic Athlete Background */}
        <div className="absolute inset-0 z-0">
          <img src={AUTH_BG} alt="Cinematic Athlete" className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020203]" />
        </div>

        {/* Floating Intelligence Layer */}
        <div className="relative z-10 p-20 space-y-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 text-brand"
          >
            <Cpu className="w-6 h-6" />
            <span className="text-xs font-black uppercase tracking-[0.6em]">System Induction Protocol</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">
              ENTER THE <br />
              <span className="text-white/20">SYSTEM.</span>
            </h1>
            <p className="text-xl text-white/40 font-medium leading-relaxed italic max-w-lg">
              Unlock peak physiological adaptation through real-time biometric synthesis and neural load balancing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 gap-6 pt-10"
          >
            {[
              { label: 'Neural Synchronization', icon: Zap },
              { label: 'Biometric Encryption', icon: Lock },
              { label: 'Induction Phase Active', icon: CheckCircle2 },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4 os-glass p-5 rounded-[24px] border-white/5">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-brand" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{f.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Badge */}
        <div className="absolute bottom-12 left-20 flex items-center gap-4 text-white/20">
          <div className="flex items-center gap-3">
            <Logo className="w-6 h-6 grayscale" />
            <Wordmark className="text-white scale-75 origin-left" />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Version 2.4.8 . Elite Tier</span>
        </div>
      </div>

      {/* ── Right Side: Authentication Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative bg-[#020203]">
        <div className="absolute inset-0 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md space-y-12 relative z-10">
          <div className="text-center lg:text-left space-y-4">
            <motion.div
              layout
              className="flex items-center justify-center lg:justify-start gap-3 text-brand"
            >
              <Fingerprint className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Identity Verification</span>
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">
              {mode === 'login' ? 'Inducting' : 'Registering'} <span className="text-white/20">Athlete</span>
            </h2>
          </div>

          <form onSubmit={handleAuth} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-1">Neural ID / Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="athlete@aesther.ai"
                    className="os-input py-5 pl-14 pr-8 rounded-[24px] text-lg placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-1">Access Protocol / Password</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••••••"
                    className="os-input py-5 pl-14 pr-8 rounded-[24px] text-lg placeholder:text-white/10"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="hidden" />
                <div className="w-5 h-5 rounded-md border-2 border-white/10 group-hover:border-brand/50 transition-colors flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Remember Terminal</span>
              </label>
              <button type="button" className="text-[10px] font-black text-brand uppercase tracking-widest hover:text-white transition-colors">Recover Access</button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full h-16 bg-brand text-white rounded-[24px] font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl shadow-brand/40 hover:shadow-brand/60 transition-all relative overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Syncing...</span>
                </div>
              ) : (
                <>
                  {mode === 'login' ? 'Initiate Session' : 'Register Profile'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="space-y-8 pt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative z-10 px-6 bg-[#020203] mx-auto block w-fit text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">External Uplink</span>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 h-14 os-glass rounded-[20px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all border-white/5">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Google Health</span>
              </button>
              <button className="flex-1 h-14 os-glass rounded-[20px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all border-white/5">
                <Fingerprint className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Biometric</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-10">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
              {mode === 'login' ? "New Athlete?" : "Existing Athlete?"}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-3 text-brand hover:text-white transition-colors"
              >
                {mode === 'login' ? "Apply for induction" : "Induct via ID"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
