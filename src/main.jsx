import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'


// const theme = createTheme({
//   colorSchemes: {
//     dark: true, // enables light + dark with system detection
//   },
// })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App />
//     </ThemeProvider>
//   </BrowserRouter>
// )
