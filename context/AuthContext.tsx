// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

// Tipul pentru contextul nostru
type AuthContextType = {
  user: User | null;
  role: 'employee' | 'hr' | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'employee' | 'hr' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRole(data.role);
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
