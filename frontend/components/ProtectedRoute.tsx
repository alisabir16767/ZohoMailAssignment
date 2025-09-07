"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  return <>{children}</>;
}
