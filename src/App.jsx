import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const loggedIn = false; 

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} /> 
      </Routes>
    </>
  )
}

export default App
