"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";

export default function ReservationForm({ products }: { products: Product[] }) {
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function submitReservation(formData: FormData) {
    setMessage("접수 중입니다...");

    const payload = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      product_id: formData.get("product_id"),
      quantity: Number(formData.get("quantity")),
      request: formData.get("request"),
    };

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      setMessage(result?.error || "예약 접수 중 오류가 발생했습니다.");
      return;
    }

    setMessage("");
    setShowSuccessModal(true);
  }

  return (
    <>
      <form
        className="reservation-form"
        action={submitReservation}
      >
        <label>
          성함
          <input
            name="name"
            required
            maxLength={50}
            placeholder="성함을 입력해주세요."
          />
        </label>

        <label>
          연락처
          <input
            name="contact"
            required
            maxLength={50}
            placeholder="연락처(카카오톡, 텔레그램)를 입력해주세요."
          />
        </label>

        <label>
          상품
          <select id="product_id" name="product_id" required defaultValue="">
            <option value="" disabled>
              상품을 선택해주세요.
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (재고 {product.stock}대)
              </option>
            ))}
          </select>
        </label>

        <label>
          수량
          <input
            name="quantity"
            type="number"
            min={2}
            required
            placeholder="수량을 입력해주세요."
          />
        </label>

        <label>
          요청사항
          <textarea
            name="request"
            maxLength={500}
            placeholder="요청 사항을 입력해주세요."
          />
        </label>

        <label className="agree wide">
          <input type="checkbox" name="privacy_agree" />
          개인정보 수집에 동의합니다.
        </label>

        <button type="submit">
          예약 신청 접수
        </button>

        {message && (
          <p className="form-message">{message}</p>
        )}
      </form>

      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.58)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#ffffff",
              borderRadius: "22px",
              padding: "38px 30px 30px",
              textAlign: "center",
              boxShadow: "0 28px 80px rgba(23, 105, 232, 0.30)",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                background: "#1769e8",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>

            <h2
              style={{
                margin: "0 0 10px",
                fontSize: "26px",
                fontWeight: 800,
                color: "#111827",
              }}
            >
              예약 접수 완료
            </h2>

            <p
              style={{
                margin: "0 0 28px",
                color: "#64748b",
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              예약 신청이 정상적으로 접수되었습니다.
              <br />
              확인 후 빠르게 안내드리겠습니다.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              style={{
                width: "100%",
                height: "50px",
                border: 0,
                borderRadius: "12px",
                background: "#1769e8",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}