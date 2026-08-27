import { useEffect } from 'react'
import LegalPage from '../components/LegalPage'
import { privacyDoc } from '../content/legal'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'

export default function Privacidad() {
  const { copy } = useI18n()
  usePageMeta(copy.legal.privacy.meta.title, copy.legal.privacy.meta.description)

  useEffect(() => {
    track('view_legal', { page: 'privacidad' })
  }, [])

  return <LegalPage doc={privacyDoc} />
}
