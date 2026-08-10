import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import styles from "./admin.module.css";

export default async function AdminPage() {
  const { supabase } = await requireAdmin();

  const [
    { count: products },
    { count: reservations },
    { count: newReservations },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("reservations").select("*", { count: "exact", head: true }),
    supabase.from("reservations").select("*", { count: "exact", head: true }).eq("status", "신규"),
  ]);

  return (
    <>
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>ADMIN DASHBOARD</span>
          <h1>대시보드</h1>
          <p>상품 재고와 예약 현황을 한눈에 확인하세요.</p>
        </div>
        <Link className={styles.homeButton} href="/">홈페이지 보기</Link>
      </div>

      <div className={styles.stats}>
        <Link href="/admin/products" className={styles.statCard}>
          <span className={styles.statIcon}>▣</span>
          <div>
            <small>등록 상품</small>
            <strong>{products || 0}</strong>
            <em>상품 · 재고 관리</em>
          </div>
        </Link>

        <Link href="/admin/reservations" className={styles.statCard}>
          <span className={styles.statIcon}>≡</span>
          <div>
            <small>전체 예약</small>
            <strong>{reservations || 0}</strong>
            <em>전체 예약 내역 보기</em>
          </div>
        </Link>

        <Link href="/admin/reservations" className={`${styles.statCard} ${styles.newCard}`}>
          <span className={styles.statIcon}>●</span>
          <div>
            <small>신규 예약</small>
            <strong>{newReservations || 0}</strong>
            <em>새 예약 확인 필요</em>
          </div>
        </Link>
      </div>

      <div className={styles.quick}>
        <h2>빠른 관리</h2>
        <div className={styles.quickGrid}>
          <Link href="/admin/products">
            <b>상품 · 재고 관리</b>
            <span>가격, 재고수량, 노출 여부를 수정합니다.</span>
            <em>관리하기 →</em>
          </Link>

          <Link href="/admin/reservations">
            <b>예약 관리</b>
            <span>신규 예약을 확인하고 진행 상태를 변경합니다.</span>
            <em>예약 확인 →</em>
          </Link>

          <Link href="/">
            <b>홈페이지 확인</b>
            <span>실제 고객용 메인화면을 바로 확인합니다.</span>
            <em>홈페이지 보기 →</em>
          </Link>
        </div>
      </div>
    </>
  );
}
