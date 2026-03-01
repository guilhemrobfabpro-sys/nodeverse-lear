import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Gamepad2, BookText, User, Zap, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { XPBar } from './XPBar';
import { StreakCounter } from './StreakCounter';
import { useUser } from '@/contexts/UserContext';
import GlassIcons from './GlassIcons';
import { useTheme } from '@/hooks/useTheme';

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { state } = useUser();
  const { theme, toggle } = useTheme();

  const navItems = [
    { to: '/dashboard',     icon: <Home     className="w-4 h-4" />, color: 'blue',   label: 'Home'    },
    { to: '/learning-path', icon: <Map      className="w-4 h-4" />, color: 'purple', label: 'Path'    },
    { to: '/challenges',    icon: <Gamepad2 className="w-4 h-4" />, color: 'orange', label: 'Play'    },
    { to: '/glossary',      icon: <BookText className="w-4 h-4" />, color: 'green',  label: 'Glossary'},
    { to: '/profile',       icon: <User     className="w-4 h-4" />, color: 'indigo', label: 'Profile' },
  ].map(item => ({
    ...item,
    href: item.to,
    isActive: location.pathname.startsWith(item.to),
  }));

  return (
    <div className="min-h-screen gradient-bg">
      {/* iOS-style top bar with safe area support */}
      <header className="sticky top-0 z-50 glass-strong border-b border-border/30" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="max-w-3xl mx-auto px-3 h-12 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <motion.div
              className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm"
              whileTap={{ scale: 0.92 }}
            >
              <Zap className="w-4 h-4 text-primary-foreground" />
            </motion.div>
            <span className="font-heading font-semibold text-sm text-foreground">FlowMaster</span>
          </Link>

          <div className="flex items-center gap-2">
            <StreakCounter days={state.user.streak} />
            <div className="hidden xs:block w-20">
              <XPBar showLabel={false} />
            </div>
            <motion.button
              onClick={toggle}
              className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-heading font-bold text-primary"
            >
              {state.user.level}
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main content — extra bottom padding for the taller glass nav */}
        <main className="flex-1 min-h-[calc(100vh-3rem)] pb-[80px]" style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}>
          {children}
        </main>
      </div>

      {/* Glass icon bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="max-w-3xl mx-auto">
          <GlassIcons items={navItems} className="icon-btns--nav" />
        </div>
      </nav>
    </div>
  );
}
