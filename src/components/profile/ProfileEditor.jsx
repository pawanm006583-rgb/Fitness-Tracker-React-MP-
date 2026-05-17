import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Camera, Save, Sparkles,
  Zap, Brain, CheckCircle2, RefreshCw,
  Bell, BarChart2, Activity
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUserStore } from '../../store/useUserStore';

// ── Constants ────────────────────────────────────────────────────────────────

const ACCENT_THEMES = [
  { id: 'blue',   label: 'Neural Blue',     color: '#3b82f6' },
  { id: 'red',    label: 'Hyper Crimson',   color: '#ef4444' },
  { id: 'gold',   label: 'Elite Gold',      color: '#f59e0b' },
  { id: 'white',  label: 'Titanium White',  color: '#e2e8f0' },
  { id: 'purple', label: 'Midnight Purple', color: '#8b5cf6' },
];

const SPECIALIZATIONS = [
  'Hypertrophy Specialist', 'Strength Athlete', 'Endurance Runner',
  'Hybrid Performance', 'Powerlifter', 'Calisthenics', 'Olympic Weightlifter',
  'Functional Fitness', 'Body Recomposition',
];

const GOALS = [
  { id: 'hyp', label: 'Build Muscle', icon: '💪' },
  { id: 'str', label: 'Max Strength', icon: '🏋️' },
  { id: 'fat', label: 'Fat Loss',     icon: '🔥' },
  { id: 'end', label: 'Endurance',    icon: '🏃' },
  { id: 'mob', label: 'Mobility',     icon: '🧘' },
  { id: 'rec', label: 'Recovery',     icon: '🧬' },
];

const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];

const SECTIONS = ['Identity', 'Athlete', 'Theme', 'Analytics'];

const ANALYTICS_ITEMS = [
  { icon: Activity,  label: 'Recovery Tracking',      desc: 'Enable HRV and sleep quality monitoring',         enabled: true  },
  { icon: Brain,     label: 'AI Coaching Intensity',   desc: 'Let AESTHER adapt your daily recommendations',    enabled: true  },
  { icon: BarChart2, label: 'Advanced Metrics',        desc: 'Show CNS load, progressive overload & trends',    enabled: false },
  { icon: Bell,      label: 'Neural Notifications',    desc: 'Smart alerts for recovery, streak & PR windows',  enabled: true  },
  { icon: Zap,       label: 'Performance Leaderboard', desc: 'Compare with elite athlete benchmarks',           enabled: false },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const PremiumInput = ({
  label, value, onChange, placeholder, multiline,
}) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-white/5 border border-white/10 focus:border-brand/50 focus:bg-brand/5 rounded-2xl px-5 py-4 text-sm font-medium placeholder:text-muted/50 outline-none transition-all resize-none text-white"
      />
    ) : (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 focus:border-brand/50 focus:bg-brand/5 rounded-2xl px-5 py-4 text-sm font-medium placeholder:text-muted/50 outline-none transition-all text-white"
      />
    )}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export const ProfileEditor = ({ isOpen, onClose }) => {
  const { user, updateUser } = useUserStore();
  const [activeSection, setActiveSection] = useState('Identity');
  const [isSaving, setIsSaving]           = useState(false);
  const [saveSuccess, setSaveSuccess]     = useState(false);
  const [isDragging, setIsDragging]       = useState(false);
  const [analyticsToggles, setAnalyticsToggles] = useState(
    ANALYTICS_ITEMS.map(i => i.enabled)
  );
  const fileRef = useRef(null);

  const [profile, setProfile] = useState({
    name: user.name,
    username: user.username || '@athlete',
    bio: user.bio || 'Elite performance athlete.',
    specialization: user.specialization || 'Hypertrophy Specialist',
    goal: user.goal || 'hyp',
    location: user.location || 'San Francisco, CA',
    fitnessLevel: user.fitnessLevel || 'Advanced',
    avatar: user.profileImage,
    accentTheme: user.accentTheme || 'blue',
  });

  useEffect(() => {
    if (isOpen) {
      setProfile({
        name: user.name,
        username: user.username || '@athlete',
        bio: user.bio || 'Elite performance athlete.',
        specialization: user.specialization || 'Hypertrophy Specialist',
        goal: user.goal || 'hyp',
        location: user.location || 'San Francisco, CA',
        fitnessLevel: user.fitnessLevel || 'Advanced',
        avatar: user.profileImage,
        accentTheme: user.accentTheme || 'blue',
      });
    }
  }, [isOpen, user]);

  const set = (key) => (val) =>
    setProfile(p => ({ ...p, [key]: val }));

  const toggleAnalytic = (idx) =>
    setAnalyticsToggles(prev => prev.map((v, i) => (i === idx ? !v : v)));

  const handleAvatarUpload = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result)
        setProfile(p => ({ ...p, avatar: e.target.result }));
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleAvatarUpload(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleAvatarUpload(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      updateUser({
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        specialization: profile.specialization,
        goal: profile.goal,
        location: profile.location,
        fitnessLevel: profile.fitnessLevel,
        profileImage: profile.avatar,
        accentTheme: profile.accentTheme,
      });

      setTimeout(() => { 
        setSaveSuccess(false); 
        onClose(); 
      }, 1500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/70 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 font-['Outfit']"
        >
          <motion.div
            initial={{ scale: 0.93, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.93, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-full max-w-5xl max-h-[92vh] bg-[#0d0d0d] border border-white/10 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* ── Header ── */}
            <div className="px-10 py-7 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-brand">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Athlete Identity System</span>
                </div>
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                  Edit <span className="ai-gradient-text">Neural Profile</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-2 px-10 pt-5 pb-1 shrink-0 overflow-x-auto no-scrollbar">
              {SECTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={cn(
                    'px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap',
                    activeSection === s
                      ? 'bg-brand text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                      : 'bg-white/5 text-muted hover:bg-white/10'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-full">

                {/* Left panel – avatar + live preview */}
                <div className="lg:col-span-2 p-10 border-r border-white/5 space-y-8">
                  {/* Avatar upload */}
                  <div className="space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">Athlete Avatar</span>
                    <div
                      className={cn('relative w-40 h-40 mx-auto cursor-pointer group', isDragging && 'scale-105')}
                      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={onDrop}
                      onClick={() => fileRef.current?.click()}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-tr from-brand via-violet-500 to-pink-500 rounded-[34px] blur opacity-50 group-hover:opacity-80 transition-opacity" />
                      <div className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/10">
                        {profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand/20 to-violet-500/20 flex items-center justify-center">
                            <span className="text-4xl font-black text-brand tracking-tighter uppercase">{profile.name?.[0] || 'A'}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <Camera className="w-7 h-7 text-white" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">Change Photo</span>
                        </div>
                      </div>
                      {isDragging && (
                        <div className="absolute inset-0 rounded-[30px] border-2 border-brand bg-brand/10 flex items-center justify-center">
                          <span className="text-[9px] font-black text-brand uppercase tracking-widest">Drop Here</span>
                        </div>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                    <p className="text-[9px] text-muted text-center">Click or drag & drop to upload</p>
                  </div>

                  {/* Live preview */}
                  <div className="premium-card p-6 space-y-4 bg-white/[0.02]">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">Live Preview</span>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-bg-card flex items-center justify-center">
                        {profile.avatar ? (
                           <img src={profile.avatar} alt="" className="w-full h-full object-cover object-top" />
                        ) : (
                          <span className="font-black text-brand text-xs">{profile.name?.[0] || 'A'}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-sm tracking-tight truncate">{profile.name || 'Your Name'}</p>
                        <p className="text-[10px] text-muted truncate">{profile.username || '@username'}</p>
                        <p className="text-[9px] text-brand font-bold uppercase tracking-widest mt-1 truncate">{profile.specialization}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-brand/5 border border-brand/20 rounded-2xl">
                      <p className="text-[10px] text-muted italic leading-relaxed line-clamp-2">
                        {profile.bio || 'Your bio will appear here...'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: ACCENT_THEMES.find(t => t.id === profile.accentTheme)?.color }}
                      />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted">
                        {ACCENT_THEMES.find(t => t.id === profile.accentTheme)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right panel – section content */}
                <div className="lg:col-span-3 p-10 space-y-8">

                  {/* IDENTITY */}
                  {activeSection === 'Identity' && (
                    <motion.div key="identity" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <PremiumInput label="Full Name"  value={profile.name}     onChange={set('name')}     placeholder="Your athlete name" />
                      <PremiumInput label="Username"   value={profile.username} onChange={set('username')} placeholder="@username" />
                      <PremiumInput label="Location"   value={profile.location} onChange={set('location')} placeholder="City, Country" />
                      <PremiumInput label="Bio"        value={profile.bio}      onChange={set('bio')}      placeholder="Describe your training identity..." multiline />
                    </motion.div>
                  )}

                  {/* ATHLETE */}
                  {activeSection === 'Athlete' && (
                    <motion.div key="athlete" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <div className="space-y-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">Specialization</span>
                        <div className="grid grid-cols-2 gap-2">
                          {SPECIALIZATIONS.map(s => (
                            <button
                              key={s}
                              onClick={() => set('specialization')(s)}
                              className={cn(
                                'px-4 py-3 rounded-2xl text-[10px] font-bold text-left transition-all border',
                                profile.specialization === s
                                  ? 'bg-brand/10 border-brand/50 text-brand'
                                  : 'bg-white/5 border-transparent text-muted hover:border-white/20'
                              )}
                            >{s}</button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">Primary Goal</span>
                        <div className="grid grid-cols-3 gap-3">
                          {GOALS.map(g => (
                            <button
                              key={g.id}
                              onClick={() => set('goal')(g.id)}
                              className={cn(
                                'flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all',
                                profile.goal === g.id
                                  ? 'bg-brand/10 border-brand/50 text-brand'
                                  : 'bg-white/5 border-transparent text-muted hover:border-white/20'
                              )}
                            >
                              <span className="text-2xl">{g.icon}</span>
                              <span className="text-[9px] font-black uppercase tracking-tight">{g.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">Fitness Level</span>
                        <div className="flex gap-3">
                          {FITNESS_LEVELS.map(l => (
                            <button
                              key={l}
                              onClick={() => set('fitnessLevel')(l)}
                              className={cn(
                                'flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wide transition-all border',
                                profile.fitnessLevel === l
                                  ? 'bg-brand/10 border-brand/50 text-brand'
                                  : 'bg-white/5 border-transparent text-muted hover:border-white/20'
                              )}
                            >{l}</button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* THEME */}
                  {activeSection === 'Theme' && (
                    <motion.div key="theme" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">Neural Accent Theme</span>
                      <div className="space-y-3">
                        {ACCENT_THEMES.map(t => (
                          <button
                            key={t.id}
                            onClick={() => set('accentTheme')(t.id)}
                            className={cn(
                              'w-full flex items-center gap-5 p-5 rounded-3xl border transition-all',
                              profile.accentTheme === t.id
                                ? 'bg-white/10 border-white/30'
                                : 'bg-white/5 border-transparent hover:border-white/10'
                            )}
                          >
                            <div
                              className="w-10 h-10 rounded-2xl shrink-0"
                              style={{
                                backgroundColor: t.color,
                                boxShadow: profile.accentTheme === t.id ? `0 0 20px ${t.color}60` : undefined,
                              }}
                            />
                            <span className="font-bold text-sm">{t.label}</span>
                            {profile.accentTheme === t.id && (
                              <CheckCircle2 className="w-5 h-5 ml-auto text-brand" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ANALYTICS */}
                  {activeSection === 'Analytics' && (
                    <motion.div key="analytics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      {ANALYTICS_ITEMS.map((item, i) => {
                        const enabled = analyticsToggles[i];
                        return (
                          <div
                            key={item.label}
                            onClick={() => toggleAnalytic(i)}
                            className="flex items-center justify-between gap-6 p-5 premium-card bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center', enabled ? 'bg-brand/10 text-brand' : 'bg-white/5 text-muted')}>
                                <item.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{item.label}</p>
                                <p className="text-[10px] text-muted mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                            <div className={cn('w-12 h-6 rounded-full relative shrink-0 transition-colors duration-300', enabled ? 'bg-brand' : 'bg-white/10')}>
                              <motion.div
                                animate={{ x: enabled ? 26 : 2 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-10 py-7 border-t border-white/5 flex items-center justify-between bg-black/30 shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-white/5 text-muted font-bold text-sm hover:bg-white/10 transition-all"
              >
                Discard
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving || saveSuccess}
                className={cn(
                  'px-10 h-14 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all',
                  saveSuccess
                    ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                    : 'bg-brand text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.02] active:scale-95'
                )}
              >
                {saveSuccess ? (
                  <><CheckCircle2 className="w-5 h-5" /> Profile Synchronized</>
                ) : isSaving ? (
                  <><RefreshCw className="w-5 h-5 animate-spin" /> Syncing Neural Core...</>
                ) : (
                  <><Save className="w-5 h-5" /> Apply Changes</>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
