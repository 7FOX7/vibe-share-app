import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import './App.css'
import Registration from './pages/Registration'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import CreateVideo from './pages/CreateVideo'
import PostView from './pages/PostView'
import NoPage from './pages/NoPage'
import { AuthProvider } from './contexts/AuthContext'
import { RouteProvider } from './contexts/RouteContext'
import Layer from './components/Shared/Layer'
import { PostsProvider } from './contexts/PostsContext'
import { VideosProvider } from './contexts/VideosContext'

const App = () => { 
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouteProvider>
          <PostsProvider>
            <VideosProvider>
              <Layer>
                <Routes>
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  } />
                  <Route path="/post-view/:id/:username" element={
                    <ProtectedRoute>
                      <PostView />
                    </ProtectedRoute>
                  } />
                  <Route path="/create-post" element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  } />
                  <Route path="/create-video" element={
                    <ProtectedRoute>
                      <CreateVideo />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NoPage />} />
                </Routes>
              </Layer>
            </VideosProvider>
          </PostsProvider>
        </RouteProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App

/*
    the problems: 
    1. when we delete a liked post from the 'liked_post' table, the id is not reset, it is increasing 
    everytime the user is liking/unliking the post
*/