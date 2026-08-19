begin;

-- Email case-insensitive: Martin@x.cl y martin@x.cl cuentan como el mismo lead.
create extension if not exists citext with schema extensions;

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null,
  name varchar(100),
  selected_plan text not null,
  regular_price integer not null,
  displayed_price integer not null,
  launch_unit_price integer not null,
  price_variant text not null,
  utm_source varchar(255),
  utm_medium varchar(255),
  utm_campaign varchar(255),
  utm_content varchar(255),
  utm_term varchar(255),
  referrer varchar(2048),
  landing_path varchar(2048),
  device text not null,
  language text not null,
  created_at timestamptz not null default now(),

  constraint leads_email_length_check
    check (char_length(email::text) between 6 and 254),
  constraint leads_email_format_check
    check (email::text ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  constraint leads_name_check
    check (name is null or (char_length(btrim(name)) between 1 and 100)),
  constraint leads_plan_check
    check (selected_plan in ('FLORY', 'FLORY_PREMIUM', 'FLORY_CASA')),
  constraint leads_variant_check
    check (price_variant in ('A', 'B', 'C')),
  constraint leads_device_check
    check (device in ('mobile', 'tablet', 'desktop')),
  constraint leads_language_check
    check (language in ('es', 'en', 'pt')),
  constraint leads_launch_unit_price_check
    check (launch_unit_price = 19990),
  constraint leads_prices_match_plan_check
    check (
      case selected_plan
        when 'FLORY' then
          displayed_price = 19990
          and regular_price = case price_variant
            when 'A' then 34990
            when 'B' then 39990
            when 'C' then 44990
          end
        when 'FLORY_PREMIUM' then
          displayed_price = 29990
          and regular_price = case price_variant
            when 'A' then 44990
            when 'B' then 49990
            when 'C' then 54990
          end
        when 'FLORY_CASA' then
          displayed_price = 59970
          and regular_price = 94990
        else false
      end
    ),
  constraint leads_email_plan_key unique (email, selected_plan)
);

comment on table public.leads is
  'Leads del funnel comercial Landing -> Plan -> Correo.';
comment on column public.leads.regular_price is
  'Precio normal mostrado tachado, en CLP.';
comment on column public.leads.displayed_price is
  'Total promocional prometido al lead, en CLP.';
comment on column public.leads.launch_unit_price is
  'Precio de lanzamiento por dispositivo, en CLP.';

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_plan_idx on public.leads (selected_plan);
create index leads_utm_campaign_idx on public.leads (utm_campaign)
  where utm_campaign is not null;

alter table public.leads enable row level security;

-- El cliente público solo puede insertar estas columnas. No puede elegir id
-- ni created_at, y no recibe acceso SELECT, UPDATE o DELETE.
revoke all on table public.leads from anon, authenticated;
grant insert (
  email,
  name,
  selected_plan,
  regular_price,
  displayed_price,
  launch_unit_price,
  price_variant,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  utm_term,
  referrer,
  landing_path,
  device,
  language
) on table public.leads to anon, authenticated;

create policy "public_can_submit_leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

commit;

-- Consulta útil para revisar resultados desde el SQL Editor:
-- select
--   email,
--   name,
--   selected_plan,
--   regular_price,
--   displayed_price,
--   price_variant,
--   utm_source,
--   utm_campaign,
--   device,
--   created_at
-- from public.leads
-- order by created_at desc;
