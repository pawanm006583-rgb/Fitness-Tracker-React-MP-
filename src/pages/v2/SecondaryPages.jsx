import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Award,
  Zap,
  Flame,
  Shield,
  TrendingUp,
  Target,
  CheckCircle2,
  RefreshCw,
  Wifi,
  Star,
  Calendar,
  Dumbbell,
  Brain,
  ChevronRight,
  Sparkles,
  Edit2,
  Camera,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';
import { useUserStore } from '../../store/useUserStore';
import { ProfileEditor } from '../../components/profile/ProfileEditor';
import { UserAvatar } from '../../components/shared/UserAvatar';

const weeklyData = [
  { day: 'M', sessions: 2 },
  { day: 'T', sessions: 1 },
  { day: 'W', sessions: 2 },
  { day: 'T', sessions: 0 },
  { day: 'F', sessions: 2 },
  { day: 'S', sessions: 1 },
  { day: 'S', sessions: 2 },
];

const badges = [
  { icon: Flame, label: '14-Day Streak', color: 'text-orange-400', bg: 'bg-orange-400/10', earned: true },
  { icon: Dumbbell, label: 'Iron Discipline', color: 'text-brand', bg: 'bg-brand/10', earned: true },
  { icon: Shield, label: 'Recovery Elite', color: 'text-emerald-400', bg: 'bg-emerald-400/10', earned: true },
  { icon: Star, label: 'Hypertrophy Tier', color: 'text-violet-400', bg: 'bg-violet-400/10', earned: true },
  { icon: Brain, label: 'Neural Optimizer', color: 'text-pink-400', bg: 'bg-pink-400/10', earned: true },
  { icon: Target, label: 'Precision Macro', color: 'text-amber-400', bg: 'bg-amber-400/10', earned: false },
];

const timeline = [
  { type: 'pr', label: 'New PR: Bench Press', detail: '102.5 kg • 1RM', time: '2h ago', icon: Zap, color: 'text-brand' },
  { type: 'workout', label: 'Neural Hypertrophy Session', detail: '52 min • 480 kcal', time: '8h ago', icon: Dumbbell, color: 'text-violet-400' },
  { type: 'recovery', label: 'Recovery Score: 94%', detail: 'HRV: 68ms • Sleep: 8h', time: 'Yesterday', icon: Activity, color: 'text-emerald-400' },
  { type: 'milestone', label: '14-Day Streak Unlocked', detail: '+1000 XP awarded', time: '2 days ago', icon: Award, color: 'text-amber-400' },
];

const StatBadge = ({ label, value, sub, color }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{label}</p>
    <div className="flex items-baseline gap-2">
      <span className={cn('text-3xl font-black italic tracking-tighter tabular-nums', color)}>{value}</span>
      {sub && <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{sub}</span>}
    </div>
  </div>
);

export const ProfileV2 = () => {
  const { xp, streak, recoveryScore } = useStore();
  const { user } = useUserStore();
  const level = user.level || Math.floor(xp / 1000);
  const levelProgress = (xp % 1000) / 10;

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto space-y-12 pb-20 px-4 md:px-8 pt-8">

      <ProfileEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* ── Athlete Hero ── */}
      <section className="relative os-glass overflow-hidden min-h-[450px] rounded-[48px] flex flex-col justify-end p-8 md:p-12 border-white/10 shadow-2xl">
        {/* Banner Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" 
            alt="Profile Banner" 
            className="w-full h-full object-cover grayscale-[0.4] opacity-50 contrast-125" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-transparent to-transparent" />
        </div>

        {/* Edit Profile Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditorOpen(true)}
          className="absolute top-8 right-8 z-20 flex items-center gap-3 px-6 py-3 rounded-full os-glass hover:bg-white/10 border-white/10 text-[10px] font-black uppercase tracking-[0.3em] transition-all group"
        >
          <Edit2 className="w-4 h-4 text-brand" />
          Edit Identity
        </motion.button>

        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-end">
          {/* Portrait */}
          <div className="relative shrink-0 group cursor-pointer" onClick={() => setIsEditorOpen(true)}>
            <div className="absolute -inset-2 bg-gradient-to-tr from-brand via-violet-500 to-brand rounded-[42px] blur opacity-40 group-hover:opacity-80 transition-all duration-700" />
            <div className="relative">
               <UserAvatar size="2xl" className="rounded-[40px] border-4 border-bg-main" />
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 rounded-[40px] z-10 backdrop-blur-sm">
                <Camera className="w-8 h-8 text-white" />
                <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Update</span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 px-4 py-2 os-glass rounded-2xl flex items-center gap-2 shadow-2xl z-20 border-white/20">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Neural Link: Active</span>
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 space-y-8 pb-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">{user.name}</h1>
                <div className="px-4 py-1.5 os-glass border-brand/40 rounded-full">
                  <span className="text-[10px] font-black text-brand uppercase tracking-[0.4em]">ELITE . PRO</span>
                </div>
              </div>
              <p className="text-white/40 text-xl font-medium tracking-tight italic">"{user.bio || 'Neural Tier IV Performance Athlete'}"</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <StatBadge label="Global Tier" value={`L${level}`} sub={`${xp.toLocaleString()} XP`} color="text-brand" />
              <StatBadge label="Active Streak" value={`${user.stats?.streak || streak}`} sub="DAYS" color="text-orange-400" />
              <StatBadge label="Recovery Index" value={`${recoveryScore}%`} color="text-emerald-400" />
              <StatBadge label="Baseline" value="Peak" color="text-violet-400" />
            </div>

            {/* XP Bar */}
            <div className="max-w-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Advancement: Level {level} → {level + 1}</span>
                <span className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">{xp % 1000} / 1000 XP</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-brand to-violet-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Stats + Progress Gallery */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 os-glass p-10 space-y-10">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-brand" /> Cycle Analytics
          </h3>
          <div className="space-y-8">
            {[
              { label: 'Weight Evolution', val: '82.4 kg', delta: '↓ 5.0kg', color: 'text-brand' },
              { label: 'Muscle Density', val: '+2.4 kg', delta: 'Cycle 12', color: 'text-violet-400' },
              { label: 'Body Fat %', val: '14.2%', delta: '↓ 2.6%', color: 'text-emerald-400' },
            ].map(s => (
              <div key={s.label} className="space-y-1 border-l-2 border-white/5 pl-6 hover:border-brand transition-colors">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">{s.label}</p>
                <div className="flex items-baseline gap-3">
                  <p className={cn('text-3xl font-black italic tracking-tighter', s.color)}>{s.val}</p>
                  <p className="text-[10px] font-black text-white/40 uppercase">{s.delta}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 p-6 os-glass-light rounded-[32px] flex items-start gap-5">
            <Brain className="w-6 h-6 text-brand shrink-0 mt-1" />
            <p className="text-xs text-white/60 leading-relaxed font-medium italic">
              "System core indicates optimal adaptation. Increasing mechanical tension protocol by 4.2% for next cycle."
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-brand" /> Transformation Gallery
            </h3>
            <button className="text-[9px] font-black text-brand uppercase tracking-[0.4em] hover:text-white transition-colors">View All Archive</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             {[
               "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80",
               "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
               "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80"
             ].map((img, i) => (
               <div key={i} className="relative aspect-[3/4] os-glass p-1 rounded-[32px] overflow-hidden group cursor-pointer">
                  <img src={img} className="w-full h-full object-cover rounded-[28px] grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt="Gallery" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <p className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">Protocol Day {i * 12 + 1}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── Badges & Achievements ── */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] flex items-center gap-3">
            <Award className="w-5 h-5 text-amber-500" /> Neural Achievements
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className={cn('os-glass p-6 flex flex-col items-center text-center gap-4 transition-all rounded-[32px]', !b.earned && 'opacity-20 grayscale')}
            >
              <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl', b.bg)}>
                <b.icon className={cn('w-7 h-7', b.color)} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-tighter leading-tight">{b.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="os-glass p-10 space-y-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] flex items-center gap-3">
            <Wifi className="w-5 h-5 text-brand" /> Biometric Uplinks
          </h3>
          <button className="text-[9px] font-black text-brand uppercase tracking-[0.4em] hover:text-white transition-colors">Add Device</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Apple Health', 'WHOOP', 'Garmin', 'Oura Ring', 'Strava'].map((name, i) => (
            <div key={i} className="os-glass-light p-6 flex items-center gap-6 rounded-[32px] group hover:border-brand/40 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border-white/10 group-hover:scale-110 transition-transform">
                {name === 'Apple Health' ? '🍎' : name === 'WHOOP' ? '⚡' : '🎯'}
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <p className="font-black text-sm uppercase italic">{name}</p>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Connected</span>
                </div>
              </div>
              <RefreshCw className="w-4 h-4 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
