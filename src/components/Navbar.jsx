import React from 'react'
import { useLocation } from "react-router-dom";



function Navbar() {



   const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/activities": "Learning Activities",
    "/calendar": "Learning Calendar",
    "/reports": "Progress Reports",
    "/settings": "Settings",
  };

  return (
     <div className="navbar">
      <h3>{pageTitles[location.pathname] || "Kids Growth"}</h3>

      <div>
        <span>Welcome, Parent</span>
      </div>


    </div>
  )
}

export default Navbar

// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import { useColorScheme } from '@mui/material/styles'
// import IconButton from '@mui/material/IconButton'
// import LightModeIcon from '@mui/icons-material/LightMode'
// import DarkModeIcon from '@mui/icons-material/DarkMode'
// import { Box } from '@mui/material'

// function Navbar() {
//   const location = useLocation()
//   const { mode, setMode } = useColorScheme()

//   const pageTitles = {
//     '/': 'Dashboard',
//     '/activities': 'Learning Activities',
//     '/calendar': 'Learning Calendar',
//     '/reports': 'Progress Reports',
//     '/settings': 'Settings',
//   }

//   // useColorScheme returns undefined mode on first render
//   if (!mode) return null

//   const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark')

//   return (
//     <div className="navbar">
//       <Box
//         className="navbar"
//         sx={{ bgcolor: 'background.paper', color: 'text.primary', display: 'flex', justifyContent: 'space-between', p: 2,width:'100' }}
//       >
//       <h3>{pageTitles[location.pathname] || 'Kids Growth'}</h3>

//       <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//         <span>Welcome, Parent</span>
//         <IconButton onClick={toggleMode} color="inherit" aria-label="Toggle theme">
//           {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
//         </IconButton>
//       </div>
//       </Box>
//     </div>
//   )
// }

// export default Navbar
