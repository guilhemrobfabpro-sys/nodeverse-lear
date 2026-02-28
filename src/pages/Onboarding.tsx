import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Zap, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const backgrounds = [
  { id: 'beginner', icon: '🌱', label: 'Complete beginner', desc: 'Never automated anything' },
  { id: 'business', icon: '💼', label: 'Business user', desc: 'Excel, basic tools' },
  { id: 'power', icon: '⚡', label: 'Power user', desc: 'Zapier/Make experience' },
  { id: 'developer', icon: '💻', label: 'Developer', desc: 'Knows some code' },
];

const goals = [
  { id: 'save_time', icon: '⏰', label: 'Save time on repetitive tasks' },
  { id: 'services', icon: '💰', label: 'Offer automation services' },
  { id: 'ai', icon: '🤖', label: 'Build AI-powered products' },
  { id: 'business', icon: '📊', label: 'Automate my business' },
  { id: 'saas', icon: '🚀', label: 'Launch a SaaS' },
];

const tools = [
  'Gmail', 'Slack', 'Notion', 'Airtable', 'Google Sheets', 'Stripe',
  'Shopify', 'HubSpot', 'Trello', 'Discord', 'Telegram', 'WordPress',
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const navigate = useNavigate();
  const { state, setState } = useUser();

  useEffect(() => {
    if (state.user.onboarded) {
      navigate('/dashboard', { replace: true });
    }
  }, [state.user.onboarded, navigate]);

  const toggleGoal = (id: string) =>
    setSelectedGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  const toggleTool = (t: string) =>
    setSelectedTools(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const recommendedLevel = background === 'beginner' ? 1 : background === 'business' ? 1 : background === 'power' ? 2 : 3;
  const pathName = recommendedLevel === 1 ? 'No-Code Foundations' : recommendedLevel === 2 ? 'Core Skills' : 'AI Integration';

  const finish = () => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        name: name || 'Learner',
        background,
        goal: selectedGoals,
        tools: selectedTools,
        onboarded: true,
        createdAt: new Date().toISOString(),
        lastActiveDate: new Date().toISOString().split('T')[0],
        streak: 1,
      },
    }));
    navigate('/dashboard');
  };

  const canNext = step === 0 ? name.trim().length > 0 : step === 1 ? !!background : step === 2 ? selectedGoals.length > 0 : true;

  const slideVariants = {
    enter: { opacity: 0, y: 40, scale: 0.96 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.96 },
  };

  const steps = [
    // Welcome + Name
    <div className="text-center space-y-6 px-2">
      <motion.div 
        initial={{ scale: 0, rotate: -180 }} 
        animate={{ scale: 1, rotate: 0 }} 
        transition={{ type: 'spring', damping: 12 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto shadow-lg"
      >
        <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
      </motion.div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">Welcome to FlowMaster</h1>
        <motion.p 
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Let's find your perfect starting point ✨
        </motion.p>
      </div>
      <div className="max-w-xs mx-auto">
        <label className="text-sm text-muted-foreground block text-left mb-1.5">What's your name?</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3.5 rounded-2xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
          autoFocus
        />
      </div>
    </div>,

    // Background
    <div className="space-y-5 px-2">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">What's your background?</h2>
        <p className="text-muted-foreground text-sm mt-1">Pick what fits best</p>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {backgrounds.map((b, i) => (
          <motion.button
            key={b.id}
            onClick={() => setBackground(b.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.95 }}
            className={`glass p-4 sm:p-5 rounded-2xl text-left transition-all active:scale-95 ${background === b.id ? 'border-primary glow-purple' : 'hover:border-primary/40'}`}
          >
            <motion.span 
              className="text-3xl sm:text-4xl block"
              animate={background === b.id ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {b.icon}
            </motion.span>
            <p className="font-semibold text-foreground mt-2 text-sm sm:text-base">{b.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{b.desc}</p>
          </motion.button>
        ))}
      </div>
    </div>,

    // Goals
    <div className="space-y-5 px-2">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">What's your main goal?</h2>
        <p className="text-muted-foreground text-sm mt-1">Select all that apply</p>
      </div>
      <div className="space-y-2.5 max-w-md mx-auto">
        {goals.map((g, i) => (
          <motion.button
            key={g.id}
            onClick={() => toggleGoal(g.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full glass p-4 rounded-2xl text-left flex items-center gap-3 transition-all active:scale-[0.97] ${selectedGoals.includes(g.id) ? 'border-primary glow-purple' : 'hover:border-primary/40'}`}
          >
            <motion.span 
              className="text-2xl"
              animate={selectedGoals.includes(g.id) ? { rotate: [0, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {g.icon}
            </motion.span>
            <span className="text-foreground font-medium text-sm sm:text-base">{g.label}</span>
            {selectedGoals.includes(g.id) && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>,

    // Tools
    <div className="space-y-5 px-2">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Tools you already use?</h2>
        <p className="text-muted-foreground text-sm mt-1">Optional — helps us personalize</p>
      </div>
      <div className="flex flex-wrap gap-2.5 justify-center max-w-lg mx-auto">
        {tools.map((t, i) => (
          <motion.button
            key={t}
            onClick={() => toggleTool(t)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileTap={{ scale: 0.9 }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-90 ${selectedTools.includes(t) ? 'bg-primary text-primary-foreground shadow-lg' : 'glass text-foreground hover:border-primary/40'}`}
          >
            {t}
          </motion.button>
        ))}
      </div>
    </div>,

    // Results
    <div className="text-center space-y-6 px-2">
      <motion.div 
        initial={{ scale: 0, rotate: -90 }} 
        animate={{ scale: 1, rotate: 0 }} 
        transition={{ type: 'spring', damping: 10 }}
      >
        <div className="text-6xl sm:text-7xl mb-4">{recommendedLevel === 1 ? '🌱' : recommendedLevel === 2 ? '⚡' : '🤖'}</div>
      </motion.div>
      <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Your path is ready!</h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl p-5 sm:p-6 max-w-sm mx-auto text-left space-y-3"
      >
        <div className="text-xs text-muted-foreground uppercase tracking-wider">Recommended Level</div>
        <div className="font-heading font-bold text-xl sm:text-2xl gradient-text">{pathName}</div>
        <div className="text-sm text-muted-foreground">
          {recommendedLevel === 1 ? '6 weeks • 24 lessons' : recommendedLevel === 2 ? '3 weeks • 12 lessons' : '3 weeks • 10 lessons'}
        </div>
        <p className="text-sm text-foreground">
          Hi {name}! Based on your background, we recommend starting with <strong className="text-primary">{pathName}</strong>.
        </p>
      </motion.div>
    </div>,
  ];

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Progress bar */}
      <div className="w-full max-w-md mb-6 sm:mb-8">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary' : 'bg-muted'}`}
              animate={i === step ? { scaleY: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">Step {step + 1} of 5</p>
      </div>

      {/* Content */}
      <div className="w-full max-w-lg flex-1 flex items-center">
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation - larger touch targets on mobile */}
      <div className="flex items-center gap-3 mt-6 sm:mt-8 w-full max-w-sm justify-center">
        {step > 0 && (
          <motion.button 
            onClick={() => setStep(s => s - 1)} 
            whileTap={{ scale: 0.93 }}
            className="px-5 py-3 sm:py-2.5 rounded-2xl border border-border text-foreground hover:bg-muted/30 transition-all flex items-center gap-2 text-sm active:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </motion.button>
        )}
        {step < 4 ? (
          <motion.button
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext}
            whileTap={canNext ? { scale: 0.95 } : {}}
            className="flex-1 sm:flex-none px-6 py-3 sm:py-2.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed glow-purple text-sm font-medium active:bg-primary/80"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button 
            onClick={finish} 
            whileTap={{ scale: 0.95 }}
            className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 glow-purple font-heading font-semibold active:bg-primary/80"
          >
            Start my journey <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
