import Image from "next/image";

export default function Footer() {
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://open.kakao.com/o/s6LStvBh";
  const notice = process.env.NEXT_PUBLIC_NOTICE_URL || "https://open.kakao.com/o/gHRG6Tvg";
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/bio0318";

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <div>
            <Image src="/assets/anotherpc-symbol.png" alt="어나더PC 심볼" width={58} height={58} />
            <span><b>어나더PC</b><small>anotherpc</small></span>
          </div>
          <p>임대PC · 원격PC 전문 임대</p>
        </div>
        <div>
          <b>문의 안내</b>
          <p>카카오톡 검색 : anotherpc</p>
          <p>운영 시간 : 08:30 ~ 23:00</p>
          <p><a href={telegram} target="_blank" rel="noopener noreferrer">{telegram}</a></p>
        </div>
        <div>
          <b>바로가기</b>
          <p><a href="#products">상품안내</a></p>
          <p><a href="#reservation">예약 신청</a></p>
          <p><a href={notice} target="_blank" rel="noopener noreferrer">전체 공지방</a></p>
        </div>
        <div className="footer-cta">
          <b>빠르고 정확한 A/S</b>
          <span>문제 발생 시 언제든 문의주세요.</span>
          <a href={kakao} target="_blank" rel="noopener noreferrer">카카오톡 문의하기 ›</a>
        </div>
      </div>
      <p className="copyright">© 2026 Another PC. All rights reserved.</p>
    </footer>
  );
}
