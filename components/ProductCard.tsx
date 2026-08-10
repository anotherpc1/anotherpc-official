import type { Product } from "@/lib/types";
import ReservationButton from "./ReservationButton";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://open.kakao.com/o/s6LStvBh";
  const stockClass = product.stock < 1 ? "out" : product.stock <= 3 ? "low" : "";
  const accent = product.accent || "blue";

  return (
    <article className={`product-card accent-${accent}`} style={{ "--accent": accent === "green" ? "#16a34a" : accent === "orange" ? "#ff5a36" : accent === "slate" ? "#64748b" : "#1856d8" } as React.CSSProperties}>
      <span className="number">{String(index + 1).padStart(2, "0")}</span>
      <h3>{product.name}</h3>
      <span className="type">{product.type}</span>
      <div className={`stock ${stockClass}`}><i></i>{product.stock > 0 ? `예약가능 ${product.stock}대` : "현재 품절"}</div>
      <ul className="specs">
        {product.gpu && <li>{product.gpu}</li>}
        <li>{product.ram}</li>
        <li>{product.storage}</li>
        <li>1PC · 1IP 개별 제공</li>
      </ul>
      <div className="price">
        <small>월 요금</small>
        <div className="price-line">
          <strong>{product.price.toLocaleString()}<em>원</em></strong>
          {product.badge && <span className={`price-badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        </div>
      </div>
      <div className="card-actions">
        <a className="kakao-card-btn" href={kakao} target="_blank" rel="noopener noreferrer">
          <span className="talk-icon">TALK</span>
          <span>카카오 문의</span>
        </a>
        <ReservationButton productId={product.id} disabled={product.stock < 1} />
      </div>
    </article>
  );
}
