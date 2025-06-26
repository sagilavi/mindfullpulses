import React from 'react';
import { View, Text } from 'react-native';

// @param: {void} - No parameters.
// @description: Renders the Dashboard screen placeholder.
// @returns: {JSX.Element} - The Dashboard screen component.
// @updates: Displays dashboard content (to be implemented).
const DashboardScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Dashboard</Text>
    <Text style={{ marginTop: 8 }}>Sensor data and analytics coming soon.</Text>
  </View>
);

export default DashboardScreen; 