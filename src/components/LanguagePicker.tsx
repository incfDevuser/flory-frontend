import { useI18n } from '../i18n'
import type { Language } from '../i18n'

const languages: { code: Language; flag: string; label: string }[] = [
  { code: 'es', flag: '🇨🇱', label: 'Español' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
]

export default function LanguagePicker() {
  const { language, setLanguage, copy } = useI18n()

  return (
    <div
      role="group"
      aria-label={copy.language.label}
      className="flex items-center rounded-full bg-white/75 p-1 shadow-sm ring-1 ring-forest/5"
    >
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          aria-label={item.label}
          aria-pressed={language === item.code}
          title={item.label}
          lang={item.code === 'pt' ? 'pt-BR' : item.code}
          className={`grid size-7 place-items-center rounded-full text-base leading-none transition sm:size-8 ${
            language === item.code
              ? 'bg-forest shadow-sm ring-2 ring-white'
              : 'opacity-55 grayscale-[35%] hover:opacity-100 hover:grayscale-0'
          }`}
        >
          <span aria-hidden="true">{item.flag}</span>
        </button>
      ))}
    </div>
  )
}
