import type { Product } from "@/lib/types";
import ReservationButton from "./ReservationButton";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const kakao = process.env.NEXT_PUBLIC_KAKAO_URL || "https://pf.kakao.com/_xfxfMxaX/friend";
  const accent = product.accent === "green" ? "#16a34a" : product.accent === "orange" ? "#ff4a21" : product.accent === "slate" ? "#64748b" : "#155bd7";

  return <article className="final-card" style={{"--card-accent":accent} as React.CSSProperties}>
    <span className="final-number">{String(index+1).padStart(2,"0")}</span>

    <h3>{product.name}</h3>
    <span className="final-type">{product.type}</span>

    <ul className="final-specs">
      {product.gpu&&<li>{product.gpu}</li>}
      <li>{product.ram}</li>
      <li>{product.storage}</li>
      <li>1PC · 1IP 개별 제공</li>
    </ul>

    <div className="final-price">
      <small>월 요금</small>
      <div>
        <strong>{product.price.toLocaleString()}<em>원</em></strong>
        {product.badge&&<span className={`final-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
      </div>
    </div>

    <div className="final-actions">
      <a href={kakao} target="_blank" rel="noreferrer">
        <i>TALK</i> 카카오톡 문의
      </a>
      <ReservationButton productId={product.id} disabled={product.stock<1}/>
    </div>
  </article>;
}