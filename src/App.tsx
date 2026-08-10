import ComoFunciona from './components/ComoFunciona'
import CtaFinal from './components/CtaFinal'
import Dudas from './components/Dudas'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Precios from './components/Precios'
import QueMide from './components/QueMide'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <QueMide />
        <Precios />
        <Dudas />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}

export default App
