import Image from "next/image";
import styles from "@/app/approved-home.module.css";

export default function Footer() {
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://open.kakao.com/o/s6LStvBh";
  const notice = process.env.NEXT_PUBLIC_NOTICE_URL || "https://open.kakao.com/o/gHRG6Tvg";
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/bio0318";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Image src="/assets/anotherpc-ap-symbol.png" alt="Another PC" width={50} height={50} />
          <div><b>Another PC</b><span>임대PC · 원격PC 전문</span></div>
        </div>
        <div><b>문의 안내</b><p>카카오톡 검색 : anotherpc</p><p>운영시간 : 08:30 ~ 23:00</p><p><a href={telegram}>{telegram}</a></p></div>
        <div><b>바로가기</b><p><a href="#products">상품안내</a></p><p><a href="#reservation">예약 신청</a></p><p><a href={notice}>전체 공지방</a></p></div>
        <div className={styles.footerCta}><b>빠르고 정확한 A/S</b><span>문제 발생 시 언제든 문의주세요.</span><a href={kakao}>카카오톡 문의하기 ›</a></div>
      </div>
      <p className={styles.copyright}>© 2026 Another PC. All rights reserved.</p>
    </footer>
  );
}
