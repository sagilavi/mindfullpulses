import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, Switch, Divider, RadioButton, List, IconButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';

// @param: {void} - No parameters.
// @description: Renders the settings screen with all app and data preferences.
// @returns: {JSX.Element} - The complete Settings screen.
// @updates: Allows the user to configure app, data, and privacy settings.
const SettingsScreen: React.FC = () => {
  // Data Collection
  const [heartRate, setHeartRate] = useState(true);
  const [steps, setSteps] = useState(true);
  const [sleep, setSleep] = useState(false);
  const [hrv, setHrv] = useState(true);
  const [collectionFreq, setCollectionFreq] = useState('normal');

  // Privacy & Security
  const [offlineOnly, setOfflineOnly] = useState(true);
  const [anonymize, setAnonymize] = useState(true);
  const [backup, setBackup] = useState(false);
  const [retention, setRetention] = useState(90);

  // Emotion Analysis
  const [sensitivity, setSensitivity] = useState(75);
  const [notifications, setNotifications] = useState(true);
  const [suggestions, setSuggestions] = useState(true);
  const [confidence, setConfidence] = useState('medium');

  // App Preferences
  const [theme, setTheme] = useState('light');
  const [defaultView, setDefaultView] = useState('dashboard');
  const [haptic, setHaptic] = useState(true);

  // @param: {void} - No parameters.
  // @description: Handles export data action (mock only).
  // @returns: {Promise<void>} - Resolves after a short delay.
  // @updates: Would export user data in a real app.
  const handleExport = async () => new Promise<void>(resolve => setTimeout(resolve, 500));

  // @param: {void} - No parameters.
  // @description: Handles import data action (mock only).
  // @returns: {Promise<void>} - Resolves after a short delay.
  // @updates: Would import user data in a real app.
  const handleImport = async () => new Promise<void>(resolve => setTimeout(resolve, 500));

  // @param: {void} - No parameters.
  // @description: Handles reset settings action (mock only).
  // @returns: {Promise<void>} - Resolves after a short delay.
  // @updates: Would reset all settings in a real app.
  const handleReset = async () => new Promise<void>(resolve => setTimeout(resolve, 500));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 16 }}>
        <Text variant="headlineLarge" style={{ fontWeight: 'bold', marginBottom: 4 }}>Settings</Text>
        <Text variant="bodyMedium" style={{ color: '#666', marginBottom: 16 }}>
          Configure your app preferences and data collection settings
        </Text>
        <View style={{ flexDirection: 'column', gap: 16 }}>
          {/* Data Collection Card */}
          <Card style={styles.card}>
            <Card.Title title="Data Collection" subtitle="Configure which types of sensor data to collect" />
            <Card.Content>
              <List.Item
                title="Heart Rate Monitoring"
                description="Continuous heart rate data collection"
                right={() => (
                  <Switch value={heartRate} onValueChange={setHeartRate} />
                )}
              />
              <List.Item
                title="Step Counting"
                description="Track daily movement and activity"
                right={() => (
                  <Switch value={steps} onValueChange={setSteps} />
                )}
              />
              <List.Item
                title="Sleep Tracking"
                description="Monitor sleep patterns and quality"
                right={() => (
                  <Switch value={sleep} onValueChange={setSleep} />
                )}
              />
              <List.Item
                title="Heart Rate Variability"
                description="Advanced HRV analysis for stress"
                right={() => (
                  <Switch value={hrv} onValueChange={setHrv} />
                )}
              />
              <Divider style={{ marginVertical: 12 }} />
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Data Collection Frequency</Text>
              <RadioButton.Group onValueChange={setCollectionFreq} value={collectionFreq}>
                <RadioButton.Item label="Low (Every 15 minutes)" value="low" />
                <RadioButton.Item label="Normal (Every 5 minutes)" value="normal" />
                <RadioButton.Item label="High (Every minute)" value="high" />
              </RadioButton.Group>
              <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Higher frequency uses more battery</Text>
            </Card.Content>
          </Card>

          {/* Privacy & Security Card */}
          <Card style={styles.card}>
            <Card.Title title="Privacy & Security" subtitle="Control how your data is stored and processed" />
            <Card.Content>
              <List.Item
                title="Offline-Only Mode"
                description="Keep all data on your device"
                right={() => (
                  <Switch value={offlineOnly} onValueChange={setOfflineOnly} />
                )}
              />
              <List.Item
                title="Anonymize Data"
                description="Remove personal identifiers"
                right={() => (
                  <Switch value={anonymize} onValueChange={setAnonymize} />
                )}
              />
              <List.Item
                title="Local Backups"
                description="Create encrypted local backups"
                right={() => (
                  <Switch value={backup} onValueChange={setBackup} />
                )}
              />
              <Divider style={{ marginVertical: 12 }} />
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Data Retention Period</Text>
              <Slider
                value={retention}
                onValueChange={setRetention}
                minimumValue={7}
                maximumValue={365}
                step={7}
                style={{ width: '100%', marginBottom: 4 }}
                minimumTrackTintColor="#1976d2"
                maximumTrackTintColor="#eee"
                thumbTintColor="#1976d2"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 12, color: '#888' }}>7 days</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1976d2' }}>{retention} days</Text>
                <Text style={{ fontSize: 12, color: '#888' }}>1 year</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Emotion Analysis Card */}
          <Card style={styles.card}>
            <Card.Title title="Emotion Analysis" subtitle="Customize emotion detection and insights" />
            <Card.Content>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Analysis Sensitivity</Text>
              <Slider
                value={sensitivity}
                onValueChange={setSensitivity}
                minimumValue={0}
                maximumValue={100}
                step={5}
                style={{ width: '100%', marginBottom: 4 }}
                minimumTrackTintColor="#388e3c"
                maximumTrackTintColor="#eee"
                thumbTintColor="#388e3c"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 12, color: '#888' }}>Conservative</Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#388e3c' }}>Balanced</Text>
                <Text style={{ fontSize: 12, color: '#888' }}>Sensitive</Text>
              </View>
              <List.Item
                title="Insight Notifications"
                description="Get notified about patterns"
                right={() => (
                  <Switch value={notifications} onValueChange={setNotifications} />
                )}
              />
              <List.Item
                title="Wellness Suggestions"
                description="Receive personalized tips"
                right={() => (
                  <Switch value={suggestions} onValueChange={setSuggestions} />
                )}
              />
              <Divider style={{ marginVertical: 12 }} />
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Minimum Confidence Level</Text>
              <RadioButton.Group onValueChange={setConfidence} value={confidence}>
                <RadioButton.Item label="Low (50%)" value="low" />
                <RadioButton.Item label="Medium (70%)" value="medium" />
                <RadioButton.Item label="High (90%)" value="high" />
              </RadioButton.Group>
              <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Only show insights above this confidence threshold</Text>
            </Card.Content>
          </Card>

          {/* App Preferences Card */}
          <Card style={styles.card}>
            <Card.Title title="App Preferences" subtitle="General application settings" />
            <Card.Content>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Theme</Text>
              <RadioButton.Group onValueChange={setTheme} value={theme}>
                <RadioButton.Item label="Light" value="light" />
                <RadioButton.Item label="Dark" value="dark" />
                <RadioButton.Item label="Auto" value="auto" />
              </RadioButton.Group>
              <Text style={{ fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Default View</Text>
              <RadioButton.Group onValueChange={setDefaultView} value={defaultView}>
                <RadioButton.Item label="Dashboard" value="dashboard" />
                <RadioButton.Item label="Emotions" value="emotions" />
                <RadioButton.Item label="Profile" value="profile" />
              </RadioButton.Group>
              <List.Item
                title="Haptic Feedback"
                description="Vibrate on interactions"
                right={() => (
                  <Switch value={haptic} onValueChange={setHaptic} />
                )}
              />
              <Divider style={{ marginVertical: 12 }} />
              <Button mode="outlined" style={{ marginBottom: 8 }} onPress={handleExport}>Export Data</Button>
              <Button mode="outlined" style={{ marginBottom: 8 }} onPress={handleImport}>Import Data</Button>
              <Button mode="contained-tonal" buttonColor="#ff5252" textColor="#fff" onPress={handleReset}>Reset All Settings</Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen; 