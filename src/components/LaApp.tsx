import { useState } from 'react'
import shotChat from '../assets/mockups-free/chat-planta.png'
import shotDiagnostico from '../assets/mockups-free/diagnostico.png'
import shotFicha from '../assets/mockups-free/ficha-planta.png'
import shotHoy from '../assets/mockups-free/hoy.png'
import shotIdentificacion from '../assets/mockups-free/identificacion-planta.png'
import shotPlantas from '../assets/mockups-free/mis-plantas.png'
import { useI18n } from '../i18n'
import PhoneFrame from './PhoneFrame'
import Reveal from './Reveal'

// Mismo orden que `copy.app.shots`.
const shots = [shotHoy, shotPlantas, shotFicha, shotChat, shotDiagnostico, shotIdentificacion]

export default function LaApp() {
  const { copy } = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)

  // Solo se renderiza la captura activa: los PNG sin optimizar pesan varios
  // MB cada uno y cargarlos los seis de golpe costaría más de 10 MB que casi
  // nadie llega a mirar.
  const active = copy.app.shots[activeIndex]

  return (
    <section id="la-app" className="relative overflow-hidden bg-forest pt-20 pb-32 sm:pt-24 sm:pb-40">
      <span aria-hidden="true" className="absolute -top-16 -left-16 size-56 rounded-full bg-white/5" />
      <span aria-hidden="true" className="absolute top-[40%] -right-20 size-64 rounded-full bg-white/5" />

      <div className="relative mx-auto max-w-4xl px-6">
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

        <Reveal delay={90} className="mt-9">
          <div
            role="tablist"
            aria-label={copy.app.title}
            className="no-scrollbar mx-auto flex max-w-2xl snap-x gap-1 overflow-x-auto rounded-full bg-white/10 p-1.5"
          >
            {copy.app.shots.map((shot, index) => {
              const selected = index === activeIndex

              return (
                <button
                  key={shot.caption}
                  type="button"
                  role="tab"
                  id={`tab-app-${index}`}
                  aria-selected={selected}
                  aria-controls="panel-app"
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 snap-center rounded-full px-4 py-2.5 font-display text-sm font-bold transition ${
                    selected ? 'bg-white text-forest shadow-sm' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {shot.caption}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div role="tabpanel" id="panel-app" aria-labelledby={`tab-app-${activeIndex}`}>
          <Reveal delay={150} className="mt-12 flex justify-center">
            <PhoneFrame
              src={shots[activeIndex]}
              alt={active.alt}
              className="w-[220px] sm:w-[260px] lg:w-[280px]"
            />
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
