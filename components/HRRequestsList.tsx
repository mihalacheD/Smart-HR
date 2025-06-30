import React from 'react';
import { FlatList, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { useHRRequests } from '../hooks/useHRRequests';
import { db } from '../firebaseConfig';
import LoadingOrEmpty from './LoadingOrEmpty';
import RequestCard from './RequestCard';
import ThemedContainer from './ThemedContainer';
import TitleHeader from './TitleHeader';
import { useDeleteRequest } from '../hooks/useDeleteRequest';
import SwipeToDelete from './SwipeToDelete';
import { useAuth } from '../context/AuthContext';

export default function HRRequestsList() {
  const { role } = useAuth();
  const { requests, loading, refetch } = useHRRequests();
  const { deleteRequest } = useDeleteRequest(refetch);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'requests', id), { status });
      refetch();
    } catch (err) {
      Alert.alert('Error updating status');
    }
  };

  if (loading || requests.length === 0) {
    return (
      <ThemedContainer>
        <LoadingOrEmpty
          loading={loading}
          emptyMessage="No requests found."
        />
      </ThemedContainer>
    );
  }

  return (
    <ThemedContainer>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<TitleHeader title="Requests" />}
        refreshing={loading}
        onRefresh={refetch}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const allowDelete =
            (role === 'hr' && ['approved', 'rejected'].includes(item.status)) ||
            (role === 'employee')

          const card = (
            <RequestCard
              item={item}
              onApprove={(id) => updateStatus(id, 'approved')}
              onReject={(id) => updateStatus(id, 'rejected')}
            />
          );

          return allowDelete ? (
            <SwipeToDelete onDelete={() => deleteRequest(item.id)}>{card}</SwipeToDelete>
          ) : (
            card
          );
        }}
      />
    </ThemedContainer>
  );
}
