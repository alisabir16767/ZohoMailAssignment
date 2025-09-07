"use client";

import { useState } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TicketPage() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
    eventName: "",
    eventDate: "",
  });

  const handleCreate = async () => {
    await API.post("/emails/ticket", form);
    alert("Ticket created!");
  };

  const handleSend = async () => {
    await API.post("/emails/ticket/send", {
      to: "support@example.com",
      subject: form.subject,
      body: form.message,
    });
    alert("Ticket email sent!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Create Ticket</h1>
      <Input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
      <Textarea placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      <Input placeholder="Event Name" value={form.eventName} onChange={e => setForm({ ...form, eventName: e.target.value })} />
      <Input type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} />
      <Button onClick={handleCreate}>Create Ticket</Button>
      <Button onClick={handleSend} variant="secondary">Send Ticket Email</Button>
    </div>
  );
}
