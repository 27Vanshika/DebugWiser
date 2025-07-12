import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import useClickOutside from '../hooks/useClickOutside'

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const modalRef = useClickOutside(() => {
    if (isOpen) {
      onClose()
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const endpoint = "http://localhost:8000/api/login"
      const payload = {
        email: formData.email,
        password: formData.password
      }
      
      // Add username to payload for signup
      if (!isLogin) {
        payload.username = formData.username
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed')
      }
      
      // Assuming the API returns user data and token
      const { access_token } = data
      
      login(access_token)
      onSuccess()
      
    } catch (err) {
      setError(err.message || 'An error occurred during authentication')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
      <div ref={modalRef} className="bg-white rounded-soft p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary-text">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <button 
            onClick={onClose}
            className="text-secondary-text hover:text-primary-text text-2xl"
            disabled={isLoading}
          >
            &times;
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-soft">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-1">
                Username
              </label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover" 
                required={!isLogin}
                disabled={isLoading}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-secondary-text mb-1">
              Email
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover" 
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-text mb-1">
              Password
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover" 
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <button 
              type="submit" 
              className="flex-1 bg-button-hover text-white py-2 rounded-soft hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="flex-1 bg-search-bg text-secondary-text py-2 rounded-soft hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthModal