import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { darkColors, lightColors } from './constants/colors';
import RootNavigator from './navigator/RootNavigator';



export default function App() {
  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <AppWithTheme />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function AppWithTheme() {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} backgroundColor={colors.background} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
