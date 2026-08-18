import { useState } from 'react'
import freeAvisos from '../assets/mockups-free/flory-app-avisos.png'
import freeHoy from '../assets/mockups-free/flory-app-hoy.png'
import freePlantas from '../assets/mockups-free/flory-app-plantas.png'
import proConversacion from '../assets/mockups-pro/02-conversacion.png'
import proDiagnostico from '../assets/mockups-pro/05-diagnostico.png'
import proHabla from '../assets/mockups-pro/01-hoy-la-planta-habla.png'
import proHistorial from '../assets/mockups-pro/07-historial.png'
import { useI18n } from '../i18n'
import { IconCheck } from './icons'
import Reveal from './Reveal'

// Los PNG ya traen el marco del teléfono dibujado, así que se muestran tal
// cual. Las dimensiones nativas van en el markup para reservar el espacio y
// evitar saltos de layout mientras cargan.
const SHOT_WIDTH = 824
const SHOT_HEIGHT = 1644

const freeShots = [freeHoy, freePlantas, freeAvisos]
const premiumShots = [proHabla, proConversacion, proDiagnostico, proHistorial]

type Plan = 'free' | 'premium'

// Los dos planes tienen distinto número de capturas, así que se ensanchan a
// un tipo común: sin esto, `active.shots` sería una unión de tuplas de
// largos distintos y TypeScript no deja recorrerla.
type AppPanel = {
  badge: string
  title: string
  description: string
  bullets: readonly string[]
  shots: readonly { alt: string; caption: string }[]
}

export default function LaApp() {
  const { copy } = useI18n()
  const [plan, setPlan] = useState<Plan>('free')

  const active: AppPanel = plan === 'free' ? copy.app.free : copy.app.premium
  // Solo se renderiza el set activo: cargar los siete mockups de golpe
  // costaría varios MB que la mayoría de la gente nunca mira.
  const shots = plan === 'free' ? freeShots : premiumShots

  return (
    <section id="la-app" className="relative overflow-hidden bg-forest pt-20 pb-32 sm:pt-24 sm:pb-40">
      <span aria-hidden="true" className="absolute -top-16 -left-16 size-56 rounded-full bg-white/5" />
      <span aria-hidden="true" className="absolute top-[40%] -right-20 size-64 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-lime uppercase">
            {copy.app.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[1.15] font-bold text-balance text-white sm:text-[2.6rem]">
            {copy.app.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-pretty text-white/70 sm:text-base">
            {copy.app.description}
          </p>
        </Reveal>

        <Reveal delay={90} className="mt-9 flex justify-center">
          <div
            role="tablist"
            aria-label={copy.app.tabsLabel}
            className="flex w-full max-w-sm gap-1 rounded-full bg-white/10 p-1.5"
          >
            {([
              ['free', copy.app.free.tab],
              ['premium', copy.app.premium.tab],
            ] as const).map(([id, label]) => {
              const selected = plan === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`tab-app-${id}`}
                  aria-selected={selected}
                  aria-controls="panel-app"
                  onClick={() => setPlan(id)}
                  className={`flex-1 rounded-full px-3 py-2.5 font-display text-sm font-bold transition ${
                    selected ? 'bg-white text-forest shadow-sm' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div role="tabpanel" id="panel-app" aria-labelledby={`tab-app-${plan}`}>
          <Reveal delay={140} className="mt-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 font-display text-xs font-bold text-forest">
              {active.badge}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-balance text-white sm:text-3xl">
              {active.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-pretty text-white/70 sm:text-base">
              {active.description}
            </p>
          </Reveal>

          <Reveal delay={190}>
            <ul className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center sm:gap-8">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm font-semibold text-white/90">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white/10 text-lime">
                    <IconCheck className="size-3" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={240}>
            <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 sm:gap-5 lg:justify-center lg:overflow-visible">
              {active.shots.map((shot, index) => (
                <li
                  key={shot.caption}
                  className="flex shrink-0 snap-center flex-col items-center gap-3 lg:shrink"
                >
                  <img
                    src={shots[index]}
                    alt={shot.alt}
                    width={SHOT_WIDTH}
                    height={SHOT_HEIGHT}
                    loading="lazy"
                    decoding="async"
                    className="w-[172px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] sm:w-[200px] lg:w-[218px]"
                  />
                  <span className="font-display text-xs font-bold text-white/60">{shot.caption}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 w-full sm:h-24"
      >
        <path fill="#ffffff" d="M0,66 C230,30 500,6 780,28 C1030,48 1250,92 1440,72 L1440,120 L0,120 Z" />
      </svg>
    </section>
  )
}
