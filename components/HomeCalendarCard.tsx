import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import ThemedText from './ThemedText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';

interface Props {
  notesForToday: { id: string; note: string }[];
  date: string;
}

export default function HomeCalendarCard({ notesForToday, date }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const latestNote = notesForToday.length > 0 ? notesForToday[0].note : null;
  const hasNotes = notesForToday.length > 0;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
      <Card title="Notes for Today" iconName="calendar-outline">

        {hasNotes && (
          <View style={styles.badge}>
            <Ionicons name="notifications-outline" size={16} color="orange" />
            <Text style={styles.badgeText}>{notesForToday.length}</Text>
          </View>
        )}

        <ThemedText style={styles.notePreview} numberOfLines={2} ellipsizeMode="tail">
          {hasNotes ? latestNote : 'No notes for today'}
        </ThemedText>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeText: {
    marginLeft: 6,
    fontWeight: '600',
    color: 'orange',
    fontSize: 14,
  },
  notePreview: {
    fontSize: 14,
    marginTop: 4,
  },
});
