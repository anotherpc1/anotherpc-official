import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
async function updateStatus(formData: FormData) {
  "use server";
  const { supabase } = await requireAdmin();
  await supabase.from("reservations").update({ status: formData.get("status") }).eq("id", formData.get("id"));
  revalidatePath("/admin/reservations");
}
export default async function ReservationsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("reservations").select("*").order("created_at",{ascending:false});
  return <><h1>예약 관리</h1><div className="table-wrap"><table><thead><tr><th>접수일</th><th>성함</th><th>연락처</th><th>상품</th><th>수량</th><th>시작일</th><th>상태</th></tr></thead><tbody>{data?.map(r=><tr key={r.id}><td>{new Date(r.created_at).toLocaleString("ko-KR")}</td><td>{r.name}</td><td>{r.contact}</td><td>{r.product_name}</td><td>{r.quantity}</td><td>{r.start_date}</td><td><form action={updateStatus}><input type="hidden" name="id" value={r.id}/><select name="status" defaultValue={r.status}><option>신규</option><option>확인</option><option>완료</option><option>취소</option></select><button>변경</button></form></td></tr>)}</tbody></table></div></>;
}
