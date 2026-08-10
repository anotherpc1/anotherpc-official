import Link from "next/link";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell"><aside><b>어나더PC 관리자</b><Link href="/admin">대시보드</Link><Link href="/admin/products">상품·재고</Link><Link href="/admin/reservations">예약 관리</Link><Link href="/">홈페이지 보기</Link></aside><section>{children}</section></div>;
}
