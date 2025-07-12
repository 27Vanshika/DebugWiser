import { useState } from 'react';
import { Bell, Archive, Settings, MoreVertical, Trash2, Check, X } from 'lucide-react';

const dummyNotifications = [
  {
    id: 1,
    user: { name: 'Frank Edward', avatar: 'https://randomuser.me/api/portraits/men/31.jpg' },
    message: 'mentioned you in a comment in',
    content: 'Design Team Reports',
    contentBold: true,
    time: '3 hours ago',
    team: 'Design Team',
    reply: true,
    text: '@brianf have you update this design so we can use it on next meeting?',
    actions: ['Reply'],
  },
  {
    id: 2,
    user: { name: 'Elsa Wright', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    message: 'Asking for edit access in',
    content: 'Monthly Team Progress',
    contentBold: true,
    time: 'Yesterday',
    team: 'Marketing Team',
    actions: ['Decline', 'Accept'],
  },
  {
    id: 3,
    user: { name: 'James Wong', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    message: 'mentioned you in a comment in',
    content: 'Monthly Team Meeting',
    contentBold: true,
    time: 'Aug 24',
    team: 'Design Team',
    reply: true,
    text: '@brianf let’s we plan all this event by now',
    actions: ['Reply'],
  },
];

const NotificationPanel = ({ onClose }) => {
  const [tab, setTab] = useState('all');
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  const handleMarkAllRead = () => {
    // For demo, just close panel
    if (onClose) onClose();
  };

  return (
    <div className="w-[370px] bg-white rounded-xl shadow-xl border border-blue-100 p-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-base">Notifications</div>
        <button onClick={onClose} className="text-gray-400 hover:text-blue-500 text-xl font-bold px-2">×</button>
      </div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
        <button
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition
            ${tab === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-blue-50'}`}
          onClick={() => setTab('all')}
        >
          <Bell size={16} /> All <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold">{notifications.length}</span>
        </button>
        <button
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition
            ${tab === 'archived' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-blue-50'}`}
          onClick={() => setTab('archived')}
        >
          <Archive size={16} /> Archived
        </button>
        <div className="flex-1" />
        <button className="p-1 rounded-full hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition">
          <Settings size={16} />
        </button>
      </div>
      {/* Mark All as Read */}
      <button
        className="w-full mb-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition text-xs"
        onClick={handleMarkAllRead}
      >
        Mark All as Read
      </button>
      {/* Notification Items */}
      <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No notifications</div>
        ) : notifications.map(n => (
          <div key={n.id} className="bg-blue-50 rounded-lg p-3 flex gap-2 relative">
            <img src={n.user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-1" />
            <div className="flex-1">
              <div className="text-xs mb-1">
                <span className="font-semibold text-blue-700">{n.user.name}</span> {n.message} <span className="font-semibold text-blue-700">{n.content}</span>
              </div>
              {n.text && (
                <div className="bg-blue-100 text-blue-700 rounded-lg px-3 py-2 text-xs mb-1">{n.text}</div>
              )}
              <div className="flex gap-2 mt-1">
                {n.actions && n.actions.includes('Reply') && (
                  <button className="px-3 py-1 rounded-lg border border-blue-200 text-blue-600 text-xs font-medium hover:bg-blue-100 transition">Reply</button>
                )}
                {n.actions && n.actions.includes('Accept') && (
                  <button className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition flex items-center gap-1"><Check size={14} /> Accept</button>
                )}
                {n.actions && n.actions.includes('Decline') && (
                  <button className="px-3 py-1 rounded-lg border border-blue-200 text-blue-600 text-xs font-medium hover:bg-blue-100 transition flex items-center gap-1"><X size={14} /> Decline</button>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>{n.time}</span>
                <span>•</span>
                <span>{n.team}</span>
              </div>
            </div>
            {/* 3-dot menu and delete */}
            <div className="flex flex-col items-end gap-1 absolute right-2 top-2">
              <button className="p-1 rounded-full hover:bg-blue-100 text-gray-400 hover:text-blue-500 transition"><MoreVertical size={16} /></button>
              <button className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition" onClick={() => handleDelete(n.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      {/* See all notifications */}
      <button className="w-full mt-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-sm">See all notifications</button>
    </div>
  );
};

export default NotificationPanel; 