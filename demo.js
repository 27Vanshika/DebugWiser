// Interactive Demo JavaScript

let isAuthenticated = false;

document.addEventListener('DOMContentLoaded', function() {
    setupDemoControls();
    setupDemoTabs();
    setupDemoModal();
    setupDemoDropdown();
});

function setupDemoControls() {
    const authBtn = document.getElementById('demoAuthBtn');
    const modalBtn = document.getElementById('demoModalBtn');
    const logoutBtn = document.getElementById('demoLogoutBtn');
    const navStatus = document.getElementById('navStatus');
    const demoNavbar = document.getElementById('demoNavbar');

    // Toggle authentication
    authBtn.addEventListener('click', () => {
        isAuthenticated = !isAuthenticated;
        
        if (isAuthenticated) {
            authBtn.textContent = 'Logout';
            authBtn.classList.remove('bg-button-hover');
            authBtn.classList.add('bg-green-500');
            navStatus.textContent = 'Visible (Authenticated)';
            navStatus.className = 'font-medium text-green-500';
            demoNavbar.classList.remove('opacity-50');
            demoNavbar.classList.add('opacity-100');
        } else {
            authBtn.textContent = 'Toggle Auth';
            authBtn.classList.remove('bg-green-500');
            authBtn.classList.add('bg-button-hover');
            navStatus.textContent = 'Hidden (Not Authenticated)';
            navStatus.className = 'font-medium text-red-500';
            demoNavbar.classList.remove('opacity-100');
            demoNavbar.classList.add('opacity-50');
        }
    });

    // Show modal button
    modalBtn.addEventListener('click', () => {
        showDemoModal();
    });

    // Logout button
    logoutBtn.addEventListener('click', () => {
        isAuthenticated = false;
        authBtn.textContent = 'Toggle Auth';
        authBtn.classList.remove('bg-green-500');
        authBtn.classList.add('bg-button-hover');
        navStatus.textContent = 'Hidden (Not Authenticated)';
        navStatus.className = 'font-medium text-red-500';
        demoNavbar.classList.remove('opacity-100');
        demoNavbar.classList.add('opacity-50');
    });
}

function setupDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    
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

            // Show tab-specific content
            const tabText = tab.textContent.trim();
            showTabContent(tabText);
        });
    });
}

function showTabContent(tabName) {
    const demoQuestions = document.getElementById('demoQuestions');
    
    switch(tabName) {
        case 'All Questions':
            demoQuestions.innerHTML = `
                <div class="question-card bg-white border border-border-card rounded-soft p-4 hover:shadow-lg transition-all duration-200">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h4 class="text-lg font-semibold text-primary-text mb-2 hover:text-button-hover cursor-pointer">
                                How to implement JWT authentication in React?
                            </h4>
                            <p class="text-secondary-text text-sm mb-3 line-clamp-2">I'm building a React app and need to implement JWT authentication. What's the best approach?</p>
                            <div class="tag-container mb-3">
                                <span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 tag-blue">react</span>
                                <span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 tag-yellow">javascript</span>
                                <span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 tag-blue">authentication</span>
                            </div>
                        </div>
                        <div class="question-stats flex flex-col items-center text-center ml-4 text-sm">
                            <div class="text-primary-text font-semibold">15</div>
                            <div class="text-secondary-text">votes</div>
                            <div class="text-primary-text font-semibold mt-2">3</div>
                            <div class="text-secondary-text">answers</div>
                            <div class="text-primary-text font-semibold mt-2">245</div>
                            <div class="text-secondary-text">views</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center text-sm text-secondary-text">
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                            <span class="font-medium text-primary-text">john_doe</span>
                            <span class="mx-1">•</span>
                            <span>1250 reputation</span>
                            <span class="mx-1">•</span>
                            <span>2 days ago</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="text-secondary-text hover:text-primary-text" onclick="handleDemoVote()">▲ Vote</button>
                            <button class="text-secondary-text hover:text-primary-text" onclick="handleDemoAnswer()">Answer</button>
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Ask Question':
            demoQuestions.innerHTML = `
                <div class="bg-white border border-border-card rounded-soft p-6 text-center">
                    <div class="mb-4">
                        <svg class="mx-auto h-12 w-12 text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h4 class="text-lg font-semibold text-primary-text mb-2">Ready to Ask a Question?</h4>
                    <p class="text-secondary-text text-sm mb-4">Share your knowledge and help others learn.</p>
                    <button class="bg-button-hover text-white px-6 py-2 rounded-soft hover:bg-red-600 font-medium">
                        Start Asking
                    </button>
                </div>
            `;
            break;
            
        case 'My Questions':
            demoQuestions.innerHTML = `
                <div class="text-center py-8 text-secondary-text">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-lg font-medium">No questions yet</p>
                    <p class="text-sm mt-2">Start asking questions to see them here</p>
                </div>
            `;
            break;
            
        case 'Trending':
            demoQuestions.innerHTML = `
                <div class="question-card bg-white border border-border-card rounded-soft p-4 hover:shadow-lg transition-all duration-200">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h4 class="text-lg font-semibold text-primary-text mb-2 hover:text-button-hover cursor-pointer">
                                CSS Grid vs Flexbox: When to use which?
                            </h4>
                            <p class="text-secondary-text text-sm mb-3 line-clamp-2">I'm confused about when to use CSS Grid vs Flexbox. Can someone explain the differences?</p>
                            <div class="tag-container mb-3">
                                <span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 tag-violet">css</span>
                                <span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 tag-violet">frontend</span>
                                <span class="tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 tag-green">layout</span>
                            </div>
                        </div>
                        <div class="question-stats flex flex-col items-center text-center ml-4 text-sm">
                            <div class="text-primary-text font-semibold">22</div>
                            <div class="text-secondary-text">votes</div>
                            <div class="text-primary-text font-semibold mt-2">5</div>
                            <div class="text-secondary-text">answers</div>
                            <div class="text-primary-text font-semibold mt-2">389</div>
                            <div class="text-secondary-text">views</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center text-sm text-secondary-text">
                        <div class="flex items-center">
                            <div class="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                            <span class="font-medium text-primary-text">john_doe</span>
                            <span class="mx-1">•</span>
                            <span>1250 reputation</span>
                            <span class="mx-1">•</span>
                            <span>6 hours ago</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="text-secondary-text hover:text-primary-text" onclick="handleDemoVote()">▲ Vote</button>
                            <button class="text-secondary-text hover:text-primary-text" onclick="handleDemoAnswer()">Answer</button>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
}

function setupDemoModal() {
    const modal = document.getElementById('demoModal');
    const showBtn = document.getElementById('showDemoModalBtn');
    const closeBtn = document.getElementById('closeDemoModal');

    showBtn.addEventListener('click', showDemoModal);
    closeBtn.addEventListener('click', hideDemoModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideDemoModal();
        }
    });
}

function showDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('hidden');
    modal.classList.add('modal-overlay');
}

function hideDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.add('hidden');
    modal.classList.remove('modal-overlay');
}

function setupDemoDropdown() {
    const moreBtn = document.getElementById('demoMoreBtn');
    const dropdown = document.getElementById('demoMoreDropdown');

    moreBtn.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!moreBtn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

function handleDemoVote() {
    if (!isAuthenticated) {
        showDemoModal();
        alert('Authentication required to vote!');
    } else {
        alert('Vote recorded! (Demo)');
    }
}

function handleDemoAnswer() {
    if (!isAuthenticated) {
        showDemoModal();
        alert('Authentication required to answer!');
    } else {
        alert('Answer form opened! (Demo)');
    }
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate question cards on hover
    const questionCards = document.querySelectorAll('.question-card');
    questionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate tags on hover
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}); 