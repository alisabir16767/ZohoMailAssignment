"use client";

import { useState } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext"; 

export default function InvoicePage() {
  const { user } = useAuth(); 
  const [amount, setAmount] = useState<string>("");
  const [items, setItems] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<string>(""); // ✅ store invoiceId

  const handleCreate = async () => {
    try {
      if (!user?.id) {
        alert("User not logged in!");
        return;
      }
      const res = await API.post("/email/invoice", {
        userId: user.id,
        amount: Number(amount),
        items: items.split(",").map((i) => i.trim()),
      });

      // ✅ Save invoiceId from backend response
      setInvoiceId(res.data.invoice._id);

      alert("Invoice created!");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Failed to create invoice");
    }
  };

  const handleSend = async () => {
    try {
      if (!recipientEmail) {
        alert("Please enter recipient email");
        return;
      }
      if (!invoiceId) {
        alert("No invoice created yet!");
        return;
      }

      const res = await API.post("/email/invoice/send", {
        userId: user?.id,
        invoiceId, // ✅ use real invoiceId
        to: recipientEmail,
      });

      alert("Invoice email sent!");
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
      else alert("Failed to send invoice email");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Invoice</h1>

      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        placeholder="Items (comma separated)"
        value={items}
        onChange={(e) => setItems(e.target.value)}
      />
      <Button onClick={handleCreate}>Create Invoice</Button>

      <Input
        placeholder="Recipient Email"
        type="email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <Button onClick={handleSend} variant="secondary">
        Send Invoice Email
      </Button>
    </div>
  );
}
