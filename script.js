// Base API URL for backend requests (update if needed)
const API_BASE_URL = 'https://your-backend-api-url.com';  // Example; replace with actual backend URL

// On page load, check authentication status and handle redirects
window.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');
  const currentPath = window.location.pathname;

  // If user is already logged in (token exists)
  if (token) {
    // If on login or signup page, redirect to main app page
    if (currentPath.includes('login') || currentPath.includes('signup')) {
      window.location.href = 'https://cordz-del.github.io/Amie-Skills/';  // Redirect to main page
      return;
    }
    // If on main page and token exists, you might load user data or adjust UI (optional)
    // e.g., show a logout button or user info instead of login/sign up links.
  } else {
    // If no token and trying to access a protected page (not login or signup), redirect to login page
    if (!currentPath.includes('login') && !currentPath.includes('signup')) {
      // Redirect to login page if not logged in
      window.location.href = 'https://cordz-del.github.io/Amie-Skills/login.html';
      return;
    }
    // If on login or signup page and not logged in, no redirect needed (user is where they should be)
  }

  // Handle Login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Get input values
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
      try {
        // Send login request to backend
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
        });
        if (!response.ok) {
          // Login failed (invalid credentials or other error)
          const errorData = await response.json().catch(() => ({}));
          const errMsg = errorData.message || errorData.error || 'Login failed. Please check your credentials.';
          alert(errMsg);
          return;
        }
        // Login successful
        const data = await response.json();
        if (data.token) {
          // Store token in sessionStorage for session persistence
          sessionStorage.setItem('token', data.token);
        }
        // Redirect to main page after successful login
        window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
      } catch (err) {
        console.error('Login error:', err);
        alert('An error occurred during login. Please try again.');
      }
    });
  }

  // Handle Registration (Sign Up) form submission
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // Get input values (adjust IDs if different in your HTML)
      const name = document.getElementById('signup-name') ? document.getElementById('signup-name').value.trim() : '';
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();
      if (!email || !password) {
        alert('Please fill in all required fields.');
        return;
      }
      try {
        // Send registration request to backend
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, password: password })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          // Registration failed (e.g., user already exists, validation error)
          const errMsg = data.message || data.error || 'Registration failed. Please try again.';
          alert(errMsg);
          return;
        }
        // Registration successful
        if (data.token) {
          // If API returns a token upon registration, store it (assuming auto-login on sign-up)
          sessionStorage.setItem('token', data.token);
        }
        // Redirect to main page after successful registration
        window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
      } catch (err) {
        console.error('Registration error:', err);
        alert('An error occurred during registration. Please try again.');
      }
    });
  }

  // Handle Logout action
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear session storage to remove token and any other data
      sessionStorage.clear();
      // Redirect to login page after logout
      window.location.href = 'https://cordz-del.github.io/Amie-Skills/login.html';
    });
  }
});
