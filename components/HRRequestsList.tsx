import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { lightColors, darkColors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';
import { useHRRequests } from '../hooks/useHRRequests';
import { db } from '../firebaseConfig';
import LoadingOrEmpty from './LoadingOrEmpty';
import RequestCard from './RequestCard';


export default function HRRequestsList() {
  const { requests, loading, refetch } = useHRRequests();
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;


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
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
