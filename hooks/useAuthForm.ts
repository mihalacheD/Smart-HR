import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function useAuthForm() {
  const { login, signup, loading } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employee" | "hr">("employee");
  const [error, setError] = useState<string | null>(null);

  const ALLOW_SIGNUP = false;

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
    if (!ALLOW_SIGNUP) {
      setError("Registration is disabled in this demo.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      await signup(email.trim(), password.trim(), role);
    } catch (e) {
      if (e.code === "permission-denied") {
        setError("Registration is disabled in this demo.");
      } else {
        setError(getErrorMessage(e));
      }
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

function getErrorMessage(e: any): string {
  if (e && typeof e === "object" && "message" in e) {
    return (e as { message: string }).message;
  }
  return "Unknown error occurred";
}
