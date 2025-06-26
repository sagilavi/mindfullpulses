import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

// @param: {NativeStackScreenProps<RootStackParamList, 'Index'>} props - Navigation props.
// @description: Renders the Index (home) screen with buttons to all screens for testing.
// @returns: {JSX.Element} - The Index screen component.
// @updates: Navigates to all screens on button press.
const IndexScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Index'>) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Wellness Journal</Text>
    <Text style={{ fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
      Understand your emotional patterns through passive sensor data collection. No manual input required - just insights into your daily well-being.
    </Text>
    <Button title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
    <View style={{ height: 12 }} />
    <Button title="Emotions" onPress={() => navigation.navigate('Emotions')} />
    <View style={{ height: 12 }} />
    <Button title="Profile" onPress={() => navigation.navigate('User')} />
    <View style={{ height: 12 }} />
    <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    <View style={{ height: 12 }} />
    <Button title="Not Found (404)" onPress={() => navigation.navigate('NotFound')} />
  </View>
);

export default IndexScreen; 