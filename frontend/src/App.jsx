import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import './App.css'
import NoPage from './pages/NoPage'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  // const [user, setUser] = useState(null); 
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App

/*
  assuming we are in our App.jsx file: 

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={
      <PrivateRoute user={user}>
        <Home />
      </PrivateRoute>
    }>
    </Route>
  </Routes>
*/