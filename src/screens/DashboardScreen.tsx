import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Text, Switch, Divider } from 'react-native-paper';

// Mock sensor data - this will be replaced with WatermelonDB data
const mockSensorData = [
  { id: 1, timestamp: '2024-06-16 14:30:25', eventType: 'Heart Rate', value: '78 bpm', source: 'iOS_HealthKit' },
  { id: 2, timestamp: '2024-06-16 14:25:10', eventType: 'Steps', value: '1,247', source: 'iOS_HealthKit' },
  { id: 3, timestamp: '2024-06-16 14:20:45', eventType: 'Heart Rate Variability', value: '42 ms', source: 'Apple_Watch' },
  { id: 4, timestamp: '2024-06-16 14:15:30', eventType: 'Activity Level', value: 'Moderate', source: 'Apple_Watch' },
  { id: 5, timestamp: '2024-06-16 14:10:15', eventType: 'Blood Oxygen', value: '98%', source: 'Apple_Watch' },
  { id: 6, timestamp: '2024-06-16 14:05:00', eventType: 'Steps', value: '1,198', source: 'iOS_HealthKit' },
];

// @param: {string} source - The data source name.
// @description: Returns color configuration for different data sources.
// @returns: {object} - Color configuration object.
// @updates: Provides visual distinction between data sources.
const getSourceBadgeColor = (source: string) => {
  switch (source) {
    case 'iOS_HealthKit':
      return { backgroundColor: '#e3f2fd', color: '#1565c0', borderColor: '#90caf9' };
    case 'Apple_Watch':
      return { backgroundColor: '#e8f5e9', color: '#2e7d32', borderColor: '#a5d6a7' };
    case 'Galaxy_Watch':
      return { backgroundColor: '#ede7f6', color: '#6a1b9a', borderColor: '#b39ddb' };
    default:
      return { backgroundColor: '#f5f5f5', color: '#424242', borderColor: '#e0e0e0' };
  }
};

// @param: {void} - No parameters.
// @description: Renders the Dashboard screen with sensor data visualization.
// @returns: {JSX.Element} - The Dashboard screen component.
// @updates: Displays sensor data summary and detailed events table.
const DashboardScreen = () => {
  const [showGroupedView, setShowGroupedView] = useState(false);

  // @param: {void} - No parameters.
  // @description: Groups sensor data by event type for grouped view.
  // @returns: {object} - Grouped sensor data object.
  // @updates: Organizes data for grouped table display.
  const groupedData = mockSensorData.reduce((acc: Record<string, typeof mockSensorData>, record) => {
    if (!acc[record.eventType]) {
      acc[record.eventType] = [];
    }
    acc[record.eventType].push(record);
    return acc;
  }, {} as Record<string, typeof mockSensorData>);

  // @param: {void} - No parameters.
  // @description: Extracts unique timestamps from sensor data.
  // @returns: {array} - Array of unique timestamps.
  // @updates: Provides timeline for grouped view.
  const uniqueTimestamps = Array.from(new Set(mockSensorData.map(record => record.timestamp))).sort();

  // @param: {string} timestamp - The timestamp string to format.
  // @description: Formats timestamp for better readability.
  // @returns: {string} - Formatted timestamp string.
  // @updates: Improves timestamp display in the table.
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // @param: {string} eventType - The event type string.
  // @description: Returns emoji icon for different event types.
  // @returns: {string} - Emoji icon for the event type.
  // @updates: Provides visual icons for event types.
  const getEventIcon = (eventType: string): string => {
    switch (eventType) {
      case 'Heart Rate':
        return '❤️';
      case 'Steps':
        return '👟';
      case 'Heart Rate Variability':
        return '📊';
      case 'Activity Level':
        return '🏃';
      case 'Blood Oxygen':
        return '🫁';
      default:
        return '📱';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text variant="headlineLarge" style={styles.title}>Dashboard</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          View your raw sensor data collected from connected devices
        </Text>

        <View style={styles.summaryRow}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.summaryLabel}>Total Records</Text>
              <Text variant="headlineMedium" style={styles.summaryValue}>{mockSensorData.length}</Text>
              <Text variant="bodySmall" style={styles.summaryDescription}>Data points collected today</Text>
            </Card.Content>
          </Card>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.summaryLabel}>Active Sources</Text>
              <Text variant="headlineMedium" style={styles.summaryValue}>2</Text>
              <Text variant="bodySmall" style={styles.summaryDescription}>Connected devices</Text>
            </Card.Content>
          </Card>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.summaryLabel}>Last Update</Text>
              <Text variant="headlineMedium" style={styles.summaryValue}>2m ago</Text>
              <Text variant="bodySmall" style={styles.summaryDescription}>Most recent data sync</Text>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.tableCard}>
          <Card.Title
            title="Sensor Events"
            titleStyle={styles.cardTitle}
            right={() => (
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Group by Event Type</Text>
                <Switch value={showGroupedView} onValueChange={setShowGroupedView} />
              </View>
            )}
          />
          <Card.Content style={styles.tableContent}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {showGroupedView ? (
                <View style={styles.groupedTable}>
                  {/* Grouped View Header */}
                  <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, styles.eventTypeCell]}>
                      <Text style={styles.headerText}>Event Type</Text>
                    </View>
                    {uniqueTimestamps.map(timestamp => (
                      <View key={timestamp} style={[styles.headerCell, styles.timeCell]}>
                        <Text style={styles.headerText}>{formatTimestamp(timestamp)}</Text>
                      </View>
                    ))}
                  </View>
                  
                  {/* Grouped View Rows */}
                  {Object.entries(groupedData).map(([eventType, records], index) => (
                    <View key={eventType} style={[styles.tableRow, index % 2 === 0 && styles.alternateRow]}>
                      <View style={[styles.cell, styles.eventTypeCell]}>
                        <View style={styles.eventTypeContent}>
                          <Text style={styles.eventIcon}>{getEventIcon(eventType)}</Text>
                          <Text style={styles.eventTypeText}>{eventType}</Text>
                        </View>
                      </View>
                      {uniqueTimestamps.map(timestamp => {
                        const record = records.find(r => r.timestamp === timestamp);
                        return (
                          <View key={timestamp} style={[styles.cell, styles.timeCell, styles.valueCell]}>
                            {record ? (
                              <Text style={styles.valueText}>{record.value}</Text>
                            ) : (
                              <Text style={styles.emptyValue}>-</Text>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.regularTable}>
                  {/* Regular View Header */}
                  <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, styles.timestampCell]}>
                      <Text style={styles.headerText}>Time</Text>
                    </View>
                    <View style={[styles.headerCell, styles.eventTypeCell]}>
                      <Text style={styles.headerText}>Event Type</Text>
                    </View>
                    <View style={[styles.headerCell, styles.valueCell]}>
                      <Text style={styles.headerText}>Value</Text>
                    </View>
                    <View style={[styles.headerCell, styles.sourceCell]}>
                      <Text style={styles.headerText}>Source</Text>
                    </View>
                  </View>
                  
                  {/* Regular View Rows */}
                  {mockSensorData.map((record, index) => {
                    const sourceColors = getSourceBadgeColor(record.source);
                    return (
                      <View key={record.id} style={[styles.tableRow, index % 2 === 0 && styles.alternateRow]}>
                        <View style={[styles.cell, styles.timestampCell]}>
                          <Text style={styles.timestampText}>{formatTimestamp(record.timestamp)}</Text>
                        </View>
                        <View style={[styles.cell, styles.eventTypeCell]}>
                          <View style={styles.eventTypeContent}>
                            <Text style={styles.eventIcon}>{getEventIcon(record.eventType)}</Text>
                            <Text style={styles.eventTypeText}>{record.eventType}</Text>
                          </View>
                        </View>
                        <View style={[styles.cell, styles.valueCell]}>
                          <Text style={styles.valueText}>{record.value}</Text>
                        </View>
                        <View style={[styles.cell, styles.sourceCell]}>
                          <View style={[styles.sourceBadge, { backgroundColor: sourceColors.backgroundColor, borderColor: sourceColors.borderColor }]}>
                            <Text style={[styles.sourceText, { color: sourceColors.color }]}>{record.source}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    borderRadius: 12,
  },
  summaryLabel: {
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    marginVertical: 4,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  summaryDescription: {
    color: '#888',
    fontSize: 12,
  },
  tableCard: {
    marginBottom: 16,
    elevation: 3,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  toggleLabel: {
    marginRight: 8,
    fontSize: 14,
    color: '#666',
  },
  tableContent: {
    padding: 0,
  },
  groupedTable: {
    minWidth: 600,
  },
  regularTable: {
    minWidth: 500,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    minHeight: 50,
  },
  alternateRow: {
    backgroundColor: '#fafafa',
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timestampCell: {
    width: 80,
  },
  eventTypeCell: {
    width: 150,
  },
  valueCell: {
    width: 100,
  },
  sourceCell: {
    width: 120,
  },
  timeCell: {
    width: 100,
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  eventTypeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  eventTypeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  valueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
  },
  emptyValue: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
  sourceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  sourceText: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DashboardScreen;