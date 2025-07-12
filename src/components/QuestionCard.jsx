import { useState } from 'react'
import { ThumbsUp, MessageCircle, Eye, EyeOff, FileText, CornerDownRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const QuestionCard = ({ question, onVote, onAnswer, onFurther }) => {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

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
    return tagColors[tag] || 'tag-blue'
  }

  return (
    <div
      className={`relative question-card bg-white border border-border-card rounded-soft p-6 mb-2 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 group cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover Popup removed */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-primary-text mb-2 hover:text-accent-cyan cursor-pointer">
            {question.title}
          </h3>
          <p className="text-secondary-text text-xs mb-3 line-clamp-2">{question.content}</p>
          <div className="tag-container mb-2 flex flex-wrap gap-2">
            {question.is_accepted && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-soft mr-2">
                ✓ Accepted
              </span>
            )}
            {question.tags.map(tag => (
              <span 
                key={tag}
                className={`tag inline-block px-2 py-1 text-xs font-medium rounded-soft ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Left-aligned icon+label buttons */}
          <div className="flex items-center gap-3 mt-1">
            <button className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium rounded-full px-2 py-1 transition">
              <ThumbsUp size={14} className="mr-1" /> Vote
            </button>
            <button className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium rounded-full px-2 py-1 transition">
              <MessageCircle size={14} className="mr-1" /> Answer
            </button>
            <span className="flex items-center gap-1 text-xs text-blue-500 font-medium rounded-full px-2 py-1">
              <Eye size={14} className="mr-1" /> {question.views} Views
            </span>
          </div>
        </div>
        {/* Remove old vertical stats column */}
        {/* Right-side Preview and Answer buttons */}
        <div className="flex flex-col justify-end items-end gap-2 ml-4">
          <button
            className="flex items-center gap-1 text-xs bg-blue-500 text-white rounded-full px-3 py-1 font-medium hover:bg-blue-600 transition shadow-sm"
            onClick={e => { e.stopPropagation(); onFurther && onFurther(); }}
          >
            <FileText size={14} className="mr-1" /> Preview
          </button>
          <button
            className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 rounded-full px-3 py-1 font-medium hover:bg-blue-200 transition shadow-sm"
            onClick={e => { e.stopPropagation(); navigate(`/answer/${question.id}`); }}
          >
            <CornerDownRight size={14} className="mr-1" /> Answer
          </button>
        </div>
      </div>
      {/* User info row (smaller font) */}
      <div className="flex items-center text-xs text-secondary-text mt-3">
        <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
        <span className="font-medium text-primary-text">{question.user.username}</span>
        <span className="mx-1">•</span>
        <span>{question.user.reputation} reputation</span>
        <span className="mx-1">•</span>
        <span>{question.created_at}</span>
      </div>
      {/* Remove the upper row of Vote, Answer, Views */}
      {/* Keep only the bottom row below */}
      <div className="flex gap-6 mt-4">
        <button className="flex items-center gap-1 text-blue-500 font-medium hover:underline text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M14 9V5a3 3 0 00-6 0v4" />
            <path d="M5 15h14l-1.34 5.36A2 2 0 0115.7 22H8.3a2 2 0 01-1.96-1.64L5 15z" />
          </svg>
          Vote ({question.votes})
        </button>
        <button className="flex items-center gap-1 text-blue-500 font-medium hover:underline text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12a2 2 0 012 2z" />
          </svg>
          Answer ({question.answers ? question.answers.length : 0})
        </button>
        <span className="flex items-center gap-1 text-blue-500 font-medium text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          {question.views} Views
        </span>
      </div>
    </div>
  )
}

export default QuestionCard 