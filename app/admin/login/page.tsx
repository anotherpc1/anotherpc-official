"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function login(formData: FormData) {
    setBusy(true); setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (error) { setError("로그인 정보를 확인해 주세요."); setBusy(false); return; }
    location.href = "/admin";
  }
  return <main className="login-page"><form className="login-card" action={login}>
    <img src="/assets/anotherpc-logo.png" alt="어나더PC"/>
    <h1>관리자 로그인</h1>
    <input name="email" type="email" placeholder="관리자 이메일" required/>
    <input name="password" type="password" placeholder="비밀번호" required/>
    <button disabled={busy}>{busy ? "로그인 중..." : "로그인"}</button>
    {error && <p>{error}</p>}
  </form></main>;
}
