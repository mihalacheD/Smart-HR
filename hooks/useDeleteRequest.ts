// hooks/useDeleteRequest.ts
import { useState } from "react";
import { Alert } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { isDemoUser } from "../utils/isDemoUser";
import { showDemoAlert } from "../utils/showDemoAlert";

export function useDeleteRequest(onSuccess?: () => void) {
  const { role } = useAuth();
  const [loading, setLoading] = useState(false);

  const deleteRequest = async (id: string) => {
    if (isDemoUser(role)) {
      showDemoAlert();
      return;
    }

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deleteDoc(doc(db, "requests", id));
              onSuccess?.();
            } catch (err) {
              Alert.alert("Failed to delete request");
              console.error("Delete request error:", err);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return { deleteRequest, loading };
}
