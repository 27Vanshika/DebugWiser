import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'

const TAGS = [
  'javascript', 'react', 'python', 'css', 'fastapi', 'authentication', 'database', 'api-design'
]

const AskQuestion = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  })
  const [showPreview, setShowPreview] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleTag = (tag) => {
    setSelectedTags(selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Prepare tags array
      const tagArray = formData.tags.split(',').map(t => t.trim()).filter(t => t)
      
      // Prepare payload
      const payload = {
        title: formData.title,
        description: formData.content,
        tags: tagArray
      }
      
      // Get auth token (assuming you store it in localStorage or context)
      const token = localStorage.getItem('token')?.trim() // Adjust this based on your auth implementation
      console.log("Token: ", token);
      
      const response = await fetch('http://localhost:8000/api/questions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include auth token if required
          'x-token': token, // Include ngrok token if 
          "test": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to post question')
      }
      
      // Success - redirect to home or question detail page
      alert('Question posted successfully!')
      navigate('/') // or navigate to the new question: navigate(`/questions/${data.id}`)
      
    } catch (err) {
      setError(err.message || 'An error occurred while posting the question')
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

  const getTagColor = (tag) => {
    const tagColors = {
      'react': 'tag-blue',
      'javascript': 'tag-yellow',
      'python': 'tag-green',
      'css': 'tag-violet',
      'fastapi': 'tag-red',
      'django': 'tag-green',
      'authentication': 'tag-blue',
      'api-design': 'tag-yellow',
      'frontend': 'tag-violet',
      'layout': 'tag-green',
      'database': 'tag-red',
      'performance': 'tag-green',
      'async': 'tag-blue',
      'es6': 'tag-yellow'
    }
    return tagColors[tag.toLowerCase()] || 'tag-blue'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>
      
      <div className="max-w-4xl mx-auto py-8 px-4 mt-16">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold text-primary-text mb-6">Ask a Question</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-soft">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Question Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover"
                placeholder="What's your question? Be specific."
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Question Details
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-3 border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover resize-none"
                placeholder="Provide more context about your question..."
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-text mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover"
                placeholder="Add tags separated by commas (e.g., react, javascript, api)"
                disabled={isLoading}
              />
              <p className="text-xs text-secondary-text mt-1">
                Popular tags: React, JavaScript, Python, CSS, API, Authentication
              </p>
            </div>

            {showPreview && (
              <div>
                <h3 className="text-lg font-semibold text-primary-text mb-3">Preview</h3>
                <div className="bg-search-bg border border-border-card rounded-soft p-4">
                  <h4 className="text-lg font-semibold text-primary-text mb-2">{formData.title || 'Your question title will appear here'}</h4>
                  <p className="text-secondary-text text-sm mb-3">{formData.content || 'Your question content will appear here'}</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags && formData.tags.split(',').map(tag => {
                      const trimmedTag = tag.trim()
                      return trimmedTag ? (
                        <span 
                          key={trimmedTag}
                          className={`tag inline-block px-2 py-1 text-xs font-medium rounded-soft ${getTagColor(trimmedTag)}`}
                        >
                          {trimmedTag}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-border-card">
              <button 
                type="submit" 
                className="bg-button-hover text-white px-6 py-3 rounded-soft hover:bg-red-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Posting...' : 'Post Question'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowPreview(!showPreview)}
                className="bg-search-bg text-secondary-text px-6 py-3 rounded-soft hover:bg-gray-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-soft hover:bg-gray-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion