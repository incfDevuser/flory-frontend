/**
 * Captura de leads.
 *
 * ⚠️ IMPLEMENTACIÓN MOCK. No hay backend todavía: `submitLead` simula la
 * latencia de red, escribe el lead en localStorage y siempre responde ok.
 *
 * Para conectar el backend real hay que tocar UN solo sitio: el cuerpo de
 * `submitLead` (ver el TODO más abajo). El tipo `Lead` ya tiene exactamente
 * la forma que espera la especificación, así que el payload no cambia.
 *
 * Los leads acumulados se pueden inspeccionar en la consola del navegador con:
 *   JSON.parse(localStorage.getItem('flory-leads'))
 */

import { getAttribution } from './attribution'
import type { PlanId, PriceVariant } from './pricing'

export type LeadInput = {
  email: string
  name?: string
  selectedPlan: PlanId
  displayedPrice: number
  priceVariant: PriceVariant
}

export type Lead = LeadInput & {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  referrer?: string
  landingPath?: string
  device: string
  language: string
  createdAt: string
}

export type LeadResult = { ok: true; lead: Lead } | { ok: false; error: 'invalid_email' | 'network' }

const leadsStorageKey = 'flory-leads'

/**
 * Validación deliberadamente permisiva: solo descarta lo que es
 * evidentemente inválido. Rechazar correos raros pero legítimos cuesta
 * leads reales, y este formulario existe para conseguir leads.
 */
export function isValidEmail(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed.length < 6 || trimmed.length > 254) return false
  if (/\s/.test(trimmed)) return false
  return /^[^@]+@[^@.]+(\.[^@.]+)+$/.test(trimmed)
}

function persistLocally(lead: Lead): void {
  try {
    const raw = localStorage.getItem(leadsStorageKey)
    const previous = raw ? (JSON.parse(raw) as Lead[]) : []
    localStorage.setItem(leadsStorageKey, JSON.stringify([...previous, lead]))
  } catch {
    // localStorage lleno o bloqueado: no es motivo para fallar el envío.
  }
}

export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(leadsStorageKey)
    return raw ? (JSON.parse(raw) as Lead[]) : []
  } catch {
    return []
  }
}

export async function submitLead(input: LeadInput, language: string): Promise<LeadResult> {
  if (!isValidEmail(input.email)) {
    return { ok: false, error: 'invalid_email' }
  }

  const attribution = getAttribution()

  const lead: Lead = {
    email: input.email.trim().toLowerCase(),
    name: input.name?.trim() || undefined,
    selectedPlan: input.selectedPlan,
    displayedPrice: input.displayedPrice,
    priceVariant: input.priceVariant,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    referrer: attribution.referrer,
    landingPath: attribution.landingPath,
    device: attribution.device,
    language,
    createdAt: new Date().toISOString(),
  }

  // ─────────────────────────────────────────────────────────────────────
  // TODO(backend): reemplazar todo este bloque por la llamada real.
  //
  //   const response = await fetch(import.meta.env.VITE_LEADS_ENDPOINT, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(lead),
  //   })
  //   if (!response.ok) return { ok: false, error: 'network' }
  //   return { ok: true, lead }
  // ─────────────────────────────────────────────────────────────────────
  await new Promise((resolve) => setTimeout(resolve, 650))
  persistLocally(lead)

  if (import.meta.env.DEV) {
    console.info('[flory:lead] mock guardado en localStorage', lead)
  }

  return { ok: true, lead }
}
