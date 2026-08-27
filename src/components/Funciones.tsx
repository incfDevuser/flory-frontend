import floryIdea from '../assets/mascot/flory-idea.png'
import { useI18n } from '../i18n'
import { IconCamera, IconChat, IconDiagnosis, IconDrop, IconMapPin, IconRefresh, IconSparkle } from './icons'
import Reveal from './Reveal'

/**
 * Qué hace Flory.
 *
 * Sustituye a la antigua sección "Qué mide", que describía las cuatro
 * señales del sensor. Ahora el protagonista es el software, así que la
 * lista es de funciones reales de la app: nada de notificaciones, clima ni
 * IA superior, que todavía no existen.
 *
 * El orden de `featureVisuals` sigue el de `copy.features.items`.
 */
const featureVisuals = [
  { Icon: IconCamera, tint: 'bg-grape-100 text-grape' },
  { Icon: IconDrop, tint: 'bg-leaf-100 text-leaf' },
  { Icon: IconSparkle, tint: 'bg-amber-100 text-amber' },
  { Icon: IconDiagnosis, tint: 'bg-[#fbe6dd] text-clay' },
  { Icon: IconChat, tint: 'bg-grape-100 text-grape' },
  { Icon: IconRefresh, tint: 'bg-leaf-100 text-leaf' },
  { Icon: IconMapPin, tint: 'bg-amber-100 text-amber' },
]

export default function Funciones() {
  const { copy } = useI18n()
  const features = copy.features.items.map((item, index) => ({ ...item, ...featureVisuals[index] }))

  return (
    <section id="funciones" className="relative overflow-hidden bg-cream pt-10 pb-32 sm:pt-16 sm:pb-40">
      <span aria-hidden="true" className="absolute top-[18%] -left-16 size-40 rounded-full bg-lime-300/50" />
      <span aria-hidden="true" className="absolute top-[62%] -right-16 size-40 rounded-full bg-grape-100/70" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
            {copy.features.eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
            {copy.features.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-muted sm:text-base">
            {copy.features.description}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const { Icon } = feature

            return (
              <Reveal key={feature.title} delay={index * 70} className="h-full">
                <li className="flex h-full flex-col rounded-[26px] bg-white p-6 shadow-[0_22px_44px_-32px_rgba(31,74,44,0.6)]">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full ${feature.tint}`}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-forest">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">{feature.text}</p>
                </li>
              </Reveal>
            )
          })}

          <Reveal delay={features.length * 70} className="h-full">
            <li className="flex h-full items-center gap-4 rounded-[26px] bg-leaf-100 p-6">
              <img src={floryIdea} alt="" aria-hidden="true" className="size-14 shrink-0 object-contain" />
              <div>
                <h3 className="font-display text-base font-bold text-forest">{copy.features.plainTitle}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted">{copy.features.plainText}</p>
              </div>
            </li>
          </Reveal>
        </ul>
      </div>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24"
      >
        <path fill="var(--color-forest)" d="M0,74 C220,96 480,44 760,26 C1010,10 1250,30 1440,58 L1440,120 L0,120 Z" />
      </svg>
    </section>
  )
}
