import React, { useState } from 'react';
import { TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColor';
import Button from './Button';

interface Props {
  onAdd: (note: string) => void;
}

export default function AddNoteForm({ onAdd }: Props) {
  const colors = useThemeColors();
  const [noteItem, setNoteItem] = useState('');

  const handleSubmit = () => {
    if (!noteItem.trim()) return;
    onAdd(noteItem);
    setNoteItem('');
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      style={styles.container}
    >
      <TextInput
        value={noteItem}
        onChangeText={setNoteItem}
        placeholder="Write a note..."
        placeholderTextColor="#999"
        multiline
        style={[styles.input, { color: colors.textPrimary, borderColor: colors.border, textAlignVertical: 'top' }]}
      />
      <Button title="Add" onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
  },
});
