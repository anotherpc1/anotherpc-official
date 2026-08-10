import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ReservationForm from "@/components/ReservationForm";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

export const revalidate = 30;

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("visible", true).order("sort_order");
  const products = (data || []) as Product[];

  return <>
    <Header />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">1PC 1IP 개별 제공</span>
          <h1>어나더<span>PC</span></h1>
          <h2>임대PC · 원격PC 전문 임대</h2>
          <div className="hero-points"><span>당일 A/S 지원</span><span>1PC 1IP 개별 제공</span><span>합리적인 요금</span></div>
          <div className="hero-actions">
            <a className="btn kakao" href={process.env.NEXT_PUBLIC_KAKAO_URL}>카카오톡 문의하기</a>
            <a className="btn reserve" href="#reservation">▣ 예약 신청하기</a>
          </div>
        </div>
        <div className="hero-pc"><Image src="/assets/hero-pc.png" alt="고성능 PC" width={525} height={305} priority /></div>
        <a className="qr-card" href={process.env.NEXT_PUBLIC_KAKAO_URL}>
          <b>카카오톡 문의</b><Image src="/assets/kakao-qr.png" alt="카카오 QR" width={145} height={145}/><small>카카오톡으로 빠르게 문의하세요!</small>
        </a>
        <div className="service-row">
          <div><b>당일 A/S 지원</b><span>문제 발생 시 빠른 해결</span></div>
          <div><b>1PC 1IP 개별 제공</b><span>공인 IP 개별 제공</span></div>
          <div><b>합리적인 요금</b><span>고성능 PC를 부담 없이</span></div>
          <div><b>운영시간 08:30~23:00</b><span>친절하고 빠른 상담</span></div>
        </div>
      </section>

      <section id="products" className="section products">
        <div className="product-grid">{products.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}</div>
        <p className="minimum-note">※ 최소 2대부터 임대 가능합니다.</p>
      </section>

      <section id="reservation" className="section">
        <div className="section-title"><h2>예약 신청</h2><p>신청 내용을 남겨주시면 확인 후 빠르게 안내드립니다.</p></div>
        <ReservationForm products={products}/>
      </section>

      <section id="notice" className="section notice">
        <div className="section-title"><h2>전체 공지방 안내</h2><p>남은 수량, 할인 · 이벤트, 중요 공지를 확인하세요.</p></div>
        <div className="notice-grid">
          <article><span>📣</span><h3>남은 수량</h3><p>실시간 재고와 예약 가능 수량을 확인합니다.</p></article>
          <article><span>🏷️</span><h3>할인 / 이벤트</h3><p>할인과 이벤트 소식을 빠르게 안내합니다.</p></article>
          <article><span>🔔</span><h3>중요 공지</h3><p>서비스 이용에 필요한 중요 안내를 전달합니다.</p></article>
        </div>
        <a className="notice-btn" href={process.env.NEXT_PUBLIC_NOTICE_URL}>전체 공지방 바로가기 ›</a>
      </section>
    </main>
    <Footer/>
    <div className="mobile-bar"><a href={process.env.NEXT_PUBLIC_KAKAO_URL}>카카오 문의</a><a href="#reservation">예약 신청</a><a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>전화 문의</a></div>
  </>;
}
