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
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://open.kakao.com/o/s6LStvBh";
  const notice = process.env.NEXT_PUBLIC_NOTICE_URL || "https://open.kakao.com/o/gHRG6Tvg";
  const phone = process.env.NEXT_PUBLIC_PHONE || "010-5955-0993";

  return <>
    <Header />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">1PC 1IP 개별 제공</span>
          <h1>어나더<span>PC</span></h1>
          <h2>임대PC · 원격PC 전문 임대</h2>
          <p>당일 A/S 지원부터 실시간 재고 확인, 간편 예약까지 한 번에 이용하세요.</p>
          <div className="hero-actions">
            <a className="btn kakao" href={kakao} target="_blank" rel="noopener noreferrer">카카오톡 문의</a>
            <a className="btn outline reserve-hero" href="#reservation"><span className="calendar-icon" aria-hidden="true"></span>예약 신청하기</a>
          </div>
        </div>

        <div className="pc-art approved-pc">
          <Image src="/assets/hero-pc.png" alt="어나더PC 고성능 임대 PC" width={525} height={325} priority />
        </div>

        <a className="qr-panel" href={kakao} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 문의">
          <b>카카오톡 문의</b>
          <Image src="/assets/kakao-qr.png" alt="어나더PC 카카오톡 문의 QR코드" width={148} height={148} />
          <span>검색명 : <strong>anotherpc</strong></span>
          <small>카카오톡으로 빠르게 문의하세요!</small>
        </a>

        <div className="service-row">
          <div><b>당일 A/S 지원</b><span>문제 발생 시 빠른 해결</span></div>
          <div><b>1PC 1IP 개별 제공</b><span>공인 IP 개별 제공</span></div>
          <div><b>실시간 재고 표시</b><span>예약 가능 수량 확인</span></div>
          <div><b>08:30 ~ 23:00</b><span>친절하고 빠른 상담</span></div>
        </div>
      </section>

      <section id="products" className="section products-section">
        <div className="section-title">
          <span>상품 / 요금 안내</span>
          <p>필요한 성능과 실시간 재고를 확인하세요.</p>
        </div>
        <div className="product-grid">{products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
        <p className="minimum-note">※ 최소 2대부터 임대 가능합니다.</p>
      </section>

      <section id="reservation" className="section reservation-section">
        <div className="section-title">
          <span>예약 신청</span>
          <p>신청 내용을 남겨주시면 확인 후 안내드립니다.</p>
        </div>
        <ReservationForm products={products} />
      </section>

      <section id="notice" className="section notice-section">
        <div className="section-title">
          <span>전체 공지방 안내</span>
          <p>남은 수량, 할인 · 이벤트, 중요 공지를 확인하세요.</p>
        </div>
        <div className="notice-grid">
          <article className="notice-card notice-stock"><span className="notice-symbol">📣</span><strong>남은 수량</strong><p>실시간 재고와 예약 가능 수량을 확인합니다.</p></article>
          <article className="notice-card notice-event"><span className="notice-symbol">🏷️</span><strong>할인 / 이벤트</strong><p>할인과 이벤트 소식을 빠르게 안내합니다.</p></article>
          <article className="notice-card notice-important"><span className="notice-symbol">🔔</span><strong>중요 공지</strong><p>서비스 이용에 필요한 중요 안내를 전달합니다.</p></article>
        </div>
        <a className="notice-button" href={notice} target="_blank" rel="noopener noreferrer">전체 공지방 바로가기 <span aria-hidden="true">›</span></a>
      </section>
    </main>
    <Footer />
    <div className="mobile-action-bar">
      <a className="mobile-kakao" href={kakao} target="_blank" rel="noopener noreferrer">카카오 문의</a>
      <a className="mobile-reserve" href="#reservation">예약 신청</a>
      <a className="mobile-phone" href={`tel:${phone}`}>전화 문의</a>
    </div>
  </>;
}
