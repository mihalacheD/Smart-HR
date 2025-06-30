import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { useHRRequests } from '../hooks/useHRRequests';
import { db } from '../firebaseConfig';
import LoadingOrEmpty from './LoadingOrEmpty';
import RequestCard from './RequestCard';
import ThemedContainer from './ThemedContainer';
import TitleHeader from './TitleHeader';


export default function HRRequestsList() {
  const { requests, loading, refetch } = useHRRequests();


  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'requests', id), { status });
      refetch();
    } catch (err) {
      Alert.alert('Error updating status');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingOrEmpty loading={loading} />
      </View>
    );
  }

  if (requests.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingOrEmpty loading={false} emptyMessage="No requests found." />
      </View>
    );
  }


  return (
    <ThemedContainer >
      <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
        <TitleHeader title="Requests" />
      </View>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <RequestCard
            item={item}
            onApprove={(id) => updateStatus(id, 'approved')}
            onReject={(id) => updateStatus(id, 'rejected')}
          />
        )}
        refreshing={loading}
        onRefresh={refetch}
      />
    </ThemedContainer>
  );
}


