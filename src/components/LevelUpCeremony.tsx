import { motion, AnimatePresence } from 'framer-motion';
import { getLevelName } from '@/contexts/UserContext';
import { Sparkles, Star, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelUpCeremonyProps {
  show: boolean;
  level: number;
  onClose: () => void;
}

function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1.5,
    color: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(160 80% 60%)', 'hsl(45 100% 60%)'][i % 5],
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', opacity: 0, rotate: 360 + Math.random() * 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{ position: 'absolute', width: p.size, height: p.size, borderRadius: p.size > 7 ? '50%' : '2px', background: p.color }}
        />
      ))}
    </div>
  );
}

export function LevelUpCeremony({ show, level, onClose }: LevelUpCeremonyProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={onClose} />
          
          <Confetti />

          {/* Content */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 150 }}
            className="relative z-10 text-center space-y-6 max-w-sm mx-4"
          >
            {/* Glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 mx-auto relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-30 blur-xl" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/40 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <Trophy className="w-12 h-12 text-secondary" />
                </motion.div>
              </div>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-2 text-secondary text-sm font-heading font-semibold mb-2"
              >
                <Sparkles className="w-4 h-4" /> LEVEL UP! <Sparkles className="w-4 h-4" />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="text-5xl font-heading font-bold gradient-text mb-2"
              >
                Level {level}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground text-lg"
              >
                {getLevelName(level)}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center gap-3"
            >
              {[Star, Zap, Star].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, type: 'spring' }}
                >
                  <Icon className={`w-6 h-6 ${i === 1 ? 'text-secondary fill-secondary' : 'text-primary fill-primary'}`} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button onClick={onClose} size="lg" className="glow-purple gap-2">
                <Sparkles className="w-4 h-4" /> Continue
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
