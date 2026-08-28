"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_xfxfMxaX/friend";
  const phone = process.env.NEXT_PUBLIC_PHONE || "010-5955-0993";
  return <header className="final-header">
    <Link className="final-brand" href="/">
      <Image src="/assets/anotherpc-ap-symbol.png" alt="Another PC" width={58} height={58} priority />
      <span><b>Another PC</b><small>임대PC · 원격PC 전문</small></span>
    </Link>
    <button className="final-menu" onClick={()=>setOpen(v=>!v)} aria-label="메뉴">☰</button>
    <nav className={open ? "open" : ""}>
      <a href="#products" onClick={()=>setOpen(false)}>상품안내</a>
      <a href="#notice" onClick={()=>setOpen(false)}>전체 공지방</a>
      <a href="#reservation" onClick={()=>setOpen(false)}>예약 신청</a>
      <a className="final-top-kakao" href={kakao} target="_blank" rel="noreferrer"><i>TALK</i> 카카오톡 문의</a>
      <a className="final-top-phone" href={`tel:${phone}`}>☎ &nbsp; 전화문의 08:30~23:00</a>
    </nav>
  </header>;
}
