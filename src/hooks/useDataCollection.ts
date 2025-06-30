import { useState, useEffect, useCallback } from 'react';
import useSettingsStore from '../state/settingsStore';
import dataCollectionService from '../services/DataCollectionService';

// @param: {void} - No parameters.
// @description: Defines the return type for the useDataCollection hook.
// @returns: {void} - No return value.
// @updates: Provides TypeScript interface for hook return values.
interface UseDataCollectionReturn {
  isEnabled: boolean;
  isCollecting: boolean;
  lastCollectionTime: string | null;
  toggleCollection: () => Promise<void>;
  startCollection: () => Promise<boolean>;
  stopCollection: () => Promise<boolean>;
  collectData: () => Promise<any>;
  syncData: () => Promise<boolean>;
}

// @param: {void} - No parameters.
// @description: Custom hook that manages data collection state and operations.
// @returns: {UseDataCollectionReturn} - Collection state and control methods.
// @updates: Provides reactive data collection management for UI components.
const useDataCollection = (): UseDataCollectionReturn => {
  const [isCollecting, setIsCollecting] = useState<boolean>(false);
  const [lastCollectionTime, setLastCollectionTime] = useState<string | null>(null);
  
  const { isDataCollectionEnabled, toggleDataCollection } = useSettingsStore();

  // @param: {void} - No parameters.
  // @description: Toggles data collection state and manages the collection process.
  // @returns: {Promise<void>} - No return value.
  // @updates: Toggles collection state and starts/stops collection accordingly.
  const handleToggleCollection = useCallback(async (): Promise<void> => {
    try {
      if (isDataCollectionEnabled) {
        // If currently enabled, stop collection
        const success = await dataCollectionService.stopCollection();
        if (success) {
          setIsCollecting(false);
          console.log('Data collection stopped successfully');
        }
      } else {
        // If currently disabled, start collection
        const success = await dataCollectionService.startCollection();
        if (success) {
          setIsCollecting(true);
          setLastCollectionTime(new Date().toISOString());
          console.log('Data collection started successfully');
        }
      }
      
      // Toggle the setting regardless of service success
      toggleDataCollection();
    } catch (error) {
      console.error('Error toggling data collection:', error);
    }
  }, [isDataCollectionEnabled, toggleDataCollection]);

  // @param: {void} - No parameters.
  // @description: Starts data collection process.
  // @returns: {Promise<boolean>} - True if collection started successfully.
  // @updates: Initiates data collection and updates collection state.
  const startCollection = useCallback(async (): Promise<boolean> => {
    try {
      const success = await dataCollectionService.startCollection();
      if (success) {
        setIsCollecting(true);
        setLastCollectionTime(new Date().toISOString());
        console.log('Data collection started successfully');
      }
      return success;
    } catch (error) {
      console.error('Error starting data collection:', error);
      return false;
    }
  }, []);

  // @param: {void} - No parameters.
  // @description: Stops data collection process.
  // @returns: {Promise<boolean>} - True if collection stopped successfully.
  // @updates: Terminates data collection and updates collection state.
  const stopCollection = useCallback(async (): Promise<boolean> => {
    try {
      const success = await dataCollectionService.stopCollection();
      if (success) {
        setIsCollecting(false);
        console.log('Data collection stopped successfully');
      }
      return success;
    } catch (error) {
      console.error('Error stopping data collection:', error);
      return false;
    }
  }, []);

  // @param: {void} - No parameters.
  // @description: Collects sensor and emotion data.
  // @returns: {Promise<any>} - Collected data object.
  // @updates: Gathers data and updates last collection time.
  const collectData = useCallback(async (): Promise<any> => {
    try {
      const sensorData = await dataCollectionService.collectSensorData();
      const emotionData = await dataCollectionService.collectEmotionData();
      
      if (sensorData || emotionData) {
        setLastCollectionTime(new Date().toISOString());
      }
      
      return {
        sensor: sensorData,
        emotion: emotionData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error collecting data:', error);
      return null;
    }
  }, []);

  // @param: {void} - No parameters.
  // @description: Syncs collected data to cloud storage.
  // @returns: {Promise<boolean>} - True if sync was successful.
  // @updates: Uploads data to cloud storage.
  const syncData = useCallback(async (): Promise<boolean> => {
    try {
      const success = await dataCollectionService.syncDataToCloud();
      if (success) {
        console.log('Data synced to cloud successfully');
      }
      return success;
    } catch (error) {
      console.error('Error syncing data:', error);
      return false;
    }
  }, []);

  // @param: {void} - No parameters.
  // @description: Effect that manages collection state based on settings changes.
  // @returns: {void} - No return value.
  // @updates: Synchronizes collection state with settings changes.
  useEffect(() => {
    if (isDataCollectionEnabled && !isCollecting) {
      // If enabled in settings but not collecting, start collection
      startCollection();
    } else if (!isDataCollectionEnabled && isCollecting) {
      // If disabled in settings but collecting, stop collection
      stopCollection();
    }
  }, [isDataCollectionEnabled, isCollecting, startCollection, stopCollection]);

  return {
    isEnabled: isDataCollectionEnabled,
    isCollecting,
    lastCollectionTime,
    toggleCollection: handleToggleCollection,
    startCollection,
    stopCollection,
    collectData,
    syncData,
  };
};

export default useDataCollection; 