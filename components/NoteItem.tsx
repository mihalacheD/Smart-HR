import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { useThemeColors } from '../hooks/useThemeColor';

interface Props {
  note: string;
}

export default function NoteItem({ note }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <ThemedText>{note}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
