import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ThemedText from './ThemedText';
import { useThemeColors } from '../hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  note: string;
  onDelete: () => void;
}

export default function NoteItem({ note, onDelete }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
      <ThemedText style={{ flex: 1 }}>{note}</ThemedText>
      <TouchableOpacity onPress={onDelete} style={{ marginLeft: 10 }}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
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
