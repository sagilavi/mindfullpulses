// src/state/userStore.ts
import { StateCreator, create } from 'zustand';
import { User } from '../services/AuthService';

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set: (partial: Partial<UserState>) => void) => ({
  /**
   * @param: {User | null} user - The user object or null to clear.
   * @description: Sets the current user in the store.
   * @returns: {void} - No return value.
   * @updates: Updates the user state for authentication.
   */
  user: null,
  isLoading: false,
  setUser: (user: User | null) => set({ user }),
  /**
   * @param: {boolean} loading - Loading state flag.
   * @description: Sets the loading state for authentication actions.
   * @returns: {void} - No return value.
   * @updates: Updates the isLoading state for UI feedback.
   */
  setLoading: (isLoading: boolean) => set({ isLoading }),
})); 