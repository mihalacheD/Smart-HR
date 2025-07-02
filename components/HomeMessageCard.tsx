import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ThemedText from './ThemedText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';
import { useEmployees } from '../hooks/useEmployees';
import { formatDateLabel, formatTimeLabel } from '../utils/formatDate';
import { useAuth } from '../context/AuthContext';

interface Props {
  message: any;
}

export default function HomeMessageCard({ message }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const { employees } = useEmployees();
  const { role } = useAuth();

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

        {message.important && (
          <View style={styles.importantBadge}>
            <Ionicons name="alert-circle" size={16} color="red" />
            <Text style={styles.importantText}>Important</Text>
          </View>
        )}

        <ThemedText>From: {displayName}</ThemedText>
        <ThemedText numberOfLines={1} ellipsizeMode="tail">
          Message: {message.text}
        </ThemedText>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  importantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  importantText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: 'red',
  },
});
