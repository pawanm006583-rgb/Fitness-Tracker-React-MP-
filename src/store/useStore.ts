import { create } from 'zustand';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  completedSets: number;
  reps: string;
  weight: string;
  rest: string;
  calories: number;
}

interface Workout {
  id: string;
  title: string;
  duration: string;
  calories: number;
  date: Date;
  pr?: boolean;
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  category: 'weight' | 'strength' | 'consistency';
}

interface AppState {
  // User Stats
  caloriesBurned: number;
  waterIntake: number;
  activeMinutes: number;
  recoveryScore: number;
  xp: number;
  streak: number;
  
  // Workout State
  isWorkoutActive: boolean;
  isPlanOpen: boolean;
  activeWorkoutTitle: string;
  workoutHistory: Workout[];
  currentExercises: Exercise[];
  
  // AI Coach State
  chatHistory: Message[];
  isTyping: boolean;
  
  // Goals & Notifications
  goals: Goal[];
  notifications: { id: string; title: string; desc: string; type: 'alert' | 'success' }[];
  
  // Actions
  addWater: (amount: number) => void;
  openPlan: () => void;
  closePlan: () => void;
  startWorkout: (title: string) => void;
  endWorkout: (duration: string, calories: number) => void;
  completeSet: (exerciseId: string) => void;
  addMessage: (content: string, role: 'user' | 'ai') => void;
  addNotification: (title: string, desc: string, type: 'alert' | 'success') => void;
  clearNotifications: () => void;
}

export const useStore = create<AppState>((set) => ({
  caloriesBurned: 1240,
  waterIntake: 1.8,
  activeMinutes: 45,
  recoveryScore: 92,
  xp: 4500,
  streak: 14,
  
  isWorkoutActive: false,
  isPlanOpen: false,
  activeWorkoutTitle: '',
  workoutHistory: [
    { id: '1', title: 'Chest & Shoulders', duration: '45m', calories: 420, date: new Date(), pr: true },
  ],
  currentExercises: [
    { id: 'ex1', name: 'Barbell Bench Press', muscle: 'Chest', sets: 4, completedSets: 0, reps: '8-10', weight: '80kg', rest: '90s', calories: 85 },
    { id: 'ex2', name: 'Incline Dumbbell Press', muscle: 'Chest', sets: 3, completedSets: 0, reps: '10-12', weight: '28kg', rest: '60s', calories: 60 },
    { id: 'ex3', name: 'Weighted Dips', muscle: 'Chest/Triceps', sets: 3, completedSets: 0, reps: '12', weight: '15kg', rest: '60s', calories: 50 },
    { id: 'ex4', name: 'Cable Flys', muscle: 'Chest', sets: 3, completedSets: 0, reps: '15', weight: '12kg', rest: '45s', calories: 40 },
  ],
  
  chatHistory: [
    { id: '1', role: 'ai', content: "Hello! I'm AESTHER. Your neural capacity is optimized for hypertrophy today. Ready to start?", timestamp: new Date() }
  ],
  isTyping: false,
  
  goals: [
    { id: '1', title: 'Target Weight', target: 75, current: 82.4, unit: 'kg', category: 'weight' },
    { id: '2', title: 'Weekly Workouts', target: 5, current: 3, unit: 'sessions', category: 'consistency' },
  ],
  notifications: [
    { id: '1', title: 'Peak Recovery', desc: 'Neural capacity is at 94% today.', type: 'success' },
  ],

  addWater: (amount) => set((state) => ({ waterIntake: state.waterIntake + amount })),
  
  openPlan: () => set({ isPlanOpen: true }),
  closePlan: () => set({ isPlanOpen: false }),

  startWorkout: (title) => set({ isWorkoutActive: true, activeWorkoutTitle: title, isPlanOpen: true }),
  
  endWorkout: (duration, calories) => set((state) => ({
    isWorkoutActive: false,
    isPlanOpen: false,
    caloriesBurned: state.caloriesBurned + calories,
    xp: state.xp + 500,
    streak: state.streak + 1,
    workoutHistory: [
      { id: Math.random().toString(), title: state.activeWorkoutTitle || 'Custom Session', duration, calories, date: new Date() },
      ...state.workoutHistory
    ],
    // Reset exercises
    currentExercises: state.currentExercises.map(ex => ({ ...ex, completedSets: 0 }))
  })),

  completeSet: (exerciseId) => set((state) => ({
    currentExercises: state.currentExercises.map(ex => 
      ex.id === exerciseId 
        ? { ...ex, completedSets: Math.min(ex.completedSets + 1, ex.sets) }
        : ex
    )
  })),
  
  addMessage: (content, role) => set((state) => ({
    chatHistory: [...state.chatHistory, { id: Math.random().toString(), role, content, timestamp: new Date() }]
  })),
  
  addNotification: (title, desc, type) => set((state) => ({
    notifications: [{ id: Math.random().toString(), title, desc, type }, ...state.notifications]
  })),
  
  clearNotifications: () => set({ notifications: [] }),
}));
