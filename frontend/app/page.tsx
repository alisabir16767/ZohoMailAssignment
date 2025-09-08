"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
         Welcome to Email & Ticket Management
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Manage users, invoices, tickets, and alerts with our modern platform.
        
      </p>
      <div className="flex gap-4">
        <Link href="/auth/register">
          <Button size="lg">Sign Up</Button>
        </Link>
        <Link href="/auth/login">
          <Button size="lg" variant="outline">
            Login
          </Button>
        </Link>
      </div>
    </main>
  );
}
