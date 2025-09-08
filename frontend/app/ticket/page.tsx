"use client";

import { useState } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function TicketPage() {
  const { user } = useAuth(); 
  const [form, setForm] = useState({
    subject: "",
    message: "",
    eventName: "",
    eventDate: "",
  });

  const handleCreate = async () => {
    if (!user) {
      alert("You must be logged in to create a ticket!");
      return;
    }

    await API.post("/email/ticket", { ...form, userId: user.id });
    alert("Ticket created!");
  };

  const handleSend = async () => {
    if (!user) {
      alert("You must be logged in to send a ticket!");
      return;
    }
    const { data } = await API.post("/email/ticket", { ...form, userId: user.id });

    await API.post("/email/ticket/send", {
      userId: user.id,
      ticketId: data.ticket._id,
    });

    alert("Ticket email sent!");
  };

  return (
    <ProtectedRoute>
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Create Ticket</h1>
      <Input
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <Textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <Input
        placeholder="Event Name"
        value={form.eventName}
        onChange={(e) => setForm({ ...form, eventName: e.target.value })}
      />
      <Input
        type="date"
        value={form.eventDate}
        onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
      />
      <Button onClick={handleCreate}>Create Ticket</Button>
      <Button onClick={handleSend} variant="secondary">
        Send Ticket Email
      </Button>
    </div>
    </ProtectedRoute>
  );
}
