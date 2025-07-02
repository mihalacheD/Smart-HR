import React from 'react';
import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import DateSeparator from './DateSeparator';
import { useEmployees } from '../hooks/useEmployees';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

interface Props {
  messages: Message[];
  currentUserId: string;
}

type MessageItem = {
  type: 'separator' | 'message';
  id: string;
  date?: Date;
  message?: Message;
};

export default function MessageList({ messages, currentUserId }: Props) {
  const { employees } = useEmployees();

  // Procesăm lista de mesaje și adăugăm separat "separatori"
  const processed: MessageItem[] = [];
  let lastDate = '';

  messages.forEach((msg) => {
    const msgDate = msg.timestamp.toDateString();
    if (msgDate !== lastDate) {
      processed.push({ type: 'separator', id: `sep-${msgDate}`, date: msg.timestamp });
      lastDate = msgDate;
    }
    processed.push({ type: 'message', id: msg.id, message: msg });
  });

  return (
    <FlatList
      data={processed}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        if (item.type === 'separator' && item.date) {
          return <DateSeparator date={item.date} />;
        }

        const message = item.message!;
        const isOwnMessage = message.senderId === currentUserId;
        const sender = employees.find((emp) => emp.uid === message.senderId);
        const senderName = sender?.fullName || sender?.email || 'Unknown sender';

        return (
          <MessageBubble
            text={message.text}
            isOwnMessage={isOwnMessage}
            timestamp={message.timestamp}
            senderName={isOwnMessage ? undefined : senderName}
          />
        );
      }}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
}
