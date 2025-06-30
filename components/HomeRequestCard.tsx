import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import ThemedText from './ThemedText';
import RequestCard from './RequestCard';
import { RootTabParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  loading: boolean;
  request: any | null;
}

export default function HomeRequestCard({ loading, request }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
      {loading ? (
        <Card title="Recent Request" iconName="calendar-clock">
          <ThemedText>Loading...</ThemedText>
        </Card>
      ) : request ? (
        <RequestCard
          item={request}
          title="Recent Request"
          subtitle={request.userEmail || 'Unknown user'}
        />
      ) : (
        <Card title="Recent Request" iconName="calendar-clock">
          <ThemedText>No recent requests.</ThemedText>
        </Card>
      )}
    </TouchableOpacity>
  );
}
