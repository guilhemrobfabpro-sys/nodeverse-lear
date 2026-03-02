import { motion } from 'framer-motion';
import { useClerk } from '@clerk/clerk-react';
import { AppLayout } from '@/components/AppLayout';
import { XPBar } from '@/components/XPBar';
import { LevelBadge } from '@/components/LevelBadge';
import { useUser, getLevelName } from '@/contexts/UserContext';
import { badges as allBadges } from '@/data/badges';
import { levels } from '@/data/levels';
import { Flame, Zap, Trophy, Star, Sparkles, Shield, BookOpen, Target, LogOut, Settings, Sprout, Bot, Building2, Rocket, Dumbbell, Moon, Sun, Link2, BarChart3, Wrench, BookMarked } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

const ICON_MAP: Record<string, FC<LucideProps>> = {
  Sprout, Zap, Bot, Building2, Rocket, Flame, Dumbbell, Moon, Sun,
  Link2, BarChart3, Wrench, BookOpen, Target, Trophy, Star, BookMarked,
};
import { Link } from 'react-router-dom';

const rarityConfig: Record<string, { border: string; bg: string; glow: string; label: string }> = {
  common: { border: 'border-border', bg: 'from-muted/10 to-transparent', glow: '', label: 'Common' },
  rare: { border: 'border-primary/30', bg: 'from-primary/8 to-transparent', glow: '', label: 'Rare' },
  epic: { border: 'border-secondary/30', bg: 'from-secondary/8 to-transparent', glow: '', label: 'Epic' },
  legendary: { border: 'border-yellow-400/30', bg: 'from-yellow-500/8 to-transparent', glow: '', label: 'Legendary' },
};

const categoryIcons: Record<string, React.ReactNode> = {
  progression: <Star className="w-3 h-3" />,
  activity: <Flame className="w-3 h-3" />,
  skill: <Shield className="w-3 h-3" />,
  social: <Trophy className="w-3 h-3" />,
};

export default function Profile() {
  const { state } = useUser();
  const { signOut } = useClerk();
  const { user, badges, progress } = state;

  const completedCount = Object.values(progress).filter(p => p.status === 'complete').length;
  const totalModules = levels.reduce((sum, l) => sum + l.modules.length, 0);

  const completedByLevel = levels.map(level => {
    const completed = level.modules.filter(m => progress[m.id]?.status === 'complete').length;
    return { ...level, completed, total: level.modules.length, pct: Math.round((completed / level.modules.length) * 100) };
  });

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-muted border border-border flex items-center justify-center text-xl sm:text-2xl font-heading font-bold text-foreground shrink-0">
              {(user.name || 'L')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-heading font-semibold text-foreground truncate">{user.name || 'Learner'}</h1>
              <LevelBadge level={user.level} size="sm" />
              <div className="flex items-center gap-3 sm:gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs sm:text-sm">
                  <Flame className="w-3.5 h-3.5 text-secondary" />
                  <span className="font-medium text-secondary">{user.streak}</span>
                  <span className="text-muted-foreground text-[10px] sm:text-xs">streak</span>
                </span>
                <span className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium text-foreground">{user.xp.toLocaleString()}</span>
                  <span className="text-[10px] sm:text-xs">XP</span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-5">
            <XPBar />
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-5">
            {[
              { icon: BookOpen, label: 'Lessons', value: `${completedCount}/${totalModules}`, color: 'text-primary' },
              { icon: Trophy, label: 'Badges', value: `${badges.length}/${allBadges.length}`, color: 'text-secondary' },
              { icon: Target, label: 'Level', value: getLevelName(user.level), color: 'text-accent' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-muted/50 border border-border/50 p-2.5 sm:p-3 text-center">
                <s.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-1 ${s.color}`} />
                <p className="text-xs sm:text-sm font-heading font-semibold text-foreground">{s.value}</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Level progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-2.5 sm:mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /> Level Progress
          </h2>
          <div className="space-y-2">
            {completedByLevel.map((level, i) => (
              <motion.div 
                key={level.id} 
                className="glass rounded-xl p-3 sm:p-4 relative overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {level.pct === 100 && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}
                <div className="relative flex items-center gap-2.5 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {(() => { const Icon = ICON_MAP[level.icon]; return Icon ? <Icon className="w-4 h-4 text-primary" /> : null; })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium text-foreground truncate">Level {level.id} — {level.title}</span>
                      <span className="text-xs font-heading font-bold text-foreground shrink-0 ml-2">{level.pct}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${level.pct === 100 ? 'bg-accent' : 'bg-primary'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${level.pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono shrink-0">{level.completed}/{level.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-base sm:text-lg font-heading font-semibold text-foreground mb-2.5 sm:mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" /> 
            Badges
            <span className="text-xs text-muted-foreground font-normal ml-1">{badges.length}/{allBadges.length}</span>
          </h2>
          
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
            {allBadges.map((badge, i) => {
              const earned = badges.includes(badge.id);
              const rc = rarityConfig[badge.rarity];
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  whileTap={earned ? { scale: 0.9 } : {}}
                  className={`glass rounded-xl p-3 sm:p-4 text-center transition-all relative overflow-hidden ${
                    earned ? rc.border : 'opacity-25'
                  }`}
                >
                  {earned && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${rc.bg}`} />
                  )}
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-1 sm:mb-2">
                      {(() => { const Icon = ICON_MAP[badge.icon]; return Icon ? <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" /> : null; })()}
                    </div>
                    <p className="text-[10px] sm:text-sm font-semibold text-foreground leading-tight">{badge.name}</p>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2">{badge.description}</p>
                    <div className="mt-1 sm:mt-2 flex items-center justify-center gap-1">
                      {earned ? (
                        <span className="text-[9px] sm:text-[10px] text-accent font-semibold">✓ Earned</span>
                      ) : (
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground flex items-center gap-0.5">
                          {categoryIcons[badge.category]} {rc.label}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Account actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          <Link
            to="/settings"
            className="flex-1 glass rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:border-primary/40 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary" />
            </div>
            <span className="font-heading font-medium text-sm text-foreground">Settings</span>
          </Link>
          <button
            onClick={() => signOut({ redirectUrl: '/sign-in' })}
            className="flex-1 glass rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 hover:border-destructive/40 transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-destructive" />
            </div>
            <span className="font-heading font-medium text-sm text-foreground">Sign Out</span>
          </button>
        </motion.div>
      </div>
    </AppLayout>
  );
}
