// hooks/useUnreadMessagesCount.ts
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function useUnreadMessagesCount(userId: string | null) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      setCount(0);
      return;
    }

    // Mesaje care NU conțin userId în readBy
    const q = query(
      collection(db, 'messages'),
      where('readBy', 'not-in', [userId]) // Firestore nu acceptă "not-in" cu array direct, așa că facem filtrarea client-side
    );

    // Ca "not-in" nu funcționează cu array conținând userId, mai bine facem filtrarea manual după snapshot

    const unsubscribe = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const unread = snapshot.docs.filter(doc => {
        const data = doc.data();
        return !data.readBy?.includes(userId);
      });
      setCount(unread.length);
    });

    return () => unsubscribe();
  }, [userId]);

  return count;
}
