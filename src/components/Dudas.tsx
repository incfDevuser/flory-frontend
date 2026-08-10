import { useState } from 'react'
import { useI18n } from '../i18n'
import { IconPlusMinus } from './icons'
import Reveal from './Reveal'

export default function Dudas() {
  const { copy } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="dudas" className="relative overflow-hidden bg-cream pt-14 pb-24 sm:pt-16 sm:pb-28">
      <span aria-hidden="true" className="absolute top-[22%] -left-16 size-40 rounded-full bg-amber-100" />
      <span aria-hidden="true" className="absolute bottom-[12%] -right-14 size-36 rounded-full bg-lime-300/60" />

      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-leaf uppercase">
            {copy.faq.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[1.15] font-bold text-balance sm:text-[2.6rem]">
            {copy.faq.title}
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {copy.faq.items.map((faq, index) => {
            const open = openIndex === index

            return (
              <Reveal key={faq.question} delay={index * 80}>
                <div
                  className={`rounded-[24px] bg-white transition duration-300 ${
                    open
                      ? 'shadow-[0_26px_46px_-30px_rgba(31,74,44,0.6)]'
                      : 'shadow-[0_16px_30px_-26px_rgba(31,74,44,0.6)]'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={`answer-${index}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-bold text-forest">{faq.question}</span>
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-leaf-100 text-leaf">
                        <IconPlusMinus className="size-4" open={open} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`answer-${index}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-pretty text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
