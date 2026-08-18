import { useState } from 'react'
import floryIdea from '../assets/mascot/flory-idea.png'
import sensorCloseup from '../assets/photos/sensor-in-pot-closeup.png'
import { useI18n } from '../i18n'
import { IconDrop, IconHumidity, IconSun, IconThermometer } from './icons'
import Reveal from './Reveal'

const blob = 'rounded-[46%_54%_42%_58%/48%_42%_58%_52%]'

const metricVisuals = [
  {
    id: 'water',
    Icon: IconDrop,
    percent: 38,
    color: 'var(--color-grape)',
    tint: 'bg-grape-100 text-grape',
  },
  {
    id: 'light',
    Icon: IconSun,
    percent: 72,
    color: 'var(--color-amber)',
    tint: 'bg-amber-100 text-amber',
  },
  {
    id: 'humidity',
    Icon: IconHumidity,
    percent: 54,
    color: 'var(--color-leaf)',
    tint: 'bg-leaf-100 text-leaf',
  },
  {
    id: 'temperature',
    Icon: IconThermometer,
    percent: 61,
    color: 'var(--color-clay)',
    tint: 'bg-[#fbe6dd] text-clay',
  },
]

export default function QueMide() {
  const { copy } = useI18n()
  const [activeId, setActiveId] = useState('light')
  const metrics = metricVisuals.map((metric, index) => ({ ...metric, ...copy.metrics.items[index] }))
  const active = metrics.find((metric) => metric.id === activeId) ?? metrics[0]
  const ActiveIcon = active.Icon

  return (
    <section id="que-mide" className="relative overflow-hidden bg-cream pt-10 pb-32 sm:pt-16 sm:pb-40">
      <span aria-hidden="true" className="absolute top-[22%] -left-16 size-40 rounded-full bg-lime-300/50" />
      <span aria-hidden="true" className="absolute top-[58%] -right-16 size-40 rounded-full bg-grape-100/70" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className={`${blob} bg-cream-200 p-4 sm:p-6`}>
            <div className={`${blob} aspect-square overflow-hidden bg-leaf-100`}>
              <img
                src={sensorCloseup}
                alt={copy.metrics.imageAlt}
                className="size-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
              {copy.metrics.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
              {copy.metrics.title}
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div role="tablist" aria-label={copy.metrics.tabsLabel} className="mt-7 flex gap-1 rounded-full bg-cream-200 p-1.5">
              {metrics.map((metric) => {
                const selected = metric.id === active.id
                return (
                  <button
                    key={metric.id}
                    type="button"
                    role="tab"
                    id={`tab-${metric.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${metric.id}`}
                    onClick={() => setActiveId(metric.id)}
                    className={`flex-1 rounded-full px-2 py-2 text-xs font-bold transition sm:text-sm ${
                      selected ? 'bg-white text-forest shadow-[0_10px_20px_-14px_rgba(31,74,44,0.8)]' : 'text-muted hover:text-forest'
                    }`}
                  >
                    {metric.label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              className="mt-5 rounded-[26px] bg-white p-6 shadow-[0_24px_46px_-30px_rgba(31,74,44,0.6)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 font-display text-sm font-bold text-forest">
                  <span className={`grid size-7 place-items-center rounded-full ${active.tint}`}>
                    <ActiveIcon className="size-4" />
                  </span>
                  {active.label}
                </span>
                <span className="font-display text-sm font-bold text-forest">{active.value}</span>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-cream-300/70">
                <div
                  className="h-full rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${active.percent}%`, backgroundColor: active.color }}
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">{active.description}</p>
            </div>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-4 flex items-center gap-4 rounded-[26px] bg-leaf-100 p-5">
              <img src={floryIdea} alt="" aria-hidden="true" className="size-14 shrink-0 object-contain" />
              <div>
                <h3 className="font-display text-sm font-bold">{copy.metrics.plainTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">
                  {copy.metrics.plainText}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
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
