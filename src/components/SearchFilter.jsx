import { useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

const SearchFilter = ({ onFilterChange, questions }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Add click-outside functionality for dropdown
  const dropdownRef = useClickOutside(() => {
    if (showDropdown) {
      setShowDropdown(false)
    }
  })

  const handleSearch = (term) => {
    setSearchTerm(term)
    
    if (!term) {
      onFilterChange(questions)
      return
    }

    const filtered = questions.filter(question => 
      question.title.toLowerCase().includes(term.toLowerCase()) ||
      question.content.toLowerCase().includes(term.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    )
    
    onFilterChange(filtered)
  }

  const handleCategoryFilter = (category) => {
    const filtered = questions.filter(question => 
      question.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    )
    onFilterChange(filtered)
    setShowDropdown(false)
  }

  return (
    <div className="flex gap-2">
      <button className="bg-search-bg text-secondary-text px-4 py-2 rounded-soft hover:bg-gray-200">
        Newest
      </button>
      <button className="bg-search-bg text-secondary-text px-4 py-2 rounded-soft hover:bg-gray-200">
        Unanswered
      </button>
      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-search-bg text-secondary-text px-4 py-2 rounded-soft hover:bg-gray-200"
        >
          More ▼
        </button>
        {showDropdown && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white rounded-soft shadow-lg border border-border-card z-10">
            <div className="p-3 border-b border-border-card">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search fields, topics, tags..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-3 py-2 pr-8 text-sm border border-border-card rounded-soft focus:outline-none focus:ring-2 focus:ring-button-hover"
                />
                <svg className="absolute right-2 top-2.5 w-4 h-4 text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div className="p-2">
              <p className="text-xs font-medium text-secondary-text px-2 py-1">Popular Categories</p>
              <div className="space-y-1">
                {['javascript', 'python', 'react', 'css', 'database', 'api', 'authentication'].map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className="block w-full text-left px-3 py-2 text-sm text-secondary-text hover:bg-gray-100 rounded-soft"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter 