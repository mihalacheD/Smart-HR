import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs, orderBy, limit, DocumentData, Query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';

export function usePayslips(selectedYear: number) {
  const { user, role } = useAuth();
  const [payslips, setPayslips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayslips = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const payslipRef = collection(db, 'payslips');
      const q: Query<unknown, DocumentData> =
        role === 'hr'
          ? query(payslipRef, where('year', '==', selectedYear))
          : query(payslipRef, where('userId', '==', user.uid), where('year', '==', selectedYear));

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...(typeof data === 'object' && data !== null ? data : {}) };
      });
      setPayslips(items);
    } catch (error) {
      Alert.alert('Error fetching payslips');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user, role, selectedYear]);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  return { payslips, loading, fetchPayslips };
}
