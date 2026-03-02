import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap, CheckCircle2, Crown, BookOpen, Target, Trophy,
  Flame, Shield, Star, ArrowLeft, Sparkles,
} from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { useUser } from '@/contexts/UserContext';
import { isPro } from '@/lib/plan';

const features = [
  { icon: BookOpen, text: 'All 5 levels — 50+ lessons', free: false },
  { icon: Target,   text: 'Full challenge library',     free: false },
  { icon: Trophy,   text: 'Certificate of completion',  free: false },
  { icon: Flame,    text: 'Streak shields',             free: false },
  { icon: Star,     text: 'Level 1 — Foundations (8 lessons)', free: true },
  { icon: Target,   text: '1 rotating daily challenge', free: true },
  { icon: Shield,   text: 'Leaderboard access',         free: true },
];

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

export default function Upgrade() {
  const { state, upgradeToPro } = useUser();
  const navigate = useNavigate();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual');
  const [loading, setLoading] = useState(false);

  const alreadyPro = isPro(state.plan);

  const handleUpgrade = async () => {
    setLoading(true);
    // TODO: swap this for a real Stripe Checkout redirect when payments go live
    await new Promise(r => setTimeout(r, 900));
    upgradeToPro();
    navigate('/dashboard');
  };

  return (
    <AppLayout>
      <motion.div
        className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-6 sm:space-y-8"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Back */}
        <motion.button
          variants={item}
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.button>

        {/* Header */}
        <motion.div variants={item} className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto shadow-lg mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
            Unlock Your Full Potential
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Go from automation curious to FlowMaster with all 50+ lessons, challenges, and your personal certificate.
          </p>
        </motion.div>

        {/* Beta banner */}
        <motion.div variants={item} className="glass rounded-xl p-3 flex items-center gap-2.5 border-secondary/30 bg-secondary/5">
          <Sparkles className="w-4 h-4 text-secondary shrink-0" />
          <p className="text-xs sm:text-sm text-secondary font-medium">
            <span className="font-bold">Beta launch</span> — upgrade free while we finalise payments. Your Pro access is saved and will carry over.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div variants={item} className="flex justify-center">
          <div className="glass rounded-xl p-1 flex gap-1">
            {(['monthly', 'annual'] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  billing === b
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {b === 'monthly' ? 'Monthly' : 'Annual'}
                {b === 'annual' && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent font-bold">
                    SAVE 27%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Price card */}
        <motion.div variants={item} className="glass rounded-2xl overflow-hidden border-primary/30 glow-purple relative">
          {billing === 'annual' && (
            <div className="absolute top-4 right-4 text-[11px] px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-bold flex items-center gap-1">
              <Star className="w-3 h-3" /> Most Popular
            </div>
          )}

          <div className="bg-gradient-to-r from-primary/10 to-secondary/5 p-5 sm:p-7 text-center">
            <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-2">FlowMaster Pro</p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-4xl sm:text-5xl font-heading font-bold text-foreground">
                {billing === 'monthly' ? '$9' : '$6.58'}
              </span>
              <span className="text-muted-foreground pb-1.5">/mo</span>
            </div>
            {billing === 'annual' && (
              <p className="text-xs text-muted-foreground mt-1">Billed as $79/year · save $29</p>
            )}
          </div>

          <div className="p-5 sm:p-7 space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.free ? 'bg-muted' : 'bg-primary/20'}`}>
                  <CheckCircle2 className={`w-3 h-3 ${f.free ? 'text-muted-foreground' : 'text-primary'}`} />
                </div>
                <span className={`text-sm ${f.free ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {f.text}
                </span>
                {!f.free && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-semibold shrink-0">PRO</span>
                )}
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-7 pb-6">
            {alreadyPro ? (
              <div className="w-full py-3.5 rounded-xl bg-accent/20 text-accent font-heading font-bold text-center flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" /> You're already Pro!
              </div>
            ) : (
              <motion.button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-heading font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                    />
                    Activating…
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Start Pro {billing === 'annual' ? '— $79/yr' : '— $9/mo'}
                  </>
                )}
              </motion.button>
            )}
            <p className="text-center text-[11px] text-muted-foreground mt-3">
              Cancel anytime · No credit card required during beta
            </p>
          </div>
        </motion.div>

        {/* Free tier reminder */}
        <motion.div variants={item} className="glass rounded-2xl p-4 sm:p-5 opacity-70">
          <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">Free Plan Includes</p>
          <div className="space-y-2">
            {features.filter(f => f.free).map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">{f.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
