import { useEffect } from 'react'
import LegalPage from '../components/LegalPage'
import { termsDoc } from '../content/legal'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'

export default function Terminos() {
  const { copy } = useI18n()
  usePageMeta(copy.legal.terms.meta.title, copy.legal.terms.meta.description)

  useEffect(() => {
    track('view_legal', { page: 'terminos' })
  }, [])

  return <LegalPage doc={termsDoc} />
}
