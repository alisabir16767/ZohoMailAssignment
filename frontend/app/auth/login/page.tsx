"use client";
import { useState } from "react";
import API from "@/lib/api";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      Cookies.set("token", res.data.token);
      alert("✅ Logged in!");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("❌ Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto mt-10">
      <Input placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
