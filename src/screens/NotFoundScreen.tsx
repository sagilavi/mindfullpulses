import React from 'react';
import { View, Text } from 'react-native';

// @param: {void} - No parameters.
// @description: Renders the NotFound (404) screen placeholder.
// @returns: {JSX.Element} - The NotFound screen component.
// @updates: Displays a 404 not found message.
const NotFoundScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
    <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 12 }}>404</Text>
    <Text style={{ fontSize: 18, color: '#6b7280', marginBottom: 8 }}>Oops! Page not found</Text>
    <Text style={{ color: '#2563eb', textDecorationLine: 'underline' }}>Return to Home</Text>
  </View>
);

export default NotFoundScreen; 