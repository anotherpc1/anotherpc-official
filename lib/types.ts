export type Product = {
  id: string;
  name: string;
  type: string;
  ram: string;
  storage: string;
  gpu: string | null;
  price: number;
  stock: number;
  badge: "BEST" | "NEW" | "HIT" | null;
  accent: "blue" | "green" | "slate" | "orange";
  visible: boolean;
  sort_order: number;
};

export type Reservation = {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  start_date: string;
  memo: string | null;
  status: "신규" | "확인" | "완료" | "취소";
};
