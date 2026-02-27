export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'progression' | 'activity' | 'skill' | 'social';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const badges: Badge[] = [
  // Progression
  { id: 'first_steps', name: 'First Steps', icon: '🌱', description: 'Complete Level 1', category: 'progression', rarity: 'common' },
  { id: 'node_ninja', name: 'Node Ninja', icon: '⚡', description: 'Complete Level 2', category: 'progression', rarity: 'rare' },
  { id: 'ai_whisperer', name: 'AI Whisperer', icon: '🤖', description: 'Complete Level 3', category: 'progression', rarity: 'rare' },
  { id: 'system_architect', name: 'System Architect', icon: '🏗️', description: 'Complete Level 4', category: 'progression', rarity: 'epic' },
  { id: 'automation_master', name: 'Automation Master', icon: '🚀', description: 'Complete Level 5', category: 'progression', rarity: 'legendary' },
  // Activity
  { id: 'on_fire', name: 'On Fire', icon: '🔥', description: '7-day learning streak', category: 'activity', rarity: 'common' },
  { id: 'iron_will', name: 'Iron Will', icon: '💪', description: '30-day learning streak', category: 'activity', rarity: 'epic' },
  { id: 'speed_runner', name: 'Speed Runner', icon: '⚡', description: 'Complete a lesson in under 5 min', category: 'activity', rarity: 'rare' },
  { id: 'night_owl', name: 'Night Owl', icon: '🌙', description: 'Learn after midnight', category: 'activity', rarity: 'common' },
  { id: 'early_bird', name: 'Early Bird', icon: '☀️', description: 'Learn before 7am', category: 'activity', rarity: 'common' },
  // Skills
  { id: 'webhook_wizard', name: 'Webhook Wizard', icon: '🔗', description: 'Build 5 webhook workflows', category: 'skill', rarity: 'rare' },
  { id: 'data_wrangler', name: 'Data Wrangler', icon: '📊', description: 'Master JSON manipulation', category: 'skill', rarity: 'rare' },
  { id: 'gpt_whisperer', name: 'GPT Whisperer', icon: '🤖', description: 'Create 3 AI workflows', category: 'skill', rarity: 'rare' },
  { id: 'bug_hunter', name: 'Bug Hunter', icon: '🛠️', description: 'Fix 10 broken workflows', category: 'skill', rarity: 'epic' },
  { id: 'scholar', name: 'Scholar', icon: '📚', description: 'Read all glossary terms', category: 'skill', rarity: 'rare' },
  // Social
  { id: 'challenger', name: 'Challenger', icon: '🎯', description: 'Complete 10 daily challenges', category: 'social', rarity: 'rare' },
  { id: 'champion', name: 'Champion', icon: '🏆', description: 'Win a weekly challenge', category: 'social', rarity: 'epic' },
  { id: 'top_10', name: 'Top 10', icon: '⭐', description: 'Reach leaderboard top 10', category: 'social', rarity: 'legendary' },
  { id: 'vocab_master', name: 'Vocab Master', icon: '📖', description: 'Master all glossary terms', category: 'skill', rarity: 'rare' },
];
