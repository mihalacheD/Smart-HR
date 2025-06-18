import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import typography from '../constants/typography';

type ButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ onPress, title, disabled = false, style }: ButtonProps) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.accent }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: colors.card }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: typography.fontSize.base,
  },
});
