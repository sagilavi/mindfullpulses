import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IndexScreen from '../screens/IndexScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EmotionsScreen from '../screens/EmotionsScreen';
import UserScreen from '../screens/UserScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

const Tab = createMaterialTopTabNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Index" component={IndexScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Emotions" component={EmotionsScreen} />
      <Tab.Screen name="Profile" component={UserScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="NotFound" component={NotFoundScreen} options={{ title: '404' }} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 