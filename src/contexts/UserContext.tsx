import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { levels } from '@/data/levels';
import { z } from 'zod';

// ── Types ────────────────────────────────────────────────────────

export interface UserData {
  name: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  createdAt: string;
  background: string;
  goal: string[];
  tools: string[];
  onboarded: boolean;
  phoneCountryCode: string;
  phoneNumber: string;
}

export interface LessonProgress {
  status: 'locked' | 'available' | 'in_progress' | 'complete';
  score?: number;
  completedAt?: string;
  currentSection?: number;
}

export interface AppState {
  user: UserData;
  progress: Record<string, LessonProgress>;
  badges: string[];
  completedChallenges: string[];
  glossary: {
    favorites: string[];
    mastered: string[];
  };
  settings: {
    notifications: boolean;
    soundEffects: boolean;
  };
}

// ── Zod schema for localStorage validation ───────────────────────

const lessonProgressSchema = z.object({
  status: z.enum(['locked', 'available', 'in_progress', 'complete']),
  score: z.number().optional(),
  completedAt: z.string().optional(),
  currentSection: z.number().optional(),
});

const appStateSchema = z.object({
  user: z.object({
    name: z.string(),
    level: z.number(),
    xp: z.number(),
    streak: z.number(),
    lastActiveDate: z.string(),
    createdAt: z.string(),
    background: z.string(),
    goal: z.array(z.string()),
    tools: z.array(z.string()),
    onboarded: z.boolean(),
    phoneCountryCode: z.string().optional().default(''),
    phoneNumber: z.string().optional().default(''),
  }),
  progress: z.record(lessonProgressSchema),
  badges: z.array(z.string()),
  completedChallenges: z.array(z.string()).optional(),
  glossary: z.object({
    favorites: z.array(z.string()),
    mastered: z.array(z.string()),
  }),
  settings: z
    .object({
      notifications: z.boolean(),
      soundEffects: z.boolean(),
    })
    .optional(),
});

// ── Build full progress map from levels data ─────────────────────

function buildDefaultProgress(): Record<string, LessonProgress> {
  const allModules = levels.flatMap(l => l.modules);
  const result: Record<string, LessonProgress> = {};
  allModules.forEach((module, index) => {
    result[module.id] = { status: index === 0 ? 'available' : 'locked' };
  });
  return result;
}

const defaultProgress = buildDefaultProgress();

const defaultState: AppState = {
  user: {
    name: '',
    level: 1,
    xp: 0,
    streak: 0,
    lastActiveDate: '',
    createdAt: '',
    background: '',
    goal: [],
    tools: [],
    onboarded: false,
    phoneCountryCode: '',
    phoneNumber: '',
  },
  progress: defaultProgress,
  badges: [],
  completedChallenges: [],
  glossary: { favorites: [], mastered: [] },
  settings: { notifications: true, soundEffects: true },
};

// ── Level constants ───────────────────────────────────────────────

const LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 5000, 8000, 12000, 18000, 25000, 35000];
const LEVEL_NAMES = [
  'Automation Curious', 'Workflow Apprentice', 'Node Explorer',
  'Integration Builder', 'Automation Crafter', 'Workflow Engineer',
  'System Architect', 'Automation Master', 'AI Integration Expert', 'FlowMaster Legend',
];

export function getLevelName(level: number) {
  return LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)];
}

export function getXPForNextLevel(level: number) {
  return LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)];
}

export function getXPForCurrentLevel(level: number) {
  return LEVEL_THRESHOLDS[Math.min(level - 1, LEVEL_THRESHOLDS.length - 1)];
}

// ── Context type — no raw setState exposed ───────────────────────

interface UserContextType {
  state: AppState;
  syncing: boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, score?: number) => void;
  completeChallenge: (challengeId: string, xp: number) => void;
  completeOnboarding: (name: string, background: string, goal: string[], tools: string[], phoneCountryCode?: string, phoneNumber?: string) => void;
  unlockBadge: (badgeId: string) => void;
  toggleGlossaryFavorite: (term: string) => void;
  masterGlossaryTerm: (term: string) => void;
  updateStreak: () => void;
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

// ── Load + validate state from localStorage ───────────────────────

function loadStateFromStorage(): AppState {
  try {
    const saved = localStorage.getItem('flowmaster_state');
    if (!saved) return defaultState;
    const parsed = JSON.parse(saved);
    const result = appStateSchema.safeParse(parsed);
    if (!result.success) {
      console.warn('[UserContext] Stored state failed validation, resetting to defaults.');
      return defaultState;
    }
    // Merge with defaults so newly added fields and lessons are always present
    return {
      ...defaultState,
      ...result.data,
      user: { ...defaultState.user, ...result.data.user },
      settings: { ...defaultState.settings, ...(result.data.settings ?? {}) },
      completedChallenges: result.data.completedChallenges ?? [],
      // Ensure every lesson from the curriculum is represented in progress
      progress: { ...defaultProgress, ...result.data.progress },
    };
  } catch {
    return defaultState;
  }
}

// ── Provider ──────────────────────────────────────────────────────

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isSignedIn, isLoaded } = useClerkUser();
  const [state, setState] = useState<AppState>(loadStateFromStorage);
  const [syncing, setSyncing] = useState(true);
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('flowmaster_state', JSON.stringify(state));
  }, [state]);

  // Sync onboarded flag from Clerk metadata (cross-device source of truth)
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && clerkUser?.unsafeMetadata?.onboarded === true) {
      setState(prev =>
        prev.user.onboarded ? prev : { ...prev, user: { ...prev.user, onboarded: true } }
      );
    }
    setSyncing(false);
  }, [isLoaded, isSignedIn, clerkUser?.unsafeMetadata?.onboarded]);

  // Debounced Supabase sync — waits 5 s after last change before writing
  useEffect(() => {
    if (!isSignedIn || !clerkUser) return;

    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(async () => {
      const displayName =
        clerkUser.fullName ||
        clerkUser.username ||
        clerkUser.primaryEmailAddress?.emailAddress ||
        'Learner';
      const userId = clerkUser.id;

      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      const payload = {
        user_id: userId,
        display_name: displayName,
        xp: state.user.xp,
        level: state.user.level,
        streak: state.user.streak,
        last_active_date: state.user.lastActiveDate || null,
        lessons_completed: Object.values(state.progress).filter(p => p.status === 'complete').length,
        challenges_completed: state.completedChallenges.length,
        badges: state.badges,
        phone_country_code: state.user.phoneCountryCode || null,
        phone_number: state.user.phoneNumber || null,
      };

      if (!existing) {
        await supabase.from('profiles').insert(payload);
      } else {
        await supabase
          .from('profiles')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
      }
    }, 5000);

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [
    clerkUser,
    isSignedIn,
    state.user.xp,
    state.user.level,
    state.user.streak,
    state.user.lastActiveDate,
    state.progress,
    state.badges,
    state.completedChallenges,
    state.user.phoneCountryCode,
    state.user.phoneNumber,
  ]);

  // ── Actions ────────────────────────────────────────────────────

  const addXP = useCallback((amount: number) => {
    setState(prev => {
      const newXP = prev.user.xp + amount;
      let newLevel = prev.user.level;
      while (newLevel < 10 && newXP >= getXPForNextLevel(newLevel)) {
        newLevel++;
      }
      return { ...prev, user: { ...prev.user, xp: newXP, level: newLevel } };
    });
  }, []);

  const completeLesson = useCallback(
    (lessonId: string, score = 100) => {
      setState(prev => {
        const newProgress = { ...prev.progress };
        newProgress[lessonId] = {
          status: 'complete',
          score,
          completedAt: new Date().toISOString(),
        };

        // Find the next module across all levels (handles cross-level transitions)
        const allModules = levels.flatMap(l => l.modules);
        const currentIdx = allModules.findIndex(m => m.id === lessonId);
        if (currentIdx !== -1 && currentIdx < allModules.length - 1) {
          const nextModule = allModules[currentIdx + 1];
          if (newProgress[nextModule.id]?.status === 'locked') {
            newProgress[nextModule.id] = { status: 'available' };
          }
        }

        return { ...prev, progress: newProgress };
      });
      addXP(50);
    },
    [addXP]
  );

  const completeChallenge = useCallback(
    (challengeId: string, xp: number) => {
      setState(prev => {
        if (prev.completedChallenges.includes(challengeId)) return prev;
        return { ...prev, completedChallenges: [...prev.completedChallenges, challengeId] };
      });
      addXP(xp);
    },
    [addXP]
  );

  const completeOnboarding = useCallback(
    (name: string, background: string, goal: string[], tools: string[], phoneCountryCode = '', phoneNumber = '') => {
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          name: name || 'Learner',
          background,
          goal,
          tools,
          onboarded: true,
          createdAt: new Date().toISOString(),
          lastActiveDate: new Date().toISOString().split('T')[0],
          streak: 1,
          phoneCountryCode,
          phoneNumber,
        },
      }));
    },
    []
  );

  const unlockBadge = useCallback(
    (badgeId: string) => {
      setState(prev => {
        if (prev.badges.includes(badgeId)) return prev;
        return { ...prev, badges: [...prev.badges, badgeId] };
      });
      addXP(100);
    },
    [addXP]
  );

  const toggleGlossaryFavorite = useCallback((term: string) => {
    setState(prev => {
      const favs = prev.glossary.favorites.includes(term)
        ? prev.glossary.favorites.filter(f => f !== term)
        : [...prev.glossary.favorites, term];
      return { ...prev, glossary: { ...prev.glossary, favorites: favs } };
    });
  }, []);

  const masterGlossaryTerm = useCallback(
    (term: string) => {
      setState(prev => {
        if (prev.glossary.mastered.includes(term)) return prev;
        return {
          ...prev,
          glossary: { ...prev.glossary, mastered: [...prev.glossary.mastered, term] },
        };
      });
      addXP(5);
    },
    [addXP]
  );

  const updateStreak = useCallback(() => {
    setState(prev => {
      const today = new Date().toISOString().split('T')[0];
      if (prev.user.lastActiveDate === today) return prev;

      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak =
        prev.user.lastActiveDate === yesterday ? prev.user.streak + 1 : 1;

      return { ...prev, user: { ...prev.user, streak: newStreak, lastActiveDate: today } };
    });
  }, []);

  const updateSettings = useCallback((settings: Partial<AppState['settings']>) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        syncing,
        addXP,
        completeLesson,
        completeChallenge,
        completeOnboarding,
        unlockBadge,
        toggleGlossaryFavorite,
        masterGlossaryTerm,
        updateStreak,
        updateSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
