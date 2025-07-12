# StackIt - Q&A Platform

A modern, Stack Overflow-inspired Q&A website built with HTML, CSS, JavaScript, and Tailwind CSS.

## Features

- **Public Dashboard**: View questions without authentication
- **Authentication Modal**: Login/Signup popup for actions
- **Dynamic Navbar**: Hidden before login, active after login
- **Question Cards**: Display with votes, answers, views, tags
- **Responsive Design**: Works on desktop and mobile
- **Custom Color Palette**: Soft pastel theme
- **Interactive Elements**: Hover effects, animations

## Quick Start

1. **Open the frontend**:
   ```bash
   cd stackit-frontend
   # Open index.html in your browser
   ```

2. **Start the backend** (optional):
   ```bash
   cd stackit-backend
   # Activate virtual environment
   .\stackit-backend-venv\Scripts\activate
   # Run the FastAPI server
   python main.py
   ```

## Demo Credentials

- **Username**: any username
- **Password**: any password
- **Email**: any valid email format

## Features Demonstrated

### Authentication Flow
- Click "Ask Question" without being logged in → Shows auth modal
- Login/Signup with any credentials → Shows navbar
- Logout → Hides navbar

### Question Display
- Sample questions with realistic data
- Color-coded tags (React=Blue, JavaScript=Yellow, etc.)
- Vote/Answer buttons (require authentication)
- Accepted answer badges

### UI Elements
- Soft rounded corners
- Hover effects on cards and buttons
- Responsive design
- Custom color palette
- Modal with backdrop blur

## Color Palette

- Background: #FFFFFF
- Primary Text: #000000
- Secondary Text: #6B7280
- Tag Colors: Various pastel colors
- Borders: #E5E7EB
- Button Hover: #EF4444

## File Structure

```
stackit-frontend/
├── index.html          # Main HTML structure
├── style.css           # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file

stackit-backend/
├── main.py             # FastAPI backend with JWT auth
└── README.md           # Backend documentation
```

## Presentation Notes

- **Frontend**: Pure HTML/CSS/JS with Tailwind CSS
- **Backend**: FastAPI with JWT authentication
- **Authentication**: Mock JWT tokens stored in localStorage
- **Responsive**: Mobile-friendly design
- **Modern UI**: Clean, rounded, soft design
- **Interactive**: Hover effects, modal popups, dropdowns

Perfect for demonstrating a modern Q&A platform with authentication flow! 