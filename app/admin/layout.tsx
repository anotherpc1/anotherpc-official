import Link from "next/link";
import styles from "./admin.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.logoMark}>AP</span>
          <div>
            <b>어나더PC 관리자</b>
            <small>Another PC Admin</small>
          </div>
        </div>

        <nav className={styles.menu}>
          <Link href="/admin">대시보드</Link>
          <Link href="/admin/products">상품 · 재고</Link>
          <Link href="/admin/reservations">예약 관리</Link>
          <Link href="/">홈페이지 보기</Link>
        </nav>

        <div className={styles.sideInfo}>
          <span>운영 시간</span>
          <b>08:30 ~ 23:00</b>
        </div>
      </aside>

      <section className={styles.content}>{children}</section>
    </div>
  );
}
