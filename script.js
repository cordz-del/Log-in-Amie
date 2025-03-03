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

      // Gather form data into an object
      const formData = new FormData(this);
      const userData = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (response.ok) {
          alert('Profile created successfully!');
          signUpModal.style.display = 'none';
        } else {
          alert('Error creating profile. Please try again.');
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

      const username = this.username.value;
      const password = this.password.value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        if (response.ok) {
          // Store the username for later use and redirect to Amie-Skills page
          localStorage.setItem('currentUser', username);
          window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
        } else {
          alert('Invalid username or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Server error. Please try again later.');
      }
    });
  }
});
