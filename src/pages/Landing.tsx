import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, Zap, Bot, BookOpen, Trophy, Users, Star, CheckCircle, Flame, Target, Shield, Sparkles } from 'lucide-react';
import { AnimatedNodes } from '@/components/AnimatedNodes';
import { useRef } from 'react';

const stats = [
  { label: 'Lessons', value: '50+', icon: BookOpen },
  { label: 'Learning Paths', value: '5', icon: Target },
  { label: 'Real Projects', value: '30+', icon: Shield },
  { label: 'Active Learners', value: '2K+', icon: Users },
];

const features = [
  { icon: Gamepad2, title: 'Gamified Learning', desc: 'Earn XP, unlock badges, level up as you master automation.', color: 'text-primary', glow: 'glow-purple' },
  { icon: Zap, title: 'Hands-on Practice', desc: 'Build real workflows from lesson one. No theory-only lectures.', color: 'text-secondary', glow: 'glow-orange' },
  { icon: Bot, title: 'AI-Powered', desc: 'Integrate ChatGPT, Claude & more into your automations.', color: 'text-accent', glow: 'glow-green' },
];

const testimonials = [
  { name: 'Sarah M.', role: 'Freelancer', text: 'After 2 weeks on FlowMaster, I landed my first €1,500 automation client.', avatar: 'S', xp: '19,500' },
  { name: 'Ahmed B.', role: 'Product Manager', text: "I automated 15 hours of weekly reporting. My team thinks I'm a wizard.", avatar: 'A', xp: '15,200' },
  { name: 'Lisa K.', role: 'Startup Founder', text: 'Built our entire onboarding flow with n8n. Zero code, infinite possibilities.', avatar: 'L', xp: '12,400' },
];

const pathLevels = [
  { icon: '🌱', title: 'Foundations', desc: 'Learn the language of automation', color: 'border-accent/50', bg: 'from-accent/10' },
  { icon: '⚡', title: 'Core Skills', desc: 'Master the essential nodes', color: 'border-secondary/50', bg: 'from-secondary/10' },
  { icon: '🤖', title: 'AI Integration', desc: 'Add intelligence to workflows', color: 'border-primary/50', bg: 'from-primary/10' },
  { icon: '🏗️', title: 'Advanced', desc: 'Build production-ready systems', color: 'border-secondary/50', bg: 'from-secondary/10' },
  { icon: '🚀', title: 'Expert', desc: 'Turn skills into income', color: 'border-primary/50', bg: 'from-primary/10' },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7 },
};

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-border/30">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              whileTap={{ scale: 0.85, rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
            </motion.div>
            <span className="font-heading font-bold text-base sm:text-lg text-foreground">FlowMaster</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/onboarding" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-muted/30 transition-colors hidden sm:inline">
              Log in
            </Link>
            <Link to="/onboarding" className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-purple active:bg-primary/80">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-6xl mx-auto px-4 pt-12 pb-8 sm:pt-20 sm:pb-12 lg:pt-28 lg:pb-20">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full glass border border-primary/30 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6"
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="hidden sm:inline">2,000+ learners • 50+ lessons • 100% No-Code</span>
              <span className="sm:hidden">2K+ learners • 100% No-Code</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-7xl font-heading font-bold tracking-tight mb-4 sm:mb-6"
            >
              <span className="text-foreground">Automate Everything.</span>
              <br />
              <motion.span 
                className="gradient-text"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                No Code Required.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
            >
              Learn n8n from scratch to expert. Interactive lessons, real projects, AI-powered workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0"
            >
              <Link
                to="/onboarding"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-heading font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-purple flex items-center justify-center gap-2 text-base sm:text-lg group active:bg-primary/80"
              >
                Start Learning for Free 
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Link>
              <a
                href="#curriculum"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-heading font-semibold border border-border/50 text-foreground hover:bg-muted/30 transition-all text-center active:bg-muted/40"
              >
                See the Curriculum
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 sm:mt-12 max-w-3xl mx-auto opacity-60 hidden sm:block"
          >
            <AnimatedNodes />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/30 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} {...fadeIn} transition={{ ...fadeIn.transition, delay: i * 0.1 }} className="text-center group">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors"
                whileTap={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <div className="text-xl sm:text-2xl font-heading font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <motion.h2 {...fadeIn} className="text-2xl sm:text-3xl font-heading font-bold text-center text-foreground mb-8 sm:mb-12">
          Everything you need to master automation
        </motion.h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.15 }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-all group relative overflow-hidden active:bg-muted/20"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div 
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted flex items-center justify-center mb-3 sm:mb-4 ${f.color}`}
                whileTap={{ rotate: 10, scale: 1.1 }}
              >
                <f.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.div>
              <h3 className="font-heading font-semibold text-base sm:text-lg text-foreground mb-1.5 sm:mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning Path Preview */}
      <section id="curriculum" className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <motion.h2 {...fadeIn} className="text-2xl sm:text-3xl font-heading font-bold text-center text-foreground mb-3 sm:mb-4">
          Your journey from zero to hero
        </motion.h2>
        <motion.p {...fadeIn} className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base">
          5 levels, 50+ lessons, real-world projects at every stage
        </motion.p>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-secondary opacity-30" />

          <div className="space-y-3 sm:space-y-4">
            {pathLevels.map((level, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className={`glass rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border ${level.color} ml-8 sm:ml-12 relative bg-gradient-to-r ${level.bg} to-transparent active:bg-muted/20`}
              >
                <div className="absolute -left-10 sm:-left-[3.25rem] w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-card border border-border flex items-center justify-center text-base sm:text-lg">
                  {level.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">LEVEL {i + 1}</span>
                  <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base">{level.title}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{level.desc}</p>
                </div>
                {i === 0 && (
                  <span className="ml-auto text-[10px] sm:text-xs bg-accent/20 text-accent px-2 sm:px-3 py-1 rounded-full font-medium shrink-0">Free</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <motion.h2 {...fadeIn} className="text-2xl sm:text-3xl font-heading font-bold text-center text-foreground mb-8 sm:mb-12">
          Loved by automation learners
        </motion.h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 pb-2 sm:pb-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.15 }}
              className="glass rounded-2xl p-5 sm:p-6 relative overflow-hidden group min-w-[280px] sm:min-w-0 shrink-0 sm:shrink"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <motion.div key={j} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.1 }}>
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary fill-secondary" />
                  </motion.div>
                ))}
              </div>
              <p className="text-foreground text-sm mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center text-sm font-bold text-primary border border-primary/20">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-heading font-bold text-secondary">⚡ {t.xp} XP</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <motion.div
          {...fadeIn}
          className="glass rounded-2xl p-6 sm:p-8 sm:p-12 text-center glow-purple relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center border border-primary/20"
            >
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3 sm:mb-4">
              Ready to automate your life?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto">
              Join thousands of learners mastering n8n and building their automation future.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-2xl font-heading font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-base sm:text-lg group active:bg-primary/80"
            >
              Create Free Account 
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-heading font-semibold">FlowMaster</span>
          </div>
          <p>From zero to automation hero</p>
        </div>
      </footer>
    </div>
  );
}
