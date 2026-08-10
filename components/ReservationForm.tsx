"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";

export default function ReservationForm({ products }: { products: Product[] }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true); setMessage("");
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = await response.json();
    setBusy(false);
    setMessage(response.ok ? "예약 신청이 접수되었습니다." : result.error || "접수 중 오류가 발생했습니다.");
    if (response.ok) (document.querySelector("#reservation-form") as HTMLFormElement)?.reset();
  }

  return (
    <form id="reservation-form" className="reservation-form" action={submit}>
      <label>성함<input name="name" required maxLength={30} /></label>
      <label>연락처<input name="contact" required maxLength={50} placeholder="연락처(카카오톡, 텔레그램)를 입력해주세요." /></label>
      <label>상품<select id="product_id" name="product_id" required>
        {products.filter(p => p.stock > 0).map(p => <option key={p.id} value={p.id}>{p.name} (재고 {p.stock}대)</option>)}
      </select></label>
      <label>수량<input name="quantity" type="number" min={2} defaultValue={2} required /></label>
      <label>시작 희망일<input name="start_date" type="date" required /></label>
      <label className="wide">요청사항<textarea name="memo" rows={4} maxLength={500} /></label>
      <label className="agree wide"><input type="checkbox" name="privacy_agree" required /> 개인정보 수집에 동의합니다.</label>
      <button type="submit" disabled={busy}>{busy ? "접수 중..." : "예약 신청 접수"}</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
