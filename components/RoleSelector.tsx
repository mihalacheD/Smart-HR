import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ThemedText from "./ThemedText";

interface RoleSelectorProps {
  role: "employee" | "hr";
  onSelect: (role: "employee" | "hr") => void;
  accentColor: string;
}

export default function RoleSelector({ role, onSelect, accentColor }: RoleSelectorProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>Select Role:</ThemedText>
      <View style={styles.roles}>
        {["employee", "hr"].map((r) => (
          <TouchableOpacity
            key={r}
            style={[
              styles.button,
              role === r && { backgroundColor: accentColor },
            ]}
            onPress={() => onSelect(r as "employee" | "hr")}
          >
            <ThemedText style={role === r ? styles.activeText : styles.text}>
              {r === "employee" ? "Employee" : "HR"}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  roles: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  activeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
