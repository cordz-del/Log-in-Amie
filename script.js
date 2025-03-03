// script.js for Log-in-Amie

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

      const username = this.username.value;
      const email = this.email.value;
      const password = this.password.value;

      // Basic validation
      if (!username || !email || !password) {
        alert('All fields are required');
        return;
      }

      try {
        const response = await fetch('https://nodejs-amiemongodb.replit.app/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Profile created successfully!');
          signUpModal.style.display = 'none';
          // Optional: Clear the form
          signUpForm.reset();
        } else {
          alert(data.error || 'Error creating profile. Please try again.');
        }
      } catch (error) {
        console.error('Sign-up error:', error);
        alert('Server error. Please try again later.');
      }
    });
  }

  // --- Login Form Submission ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = this.email.value;
      const password = this.password.value;

      // Basic validation
      if (!email || !password) {
        alert('Email and password are required');
        return;
      }

      try {
        const response = await fetch('https://nodejs-amiemongodb.replit.app/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          // Store the username and userId for later use
          localStorage.setItem('currentUser', data.username);
          localStorage.setItem('userId', data.userId);
          // Redirect to Amie-Skills page
          window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
        } else {
          alert(data.error || 'Invalid email or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Server error. Please try again later.');
      }
    });
  }
});
