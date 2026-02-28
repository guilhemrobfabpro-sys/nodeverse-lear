import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface XPGainAnimationProps {
  amount: number;
  trigger: number; // increment to trigger
}

export function XPGainAnimation({ amount, trigger }: XPGainAnimationProps) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (trigger > 0) {
      setKey(k => k + 1);
      setShow(true);
      const t = setTimeout(() => setShow(false), 1500);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={key}
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -60, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="fixed top-20 right-8 z-[100] pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-accent font-heading font-bold text-lg">+{amount} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
