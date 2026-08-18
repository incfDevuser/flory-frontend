/**
 * Atribución de tráfico: de dónde vino el lead.
 *
 * Modelo first-touch. Los UTM se capturan en la primera página que el
 * usuario abre y se conservan durante toda la sesión, porque el correo
 * se deja en /quiero-flory y para entonces la URL ya perdió los UTM.
 */

export type Attribution = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  referrer?: string
  landingPath?: string
  device: DeviceType
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

const storageKey = 'flory-attribution'

function detectDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  const width = window.innerWidth
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

function readFromUrl(): Attribution {
  const params = new URLSearchParams(window.location.search)

  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    utmContent: params.get('utm_content') ?? undefined,
    utmTerm: params.get('utm_term') ?? undefined,
    referrer: document.referrer || undefined,
    landingPath: window.location.pathname,
    device: detectDevice(),
  }
}

function hasUtms(attribution: Attribution): boolean {
  return Boolean(attribution.utmSource || attribution.utmMedium || attribution.utmCampaign)
}

/**
 * Guarda la atribución de la sesión. Idempotente: solo sobrescribe si la
 * URL actual trae UTM nuevos, para no pisar la campaña original cuando el
 * usuario navega dentro del sitio.
 */
export function captureAttribution(): void {
  try {
    const current = readFromUrl()
    const stored = sessionStorage.getItem(storageKey)

    if (stored && !hasUtms(current)) return

    sessionStorage.setItem(storageKey, JSON.stringify(current))
  } catch {
    // sessionStorage no disponible: seguimos sin atribución.
  }
}

export function getAttribution(): Attribution {
  try {
    const stored = sessionStorage.getItem(storageKey)
    if (stored) return JSON.parse(stored) as Attribution
  } catch {
    // Ignoramos storage roto o JSON inválido.
  }

  return { device: detectDevice() }
}
