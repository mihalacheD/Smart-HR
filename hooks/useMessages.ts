import { useEffect, useState, useCallback } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type Message = {
  readBy: any;
  id: string;
  senderId: string;
  text: string;
  timestamp: Timestamp;
};

export function useMessages(p0: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>),
      }));
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = useCallback(async (senderId: string, text: string) => {
    if (!text.trim()) return;

    await addDoc(collection(db, 'messages'), {
      senderId,
      text,
      timestamp: Timestamp.now(),
      readBy: [senderId],
    });
  }, []);

  return { messages, loading, sendMessage };
}
