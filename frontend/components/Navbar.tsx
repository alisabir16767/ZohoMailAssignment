"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SmallBus
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/tickets" className="text-gray-700 hover:text-blue-600">
            Tickets
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>

          {token ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                onClick={logout}
                className="ml-2 text-sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
