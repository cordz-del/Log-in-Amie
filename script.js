// script.js for Log-in-Amie

const API_BASE_URL = 'https://nodejs-amiemongodb.replit.app';

document.addEventListener('DOMContentLoaded', function () {
  // --- Modal Handling for "Create Profile" ---
  const signUpModal = document.getElementById('signUpModal');
  const openSignUpModalBtn = document.getElementById('openSignUpModal');
  const closeSignUpModalBtn = document.getElementById('closeSignUpModal');

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

  // Close the modal if clicking outside the modal content area
  window.addEventListener('click', (event) => {
    if (event.target === signUpModal) {
      signUpModal.style.display = 'none';
    }
  });

  // --- Sign-Up Form Submission ---
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const username = this.username.value.trim();
      const email = this.email.value.trim();
      const password = this.password.value;

      // Enhanced validation
      if (!username || !email || !password) {
        alert('All fields are required');
        return;
      }

      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address');
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
          body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Registration failed');
        }

        const data = await response.json();
        alert('Profile created successfully!');
        signUpModal.style.display = 'none';
        signUpForm.reset();

      } catch (error) {
        console.error('Sign-up error:', error);
        alert(error.message || 'Server error. Please try again later.');
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

      // Enhanced validation
      if (!email || !password) {
        alert('Email and password are required');
        return;
      }

      if (!email.includes('@')) {
        alert('Please enter a valid email address');
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
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();

        // Store user data in localStorage
        localStorage.setItem('currentUser', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userEmail', email);

        // Redirect to Amie-Skills page
        window.location.href = 'https://cordz-del.github.io/Amie-Skills/';

      } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Invalid email or password.');
      }
    });
  }

  // Check if user is already logged in
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser && window.location.pathname !== '/Amie-Skills/') {
    // Optional: Auto-redirect if already logged in
    // window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
  }
});
