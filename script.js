// Sample data for demonstration
const sampleQuestions = [
    {
        id: 1,
        title: "How to implement JWT authentication in React?",
        content: "I'm building a React app and need to implement JWT authentication. What's the best approach?",
        tags: ["react", "javascript", "authentication"],
        user: { username: "john_doe", reputation: 1250 },
        votes: 15,
        answers_count: 3,
        views: 245,
        is_accepted: true,
        created_at: "2 days ago"
    },
    {
        id: 2,
        title: "Best practices for API design with FastAPI",
        content: "What are the recommended patterns for designing REST APIs with FastAPI?",
        tags: ["python", "fastapi", "api-design"],
        user: { username: "jane_smith", reputation: 890 },
        votes: 8,
        answers_count: 2,
        views: 156,
        is_accepted: false,
        created_at: "1 day ago"
    },
    {
        id: 3,
        title: "CSS Grid vs Flexbox: When to use which?",
        content: "I'm confused about when to use CSS Grid vs Flexbox. Can someone explain the differences?",
        tags: ["css", "frontend", "layout"],
        user: { username: "john_doe", reputation: 1250 },
        votes: 22,
        answers_count: 5,
        views: 389,
        is_accepted: true,
        created_at: "6 hours ago"
    },
    {
        id: 4,
        title: "How to optimize database queries in Django?",
        content: "I'm experiencing slow query performance in my Django application. Any tips for optimization?",
        tags: ["python", "django", "database", "performance"],
        user: { username: "alex_dev", reputation: 567 },
        votes: 12,
        answers_count: 4,
        views: 203,
        is_accepted: false,
        created_at: "3 hours ago"
    },
    {
        id: 5,
        title: "Understanding async/await in JavaScript",
        content: "Can someone explain the concept of async/await and how it differs from Promises?",
        tags: ["javascript", "async", "es6"],
        user: { username: "jane_smith", reputation: 890 },
        votes: 18,
        answers_count: 6,
        views: 312,
        is_accepted: true,
        created_at: "1 day ago"
    }
];

// DOM elements
const navbar = document.getElementById('navbar');
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const askQuestionBtn = document.getElementById('askQuestionBtn');
const moreBtn = document.getElementById('moreBtn');
const moreDropdown = document.getElementById('moreDropdown');
const authForm = document.getElementById('authForm');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const questionsList = document.getElementById('questionsList');

// Authentication state
let isAuthenticated = false;
let currentUser = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();
    setupEventListeners();
    checkAuthStatus();
});

function setupEventListeners() {
    // Modal controls
    closeModal.addEventListener('click', hideAuthModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) hideAuthModal();
    });

    // Authentication
    askQuestionBtn.addEventListener('click', handleAskQuestion);
    loginBtn.addEventListener('click', handleLogin);
    signupBtn.addEventListener('click', handleSignup);
    logoutBtn.addEventListener('click', handleLogout);

    // Dropdown
    moreBtn.addEventListener('click', toggleMoreDropdown);
    document.addEventListener('click', (e) => {
        if (!moreBtn.contains(e.target)) {
            moreDropdown.classList.add('hidden');
        }
    });

    // Search functionality
    const searchField = document.getElementById('searchField');
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    const categoryList = document.getElementById('categoryList');

    searchField.addEventListener('input', handleSearch);
    searchField.addEventListener('focus', () => {
        if (searchField.value.trim()) {
            searchResults.classList.remove('hidden');
        }
    });

    // Add click handlers for popular categories
    const categoryLinks = document.querySelectorAll('#categoryList a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            handleCategorySelect(category);
            moreDropdown.classList.add('hidden');
        });
    });

    // Dashboard tab functionality
    setupDashboardTabs();
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        isAuthenticated = true;
        currentUser = JSON.parse(localStorage.getItem('user'));
        showNavbar();
    }
}

function showAuthModal() {
    authModal.classList.remove('hidden');
    authModal.classList.add('modal-overlay');
}

function hideAuthModal() {
    authModal.classList.add('hidden');
    authModal.classList.remove('modal-overlay');
}

function showNavbar() {
    navbar.classList.remove('hidden');
}

function hideNavbar() {
    navbar.classList.add('hidden');
}

function handleAskQuestion() {
    if (!isAuthenticated) {
        showAuthModal();
    } else {
        window.location.href = 'ask-question.html';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate login (in real app, this would call your API)
    if (username && password) {
        // Mock successful login
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = { username, email: username + '@example.com', reputation: 100 };
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        isAuthenticated = true;
        currentUser = mockUser;
        
        showNavbar();
        hideAuthModal();
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        
        alert('Successfully logged in!');
    } else {
        alert('Please fill in all fields');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        // Mock successful signup
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = { username, email, reputation: 0 };
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        isAuthenticated = true;
        currentUser = mockUser;
        
        showNavbar();
        hideAuthModal();
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        
        alert('Successfully signed up!');
    } else {
        alert('Please fill in all fields');
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    isAuthenticated = false;
    currentUser = null;
    hideNavbar();
    alert('Logged out successfully');
}

function toggleMoreDropdown() {
    moreDropdown.classList.toggle('hidden');
    // Clear search when opening dropdown
    if (!moreDropdown.classList.contains('hidden')) {
        document.getElementById('searchField').value = '';
        searchResults.classList.add('hidden');
    }
}

function handleSearch() {
    const searchTerm = searchField.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    const categoryList = document.getElementById('categoryList');

    if (searchTerm.length === 0) {
        searchResults.classList.add('hidden');
        categoryList.classList.remove('hidden');
        return;
    }

    // Show search results, hide categories
    searchResults.classList.remove('hidden');
    categoryList.classList.add('hidden');

    // Define searchable fields and topics
    const searchableItems = [
        { name: 'JavaScript', category: 'Programming', tags: ['javascript', 'js', 'es6', 'async'] },
        { name: 'React', category: 'Frontend', tags: ['react', 'jsx', 'hooks', 'components'] },
        { name: 'Python', category: 'Programming', tags: ['python', 'django', 'flask', 'fastapi'] },
        { name: 'CSS', category: 'Frontend', tags: ['css', 'styling', 'layout', 'flexbox', 'grid'] },
        { name: 'Database', category: 'Backend', tags: ['database', 'sql', 'mongodb', 'postgresql'] },
        { name: 'API Design', category: 'Backend', tags: ['api', 'rest', 'graphql', 'endpoints'] },
        { name: 'Authentication', category: 'Security', tags: ['auth', 'jwt', 'oauth', 'login'] },
        { name: 'Performance', category: 'Optimization', tags: ['performance', 'optimization', 'speed'] },
        { name: 'Testing', category: 'Development', tags: ['testing', 'unit', 'integration', 'jest'] },
        { name: 'Deployment', category: 'DevOps', tags: ['deployment', 'docker', 'aws', 'heroku'] },
        { name: 'Machine Learning', category: 'AI', tags: ['ml', 'ai', 'tensorflow', 'pytorch'] },
        { name: 'Mobile Development', category: 'Development', tags: ['mobile', 'react-native', 'flutter'] },
        { name: 'Web Security', category: 'Security', tags: ['security', 'xss', 'csrf', 'https'] },
        { name: 'UI/UX Design', category: 'Design', tags: ['ui', 'ux', 'design', 'user-experience'] },
        { name: 'Data Structures', category: 'Computer Science', tags: ['algorithms', 'data-structures', 'complexity'] },
        { name: 'Git & Version Control', category: 'Development', tags: ['git', 'github', 'version-control'] }
    ];

    // Filter searchable items
    const filteredItems = searchableItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    // Display search results
    searchResultsList.innerHTML = '';
    
    if (filteredItems.length === 0) {
        searchResultsList.innerHTML = `
            <div class="px-3 py-2 text-sm text-secondary-text">
                No results found for "${searchTerm}"
            </div>
        `;
    } else {
        filteredItems.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'px-3 py-2 text-sm text-secondary-text hover:bg-gray-100 rounded-soft cursor-pointer';
            resultItem.innerHTML = `
                <div class="font-medium text-primary-text">${item.name}</div>
                <div class="text-xs text-secondary-text">${item.category}</div>
            `;
            resultItem.addEventListener('click', () => {
                handleCategorySelect(item.name.toLowerCase());
                moreDropdown.classList.add('hidden');
            });
            searchResultsList.appendChild(resultItem);
        });
    }
}

function handleCategorySelect(category) {
    // Filter questions based on selected category
    const allQuestions = [...JSON.parse(localStorage.getItem('newQuestions') || '[]'), ...sampleQuestions];
    const filteredQuestions = allQuestions.filter(question => 
        question.tags.some(tag => tag.toLowerCase().includes(category)) ||
        question.title.toLowerCase().includes(category) ||
        question.content.toLowerCase().includes(category)
    );

    // Update questions display
    questionsList.innerHTML = '';
    
    if (filteredQuestions.length === 0) {
        questionsList.innerHTML = `
            <div class="text-center py-8 text-secondary-text">
                <p class="text-lg font-medium">No questions found for "${category}"</p>
                <p class="text-sm mt-2">Try a different search term or browse all questions</p>
            </div>
        `;
    } else {
        filteredQuestions.forEach(question => {
            const questionCard = createQuestionCard(question);
            questionsList.appendChild(questionCard);
        });
    }

    // Update page title to show filter
    document.querySelector('h1').textContent = `Questions - ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

function setupDashboardTabs() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    const pageTitle = document.getElementById('pageTitle');
    const askQuestionBtn = document.getElementById('askQuestionBtn');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active', 'border-button-hover', 'text-button-hover', 'bg-white');
                t.classList.add('border-transparent', 'text-secondary-text');
            });

            // Add active class to clicked tab
            tab.classList.add('active', 'border-button-hover', 'text-button-hover', 'bg-white');
            tab.classList.remove('border-transparent', 'text-secondary-text');

            // Handle tab-specific functionality
            const tabId = tab.id;
            
            switch(tabId) {
                case 'allQuestionsTab':
                    pageTitle.textContent = 'All Questions';
                    askQuestionBtn.style.display = 'block';
                    loadQuestions();
                    break;
                    
                case 'askQuestionTab':
                    pageTitle.textContent = 'Ask a Question';
                    askQuestionBtn.style.display = 'none';
                    loadAskQuestionContent();
                    break;
                    
                case 'myQuestionsTab':
                    pageTitle.textContent = 'My Questions';
                    askQuestionBtn.style.display = 'block';
                    loadMyQuestions();
                    break;
                    
                case 'favoritesTab':
                    pageTitle.textContent = 'Favorite Questions';
                    askQuestionBtn.style.display = 'block';
                    loadFavorites();
                    break;
                    
                case 'trendingTab':
                    pageTitle.textContent = 'Trending Questions';
                    askQuestionBtn.style.display = 'block';
                    loadTrendingQuestions();
                    break;
            }
        });
    });
}

function loadAskQuestionContent() {
    questionsList.innerHTML = `
        <div class="bg-white border border-border-card rounded-soft p-8 text-center">
            <div class="mb-6">
                <svg class="mx-auto h-16 w-16 text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-primary-text mb-4">Ready to Ask a Question?</h3>
            <p class="text-secondary-text mb-6 max-w-md mx-auto">
                Share your knowledge and help others learn. Ask questions about programming, design, or any technical topic.
            </p>
            <div class="space-y-4">
                <button onclick="window.location.href='ask-question.html'" class="bg-button-hover text-white px-8 py-3 rounded-soft hover:bg-red-600 font-medium">
                    Start Asking
                </button>
                <div class="text-sm text-secondary-text">
                    <p>• Be specific about your problem</p>
                    <p>• Include relevant code snippets</p>
                    <p>• Add appropriate tags</p>
                </div>
            </div>
        </div>
    `;
}

function loadMyQuestions() {
    // Filter questions by current user
    const allQuestions = [...JSON.parse(localStorage.getItem('newQuestions') || '[]'), ...sampleQuestions];
    const myQuestions = allQuestions.filter(question => 
        question.user.username === 'current_user' || question.user.username === 'john_doe'
    );

    questionsList.innerHTML = '';
    
    if (myQuestions.length === 0) {
        questionsList.innerHTML = `
            <div class="text-center py-8 text-secondary-text">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-lg font-medium">No questions yet</p>
                <p class="text-sm mt-2">Start asking questions to see them here</p>
            </div>
        `;
    } else {
        myQuestions.forEach(question => {
            const questionCard = createQuestionCard(question);
            questionsList.appendChild(questionCard);
        });
    }
}

function loadFavorites() {
    questionsList.innerHTML = `
        <div class="text-center py-8 text-secondary-text">
            <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <p class="text-lg font-medium">No favorite questions yet</p>
            <p class="text-sm mt-2">Click the heart icon on questions to add them to favorites</p>
        </div>
    `;
}

function loadTrendingQuestions() {
    // Show questions with high votes/views as trending
    const allQuestions = [...JSON.parse(localStorage.getItem('newQuestions') || '[]'), ...sampleQuestions];
    const trendingQuestions = allQuestions.filter(question => 
        question.votes > 10 || question.views > 200
    ).sort((a, b) => (b.votes + b.views) - (a.votes + a.views));

    questionsList.innerHTML = '';
    
    if (trendingQuestions.length === 0) {
        questionsList.innerHTML = `
            <div class="text-center py-8 text-secondary-text">
                <p class="text-lg font-medium">No trending questions</p>
                <p class="text-sm mt-2">Questions with high engagement will appear here</p>
            </div>
        `;
    } else {
        trendingQuestions.forEach(question => {
            const questionCard = createQuestionCard(question);
            questionsList.appendChild(questionCard);
        });
    }
}

function getTagColor(tag) {
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
    };
    return tagColors[tag] || 'tag-blue';
}

function loadQuestions() {
    questionsList.innerHTML = '';
    
    // Load newly posted questions first (from localStorage)
    const newQuestions = JSON.parse(localStorage.getItem('newQuestions') || '[]');
    
    // Combine new questions with sample questions
    const allQuestions = [...newQuestions, ...sampleQuestions];
    
    allQuestions.forEach(question => {
        const questionCard = createQuestionCard(question);
        questionsList.appendChild(questionCard);
    });
}

function createQuestionCard(question) {
    const card = document.createElement('div');
    card.className = 'question-card bg-white border border-border-card rounded-soft p-6 hover:shadow-lg transition-all duration-200';
    
    const tagsHTML = question.tags.map(tag => 
        `<span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 ${getTagColor(tag)}">${tag}</span>`
    ).join('');
    
    const acceptedBadge = question.is_accepted ? 
        '<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-soft mr-2">✓ Accepted</span>' : '';
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-primary-text mb-2 hover:text-button-hover cursor-pointer">
                    ${question.title}
                </h3>
                <p class="text-secondary-text text-sm mb-3 line-clamp-2">${question.content}</p>
                <div class="tag-container mb-3">
                    ${acceptedBadge}
                    ${tagsHTML}
                </div>
            </div>
            <div class="question-stats flex flex-col items-center text-center ml-4 text-sm">
                <div class="text-primary-text font-semibold">${question.votes}</div>
                <div class="text-secondary-text">votes</div>
                <div class="text-primary-text font-semibold mt-2">${question.answers_count}</div>
                <div class="text-secondary-text">answers</div>
                <div class="text-primary-text font-semibold mt-2">${question.views}</div>
                <div class="text-secondary-text">views</div>
            </div>
        </div>
        <div class="flex justify-between items-center text-sm text-secondary-text">
            <div class="flex items-center">
                <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                <span class="font-medium text-primary-text">${question.user.username}</span>
                <span class="mx-1">•</span>
                <span>${question.user.reputation} reputation</span>
                <span class="mx-1">•</span>
                <span>${question.created_at}</span>
            </div>
            <div class="flex space-x-2">
                <button class="text-secondary-text hover:text-primary-text" onclick="handleVote(${question.id})">
                    ▲ Vote
                </button>
                <button class="text-secondary-text hover:text-primary-text" onclick="handleAnswer(${question.id})">
                    Answer
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function handleVote(questionId) {
    if (!isAuthenticated) {
        showAuthModal();
    } else {
        alert(`Voted on question ${questionId}`);
    }
}

function handleAnswer(questionId) {
    if (!isAuthenticated) {
        showAuthModal();
    } else {
        alert(`Answer question ${questionId} - Navigate to answer form`);
    }
}

// Add some interactive features
document.addEventListener('click', function(e) {
    if (e.target.matches('.question-card h3')) {
        const questionId = e.target.closest('.question-card').dataset.questionId;
        alert(`Navigate to question detail page for question ${questionId}`);
    }
}); 