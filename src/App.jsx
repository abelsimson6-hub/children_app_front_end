import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Activities from './pages/Activities'
import CalenderPage from './pages/CalenderPage'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/activities' element={<Activities />} />
            <Route path='/calender' element={<CalenderPage />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/settings' element={<Settings />} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
