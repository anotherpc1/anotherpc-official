"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://open.kakao.com/o/s6LStvBh";
  const phone = process.env.NEXT_PUBLIC_PHONE || "010-5955-0993";

  return (
    <header className="header">
      <Link className="brand" href="/" aria-label="어나더PC 홈">
        <Image src="/assets/anotherpc-symbol.png" alt="어나더PC 심볼" width={62} height={62} priority />
        <span><b>어나더<span className="brand-blue">PC</span></b><small>임대PC · 원격PC 전문</small></span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(v => !v)}
      >☰</button>

      <nav id="main-nav" className={open ? "open" : ""}>
        <a href="#products" onClick={() => setOpen(false)}>상품안내</a>
        <a href="#notice" onClick={() => setOpen(false)}>전체 공지방</a>
        <a href="#reservation" onClick={() => setOpen(false)}>예약 신청</a>
        <a className="nav-kakao top-kakao" href={kakao} target="_blank" rel="noopener noreferrer">카카오톡 문의</a>
        <a className="top-phone" href={`tel:${phone}`}>전화문의 08:30~23:00</a>
      </nav>
    </header>
  );
}
