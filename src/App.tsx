import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollRestoration from './components/ScrollRestoration'
import Gracias from './pages/Gracias'
import Landing from './pages/Landing'
import QuieroFlory from './pages/QuieroFlory'

function App() {
  return (
    <>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiero-flory" element={<QuieroFlory />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
