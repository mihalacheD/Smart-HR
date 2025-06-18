import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';
import typography from '../constants/typography';
import Button from './Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type CardProps = {
  title: string;
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  children: React.ReactNode;
  buttonText?: string;
  onButtonPress?: () => void;
};

export default function Card({ title, iconName, children, buttonText, onButtonPress }: CardProps) {
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <View style={[styles.card, {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderLeftColor: colors.accent,
      borderLeftWidth: 6,
    }]}>
      <View style={styles.header}>
        {iconName && <MaterialCommunityIcons name={iconName} size={30} color={colors.textPrimary} style={{ marginRight: 8 }} />}
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      </View>

      <View style={styles.content}>{children}</View>

      {buttonText && onButtonPress && (
        <Button title={buttonText} onPress={onButtonPress} style={{ marginTop: 12 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
  },
  content: {
    marginBottom: 12,
    lineHeight: 22,
  },
});
