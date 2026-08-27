import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { CONTACT_EMAIL, SITE_URL, type LegalBlock, type LegalDoc } from '../content/legal'
import PageHeader from './PageHeader'

/**
 * Render de los documentos legales. `PageHeader` en vez de `Navbar` porque
 * son páginas de lectura, no parte del embudo.
 *
 * A diferencia del resto del sitio no lleva blobs ni animaciones de entrada:
 * el texto es largo y lo único que importa es que se lea. Por eso también usa
 * `text-ink` y no `text-muted`, que sobre crema queda bajo el mínimo de
 * contraste para párrafos largos.
 */

// El texto legal se guarda plano, así que el correo y el sitio se enlazan al
// vuelo en vez de partir cada frase en trozos dentro del contenido.
const LINKABLE = /(contact@tame\.cl|https:\/\/somosflory\.cl)/g

function withLinks(text: string) {
  return text.split(LINKABLE).map((part, index) => {
    if (part === CONTACT_EMAIL) {
      return (
        <a
          key={index}
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-leaf underline underline-offset-4 transition hover:text-leaf-600"
        >
          {part}
        </a>
      )
    }

    if (part === SITE_URL) {
      return (
        <a
          key={index}
          href={SITE_URL}
          className="font-semibold text-leaf underline underline-offset-4 transition hover:text-leaf-600"
        >
          {part}
        </a>
      )
    }

    return part
  })
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="text-[0.95rem] leading-relaxed text-pretty text-ink">{withLinks(block.text)}</p>

    case 'h3':
      return <h3 className="mt-3 font-display text-base font-bold text-forest">{block.text}</h3>

    case 'list':
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="relative pl-6 text-[0.95rem] leading-relaxed text-pretty text-ink">
              <span aria-hidden="true" className="absolute top-[0.6rem] left-0 size-1.5 rounded-full bg-leaf" />
              {withLinks(item)}
            </li>
          ))}
        </ul>
      )

    case 'steps':
      return (
        <ol className="flex flex-col gap-2">
          {block.items.map((item, index) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-pretty text-ink">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-leaf-100 font-display text-xs font-bold text-leaf"
              >
                {index + 1}
              </span>
              {withLinks(item)}
            </li>
          ))}
        </ol>
      )

    case 'lines':
      return (
        <div className="flex flex-col gap-1 rounded-[20px] bg-white px-5 py-4 shadow-[0_20px_44px_-34px_rgba(31,74,44,0.7)]">
          {block.items.map((item) => (
            <p key={item} className="text-[0.95rem] leading-relaxed break-words text-ink">
              {withLinks(item)}
            </p>
          ))}
        </div>
      )

    case 'note':
      return (
        <p className="rounded-[20px] bg-amber-100 px-5 py-4 text-[0.95rem] leading-relaxed font-semibold text-pretty text-forest ring-1 ring-amber/40">
          {withLinks(block.text)}
        </p>
      )
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const { copy, language } = useI18n()
  // Con pocas secciones el índice estorba más de lo que ayuda.
  const indexSections = doc.sections.filter((section) => section.title)
  const showIndex = indexSections.length > 6

  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <PageHeader />

      <main className="flex-1 px-6 py-10 sm:py-14">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.4rem]">
            {doc.title}
          </h1>

          {doc.version && <p className="mt-3 text-sm text-muted">{doc.version}</p>}

          {language !== 'es' && (
            <p className="mt-6 rounded-[20px] bg-white px-5 py-4 text-sm text-pretty text-muted shadow-[0_20px_44px_-34px_rgba(31,74,44,0.7)]">
              {copy.legal.spanishOnly}
            </p>
          )}

          {showIndex && (
            <nav
              aria-label={copy.legal.index}
              className="mt-8 rounded-[26px] bg-white p-6 shadow-[0_26px_50px_-34px_rgba(31,74,44,0.6)]"
            >
              <h2 className="font-display text-sm font-bold text-forest">{copy.legal.index}</h2>
              <ol className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {indexSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-sm text-muted transition hover:text-forest"
                    >
                      {section.number && <span className="text-leaf">{section.number}. </span>}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-10 flex flex-col gap-9">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                {section.title && (
                  <h2 className="font-display text-xl font-bold text-balance sm:text-2xl">
                    {section.number && <span className="text-leaf">{section.number}. </span>}
                    {section.title}
                  </h2>
                )}
                <div className={`flex flex-col gap-3 ${section.title ? 'mt-3' : ''}`}>
                  {section.blocks.map((block, index) => (
                    <Block key={index} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 border-t border-forest/10 pt-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-leaf px-7 py-3.5 font-display font-semibold text-white shadow-[0_18px_34px_-16px_rgba(63,157,99,0.95)] transition hover:-translate-y-0.5 hover:bg-leaf-600 active:translate-y-0"
            >
              {copy.legal.back}
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
