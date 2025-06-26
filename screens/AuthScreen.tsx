// src/screens/AuthScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "Unknown error occurred";
}

export default function AuthScreen() {
  const { login, signup, loading } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employee" | "hr">("employee");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }
    try {
      await login(email.trim(), password.trim());
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  const handleSignup = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }
    try {
      await signup(email.trim(), password.trim(), role);
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Toggle Login/Signup */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            !isSignup && styles.activeToggleButton,
          ]}
          onPress={() => setIsSignup(false)}
        >
          <Text style={!isSignup ? styles.activeToggleText : styles.toggleText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, isSignup && styles.activeToggleButton]}
          onPress={() => setIsSignup(true)}
        >
          <Text style={isSignup ? styles.activeToggleText : styles.toggleText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* Role selection only on signup */}
      {isSignup && (
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Select Role:</Text>
          <View style={styles.roles}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "employee" && styles.roleButtonActive,
              ]}
              onPress={() => setRole("employee")}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === "employee" && styles.roleButtonTextActive,
                ]}
              >
                Employee
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === "hr" && styles.roleButtonActive,
              ]}
              onPress={() => setRole("hr")}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === "hr" && styles.roleButtonTextActive,
                ]}
              >
                HR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Submit Button */}
      <Button
        title={isSignup ? "Sign Up" : "Login"}
        onPress={isSignup ? handleSignup : handleLogin}
        disabled={loading || !email.trim() || !password.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeToggleButton: {
    borderBottomColor: "#6200ee",
  },
  toggleText: {
    fontSize: 18,
    color: "#888",
  },
  activeToggleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
    fontSize: 16,
  },
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  roles: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  roleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  roleButtonActive: {
    backgroundColor: "#6200ee",
    borderColor: "#6200ee",
  },
  roleButtonText: {
    fontSize: 16,
    color: "#444",
  },
  roleButtonTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
