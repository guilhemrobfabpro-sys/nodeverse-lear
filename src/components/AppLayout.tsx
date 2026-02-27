import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Gamepad2, BookText, User, BarChart3, Home, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { XPBar } from './XPBar';
import { StreakCounter } from './StreakCounter';
import { useUser } from '@/contexts/UserContext';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Home' },
  { to: '/learning-path', icon: Map, label: 'Path' },
  { to: '/challenges', icon: Gamepad2, label: 'Play' },
  { to: '/leaderboard', icon: BarChart3, label: 'Ranks' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { state } = useUser();

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
            <span className="font-heading font-semibold text-sm text-foreground">Nodeverse Learn</span>
          </Link>

          <div className="flex items-center gap-2">
            <StreakCounter days={state.user.streak} />
            <div className="hidden xs:block w-20">
              <XPBar showLabel={false} />
            </div>
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
        {/* Main content with bottom safe area reserved for tab bar */}
        <main className="flex-1 min-h-[calc(100vh-3rem)] pb-[64px]" style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}>
          {children}
        </main>
      </div>

      {/* iOS-style mobile bottom tab bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/30 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="max-w-3xl mx-auto flex justify-between px-4 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-2xl min-w-[60px] relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative"
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                </motion.div>
                <span
                  className={`text-[11px] font-medium relative transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
