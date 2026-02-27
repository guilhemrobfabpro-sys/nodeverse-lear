import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Lightbulb, Zap, Code2, Target, Eye, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { QuizBlock } from '@/components/QuizBlock';
import { useUser } from '@/contexts/UserContext';
import { lessons } from '@/data/lessons';
import { levels } from '@/data/levels';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LevelUpCeremony } from '@/components/LevelUpCeremony';

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, completeLesson } = useUser();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  const lesson = id ? lessons[id] : null;
  if (!lesson) {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <motion.div 
            className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <BookOpen className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Coming Soon</h1>
          <p className="text-muted-foreground mb-6">This lesson is being prepared. Check back later!</p>
          <Link to="/learning-path" className="text-primary hover:underline">← Back to Learning Path</Link>
        </div>
      </AppLayout>
    );
  }

  const levelInfo = levels.find(l => l.modules.some(m => m.id === id));
  const moduleIndex = levelInfo?.modules.findIndex(m => m.id === id) ?? 0;
  const isComplete = state.progress[id!]?.status === 'complete';
  const allModuleIds = levels.flatMap(l => l.modules.map(m => m.id));
  const currentIdx = allModuleIds.indexOf(id!);
  const prevId = currentIdx > 0 ? allModuleIds[currentIdx - 1] : null;
  const nextId = currentIdx < allModuleIds.length - 1 ? allModuleIds[currentIdx + 1] : null;
  const progressPct = levelInfo ? ((moduleIndex + (isComplete ? 1 : 0)) / levelInfo.modules.length) * 100 : 0;

  const handleComplete = () => {
    if (id && !isComplete) {
      const prevLevel = state.user.level;
      completeLesson(id);
      // Check level up (slight delay for state update)
      setTimeout(() => {
        const newState = JSON.parse(localStorage.getItem('flowmaster_state') || '{}');
        if (newState?.user?.level > prevLevel) {
          setNewLevel(newState.user.level);
          setShowLevelUp(true);
        }
      }, 100);
    }
    if (nextId) navigate(`/lesson/${nextId}`);
  };

  const toggleSection = (i: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const sectionColors = {
    concept: { icon: <BookOpen className="w-4 h-4" />, gradient: 'from-primary/15 to-transparent', border: 'border-primary/20', text: 'text-primary', bg: 'bg-primary/20' },
    analogy: { icon: <Lightbulb className="w-4 h-4" />, gradient: 'from-secondary/15 to-transparent', border: 'border-secondary/20', text: 'text-secondary', bg: 'bg-secondary/20' },
    visual: { icon: <Eye className="w-4 h-4" />, gradient: 'from-accent/15 to-transparent', border: 'border-accent/20', text: 'text-accent', bg: 'bg-accent/20' },
    code: { icon: <Code2 className="w-4 h-4" />, gradient: 'from-blue-500/15 to-transparent', border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-500/20' },
    challenge: { icon: <Target className="w-4 h-4" />, gradient: 'from-accent/15 to-transparent', border: 'border-accent/20', text: 'text-accent', bg: 'bg-accent/20' },
    quiz: { icon: <Sparkles className="w-4 h-4" />, gradient: 'from-secondary/15 to-transparent', border: 'border-secondary/20', text: 'text-secondary', bg: 'bg-secondary/20' },
    interactive: { icon: <Zap className="w-4 h-4" />, gradient: 'from-primary/15 to-transparent', border: 'border-primary/20', text: 'text-primary', bg: 'bg-primary/20' },
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-5 sm:mb-8">
          <Link to="/learning-path" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-3 sm:mb-4 group">
            <motion.div animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowLeft className="w-3.5 h-3.5" />
            </motion.div>
            <span>Learning Path</span>
          </Link>

          <div className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/5 to-transparent rounded-tr-full" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-mono px-2 py-1 rounded-md bg-primary/10 text-primary">{levelInfo?.icon} {id}</span>
                {isComplete && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" /> Complete
                  </motion.span>
                )}
                <span className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary flex items-center gap-1">
                  <Zap className="w-3 h-3" /> +50 XP
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-heading font-bold text-foreground">{lesson.title}</h1>
              <p className="text-sm text-muted-foreground mt-1 max-w-lg">{lesson.description}</p>
              
              <div className="mt-4 flex items-center gap-3">
                <Progress value={progressPct} className="h-2.5 flex-1 max-w-xs" />
                <span className="text-xs text-muted-foreground font-mono">{moduleIndex + 1}/{levelInfo?.modules.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table of contents mini */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.05 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sections</p>
          <div className="flex flex-wrap gap-2">
            {lesson.sections.map((section, i) => {
              const sc = sectionColors[section.type] || sectionColors.concept;
              return (
                <button
                  key={i}
                  onClick={() => document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className={`text-[10px] px-2 py-1 rounded-md border ${sc.border} ${sc.text} hover:bg-muted/30 transition-colors flex items-center gap-1`}
                >
                  {sc.icon}
                  {section.title?.substring(0, 20) || section.type}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-5">
          {lesson.sections.map((section, i) => {
            const sc = sectionColors[section.type] || sectionColors.concept;
            
            return (
              <motion.div
                key={i}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {section.type === 'quiz' && section.quiz ? (
                  <QuizBlock
                    question={section.quiz.question}
                    options={section.quiz.options}
                    correct={section.quiz.correct}
                    explanation={section.quiz.explanation}
                  />
                ) : (
                  <div className={`glass rounded-2xl overflow-hidden ${sc.border}`}>
                    {/* Section header */}
                    <button
                      onClick={() => toggleSection(i)}
                      className={`w-full bg-gradient-to-r ${sc.gradient} px-5 py-3 flex items-center gap-2 border-b border-border/20 text-left`}
                    >
                      <div className={`w-7 h-7 rounded-lg ${sc.bg} flex items-center justify-center`}>
                        <span className={sc.text}>{sc.icon}</span>
                      </div>
                      <span className={`font-heading font-semibold text-sm ${sc.text} flex-1`}>{section.title}</span>
                      {section.type === 'challenge' && section.challenge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-semibold">
                          ⚡ +{section.challenge.reward.xp} XP
                        </span>
                      )}
                      <motion.div
                        animate={{ rotate: expandedSections.has(i) ? 180 : 0 }}
                        className="text-muted-foreground"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    {/* Content */}
                    <AnimatePresence initial={false}>
                      {!expandedSections.has(i) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 space-y-4">
                            {section.content && (
                              <div className="text-foreground text-sm leading-relaxed">
                                {section.content.split('\n\n').map((para, j) => (
                                  <p key={j} className={j > 0 ? 'mt-3' : ''}>
                                    {para.split('**').map((part, k) =>
                                      k % 2 === 1 ? <strong key={k} className={sc.text}>{part}</strong> : part
                                    )}
                                  </p>
                                ))}
                              </div>
                            )}
                            
                            {section.highlight && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex gap-3 p-3 rounded-xl bg-gradient-to-r ${sc.gradient} border ${sc.border}`}
                              >
                                <Sparkles className={`w-4 h-4 ${sc.text} shrink-0 mt-0.5`} />
                                <p className="text-sm text-foreground">{section.highlight}</p>
                              </motion.div>
                            )}

                            {section.items && (
                              <div className="grid gap-2">
                                {section.items.map((item, j) => (
                                  <motion.div
                                    key={j}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.05 }}
                                    className="flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/20 group hover:bg-muted/50 transition-colors"
                                  >
                                    {section.type === 'visual' ? (
                                      <span className="text-lg shrink-0">{item.substring(0, 2)}</span>
                                    ) : (
                                      <div className={`w-6 h-6 rounded-md ${sc.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                        <Zap className={`w-3 h-3 ${sc.text}`} />
                                      </div>
                                    )}
                                    <span className="text-sm text-foreground leading-snug">
                                      {(section.type === 'visual' ? item.substring(2).trim() : item).split('**').map((part, k) =>
                                        k % 2 === 1 ? <strong key={k} className={sc.text}>{part}</strong> : part
                                      )}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {section.code && (
                              <pre className="bg-background/80 rounded-xl p-4 overflow-x-auto text-sm font-mono text-foreground border border-border/30 leading-relaxed">
                                {section.code}
                              </pre>
                            )}

                            {section.challenge && (
                              <div className="space-y-3">
                                <p className="text-foreground text-sm">{section.challenge.description}</p>
                                <div className="grid gap-2">
                                  {section.challenge.tasks.map((task, j) => (
                                    <motion.div
                                      key={j}
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.1 }}
                                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/20"
                                    >
                                      <div className="w-6 h-6 rounded-full border-2 border-accent/40 flex items-center justify-center shrink-0">
                                        <span className="text-xs font-mono text-accent">{j + 1}</span>
                                      </div>
                                      <span className="text-sm text-foreground">{task}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer nav */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between mt-10 pt-6 border-t border-border/30"
        >
          {prevId && lessons[prevId] ? (
            <Link to={`/lesson/${prevId}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group">
              <motion.div animate={{ x: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              Previous
            </Link>
          ) : <div />}

          <Button onClick={handleComplete} className="glow-purple gap-2 group" size="lg">
            {isComplete ? 'Next Lesson' : (
              <>
                Complete 
                <span className="text-xs bg-primary-foreground/20 px-1.5 py-0.5 rounded">+50 XP</span>
              </>
            )}
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      <LevelUpCeremony show={showLevelUp} level={newLevel} onClose={() => setShowLevelUp(false)} />
    </AppLayout>
  );
}
