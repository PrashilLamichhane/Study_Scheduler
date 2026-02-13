// Switch between Login and Sign Up forms
function showSignup(event) {
    event.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.add('active');
}

function showLogin(event) {
    event.preventDefault();
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists and password matches
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save current logged in user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success and redirect to main app
        alert('Login successful! Welcome back, ' + user.name + '! 🎉');
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Handle Sign Up
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match! Please try again.');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('An account with this email already exists. Please login.');
        showLogin(event);
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login the new user
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Show success and redirect
    alert('Account created successfully! Welcome, ' + name + '! 🎉');
    window.location.href = 'index.html';
}

// Check if user is already logged in
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // User is already logged in, redirect to main app
        window.location.href = 'index.html';
    }
});
