import device from '../assets/photos/flory-device.png'
import { useI18n } from '../i18n'
import CtaLoQuiero from './CtaLoQuiero'
import { IconCheck } from './icons'
import Reveal from './Reveal'

/**
 * El sensor, en secundario.
 *
 * El producto que se está validando hoy es la app. El sensor llega en
 * diciembre, así que aparece como complemento opcional y nunca como
 * requisito: la app funciona entera sin él.
 *
 * No lleva ola inferior a propósito: la sección siguiente (Dudas) también
 * es crema y las dos se leen como un mismo bloque.
 */
export default function SensorTeaser() {
  const { copy } = useI18n()

  return (
    <section id="sensor" className="relative overflow-hidden bg-cream pt-10 pb-16 sm:pt-14 sm:pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[32px] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(31,74,44,0.6)] sm:p-10 lg:grid-cols-[0.8fr_1fr] lg:gap-12">
            <div className="relative mx-auto w-full max-w-[240px]">
              <span
                aria-hidden="true"
                className="absolute inset-x-6 bottom-2 h-4 rounded-[50%] bg-forest/15 blur-md"
              />
              <img
                src={device}
                alt={copy.sensor.alt}
                loading="lazy"
                decoding="async"
                className="relative mx-auto h-[220px] object-contain sm:h-[260px]"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
                  {copy.sensor.eyebrow}
                </p>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-[#9a6817]">
                  {copy.sensor.badge}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl leading-[1.15] font-bold text-balance sm:text-3xl">
                {copy.sensor.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted sm:text-base">
                {copy.sensor.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {copy.sensor.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm font-semibold text-ink">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                      <IconCheck className="size-3" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <CtaLoQuiero
                  label={copy.sensor.cta}
                  location="sensor"
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                />
                <p className="text-xs text-pretty text-muted">{copy.sensor.note}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
