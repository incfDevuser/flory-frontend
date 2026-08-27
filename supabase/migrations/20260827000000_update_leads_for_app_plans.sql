-- Reposicionamiento: Flory deja de venderse como dispositivo y pasa a ser una
-- app con planes de suscripción (Free / Plus / Pro).
--
-- La tabla `leads` estaba modelada alrededor del sensor: planes FLORY /
-- FLORY_PREMIUM / FLORY_CASA, precio normal tachado, precio de lanzamiento por
-- dispositivo y variante de A/B testing. Nada de eso aplica ahora:
--
--   * Los planes son FREE, PLUS y PRO.
--   * PLUS y PRO todavía no se pueden contratar (los pagos no están
--     implementados), así que el formulario sigue siendo una lista de espera.
--   * Ya no hay experimento de precios, así que `price_variant` desaparece.
--
-- Los leads de la era del dispositivo NO se remapean a los planes nuevos: un
-- lead que pidió "Flory Casa" (3 sensores) no es un lead de plan Free, y
-- fingir lo contrario ensucia cualquier análisis posterior. Se mueven tal cual
-- a `leads_legacy`, que conserva las columnas originales.

begin;

-- 1. Archivar y vaciar los leads del funnel del dispositivo.
--
--    El bloque se salta solo si `price_variant` ya no existe, es decir, si
--    esta migración ya corrió. Sin esa guarda, una segunda ejecución borraría
--    los leads nuevos.
--    Todo va dentro de la guarda: si el archivo se aplicara dos veces, el
--    COMMENT y el ALTER de una tabla inexistente también fallarían.
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'leads'
      and column_name = 'price_variant'
  ) then
    execute 'create table if not exists public.leads_legacy as select * from public.leads';
    execute 'delete from public.leads';

    execute $c$comment on table public.leads_legacy is
      'Leads capturados cuando Flory se validaba como dispositivo (planes FLORY, FLORY_PREMIUM, FLORY_CASA). Solo lectura histórica.'$c$;

    -- Sin grants ni políticas: la tabla queda invisible para anon y
    -- authenticated. RLS se activa igual para no dejar una tabla del esquema
    -- public sin RLS, que es lo que revisa el linter de Supabase.
    execute 'revoke all on table public.leads_legacy from anon, authenticated';
    execute 'alter table public.leads_legacy enable row level security';
  end if;
end $$;

-- 2. Fuera las restricciones del modelo de dispositivo.
alter table public.leads
  drop constraint if exists leads_plan_check,
  drop constraint if exists leads_prices_match_plan_check,
  drop constraint if exists leads_launch_unit_price_check,
  drop constraint if exists leads_variant_check;

-- 3. Fuera las columnas del modelo de dispositivo.
alter table public.leads
  drop column if exists regular_price,
  drop column if exists launch_unit_price,
  drop column if exists price_variant;

-- 4. Columna nueva del modelo de suscripción. La tabla quedó vacía en el paso
--    1, así que se puede poner NOT NULL sin valor de relleno.
alter table public.leads
  add column if not exists billing_period text;

alter table public.leads
  alter column billing_period set not null;

-- 5. Restricciones del modelo nuevo.
alter table public.leads
  drop constraint if exists leads_billing_period_check,
  drop constraint if exists leads_price_matches_plan_check;

alter table public.leads
  add constraint leads_plan_check
    check (selected_plan in ('FREE', 'PLUS', 'PRO')),
  add constraint leads_billing_period_check
    check (billing_period in ('monthly', 'annual')),
  -- Free es gratis siempre; Plus y Pro tienen precio fijo por período. Sin
  -- pasarela de pago esto no cobra nada: solo evita que lleguen filas con
  -- precios que la web nunca mostró.
  add constraint leads_price_matches_plan_check
    check (
      case selected_plan
        when 'FREE' then displayed_price = 0
        when 'PLUS' then displayed_price = case billing_period
          when 'monthly' then 2990
          when 'annual' then 29900
        end
        when 'PRO' then displayed_price = case billing_period
          when 'monthly' then 4990
          when 'annual' then 49900
        end
        else false
      end
    );

comment on table public.leads is
  'Leads del funnel de la app Flory: Landing -> Plan -> Correo. Lista de espera, no cobros.';
comment on column public.leads.displayed_price is
  'Precio del plan elegido en el período indicado, en CLP. 0 en Free.';
comment on column public.leads.billing_period is
  'Período de facturación mostrado al lead: monthly o annual.';

-- 6. Permisos: el rol público solo puede insertar las columnas vigentes.
--    Los GRANT por columna no se actualizan solos al borrar columnas, así que
--    se vuelven a declarar por completo.
revoke all on table public.leads from anon, authenticated;
grant insert (
  email,
  name,
  selected_plan,
  billing_period,
  displayed_price,
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

commit;

-- Consulta útil para revisar resultados desde el SQL Editor:
-- select
--   email,
--   name,
--   selected_plan,
--   billing_period,
--   displayed_price,
--   utm_source,
--   utm_campaign,
--   device,
--   created_at
-- from public.leads
-- order by created_at desc;
