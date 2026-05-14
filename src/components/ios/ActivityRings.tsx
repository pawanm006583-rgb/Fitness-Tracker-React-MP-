import { motion } from 'framer-motion';

interface RingProps {
  progress: number;
  color: string;
  size: number;
  strokeWidth: number;
  delay?: number;
}

const Ring = ({ progress, color, size, strokeWidth, delay = 0 }: RingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90 overflow-visible">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        className="opacity-20"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ActivityRings = () => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <div className="absolute"><Ring progress={85} color="#FF2D55" size={140} strokeWidth={16} /></div>
      <div className="absolute"><Ring progress={65} color="#34C759" size={104} strokeWidth={16} delay={0.2} /></div>
      <div className="absolute"><Ring progress={45} color="#007AFF" size={68} strokeWidth={16} delay={0.4} /></div>
    </div>
  );
};
