import { requireAdmin } from "@/lib/auth";
export default async function AdminPage() {
  const { supabase } = await requireAdmin();
  const [{ count: products }, { count: reservations }, { count: newReservations }] = await Promise.all([
    supabase.from("products").select("*", { count:"exact", head:true }),
    supabase.from("reservations").select("*", { count:"exact", head:true }),
    supabase.from("reservations").select("*", { count:"exact", head:true }).eq("status","신규"),
  ]);
  return <><h1>대시보드</h1><div className="admin-stats"><article><small>상품</small><strong>{products || 0}</strong></article><article><small>전체 예약</small><strong>{reservations || 0}</strong></article><article><small>신규 예약</small><strong>{newReservations || 0}</strong></article></div></>;
}
