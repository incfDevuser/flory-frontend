-- El plan Pro se reemplaza por el plan Sensor: mismo escalón superior, pero
-- ahora incluye el sensor físico y parte "desde" $5.990/mes (con un sensor).
--
-- Los leads antiguos de PRO no se remapean: alguien que pidió "Pro" (más
-- diagnósticos, sin hardware) no pidió el plan Sensor. Se conservan tal cual
-- y las restricciones siguen aceptándolos como valor histórico; el frontend
-- ya no puede enviar 'PRO' porque `isPlanId` dejó de reconocerlo.

begin;

alter table public.leads
  drop constraint if exists leads_plan_check,
  drop constraint if exists leads_price_matches_plan_check;

alter table public.leads
  -- 'PRO' queda solo por las filas históricas; los inserts nuevos usan SENSOR.
  add constraint leads_plan_check
    check (selected_plan in ('FREE', 'PLUS', 'SENSOR', 'PRO')),
  -- Free es gratis siempre; Plus y Sensor tienen precio fijo por período. El
  -- precio de Sensor es el "desde" que muestra la web (un sensor incluido).
  add constraint leads_price_matches_plan_check
    check (
      case selected_plan
        when 'FREE' then displayed_price = 0
        when 'PLUS' then displayed_price = case billing_period
          when 'monthly' then 2990
          when 'annual' then 29900
        end
        when 'SENSOR' then displayed_price = case billing_period
          when 'monthly' then 5990
          when 'annual' then 59900
        end
        -- Precios históricos del plan Pro, ya no ofertado.
        when 'PRO' then displayed_price = case billing_period
          when 'monthly' then 4990
          when 'annual' then 49900
        end
        else false
      end
    );

commit;
