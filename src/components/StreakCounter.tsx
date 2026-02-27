import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        animate={days > 0 ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
      >
        <Flame className={`w-5 h-5 ${days > 0 ? 'text-secondary' : 'text-muted-foreground'}`} />
      </motion.div>
      <span className="font-heading font-semibold text-foreground">
        {days} day{days !== 1 ? 's' : ''}
      </span>
    </div>
  );
}
