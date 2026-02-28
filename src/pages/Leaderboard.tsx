import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/AppLayout';
import { useUser, getLevelName } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Flame, Zap, Target, Crown, TrendingUp, Users, Sparkles, Medal, RefreshCw } from 'lucide-react';

const tabs = [
  { label: 'This Week', icon: TrendingUp, sortKey: 'xp' as const, weekOnly: true },
  { label: 'All Time', icon: Trophy, sortKey: 'xp' as const, weekOnly: false },
  { label: 'Streak', icon: Flame, sortKey: 'streak' as const, weekOnly: false },
  { label: 'Challenges', icon: Target, sortKey: 'challenges_completed' as const, weekOnly: false },
];

const medals = ['🥇', '🥈', '🥉'];
const rankGradients = [
  'from-yellow-500/20 via-yellow-500/5 to-transparent border-yellow-500/30',
  'from-slate-300/20 via-slate-300/5 to-transparent border-slate-300/30',
  'from-amber-700/20 via-amber-700/5 to-transparent border-amber-700/30',
];

type SortKey = 'xp' | 'streak' | 'challenges_completed';

interface LeaderboardEntry {
  id: string;
  display_name: string;
  level: number;
  xp: number;
  streak: number;
  challenges_completed: number;
  lessons_completed: number;
  badges: string[];
  isUser?: boolean;
}

export default function Leaderboard() {
  const [tab, setTab] = useState(0);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalLearners, setTotalLearners] = useState(0);
  const { state } = useUser();

  const fetchLeaderboard = useCallback(async (weekOnly: boolean) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('xp', { ascending: false })
        .limit(50);

      if (weekOnly) {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        query = query.gte('updated_at', sevenDaysAgo);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError('Failed to load leaderboard. Please try again.');
        return;
      }

      setEntries(
        (data ?? []).map(d => ({
          id: d.id,
          display_name: d.display_name,
          level: d.level,
          xp: d.xp,
          streak: d.streak,
          challenges_completed: d.challenges_completed,
          lessons_completed: d.lessons_completed,
          badges: d.badges || [],
          isUser: false,
        }))
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTotalCount = useCallback(async () => {
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    setTotalLearners(count ?? 0);
  }, []);

  useEffect(() => {
    const weekOnly = tabs[tab].weekOnly;
    fetchLeaderboard(weekOnly);
  }, [tab, fetchLeaderboard]);

  useEffect(() => {
    fetchTotalCount();
    const channel = supabase
      .channel('leaderboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchLeaderboard(tabs[tab].weekOnly);
        fetchTotalCount();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [tab, fetchLeaderboard, fetchTotalCount]);

  const sortKey: SortKey = tabs[tab].sortKey;

  const userEntry: LeaderboardEntry = {
    id: 'user',
    display_name: state.user.name || 'You',
    xp: state.user.xp,
    level: state.user.level,
    streak: state.user.streak,
    challenges_completed: state.completedChallenges.length,
    lessons_completed: Object.values(state.progress).filter(p => p.status === 'complete').length,
    badges: state.badges,
    isUser: true,
  };

  const sorted = [...entries].sort((a, b) => (b[sortKey] as number) - (a[sortKey] as number));

  // Insert the current user at the correct rank position
  const userValue = userEntry[sortKey] as number;
  let userRank = sorted.findIndex(e => userValue > (e[sortKey] as number));
  if (userRank === -1) userRank = sorted.length;
  sorted.splice(userRank, 0, userEntry);

  const topEntry = sorted[0];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Hero header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-bl from-secondary/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full" />

          <div className="relative flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center border border-secondary/20">
              <Crown className="w-5 h-5 sm:w-7 sm:h-7 text-secondary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-heading font-bold text-foreground">Leaderboard</h1>
              <p className="text-muted-foreground text-xs sm:text-sm flex items-center gap-1">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {totalLearners > 0 ? `${totalLearners.toLocaleString()} learners` : 'Loading…'}
              </p>
            </div>
          </div>

          {/* Your rank */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mt-3 sm:mt-4 flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-primary/10 border border-primary/20"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] sm:text-xs text-muted-foreground">Your Rank</p>
              <p className="font-heading font-bold text-foreground text-base sm:text-lg">#{userRank + 1}</p>
            </div>
            <div className="text-right">
              <p className="font-heading font-bold text-primary text-base sm:text-lg">{state.user.xp.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">XP</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
          {tabs.map((t, i) => (
            <motion.button
              key={t.label}
              onClick={() => setTab(i)}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-2 sm:py-2.5 text-[10px] sm:text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                tab === i
                  ? 'bg-card text-foreground shadow-sm border border-border/50'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {t.label}
            </motion.button>
          ))}
        </div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 flex items-center justify-between gap-3 border-destructive/30"
          >
            <p className="text-sm text-destructive">{error}</p>
            <button
              onClick={() => fetchLeaderboard(tabs[tab].weekOnly)}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </motion.div>
        )}

        {/* Top 3 podium */}
        {!loading && !error && sorted.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-1.5 sm:gap-2"
          >
            {[1, 0, 2].map((idx) => {
              const entry = sorted[idx];
              if (!entry) return null;
              const isFirst = idx === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1 }}
                  className={`glass rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center relative overflow-hidden ${
                    entry.isUser ? 'border-primary/50 glow-purple' : ''
                  } ${isFirst ? '-mt-2' : ''}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${rankGradients[idx]} opacity-50`} />
                  <div className="relative">
                    <span className="text-xl sm:text-2xl mb-1 sm:mb-2 block">{medals[idx]}</span>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto mb-1.5 sm:mb-2 flex items-center justify-center text-sm sm:text-lg font-bold border-2 ${
                      idx === 0 ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500/40 text-yellow-400' :
                      idx === 1 ? 'bg-gradient-to-br from-slate-300/20 to-slate-400/10 border-slate-300/40 text-slate-300' :
                      'bg-gradient-to-br from-amber-700/20 to-amber-800/10 border-amber-700/40 text-amber-600'
                    }`}>
                      {entry.display_name[0]}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {entry.display_name}
                      {entry.isUser && <span className="text-primary text-[9px] sm:text-[10px] block">(You)</span>}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Lvl {entry.level}</p>
                    <p className="text-xs sm:text-sm font-heading font-bold text-foreground mt-0.5 sm:mt-1">
                      {sortKey === 'streak'
                        ? `${entry.streak}🔥`
                        : sortKey === 'challenges_completed'
                        ? `${entry.challenges_completed} ✅`
                        : `${entry.xp.toLocaleString()} XP`}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* List */}
        <div className="space-y-1 sm:space-y-1.5">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-3 sm:p-4 animate-pulse flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-2 bg-muted rounded w-16" />
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-1 sm:space-y-1.5"
              >
                {sorted.slice(3, 25).map((entry, i) => {
                  const rank = i + 4;
                  const maxValue = topEntry ? (topEntry[sortKey] as number) : 1;
                  const value = entry[sortKey] as number;
                  const barPct = Math.max(5, (value / Math.max(maxValue, 1)) * 100);

                  return (
                    <motion.div
                      key={entry.id + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`glass rounded-xl p-2.5 sm:p-3.5 flex items-center gap-2 sm:gap-3 group hover:border-primary/30 transition-all ${
                        entry.isUser ? 'border-primary/50 glow-purple' : ''
                      }`}
                    >
                      <span className="w-7 sm:w-8 text-center font-heading font-bold text-muted-foreground text-xs sm:text-sm">
                        #{rank}
                      </span>
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 ${
                        entry.isUser
                          ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground'
                          : 'bg-primary/15 text-primary'
                      }`}>
                        {entry.display_name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                            {entry.display_name}
                          </p>
                          {entry.isUser && (
                            <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-semibold shrink-0">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                          <span className="text-[10px] text-muted-foreground">Lvl {entry.level}</span>
                          <div className="flex-1 h-1 rounded-full bg-muted/50 max-w-[80px] sm:max-w-[100px]">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: `${barPct}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs sm:text-sm font-heading font-bold text-foreground">
                          {sortKey === 'streak' ? (
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary" />
                              {entry.streak}d
                            </span>
                          ) : sortKey === 'challenges_completed' ? (
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
                              {entry.challenges_completed}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-secondary" />
                              {value.toLocaleString()}
                            </span>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-3 sm:p-4 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
            Keep learning to climb the ranks!
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
}
