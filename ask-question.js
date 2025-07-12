// Ask Question Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupTagSelection();
});

function setupEventListeners() {
    const form = document.getElementById('askQuestionForm');
    const previewBtn = document.getElementById('previewBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    form.addEventListener('submit', handleSubmit);
    previewBtn.addEventListener('click', handlePreview);
    logoutBtn.addEventListener('click', handleLogout);
}

function setupTagSelection() {
    // Make popular tags clickable
    const popularTags = document.querySelectorAll('.tag');
    const tagsInput = document.getElementById('questionTags');

    popularTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            const currentTags = tagsInput.value;
            
            if (currentTags) {
                // Check if tag already exists
                const tags = currentTags.split(',').map(t => t.trim());
                if (!tags.includes(tagText)) {
                    tagsInput.value = currentTags + ', ' + tagText;
                }
            } else {
                tagsInput.value = tagText;
            }
        });
    });
}

function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('questionTitle').value.trim();
    const content = document.getElementById('questionContent').value.trim();
    const tags = document.getElementById('questionTags').value.trim();

    if (!title || !content || !tags) {
        alert('Please fill in all required fields');
        return;
    }

    // Validate tags
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
    if (tagArray.length > 5) {
        alert('Please add no more than 5 tags');
        return;
    }

    // Create new question object
    const newQuestion = {
        id: Date.now(), // Simple ID generation
        title: title,
        content: content,
        tags: tagArray,
        user: { username: 'current_user', reputation: 100 },
        votes: 0,
        answers_count: 0,
        views: 0,
        is_accepted: false,
        created_at: 'Just now'
    };

    // Store the new question (in a real app, this would go to the backend)
    const existingQuestions = JSON.parse(localStorage.getItem('newQuestions') || '[]');
    existingQuestions.unshift(newQuestion); // Add to beginning (newest first)
    localStorage.setItem('newQuestions', JSON.stringify(existingQuestions));

    // Show success message
    alert('Question posted successfully!');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

function handlePreview() {
    const title = document.getElementById('questionTitle').value.trim();
    const content = document.getElementById('questionContent').value.trim();
    const tags = document.getElementById('questionTags').value.trim();

    if (!title && !content && !tags) {
        alert('Please fill in some content to preview');
        return;
    }

    const previewSection = document.getElementById('previewSection');
    const previewTitle = document.getElementById('previewTitle');
    const previewContent = document.getElementById('previewContent');
    const previewTags = document.getElementById('previewTags');

    // Update preview content
    previewTitle.textContent = title || 'Your question title will appear here';
    previewContent.textContent = content || 'Your question content will appear here';

    // Update preview tags
    previewTags.innerHTML = '';
    if (tags) {
        const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
        tagArray.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = `tag inline-block px-2 py-1 text-xs font-medium rounded-soft mr-2 mb-2 ${getTagColor(tag)}`;
            tagElement.textContent = tag;
            previewTags.appendChild(tagElement);
        });
    }

    // Show preview section
    previewSection.classList.remove('hidden');
    
    // Scroll to preview
    previewSection.scrollIntoView({ behavior: 'smooth' });
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
    return tagColors[tag.toLowerCase()] || 'tag-blue';
}

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully');
    window.location.href = 'index.html';
}

// Auto-save functionality
let autoSaveTimer;
function setupAutoSave() {
    const titleInput = document.getElementById('questionTitle');
    const contentInput = document.getElementById('questionContent');
    const tagsInput = document.getElementById('questionTags');

    [titleInput, contentInput, tagsInput].forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                const formData = {
                    title: titleInput.value,
                    content: contentInput.value,
                    tags: tagsInput.value,
                    timestamp: Date.now()
                };
                localStorage.setItem('draftQuestion', JSON.stringify(formData));
            }, 2000); // Auto-save after 2 seconds of inactivity
        });
    });
}

// Load draft on page load
function loadDraft() {
    const draft = localStorage.getItem('draftQuestion');
    if (draft) {
        const formData = JSON.parse(draft);
        const draftAge = Date.now() - formData.timestamp;
        
        // Only load draft if it's less than 1 hour old
        if (draftAge < 3600000) {
            if (confirm('You have a saved draft. Would you like to load it?')) {
                document.getElementById('questionTitle').value = formData.title || '';
                document.getElementById('questionContent').value = formData.content || '';
                document.getElementById('questionTags').value = formData.tags || '';
            }
        } else {
            localStorage.removeItem('draftQuestion');
        }
    }
}

// Initialize auto-save and draft loading
setupAutoSave();
loadDraft(); 