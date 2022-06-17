const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPasswd = document.getElementById('confirm-passwd');

// Show error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check required fields
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.dataset.fieldname} is required`);
      return;
    }

    showSuccess(input);
    return;
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.dataset.fieldname} must be at least ${min} characters`
    );
    return;
  }

  if (input.value.length > max) {
    showError(
      input,
      `${input.dataset.fieldname} must be less than ${max} characters`
    );
    return;
  }

  showSuccess(input);
};

// Check for valid email
const checkEmail = (input) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
    return;
  }

  showError(input, `${input.dataset.fieldname} is not valid`);
  return;
};

// Check passwords match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

form.addEventListener('submit', function (event) {
  event.preventDefault();
  checkRequired([username, email, password, confirmPasswd]);
  checkLength(username, 3, 18);
  checkLength(password, 8, 32);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPasswd);
});
