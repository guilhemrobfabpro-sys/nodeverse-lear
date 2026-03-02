import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Clock, Star, Trophy, Zap, Flame, Sprout, Bot, Building2, Rocket, Dumbbell, Moon, Sun, Link2, BarChart3, Wrench, BookOpen, Target, BookMarked } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

const ICON_MAP: Record<string, FC<LucideProps>> = {
  Sprout, Zap, Bot, Building2, Rocket, Flame, Dumbbell, Moon, Sun,
  Link2, BarChart3, Wrench, BookOpen, Target, Trophy, Star, BookMarked,
};
import { AppLayout } from '@/components/AppLayout';
import { useUser } from '@/contexts/UserContext';
import { levels } from '@/data/levels';
import { Progress } from '@/components/ui/progress';

const levelGradients: Record<string, string> = {
  accent: 'from-accent/20 via-accent/5 to-transparent',
  secondary: 'from-secondary/20 via-secondary/5 to-transparent',
  primary: 'from-primary/20 via-primary/5 to-transparent',
};

const dotColorMap: Record<string, string> = {
  accent: 'bg-accent',
  secondary: 'bg-secondary',
  primary: 'bg-primary',
};

const borderMap: Record<string, string> = {
  accent: 'border-accent/30',
  secondary: 'border-secondary/30',
  primary: 'border-primary/30',
};

const glowMap: Record<string, string> = {
  accent: 'glow-green',
  secondary: 'glow-orange',
  primary: 'glow-purple',
};

export default function LearningPath() {
  const { state } = useUser();
  const { progress } = state;

  const totalCompleted = Object.values(progress).filter(p => p.status === 'complete').length;
  const totalModules = levels.reduce((sum, l) => sum + l.modules.length, 0);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 sm:mb-8">
          <div className="glass rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl font-heading font-semibold text-foreground">Learning Path</h1>
                <p className="text-muted-foreground text-xs sm:text-sm">Zero to automation hero</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground">Progress</p>
                <p className="font-heading font-semibold text-foreground text-base sm:text-lg">{totalCompleted}/{totalModules}</p>
              </div>
            </div>
            <Progress value={(totalCompleted / totalModules) * 100} className="h-1.5" />
          </div>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">

          {levels.map((level, li) => {
            const moduleStatuses = level.modules.map(m => progress[m.id]?.status || 'available');
            const completedModules = moduleStatuses.filter(s => s === 'complete').length;
            const isComplete = completedModules === level.modules.length;
            const progressPct = (completedModules / level.modules.length) * 100;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: li * 0.1 }}
              >
                <div className={`glass rounded-2xl overflow-hidden transition-all ${borderMap[level.color] || ''} ${isComplete ? glowMap[level.color] : ''}`}>
                  {/* Level header */}
                  <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border-b border-border/40">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${dotColorMap[level.color] || 'bg-primary'} flex items-center justify-center shrink-0`}>
                      {isComplete ? <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" /> : (() => { const Icon = ICON_MAP[level.icon]; return Icon ? <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" /> : null; })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">LEVEL {level.id}</span>
                        {isComplete && (
                          <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-accent/15 text-accent font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Done
                          </span>
                        )}
                      </div>
                      <h2 className="font-heading font-semibold text-foreground text-sm sm:text-base leading-tight truncate">{level.title}</h2>
                      <div className="flex items-center gap-2 sm:gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground"><Clock className="w-2.5 h-2.5" />{level.duration}</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground">{level.lessonCount} lessons</span>
                      </div>
                    </div>
                    <div className="shrink-0 w-12 sm:w-16 text-center relative">
                      <motion.div
                        className="text-lg sm:text-2xl font-bold font-heading text-foreground"
                        key={progressPct}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                      >
                        {Math.round(progressPct)}%
                      </motion.div>
                      <Progress value={progressPct} className="h-1 mt-1" />
                    </div>
                  </div>

                  {/* Modules */}
                  <div className="p-2 sm:p-3 space-y-0.5 sm:space-y-1">
                    {level.modules.map((mod, mi) => {
                      const status = progress[mod.id]?.status || 'available';
                      const isModComplete = status === 'complete';

                      return (
                        <motion.div
                          key={mod.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: li * 0.1 + mi * 0.03 }}
                        >
                          <Link
                            to={`/lesson/${mod.id}`}
                            className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all hover:bg-muted/30 group active:bg-muted/40 ${
                              mod.isMilestone ? `bg-gradient-to-r ${levelGradients[level.color]} border ${borderMap[level.color]}` : ''
                            }`}
                          >
                            {isModComplete ? (
                              <motion.div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring' }}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                              </motion.div>
                            ) : (
                              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 ${borderMap[level.color] || 'border-primary/30'} flex items-center justify-center shrink-0`}>
                                <motion.div
                                  className={`w-2 h-2 rounded-full ${dotColorMap[level.color] || 'bg-primary'}`}
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground">{mod.id}</span>
                                {mod.isMilestone && (
                                  <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-secondary/20 text-secondary flex items-center gap-0.5">
                                    <Trophy className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> Milestone
                                  </span>
                                )}
                              </div>
                              <p className="font-medium text-foreground text-xs sm:text-sm truncate">{mod.title}</p>
                            </div>
                            <span className="text-[10px] sm:text-xs text-secondary font-semibold shrink-0 flex items-center gap-0.5">
                              <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />+{mod.xp}
                            </span>
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Level badge reward */}
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                    <div className="rounded-xl p-2.5 sm:p-3 bg-muted/40 border border-border/50 flex items-center gap-2.5 sm:gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {(() => { const Icon = ICON_MAP[level.badge.icon]; return Icon ? <Icon className="w-4 h-4 text-primary" /> : null; })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] sm:text-xs text-muted-foreground">Level reward</p>
                        <p className="text-xs sm:text-sm font-heading font-semibold text-foreground truncate">{level.badge.name}</p>
                      </div>
                      {isComplete && (
                        <span className="text-[10px] sm:text-xs text-accent font-semibold flex items-center gap-1 shrink-0"><CheckCircle2 className="w-3 h-3" /> Earned</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
