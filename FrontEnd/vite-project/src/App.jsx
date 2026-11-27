import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './group1/Home'
import About from './group1/About'
import Dashboard from './group2/Dashboard'
import UseStateExample from './UseStateExample'
import EventHandlingExample from './EventHandlingExample'
import ConditionalAndListExample from './ConditionalAndListExample'
import RealLifeApi from './realLifeApi'
import AxiosRealLifeApi from './axiosRealLifeApi'
import StudentsApi from './StudentsApi'

function App() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <Navbar name="Sayem" age={22} />

      <div className="border p-4 rounded mt-4">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/group1/home" element={<Home />} />
          <Route path="/group1/about" element={<About />} />
          <Route path="/group2/dashboard" element={<Dashboard />} />
          <Route path="/usestate" element={<UseStateExample />} />
          <Route path="/event-handling" element={<EventHandlingExample />} />
          <Route path="/conditional-list" element={<ConditionalAndListExample />} />
          <Route path="/real-life-api" element={<RealLifeApi />} />
          <Route path="/axios-real-life-api" element={<AxiosRealLifeApi />} />
          <Route path="/students" element={<StudentsApi />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
