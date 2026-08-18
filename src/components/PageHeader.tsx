import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { LogoFlory } from './icons'
import LanguagePicker from './LanguagePicker'

/**
 * Cabecera de las páginas del funnel. Sin enlaces de navegación a
 * propósito: una vez que alguien entró a elegir plan, cada link extra es
 * una salida más del embudo.
 */
export default function PageHeader() {
  const { copy } = useI18n()

  return (
    <header className="px-4 pt-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-2">
        <Link to="/" className="flex items-center gap-1" aria-label={copy.nav.homeLabel}>
          <LogoFlory />
        </Link>
        <LanguagePicker />
      </div>
    </header>
  )
}
