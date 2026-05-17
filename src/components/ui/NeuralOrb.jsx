import { motion } from 'framer-motion';

export const NeuralOrb = ({ size = "lg", active = true }) => {
  const dimensions = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-48 h-48"
  };

  return (
    <div className={`relative flex items-center justify-center ${dimensions[size]}`}>
      {/* Outer Atmospheric Glow */}
      <motion.div
        animate={active ? {
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-brand rounded-full blur-[60px]"
      />

      {/* Core Neural Pulse */}
      <motion.div
        animate={active ? {
          scale: [1, 1.05, 1],
          rotate: [0, 90, 180, 270, 360],
        } : {}}
        transition={{ 
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="relative w-full h-full rounded-full overflow-hidden border border-white/10 glass-panel"
      >
        {/* Swirling Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand via-violet-500 to-pink-500 opacity-20 animate-gradient-x" />
        
        {/* Neural Network Particles (Simulated with CSS) */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 2 + i, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-2 h-2 bg-white rounded-full blur-[2px]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Inner Adaptive Pulse */}
        <motion.div
          animate={active ? {
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1, 0.8],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-gradient-to-b from-white/20 to-transparent blur-xl"
        />
      </motion.div>

      {/* Biometric Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-white/5"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="10 150"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="text-brand/40"
        />
      </svg>
    </div>
  );
};
