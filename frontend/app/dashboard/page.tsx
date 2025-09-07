"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, FileText, AlertTriangle, Ticket, User } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🚀 Email & Ticket Management System
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Manage users, invoices, tickets, and alerts seamlessly with our
          modern platform built using <span className="font-semibold">Next.js + shadcn</span>.
        </motion.p>
        <div className="flex gap-4">
          <Link href="/auth/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          ✨ Features at a Glance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <User className="mx-auto h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">User Management</h3>
              <p className="text-gray-600 text-sm">
                Register and authenticate securely with modern JWT-based login.
              </p>
              <Link href="/auth/register" className="block mt-4">
                <Button variant="secondary">Try Now</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <FileText className="mx-auto h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Invoice System</h3>
              <p className="text-gray-600 text-sm">
                Create invoices and send them via email with a click.
              </p>
              <Link href="/invoice" className="block mt-4">
                <Button variant="secondary">Create Invoice</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="mx-auto h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Send Alerts</h3>
              <p className="text-gray-600 text-sm">
                Instantly send alert emails to notify users about critical events.
              </p>
              <Link href="/alert" className="block mt-4">
                <Button variant="secondary">Send Alert</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg md:col-span-3">
            <CardContent className="p-6 text-center">
              <Ticket className="mx-auto h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ticket System</h3>
              <p className="text-gray-600 text-sm">
                Create tickets with event details and send them via email to your
                support team.
              </p>
              <Link href="/ticket" className="block mt-4">
                <Button variant="secondary">Create Ticket</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
