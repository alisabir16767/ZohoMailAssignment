"use client";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const sendEmail = async (type: string) => {
    try {
      await API.post(`/email/${type}`, { email: "user@example.com" });
      alert(`✅ ${type} email sent`);
    } catch (err) {
      alert("Failed to send email");
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Button onClick={() => sendEmail("invoice")}>Send Invoice</Button>
      <Button onClick={() => sendEmail("alert")}>Send Alert</Button>
      <Button onClick={() => sendEmail("ticket")}>Send Ticket</Button>
    </div>
  );
}
