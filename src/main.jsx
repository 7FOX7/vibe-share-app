import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material'
import theme from './theme/theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </Router>
)
