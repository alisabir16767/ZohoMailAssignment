"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login"); 
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (!token || loading) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  return <>{children}</>;
}
