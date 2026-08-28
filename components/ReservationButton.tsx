"use client";

export default function ReservationButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled: boolean;
}) {
  function handleReservation() {
    const select =
      document.querySelector<HTMLSelectElement>("#product_id");

    if (select) {
      select.value = String(productId);

      select.dispatchEvent(
        new Event("change", {
          bubbles: true,
        })
      );
    }

    document
      .querySelector("#reservation")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleReservation}
    >
      예약 신청
    </button>
  );
}