-- Supabase SQL Editor에서 이 파일을 실행하세요

create table subscriptions (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references auth.users not null,
  name              text not null,
  amount            numeric not null,
  currency          text not null default 'KRW',
  cycle             text not null default 'monthly',
  category          text not null default 'other',
  next_payment_date date not null,
  color             text not null default '#6366f1',
  active            boolean not null default true,
  notes             text,
  created_at        timestamptz default now()
);

-- Row Level Security: 본인 데이터만 접근 가능
alter table subscriptions enable row level security;

create policy "own subscriptions"
  on subscriptions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
