import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export function useLastMessage() {
  const [lastMessage, setLastMessage] = useState<any | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(1));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setLastMessage({ id: doc.id, ...doc.data() });
      } else {
        setLastMessage(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { lastMessage };
}
