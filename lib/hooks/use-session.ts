import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
}

export function useSession() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("useSession: Initial check");
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "useSession: Token from localStorage:",
        token ? "exists" : "not found"
      );

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("useSession: Fetching user data...");
      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("useSession: Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("useSession: User data received:", data);
        const userData = data.user;
        const { password, ...safeUserData } = userData;
        setUser(safeUserData);
        console.log("useSession: User state updated:", safeUserData);
      } else {
        console.log("useSession: Failed to get user data");
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("useSession: Error checking session:", error);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    checkSession,
  };
}
