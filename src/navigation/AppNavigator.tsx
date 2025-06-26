import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from '../screens/IndexScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EmotionsScreen from '../screens/EmotionsScreen';
import UserScreen from '../screens/UserScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

export type RootStackParamList = {
  Index: undefined;
  Dashboard: undefined;
  Emotions: undefined;
  User: undefined;
  Settings: undefined;
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={IndexScreen} options={{ title: 'Wellness Journal' }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Emotions" component={EmotionsScreen} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: '404 Not Found' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 