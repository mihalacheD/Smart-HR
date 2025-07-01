import { useState, useEffect, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-native";

export type Employee = {
  id: string;
  uid: string;
  email: string;
  role: string;
  fullName?: string;
  position?: string;
};

export function useEmployees() {
  const { role } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = useCallback(async () => {
    if (role !== "hr") return;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("role", "==", "employee"));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: doc.id,
          email: data.email ?? "",
          role: data.role ?? "",
          fullName: data.fullName,
          position: data.position,
        } as Employee;
      });
      setEmployees(items);
    } catch (error) {
      Alert.alert("Error fetching employees");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [role]);

  const deleteEmployee = async (id: string) => {
    try {
      await deleteDoc(doc(db, "users", id));
      Alert.alert("Employee deleted");
      fetchEmployees();
    } catch (error) {
      Alert.alert("Failed to delete employee");
      console.error(error);
    }
  };

  const updateEmployee = useCallback(
    async (id: string, updatedData: Partial<Employee>) => {
      try {
        await updateDoc(doc(db, "users", id), updatedData);
        await fetchEmployees();
      } catch (error) {
        Alert.alert("Failed to update employee");
        console.error(error);
      }
    },
    [fetchEmployees]
  );

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { employees, loading, fetchEmployees, deleteEmployee, updateEmployee };
}
