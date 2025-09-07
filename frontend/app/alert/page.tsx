"use client";

import { useState } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AxiosError } from "axios";


export default function AlertPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!to || !subject || !body) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/email/alert", { to, subject, body });
      alert("✅ Alert email sent!");
      setTo("");
      setSubject("");
      setBody("");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ msg?: string }>;
    
      const errorMsg =
        axiosErr.response?.data?.msg ||
        axiosErr.message ||
        "Unknown error";
    
      console.error("Send alert error:", {
        status: axiosErr.response?.status,
        data: axiosErr.response?.data,
        message: axiosErr.message,
      });
    
      alert(`❌ Failed to send alert: ${errorMsg}`);
    }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Send Alert Email</h1>

      <Input
        placeholder="Recipient Email"
        type="email"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <Input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Textarea
        placeholder="Message Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <Button onClick={handleSend} disabled={loading}>
        {loading ? "Sending..." : "Send Alert"}
      </Button>
    </div>
  );
}
