import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { darkColors, lightColors } from './constants/colors';
import MainTabs from './MainTabs';



export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppWithTheme />
      </AuthProvider>
    </ThemeProvider>
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
          <MainTabs />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
