import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const quantity = Number(body.quantity);
    if (!body.name || !body.contact || !body.product_id || quantity < 2 || !body.start_date) {
      return NextResponse.json({ error: "필수 항목을 확인해 주세요." }, { status: 400 });
    }
    const supabase = await createClient();
    const { data: product } = await supabase.from("products").select("id,name,stock").eq("id", body.product_id).single();
    if (!product || product.stock < quantity) return NextResponse.json({ error: "재고가 부족합니다." }, { status: 409 });
    const { error } = await supabase.from("reservations").insert({
      name: String(body.name).slice(0, 30),
      contact: String(body.contact).slice(0, 50),
      product_id: product.id,
      product_name: product.name,
      quantity,
      start_date: body.start_date,
      memo: String(body.memo || "").slice(0, 500),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "예약 접수 중 오류가 발생했습니다." }, { status: 500 });
  }
}
