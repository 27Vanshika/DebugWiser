import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AskQuestion from './pages/AskQuestion'
import AuthModal from './components/AuthModal'
import { AuthProvider } from './context/AuthContext'
import AnswerPage from './pages/AnswerPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard setShowAuthModal={setShowAuthModal} />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/answer/:id" element={<AnswerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        {showAuthModal && (
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => {
              setIsAuthenticated(true)
              setShowAuthModal(false)
            }}
          />
        )}
      </div>
    </AuthProvider>
  )
}

export default App 