import React, { useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../hooks/useMessages';
import { useThemeColors } from '../hooks/useThemeColor';
import { markMessagesAsRead } from '../utils/markMessagesAsRead';

import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import ThemedText from '../components/ThemedText';
import ThemedContainer from '../components/ThemedContainer';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { isDemoUser } from '../utils/isDemoUser';
import { showDemoAlert } from '../utils/showDemoAlert';

function parseTimestamp(timestamp: any): Date | null {
  if (timestamp?.toDate) return timestamp.toDate();
  if (
    typeof timestamp === 'string' ||
    typeof timestamp === 'number' ||
    timestamp instanceof Date
  ) {
    return new Date(timestamp);
  }
  return null;
}

export default function ChatScreen() {
  const { user, role } = useAuth();
  const colors = useThemeColors();

  const { messages, sendMessage, loading } = useMessages(user?.uid ?? '');

  useEffect(() => {
    if (user?.uid && messages.length) {
      const hasUnread = messages.some(msg => !msg.readBy?.includes(user.uid));
      if (hasUnread) {
        markMessagesAsRead(messages, user.uid);
      }
    }
  }, [messages, user]);

  // Functia pentru toggle important - doar HR poate folosi
  async function toggleImportant(messageId: string, isImportant: boolean) {
    if (role !== 'hr') return; // doar HR poate schimba

    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
      important: !isImportant,
    });
  }

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
                timestamp: parseTimestamp(m.timestamp),
              }))}
              currentUserId={user?.uid ?? ''}
              toggleImportant={toggleImportant}
              role={role}
            />
          )}
        </View>

        <MessageInput
          onSend={(text: string) => {
            if (isDemoUser(role)) {
              showDemoAlert();
              return;
            }
            sendMessage(user?.uid ?? '', text);
          }}
        />

      </KeyboardAvoidingView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
