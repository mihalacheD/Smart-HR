import React from 'react';
import {
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useEmployeeRequests } from '../hooks/useEmployeeRequests';
import RequestCard from './RequestCard';
import LoadingOrEmpty from './LoadingOrEmpty';
import EmployeeRequestFormFields from './EmployeeRequestFormFields';
import ThemedContainer from './ThemedContainer';

export default function EmployeeRequestForm() {
  const { user } = useAuth();
  const { requests, refetch, loading } = useEmployeeRequests(user?.uid ?? null);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedContainer>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          ListHeaderComponent={
            user ? (
              <EmployeeRequestFormFields
                userId={user.uid}
                userEmail={user.email ?? ''}
                onSuccess={refetch}
              />
            ) : null
          }
          renderItem={({ item }) => <RequestCard item={item} />}
          ListEmptyComponent={<LoadingOrEmpty loading={loading} emptyMessage="No requests found." />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        />
      </ThemedContainer>
    </TouchableWithoutFeedback>
  );
}


