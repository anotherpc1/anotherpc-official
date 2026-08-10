import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link className="brand" href="/">
        <Image src="/assets/anotherpc-symbol.png" alt="어나더PC" width={52} height={52} priority />
        <span><b>어나더<span>PC</span></b><small>임대PC · 원격PC 전문</small></span>
      </Link>
      <nav>
        <a href="#products">상품안내</a>
        <a href="#notice">전체 공지방</a>
        <a href="#reservation">예약 신청</a>
        <a className="pill kakao" href={process.env.NEXT_PUBLIC_KAKAO_URL} target="_blank">카카오톡 문의</a>
        <a className="pill phone" href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>전화문의 08:30~23:00</a>
      </nav>
    </header>
  );
}
