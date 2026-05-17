import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export const Card = ({ children, className, hover = false, border = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "bg-bg-card rounded-lg overflow-hidden relative group",
        border && "border border-border-subtle",
        hover && "hover:border-border-active hover:bg-bg-hover/50 transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Subtle top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={cn("px-5 py-4 border-b border-border-subtle flex items-center justify-between", className)}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("p-5", className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className }) => (
  <div className={cn("px-5 py-3 bg-white/2 border-t border-border-subtle", className)}>
    {children}
  </div>
);
