import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import styles from "./home-exact.module.css";

export const revalidate = 30;

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("visible", true)
    .order("sort_order");

  const products = (data || []) as Product[];
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_xfxfMxaX/friend";
  const notice = process.env.NEXT_PUBLIC_NOTICE_URL || "https://open.kakao.com/o/gHRG6Tvg";
  const phone = process.env.NEXT_PUBLIC_PHONE || "010-5955-0993";
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/bio0318";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="/">
          <Image src="/assets/anotherpc-ap-symbol.png" alt="Another PC" width={58} height={58} priority />
          <span>
            <b>Another PC</b>
            <small>임대PC · 원격PC 전문</small>
          </span>
        </a>

        <nav className={styles.nav}>
          <a href="#products">상품안내</a>
          <a href="#notice">전체 공지방</a>
            <a className={styles.topKakao} href={kakao} target="_blank" rel="noopener noreferrer">
            <i>TALK</i> 카카오톡 문의
          </a>
          <a className={styles.topPhone} href={`tel:${phone}`}>☎ &nbsp; 전화문의 08:30~23:00</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>1PC 1IP 개별 제공</span>
            <h1>어나더<span>PC</span></h1>
            <h2>임대PC · 원격PC 전문 임대</h2>
            <p>당일 A/S 지원부터 실시간 재고 확인, 간편 예약까지 한 번에 이용하세요.</p>

            <div className={styles.heroActions}>
              <a className={styles.kakaoMain} href={kakao} target="_blank" rel="noopener noreferrer">
                <i>TALK</i> 카카오톡 문의
              </a>
              <a className={styles.telegramMain} href={telegram} target="_blank" rel="noopener noreferrer">
                <i>✈</i> 텔레그램 문의
              </a>
              
            </div>
          </div>

          <div className={styles.pc}>
            <Image src="/assets/hero-pc-final-v2.png" alt="어나더PC 임대 PC" width={600} height={350} priority />
          </div>

          <a className={styles.qr} href={kakao} target="_blank" rel="noopener noreferrer">
            <Image src="/assets/kakao-qr-card-exact.png" alt="카카오톡 문의 QR" width={190} height={205} priority />
          </a>

          <div className={styles.services}>
            <div><i>✓</i><p><b>당일 A/S 지원</b><span>문제 발생 시 즉시 해결</span></p></div>
            <div><i>IP</i><p><b>1PC 1IP 개별 제공</b><span>공인 IP 개별 제공</span></p></div>
            <div><i>▥</i><p><b>실시간 재고 표시</b><span>예약 가능 수량 확인</span></p></div>
            <div><i>◷</i><p><b>08:30 ~ 23:00</b><span>친절하고 빠른 상담</span></p></div>
          </div>
        </section>

        <section id="products" className={styles.products}>
          <div className={styles.title}>
            <h2>상품 / 요금 안내</h2>
            <p>필요한 성능과 실시간 재고를 확인하세요.</p>
          </div>

          <div className={styles.productScope}>
            <div className="product-grid">
              {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
            <p className="minimum-note">※ 최소 2대부터 임대 가능합니다.</p>
          </div>
        </section>

          <section id="notice" className={styles.notice}>
          <div className={styles.titleLine}>
            <span></span>
            <div>
              <h2>전체 공지방 안내</h2>
              <p>남은 수량, 할인 · 이벤트, 중요 공지를 확인하세요.</p>
            </div>
            <span></span>
          </div>

          <div className={styles.noticeGrid}>
            <article><strong>📣</strong><h3>남은 수량</h3><p>실시간 재고와 예약 가능 수량을 확인합니다.</p></article>
            <article><strong>🏷️</strong><h3>할인 / 이벤트</h3><p>할인과 이벤트 소식을 빠르게 안내합니다.</p></article>
            <article><strong>🔔</strong><h3>중요 공지</h3><p>서비스 이용에 필요한 중요 안내를 전달합니다.</p></article>
          </div>

          <a className={styles.noticeBtn} href={notice} target="_blank" rel="noopener noreferrer">전체 공지방 바로가기 &nbsp; ›</a>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image src="/assets/anotherpc-ap-symbol.png" alt="Another PC" width={50} height={50} />
            <div><b>어나더PC</b><small>anotherpc</small><p>임대PC · 원격PC 전문 임대</p></div>
          </div>

          <div>
            <b>문의 안내</b>
            <p>운영 시간 : 08:30 ~ 23:00</p>
            <p>카카오톡 검색 : anotherpc</p>
            <p><a href={telegram} target="_blank" rel="noopener noreferrer">{telegram}</a></p>
          </div>

          <div>
            <b>바로가기</b>
            <p><a href="#products">상품안내</a></p>
            <p><a href={notice}>전체 공지방</a></p>
          </div>

          <div className={styles.footerCta}>
            <b>빠르고 정확한 A/S</b>
            <span>문제 발생 시 언제든 문의주세요.</span>
            <a href={kakao} target="_blank" rel="noopener noreferrer">카카오톡 문의하기 ›</a>
          </div>
        </div>
        <p className={styles.copy}>© 2026 Another PC. All rights reserved.</p>
      </footer>
    </div>
  );
}
