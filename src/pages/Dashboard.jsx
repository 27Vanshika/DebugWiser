import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import QuestionCard from '../components/QuestionCard'
import { sampleQuestions } from '../data/questions'
import useClickOutside from '../hooks/useClickOutside'

const FILTERS = [
  { id: 'newest', label: 'Newest' },
  { id: 'answered', label: 'Answered' },
  { id: 'unanswered', label: 'Unanswered' },
  { id: 'popular', label: 'Popular' },
]
const MORE_CATEGORIES = [
  'React', 'JavaScript', 'CSS', 'Python', 'API', 'Authentication', 'Frontend', 'Backend', 'DevOps', 'UI/UX'
]

// Modal component for question details
function QuestionModal({ open, onClose, question }) {
  const [showMore, setShowMore] = useState(false)
  const modalRef = useClickOutside(() => {
    if (open) {
      onClose()
    }
  })

  if (!open || !question) return null

  // Use the first answer if available, else dummy
  const answer = question.answers && question.answers.length > 0
    ? question.answers[0]
    : {
        content: 'No answer yet.',
      }

  const isLong = answer.content.length > 200
  const short = answer.content.slice(0, 200) + (isLong ? '...' : '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn">
        {/* Back Button - Top Left of Modal */}
        <button
          className="absolute top-3 left-3 text-gray-400 hover:text-blue-500 transition p-1 rounded-lg hover:bg-blue-50"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2 mt-8">{question.title}</h2>
        <p className="mb-4 text-gray-600">{question.content}</p>
        <div className="mb-4">
          <div className="font-semibold mb-1">Answer:</div>
          <div className="relative text-gray-800 whitespace-pre-line">
            {showMore || !isLong ? answer.content : short}
          </div>
          {isLong && (
            <button
              className="mt-2 text-blue-500 hover:underline text-sm font-medium"
              onClick={() => setShowMore(v => !v)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const QUESTION_TABS = [
  { id: 'all', label: 'All Questions' },
  { id: 'my', label: 'My Questions' },
  { id: 'answered', label: 'Answered Questions' },
  { id: 'trending', label: 'Trending Questions' },
];

const Dashboard = ({ setShowAuthModal }) => {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('all')
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedQ, setSelectedQ] = useState(null)
  const [activeFilter, setActiveFilter] = useState('newest')
  const [showMore, setShowMore] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questionTab, setQuestionTab] = useState('all');
  const [moreSearch, setMoreSearch] = useState('');
  
  // Add click-outside functionality for More dropdown
  const moreDropdownRef = useClickOutside(() => {
    if (showMore) {
      setShowMore(false)
    }
  })

  useEffect(() => {
    // Load questions from localStorage and combine with sample data
    const newQuestions = JSON.parse(localStorage.getItem('newQuestions') || '[]')
    const allQuestions = [...newQuestions, ...sampleQuestions]
    setQuestions(allQuestions)
    setFilteredQuestions(allQuestions)
  }, [])

  // Search bar filtering logic
  const handleSearch = (searchValue) => {
    let filtered = questions
    if (searchValue) {
      const lower = searchValue.toLowerCase()
      filtered = filtered.filter(q =>
        q.title.toLowerCase().includes(lower) ||
        q.content.toLowerCase().includes(lower) ||
        (q.tags && q.tags.some(tag => tag.toLowerCase().includes(lower)))
      )
    }
    // Apply filter bar logic
    filtered = applyFilterBar(filtered)
    setFilteredQuestions(filtered)
  }

  // Filter bar logic
  const applyFilterBar = (list) => {
    let filtered = [...list]
    if (activeFilter === 'answered') {
      filtered = filtered.filter(q => q.answers && q.answers.length > 0)
    } else if (activeFilter === 'unanswered') {
      filtered = filtered.filter(q => !q.answers || q.answers.length === 0)
    } else if (activeFilter === 'popular') {
      filtered = filtered.sort((a, b) => (b.votes + b.views) - (a.votes + a.views))
    } else if (activeFilter === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    if (selectedCategory) {
      filtered = filtered.filter(q => q.tags && q.tags.includes(selectedCategory))
    }
    return filtered
  }

  // When filter bar changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setSelectedCategory(null)
    setFilteredQuestions(applyFilterBar(questions))
  }
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    setActiveFilter('')
    setFilteredQuestions(applyFilterBar(questions))
    setShowMore(false)
  }

  const handleAskQuestion = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
    } else {
      // Navigate to ask question page
      window.location.href = '/ask'
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    switch(tab) {
      case 'all':
        setFilteredQuestions(questions)
        break
      case 'ask':
        break
      case 'my':
        const myQuestions = questions.filter(q => 
          q.user.username === 'current_user' || q.user.username === 'john_doe'
        )
        setFilteredQuestions(myQuestions)
        break
      case 'trending':
        const trendingQuestions = questions.filter(q => 
          q.votes > 10 || q.views > 200
        ).sort((a, b) => (b.votes + b.views) - (a.votes + a.views))
        setFilteredQuestions(trendingQuestions)
        break
      default:
        setFilteredQuestions(questions)
    }
  }

  const getTabTitle = () => {
    switch(activeTab) {
      case 'all': return 'All Questions'
      case 'ask': return 'Ask a Question'
      case 'my': return 'My Questions'
      case 'trending': return 'Trending Questions'
      default: return 'All Questions'
    }
  }

  // Tab filtering logic
  const getTabFilteredQuestions = () => {
    if (questionTab === 'all') return filteredQuestions;
    if (questionTab === 'my') {
      return filteredQuestions.filter(q => q.user.username === 'current_user' || q.user.username === 'john_doe');
    }
    if (questionTab === 'answered') {
      return filteredQuestions.filter(q => q.answers && q.answers.length > 0);
    }
    if (questionTab === 'trending') {
      return filteredQuestions.filter(q => q.votes > 10 || q.views > 200);
    }
    return filteredQuestions;
  };

  // Filtered categories for More dropdown
  const filteredCategories = MORE_CATEGORIES.filter(cat =>
    cat.toLowerCase().includes(moreSearch.toLowerCase())
  );

  // Handler for All Questions click
  const handleAllQuestionsClick = () => {
    setQuestionTab('all');
    setActiveFilter('newest');
    setSelectedCategory(null);
    setFilteredQuestions(questions); // Show all questions
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title, Ask Question Button, and Tabs */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-transparent mr-2
                ${questionTab === 'all' ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-secondary-text hover:bg-blue-500 hover:text-white'}`}
              onClick={handleAllQuestionsClick}
            >
              All Questions
            </button>
            <div className="flex flex-row gap-2 flex-wrap">
              {QUESTION_TABS.slice(1).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setQuestionTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-transparent
                    ${questionTab === tab.id ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-secondary-text hover:bg-blue-500 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={handleAskQuestion}
            className="bg-accent-cyan text-white px-6 py-3 rounded-soft hover:bg-accent-cyan-dark font-medium transition"
          >
            Ask Question
          </button>
        </div>
        {/* Thin stroke line below the four tabs */}
        <div className="w-full border-b border-gray-200 mb-6" />
        {/* Right-aligned filter buttons */}
        <div className="flex flex-row gap-2 justify-end mb-6 flex-wrap">
          {['newest', 'answered', 'unanswered'].map(f => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border border-transparent
                ${activeFilter === f ? 'bg-accent-cyan text-white shadow' : 'bg-gray-100 text-secondary-text hover:bg-accent-cyan hover:text-white'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMore(v => !v)}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition-colors border border-transparent
                ${selectedCategory ? 'bg-accent-cyan text-white shadow' : 'bg-gray-100 text-secondary-text hover:bg-accent-cyan hover:text-white'}`}
            >
              More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMore && (
              <div ref={moreDropdownRef} className="absolute right-0 mt-2 w-56 bg-white border border-border-card rounded-lg shadow-lg z-50 animate-fadeIn p-2">
                {/* Search bar inside More dropdown */}
                <input
                  type="text"
                  className="w-full mb-2 px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan transition text-sm bg-gray-50 placeholder-gray-400"
                  placeholder="Search categories..."
                  value={moreSearch}
                  onChange={e => setMoreSearch(e.target.value)}
                />
                {filteredCategories.length === 0 ? (
                  <div className="text-gray-400 text-sm px-3 py-2">No categories found</div>
                ) : (
                  filteredCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setMoreSearch(''); handleCategorySelect(cat); }}
                      className={`block w-full text-left px-4 py-2 text-sm rounded hover:bg-accent-cyan hover:text-white transition-colors
                        ${selectedCategory === cat ? 'bg-accent-cyan text-white' : ''}`}
                    >
                      {cat}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          {selectedCategory && (
            <span className="ml-2 px-3 py-1 rounded-full bg-accent-cyan text-white text-xs font-medium">{selectedCategory}</span>
          )}
        </div>
        {/* Questions List */}
        <div className="space-y-4">
          {getTabFilteredQuestions().length === 0 ? (
            <div className="text-center py-8 text-secondary-text">
              <p className="text-lg font-medium">No questions found</p>
              <p className="text-sm mt-2">Try a different filter or ask a new question</p>
            </div>
          ) : (
            getTabFilteredQuestions().map(question => (
              <QuestionCard
                key={question.id}
                question={question}
                onVote={() => !isAuthenticated && setShowAuthModal(true)}
                onAnswer={() => !isAuthenticated && setShowAuthModal(true)}
                onFurther={() => {
                  setSelectedQ(question)
                  setModalOpen(true)
                }}
              />
            ))
          )}
        </div>
        <QuestionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          question={selectedQ}
        />
      </div>
    </>
  )
}

export default Dashboard 