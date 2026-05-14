import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 active:scale-95 shadow-sm",
    secondary: "bg-bg-card border border-border-subtle text-white hover:bg-bg-hover shadow-inner",
    outline: "border border-border-subtle text-white/80 hover:text-white hover:border-white/20",
    ghost: "text-white/60 hover:text-white hover:bg-white/5",
    subtle: "bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-medium",
    md: "px-4 py-2 text-sm font-medium",
    lg: "px-6 py-3 text-base font-semibold",
    icon: "p-2",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98, y: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
