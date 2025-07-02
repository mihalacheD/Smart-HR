import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Message {
  id: string;
  readBy?: string[];
}

export async function markMessagesAsRead(messages: Message[], userId: string) {
  if (!userId) return;

  const unreadMessages = messages.filter(msg => !msg.readBy?.includes(userId));

  await Promise.all(
    unreadMessages.map(msg =>
      updateDoc(doc(db, 'messages', msg.id), {
        readBy: arrayUnion(userId),
      })
    )
  );
}
