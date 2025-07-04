import React from "react";
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

import { useThemeContext } from "../context/ThemeContext";
import { lightColors, darkColors } from "../constants/colors";
import ThemedText from "../components/ThemedText";
import Button from "../components/Button";
import { useAuthForm } from "../hooks/useAuthForm";
import RoleSelector from "../components/RoleSelector";

export default function AuthScreen() {
  const {
    isSignup,
    setIsSignup,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    handleLogin,
    handleSignup,
    loading,
    error,
  } = useAuthForm();

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? darkColors : lightColors;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
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
          <RoleSelector role={role} onSelect={setRole} accentColor={colors.accent} />
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
  container: {
    flex: 1,
  },
  scroll: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 40,
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
