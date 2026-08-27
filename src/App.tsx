import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollRestoration from './components/ScrollRestoration'
import EliminarCuenta from './pages/EliminarCuenta'
import Gracias from './pages/Gracias'
import Landing from './pages/Landing'
import Privacidad from './pages/Privacidad'
import QuieroFlory from './pages/QuieroFlory'
import Terminos from './pages/Terminos'

function App() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiero-flory" element={<QuieroFlory />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        {/* URL pública declarada en las tiendas de apps: no cambiar el slug. */}
        <Route path="/eliminar-cuenta" element={<EliminarCuenta />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
