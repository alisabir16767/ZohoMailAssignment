"use client";
import { useState } from "react";
import API from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", form);
      alert("✅ Registered successfully. Please login.");
    } catch (err) {
      alert("❌ Registration failed");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-10">
      <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <Input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleSubmit}>Register</Button>
    </div>
  );
}
