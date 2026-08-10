"use client";
export default function ReservationButton({ productId, disabled }: { productId: string; disabled: boolean }) {
  return <button disabled={disabled} onClick={() => {
    const select = document.querySelector<HTMLSelectElement>("#product_id");
    if (select) select.value = productId;
    document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" });
  }}>예약 신청</button>;
}
