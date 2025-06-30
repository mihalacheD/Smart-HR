// components/TitleHeader.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { useThemeColors } from '../hooks/useThemeColor';

export default function TitleHeader({ title }: { title: string }) {
  const colors = useThemeColors();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 16,
  },
});
