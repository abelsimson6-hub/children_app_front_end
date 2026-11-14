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
import Tasks from './pages/Tasks'
import VideoClasses from './pages/VideoClasses'

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
            <Route path='/task' element={<Tasks/>} />
            <Route path='/video' element={<VideoClasses/>} />
            <Route path='/settings' element={<Settings />} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
