// Form validation for the Expensify feedback form
const feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const feedbackInput = document.getElementById('feedback');

  function showError(input, message) {
    const group = input.closest('.input-group');
    group.classList.add('input-error');

    let error = group.querySelector('.error-message');
    if (!error) {
      error = document.createElement('small');
      error.className = 'error-message';
      group.appendChild(error);
    }
    error.textContent = message;
  }

  function clearError(input) {
    const group = input.closest('.input-group');
    group.classList.remove('input-error');
    const error = group.querySelector('.error-message');
    if (error) error.remove();
  }

  function validateName() {
    const name = nameInput.value.trim();
    const namePattern = /^[A-Za-z][A-Za-z\s.'-]*$/;

    if (name === '') {
      showError(nameInput, 'Please enter your name.');
      return false;
    }
    if (name.length < 2) {
      showError(nameInput, 'Name must contain at least 2 characters.');
      return false;
    }
    if (!namePattern.test(name)) {
      showError(nameInput, 'Name can contain only letters, spaces, apostrophes, dots and hyphens.');
      return false;
    }

    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email === '') {
      showError(emailInput, 'Please enter your email address.');
      return false;
    }
    if (!emailPattern.test(email)) {
      showError(emailInput, 'Please enter a valid email address.');
      return false;
    }

    clearError(emailInput);
    return true;
  }

  function validateFeedback() {
    const feedback = feedbackInput.value.trim();

    if (feedback === '') {
      showError(feedbackInput, 'Please enter your feedback or suggestion.');
      return false;
    }
    if (feedback.length < 10) {
      showError(feedbackInput, 'Feedback must contain at least 10 characters.');
      return false;
    }
    if (feedback.length > 500) {
      showError(feedbackInput, 'Feedback must not exceed 500 characters.');
      return false;
    }

    clearError(feedbackInput);
    return true;
  }

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  feedbackInput.addEventListener('blur', validateFeedback);

  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isFeedbackValid = validateFeedback();

    if (!isNameValid || !isEmailValid || !isFeedbackValid) {
      const firstInvalid = feedbackForm.querySelector('.input-error input, .input-error textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Keep the success message visible instead of making it disappear.
    let successMessage = document.getElementById('feedbackSuccess');
    if (!successMessage) {
      successMessage = document.createElement('p');
      successMessage.id = 'feedbackSuccess';
      successMessage.className = 'feedback-success';
      feedbackForm.appendChild(successMessage);
    }

    successMessage.textContent = 'Thank you for your feedback! Your response has been recorded.';
    feedbackForm.reset();
  });
}
