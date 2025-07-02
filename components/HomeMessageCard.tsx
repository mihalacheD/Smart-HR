import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ThemedText from './ThemedText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';
import { useEmployees } from '../hooks/useEmployees';
import { formatDateLabel, formatTimeLabel } from '../utils/formatDate';

interface Props {
  message: any;
}

export default function HomeMessageCard({ message }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const { employees } = useEmployees();

  const sender = employees.find((emp) => emp.uid === message.senderId);
  const displayName = sender?.fullName || sender?.email || 'Unknown sender';
  const time = message.timestamp?.toDate?.()
    ? `${formatDateLabel(message.timestamp.toDate())}, ${formatTimeLabel(message.timestamp.toDate())}`
    : '';


  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <Card title="Last Message" iconName="chat-outline">

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4 }}>
          <Ionicons name="time-outline" size={14} color="#999" style={{ marginRight: 4 }} />
          <ThemedText style={{ fontSize: 12, opacity: 0.6 }}>{time}</ThemedText>
        </View>


        <ThemedText>From: {displayName}</ThemedText>
        <ThemedText numberOfLines={1} ellipsizeMode="tail">
          Message: {message.text}
        </ThemedText>
      </Card>
    </TouchableOpacity>
  );
}
