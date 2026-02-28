import { describe, it, expect, beforeEach } from 'vitest';
import { getLevelName, getXPForNextLevel, getXPForCurrentLevel } from '@/contexts/UserContext';
import { levels } from '@/data/levels';

// ── Helper: build the default progress map (mirrors logic in UserContext) ──────

function buildDefaultProgress() {
  const allModules = levels.flatMap(l => l.modules);
  const result: Record<string, { status: 'locked' | 'available' | 'in_progress' | 'complete' }> = {};
  allModules.forEach((module, index) => {
    result[module.id] = { status: index === 0 ? 'available' : 'locked' };
  });
  return result;
}

// ── Helper: simulate addXP logic ──────────────────────────────────────────────

function applyAddXP(currentXP: number, currentLevel: number, amount: number) {
  let newXP = currentXP + amount;
  let newLevel = currentLevel;
  while (newLevel < 10 && newXP >= getXPForNextLevel(newLevel)) {
    newLevel++;
  }
  return { xp: newXP, level: newLevel };
}

// ── Helper: simulate completeLesson unlock logic ──────────────────────────────

function applyCompleteLesson(
  progress: Record<string, { status: 'locked' | 'available' | 'in_progress' | 'complete' }>,
  lessonId: string
) {
  const newProgress = { ...progress };
  newProgress[lessonId] = { status: 'complete' };
  const allModules = levels.flatMap(l => l.modules);
  const currentIdx = allModules.findIndex(m => m.id === lessonId);
  if (currentIdx !== -1 && currentIdx < allModules.length - 1) {
    const nextModule = allModules[currentIdx + 1];
    if (newProgress[nextModule.id]?.status === 'locked') {
      newProgress[nextModule.id] = { status: 'available' };
    }
  }
  return newProgress;
}

// ── Helper: simulate updateStreak logic ──────────────────────────────────────

function applyUpdateStreak(streak: number, lastActiveDate: string, today: string) {
  if (lastActiveDate === today) return { streak, lastActiveDate };
  const todayDate = new Date(today);
  const yesterdayStr = new Date(todayDate.getTime() - 86400000).toISOString().split('T')[0];
  const newStreak = lastActiveDate === yesterdayStr ? streak + 1 : 1;
  return { streak: newStreak, lastActiveDate: today };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('getLevelName', () => {
  it('returns the correct name for each level', () => {
    expect(getLevelName(1)).toBe('Automation Curious');
    expect(getLevelName(5)).toBe('Automation Crafter');
    expect(getLevelName(10)).toBe('FlowMaster Legend');
  });

  it('clamps to max level name when level exceeds 10', () => {
    expect(getLevelName(11)).toBe('FlowMaster Legend');
    expect(getLevelName(99)).toBe('FlowMaster Legend');
  });
});

describe('getXPForNextLevel / getXPForCurrentLevel', () => {
  it('returns correct XP threshold for each level boundary', () => {
    expect(getXPForNextLevel(1)).toBe(500);
    expect(getXPForNextLevel(2)).toBe(1500);
    expect(getXPForCurrentLevel(1)).toBe(0);
    expect(getXPForCurrentLevel(2)).toBe(500);
  });
});

describe('addXP (level-up logic)', () => {
  it('increments XP without leveling up when below threshold', () => {
    const result = applyAddXP(0, 1, 100);
    expect(result.xp).toBe(100);
    expect(result.level).toBe(1);
  });

  it('levels up when XP crosses threshold', () => {
    const result = applyAddXP(490, 1, 50);
    expect(result.xp).toBe(540);
    expect(result.level).toBe(2);
  });

  it('handles multiple level-ups from a single XP gain', () => {
    const result = applyAddXP(0, 1, 1600);
    // 1600 XP crosses level 1 (500) and level 2 (1500) thresholds
    expect(result.level).toBeGreaterThanOrEqual(3);
  });

  it('does not exceed max level 10', () => {
    const result = applyAddXP(34999, 9, 100000);
    expect(result.level).toBe(10);
  });
});

describe('completeLesson (progress unlock)', () => {
  let defaultProgress: ReturnType<typeof buildDefaultProgress>;

  beforeEach(() => {
    defaultProgress = buildDefaultProgress();
  });

  it('marks the lesson as complete', () => {
    const result = applyCompleteLesson(defaultProgress, '1.1');
    expect(result['1.1'].status).toBe('complete');
  });

  it('unlocks the next lesson within the same level', () => {
    const result = applyCompleteLesson(defaultProgress, '1.1');
    expect(result['1.2'].status).toBe('available');
  });

  it('unlocks the first lesson of the next level when last lesson in level is completed', () => {
    // Complete all lessons up to 1.8 first
    let progress = { ...defaultProgress };
    ['1.1','1.2','1.3','1.4','1.5','1.6','1.7'].forEach(id => {
      progress = applyCompleteLesson(progress, id);
    });
    const result = applyCompleteLesson(progress, '1.8');
    expect(result['2.1'].status).toBe('available');
  });

  it('does not unlock anything for the last lesson in the curriculum', () => {
    const allModules = levels.flatMap(l => l.modules);
    const lastId = allModules[allModules.length - 1].id;
    // Set last lesson as available
    const progress = { ...defaultProgress, [lastId]: { status: 'available' as const } };
    const result = applyCompleteLesson(progress, lastId);
    expect(result[lastId].status).toBe('complete');
  });
});

describe('buildDefaultProgress', () => {
  it('has exactly as many entries as there are modules across all levels', () => {
    const totalModules = levels.reduce((sum, l) => sum + l.modules.length, 0);
    const progress = buildDefaultProgress();
    expect(Object.keys(progress).length).toBe(totalModules);
  });

  it('starts with only lesson 1.1 available and all others locked', () => {
    const progress = buildDefaultProgress();
    expect(progress['1.1'].status).toBe('available');
    expect(progress['1.2'].status).toBe('locked');
    expect(progress['2.1'].status).toBe('locked');
  });
});

describe('updateStreak', () => {
  it('increments streak when last active was yesterday', () => {
    const today = '2026-02-28';
    const yesterday = '2026-02-27';
    const result = applyUpdateStreak(5, yesterday, today);
    expect(result.streak).toBe(6);
    expect(result.lastActiveDate).toBe(today);
  });

  it('resets streak to 1 when there was a gap', () => {
    const today = '2026-02-28';
    const twoDaysAgo = '2026-02-26';
    const result = applyUpdateStreak(15, twoDaysAgo, today);
    expect(result.streak).toBe(1);
  });

  it('does not change streak when already active today', () => {
    const today = '2026-02-28';
    const result = applyUpdateStreak(7, today, today);
    expect(result.streak).toBe(7);
    expect(result.lastActiveDate).toBe(today);
  });
});
