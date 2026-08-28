import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const quantity = Number(body.quantity);

    if (!body.name || !body.contact || !body.product_id || quantity < 2) {
      return NextResponse.json(
        { error: "필수 항목을 확인해 주세요." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: product } = await supabase
      .from("products")
      .select("id,name,stock")
      .eq("id", body.product_id)
      .single();

    if (!product || product.stock < quantity) {
      return NextResponse.json(
        { error: "재고가 부족합니다." },
        { status: 409 }
      );
    }

    const today = new Date().toISOString().slice(0, 10);
    const memo = String(body.request || body.memo || "").slice(0, 500);

    const { error } = await supabase.from("reservations").insert({
      name: String(body.name).slice(0, 30),
      contact: String(body.contact).slice(0, 50),
      product_id: product.id,
      product_name: product.name,
      quantity,
      start_date: today,
      memo,
    });

    if (error) throw error;

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramToken && telegramChatId) {
      const text = [
        "🔔 어나더PC 신규 예약",
        "",
        `성함: ${String(body.name)}`,
        `연락처: ${String(body.contact)}`,
        `상품: ${product.name}`,
        `수량: ${quantity}대`,
        `요청사항: ${memo || "없음"}`,
      ].join("\n");

      try {
        await fetch(
          `https://api.telegram.org/bot${telegramToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text,
            }),
          }
        );
      } catch (telegramError) {
        console.error("Telegram notification failed:", telegramError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Reservation error:", error);

    return NextResponse.json(
      { error: "예약 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}