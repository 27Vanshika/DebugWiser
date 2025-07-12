import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Bell, Bookmark } from 'lucide-react'
import NotificationSlideOver from './NotificationSlideOver'

const Navbar = ({ onSearch }) => {
  const [search, setSearch] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const navigate = useNavigate()

  // Dummy notification count
  const notificationCount = 3

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // Handle search submit (icon click or Enter)
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(search)
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-border-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 justify-between w-full gap-4">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                StackIt
              </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 flex justify-center items-center mx-4">
              <form className="relative w-full max-w-md" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base bg-gray-50 placeholder-gray-400"
                  placeholder="Search questions..."
                  value={search}
                  onChange={handleSearch}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-blue-100 transition"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Right: Icons and Profile */}
            <div className="flex items-center space-x-4 relative">
              {/* Notification Bell */}
              <button
                className="relative p-2 rounded-full hover:bg-blue-100 transition group"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white font-bold">
                    {notificationCount}
                  </span>
                )}
              </button>
              {/* Bookmark Icon */}
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 transition overflow-hidden border-2 border-blue-200"
                onClick={() => navigate('/bookmarks')}
                aria-label="Bookmarks"
              >
                <Bookmark className="w-6 h-6 text-blue-500" />
              </button>
              {/* Profile Icon */}
              <button
                className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 transition overflow-hidden border-2 border-blue-200"
                onClick={() => navigate('/profile')}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Notification Slide-Over */}
      <NotificationSlideOver 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  )
}

export default Navbar 