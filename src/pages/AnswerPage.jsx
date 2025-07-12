import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FileText, Send } from 'lucide-react'
import BackButton from '../components/BackButton'

// Dummy data for demonstration
const dummyQuestions = [
  {
    id: 1,
    title: 'How to implement JWT authentication in React?',
    content: 'I\'m building a React app and need to implement JWT authentication. What\'s the best practice for storing tokens and handling refresh logic?',
    tags: ['react', 'jwt', 'authentication'],
    is_accepted: true,
    user: { username: 'john_doe', reputation: 1250 },
    created_at: '2 days ago',
    answers: [
      {
        id: 1,
        content: 'You can use libraries like axios for HTTP requests and store the JWT in localStorage or httpOnly cookies. Consider using refresh tokens for better security and implement proper error handling. Make sure to never expose sensitive tokens to the client-side JavaScript if possible. This answer is intentionally long to demonstrate the Show More/Show Less toggle. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.',
        user: { username: 'auth_expert', reputation: 2500 },
        created_at: '1 day ago',
        votes: 15
      },
      {
        id: 2,
        content: 'I recommend using a state management solution like Redux or Context API to handle authentication state. Store tokens securely and implement proper logout functionality. Also consider using interceptors for automatic token refresh.',
        user: { username: 'react_dev', reputation: 1800 },
        created_at: '2 days ago',
        votes: 8
      },
      {
        id: 3,
        content: 'For production apps, consider using specialized auth libraries like Auth0 or Firebase Auth. They handle many security concerns automatically and provide robust token management.',
        user: { username: 'security_guru', reputation: 3200 },
        created_at: '3 days ago',
        votes: 12
      }
    ]
  }
]

const AnswerPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const question = dummyQuestions[0] // In real app, find by id
  const [showMore, setShowMore] = useState({})
  const [showSummary, setShowSummary] = useState({})
  const [showCompareSummary, setShowCompareSummary] = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleShowMore = (answerId) => {
    setShowMore(prev => ({ ...prev, [answerId]: !prev[answerId] }))
  }

  const handleShowSummary = (answerId) => {
    setShowSummary(prev => ({ ...prev, [answerId]: !prev[answerId] }))
  }

  const handleSendAnswer = async () => {
    if (!answerText.trim()) {
      alert('Please enter your answer before submitting.')
      return
    }

    setIsSubmitting(true)
    const token = localStorage.getItem('token')?.trim()
    console.log("Token: ", token);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:8000/api/answers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include auth token if required
          'x-token': token, // Include ngrok token if 
          "test": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question_id: id,
          answer_text: answerText,
          votes: 0
        })
      })

      if (response.ok) {
        const newAnswer = await response.json()
        // In a real app, you'd update your state or refetch the question
        alert('Answer posted successfully!')
        setAnswerText('')
        // Optionally reload the page or update the answers list
        // window.location.reload()
      } else {
        const error = await response.json()
        alert(`Error posting answer: ${error.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error posting answer:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAnswerSummary = (answerId) => {
    const summaries = {
      1: 'This answer covers JWT storage best practices, recommends using axios for HTTP requests, and emphasizes security considerations like refresh tokens and proper error handling.',
      2: 'This answer suggests using Redux or Context API for state management, emphasizes secure token storage, and recommends implementing interceptors for automatic token refresh.',
      3: 'This answer recommends using specialized auth libraries like Auth0 or Firebase Auth for production apps, highlighting their automatic security handling and robust token management.'
    }
    return summaries[answerId] || 'Summary not available.'
  }

  const getCompareSummary = () => {
    return 'Combined Summary: The three answers provide a comprehensive approach to JWT authentication in React. The first answer covers basic implementation with axios and security best practices. The second answer focuses on state management using Redux/Context API. The third answer recommends using specialized auth libraries for production. Together, they suggest starting with basic implementation, adding proper state management, and considering specialized solutions for production apps.'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>
      
      <div className="max-w-4xl mx-auto py-8 px-4 mt-16">
        {/* Question Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-1">{question.title}</h2>
          <p className="mb-2 text-gray-600 text-sm">{question.content}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {question.is_accepted && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-soft mr-2">
                ✓ Accepted
              </span>
            )}
            {question.tags.map(tag => (
              <span key={tag} className="inline-block px-2 py-1 text-xs font-medium rounded-soft bg-blue-100 text-blue-600">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post Answer Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Your Answer</h3>
          <div className="space-y-4">
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your answer here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px]"
              rows="6"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSendAnswer}
                disabled={isSubmitting || !answerText.trim()}
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={16} />
                {isSubmitting ? 'Posting...' : 'Post Answer'}
              </button>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Answers ({question.answers.length})</h3>
          
          {question.answers.map((answer, index) => {
            const isLong = answer.content.length > 200
            const short = answer.content.slice(0, 200) + (isLong ? '...' : '')
            
            return (
              <div key={answer.id} className="bg-white rounded-xl shadow p-6">
                {/* Answer Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{answer.user.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{answer.user.username}</div>
                    <div className="text-xs text-gray-500">{answer.user.reputation} reputation • {answer.created_at}</div>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    {answer.votes} votes
                  </div>
                </div>

                {/* Answer Content */}
                <div className="mb-3">
                  <div className="text-gray-800 whitespace-pre-line">
                    {showMore[answer.id] || !isLong ? answer.content : short}
                  </div>
                  {isLong && (
                    <button
                      className="mt-2 text-blue-500 hover:underline text-sm font-medium"
                      onClick={() => handleShowMore(answer.id)}
                    >
                      {showMore[answer.id] ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>

                {/* Individual Summarize Button */}
                <button
                  className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition text-sm flex items-center gap-2"
                  onClick={() => handleShowSummary(answer.id)}
                >
                  <FileText size={16} /> {showSummary[answer.id] ? 'Hide Summary' : 'Summarize'}
                </button>
                
                {showSummary[answer.id] && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg transition-all duration-300 animate-fadeIn text-blue-800 text-sm">
                    {getAnswerSummary(answer.id)}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Compare All Answers Section */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <button
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-base flex items-center justify-center gap-2"
            onClick={() => setShowCompareSummary(v => !v)}
          >
            <FileText size={18} /> {showCompareSummary ? 'Hide Combined Summary' : 'Compare All Answers'}
          </button>
          
          {showCompareSummary && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg transition-all duration-300 animate-fadeIn text-blue-800">
              <h4 className="font-semibold mb-2">Combined Summary</h4>
              <p className="text-sm leading-relaxed">{getCompareSummary()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnswerPage