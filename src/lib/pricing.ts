/**
 * Fuente única de verdad de precios y planes.
 *
 * Flory es una app: los planes son suscripciones, no dispositivos. Los
 * precios NO viven en i18n.tsx porque son los mismos en los tres idiomas
 * (CLP, IVA incluido); el i18n solo aporta etiquetas ("al mes", "al año").
 *
 * Estado comercial: solo FREE está activo. PLUS y SENSOR existen en la base
 * de datos de la app pero todavía no se pueden contratar (los pagos no están
 * implementados), así que en la web se muestran como "Próximamente" y la
 * única acción posible es dejar el correo.
 */

export type PlanId = 'FREE' | 'PLUS' | 'SENSOR'

export type BillingPeriod = 'monthly' | 'annual'

export type Plan = {
  id: PlanId
  /** Precio mensual en CLP. 0 en el plan gratuito. */
  monthlyPrice: number
  /** Precio anual en CLP. Equivale a 10 meses: dos meses gratis. */
  annualPrice: number
  /** `false` mientras el plan no se pueda contratar: se marca "Próximamente". */
  available: boolean
  /** Plan destacado con el distintivo "Más elegido". */
  featured: boolean
  /**
   * `true` cuando el precio es un "desde": el plan Sensor parte en su precio
   * base con un sensor incluido, así que se muestra "desde $5.990/mes*".
   */
  priceFrom: boolean
}

/**
 * Meses que se ahorran al pagar el año completo. Se deriva de los precios
 * (29900 ≈ 2990 × 10) y se usa solo para la etiqueta de ahorro.
 */
export const ANNUAL_FREE_MONTHS = 2

const PLANS: Plan[] = [
  { id: 'FREE', monthlyPrice: 0, annualPrice: 0, available: true, featured: false, priceFrom: false },
  { id: 'PLUS', monthlyPrice: 2990, annualPrice: 29900, available: false, featured: true, priceFrom: false },
  { id: 'SENSOR', monthlyPrice: 5990, annualPrice: 59900, available: false, featured: false, priceFrom: true },
]

export function getPlans(): Plan[] {
  return PLANS
}

export function getPlan(id: PlanId): Plan | null {
  return PLANS.find((plan) => plan.id === id) ?? null
}

export function isPlanId(value: string | null | undefined): value is PlanId {
  return value === 'FREE' || value === 'PLUS' || value === 'SENSOR'
}

const clpFormatter = new Intl.NumberFormat('es-CL')

/** 2990 → "$2.990". Mismo formato en los tres idiomas: los precios son CLP. */
export function formatCLP(value: number): string {
  return `$${clpFormatter.format(value)}`
}
