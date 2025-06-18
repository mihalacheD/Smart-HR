// components/ThemedText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

export default function ThemedText(props: TextProps) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return <Text {...props} style={[{ color: colors.textSecondary, marginBottom: 7 }, props.style]} />;
}
