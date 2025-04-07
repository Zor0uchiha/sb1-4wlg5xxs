import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  completed: boolean;
  unlockedAt?: string;
}

interface AchievementState {
  achievements: Achievement[];
  updateProgress: (id: string, progress: number) => void;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-task',
    title: 'First Steps',
    description: 'Complete your first task',
    icon: '🎯',
    progress: 0,
    total: 1,
    completed: false,
  },
  {
    id: 'streak-3',
    title: 'On Fire',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    progress: 0,
    total: 3,
    completed: false,
  },
  {
    id: 'credits-100',
    title: 'Credit Master',
    description: 'Earn 100 credits',
    icon: '🌿',
    progress: 0,
    total: 100,
    completed: false,
  },
  {
    id: 'tasks-10',
    title: 'Task Champion',
    description: 'Complete 10 tasks',
    icon: '🏆',
    progress: 0,
    total: 10,
    completed: false,
  },
];

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set) => ({
      achievements: initialAchievements,
      updateProgress: (id, progress) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id
              ? {
                  ...achievement,
                  progress,
                  completed: progress >= achievement.total,
                  unlockedAt: progress >= achievement.total ? new Date().toISOString() : undefined,
                }
              : achievement
          ),
        })),
    }),
    {
      name: 'achievement-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);