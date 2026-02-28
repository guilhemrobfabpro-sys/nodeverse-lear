import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Zap } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface QuizBlockProps {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  onComplete?: () => void;
}

const optionLetters = ['A', 'B', 'C', 'D'];
const optionColors = [
  'from-primary/20 to-primary/5 border-primary/40 hover:border-primary',
  'from-secondary/20 to-secondary/5 border-secondary/40 hover:border-secondary',
  'from-accent/20 to-accent/5 border-accent/40 hover:border-accent',
  'from-blue-500/20 to-blue-500/5 border-blue-500/40 hover:border-blue-500',
];

export function QuizBlock({ question, options, correct, explanation, onComplete }: QuizBlockProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const { addXP } = useUser();

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === correct) {
      addXP(30);
    }
    onComplete?.();
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-secondary/20 to-secondary/5 px-6 py-3 flex items-center gap-2 border-b border-border/30">
        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-secondary" />
        </div>
        <span className="font-heading font-semibold text-sm text-secondary">Quick Check</span>
        {!answered && (
          <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">+30 XP</span>
        )}
      </div>

      <div className="p-6 space-y-5">
        <p className="text-foreground font-heading font-semibold text-base leading-snug">{question}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt, i) => {
            let stateClass = '';
            if (answered) {
              if (i === correct) stateClass = 'ring-2 ring-accent border-accent bg-accent/10 scale-[1.02]';
              else if (i === selected) stateClass = 'ring-2 ring-destructive border-destructive bg-destructive/10 opacity-80';
              else stateClass = 'opacity-40 pointer-events-none';
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                whileHover={!answered ? { scale: 1.02, y: -2 } : {}}
                whileTap={!answered ? { scale: 0.98 } : {}}
                className={`relative text-left p-4 rounded-xl border-2 bg-gradient-to-br transition-all duration-300 ${
                  !answered ? optionColors[i] : ''
                } ${stateClass} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                    answered && i === correct ? 'bg-accent text-accent-foreground' : 
                    answered && i === selected ? 'bg-destructive text-destructive-foreground' :
                    'bg-muted/80 text-muted-foreground'
                  }`}>
                    {answered && i === correct ? <CheckCircle2 className="w-4 h-4" /> :
                     answered && i === selected && i !== correct ? <XCircle className="w-4 h-4" /> :
                     optionLetters[i]}
                  </span>
                  <span className="text-foreground text-sm leading-snug pt-1">{opt}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`rounded-xl p-4 flex gap-3 ${
                selected === correct 
                  ? 'bg-accent/10 border border-accent/30' 
                  : 'bg-destructive/10 border border-destructive/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selected === correct ? 'bg-accent/20' : 'bg-destructive/20'
              }`}>
                {selected === correct ? (
                  <Zap className="w-5 h-5 text-accent" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">
                  {selected === correct ? 'Correct! +30 XP' : 'Not quite right'}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
