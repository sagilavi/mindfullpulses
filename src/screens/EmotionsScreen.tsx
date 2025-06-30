import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import DataCollectionToggle from '../components/DataCollectionToggle';

// Emotion configuration
const emotions = {
  happiness: { emoji: '😊', color: '#FFD700', name: 'Happiness' },
  sadness: { emoji: '😢', color: '#4682B4', name: 'Sadness' },
  anger: { emoji: '😡', color: '#DC143C', name: 'Anger' },
  fear: { emoji: '😨', color: '#808080', name: 'Fear' },
  disgust: { emoji: '🤢', color: '#3CB371', name: 'Disgust' },
  surprise: { emoji: '😲', color: '#FFA500', name: 'Surprise' },
};

// Mock emotion data for different time periods
const mockDailyData = [
  { time: '6 AM', happiness: 0.2, sadness: 0.5, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.1 },
  { time: '7 AM', happiness: 0.3, sadness: 0.4, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.1 },
  { time: '8 AM', happiness: 0.7, sadness: 0.1, anger: 0.1, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: '9 AM', happiness: 0.8, sadness: 0.1, anger: 0.0, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: '10 AM', happiness: 0.6, sadness: 0.1, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.1 },
  { time: '11 AM', happiness: 0.5, sadness: 0.1, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.2 },
  { time: '12 PM', happiness: 0.9, sadness: 0.0, anger: 0.0, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: '1 PM', happiness: 0.7, sadness: 0.1, anger: 0.1, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: '2 PM', happiness: 0.3, sadness: 0.1, anger: 0.5, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: '3 PM', happiness: 0.2, sadness: 0.1, anger: 0.6, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: '4 PM', happiness: 0.2, sadness: 0.1, anger: 0.1, fear: 0.5, disgust: 0.0, surprise: 0.1 },
  { time: '5 PM', happiness: 0.3, sadness: 0.4, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.1 },
];

const mockWeeklyData = [
  { time: 'Mon', happiness: 0.6, sadness: 0.2, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Tue', happiness: 0.7, sadness: 0.1, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Wed', happiness: 0.5, sadness: 0.2, anger: 0.2, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Thu', happiness: 0.8, sadness: 0.1, anger: 0.0, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Fri', happiness: 0.9, sadness: 0.0, anger: 0.0, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: 'Sat', happiness: 0.8, sadness: 0.1, anger: 0.0, fear: 0.0, disgust: 0.0, surprise: 0.1 },
  { time: 'Sun', happiness: 0.7, sadness: 0.1, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.0 },
];

const mockMonthlyData = [
  { time: 'Week 1', happiness: 0.6, sadness: 0.2, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Week 2', happiness: 0.7, sadness: 0.1, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Week 3', happiness: 0.5, sadness: 0.3, anger: 0.1, fear: 0.1, disgust: 0.0, surprise: 0.0 },
  { time: 'Week 4', happiness: 0.8, sadness: 0.1, anger: 0.0, fear: 0.1, disgust: 0.0, surprise: 0.0 },
];

const chartLabels = mockDailyData.map(d => d.time);

const emotionKeys = Object.keys(emotions); // This is fine as string[] for Object.keys

// This line needs correction for 'key' type
const chartDatasets = emotionKeys.map((key) => {
  const emotionKey = key as keyof typeof emotions;
  return {
    data: mockDailyData.map(d => Number(d[emotionKey as keyof typeof mockDailyData[0]]) || 0),
    color: () => emotions[emotionKey].color,
    strokeWidth: 2,
    withDots: false,
  };
});

// For chartLegend as well:
const chartLegend = emotionKeys.map(key => emotions[key as keyof typeof emotions].name);

// @param: {void} - No parameters.
// @description: Renders the Emotions screen with a custom chart and summary.
// @returns: {JSX.Element} - The Emotions screen component.
// @updates: Displays emotion data and summary for the selected period.
const EmotionsScreen: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCurrentData = () => {
    switch (timePeriod) {
      case 'weekly':
        return mockWeeklyData;
      case 'monthly':
        return mockMonthlyData;
      default:
        return mockDailyData;
    }
  };
  const currentData = getCurrentData();

  // Calculate emotion summary from current data
  const emotionSummary = Object.keys(emotions).map(emotionKey => {
    const totalIntensity = currentData.reduce((sum, dataPoint) =>
      sum + (dataPoint[emotionKey as keyof typeof dataPoint] as number || 0), 0
    );
    const averageIntensity = totalIntensity / currentData.length;
    const percentage = Math.round(averageIntensity * 100);
    return {
      emotion: emotionKey,
      percentage,
      averageIntensity
    };
  }).filter(item => item.percentage > 0).sort((a, b) => b.percentage - a.percentage);

  const getTimePeriodLabel = () => {
    switch (timePeriod) {
      case 'weekly':
        return 'Weekly';
      case 'monthly':
        return 'Monthly';
      default:
        return 'Daily';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>Emotional Timeline</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Visualize your emotional patterns throughout different time periods
        </Text>
        
        {/* Data Collection Toggle */}
        <Card style={styles.toggleCard}>
          <Card.Content>
            <View style={styles.toggleContainer}>
              <Text variant="titleMedium" style={styles.toggleTitle}>
                Data Collection
              </Text>
              <DataCollectionToggle 
                size="large" 
                variant="contained" 
                showStatus={true}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Content>
            <View style={styles.chartHeader}>
              <Text variant="titleMedium" style={styles.chartTitle}>
                {getTimePeriodLabel()} Emotion Graph
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={timePeriod}
                  style={styles.picker}
                  onValueChange={(itemValue: 'daily' | 'weekly' | 'monthly') => setTimePeriod(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="Daily" value="daily" />
                  <Picker.Item label="Weekly" value="weekly" />
                  <Picker.Item label="Monthly" value="monthly" />
                </Picker>
              </View>
              <Text
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                {selectedDate.toLocaleDateString()}
              </Text>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    setShowDatePicker(false);
                    if (date) setSelectedDate(date);
                  }}
                />
              )}
            </View>
            <Divider style={styles.divider} />
            {/* Simple custom chart: lines for each emotion, dots for values */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={{
                  labels: chartLabels,
                  datasets: chartDatasets,
                  legend: chartLegend,
                }}
                width={Math.max(chartLabels.length * 60, Dimensions.get('window').width - 32)}
                height={220}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
                  propsForDots: {
                    r: '2',
                    strokeWidth: '1',
                    stroke: '#fff',
                  },
                  propsForBackgroundLines: {
                    stroke: '#eee',
                  },
                }}
                bezier
                style={styles.chart}
                fromZero
                withShadow={false}
                withDots={false}
                withInnerLines={true}
                withOuterLines={true}
                segments={5}
              />
            </ScrollView>
            <View style={styles.legendContainer}>
              {Object.entries(emotions).map(([key, emotion]) => (
                <View key={key} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: emotion.color }]} />
                  <Text style={styles.legendText}>{emotion.emoji} {emotion.name}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
        
        <View style={styles.summaryContainer}>
          <Card style={styles.summaryCard}>
            <Card.Title title={`${getTimePeriodLabel()} Summary`} subtitle={`Average emotion intensity for ${selectedDate.toLocaleDateString()}`} />
            <Card.Content>
              {emotionSummary.map(({ emotion, percentage }) => (
                <View key={emotion} style={styles.summaryItem}>
                  <View style={styles.summaryLeft}>
                    <Text style={styles.summaryEmoji}>{emotions[emotion as keyof typeof emotions].emoji}</Text>
                    <View>
                      <Text style={styles.summaryName}>{emotions[emotion as keyof typeof emotions].name}</Text>
                      <Text style={styles.summaryLabel}>Average intensity</Text>
                    </View>
                  </View>
                  <Text style={styles.summaryPercentage}>{percentage}%</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
          <Card style={styles.summaryCard}>
            <Card.Title title="Insights" />
            <Card.Content>
              {timePeriod === 'daily' && (
                <>
                  <View style={styles.insightBoxYellow}>
                    <Text style={styles.insightTextYellow}>🌟 Peak happiness detected around noon</Text>
                  </View>
                  <View style={styles.insightBoxBlue}>
                    <Text style={styles.insightTextBlue}>💡 Consider morning meditation for early sadness</Text>
                  </View>
                </>
              )}
              {timePeriod === 'weekly' && (
                <View style={styles.insightBoxGreen}>
                  <Text style={styles.insightTextGreen}>🎉 Weekends show consistently high happiness levels</Text>
                </View>
              )}
              {timePeriod === 'monthly' && (
                <View style={styles.insightBoxPurple}>
                  <Text style={styles.insightTextPurple}>📈 Overall emotional stability improving over time</Text>
                </View>
              )}
              <View style={styles.insightBoxGreen}>
                <Text style={styles.insightTextGreen}>✅ Good emotional variety throughout the period</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  toggleCard: {
    marginBottom: 16,
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  chartCard: {
    marginBottom: 16,
  },
  chartHeader: {
    marginBottom: 8,
  },
  chartTitle: {
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    fontWeight: 'bold',
    color: '#000',
  },
  dateButton: {
    borderWidth: 2,
    borderColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#e3f2fd',
    marginBottom: 8,
    textAlign: 'center',
    overflow: 'hidden',
  },
  divider: {
    marginVertical: 12,
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 13,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    minWidth: 180,
    margin: 4,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  summaryName: {
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#888',
  },
  summaryPercentage: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  insightBoxYellow: {
    backgroundColor: '#fffde7',
    borderColor: '#ffe082',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  insightTextYellow: {
    color: '#fbc02d',
    fontSize: 13,
    fontWeight: 'bold',
  },
  insightBoxBlue: {
    backgroundColor: '#e3f2fd',
    borderColor: '#90caf9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  insightTextBlue: {
    color: '#1976d2',
    fontSize: 13,
    fontWeight: 'bold',
  },
  insightBoxGreen: {
    backgroundColor: '#e8f5e9',
    borderColor: '#a5d6a7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  insightTextGreen: {
    color: '#388e3c',
    fontSize: 13,
    fontWeight: 'bold',
  },
  insightBoxPurple: {
    backgroundColor: '#ede7f6',
    borderColor: '#b39ddb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  insightTextPurple: {
    color: '#6a1b9a',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default EmotionsScreen; 