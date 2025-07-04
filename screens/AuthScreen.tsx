import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import { lightColors, darkColors } from "../constants/colors";
import ThemedText from "../components/ThemedText";
import Button from "../components/Button";

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "Unknown error occurred";
}

export default function AuthScreen() {
  const { login, signup, loading } = useAuth();
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkColors : lightColors;

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
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image
          source={require("../assets/logo-transparent.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Toggle Login/Signup */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              !isSignup && { borderBottomColor: colors.accent },
            ]}
            onPress={() => setIsSignup(false)}
          >
            <ThemedText style={!isSignup ? styles.activeToggleText : styles.toggleText}>
              Login
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, isSignup && { borderBottomColor: colors.accent }]}
            onPress={() => setIsSignup(true)}
          >
            <ThemedText style={isSignup ? styles.activeToggleText : styles.toggleText}>
              Sign Up
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
          placeholderTextColor={colors.textSecondary}
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
          placeholderTextColor={colors.textSecondary}
        />

        {/* Role selection only on signup */}
        {isSignup && (
          <View style={styles.roleContainer}>
            <ThemedText style={styles.roleLabel}>Select Role:</ThemedText>
            <View style={styles.roles}>
              {["employee", "hr"].map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.roleButton,
                    role === r && { backgroundColor: colors.accent },
                  ]}
                  onPress={() => setRole(r as "employee" | "hr")}
                >
                  <ThemedText style={role === r ? styles.roleButtonTextActive : styles.roleButtonText}>
                    {r === "employee" ? "Employee" : "HR"}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Error message */}
        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

        {/* Submit Button */}
        <Button
          title={isSignup ? "Sign Up" : "Login"}
          onPress={isSignup ? handleSignup : handleLogin}
          disabled={loading || !email.trim() || !password.trim()}
          style={{ marginTop: 16 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 30,
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
  toggleText: {
    fontSize: 18,
  },
  activeToggleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
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
  },
  roleButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  roleButtonTextActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
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
