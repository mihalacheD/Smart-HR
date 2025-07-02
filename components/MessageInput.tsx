import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors } from '../hooks/useThemeColor';


interface Props {
  onSend: (text: string) => void | Promise<void>;
}


export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('');
  const colors = useThemeColors();

  const handleSend = () => {
    if (!text.trim()) return;
    Keyboard.dismiss(); // închide tastatura
    onSend(text); // trimite mesajul
    setText('')
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={[styles.container, { borderColor: colors.border }]}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          textAlignVertical="top"
          multiline
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { color: colors.textPrimary }]}
        />
        <Pressable onPress={handleSend} style={styles.iconButton}>
          <Ionicons name="send" size={24} color={colors.primary} />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 120,
    minHeight: 40,
  },
  iconButton: {
    marginLeft: 8,
    padding: 6,
  },
});