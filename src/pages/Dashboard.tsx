import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Flame, Sparkles, Target, BarChart3, Trophy, Zap, Star, TrendingUp, GraduationCap, Map, Medal, Sprout, Bot, Building2, Rocket, Dumbbell, Moon, Sun, Link2, Wrench, BookMarked } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

const BADGE_ICON_MAP: Record<string, FC<LucideProps>> = {
  Sprout, Zap, Bot, Building2, Rocket, Flame, Dumbbell, Moon, Sun,
  Link2, BarChart3, Wrench, BookOpen, Target, Trophy, Star, BookMarked,
};
import { AppLayout } from '@/components/AppLayout';
import { XPBar } from '@/components/XPBar';
import { LevelBadge } from '@/components/LevelBadge';
import { useUser } from '@/contexts/UserContext';
import { levels } from '@/data/levels';
import { badges as allBadges } from '@/data/badges';
import { Progress } from '@/components/ui/progress';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { state, syncing, updateStreak } = useUser();
  const { user, progress, badges } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (syncing) return;
    if (!state.user.onboarded) {
      navigate('/onboarding', { replace: true });
    }
  }, [state.user.onboarded, syncing, navigate]);

  // Must be in useEffect — calling updateStreak() in the render body causes
  // a state update on every render, leading to an infinite render loop.
  useEffect(() => {
    updateStreak();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentLesson = useMemo(
    () => Object.entries(progress).find(([, p]) => p.status === 'in_progress' || p.status === 'available'),
    [progress]
  );
  const completedCount = useMemo(
    () => Object.values(progress).filter(p => p.status === 'complete').length,
    [progress]
  );
  const allModules = useMemo(() => levels.flatMap(l => l.modules), []);
  const currentModule = useMemo(
    () => (currentLesson ? allModules.find(m => m.id === currentLesson[0]) : null),
    [currentLesson, allModules]
  );
  const currentLevelInfo = useMemo(
    () => (currentLesson ? levels.find(l => l.modules.some(m => m.id === currentLesson[0])) : null),
    [currentLesson]
  );
  // Actual progress percentage through the current level's modules
  const currentLevelProgressPct = useMemo(() => {
    if (!currentLevelInfo) return 0;
    const completed = currentLevelInfo.modules.filter(
      m => progress[m.id]?.status === 'complete'
    ).length;
    return Math.round((completed / currentLevelInfo.modules.length) * 100);
  }, [currentLevelInfo, progress]);
  const earnedBadges = useMemo(() => allBadges.filter(b => badges.includes(b.id)), [badges]);

  const streakMultiplier = user.streak >= 30 ? 2 : user.streak >= 14 ? 1.5 : user.streak >= 7 ? 1.25 : user.streak >= 3 ? 1.1 : 1;

  return (
    <AppLayout>
      <motion.div 
        className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Welcome header */}
        <motion.div variants={item} className="glass rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg font-heading font-semibold text-foreground truncate">
                Welcome back, {user.name || 'Learner'}
              </h1>
              <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                <LevelBadge level={user.level} size="sm" />
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                  <span className="font-semibold text-secondary">{user.streak}</span>
                  <span className="text-muted-foreground text-[10px] sm:text-xs">day streak</span>
                  {streakMultiplier > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-semibold ml-0.5">
                      x{streakMultiplier} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <XPBar />
          </div>
        </motion.div>

        {/* Quick stats - mobile horizontal scroll */}
        <motion.div variants={item} className="flex gap-2 sm:hidden overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1">
          {[
            { value: user.xp.toLocaleString(), label: 'XP', icon: Zap, color: 'text-secondary' },
            { value: user.level, label: 'Level', icon: Star, color: 'text-primary' },
            { value: completedCount, label: 'Lessons', icon: BookOpen, color: 'text-accent' },
            { value: user.streak, label: 'Streak', icon: Flame, color: 'text-secondary' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl p-3 text-center min-w-[80px] shrink-0"
              whileTap={{ scale: 0.95 }}
            >
              <p className="text-lg font-heading font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5">
            {/* Continue learning */}
            {currentModule && (
              <motion.div variants={item}>
                <Link to={`/lesson/${currentModule.id}`} className="block glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all group">
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                      <BookOpen className="w-3.5 h-3.5" /> Continue Learning
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono text-muted-foreground">{currentModule.id}</span>
                        <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg truncate mt-0.5">{currentModule.title}</h3>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 ml-3 group-hover:border-primary/30 transition-colors">
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    <Progress value={currentLevelProgressPct} className="h-1 mt-4 max-w-xs" />
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Daily Challenge */}
            <motion.div variants={item}>
              <Link to="/challenges" className="block glass rounded-2xl overflow-hidden hover:border-border/80 transition-all group">
                <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-0.5">
                      <Sparkles className="w-3 h-3" /> Daily Challenge
                    </div>
                    <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base truncate">Build a webhook → Slack notification</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> 15m</span>
                      <span className="text-xs text-secondary font-medium flex items-center gap-1"><Zap className="w-3 h-3" /> +150 XP</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </div>
              </Link>
            </motion.div>

            {/* Recent badges */}
            {earnedBadges.length > 0 && (
              <motion.div variants={item}>
                <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Achievements</p>
                <div className="flex gap-2.5 sm:gap-3 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1 sm:mx-0 sm:px-0 sm:flex-wrap">
                  {earnedBadges.slice(-3).map((b, i) => (
                    <motion.div 
                      key={b.id} 
                      className="glass rounded-xl p-3 flex items-center gap-3 min-w-[180px] sm:min-w-0 shrink-0 sm:shrink"
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        {(() => { const Icon = BADGE_ICON_MAP[b.icon]; return Icon ? <Icon className="w-5 h-5 text-primary" /> : null; })()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">{b.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{b.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Stats sidebar - hidden on mobile since we have horizontal stats */}
          <motion.div variants={item} className="space-y-3 sm:space-y-4">
            <div className="glass rounded-2xl overflow-hidden hidden sm:block">
              <div className="px-5 py-3 flex items-center gap-2 border-b border-border/40">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="font-heading font-semibold text-sm text-foreground">Stats</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: user.xp.toLocaleString(), label: 'Total XP', icon: Zap, color: 'text-secondary' },
                    { value: user.level, label: 'Level', icon: Star, color: 'text-primary' },
                    { value: completedCount, label: 'Lessons', icon: BookOpen, color: 'text-accent' },
                    { value: user.streak, label: 'Streak', icon: Flame, color: 'text-secondary' },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl bg-muted/50 border border-border/50 p-3 text-center">
                      <p className="text-lg font-heading font-bold text-foreground">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick links - 2-column grid on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              <Link to="/learning-path" className="block glass rounded-2xl p-3 sm:p-4 hover:border-border/80 transition-all group">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                    <Map className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">Learning Path</h3>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">View full curriculum</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
                </div>
              </Link>

              <Link to="/leaderboard" className="block glass rounded-2xl p-3 sm:p-4 hover:border-border/80 transition-all group">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">Leaderboard</h3>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">See your rank</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
                </div>
              </Link>

              <Link to="/profile" className="block glass rounded-2xl p-3 sm:p-4 hover:border-border/80 transition-all group col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                    <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">Badges</h3>
                    <p className="text-[10px] text-muted-foreground">{badges.length} earned</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
