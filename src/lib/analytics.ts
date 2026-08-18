/**
 * Punto único de instrumentación del funnel de validación.
 *
 * Hoy solo escribe en consola. Para enchufar GA4, Plausible o PostHog
 * basta con implementar el cuerpo de `track` una sola vez: ningún
 * componente conoce al proveedor de analítica.
 *
 * Funnel que mide el spec:
 *   view_landing → click_lo_quiero → view_pricing → select_plan → submit_lead → view_confirmation
 */

export type AnalyticsEvent =
  | 'view_landing'
  | 'click_lo_quiero'
  | 'view_pricing'
  | 'select_plan'
  | 'view_lead_form'
  | 'submit_lead'
  | 'lead_error'
  | 'view_confirmation'

export type AnalyticsProps = Record<string, string | number | boolean | undefined>

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}) {
  // TODO(analytics): reemplazar por el proveedor real. Por ejemplo:
  //   window.gtag?.('event', event, props)
  //   posthog.capture(event, props)
  if (import.meta.env.DEV) {
    console.debug(`[flory:track] ${event}`, props)
  }
}
