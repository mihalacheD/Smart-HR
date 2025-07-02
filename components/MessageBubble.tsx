import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColor';
import { formatTimeLabel } from '../utils/formatDate';

interface Props {
  text: string;
  senderName?: string;
  timestamp?: any;
  isOwnMessage: boolean;
}

export default function MessageBubble({ text, senderName, timestamp, isOwnMessage }: Props) {
  const colors = useThemeColors();
  const time = timestamp instanceof Date ? timestamp : timestamp?.toDate?.() ?? new Date();
  const timeStr = formatTimeLabel(time);

  return (
    <View style={[styles.container, isOwnMessage ? styles.ownContainer : styles.otherContainer]}>
      {!isOwnMessage && senderName && (
        <Text style={[styles.sender, { color: colors.textSecondary }]}>{senderName}</Text>
      )}
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isOwnMessage ? colors.accent : colors.card,
            alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        <Text style={[styles.text, { color: colors.textPrimary }]}>{text}</Text>
        <Text style={[styles.time, { color: colors.textSecondary }]}>{timeStr}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
  bubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
  },
  text: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
});
