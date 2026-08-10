import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
async function update(formData: FormData) {
  "use server";
  const { supabase } = await requireAdmin();
  await supabase.from("products").update({
    price:Number(formData.get("price")), stock:Number(formData.get("stock")),
    visible:formData.get("visible")==="on", badge:formData.get("badge") || null
  }).eq("id", formData.get("id"));
  revalidatePath("/"); revalidatePath("/admin/products");
}
export default async function ProductsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("products").select("*").order("sort_order");
  return <><h1>상품·재고 관리</h1><div className="admin-list">{data?.map(p=><form action={update} key={p.id} className="admin-row">
    <input type="hidden" name="id" value={p.id}/><b>{p.name}</b>
    <label>가격<input name="price" type="number" defaultValue={p.price}/></label>
    <label>재고<input name="stock" type="number" defaultValue={p.stock}/></label>
    <label>배지<select name="badge" defaultValue={p.badge || ""}><option value="">없음</option><option>BEST</option><option>NEW</option><option>HIT</option></select></label>
    <label className="check"><input name="visible" type="checkbox" defaultChecked={p.visible}/>노출</label><button>저장</button>
  </form>)}</div></>;
}
