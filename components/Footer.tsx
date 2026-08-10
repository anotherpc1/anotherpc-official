import Image from "next/image";
export default function Footer() {
  return <footer><div className="footer-grid">
    <div className="footer-brand"><Image src="/assets/anotherpc-symbol.png" alt="" width={52} height={52}/><div><b>어나더PC</b><small>임대PC · 원격PC 전문</small></div></div>
    <div><b>문의 안내</b><p>카카오톡: anotherpc</p><p>운영시간: 08:30~23:00</p><p><a href={process.env.NEXT_PUBLIC_TELEGRAM_URL}>텔레그램 문의</a></p></div>
    <div><b>바로가기</b><p><a href="#products">상품안내</a></p><p><a href="#reservation">예약 신청</a></p><p><a href={process.env.NEXT_PUBLIC_NOTICE_URL}>전체 공지방</a></p></div>
    <div className="footer-cta"><b>빠르고 정확한 A/S</b><span>문제 발생 시 언제든 문의주세요.</span><a href={process.env.NEXT_PUBLIC_KAKAO_URL}>카카오톡 문의하기</a></div>
  </div><p className="copyright">© 2026 Another PC. All rights reserved.</p></footer>;
}
