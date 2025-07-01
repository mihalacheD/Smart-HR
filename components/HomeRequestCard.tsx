import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import ThemedText from './ThemedText';
import RequestCard from './RequestCard';
import { RootTabParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEmployees } from '../hooks/useEmployees';

interface Props {
  loading: boolean;
  request: any | null;
}

export default function HomeRequestCard({ loading, request }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const { employees } = useEmployees();

  // Găsește angajatul pentru request-ul curent
  const employee = request ? employees.find(emp => emp.id === request.userId) : null;

  const displayName = employee?.fullName ?? employee?.email ?? 'Recent Request';


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
          subtitle={displayName}
        />
      ) : (
        <Card title="Recent Request" iconName="calendar-clock">
          <ThemedText>No recent requests.</ThemedText>
        </Card>
      )}
    </TouchableOpacity>
  );
}
