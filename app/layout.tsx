import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "어나더PC | 임대PC · 원격PC 전문",
    template: "%s | 어나더PC",
  },
  description:
    "1PC 1IP 제공, 당일 A/S, 실시간 재고 확인이 가능한 임대PC · 원격PC 전문 서비스",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}