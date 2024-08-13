import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import './App.css'
import CreatePost from './pages/CreatePost'
import NoPage from './pages/NoPage'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider } from './contexts/AuthContext'
import { PostModeProvider } from './contexts/PostModeContext'
import Layer from './components/Shared/Layer'

const App = () => { 
  return (
    <React.StrictMode>
      <AuthProvider>
        <PostModeProvider>
          <Layer>
            <Routes>
              {/* <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/create-post" element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                } /> */}
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Layer>
        </PostModeProvider>
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