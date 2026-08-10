"use client";

type Props = {
  id: string | number;
  action: (formData: FormData) => void | Promise<void>;
};

export default function DeleteReservationButton({ id, action }: Props) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const ok = window.confirm(
          "이 예약을 삭제하시겠습니까?\n삭제한 예약은 복구할 수 없습니다."
        );
        if (!ok) event.preventDefault();
      }}
      style={{ margin: 0 }}
    >
      <input type="hidden" name="id" value={String(id)} />
      <button
        type="submit"
        style={{
          height: 30,
          padding: "0 10px",
          border: 0,
          borderRadius: 6,
          background: "#dc2626",
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        삭제
      </button>
    </form>
  );
}
