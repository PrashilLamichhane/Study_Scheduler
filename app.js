// Check if user is logged in
let currentUser = null;

// Array to store study sessions (will use database later)
let studySessions = [];

// Get elements from the page
const studyForm = document.getElementById('studyForm');
const sessionsList = document.getElementById('sessionsList');
const totalSessionsEl = document.getElementById('totalSessions');
const completedSessionsEl = document.getElementById('completedSessions');
const totalHoursEl = document.getElementById('totalHours');

// Load sessions from browser storage when page loads
window.addEventListener('load', () => {
    // Check if user is logged in
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        // Not logged in, redirect to login page
        window.location.href = 'login.html';
        return;
    }
    
    currentUser = JSON.parse(userStr);
    
    // Display welcome message
    document.getElementById('welcomeText').textContent = `Welcome, ${currentUser.name}!`;
    
    loadSessions();
    displaySessions();
    updateStats();
});

// Handle form submission
studyForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Get form values
    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const duration = parseFloat(document.getElementById('duration').value);
    const notes = document.getElementById('notes').value;
    
    // Create session object
    const newSession = {
        id: Date.now(), // Simple unique ID
        subject: subject,
        date: date,
        time: time,
        duration: duration,
        notes: notes,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add to array
    studySessions.push(newSession);
    
    // Save to browser storage
    saveSessions();
    
    // Update display
    displaySessions();
    updateStats();
    
    // Clear form
    studyForm.reset();
    
    // Show success message
    alert('Study session added successfully! 🎉');
});

// Display all sessions
function displaySessions() {
    // Sort sessions by date and time
    const sortedSessions = studySessions.sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateA - dateB;
    });
    
    // If no sessions, show empty state
    if (sortedSessions.length === 0) {
        sessionsList.innerHTML = '<p class="empty-state">No study sessions yet. Add your first one above! 🎯</p>';
        return;
    }
    
    // Create HTML for each session
    sessionsList.innerHTML = sortedSessions.map(session => `
        <div class="session-card ${session.completed ? 'completed' : ''}">
            <div class="session-info">
                <h3>${session.subject}</h3>
                <div class="session-details">
                    <span>📅 ${formatDate(session.date)}</span>
                    <span>🕐 ${formatTime(session.time)}</span>
                    <span>⏱️ ${session.duration}h</span>
                </div>
                ${session.notes ? `<p class="session-notes">${session.notes}</p>` : ''}
            </div>
            <div class="session-actions">
                ${!session.completed ? 
                    `<button class="btn-complete" onclick="completeSession(${session.id})">✓ Complete</button>` :
                    `<button class="btn-complete" disabled>✓ Completed</button>`
                }
                <button class="btn-delete" onclick="deleteSession(${session.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Mark session as complete
function completeSession(id) {
    const session = studySessions.find(s => s.id === id);
    if (session) {
        session.completed = true;
        saveSessions();
        displaySessions();
        updateStats();
    }
}

// Delete session
function deleteSession(id) {
    if (confirm('Are you sure you want to delete this session?')) {
        studySessions = studySessions.filter(s => s.id !== id);
        saveSessions();
        displaySessions();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    const total = studySessions.length;
    const completed = studySessions.filter(s => s.completed).length;
    const hours = studySessions
        .filter(s => s.completed)
        .reduce((sum, s) => sum + s.duration, 0);
    
    totalSessionsEl.textContent = total;
    completedSessionsEl.textContent = completed;
    totalHoursEl.textContent = hours.toFixed(1);
}

// Save sessions to browser storage (LocalStorage)
function saveSessions() {
    localStorage.setItem('studySessions', JSON.stringify(studySessions));
}

// Load sessions from browser storage
function loadSessions() {
    const saved = localStorage.getItem('studySessions');
    if (saved) {
        studySessions = JSON.parse(saved);
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format time for display
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}
