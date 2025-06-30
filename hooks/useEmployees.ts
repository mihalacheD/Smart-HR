import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { Alert } from 'react-native';

export function useEmployees() {
  const { role } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);

  const fetchEmployees = useCallback(async () => {
    if (role !== 'hr') return;

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('role', '==', 'employee'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      setEmployees(items);
    } catch (error) {
      Alert.alert('Error fetching employees');
      console.error(error);
    }
  }, [role]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, fetchEmployees };
}
