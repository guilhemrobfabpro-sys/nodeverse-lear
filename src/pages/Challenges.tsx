import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Trophy, ChevronRight, Lightbulb,
  CheckCircle2, XCircle, ArrowRight, Zap, Bug,
  Timer, Sparkles, Target, Play
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { useUser } from '@/contexts/UserContext';
import { challenges as challengeData, dailyChallenge, Challenge, ChallengeStep } from '@/data/challenges';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Rotate the daily challenge by day-of-year so it changes each day.
// Falls back to the static dailyChallenge if the pool is empty.
function getTodaysChallenge(): Challenge {
  const pool = challengeData.length > 0 ? challengeData : [dailyChallenge];
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000);
  return pool[dayOfYear % pool.length];
}

const difficultyConfig: Record<string, { color: string; bg: string; border: string }> = {
  Beginner: { color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
  Intermediate: { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/30' },
  Advanced: { color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/30' },
};

const typeConfig: Record<string, { icon: React.ReactNode; label: string; gradient: string }> = {
  guided: { icon: <Target className="w-4 h-4" />, label: 'Guided', gradient: 'from-primary/20 to-primary/5' },
  timed: { icon: <Timer className="w-4 h-4" />, label: 'Timed', gradient: 'from-secondary/20 to-secondary/5' },
  puzzle: { icon: <Sparkles className="w-4 h-4" />, label: 'Puzzle', gradient: 'from-accent/20 to-accent/5' },
  debug: { icon: <Bug className="w-4 h-4" />, label: 'Debug', gradient: 'from-destructive/20 to-destructive/5' },
};

// ─── Visual Option Card ─────────────────────────────────────────

const optionGradients = [
  'from-primary/15 to-primary/5 border-primary/30 hover:border-primary/60',
  'from-secondary/15 to-secondary/5 border-secondary/30 hover:border-secondary/60',
  'from-accent/15 to-accent/5 border-accent/30 hover:border-accent/60',
  'from-blue-500/15 to-blue-500/5 border-blue-500/30 hover:border-blue-500/60',
];

function StepMultipleChoice({ step, onAnswer }: { step: ChallengeStep; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => onAnswer(selected === step.correctAnswer), 800);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.options?.map((opt, i) => {
          let stateClass = '';
          if (submitted && i === step.correctAnswer) stateClass = 'ring-2 ring-accent border-accent bg-accent/10';
          else if (submitted && i === selected && i !== step.correctAnswer) stateClass = 'ring-2 ring-destructive border-destructive bg-destructive/10';
          else if (submitted) stateClass = 'opacity-30';
          else if (selected === i) stateClass = 'ring-2 ring-primary border-primary';

          return (
            <motion.button
              key={i}
              className={`relative text-left p-4 rounded-xl border bg-gradient-to-br transition-all ${!submitted ? optionGradients[i % 4] : ''} ${stateClass}`}
              onClick={() => !submitted && setSelected(i)}
              whileHover={!submitted ? { scale: 1.02, y: -2 } : {}}
              whileTap={!submitted ? { scale: 0.98 } : {}}
            >
              <div className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  submitted && i === step.correctAnswer ? 'bg-accent text-accent-foreground' :
                  submitted && i === selected ? 'bg-destructive text-destructive-foreground' :
                  'bg-muted/80 text-muted-foreground'
                }`}>
                  {submitted && i === step.correctAnswer ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                   submitted && i === selected ? <XCircle className="w-3.5 h-3.5" /> :
                   String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-foreground leading-snug pt-0.5">{opt}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
      {!submitted && (
        <Button onClick={handleSubmit} disabled={selected === null} className="w-full">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Answer
        </Button>
      )}
    </div>
  );
}

function StepFillBlank({ step, onAnswer }: { step: ChallengeStep; onAnswer: (correct: boolean) => void }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = step.acceptedAnswers?.some(a => 
      value.trim().toLowerCase().replace(/\s/g, '') === a.toLowerCase().replace(/\s/g, '')
    ) ?? false;
    setIsCorrect(correct);
    setSubmitted(true);
    setTimeout(() => onAnswer(correct), 800);
  };

  return (
    <div className="space-y-3">
      <div className={`rounded-xl border-2 p-4 bg-gradient-to-br from-muted/30 to-transparent transition-all ${
        submitted ? (isCorrect ? 'border-accent bg-accent/5' : 'border-destructive bg-destructive/5') : 'border-border focus-within:border-primary'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <code className="text-[10px] text-primary font-bold">{'{}'}</code>
          </div>
          <span className="text-xs text-muted-foreground">Expression</span>
        </div>
        <input
          type="text"
          value={value}
          onChange={e => !submitted && setValue(e.target.value)}
          placeholder={step.placeholder}
          className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none"
          onKeyDown={e => e.key === 'Enter' && !submitted && handleSubmit()}
          readOnly={submitted}
        />
      </div>
      {submitted && !isCorrect && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lightbulb className="w-3.5 h-3.5 text-secondary" />
          Answer: <code className="font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">{step.acceptedAnswers?.[0]}</code>
        </div>
      )}
      {!submitted && (
        <Button onClick={handleSubmit} disabled={!value.trim()} className="w-full">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check
        </Button>
      )}
    </div>
  );
}

function StepOrdering({ step, onAnswer }: { step: ChallengeStep; onAnswer: (correct: boolean) => void }) {
  const [order, setOrder] = useState<number[]>(() => {
    const indices = step.items!.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });
  const [submitted, setSubmitted] = useState(false);

  const moveUp = (idx: number) => {
    if (idx === 0 || submitted) return;
    const n = [...order]; [n[idx], n[idx - 1]] = [n[idx - 1], n[idx]]; setOrder(n);
  };
  const moveDown = (idx: number) => {
    if (idx === order.length - 1 || submitted) return;
    const n = [...order]; [n[idx], n[idx + 1]] = [n[idx + 1], n[idx]]; setOrder(n);
  };

  const handleSubmit = () => {
    const correct = order.every((val, i) => val === step.correctOrder![i]);
    setSubmitted(true);
    setTimeout(() => onAnswer(correct), 800);
  };

  const stepColors = ['text-primary', 'text-secondary', 'text-accent', 'text-blue-400', 'text-pink-400'];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 mb-3">
        {order.map((_, posIdx) => (
          <div key={posIdx} className="flex items-center">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
              submitted && step.correctOrder![posIdx] === order[posIdx] ? 'border-accent bg-accent/10 text-accent' :
              submitted ? 'border-destructive bg-destructive/10 text-destructive' :
              'border-muted-foreground/30 text-muted-foreground'
            }`}>{posIdx + 1}</div>
            {posIdx < order.length - 1 && <div className="w-4 h-px bg-border mx-1" />}
          </div>
        ))}
      </div>
      {order.map((itemIdx, posIdx) => {
        let borderCls = 'border-border hover:border-primary/50';
        if (submitted) {
          borderCls = step.correctOrder![posIdx] === itemIdx ? 'border-accent bg-accent/5' : 'border-destructive bg-destructive/5';
        }
        return (
          <motion.div key={itemIdx} layout className={`glass rounded-xl p-3 flex items-center gap-3 border transition-all ${borderCls}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
              submitted && step.correctOrder![posIdx] === itemIdx ? 'bg-accent/20 text-accent' :
              submitted ? 'bg-destructive/20 text-destructive' :
              `bg-muted ${stepColors[posIdx % stepColors.length]}`
            }`}>{posIdx + 1}</div>
            <span className="text-sm flex-1">{step.items![itemIdx]}</span>
            {!submitted && (
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveUp(posIdx)} className="text-muted-foreground hover:text-foreground px-1 py-0.5 rounded hover:bg-muted">▲</button>
                <button onClick={() => moveDown(posIdx)} className="text-muted-foreground hover:text-foreground px-1 py-0.5 rounded hover:bg-muted">▼</button>
              </div>
            )}
          </motion.div>
        );
      })}
      {!submitted && (
        <Button onClick={handleSubmit} className="w-full mt-2">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Order
        </Button>
      )}
    </div>
  );
}

function StepCheckbox({ step, onAnswer }: { step: ChallengeStep; onAnswer: (correct: boolean) => void }) {
  const [checked, setChecked] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i: number) => { if (!submitted) setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]); };

  const handleSubmit = () => {
    const correct = step.correctChecks!.length === checked.length && step.correctChecks!.every(c => checked.includes(c));
    setSubmitted(true);
    setTimeout(() => onAnswer(correct), 800);
  };

  return (
    <div className="space-y-2">
      <div className="grid gap-2">
        {step.checkboxOptions?.map((opt, i) => {
          let cls = 'rounded-xl p-3.5 flex items-center gap-3 cursor-pointer transition-all text-sm border bg-gradient-to-br';
          if (submitted && step.correctChecks!.includes(i)) cls += ' border-accent bg-accent/5 from-accent/10 to-transparent';
          else if (submitted && checked.includes(i)) cls += ' border-destructive bg-destructive/5 from-destructive/10 to-transparent';
          else if (checked.includes(i)) cls += ' border-primary bg-primary/5 from-primary/10 to-transparent';
          else cls += ` ${optionGradients[i % 4]}`;

          return (
            <motion.button key={i} className={cls} onClick={() => toggle(i)} whileTap={!submitted ? { scale: 0.98 } : {}}>
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                checked.includes(i) ? 'bg-primary border-primary' : 'border-muted-foreground/40'
              }`}>
                {checked.includes(i) && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span className="text-foreground">{opt}</span>
            </motion.button>
          );
        })}
      </div>
      {!submitted && (
        <Button onClick={handleSubmit} disabled={checked.length === 0} className="w-full mt-1">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check
        </Button>
      )}
    </div>
  );
}

function StepConfig({ step, onAnswer }: { step: ChallengeStep; onAnswer: (correct: boolean) => void }) {
  const [values, setValues] = useState<string[]>(step.configFields?.map(() => '') ?? []);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const handleSubmit = () => {
    const res = step.configFields!.map((field, i) =>
      field.acceptedAnswers.some(a => values[i].trim().toLowerCase().replace(/\s/g, '').includes(a.toLowerCase().replace(/\s/g, '')))
    );
    setResults(res);
    setSubmitted(true);
    setTimeout(() => onAnswer(res.every(Boolean)), 800);
  };

  return (
    <div className="space-y-3">
      <div className="glass rounded-xl p-4 space-y-4 border-2 border-primary/10">
        <div className="flex items-center gap-2 text-xs text-primary">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">⚙️</div>
          <span className="font-semibold">Node Configuration</span>
        </div>
        {step.configFields?.map((field, i) => (
          <div key={i}>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{field.label}</label>
            <input
              type="text"
              value={values[i]}
              onChange={e => {
                if (submitted) return;
                const v = [...values]; v[i] = e.target.value; setValues(v);
              }}
              placeholder={field.placeholder}
              className={`w-full bg-muted/30 rounded-lg px-3 py-2.5 text-sm font-mono outline-none border-2 transition-all ${
                submitted ? (results[i] ? 'border-accent bg-accent/5' : 'border-destructive bg-destructive/5') : 'border-border focus:border-primary'
              }`}
              readOnly={submitted}
            />
            {submitted && !results[i] && (
              <p className="text-xs text-muted-foreground mt-1">
                <Lightbulb className="w-3 h-3 inline mr-1 text-secondary" />
                Try: <code className="font-mono text-accent">{field.acceptedAnswers[0]}</code>
              </p>
            )}
          </div>
        ))}
      </div>
      {!submitted && (
        <Button onClick={handleSubmit} disabled={values.some(v => !v.trim())} className="w-full">
          <Play className="w-4 h-4 mr-1" /> Run Configuration
        </Button>
      )}
    </div>
  );
}

// ─── Challenge Runner ───────────────────────────────────────────

function ChallengeRunner({ challenge, onClose, onComplete }: { challenge: Challenge; onClose: () => void; onComplete: (xp: number) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [stepResults, setStepResults] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState((challenge.timeLimit ?? 30) * 60);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const step = challenge.steps[currentStep];
  const progress = ((currentStep + (showExplanation ? 1 : 0)) / challenge.steps.length) * 100;

  const handleAnswer = useCallback((correct: boolean) => {
    setStepResults(prev => [...prev, correct]);
    setShowExplanation(true);
  }, []);

  const handleNext = () => {
    setShowHint(false);
    setShowExplanation(false);
    if (currentStep < challenge.steps.length - 1) setCurrentStep(c => c + 1);
    else setFinished(true);
  };

  const correctCount = stepResults.filter(Boolean).length;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeUsed = (challenge.timeLimit ?? 30) * 60 - timeLeft;
  const bonusXP = timeLeft > 0 ? Math.floor(challenge.xp * 0.2) : 0;
  const accuracyXP = Math.floor((correctCount / challenge.steps.length) * challenge.xp);
  const totalXP = accuracyXP + bonusXP;

  const StepComponent = {
    'multiple-choice': StepMultipleChoice,
    'fill-blank': StepFillBlank,
    'ordering': StepOrdering,
    'checkbox': StepCheckbox,
    'config': StepConfig,
  }[step?.type] ?? StepMultipleChoice;

  if (finished) {
    const stars = correctCount === challenge.steps.length ? 3 : correctCount >= challenge.steps.length * 0.6 ? 2 : 1;
    return (
      <div className="space-y-6 text-center py-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}>
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-4 border border-accent/20">
            <Trophy className="w-12 h-12 text-accent" />
          </div>
        </motion.div>

        {/* Star rating */}
        <div className="flex justify-center gap-1">
          {[1, 2, 3].map(s => (
            <motion.div key={s} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: s * 0.15, type: 'spring' }}>
              <Sparkles className={`w-8 h-8 ${s <= stars ? 'text-secondary fill-secondary' : 'text-muted/30'}`} />
            </motion.div>
          ))}
        </div>

        <h2 className="font-heading text-xl font-bold text-foreground">Challenge Complete!</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">{challenge.completionMessage}</p>
        
        <div className="glass rounded-xl p-5 space-y-3 text-left max-w-sm mx-auto">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Accuracy</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${(correctCount / challenge.steps.length) * 100}%` }} />
              </div>
              <span className="font-semibold text-foreground font-mono text-xs">{correctCount}/{challenge.steps.length}</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time</span>
            <span className="font-semibold text-foreground font-mono text-xs">{Math.floor(timeUsed / 60)}m {timeUsed % 60}s</span>
          </div>
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3 h-3" /> Accuracy</span>
              <span className="text-accent font-bold">+{accuracyXP}</span>
            </div>
            {bonusXP > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Timer className="w-3 h-3" /> Speed Bonus</span>
                <span className="text-secondary font-bold">+{bonusXP}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t border-border pt-2">
              <span className="text-foreground">Total</span>
              <span className="gradient-text">⚡ +{totalXP} XP</span>
            </div>
          </div>
        </div>

        <Button onClick={() => { onComplete(totalXP); onClose(); }} className="w-full max-w-sm glow-purple">
          <Sparkles className="w-4 h-4 mr-1" /> Claim Rewards
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with visual step indicators */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {challenge.steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${
              i < currentStep ? 'w-6 bg-accent' :
              i === currentStep ? 'w-8 bg-primary' :
              'w-4 bg-muted'
            }`} />
          ))}
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono ${
          timeLeft < 60 ? 'bg-destructive/10 text-destructive' : 'bg-muted text-muted-foreground'
        }`}>
          <Clock className="w-3 h-3" />
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br ${typeConfig[challenge.type]?.gradient || 'from-primary/20 to-primary/5'}`}>
                <span className="text-xs font-bold text-foreground">{currentStep + 1}</span>
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm">{step.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed ml-8">{step.instruction}</p>
          </div>

          {!showExplanation && <StepComponent step={step} onAnswer={handleAnswer} />}

          {/* Hint */}
          {!showExplanation && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 text-xs text-secondary hover:text-secondary/80 transition-colors ml-1"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHint ? 'Hide hint' : 'Need a hint?'}
            </button>
          )}
          <AnimatePresence>
            {showHint && !showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl bg-secondary/10 border border-secondary/20 p-3 flex gap-2"
              >
                <Lightbulb className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <p className="text-xs text-secondary leading-relaxed">{step.hint}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation */}
          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <div className={`rounded-xl p-4 flex gap-3 border ${
                stepResults[stepResults.length - 1] ? 'bg-accent/5 border-accent/30' : 'bg-destructive/5 border-destructive/30'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  stepResults[stepResults.length - 1] ? 'bg-accent/20' : 'bg-destructive/20'
                }`}>
                  {stepResults[stepResults.length - 1] ? <Zap className="w-4 h-4 text-accent" /> : <XCircle className="w-4 h-4 text-destructive" />}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm">
                    {stepResults[stepResults.length - 1] ? '✨ Correct!' : 'Not quite right'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.explanation}</p>
                </div>
              </div>
              <Button onClick={handleNext} className="w-full">
                {currentStep < challenge.steps.length - 1 ? (
                  <>Next Step <ArrowRight className="w-4 h-4 ml-1" /></>
                ) : (
                  <>See Results <Trophy className="w-4 h-4 ml-1" /></>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function Challenges() {
  const [filter, setFilter] = useState('all');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const { state, completeChallenge } = useUser();
  const completedIds = state.completedChallenges;
  const todaysChallenge = getTodaysChallenge();

  const filtered = filter === 'all' ? challengeData : challengeData.filter(c => c.difficulty.toLowerCase() === filter);

  const handleComplete = (xp: number) => {
    if (activeChallenge) {
      completeChallenge(activeChallenge.id, xp);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center border border-secondary/20">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Challenges</h1>
            <p className="text-muted-foreground text-xs sm:text-sm">Hands-on exercises with hints</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Done</p>
            <p className="font-heading font-bold text-foreground text-sm sm:text-base">{completedIds.length}/{challengeData.length}</p>
          </div>
        </motion.div>

        {/* Daily challenge — visual card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl overflow-hidden cursor-pointer hover:border-secondary/50 transition-all group"
          onClick={() => setActiveChallenge(todaysChallenge)}
        >
          <div className="bg-gradient-to-r from-secondary/15 via-secondary/5 to-transparent p-6 relative">
            <div className="absolute top-4 right-4 w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
              <Trophy className="w-8 h-8 text-secondary" />
            </div>
            <div className="flex items-center gap-2 text-secondary font-heading font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4" /> Daily Challenge
            </div>
            <h2 className="font-heading font-bold text-foreground text-lg pr-16">{todaysChallenge.title}</h2>
            <div className="flex items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                <Clock className="w-3 h-3" /> {todaysChallenge.timeLimit} min
              </span>
              <span className={`text-xs px-2 py-1 rounded-md ${difficultyConfig[todaysChallenge.difficulty].bg} ${difficultyConfig[todaysChallenge.difficulty].color}`}>
                {todaysChallenge.difficulty}
              </span>
              <span className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary font-semibold">
                ⚡ +{todaysChallenge.xp} XP
              </span>
              <span className="text-xs text-muted-foreground">{todaysChallenge.steps.length} steps</span>
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={(e) => { e.stopPropagation(); setActiveChallenge(todaysChallenge); }}>
              <Play className="w-3.5 h-3.5 mr-1" /> Start
            </Button>
          </div>
        </motion.div>

        {/* Filter pills - scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0 pb-1 sm:pb-0">
          {['all', 'beginner', 'intermediate', 'advanced'].map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileTap={{ scale: 0.93 }}
              className={`px-3.5 py-2 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-lg text-xs font-medium capitalize transition-all whitespace-nowrap shrink-0 ${
                filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? `All (${challengeData.length})` : f}
            </motion.button>
          ))}
        </div>

        {/* Challenge grid */}
        <div className="grid gap-2.5 sm:gap-3">
          {filtered.map((c, i) => {
            const done = completedIds.includes(c.id);
            const tc = typeConfig[c.type];
            const dc = difficultyConfig[c.difficulty];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.98 }}
                className={`glass rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-primary/40 transition-all cursor-pointer group active:bg-muted/20 ${done ? 'opacity-60' : ''}`}
                onClick={() => setActiveChallenge(c)}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${tc.gradient} flex items-center justify-center shrink-0 text-lg sm:text-xl border border-border/20`}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <p className="font-heading font-semibold text-foreground text-xs sm:text-sm truncate">{c.title}</p>
                    {done && <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent shrink-0" />}
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-1 sm:mt-1.5 flex-wrap">
                    <span className="flex items-center gap-0.5 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" /> {c.timeLimit}m
                    </span>
                    <span className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded ${dc.bg} ${dc.color}`}>
                      {c.difficulty}
                    </span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">{c.steps.length} steps</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs sm:text-sm text-secondary font-bold">+{c.xp}</span>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground">XP</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Challenge Dialog */}
      <Dialog open={!!activeChallenge} onOpenChange={(open) => !open && setActiveChallenge(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-heading">
              <span className="text-xl">{activeChallenge?.icon}</span>
              {activeChallenge?.title}
            </DialogTitle>
            <DialogDescription className="text-xs">{activeChallenge?.description}</DialogDescription>
          </DialogHeader>
          {activeChallenge && (
            <ChallengeRunner
              key={activeChallenge.id}
              challenge={activeChallenge}
              onClose={() => setActiveChallenge(null)}
              onComplete={handleComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
