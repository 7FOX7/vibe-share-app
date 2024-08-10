import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import './App.css'
import NoPage from './pages/NoPage'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider } from './contexts/AuthContext'
import Footer from './components/Shared/Footer'
import { ScreenHeightProvider } from './contexts/ScreenHeightContext'

const App = () => { 
  const [screenHeight, setScreenHeight] = useState(innerHeight); 

  useEffect(() => {
    function handleResize() {
      const height = innerHeight
      console.log('height was updated to ' + height)
      setScreenHeight(height)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }></Route> */}
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <ScreenHeightProvider screenHeight={screenHeight}>
          <Footer />
        </ScreenHeightProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App

/*
  assuming we are in our App.jsx file: 

  <ProtectedRoute>
    <Route path="/" element={<Home />}>
    
    </Route>
  </ProtectedRoute>
*/