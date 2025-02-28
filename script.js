// Wait for the DOM to be fully loaded before attaching event (safety measure)
document.addEventListener('DOMContentLoaded', () => {
  // Select the 'Sign In' button by its ID
  const signInBtn = document.getElementById('sign-in');

  // Attach a click event listener to intercept the click
  if (signInBtn) {
    signInBtn.addEventListener('click', (event) => {
      event.preventDefault();  // Prevent any default action (e.g., form submission or link navigation)
      // Redirect the user to the specified URL
      window.location.href = 'https://cordz-del.github.io/Amie-Skills/';
    });
  }
});
