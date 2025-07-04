import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function useAuthForm() {
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
    } catch (e: any) {
      setError(e.message || "Login failed");
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
    } catch (e: any) {
      setError(e.message || "Signup failed");
    }
  };

  return {
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
  };
}
