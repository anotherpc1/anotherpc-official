create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('admin','staff')),
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  ram text not null,
  storage text not null,
  gpu text,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  badge text check (badge in ('BEST','NEW','HIT')),
  accent text not null default 'blue' check (accent in ('blue','green','slate','orange')),
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity >= 2),
  start_date date not null,
  memo text,
  status text not null default '신규' check (status in ('신규','확인','완료','취소'))
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.reservations enable row level security;

create policy "products public read" on public.products for select to anon, authenticated using (visible = true or exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "reservations public insert" on public.reservations for insert to anon, authenticated with check (true);
create policy "admin profiles read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "admin products all" on public.products for all to authenticated using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')) with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "admin reservations all" on public.reservations for all to authenticated using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')) with check (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

insert into public.products(name,type,ram,storage,gpu,price,stock,badge,accent,sort_order) values
('라이젠 2400G / 3400G','내장 그래픽','RAM 8GB','SSD 250GB',null,33000,12,null,'blue',1),
('라이젠 5600G','내장 그래픽','RAM 32GB','SSD 250GB / 500GB',null,36000,8,'BEST','green',2),
('라이젠 1700','외장 그래픽','RAM 32GB','SSD 500GB','GTX 1050Ti 4GB 또는 1060 3GB',40000,5,null,'slate',3),
('라이젠 5700G','내장 그래픽','RAM 32GB','SSD 250GB / 500GB',null,45000,10,'NEW','blue',4),
('라이젠 3700X','외장 그래픽','RAM 32GB','SSD 500GB','GTX 1050Ti 4GB 또는 1060 3GB',50000,4,'HIT','orange',5);
