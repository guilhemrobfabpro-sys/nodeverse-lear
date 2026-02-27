import { getLevelName } from '@/contexts/UserContext';

interface LevelBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
}

const levelColors: Record<number, string> = {
  1: 'from-emerald-500 to-emerald-700',
  2: 'from-blue-500 to-blue-700',
  3: 'from-purple-500 to-purple-700',
  4: 'from-orange-500 to-orange-700',
  5: 'from-yellow-500 to-yellow-700',
  6: 'from-pink-500 to-pink-700',
  7: 'from-red-500 to-red-700',
  8: 'from-indigo-500 to-indigo-700',
  9: 'from-cyan-500 to-cyan-700',
  10: 'from-amber-400 to-amber-600',
};

export function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${levelColors[level] || levelColors[1]} font-heading font-semibold text-primary-foreground ${sizeClasses[size]}`}>
      Lv.{level} · {getLevelName(level)}
    </span>
  );
}
