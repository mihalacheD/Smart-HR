import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import PayslipScreen from './screens/PayslipScreen';
import RequestsScreen from './screens/RequestScreen';
import HRBotScreen from './screens/HRBotScreen';

import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { lightColors, darkColors } from './constants/colors';
import typography from './constants/typography';



const Tab = createBottomTabNavigator();

const MainApp = () => {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home" screenOptions={{
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarLabelStyle: {
              fontSize: typography.fontSize.sm,
              fontWeight: 'medium'
            },
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              borderTopWidth: 0.5,
              height: 65,
              paddingBottom: 8,
              paddingTop: 6,
              elevation: 4,
            },
            headerShown: false,
          }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Payslip" component={PayslipScreen} options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="document-text-outline" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="Requests" component={RequestsScreen} options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" color={color} size={size} />
              ),
            }} />
            <Tab.Screen name="HR Bot" component={HRBotScreen} options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="help-circle-outline" color={color} size={size} />
              ),
            }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}


