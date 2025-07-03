import { useEffect, useState, useCallback } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

export type CalendarNote = {
  id: string;
  date: string;
  note: string;
  userId: string;
  createdAt: Timestamp;
};

export function useCalendarNotes(userId: string | null) {
  const [notes, setNotes] = useState<CalendarNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'calendarNotes'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CalendarNote, 'id'>),
      }));
      setNotes(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addNote = useCallback(async (date: string, note: string) => {
    if (!userId) return;

    await addDoc(collection(db, 'calendarNotes'), {
      userId,
      date,
      note,
      createdAt: Timestamp.now(),
    });
  }, [userId]);

  const deleteNote = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'calendarNotes', id));
  }, []);

  return {
    notes,
    loading,
    addNote,
    deleteNote,
  };
}
