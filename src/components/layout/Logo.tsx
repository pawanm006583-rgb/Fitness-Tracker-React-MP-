import { cn } from '../../utils/cn';

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <div className={cn("relative flex items-center justify-center", className)}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path 
        d="M50 15L85 75H15L50 15Z" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-brand opacity-20"
      />
      <path 
        d="M35 75L50 45L65 75" 
        stroke="currentColor" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-brand"
      />
      <circle cx="50" cy="25" r="5" fill="currentColor" className="text-brand animate-pulse" />
      <path 
        d="M20 75H80" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="text-muted/30"
      />
    </svg>
  </div>
);

export const Wordmark = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col -space-y-1", className)}>
    <span className="text-xl font-black tracking-tighter uppercase italic">Aesther</span>
    <span className="text-[7px] font-bold tracking-[0.3em] uppercase text-brand text-right">Intelligence</span>
  </div>
);
