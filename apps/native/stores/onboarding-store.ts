import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

// Custom storage adapter for SecureStore
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
        return localStorage.getItem(name);
    }
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
        localStorage.setItem(name, value);
        return;
    }
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
        localStorage.removeItem(name);
        return;
    }
    await SecureStore.deleteItemAsync(name);
  },
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
