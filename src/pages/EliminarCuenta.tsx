import { useEffect } from 'react'
import LegalPage from '../components/LegalPage'
import { deleteAccountDoc } from '../content/legal'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'

export default function EliminarCuenta() {
  const { copy } = useI18n()
  usePageMeta(copy.legal.deleteAccount.meta.title, copy.legal.deleteAccount.meta.description)

  useEffect(() => {
    track('view_legal', { page: 'eliminar-cuenta' })
  }, [])

  return <LegalPage doc={deleteAccountDoc} />
}
