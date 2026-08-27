import { useEffect } from 'react'
import ComoFunciona from '../components/ComoFunciona'
import CtaFinal from '../components/CtaFinal'
import Dudas from '../components/Dudas'
import Footer from '../components/Footer'
import Funciones from '../components/Funciones'
import Hero from '../components/Hero'
import LaApp from '../components/LaApp'
import Navbar from '../components/Navbar'
import Precios from '../components/Precios'
import SensorTeaser from '../components/SensorTeaser'
import { useI18n, usePageMeta } from '../i18n'
import { track } from '../lib/analytics'

export default function Landing() {
  const { copy } = useI18n()
  usePageMeta(copy.meta.title, copy.meta.description)

  useEffect(() => {
    track('view_landing')
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <Funciones />
        <LaApp />
        <Precios />
        <SensorTeaser />
        <Dudas />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
