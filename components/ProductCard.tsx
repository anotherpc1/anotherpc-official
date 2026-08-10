import type { Product } from "@/lib/types";
import ReservationButton from "./ReservationButton";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className={`product-card accent-${product.accent}`}>
      <div className="card-head">
        <span className="number">{String(index + 1).padStart(2, "0")}</span>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <h3>{product.name}</h3>
      <ul>
        {product.gpu && <li>{product.gpu}</li>}
        <li>{product.ram}</li>
        <li>{product.storage}</li>
      </ul>
      <div className="price"><small>월 요금</small><strong>{product.price.toLocaleString()}<em>원</em></strong></div>
      <div className={`stock ${product.stock <= 3 ? "low" : ""}`}>
        {product.stock > 0 ? `예약가능 ${product.stock}대` : "현재 품절"}
      </div>
      <div className="card-actions">
        <a href={process.env.NEXT_PUBLIC_KAKAO_URL} target="_blank">카카오 문의</a>
        <ReservationButton productId={product.id} disabled={product.stock < 1} />
      </div>
    </article>
  );
}
