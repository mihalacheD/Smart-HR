import React from 'react';
import { FlatList } from 'react-native';
import MessageBubble from './MessageBubble';
import { useEmployees } from '../hooks/useEmployees';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: any;
}

interface Props {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: Props) {
   const { employees } = useEmployees();

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const isOwnMessage = item.senderId === currentUserId;
        const sender = employees.find((emp) => emp.uid === item.senderId);
        const senderName = sender?.fullName || sender?.email || 'HR';

        return (
          <MessageBubble
            text={item.text}
            isOwnMessage={isOwnMessage}
            timestamp={item.timestamp}
            senderName={isOwnMessage ? undefined : senderName}
          />
        );
      }}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
}