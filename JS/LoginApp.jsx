const { useState } = React;

function LoginApp() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [showPassword, setShowPassword] = useState({
        loginPassword: false,
        signupPassword: false,
        confirmPassword: false
    });
    const [formData, setFormData] = useState({
        loginEmail: '',
        loginPassword: '',
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        signupConfirmPassword: '',
        rememberMe: false,
        agreeTerms: false
    });

    // Toggle between login and signup
    const showSignup = (e) => {
        e.preventDefault();
        setIsLoginView(false);
    };

    const showLogin = (e) => {
        e.preventDefault();
        setIsLoginView(true);
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Toggle password visibility
    const togglePassword = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        
        const { loginEmail, loginPassword } = formData;
        
        // Get stored users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user exists and password matches
        const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
        
        if (user) {
            // Save current logged in user
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Show success and redirect to main app
            alert('Login successful! Welcome back, ' + user.name + '! 🎉');
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password. Please try again.');
        }
    };

    // Handle Sign Up
    const handleSignup = (e) => {
        e.preventDefault();
        
        const { signupName, signupEmail, signupPassword, signupConfirmPassword, agreeTerms } = formData;
        
        // Validate terms agreement
        if (!agreeTerms) {
            alert('Please agree to the Terms & Conditions.');
            return;
        }
        
        // Validate passwords match
        if (signupPassword !== signupConfirmPassword) {
            alert('Passwords do not match! Please try again.');
            return;
        }
        
        // Get existing users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.find(u => u.email === signupEmail)) {
            alert('An account with this email already exists. Please login.');
            setIsLoginView(true);
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: signupName,
            email: signupEmail,
            password: signupPassword,
            createdAt: new Date().toISOString()
        };
        
        // Add to users array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto-login the new user
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Show success and redirect
        alert('Account created successfully! Welcome, ' + signupName + '! 🎉');
        window.location.href = 'index.html';
    };

    return (
        <>
            {/* Animated Background */}
            <div className="bg-animation">
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>

            <div className="container">
                <div className="login-box">
                    {/* Logo/Header */}
                    <div className="header">
                        <div className="logo-circle">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <h1>Study Planner</h1>
                        <p>Your journey to academic excellence starts here</p>
                    </div>

                    {/* Login Form */}
                    <div className={`form-conta
    });
iner ${isLoginView ? 'active' : ''}`}>
                        <h2>Welcome Back</h2>
                        <p className="form-subtitle">Sign in to continue your learning journey</p>
                        
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="fas fa-envelope input-icon"></i>
                                    <input 
                                        type="email" 
                                        name="loginEmail"
                                        value={formData.loginEmail}
                                        onChange={handleInputChange}
                                        placeholder="Email address" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="fas fa-lock input-icon"></i>
                                    <input 
                                        type={showPassword.loginPassword ? 'text' : 'password'}
                                        name="loginPassword"
                                        value={formData.loginPassword}
                                        onChange={handleInputChange}
                                        placeholder="Enter password" 
                                        required 
                                    />
                                    <i 
                                        className={`fas ${showPassword.loginPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                        onClick={() => togglePassword('loginPassword')}
                                    ></i>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="remember-me">
                                    <input 
                                        type="checkbox" 
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-password">Forgot password?</a>
                            </div>

                            <button type="submit" className="btn-primary">
                                <span>Sign In</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </form>

                        <div className="divider">
                            <span>or continue with</span>
                        </div>

                        <div className="social-login">
                            <button type="button" className="social-btn">
                                <i className="fab fa-google"></i>
                            </button>
                            <button type="button" className="social-btn">
                                <i className="fab fa-github"></i>
                            </button>
                            <button type="button" className="social-btn">
                                <i className="fab fa-microsoft"></i>
                            </button>
                        </div>

                        <p className="switch-text">
                            Don't have an account? 
                            <a href="#" onClick={showSignup}>Create one</a>
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <div className={`form-container ${!isLoginView ? 'active' : ''}`}>
                        <h2>Create Account</h2>
                        <p className="form-subtitle">Join thousands of successful students</p>
                        
                        <form onSubmit={handleSignup}>
                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="fas fa-user input-icon"></i>
                                    <input 
                                        type="text" 
                                        name="signupName"
                                        value={formData.signupName}
                                        onChange={handleInputChange}
                                        placeholder="Full name" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="fas fa-envelope input-icon"></i>
                                    <input 
                                        type="email" 
                                        name="signupEmail"
                                        value={formData.signupEmail}
                                        onChange={handleInputChange}
                                        placeholder="Email address" 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="fas fa-lock input-icon"></i>
                                    <input 
                                        type={showPassword.signupPassword ? 'text' : 'password'}
                                        name="signupPassword"
                                        value={formData.signupPassword}
                                        onChange={handleInputChange}
                                        placeholder="Create password" 
                                        required 
                                        minLength="6" 
                                    />
                                    <i 
                                        className={`fas ${showPassword.signupPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                        onClick={() => togglePassword('signupPassword')}
                                    ></i>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-wrapper">
                                    <i className="fas fa-lock input-icon"></i>
                                    <input 
                                        type={showPassword.confirmPassword ? 'text' : 'password'}
                                        name="signupConfirmPassword"
                                        value={formData.signupConfirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm password" 
                                        required 
                                        minLength="6" 
                                    />
                                    <i 
                                        className={`fas ${showPassword.confirmPassword ? 'fa-eye-slash' : 'fa-eye'} toggle-password`}
                                        onClick={() => togglePassword('confirmPassword')}
                                    ></i>
                                </div>
                            </div>

                            <label className="terms-check">
                                <input 
                                    type="checkbox" 
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleInputChange}
                                    required 
                                />
                                <span>I agree to the <a href="#">Terms & Conditions</a></span>
                            </label>

                            <button type="submit" className="btn-primary">
                                <span>Create Account</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </form>

                        <div className="divider">
                            <span>or sign up with</span>
                        </div>

                        <div className="social-login">
                            <button type="button" className="social-btn">
                                <i className="fab fa-google"></i>
                            </button>
                            <button type="button" className="social-btn">
                                <i className="fab fa-github"></i>
                            </button>
                            <button type="button" className="social-btn">
                                <i className="fab fa-microsoft"></i>
                            </button>
                        </div>

                        <p className="switch-text">
                            Already have an account? 
                            <a href="#" onClick={showLogin}>Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

// Render the app
ReactDOM.render(<LoginApp />, document.getElementById('root'));
