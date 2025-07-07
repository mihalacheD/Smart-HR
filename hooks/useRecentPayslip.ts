// hooks/useRecentPayslip.ts
import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, orderBy, limit, query, where, DocumentData, Query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function useRecentPayslip(userId: string | null, role: string | null) {
  const [recentPayslip, setRecentPayslip] = useState<any | null>(null);
  const [loadingPayslip, setLoadingPayslip] = useState(false);

  const fetchRecentPayslip = useCallback(async () => {
    if (!userId) return;

    setLoadingPayslip(true);
    try {
      const payslipRef = collection(db, 'payslips');
      let q: Query<unknown, DocumentData>;

      if (role === 'hr' || role === 'demo-hr') {
        q = query(payslipRef, orderBy('orderIndex', 'desc'), limit(1));
      } else {
        q = query(payslipRef, where('userId', '==', userId), orderBy('orderIndex', 'desc'), limit(1));
      }

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setRecentPayslip({ id: doc.id, ...(doc.data() as object) });
      } else {
        setRecentPayslip(null);
      }
    } catch (error) {
      console.error('Fetch payslip error:', error);
      setRecentPayslip(null);
    } finally {
      setLoadingPayslip(false);
    }
  }, [userId, role]);

  useEffect(() => {
    fetchRecentPayslip();
  }, [fetchRecentPayslip]);

  return { recentPayslip, loadingPayslip, refetch: fetchRecentPayslip };
}
