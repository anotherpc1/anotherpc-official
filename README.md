# 어나더PC 공식 홈페이지

Next.js App Router + TypeScript + Supabase로 구성된 실제 운영용 기본 프로젝트입니다.

## 포함 기능
- PC/모바일 반응형 홈페이지
- 실시간 상품·재고 조회
- 예약 신청 저장
- Supabase Auth 관리자 로그인
- 상품 가격·재고·노출·배지 관리
- 예약 상태 관리
- SEO 메타데이터
- 카카오톡/공지방/텔레그램/전화 연결

## 1. 준비
- Node.js 20.9 이상
- Supabase 프로젝트
- Vercel 계정 권장

## 2. 설치
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 3. Supabase 설정
1. Supabase SQL Editor에서 `supabase/migrations/001_initial.sql` 실행
2. Authentication에서 관리자 계정 생성
3. 생성된 사용자 UUID를 확인한 뒤:
```sql
insert into public.profiles(id, role)
values ('관리자-사용자-UUID', 'admin');
```
4. `.env.local`에 Project URL과 Publishable key 입력

## 4. 배포
Vercel에 프로젝트를 올리고 `.env.local`의 환경변수를 Vercel Project Settings에 동일하게 등록합니다.

## 주의
- 공개 예약 폼은 스팸 방지를 위해 운영 시 Cloudflare Turnstile 또는 rate limit 추가를 권장합니다.
- 개인정보처리방침과 이용약관은 실제 사업자 정보 및 환불정책에 맞게 별도 확정해야 합니다.
- 서비스 역할 키(service_role)는 브라우저에 절대 노출하지 마세요.
