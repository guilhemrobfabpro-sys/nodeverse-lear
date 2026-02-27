import { useUser, getXPForNextLevel, getXPForCurrentLevel } from '@/contexts/UserContext';
import { motion } from 'framer-motion';

interface XPBarProps {
  showLabel?: boolean;
  className?: string;
}

export function XPBar({ showLabel = true, className = '' }: XPBarProps) {
  const { state } = useUser();
  const { xp, level } = state.user;
  const currentLevelXP = getXPForCurrentLevel(level);
  const nextLevelXP = getXPForNextLevel(level);
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5 text-sm">
          <span className="text-muted-foreground">Level {level}</span>
          <span className="text-muted-foreground">{xp.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
        </div>
      )}
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ boxShadow: '0 0 10px hsl(262 55% 50% / 0.5)' }}
        />
      </div>
    </div>
  );
}
