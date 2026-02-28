import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Gamepad2, Clock, Flame, Sparkles, Target, BarChart3, Trophy, Zap, Star, TrendingUp } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { XPBar } from '@/components/XPBar';
import { LevelBadge } from '@/components/LevelBadge';
import { useUser, getLevelName } from '@/contexts/UserContext';
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
  const { state, updateStreak } = useUser();
  const { user, progress, badges } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user.onboarded) {
      navigate('/onboarding', { replace: true });
    }
  }, [state.user.onboarded, navigate]);

  updateStreak();

  const currentLesson = Object.entries(progress).find(([, p]) => p.status === 'in_progress' || p.status === 'available');
  const completedCount = Object.values(progress).filter(p => p.status === 'complete').length;
  const totalLessons = levels.reduce((sum, l) => sum + l.modules.length, 0);
  const currentModule = currentLesson ? levels.flatMap(l => l.modules).find(m => m.id === currentLesson[0]) : null;
  const currentLevelInfo = currentLesson ? levels.find(l => l.modules.some(m => m.id === currentLesson[0])) : null;
  const earnedBadges = allBadges.filter(b => badges.includes(b.id));

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
        <motion.div variants={item} className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-tr from-secondary/10 to-transparent rounded-tr-full" />
          
          <div className="relative flex items-center gap-3 sm:gap-4">
            <motion.div 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center border border-primary/20"
              whileTap={{ scale: 0.9, rotate: 10 }}
            >
              <span className="text-2xl sm:text-3xl">👋</span>
            </motion.div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-heading font-bold text-foreground truncate">
                Welcome back, {user.name || 'Learner'}
              </h1>
              <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                <LevelBadge level={user.level} size="sm" />
                <div className="flex items-center gap-1 text-xs sm:text-sm">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                    <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
                  </motion.div>
                  <span className="font-semibold text-secondary">{user.streak}</span>
                  <span className="text-muted-foreground text-[10px] sm:text-xs">day streak</span>
                  {streakMultiplier > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/20 text-secondary font-semibold ml-0.5">
                      x{streakMultiplier} XP
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-3 sm:mt-4">
            <XPBar />
          </div>
        </motion.div>

        {/* Quick stats - mobile horizontal scroll */}
        <motion.div variants={item} className="flex gap-2 sm:hidden overflow-x-auto scrollbar-hide -mx-3 px-3 pb-1">
          {[
            { value: user.xp.toLocaleString(), label: 'XP', icon: Zap, color: 'text-secondary' },
            { value: user.level, label: 'Level', icon: Star, color: 'text-primary' },
            { value: completedCount, label: 'Lessons', icon: BookOpen, color: 'text-accent' },
            { value: `${user.streak}🔥`, label: 'Streak', icon: Flame, color: 'text-secondary' },
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
              <motion.div variants={item} whileTap={{ scale: 0.98 }}>
                <Link to={`/lesson/${currentModule.id}`} className="block glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all group relative active:bg-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 sm:p-5 relative">
                    <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-2">
                      <BookOpen className="w-3.5 h-3.5" /> Continue Learning
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-mono text-muted-foreground">{currentLevelInfo?.icon} Module {currentModule.id}</span>
                        <h3 className="font-heading font-bold text-foreground text-base sm:text-lg truncate">{currentModule.title}</h3>
                      </div>
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 ml-3"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>
                    <Progress value={33} className="h-1.5 mt-3 max-w-xs" />
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Daily Challenge */}
            <motion.div variants={item}>
              <Link to="/challenges" className="block glass rounded-2xl overflow-hidden border-secondary/20 hover:border-secondary/40 transition-all group relative active:bg-secondary/5">
                <div className="bg-gradient-to-r from-secondary/10 to-transparent p-4 sm:p-5 flex items-center gap-3 sm:gap-4 relative">
                  <motion.div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-secondary font-semibold mb-0.5">
                      <Sparkles className="w-3 h-3" /> Daily Challenge
                    </div>
                    <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base truncate">Build a webhook → Slack notification</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> 15m</span>
                      <span className="text-xs text-secondary font-semibold">⚡ +150 XP</span>
                    </div>
                  </div>
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
                      <motion.span 
                        className="text-2xl"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        {b.icon}
                      </motion.span>
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
              <div className="bg-gradient-to-r from-primary/10 to-transparent px-5 py-3 flex items-center gap-2 border-b border-border/20">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="font-heading font-semibold text-sm text-primary">Your Stats</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: user.xp.toLocaleString(), label: 'Total XP', icon: Zap, color: 'text-secondary' },
                    { value: user.level, label: 'Level', icon: Star, color: 'text-primary' },
                    { value: completedCount, label: 'Lessons', icon: BookOpen, color: 'text-accent' },
                    { value: `${user.streak}🔥`, label: 'Streak', icon: Flame, color: 'text-secondary' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="rounded-xl bg-muted/30 p-3 text-center relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="text-xl font-heading font-bold text-foreground relative">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground relative">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick links - 2-column grid on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              <Link to="/learning-path" className="block glass rounded-2xl p-3 sm:p-4 hover:border-primary/40 transition-all group active:bg-muted/30">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">🗺️</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">Learning Path</h3>
                    <p className="text-[10px] text-muted-foreground hidden sm:block">View full curriculum</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors hidden sm:block" />
                </div>
              </Link>

              <Link to="/leaderboard" className="block glass rounded-2xl p-3 sm:p-4 hover:border-secondary/40 transition-all group border-secondary/10 active:bg-muted/30">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">Leaderboard</h3>
                    <p className="text-[10px] text-muted-foreground hidden sm:block flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5" /> See your rank
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-secondary transition-colors hidden sm:block" />
                </div>
              </Link>

              <Link to="/profile" className="block glass rounded-2xl p-3 sm:p-4 hover:border-primary/40 transition-all group col-span-2 sm:col-span-1 active:bg-muted/30">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-accent/10 flex items-center justify-center">🏅</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm">Badges</h3>
                    <p className="text-[10px] text-muted-foreground">{badges.length} earned</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors hidden sm:block" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
