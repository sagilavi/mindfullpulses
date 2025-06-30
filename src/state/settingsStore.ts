import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @param: {void} - No parameters.
// @description: Defines the structure for application settings state.
// @returns: {void} - No return value.
// @updates: Provides TypeScript interface for settings state management.
interface SettingsState {
  isDataCollectionEnabled: boolean;
  lastUpdated: string | null;
  userPreferences: {
    syncFrequency: 'realtime' | 'hourly' | 'daily';
    notificationsEnabled: boolean;
    privacyMode: boolean;
  };
}

// @param: {void} - No parameters.
// @description: Defines the actions that can be performed on the settings state.
// @returns: {void} - No return value.
// @updates: Provides TypeScript interface for settings actions.
interface SettingsActions {
  toggleDataCollection: () => void;
  enableDataCollection: () => void;
  disableDataCollection: () => void;
  updateSyncFrequency: (frequency: 'realtime' | 'hourly' | 'daily') => void;
  toggleNotifications: () => void;
  togglePrivacyMode: () => void;
  resetSettings: () => void;
}

// @param: {void} - No parameters.
// @description: Creates a persistent settings store using Zustand with AsyncStorage.
// @returns: {Store} - A Zustand store with settings state and actions.
// @updates: Provides global access to application settings with persistence.
const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set, get) => ({
      // Initial state
      isDataCollectionEnabled: false,
      lastUpdated: null,
      userPreferences: {
        syncFrequency: 'hourly',
        notificationsEnabled: true,
        privacyMode: false,
      },

      // @param: {void} - No parameters.
      // @description: Toggles the data collection state between enabled and disabled.
      // @returns: {void} - No return value.
      // @updates: Updates isDataCollectionEnabled and lastUpdated in the store.
      toggleDataCollection: () => {
        set((state) => ({
          isDataCollectionEnabled: !state.isDataCollectionEnabled,
          lastUpdated: new Date().toISOString(),
        }));
      },

      // @param: {void} - No parameters.
      // @description: Explicitly enables data collection.
      // @returns: {void} - No return value.
      // @updates: Sets isDataCollectionEnabled to true and updates lastUpdated.
      enableDataCollection: () => {
        set({
          isDataCollectionEnabled: true,
          lastUpdated: new Date().toISOString(),
        });
      },

      // @param: {void} - No parameters.
      // @description: Explicitly disables data collection.
      // @returns: {void} - No return value.
      // @updates: Sets isDataCollectionEnabled to false and updates lastUpdated.
      disableDataCollection: () => {
        set({
          isDataCollectionEnabled: false,
          lastUpdated: new Date().toISOString(),
        });
      },

      // @param: {string} frequency - The sync frequency to set.
      // @description: Updates the sync frequency preference.
      // @returns: {void} - No return value.
      // @updates: Updates syncFrequency in userPreferences.
      updateSyncFrequency: (frequency: 'realtime' | 'hourly' | 'daily') => {
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            syncFrequency: frequency,
          },
        }));
      },

      // @param: {void} - No parameters.
      // @description: Toggles the notifications enabled state.
      // @returns: {void} - No return value.
      // @updates: Updates notificationsEnabled in userPreferences.
      toggleNotifications: () => {
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            notificationsEnabled: !state.userPreferences.notificationsEnabled,
          },
        }));
      },

      // @param: {void} - No parameters.
      // @description: Toggles the privacy mode state.
      // @returns: {void} - No return value.
      // @updates: Updates privacyMode in userPreferences.
      togglePrivacyMode: () => {
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            privacyMode: !state.userPreferences.privacyMode,
          },
        }));
      },

      // @param: {void} - No parameters.
      // @description: Resets all settings to their default values.
      // @returns: {void} - No return value.
      // @updates: Resets all settings to initial state.
      resetSettings: () => {
        set({
          isDataCollectionEnabled: false,
          lastUpdated: null,
          userPreferences: {
            syncFrequency: 'hourly',
            notificationsEnabled: true,
            privacyMode: false,
          },
        });
      },
    }),
    {
      name: 'mindfullpulse-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isDataCollectionEnabled: state.isDataCollectionEnabled,
        lastUpdated: state.lastUpdated,
        userPreferences: state.userPreferences,
      }),
    }
  )
);

export default useSettingsStore; 