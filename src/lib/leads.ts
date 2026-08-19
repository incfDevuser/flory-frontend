/**
 * Captura de leads.
 *
 * La publishable key solo puede insertar gracias a RLS. La tabla no expone
 * SELECT, UPDATE ni DELETE al navegador.
 */

import { getAttribution } from './attribution'
import type { PlanId, PriceVariant } from './pricing'
import { insertSupabaseLead } from './supabase'

export type LeadInput = {
  email: string
  name?: string
  selectedPlan: PlanId
  regularPrice: number
  displayedPrice: number
  launchUnitPrice: number
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

type LeadRow = {
  email: string
  name: string | null
  selected_plan: PlanId
  regular_price: number
  displayed_price: number
  launch_unit_price: number
  price_variant: PriceVariant
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
  referrer: string | null
  landing_path: string | null
  device: string
  language: string
}

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

function optionalText(value: string | undefined, maxLength: number): string | undefined {
  const normalized = value?.trim()
  return normalized ? normalized.slice(0, maxLength) : undefined
}

export async function submitLead(input: LeadInput, language: string): Promise<LeadResult> {
  if (!isValidEmail(input.email)) {
    return { ok: false, error: 'invalid_email' }
  }

  const attribution = getAttribution()

  const lead: Lead = {
    email: input.email.trim().toLowerCase(),
    name: optionalText(input.name, 100),
    selectedPlan: input.selectedPlan,
    regularPrice: input.regularPrice,
    displayedPrice: input.displayedPrice,
    launchUnitPrice: input.launchUnitPrice,
    priceVariant: input.priceVariant,
    utmSource: optionalText(attribution.utmSource, 255),
    utmMedium: optionalText(attribution.utmMedium, 255),
    utmCampaign: optionalText(attribution.utmCampaign, 255),
    utmContent: optionalText(attribution.utmContent, 255),
    utmTerm: optionalText(attribution.utmTerm, 255),
    referrer: optionalText(attribution.referrer, 2048),
    landingPath: optionalText(attribution.landingPath, 2048),
    device: attribution.device,
    language,
    createdAt: new Date().toISOString(),
  }

  const row: LeadRow = {
    email: lead.email,
    name: lead.name ?? null,
    selected_plan: lead.selectedPlan,
    regular_price: lead.regularPrice,
    displayed_price: lead.displayedPrice,
    launch_unit_price: lead.launchUnitPrice,
    price_variant: lead.priceVariant,
    utm_source: lead.utmSource ?? null,
    utm_medium: lead.utmMedium ?? null,
    utm_campaign: lead.utmCampaign ?? null,
    utm_content: lead.utmContent ?? null,
    utm_term: lead.utmTerm ?? null,
    referrer: lead.referrer ?? null,
    landing_path: lead.landingPath ?? null,
    device: lead.device,
    language: lead.language,
  }

  let response: Response | null
  try {
    response = await insertSupabaseLead(row)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[flory:supabase] No se pudo conectar con Supabase.', error)
    }
    return { ok: false, error: 'network' }
  }

  if (!response?.ok) {
    const responseText = response ? await response.text() : 'missing_environment'
    let responseBody: unknown = responseText

    try {
      responseBody = JSON.parse(responseText)
    } catch {
      // Conservamos el texto original para el log de desarrollo.
    }

    const errorCode =
      typeof responseBody === 'object' && responseBody !== null && 'code' in responseBody
        ? String(responseBody.code)
        : null

    // La restricción UNIQUE(email, selected_plan) evita filas repetidas. Para
    // el usuario, reenviar el mismo interés sigue siendo un resultado exitoso.
    if (response?.status === 409 && errorCode === '23505') {
      if (import.meta.env.DEV) {
        console.info('[flory:lead] lead duplicado; se conserva la fila existente')
      }
      return { ok: true, lead }
    }

    if (import.meta.env.DEV) {
      console.error('[flory:supabase] Supabase rechazó el lead.', {
        status: response?.status,
        body: responseBody,
      })
    }
    return { ok: false, error: 'network' }
  }

  if (import.meta.env.DEV) {
    console.info('[flory:lead] guardado en Supabase', {
      selectedPlan: lead.selectedPlan,
      displayedPrice: lead.displayedPrice,
    })
  }

  return { ok: true, lead }
}
