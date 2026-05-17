import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {
        name: 'Alex Rivera',
        email: 'alex@aesther.ai',
        profileImage: localStorage.getItem('profileImage') || null,
        level: 24,
        xp: 12450,
        xpToNext: 15000,
        stats: {
          workouts: 142,
          calories: 84200,
          streak: 12
        },
        preferences: {
          notifications: true,
          neuralSync: true
        }
      },
      theme: 'dark',
      
      updateUser: (newData) => set((state) => {
        if (newData.profileImage !== undefined) {
          if (newData.profileImage) {
            localStorage.setItem('profileImage', newData.profileImage);
          } else {
            localStorage.removeItem('profileImage');
          }
        }
        return {
          user: { ...state.user, ...newData }
        };
      }),

      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        console.log('Zustand: Toggling theme to', newTheme);
        return { theme: newTheme };
      }),
      
      setProfileImage: (image) => set((state) => {
        if (image) {
          localStorage.setItem('profileImage', image);
        } else {
          localStorage.removeItem('profileImage');
        }
        return {
          user: { ...state.user, profileImage: image }
        };
      }),
      
      resetUser: () => {
        localStorage.removeItem('profileImage');
        set({
          user: {
            name: 'New Athlete',
            email: '',
            profileImage: null,
            level: 1,
            xp: 0,
            xpToNext: 1000,
            stats: { workouts: 0, calories: 0, streak: 0 },
            preferences: { notifications: true, neuralSync: true }
          },
          theme: 'dark'
        });
      }
    }),
    {
      name: 'aesther-user-storage-v2',
    }
  )
);
