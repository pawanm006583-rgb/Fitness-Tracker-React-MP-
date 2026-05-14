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
  Camera
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
import { ProfileEditor, type ProfileData } from '../../components/profile/ProfileEditor';

const DEFAULT_PORTRAIT = '/Users/pawansushilmiahra/.gemini/antigravity/brain/07958bdf-0a32-4896-b266-795082fc04a6/athlete_profile_portrait_1778604688790.png';

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

const integrations = [
  { name: 'Apple Health', status: 'connected', metrics: 'Heart rate, Sleep, Steps', color: 'bg-white', icon: '🍎' },
  { name: 'WHOOP', status: 'connected', metrics: 'HRV, Strain, Recovery', color: 'bg-red-500', icon: '⚡' },
  { name: 'Garmin', status: 'connected', metrics: 'GPS, VO2Max, Training Load', color: 'bg-blue-500', icon: '🎯' },
  { name: 'Oura Ring', status: 'syncing', metrics: 'Sleep stages, Readiness', color: 'bg-amber-500', icon: '💍' },
  { name: 'Strava', status: 'connected', metrics: 'Runs, Rides, Activities', color: 'bg-orange-500', icon: '🏃' },
  { name: 'Fitbit', status: 'disconnected', metrics: 'Steps, Active zone', color: 'bg-teal-500', icon: '📊' },
];

const timeline = [
  { type: 'pr', label: 'New PR: Bench Press', detail: '102.5 kg • 1RM', time: '2h ago', icon: Zap, color: 'text-brand' },
  { type: 'workout', label: 'Neural Hypertrophy Session', detail: '52 min • 480 kcal', time: '8h ago', icon: Dumbbell, color: 'text-violet-400' },
  { type: 'recovery', label: 'Recovery Score: 94%', detail: 'HRV: 68ms • Sleep: 8h', time: 'Yesterday', icon: Activity, color: 'text-emerald-400' },
  { type: 'milestone', label: '14-Day Streak Unlocked', detail: '+1000 XP awarded', time: '2 days ago', icon: Award, color: 'text-amber-400' },
  { type: 'ai', label: 'Neural Baseline Updated', detail: 'AESTHER recalculated your training ceiling.', time: '3 days ago', icon: Brain, color: 'text-pink-400' },
];

const StatBadge = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={cn('text-2xl font-bold tabular-nums', color)}>{value}</span>
      {sub && <span className="text-[9px] font-bold text-muted uppercase tracking-widest">{sub}</span>}
    </div>
  </div>
);

export const ProfileV2 = () => {
  const { xp, streak, recoveryScore } = useStore();
  const level = Math.floor(xp / 1000);
  const levelProgress = (xp % 1000) / 10;

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Felix Vance',
    username: '@felix.vance',
    bio: 'Hypertrophy Specialist · Neural Tier IV · Global Rank #124',
    specialization: 'Hypertrophy Specialist',
    avatar: DEFAULT_PORTRAIT,
  });

  const handleSave = (data: ProfileData) => {
    setProfileData({
      name: data.name,
      username: data.username,
      bio: data.specialization + ' · Neural Tier IV',
      specialization: data.specialization,
      avatar: data.avatar,
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-10 pb-20">

      <ProfileEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        currentAvatar={profileData.avatar}
        onSave={handleSave}
      />

      {/* ── Athlete Hero ── */}
      <section className="relative premium-card overflow-hidden min-h-[380px]">
        {/* Background atmospheric glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-violet-500/10" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand/10 rounded-full blur-[120px]" />

        {/* Edit Profile Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditorOpen(true)}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 text-[10px] font-black uppercase tracking-widest transition-all group"
        >
          <Edit2 className="w-3.5 h-3.5 text-brand group-hover:rotate-12 transition-transform" />
          Edit Profile
        </motion.button>

        <div className="relative z-10 flex flex-col md:flex-row gap-10 p-8 md:p-10">
          {/* Portrait — clickable to edit */}
          <div className="relative shrink-0 self-start group cursor-pointer" onClick={() => setIsEditorOpen(true)}>
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand via-violet-500 to-pink-500 rounded-[32px] blur opacity-40 group-hover:opacity-70 transition-opacity" />
            <div className="relative w-40 h-40 rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={profileData.avatar}
                alt="Athlete"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
              />
              {/* Camera overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                <Camera className="w-6 h-6 text-white" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Change</span>
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 glass-panel rounded-xl flex items-center gap-1.5 shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold text-white uppercase tracking-widest">Active</span>
            </div>
          </div>

          {/* Identity */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">{profileData.name}</h1>
                <div className="px-3 py-1 bg-brand/10 border border-brand/20 rounded-full">
                  <span className="text-[10px] font-bold text-brand uppercase tracking-widest">PRO</span>
                </div>
              </div>
              <p className="text-muted text-sm font-medium">{profileData.bio}</p>
              <div className="flex items-center gap-2 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <p className="text-xs text-muted italic">"CNS adaptation trending upward. Peak output window: next 72 hours."</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
              <StatBadge label="XP Level" value={`L${level}`} sub={`${xp.toLocaleString()} xp`} color="text-brand" />
              <StatBadge label="Streak" value={`${streak}`} sub="days" color="text-orange-400" />
              <StatBadge label="Recovery" value={`${recoveryScore}%`} color="text-emerald-400" />
              <StatBadge label="AI Readiness" value="High" color="text-violet-400" />
            </div>

            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Level {level} → {level + 1}</span>
                <span className="text-[9px] font-bold text-brand uppercase tracking-widest">{xp % 1000} / 1000 XP</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand to-violet-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Transformation Stats + Weekly Chart ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="premium-card p-8 space-y-8 bg-gradient-to-b from-white/[0.02] to-transparent">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand" /> Transformation Summary
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Starting Weight', val: '87.4 kg', delta: '→ 82.4 kg', color: 'text-brand' },
              { label: 'Muscle Gain', val: '+2.4 kg', delta: '6-week total', color: 'text-violet-400' },
              { label: 'Body Fat', val: '14.2%', delta: '↓ from 16.8%', color: 'text-emerald-400' },
              { label: 'Consistency', val: '91%', delta: '6-week average', color: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="space-y-1">
                <p className="text-[9px] font-bold text-muted uppercase tracking-widest">{s.label}</p>
                <p className={cn('text-2xl font-bold tracking-tight', s.color)}>{s.val}</p>
                <p className="text-[10px] text-muted font-medium">{s.delta}</p>
              </div>
            ))}
          </div>
          <div className="pt-2 p-4 glass-panel rounded-2xl flex items-start gap-3">
            <Brain className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted leading-relaxed">
              <span className="text-white font-semibold">Neural insight:</span> Lean mass gain is tracking 22% ahead of baseline projection. Maintain current caloric surplus and compound loading protocol.
            </p>
          </div>
        </div>

        <div className="premium-card p-8 space-y-6 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand" /> Weekly Frequency
            </h3>
            <span className="text-[10px] font-bold text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">10 Sessions</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barSize={28}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 10, fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
                  {weeklyData.map((entry, i) => (
                    <Cell key={i} fill={entry.sessions > 0 ? 'var(--brand)' : 'rgba(255,255,255,0.06)'} fillOpacity={entry.sessions > 0 ? 0.8 : 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { label: 'Avg Duration', val: '48 min' },
              { label: 'Calories / Wk', val: '2,940' },
              { label: 'Active Rate', val: '91%' },
            ].map(s => (
              <div key={s.label} className="text-center p-3 glass-panel rounded-xl">
                <p className="text-sm font-bold">{s.val}</p>
                <p className="text-[9px] font-bold text-muted uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Performance Identity ── */}
      <section className="premium-card p-8 space-y-8 bg-gradient-to-br from-brand/5 via-transparent to-violet-500/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand" />
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest">AI Performance Identity</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Neural Adaptation', val: 88, color: 'from-brand to-violet-500' },
            { label: 'Recovery Intelligence', val: 92, color: 'from-emerald-500 to-teal-500' },
            { label: 'Performance Ceiling', val: 76, color: 'from-orange-500 to-amber-500' },
            { label: 'Training Readiness', val: 94, color: 'from-pink-500 to-rose-500' },
          ].map(m => (
            <div key={m.label} className="space-y-3">
              <div className="relative w-full aspect-square flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="6" className="text-foreground/5" />
                  <motion.circle
                    cx="40" cy="40" r="32" fill="none" stroke="url(#g)" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray="201"
                    initial={{ strokeDashoffset: 201 }}
                    animate={{ strokeDashoffset: 201 - (201 * m.val) / 100 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">{m.val}</span>
                </div>
              </div>
              <p className="text-[9px] font-bold text-muted uppercase tracking-widest text-center leading-tight">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Badges & Achievements ── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Achievement Showcase
          </h3>
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">5 / 6 Unlocked</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className={cn('premium-card p-5 flex items-center gap-4 transition-all', b.earned ? 'hover:border-brand/20' : 'opacity-40 grayscale')}
            >
              <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', b.bg)}>
                <b.icon className={cn('w-6 h-6', b.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{b.label}</p>
                {b.earned
                  ? <div className="flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /><span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Earned</span></div>
                  : <span className="text-[9px] font-bold text-muted uppercase tracking-widest">Locked</span>
                }
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
            <Wifi className="w-4 h-4 text-brand" /> Connected Devices
          </h3>
          <button className="text-[10px] font-bold text-brand uppercase tracking-widest hover:text-brand/80 transition-colors">Add Device</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item, i) => (
            <div key={i} className="premium-card p-5 flex items-center gap-5 hover:border-white/10 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center text-2xl shrink-0 border border-white/5">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{item.name}</p>
                  <div className={cn('px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest',
                    item.status === 'connected' ? 'bg-emerald-500/10 text-emerald-500'
                      : item.status === 'syncing' ? 'bg-amber-500/10 text-amber-500'
                        : 'bg-foreground/5 text-muted'
                  )}>
                    {item.status}
                  </div>
                </div>
                <p className="text-[10px] text-muted mt-0.5 truncate">{item.metrics}</p>
              </div>
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0',
                item.status === 'syncing' ? 'text-amber-400' : item.status === 'connected' ? 'text-emerald-400' : 'text-muted'
              )}>
                <RefreshCw className={cn('w-4 h-4', item.status === 'syncing' && 'animate-spin')} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Activity Timeline ── */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand" /> Activity Timeline
          </h3>
        </div>
        <div className="premium-card divide-y divide-white/[0.04]">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-5 p-5 hover:bg-foreground/[0.02] transition-colors cursor-pointer group"
            >
              <div className={cn('w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center shrink-0')}>
                <item.icon className={cn('w-5 h-5', item.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{item.label}</p>
                <p className="text-[10px] text-muted mt-0.5">{item.detail}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[9px] font-bold text-muted uppercase tracking-widest hidden md:block">{item.time}</span>
                <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Subscription ── */}
      <section className="premium-card p-8 bg-gradient-to-br from-brand/10 via-transparent to-violet-500/10 border-brand/20 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Active Subscription</p>
            <h3 className="text-2xl font-bold tracking-tight">AESTHER PRO</h3>
            <p className="text-xs text-muted">Renews on June 12, 2026 · Full Neural Access</p>
          </div>
          <button className="px-6 py-3 bg-brand text-white font-bold text-xs rounded-2xl shadow-lg shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">
            Manage
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['Unlimited AI Coaching', 'Neural Biometrics', 'Priority Sync'].map(f => (
            <div key={f} className="flex items-center gap-2 p-3 glass-panel rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted leading-tight">{f}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
