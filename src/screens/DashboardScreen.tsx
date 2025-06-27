import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, Switch, DataTable, Badge } from 'react-native-paper';

// Mock sensor data - this will be replaced with WatermelonDB data
const mockSensorData = [
  { id: 1, timestamp: '2024-06-16 14:30:25', eventType: 'Heart Rate', value: '78 bpm', source: 'iOS_HealthKit' },
  { id: 2, timestamp: '2024-06-16 14:25:10', eventType: 'Steps', value: '1,247', source: 'iOS_HealthKit' },
  { id: 3, timestamp: '2024-06-16 14:20:45', eventType: 'Heart Rate Variability', value: '42 ms', source: 'Apple_Watch' },
  { id: 4, timestamp: '2024-06-16 14:15:30', eventType: 'Activity Level', value: 'Moderate', source: 'Apple_Watch' },
  { id: 5, timestamp: '2024-06-16 14:10:15', eventType: 'Blood Oxygen', value: '98%', source: 'Apple_Watch' },
  { id: 6, timestamp: '2024-06-16 14:05:00', eventType: 'Steps', value: '1,198', source: 'iOS_HealthKit' },
];

const getSourceBadgeColor = (source: string) => {
  switch (source) {
    case 'iOS_HealthKit':
      return { backgroundColor: '#e3f2fd', color: '#1565c0' };
    case 'Apple_Watch':
      return { backgroundColor: '#e8f5e9', color: '#2e7d32' };
    case 'Galaxy_Watch':
      return { backgroundColor: '#ede7f6', color: '#6a1b9a' };
    default:
      return { backgroundColor: '#f5f5f5', color: '#424242' };
  }
};

// @param: {void} - No parameters.
// @description: Renders the Dashboard screen with sensor data and grouped view toggle.
// @returns: {JSX.Element} - The Dashboard screen component.
// @updates: Displays sensor data in table or grouped view.
const DashboardScreen = () => {
  const [showGroupedView, setShowGroupedView] = useState(false);

  // Group data by event type for the new view
  const groupedData = mockSensorData.reduce((acc: Record<string, typeof mockSensorData>, record) => {
    if (!acc[record.eventType]) {
      acc[record.eventType] = [];
    }
    acc[record.eventType].push(record);
    return acc;
  }, {} as Record<string, typeof mockSensorData>);

  // Get unique timestamps for column headers
  const uniqueTimestamps = Array.from(new Set(mockSensorData.map(record => record.timestamp))).sort();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 16 }}>
        <Text variant="headlineLarge" style={{ fontWeight: 'bold', marginBottom: 4 }}>Dashboard</Text>
        <Text variant="bodyMedium" style={{ color: '#666', marginBottom: 16 }}>
          View your raw sensor data collected from connected devices
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Total Records</Text>
              <Text variant="headlineMedium" style={{ marginVertical: 4 }}>{mockSensorData.length}</Text>
              <Text variant="bodySmall" style={{ color: '#888' }}>Data points collected today</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Active Sources</Text>
              <Text variant="headlineMedium" style={{ marginVertical: 4 }}>2</Text>
              <Text variant="bodySmall" style={{ color: '#888' }}>Connected devices</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleSmall">Last Update</Text>
              <Text variant="headlineMedium" style={{ marginVertical: 4 }}>2m ago</Text>
              <Text variant="bodySmall" style={{ color: '#888' }}>Most recent data sync</Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={{ marginBottom: 16 }}>
          <Card.Title
            title="Sensor Events"
            right={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginRight: 8 }}>Group by Event Type</Text>
                <Switch value={showGroupedView} onValueChange={setShowGroupedView} />
              </View>
            )}
          />
          <Card.Content>
            <ScrollView horizontal style={{ width: '100%' }}>
              {showGroupedView ? (
                <View>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Event Type</DataTable.Title>
                      {uniqueTimestamps.map(timestamp => (
                        <DataTable.Title key={timestamp} style={{ minWidth: 100 }}>
                          <Text style={{ fontSize: 12 }}>{timestamp}</Text>
                        </DataTable.Title>
                      ))}
                    </DataTable.Header>
                    {Object.entries(groupedData).map(([eventType, records]) => (
                      <DataTable.Row key={eventType}>
                        <DataTable.Cell>{eventType}</DataTable.Cell>
                        {uniqueTimestamps.map(timestamp => {
                          const record = records.find(r => r.timestamp === timestamp);
                          return (
                            <DataTable.Cell key={timestamp} style={{ minWidth: 100, justifyContent: 'center' }}>
                              {record ? (
                                <Text style={{ fontWeight: 'bold' }}>{record.value}</Text>
                              ) : (
                                <Text style={{ color: '#bbb' }}>-</Text>
                              )}
                            </DataTable.Cell>
                          );
                        })}
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              ) : (
                <View>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Timestamp</DataTable.Title>
                      <DataTable.Title>Event Type</DataTable.Title>
                      <DataTable.Title>Value</DataTable.Title>
                      <DataTable.Title>Source</DataTable.Title>
                    </DataTable.Header>
                    {mockSensorData.map(record => (
                      <DataTable.Row key={record.id}>
                        <DataTable.Cell><Text style={{ fontSize: 12 }}>{record.timestamp}</Text></DataTable.Cell>
                        <DataTable.Cell>{record.eventType}</DataTable.Cell>
                        <DataTable.Cell>{record.value}</DataTable.Cell>
                        <DataTable.Cell>
                          <Badge style={getSourceBadgeColor(record.source)}>{record.source}</Badge>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </View>
              )}
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4,
    minWidth: 110,
  },
});

export default DashboardScreen; 