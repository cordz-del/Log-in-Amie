const API_BASE_URL = 'https://nodejs-amiemongodb.replit.app';

document.addEventListener('DOMContentLoaded', function () {
    // --- Modal Handling for "Create Profile" ---
    const signUpModal = document.getElementById('signUpModal');
    const openSignUpModalBtn = document.getElementById('openSignUpModal');
    const closeSignUpModalBtn = document.getElementById('closeSignUpModal');
    const errorMessageElement = document.getElementById('errorMessage');
    const successMessageElement = document.getElementById('successMessage');

    // Show error message function
    const showError = (message) => {
        if (errorMessageElement) {
            errorMessageElement.textContent = message;
            errorMessageElement.style.display = 'block';
            setTimeout(() => {
                errorMessageElement.style.display = 'none';
            }, 5000);
        } else {
            alert(message);
        }
    };

    // Show success message function
    const showSuccess = (message) => {
        if (successMessageElement) {
            successMessageElement.textContent = message;
            successMessageElement.style.display = 'block';
            setTimeout(() => {
                successMessageElement.style.display = 'none';
            }, 5000);
        } else {
            alert(message);
        }
    };

    // Modal event listeners
    if (openSignUpModalBtn) {
        openSignUpModalBtn.addEventListener('click', () => {
            signUpModal.style.display = 'block';
        });
    }

    if (closeSignUpModalBtn) {
        closeSignUpModalBtn.addEventListener('click', () => {
            signUpModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === signUpModal) {
            signUpModal.style.display = 'none';
        }
    });

    // --- Form Validation Functions ---
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // --- Sign-Up Form Submission ---
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = this.username.value.trim();
            const email = this.email.value.trim();
            const password = this.password.value;

            // Debug log
            console.log('Submitting registration:', {
                url: `${API_BASE_URL}/api/register`,
                data: { username, email, password: '***' }
            });

            // Enhanced validation
            if (!username || !email || !password) {
                showError('All fields are required');
                return;
            }

            if (!validatePassword(password)) {
                showError('Password must be at least 6 characters long');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }

                // Store user data securely
                localStorage.setItem('currentUser', data.username);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('token', data.token);

                showSuccess('Profile created successfully!');
                signUpModal.style.display = 'none';
                signUpForm.reset();

                // Redirect to Amie-Skills page after a short delay
                setTimeout(() => {
                    window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
                }, 1500);
            } catch (error) {
                console.error('Sign-up error:', error);
                showError(error.message || 'Failed to create account. Please try again.');
            }
        });
    }

    // --- Login Form Submission ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = this.email.value.trim();
            const password = this.password.value;

            // Debug log
            console.log('Attempting login:', {
                url: `${API_BASE_URL}/api/login`,
                email: email
            });

            if (!email || !password) {
                showError('Email and password are required');
                return;
            }

            if (!validateEmail(email)) {
                showError('Please enter a valid email address');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    credentials: 'include',
                    mode: 'cors',
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }

                // Store user data securely
                localStorage.setItem('currentUser', data.username);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('token', data.token);

                showSuccess('Login successful!');

                // Redirect to Amie-Skills page after a short delay
                setTimeout(() => {
                    window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
                }, 1500);
            } catch (error) {
                console.error('Login error:', error);
                showError(error.message || 'Invalid email or password.');
            }
        });
    }

    // --- Logout Function ---
    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_BASE_URL}/api/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Logout failed');
            }

            // Clear local storage
            localStorage.clear();
            
            // Redirect to login page
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
            showError('Error logging out. Please try again.');
        }
    };

    // Add logout button event listener
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    // Check authentication status and handle auto-redirect
    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const currentPath = window.location.pathname;
        
        if (token && currentPath === '/') {
            window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
        } else if (!token && currentPath !== '/') {
            window.location.href = '/';
        }
    };

    // Check authentication on page load
    checkAuth();
});
