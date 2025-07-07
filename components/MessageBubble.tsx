import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColor';
import { formatTimeLabel } from '../utils/formatDate';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  text: string;
  senderName?: string;
  timestamp?: any;
  isOwnMessage: boolean;
  important?: boolean;
  messageId: string;
  toggleImportant?: (messageId: string, isImportant: boolean) => void;
  role?: string;
}

export default function MessageBubble({
  text,
  isOwnMessage,
  timestamp,
  senderName,
  important,
  messageId,
  toggleImportant,
  role,
}: Props) {
  const colors = useThemeColors();
  const time = timestamp instanceof Date ? timestamp : timestamp?.toDate?.() ?? new Date();
  const timeStr = formatTimeLabel(time);

  const onToggleImportant = () => {
    if (toggleImportant) {
      toggleImportant(messageId, !!important);
    }
  };

  return (
    <View style={[styles.container, isOwnMessage ? styles.ownContainer : styles.otherContainer]}>
      {!isOwnMessage && senderName && (
        <Text style={[styles.sender, { color: colors.textSecondary }]}>{senderName}</Text>
      )}

      {important && (
        <View style={styles.importantBadge}>
          <Ionicons name="alert-circle" size={16} color="red" />
          <Text style={styles.importantText}>Important</Text>
        </View>
      )}

      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isOwnMessage ? colors.accentChat : colors.card,
            alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <Text style={[styles.text, { color: colors.textPrimary }]}>{text}</Text>
        <Text style={[styles.time, { color: colors.textSecondary }]}>{timeStr}</Text>


        {isOwnMessage && (role === 'hr' || role === 'demo-hr') && (
          <TouchableOpacity onPress={onToggleImportant} style={styles.toggleButton}>
            <Ionicons
              name={important ? 'star' : 'star-outline'}
              size={18}
              color={important ? 'gold' : colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  sender: {
    fontSize: 12,
    marginBottom: 2,
  },
  importantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  importantText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  bubble: {
    paddingRight: 28,
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 12,
    maxWidth: '80%',
    position: 'relative',
  },
  text: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    marginTop: 6,
    textAlign: 'left',
  },
  toggleButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 10,
  },
});
