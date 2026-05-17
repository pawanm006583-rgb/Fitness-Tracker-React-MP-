import { create } from 'zustand';

export const useStore = create((set) => ({
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
    { id: 'ex1', name: 'Barbell Bench Press', muscle: 'Chest', sets: 4, completedSets: 0, reps: '8-10', weight: '80kg', rest: '90s', calories: 85, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80' },
    { id: 'ex2', name: 'Incline Dumbbell Press', muscle: 'Chest', sets: 3, completedSets: 0, reps: '10-12', weight: '28kg', rest: '60s', calories: 60, image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80' },
    { id: 'ex3', name: 'Weighted Dips', muscle: 'Chest/Triceps', sets: 3, completedSets: 0, reps: '12', weight: '15kg', rest: '60s', calories: 50, image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80' },
    { id: 'ex4', name: 'Cable Flys', muscle: 'Chest', sets: 3, completedSets: 0, reps: '15', weight: '12kg', rest: '45s', calories: 40, image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80' },
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
