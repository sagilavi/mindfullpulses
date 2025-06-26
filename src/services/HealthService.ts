// src/services/HealthService.ts

export interface SensorEvent {
  timestamp: string;
  event_type: string;
  value: number | string;
  source: string;
}

export interface IHealthService {
  /**
   * @param: {string} startDate - The start date for data fetch.
   * @param: {string} endDate - The end date for data fetch.
   * @description: Fetches mock historical sensor data for the given range.
   * @returns: {Promise<SensorEvent[]>} - Resolves with an array of mock sensor events.
   * @updates: Used to populate the dashboard and emotion screens.
   */
  fetchHistoricalData(startDate: string, endDate: string): Promise<SensorEvent[]>;
}

const mockSensorData: SensorEvent[] = [
  { timestamp: '2024-06-16 14:30:25', event_type: 'heart_rate', value: 78, source: 'mock_data' },
  { timestamp: '2024-06-16 14:25:10', event_type: 'steps', value: 1247, source: 'mock_data' },
  { timestamp: '2024-06-16 14:20:45', event_type: 'hrv', value: 42, source: 'mock_data' },
  { timestamp: '2024-06-16 14:15:30', event_type: 'activity', value: 'Moderate', source: 'mock_data' },
  { timestamp: '2024-06-16 14:10:15', event_type: 'blood_oxygen', value: 98, source: 'mock_data' },
  { timestamp: '2024-06-16 14:05:00', event_type: 'steps', value: 1198, source: 'mock_data' },
];

export class MockHealthService implements IHealthService {
  async fetchHistoricalData(startDate: string, endDate: string): Promise<SensorEvent[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSensorData), 800);
    });
  }
} 