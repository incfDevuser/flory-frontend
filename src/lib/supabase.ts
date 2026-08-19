type SupabaseConfig = {
  url: string
  publishableKey: string
}

function getSupabaseConfig(): SupabaseConfig | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

  if (!url || !publishableKey) {
    if (import.meta.env.DEV) {
      console.error(
        '[flory:supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY.',
      )
    }
    return null
  }

  return { url: url.replace(/\/$/, ''), publishableKey }
}

/**
 * Inserta un lead mediante la Data API de Supabase.
 *
 * Es un INSERT simple: usar `on_conflict` obligaría a conceder SELECT al rol
 * público. Los duplicados se detectan por el código 23505 en `leads.ts`.
 * Solo enviamos `apikey`: las publishable keys nuevas no son JWT y no deben
 * usarse como Bearer tokens.
 */
export async function insertSupabaseLead(row: object): Promise<Response | null> {
  const config = getSupabaseConfig()
  if (!config) return null

  return fetch(`${config.url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: config.publishableKey,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
}
