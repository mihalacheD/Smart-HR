// ThemedContainer.tsx
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

export default function ThemedContainer({ style, ...props }: ViewProps) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;
  return <View style={[styles.container, { backgroundColor: colors.background }, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
