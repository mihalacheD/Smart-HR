import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../types/navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from '../hooks/useThemeColor';
import typography from '../constants/typography';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import PayslipScreen from '../screens/PayslipScreen';
import RequestsScreen from '../screens/RequestScreen';
import { useAuth } from '../context/AuthContext';
import EmployeesScreen from '../screens/EmployeesScreen';
import { useUnreadMessagesCount } from '../hooks/useUnreadMessagesCount';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function MainTabs() {

  const { role, user } = useAuth();
  const colors = useThemeColors();
  const unreadCount = useUnreadMessagesCount(user?.uid ?? null);

  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={({ route }) => (
        {
          tabBarBadge: route.name === 'Chat' && unreadCount > 0 ? unreadCount : undefined,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: typography.fontSize.sm,
            fontWeight: '500',
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
        })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payslip"
        component={PayslipScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-edit" size={size} color={color} />
          ),
        }}
      />
      {(role === 'employee' || role === 'demo-employee') &&(
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-month" size={size} color={color} />
            ),
          }}
        />
      )}

      {(role === 'hr' || role === 'demo-hr') && (
        <Tab.Screen
          name="Employees"
          component={EmployeesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" size={size} color={color} />
            ),
          }}
        />
      )}

    </Tab.Navigator>
  );
}
