import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Timestamp } from 'firebase/firestore';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { lightColors, darkColors } from '../constants/colors';
import { useThemeContext } from '../context/ThemeContext';
import { db } from '../firebaseConfig';
import Card from './Card';
import ThemedText from './ThemedText';
import Button from './Button';
import { formatDateLabel } from '../utils/formatDate';
import RequestBadge from './RequestBadge';
import LoadingOrEmpty from './LoadingOrEmpty';



interface Request {
  type: 'Holiday' | 'Work from home' | 'Medical';
  id: string;
  userId: string;
  fromDate: string;
  toDate: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  userEmail?: string;
}

export default function HRRequestsList() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useThemeContext();
  const colors = theme === 'dark' ? darkColors : lightColors;


  const fetchRequests = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'requests'));
      const reqs: Request[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as Request;
        let userEmail = 'Unknown';

        try {
          const userRef = doc(db, 'users', data.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            userEmail = userData.email;
          }
        } catch { }

        reqs.push({ id: docSnap.id, ...data, userEmail });
      }

      setRequests(reqs);
    } catch (err) {
      Alert.alert('Error loading requests');
    } finally {
      setLoading(false);
    }
  };


  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'requests', id), { status });
      fetchRequests();
    } catch (err) {
      Alert.alert('Error updating status');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const toDate = (input: any): Date => {
    if (!input) return new Date('');
    if (input instanceof Timestamp) return input.toDate();
    return new Date(input);
  };


  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      data={requests}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <Card title={item.userEmail || 'Request'} iconName="calendar-clock">

          <RequestBadge type={item.type} />

          <ThemedText>Date: {formatDateLabel(toDate(item.fromDate))} → {formatDateLabel(toDate(item.toDate))}</ThemedText>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ThemedText>Status: </ThemedText>
            <ThemedText
              style={{
                color:
                  item.status === 'approved'
                    ? colors.success
                    : item.status === 'rejected'
                      ? colors.danger
                      : colors.textSecondary,
                fontWeight: 'bold',
              }}
            >
              {item.status}
            </ThemedText>
          </View>


          <ThemedText>Message: {item.message}</ThemedText>

          {item.status === 'pending' && (
            <View style={styles.buttonRow}>
              <Button
                title="Approve"
                backgroundColor={colors.success}
                onPress={() => updateStatus(item.id, 'approved')}
                style={{ flex: 1 }}
              />
              <View style={{ width: 10 }} />
              <Button
                title="Reject"
                backgroundColor={colors.danger}
                onPress={() => updateStatus(item.id, 'rejected')}
                style={{ flex: 1 }}
              />
            </View>
          )}
        </Card>
      )}
      ListEmptyComponent={<LoadingOrEmpty loading={loading} emptyMessage="No requests found." />}
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
