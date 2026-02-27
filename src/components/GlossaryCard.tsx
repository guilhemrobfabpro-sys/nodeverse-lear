import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, CheckCircle2, BookOpen, Lightbulb, Zap, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface GlossaryCardProps {
  id: string;
  term: string;
  category: string;
  definition: string;
  analogy: string;
  example: string;
  quiz?: { question: string; options: string[]; correct: number };
}

const categoryConfig: Record<string, { color: string; bg: string; icon: string }> = {
  API: { color: 'text-secondary', bg: 'bg-secondary/10', icon: '🔗' },
  n8n: { color: 'text-primary', bg: 'bg-primary/10', icon: '⚡' },
  AI: { color: 'text-accent', bg: 'bg-accent/10', icon: '🤖' },
  Data: { color: 'text-blue-400', bg: 'bg-blue-500/10', icon: '📊' },
  Security: { color: 'text-destructive', bg: 'bg-destructive/10', icon: '🔒' },
};

export function GlossaryCard({ id, term, category, definition, analogy, example, quiz }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { state, toggleGlossaryFavorite, masterGlossaryTerm } = useUser();
  const isFav = state.glossary.favorites.includes(id);
  const isMastered = state.glossary.mastered.includes(id);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const cat = categoryConfig[category] || { color: 'text-muted-foreground', bg: 'bg-muted', icon: '📄' };

  const handleQuiz = (index: number) => {
    if (quizAnswer !== null || !quiz) return;
    setQuizAnswer(index);
    if (index === quiz.correct) masterGlossaryTerm(id);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden transition-all hover:border-primary/30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-muted/10 transition-colors"
      >
        <div className={`w-9 h-9 rounded-lg ${cat.bg} flex items-center justify-center shrink-0 text-base`}>
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-foreground">{term}</h3>
            {isMastered && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" /> Mastered
              </span>
            )}
          </div>
          <span className={`text-xs ${cat.color}`}>{category}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleGlossaryFavorite(id); }}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <Star className={`w-4 h-4 ${isFav ? 'text-secondary fill-secondary' : 'text-muted-foreground'}`} />
        </button>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-3 border-t border-border/20 pt-4">
              {/* Definition */}
              <div className="flex gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-0.5">Definition</p>
                  <p className="text-sm text-foreground leading-relaxed">{definition}</p>
                </div>
              </div>

              {/* Analogy */}
              <div className="flex gap-3 p-3 rounded-xl bg-secondary/5 border border-secondary/10">
                <div className="w-7 h-7 rounded-md bg-secondary/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3.5 h-3.5 text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-secondary font-semibold mb-0.5">Analogy</p>
                  <p className="text-sm text-foreground leading-relaxed">{analogy}</p>
                </div>
              </div>

              {/* Example */}
              <div className="flex gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10">
                <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-0.5">In n8n</p>
                  <p className="text-sm text-foreground leading-relaxed">{example}</p>
                </div>
              </div>

              {/* Quiz */}
              {quiz && (
                <div className="pt-2">
                  <p className="text-xs font-heading font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Test yourself
                  </p>
                  <p className="text-sm font-medium text-foreground mb-2">{quiz.question}</p>
                  <div className="grid gap-1.5">
                    {quiz.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuiz(i)}
                        className={`w-full text-left text-sm p-3 rounded-xl border transition-all flex items-center gap-2 ${
                          quizAnswer === null
                            ? 'border-border/30 hover:border-primary/50 hover:bg-muted/20'
                            : i === quiz.correct
                            ? 'border-accent bg-accent/10'
                            : i === quizAnswer
                            ? 'border-destructive bg-destructive/10'
                            : 'border-border/10 opacity-30'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          quizAnswer !== null && i === quiz.correct ? 'bg-accent/20 text-accent' :
                          quizAnswer !== null && i === quizAnswer ? 'bg-destructive/20 text-destructive' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {quizAnswer !== null && i === quiz.correct ? <CheckCircle2 className="w-3 h-3" /> :
                           String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizAnswer !== null && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-sm mt-2 font-semibold ${quizAnswer === quiz.correct ? 'text-accent' : 'text-destructive'}`}>
                      {quizAnswer === quiz.correct ? '✨ Mastered! +5 XP' : 'Try again next time!'}
                    </motion.p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
