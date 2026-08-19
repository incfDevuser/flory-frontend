/**
 * Fuente única de verdad de precios y planes.
 *
 * Los precios NO viven en i18n.tsx porque son dinámicos por variante de
 * A/B testing. El i18n solo aporta etiquetas ("pago único", "al mes").
 * Todos los precios son CLP con IVA incluido, en los tres idiomas.
 */

/**
 * Interruptor del A/B testing de precios.
 *
 * `false` → todo el mundo ve la variante B ($39.990) como precio normal.
 * `true`  → el precio normal se reparte 33/33/33 y queda estable por sesión.
 * La oferta de lanzamiento permanece fija en $19.990 por dispositivo.
 */
export const AB_TESTING_ENABLED = false

export const PRICE_VARIANTS = {
  A: 34990,
  B: 39990,
  C: 44990,
} as const

export type PriceVariant = keyof typeof PRICE_VARIANTS

export const DEFAULT_PRICE_VARIANT: PriceVariant = 'B'

/** Sobreprecio del bundle con 12 meses de Premium. Constante entre variantes. */
export const PREMIUM_BUNDLE_DELTA = 10000

/** Meses de Premium incluidos en el bundle. */
export const PREMIUM_BUNDLE_MONTHS = 12

/** Precio mensual de Flory Premium una vez terminado el período incluido. */
export const PREMIUM_MONTHLY_PRICE = 3990

/** Precio de lanzamiento por cada dispositivo para quienes dejan su correo. */
export const LAUNCH_DEVICE_PRICE = 19990

/** Pack de 3 sensores. Precio fijo, fuera del experimento. */
export const CASA_PRICE = 94990

export type PlanId = 'FLORY' | 'FLORY_PREMIUM' | 'FLORY_CASA'

export type Plan = {
  id: PlanId
  /** Precio normal mostrado como referencia. */
  price: number
  /** Total promocional que se guarda en `displayedPrice` al enviar el lead. */
  offerPrice: number
  deviceCount: number
  featured: boolean
}

const variantStorageKey = 'flory-price-variant'

function isPriceVariant(value: string | null): value is PriceVariant {
  return value === 'A' || value === 'B' || value === 'C'
}

/**
 * Devuelve la variante de precio de esta sesión.
 *
 * Se persiste en sessionStorage para que el usuario vea el mismo precio
 * en la landing y en la página de planes: si cambiara entre pasos, el
 * experimento no mediría nada.
 */
export function getPriceVariant(): PriceVariant {
  if (!AB_TESTING_ENABLED) return DEFAULT_PRICE_VARIANT

  try {
    const stored = sessionStorage.getItem(variantStorageKey)
    if (isPriceVariant(stored)) return stored

    const variants = Object.keys(PRICE_VARIANTS) as PriceVariant[]
    const picked = variants[Math.floor(Math.random() * variants.length)]
    sessionStorage.setItem(variantStorageKey, picked)
    return picked
  } catch {
    // Safari en modo privado puede lanzar al tocar sessionStorage.
    return DEFAULT_PRICE_VARIANT
  }
}

export function getPlans(variant: PriceVariant): Plan[] {
  const base = PRICE_VARIANTS[variant]

  return [
    { id: 'FLORY', price: base, offerPrice: LAUNCH_DEVICE_PRICE, deviceCount: 1, featured: false },
    {
      id: 'FLORY_PREMIUM',
      price: base + PREMIUM_BUNDLE_DELTA,
      offerPrice: LAUNCH_DEVICE_PRICE + PREMIUM_BUNDLE_DELTA,
      deviceCount: 1,
      featured: true,
    },
    {
      id: 'FLORY_CASA',
      price: CASA_PRICE,
      offerPrice: LAUNCH_DEVICE_PRICE * 3,
      deviceCount: 3,
      featured: false,
    },
  ]
}

const clpFormatter = new Intl.NumberFormat('es-CL')

/** 39990 → "$39.990". Mismo formato en los tres idiomas: los precios son CLP. */
export function formatCLP(value: number): string {
  return `$${clpFormatter.format(value)}`
}
