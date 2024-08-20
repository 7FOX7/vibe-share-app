import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import './App.css'
import CreatePost from './pages/CreatePost'
import NoPage from './pages/NoPage'
import Registration from './pages/Registration'
import Home from './pages/Home'
import { AuthProvider } from './contexts/AuthContext'
import { RouteProvider } from './contexts/RouteContext'
import Layer from './components/Shared/Layer'
import { PostsProvider } from './contexts/PostsContext'
import PostView from './pages/PostView'

const App = () => { 
  return (
    <React.StrictMode>
      <AuthProvider>
        <RouteProvider>
          <PostsProvider>
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
                <Route path="*" element={<NoPage />} />
              </Routes>
            </Layer>
          </PostsProvider>
        </RouteProvider>
      </AuthProvider>
    </React.StrictMode>
  )
}

export default App

/*
    <Route path='/' element=home />
    <Route path='/posts/:postId' element=PostLarge />

    const PostLarge = () => {
      const {postId} = useParams()

      function extractPost() {

      }

      return (
        <div>

        </div>
      )
    }
*/