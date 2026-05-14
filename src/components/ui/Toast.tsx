import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const NotificationToast = () => {
  const { notifications, clearNotifications } = useStore();

  return (
    <div className="fixed top-20 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="premium-card p-4 w-72 pointer-events-auto shadow-2xl border-brand/20 bg-bg-card/80 backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <div className={notif.type === 'success' ? 'text-brand' : 'text-rose-500'}>
                {notif.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">{notif.title}</p>
                <p className="text-xs text-muted leading-tight mt-0.5">{notif.desc}</p>
              </div>
              <button onClick={clearNotifications} className="text-muted hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
