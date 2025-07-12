import { useState } from 'react';
import { Eye, EyeOff, Edit2, Bookmark, CheckCircle, MessageCircle, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BackButton from '../components/BackButton';

const dummyUser = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'Mansij Gupta',
  handle: 'mansijgupta',
  role: 'Super Admin',
  firstName: 'Mansij',
  lastName: 'Gupta',
  email: 'mansijgupta23@gmail.com',
  phone: '(7637)(3767)',
  bio: 'Super Admin',
};
const dummyQuestions = [
  { id: 1, title: 'How to implement JWT authentication in React?', status: 'Accepted', tags: ['react', 'jwt'], date: '2 days ago' },
  { id: 2, title: 'Best practices for API design with FastAPI', status: 'Unanswered', tags: ['python', 'fastapi'], date: '1 day ago' },
];
const dummyAnswers = [
  { id: 1, question: 'How to implement JWT authentication in React?', preview: 'You can use libraries like axios...', status: 'Accepted' },
  { id: 2, question: 'Best practices for API design with FastAPI', preview: 'Use Pydantic models for validation...', status: 'Upvoted' },
];
const dummyBookmarks = [
  { id: 1, title: 'CSS Grid vs Flexbox: When to use which?', status: 'Accepted', tags: ['css', 'frontend'], date: '3 days ago' },
];
const dummyLogs = [
  { type: 'question', text: 'Asked a question', time: '2 hours ago' },
  { type: 'answer', text: 'Answered a question', time: '1 hour ago' },
  { type: 'vote', text: 'Voted on a question', time: '30 min ago' },
  { type: 'bookmark', text: 'Bookmarked a question', time: '10 min ago' },
  { type: 'edit', text: 'Edited profile', time: 'just now' },
];

const TABS = [
  { id: 'general', label: 'General Info' },
  { id: 'questions', label: 'My Questions' },
  { id: 'answers', label: 'My Answers' },
  { id: 'bookmarked', label: 'Bookmarked' },
  { id: 'logs', label: 'Activity Logs' },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState(dummyUser);
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <BackButton />
      </div>
      
      <div className="max-w-3xl mx-auto py-8 px-2 mt-16">
        {/* Top Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center gap-6 mb-6">
          {/* Avatar and Details Row */}
          <div className="flex flex-row items-center gap-6 flex-1 w-full">
            <img src={profile.avatar} alt="avatar" className="w-20 h-20 rounded-full border-4 border-blue-100 object-cover" />
            <div className="flex flex-col gap-1">
              <div className="text-lg font-bold text-primary-text">{profile.name}</div>
              <div className="text-xs text-blue-500 font-semibold">@{profile.handle}</div>
              <div className="text-xs text-gray-500">{profile.role}</div>
            </div>
          </div>
          {/* Edit/Logout Buttons */}
          <div className="flex flex-col items-end gap-2">
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 font-medium text-xs shadow transition"
              onClick={() => setEditProfile(true)}
            >
              <Edit2 size={16} /> Edit
            </button>
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 font-medium text-xs shadow transition"
              onClick={logout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors border-b-2
                ${activeTab === tab.id ? 'border-blue-500 text-blue-600 bg-white' : 'border-transparent text-secondary-text hover:text-blue-600 hover:bg-blue-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow p-6 text-sm">
          {activeTab === 'general' && (
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">First Name</label>
                  <input className="w-full rounded-lg border border-gray-200 px-3 py-2" defaultValue={profile.firstName} />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Last Name</label>
                  <input className="w-full rounded-lg border border-gray-200 px-3 py-2" defaultValue={profile.lastName} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium">Email Address</label>
                  <input className="w-full rounded-lg border border-gray-200 px-3 py-2" defaultValue={profile.email} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium">Phone Number</label>
                  <input className="w-full rounded-lg border border-gray-200 px-3 py-2" defaultValue={profile.phone} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1 font-medium">Short Bio</label>
                  <textarea className="w-full rounded-lg border border-gray-200 px-3 py-2" defaultValue={profile.bio} rows={2} />
                </div>
              </div>
              {/* Change Password Section */}
              <div className="mt-2">
                <label className="block mb-1 font-medium">Change Password</label>
                <div className="flex gap-2 mb-2">
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-10"
                      placeholder="New Password"
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowPassword(v => !v)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="relative w-full">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-10"
                      placeholder="Confirm Password"
                    />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirm(v => !v)}>
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 text-xs mt-2">
                  <input type="checkbox" className="rounded" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                  Remember Me
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition">Save Draft</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">Update</button>
              </div>
            </form>
          )}
          {activeTab === 'questions' && (
            <div className="flex flex-col gap-4">
              {dummyQuestions.map(q => (
                <div key={q.id} className="bg-blue-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-medium text-blue-700 text-sm mb-1">{q.title}</div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {q.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200">{tag}</span>
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${q.status === 'Accepted' ? 'text-green-600' : 'text-gray-400'}`}>{q.status}</span>
                    <span className="text-xs text-gray-400 ml-2">{q.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 text-xs font-medium hover:bg-blue-200 transition">Edit</button>
                    <button className="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-xs font-medium hover:bg-red-200 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'answers' && (
            <div className="flex flex-col gap-4">
              {dummyAnswers.map(a => (
                <div key={a.id} className="bg-blue-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-medium text-blue-700 text-sm mb-1">{a.question}</div>
                    <div className="text-xs text-gray-500 mb-1">{a.preview}</div>
                    <span className={`text-xs font-semibold ${a.status === 'Accepted' ? 'text-green-600' : 'text-blue-500'}`}>{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'bookmarked' && (
            <div className="flex flex-col gap-4">
              {dummyBookmarks.map(b => (
                <div key={b.id} className="bg-blue-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-medium text-blue-700 text-sm mb-1">{b.title}</div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      {b.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 border border-blue-200">{tag}</span>
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${b.status === 'Accepted' ? 'text-green-600' : 'text-gray-400'}`}>{b.status}</span>
                    <span className="text-xs text-gray-400 ml-2">{b.date}</span>
                  </div>
                  <Bookmark size={18} className="text-blue-400" />
                </div>
              ))}
            </div>
          )}
          {activeTab === 'logs' && (
            <div className="flex flex-col gap-4">
              {dummyLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <div className="flex-1 text-xs text-gray-600">{log.text}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1"><Clock size={14} /> {log.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 