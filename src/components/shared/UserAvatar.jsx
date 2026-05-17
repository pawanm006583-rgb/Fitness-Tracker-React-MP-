import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import { cn } from '../../utils/cn';

export const UserAvatar = ({ className, size = "md", showGlow = false, innerClassName }) => {
  const { user } = useUserStore();
  
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    '2xl': "w-32 h-32"
  };

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'A';

  return (
    <div className={cn("relative group", className)}>
      {showGlow && (
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-brand rounded-full blur-xl -z-10"
        />
      )}
      
      <div className={cn(
        "rounded-xl overflow-hidden border border-white/10 relative bg-bg-card flex items-center justify-center transition-all duration-500",
        size !== 'custom' ? sizeClasses[size] : "",
        innerClassName
      )}>
        {user.profileImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            src={user.profileImage}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand/20 to-violet-500/20 flex items-center justify-center">
            <span className={cn(
              "font-black text-brand tracking-tighter",
              size === 'xs' || size === 'sm' ? "text-[10px]" : "text-sm"
            )}>
              {initials}
            </span>
          </div>
        )}
        
        {/* Futuristic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none" />
      </div>
    </div>
  );
};
