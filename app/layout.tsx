import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "어나더PC | 임대PC · 원격PC 전문", template: "%s | 어나더PC" },
  description: "1PC 1IP 개별 제공, 당일 A/S, 실시간 재고 확인과 간편 예약 신청.",
  keywords: ["어나더PC", "임대PC", "원격PC", "1PC 1IP", "PC 임대"],
  openGraph: {
    title: "어나더PC | 임대PC · 원격PC 전문",
    description: "실시간 재고 확인과 간편 예약 신청",
    images: ["/assets/anotherpc-logo.png"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
