import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface Request {
  type: 'Holiday' | 'Work from home' | 'Medical';
  id: string;
  userId: string;
  fromDate: any;
  toDate: any;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
  userEmail?: string;
}

export function useHRRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(query(collection(db, 'requests'), orderBy('createdAt', 'desc')));
      const reqs: Request[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as Request;
        let userEmail = 'Unknown';

        try {
          const userRef = doc(db, 'users', data.userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            userEmail = userSnap.data().email;
          }
        } catch {}

        reqs.push({ id: docSnap.id, ...data, userEmail });
      }

      setRequests(reqs);
    } catch (error) {
      console.error('Error loading HR requests:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return { requests, loading, refetch: fetchRequests };
}
