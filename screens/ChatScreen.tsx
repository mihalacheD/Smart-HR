import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../hooks/useMessages';
import { useThemeColors } from '../hooks/useThemeColor';

import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ThemedText from '../components/ThemedText';
import ThemedContainer from '../components/ThemedContainer';

export default function ChatScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();

  const { messages, sendMessage, loading } = useMessages(user?.uid ?? '');

  return (
    <ThemedContainer style={{ backgroundColor: colors.background, padding: 5 }}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.flex}>
          {loading ? (
            <ThemedText style={{ padding: 16 }}>Loading messages...</ThemedText>
          ) : (
            <MessageList
              messages={messages.map(m => ({
                ...m,
                timestamp: m.timestamp?.toDate
                  ? m.timestamp.toDate()
                  : typeof m.timestamp === 'string' || typeof m.timestamp === 'number' || m.timestamp instanceof Date
                  ? new Date(m.timestamp)
                  : null,
              }))}
              currentUserId={user?.uid ?? ''}
            />

          )}
        </View>

        <MessageInput onSend={(text: string) => sendMessage(user?.uid ?? '', text)} />
      </KeyboardAvoidingView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
