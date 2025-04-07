import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
  type: 'daily' | 'weekly' | 'custom';
  streak: number;
  credits: number;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  totalCredits: number;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      totalCredits: 0,
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Math.random().toString(36).substring(7),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleTask: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (!task) return state;

          const newCredits = task.completed ? 
            state.totalCredits - task.credits : 
            state.totalCredits + task.credits;

          return {
            tasks: state.tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: !t.completed,
                    streak: !t.completed ? t.streak + 1 : t.streak,
                  }
                : t
            ),
            totalCredits: newCredits,
          };
        }),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      updateTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updatedTask } : t
          ),
        })),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);