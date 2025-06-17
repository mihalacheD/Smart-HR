import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import PayslipScreen from './screens/PayslipScreen';
import RequestsScreen from './screens/RequestScreen';
import HRBotScreen from './screens/HRBotScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Fluturași" component={PayslipScreen} />
        <Tab.Screen name="Cereri" component={RequestsScreen} />
        <Tab.Screen name="HR Bot" component={HRBotScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


