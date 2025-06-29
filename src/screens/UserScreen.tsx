import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Text, Button, TextInput, Avatar, ProgressBar, Divider, Chip } from 'react-native-paper';

// @param: {void} - No parameters.
// @description: Renders the user's profile screen with personal info, devices, wellness score, stats, and achievements.
// @returns: {JSX.Element} - The complete User/Profile screen.
// @updates: Displays and allows editing of user profile and wellness data.
const UserScreen: React.FC = () => {
  // Mock user state
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [age, setAge] = useState('28');
  const [timezone, setTimezone] = useState('UTC-8 (PST)');
  const [goals, setGoals] = useState('I want to better understand my emotional patterns and improve my overall mental wellbeing.');
  const [avatarUri, setAvatarUri] = useState('');

  // Mock device connection state
  const devices = [
    { name: 'iPhone Health App', icon: 'cellphone', desc: 'Steps, Heart Rate, Activity', connected: true, emoji: '📱' },
    { name: 'Apple Watch', icon: 'watch', desc: 'Advanced metrics, HRV', connected: true, emoji: '⌚' },
    { name: 'Oura Ring', icon: 'ring', desc: 'Sleep, Recovery, Readiness', connected: false, emoji: '💍' },
  ];

  // Mock wellness score and stats
  const wellnessScore = 78;
  const stats = [
    { label: '😊 Happy Hours', value: '42' },
    { label: '📊 Data Points', value: '1,247' },
    { label: '🎯 Goals Met', value: '5/7' },
    { label: '📱 Active Days', value: '7/7' },
  ];
  const achievements = [
    { emoji: '🏆', title: 'Week Warrior', desc: '7 days of consistent data', color: '#fffde7' },
    { emoji: '📈', title: 'Insight Explorer', desc: 'Viewed emotion timeline', color: '#e3f2fd' },
    { emoji: '🎯', title: 'Goal Setter', desc: 'Defined wellness goals', color: '#e8f5e9' },
  ];

  // @param: {void} - No parameters.
  // @description: Handles the save action for profile changes (mock only).
  // @returns: {Promise<void>} - Resolves after a short delay.
  // @updates: Would update user profile in a real app.
  const handleSave = async () => {
    return new Promise<void>(resolve => setTimeout(resolve, 500));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ padding: 16 }}>
        <Text variant="headlineLarge" style={{ fontWeight: 'bold', marginBottom: 4 }}>Profile</Text>
        <Text variant="bodyMedium" style={{ color: '#666', marginBottom: 16 }}>
          Manage your wellness journey and personal information
        </Text>
        <View style={{ flexDirection: 'column', gap: 16 }}>
          {/* Personal Information Card */}
          <Card style={styles.card}>
            <Card.Title title="Personal Information" subtitle="Update your profile details and preferences" />
            <Card.Content>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Avatar.Text size={64} label={firstName[0] + lastName[0]} style={{ marginRight: 16 }} />
                <View>
                  <Button mode="outlined" compact onPress={() => {}}>Change Photo</Button>
                  <Text style={{ fontSize: 12, color: '#888', marginTop: 4 }}>JPG, PNG up to 2MB</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TextInput
                  label="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  style={{ flex: 1 }}
                  mode="outlined"
                />
                <TextInput
                  label="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  style={{ flex: 1 }}
                  mode="outlined"
                />
              </View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={{ marginTop: 8 }}
                mode="outlined"
                keyboardType="email-address"
              />
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                <TextInput
                  label="Age"
                  value={age}
                  onChangeText={setAge}
                  style={{ flex: 1 }}
                  mode="outlined"
                  keyboardType="numeric"
                />
                <TextInput
                  label="Timezone"
                  value={timezone}
                  onChangeText={setTimezone}
                  style={{ flex: 1 }}
                  mode="outlined"
                />
              </View>
              <TextInput
                label="Wellness Goals"
                value={goals}
                onChangeText={setGoals}
                style={{ marginTop: 8 }}
                mode="outlined"
                multiline
                numberOfLines={3}
              />
              <Button mode="contained" style={{ marginTop: 16 }} onPress={handleSave}>Save Changes</Button>
            </Card.Content>
          </Card>

          {/* Connected Devices Card */}
          <Card style={styles.card}>
            <Card.Title title="Connected Devices" subtitle="Manage your connected health devices and data sources" />
            <Card.Content>
              {devices.map((device, idx) => (
                <View key={device.name} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 8, opacity: device.connected ? 1 : 0.5 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24, marginRight: 12 }}>{device.emoji}</Text>
                    <View>
                      <Text style={{ fontWeight: 'bold' }}>{device.name}</Text>
                      <Text style={{ fontSize: 12, color: '#888' }}>{device.desc}</Text>
                    </View>
                  </View>
                  {device.connected ? (
                    <Chip style={{ backgroundColor: '#e8f5e9' }} textStyle={{ color: '#388e3c', fontWeight: 'bold' }}>Connected</Chip>
                  ) : (
                    <Button mode="outlined" compact>Connect</Button>
                  )}
                </View>
              ))}
              <Button mode="outlined" style={{ marginTop: 4 }}>+ Add New Device</Button>
            </Card.Content>
          </Card>

          {/* Wellness Score Card */}
          <Card style={styles.card}>
            <Card.Title title="Wellness Score" subtitle="Based on your recent data" />
            <Card.Content>
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#388e3c' }}>{wellnessScore}</Text>
                <Text style={{ fontSize: 12, color: '#888' }}>out of 100</Text>
              </View>
              <ProgressBar progress={wellnessScore / 100} color="#388e3c" style={{ height: 10, borderRadius: 8, marginBottom: 8 }} />
              <View style={{ marginBottom: 4 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Emotional Balance</Text>
                  <Text style={{ fontWeight: 'bold' }}>Good</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Activity Level</Text>
                  <Text style={{ fontWeight: 'bold' }}>Moderate</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Data Consistency</Text>
                  <Text style={{ fontWeight: 'bold' }}>Excellent</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Weekly Stats Card */}
          <Card style={styles.card}>
            <Card.Title title="Weekly Stats" />
            <Card.Content>
              {stats.map(stat => (
                <View key={stat.label} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 14 }}>{stat.label}</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{stat.value}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Achievements Card */}
          <Card style={styles.card}>
            <Card.Title title="Achievements" />
            <Card.Content>
              {achievements.map((ach, idx) => (
                <View key={ach.title} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: ach.color, borderRadius: 8, padding: 8, marginBottom: 6 }}>
                  <Text style={{ fontSize: 24, marginRight: 12 }}>{ach.emoji}</Text>
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{ach.title}</Text>
                    <Text style={{ fontSize: 12, color: '#888' }}>{ach.desc}</Text>
                  </View>
                </View>
              ))}
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

export default UserScreen; 