import { motion } from 'framer-motion';
import { AppLayout } from '@/components/AppLayout';
import { useUser } from '@/contexts/UserContext';
import { Bell, Volume2, Settings as SettingsIcon, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { state, updateSettings } = useUser();
  const { settings } = state;

  const toggleRow = (
    label: string,
    description: string,
    icon: React.ReactNode,
    value: boolean,
    onChange: (v: boolean) => void,
    index: number
  ) => (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-xl p-4 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          value ? 'bg-primary' : 'bg-muted'
        }`}
        role="switch"
        aria-checked={value}
      >
        <motion.span
          layout
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
          animate={{ left: value ? '1.25rem' : '0.125rem' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </motion.div>
  );

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <Link
            to="/profile"
            className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </Link>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-heading font-bold text-foreground">Settings</h1>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Preferences
          </p>
          <div className="space-y-2">
            {toggleRow(
              'Notifications',
              'Get reminders about your streak and new challenges',
              <Bell className="w-4 h-4 text-primary" />,
              settings.notifications,
              v => updateSettings({ notifications: v }),
              0
            )}
            {toggleRow(
              'Sound Effects',
              'Play sounds when earning XP or completing challenges',
              <Volume2 className="w-4 h-4 text-primary" />,
              settings.soundEffects,
              v => updateSettings({ soundEffects: v }),
              1
            )}
          </div>
        </motion.section>

        {/* Data */}
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Data
          </p>
          <div className="glass rounded-xl p-4 space-y-3 text-sm text-muted-foreground">
            <p>
              Your progress is stored locally and synced to our servers when you are signed in.
              Clearing browser data will remove local progress.
            </p>
            <p className="text-[11px]">
              XP earned: <span className="text-foreground font-semibold">{state.user.xp.toLocaleString()}</span>
              {' · '}
              Lessons: <span className="text-foreground font-semibold">
                {Object.values(state.progress).filter(p => p.status === 'complete').length}
              </span>
              {' · '}
              Badges: <span className="text-foreground font-semibold">{state.badges.length}</span>
            </p>
          </div>
        </motion.section>
      </div>
    </AppLayout>
  );
}
