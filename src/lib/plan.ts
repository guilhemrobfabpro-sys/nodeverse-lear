// Levels available on the free plan (level IDs are 1-based)
export const FREE_LEVELS = [1];

export type Plan = 'free' | 'pro';

export function isPro(plan: Plan): boolean {
  return plan === 'pro';
}

/** Returns true if the user can access the given level number (1-5) */
export function canAccessLevel(levelId: number, plan: Plan): boolean {
  return plan === 'pro' || FREE_LEVELS.includes(levelId);
}

/** Returns true if the user can access a lesson (module ID like "2.3") */
export function canAccessLesson(lessonId: string, plan: Plan): boolean {
  const levelId = parseInt(lessonId.split('.')[0], 10);
  return canAccessLevel(levelId, plan);
}
