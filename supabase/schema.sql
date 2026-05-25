-- Brick & Bull — trucks table
-- Run this in your Supabase SQL editor

create table if not exists trucks (
  id          text        primary key,          -- e.g. 'tk-01'
  era         text        not null check (era in ('bull','brick')),
  era_label   text        not null,             -- 'BULLNOSE' or 'BRICKNOSE'
  year        integer     not null,
  model       text        not null,             -- 'F-150', 'F-250', 'F-350', 'Bronco'
  trim        text        not null,
  engine      text        not null,
  drive       text        not null,             -- '4×4' or '4×2'
  cab         text        not null,
  trans       text        not null,
  miles       integer     not null,
  color       text        not null,
  price       integer     not null,
  status      text        not null default 'available'
                          check (status in ('available','pending','sold')),
  location    text        not null,
  image_url   text,                             -- Cloudinary URL (null = show placeholder)
  tone        text,                             -- optional color hint
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (allow public read)
alter table trucks enable row level security;

create policy "Public read" on trucks
  for select using (true);

-- Sample data (matches the original prototype)
insert into trucks (id, era, era_label, year, model, trim, engine, drive, cab, trans, miles, color, price, status, location) values
  ('tk-01','brick','BRICKNOSE',1989,'F-250','XLT Lariat','7.3L IDI Diesel','4×4','Regular Cab','5-spd ZF',142800,'Wimbledon White / Bittersweet',28500,'available','Phoenix, AZ'),
  ('tk-02','bull','BULLNOSE',  1984,'F-150','Ranger XLT', '5.0L 302 V8',   '4×2','Regular Cab','4-spd Manual',67300,'Light Chestnut / Tan',21900,'available','Tucson, AZ'),
  ('tk-03','brick','BRICKNOSE',1990,'F-350','XLT Lariat','7.3L IDI Diesel','4×4','Crew Cab',   'E4OD Auto',188400,'Oxford White',33750,'pending','Albuquerque, NM'),
  ('tk-04','brick','BRICKNOSE',1991,'Bronco','Eddie Bauer','5.8L 351 V8',  '4×4','SUV',        'E4OD Auto',104100,'Currant Red / Mocha',32400,'available','Phoenix, AZ'),
  ('tk-05','bull','BULLNOSE',  1986,'F-250','XL HD',      '6.9L IDI Diesel','4×4','Regular Cab','C6 Auto',211900,'Dark Canyon Red',18200,'available','Phoenix, AZ'),
  ('tk-06','bull','BULLNOSE',  1985,'F-150','XLT Lariat', '5.0L 302 V8',   '4×4','Super Cab',  'AOD Auto', 96700,'Bright Regatta Blue',22500,'available','Tucson, AZ'),
  ('tk-07','brick','BRICKNOSE',1988,'F-150','Custom',     '4.9L 300 I6',   '4×2','Regular Cab','4-spd Manual',78900,'Colonial White',14800,'sold','Albuquerque, NM'),
  ('tk-08','bull','BULLNOSE',  1982,'F-100','Ranger XLT', '5.0L 302 V8',   '4×2','Regular Cab','3-spd Auto', 54200,'Medium Blue Metallic',23600,'available','Phoenix, AZ')
on conflict (id) do nothing;
