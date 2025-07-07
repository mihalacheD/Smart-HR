import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Request {
  id: string;
  userId: string;
  fromDate: any;
  toDate: any;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  userEmail?: string;
  type: 'Holiday' | 'Work from home' | 'Medical';
}

export function useRecentRequest(userId: string | null, role: string) {
  const [recentRequest, setRecentRequest] = useState<Request | null>(null);
  const [loadingRequest, setLoadingRequest] = useState(false);

  const fetchRecentRequest = useCallback(async () => {
    if (!userId) return;

    setLoadingRequest(true);
    try {
      const ref = collection(db, 'requests');
      const q =
       (role === 'hr' || role === 'demo-hr')
          ? query(ref, orderBy('createdAt', 'desc'), limit(1))
          : query(ref, where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(1));

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setRecentRequest({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Request);
      } else {
        setRecentRequest(null);
      }
    } catch (error) {
      console.error('Error loading recent request', error);
      setRecentRequest(null);
    } finally {
      setLoadingRequest(false);
    }
  }, [userId, role]);

  useEffect(() => {
    fetchRecentRequest();
  }, [fetchRecentRequest]);

  return { recentRequest, loadingRequest, refetch: fetchRecentRequest };
}
