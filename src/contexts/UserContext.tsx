import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

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
  glossary: {
    favorites: string[];
    mastered: string[];
  };
  settings: {
    notifications: boolean;
    soundEffects: boolean;
  };
}

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
  },
  progress: {
    '1.1': { status: 'available' },
    '1.2': { status: 'locked' },
    '1.3': { status: 'locked' },
    '1.4': { status: 'locked' },
    '1.5': { status: 'locked' },
    '1.6': { status: 'locked' },
    '1.7': { status: 'locked' },
    '1.8': { status: 'locked' },
  },
  badges: [],
  glossary: { favorites: [], mastered: [] },
  settings: { notifications: true, soundEffects: true },
};

const LEVEL_THRESHOLDS = [0, 500, 1500, 3000, 5000, 8000, 12000, 18000, 25000, 35000];
const LEVEL_NAMES = [
  'Automation Curious', 'Workflow Apprentice', 'Node Explorer',
  'Integration Builder', 'Automation Crafter', 'Workflow Engineer',
  'System Architect', 'Automation Master', 'AI Integration Expert', 'FlowMaster Legend'
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

interface UserContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  syncing: boolean;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string, score?: number) => void;
  unlockBadge: (badgeId: string) => void;
  toggleGlossaryFavorite: (term: string) => void;
  masterGlossaryTerm: (term: string) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isSignedIn, isLoaded } = useClerkUser();
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('flowmaster_state');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultState;
  });
  // True until we've checked Clerk metadata — prevents premature onboarding redirects
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    localStorage.setItem('flowmaster_state', JSON.stringify(state));
  }, [state]);

  // Sync onboarded flag from Clerk metadata (cross-device source of truth)
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn && clerkUser?.unsafeMetadata?.onboarded === true) {
      setState(prev => prev.user.onboarded ? prev : { ...prev, user: { ...prev.user, onboarded: true } });
    }
    setSyncing(false);
  }, [isLoaded, isSignedIn, clerkUser?.unsafeMetadata?.onboarded]);

  // Sync profile with Supabase whenever the signed-in user or core profile fields change
  useEffect(() => {
    const syncProfile = async () => {
      if (!isSignedIn || !clerkUser) return;

      const displayName = clerkUser.fullName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress || 'Learner';
      const userId = clerkUser.id;

      const { data: existing, error } = await supabase
        .from('profiles')
        .select('*')
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
        badges: state.badges,
      };

      if (!existing) {
        await supabase.from('profiles').insert(payload);
      } else {
        await supabase
          .from('profiles')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', existing.id);
      }
    };

    void syncProfile();
  }, [clerkUser, isSignedIn, state.user.xp, state.user.level, state.user.streak, state.user.lastActiveDate, state.progress, state.badges]);

  const addXP = useCallback((amount: number) => {
    setState(prev => {
      let newXP = prev.user.xp + amount;
      let newLevel = prev.user.level;
      while (newLevel < 10 && newXP >= getXPForNextLevel(newLevel)) {
        newLevel++;
      }
      return { ...prev, user: { ...prev.user, xp: newXP, level: newLevel } };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, score = 100) => {
    setState(prev => {
      const newProgress = { ...prev.progress };
      newProgress[lessonId] = { status: 'complete', score, completedAt: new Date().toISOString() };
      
      // Unlock next lesson
      const [level, num] = lessonId.split('.').map(Number);
      const nextId = `${level}.${num + 1}`;
      if (newProgress[nextId] && newProgress[nextId].status === 'locked') {
        newProgress[nextId] = { status: 'available' };
      }
      
      return { ...prev, progress: newProgress };
    });
    addXP(50);
  }, [addXP]);

  const unlockBadge = useCallback((badgeId: string) => {
    setState(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
    addXP(100);
  }, [addXP]);

  const toggleGlossaryFavorite = useCallback((term: string) => {
    setState(prev => {
      const favs = prev.glossary.favorites.includes(term)
        ? prev.glossary.favorites.filter(f => f !== term)
        : [...prev.glossary.favorites, term];
      return { ...prev, glossary: { ...prev.glossary, favorites: favs } };
    });
  }, []);

  const masterGlossaryTerm = useCallback((term: string) => {
    setState(prev => {
      if (prev.glossary.mastered.includes(term)) return prev;
      return { ...prev, glossary: { ...prev.glossary, mastered: [...prev.glossary.mastered, term] } };
    });
    addXP(5);
  }, [addXP]);

  const updateStreak = useCallback(() => {
    setState(prev => {
      const today = new Date().toISOString().split('T')[0];
      if (prev.user.lastActiveDate === today) return prev;
      
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = prev.user.lastActiveDate === yesterday ? prev.user.streak + 1 : 1;
      
      return { ...prev, user: { ...prev.user, streak: newStreak, lastActiveDate: today } };
    });
  }, []);

  return (
    <UserContext.Provider value={{ state, setState, syncing, addXP, completeLesson, unlockBadge, toggleGlossaryFavorite, masterGlossaryTerm, updateStreak }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
