import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import NoPage from './pages/NoPage'
import Login from './pages/Login'
import Home from './pages/Home'
import AuthContext from './contexts/AuthContext'

function App() {
  const [user, setUser] = useState(null); 
  return (
    <>
      <AuthContext.Provider value={setUser}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App

/*
  1. what we want to accomplish: 
  we want to implement a better way of handling the case when the user is not logged in, he is
  transferred to the login page first. 

  2. what we can do: 
  1. Create a context; 
  2. import this inside <App /> component
  3. use it as a wrapper
  4. give it a value of the 'setIsLoggedIn' 
  5. in the input field section when clicking to 'Login' set the value to 'true'
*/