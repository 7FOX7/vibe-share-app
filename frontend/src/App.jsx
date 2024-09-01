import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './utils/components/ProtectedRoute'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Clubs from './pages/Clubs'
import Notifications from './pages/Notifications'
import Chats from './pages/Chats'
import CreatePost from './pages/CreatePost'
import CreateVideo from './pages/CreateVideo'
import PostView from './pages/PostView'
import VideoView from './pages/VideoView'
import Comments from './pages/Comments'
import AskLocation from './pages/AskLocation'
import NoPage from './pages/NoPage'
import Layer from './components/Shared/Layer'
import { ScreenSizeProvider } from './contexts/ScreenSizeContext'
import { AuthProvider } from './contexts/AuthContext'
import { GeolocationProvider } from './contexts/GeolocationContext'
import { ClubsProvider } from './contexts/ClubsContext'
import { PostsProvider } from './contexts/PostsContext'
import { VideosProvider } from './contexts/VideosContext'
import { CommentsProvider } from './contexts/CommentsContext'
import { PostAuthorProvider } from './contexts/PostAuthorContext'
import { SelectedButtonProvider } from './contexts/SelectedButtonContext'

const App = () => { 
  return (
    <React.StrictMode>
      <ScreenSizeProvider>
        <AuthProvider>
          <GeolocationProvider>
            <ClubsProvider>
              <CommentsProvider>
                <PostsProvider>
                  <VideosProvider>
                    <PostAuthorProvider>
                      <SelectedButtonProvider>
                        <Layer>
                          <Routes>
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/" element={
                              <ProtectedRoute>
                                <Home />
                              </ProtectedRoute>
                            } />
                            <Route path="/notifications" element={
                              <ProtectedRoute>
                                <Notifications />
                              </ProtectedRoute>
                            } />
                            <Route path="/chats" element={
                              <ProtectedRoute>
                                <Chats />
                              </ProtectedRoute>
                            } />
                            <Route path="/clubs" element={
                              <ProtectedRoute>
                                <Clubs />
                              </ProtectedRoute>
                            } />
                            <Route path="/post-view/:id/:author" element={
                              <ProtectedRoute>
                                <PostView />
                              </ProtectedRoute>
                            } />
                            <Route path="/video-view" element={
                              <ProtectedRoute>
                                <VideoView />
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
                            <Route path="/comments/:type/:id/:author" element={
                              <ProtectedRoute>
                                <Comments />
                              </ProtectedRoute>
                            } />
                            <Route path="/ask-location" element={
                              <ProtectedRoute>
                                <AskLocation />
                              </ProtectedRoute>
                            } />
                            <Route path="*" element={<NoPage />} />
                          </Routes>
                        </Layer>
                      </SelectedButtonProvider>
                    </PostAuthorProvider>
                  </VideosProvider>
                </PostsProvider>
              </CommentsProvider>
            </ClubsProvider>
          </GeolocationProvider>
        </AuthProvider>
      </ScreenSizeProvider>
    </React.StrictMode>
  )
}

export default App

/*
    the problems: 
    1. when we delete a liked post from the 'liked_post' table, the id is not reset, it is increasing 
    everytime the user is liking/unliking the post
*/