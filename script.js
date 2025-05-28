// Get references to form input elements
let names = document.getElementById("inputName");
let email = document.getElementById("inputEmail");
let phoneNumber = document.getElementById("inputPhoneNumber");

// Flags to track if individual input fields are valid
let nameCheck = false;
let phoneCheck = false;
let emailCheck = false;

//Add new variables for password fields
let password = document.getElementById("inputPassword");
let confirmPassword = document.getElementById("inputConfirmPassword");
let passwordCheck = false;

// Attach blur event listeners to input fields for validation on losing focus
names.addEventListener("blur", checkName);
email.addEventListener("blur", checkEmail);
phoneNumber.addEventListener("blur", checkPhoneNumber);

// Get reference to the submit button and alert display area
let submit = document.getElementById("submit");
let alerts = document.getElementById("alert");

// Add event listeners for password fields
password.addEventListener("blur", checkPassword);
confirmPassword.addEventListener("blur", checkConfirmPassword);

// Handle form submission
submit.addEventListener("click", function (e) {
  // Check if all validation flags are true
  if (nameCheck && phoneCheck && emailCheck && passwordCheck) {
    // Show success alert if all inputs are valid
    alerts.innerHTML = `
      <div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Successfully</strong> submitted form
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;

    // Add 2 second delay before resetting the form
    form.reset();
    nameCheck = phoneCheck = emailCheck = passwordCheck = false;
  } else {
    // Show error alert if any input is invalid
    alerts.innerHTML = `
      <div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please</strong> enter valid details
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
  }

  // Automatically clear alert after 3 seconds
  setTimeout(() => {
    alerts.innerHTML = "";
  }, 3000);

  // Prevent default form submission behavior (page reload)
  e.preventDefault();
});

// Function to validate the name input
function checkName() {
  // Regex: Allows letters and spaces, between 4 to 20 characters
  let reg = /^([a-zA-Z ]){4,20}$/;
  let str = names.value;

  if (reg.test(str)) {
    names.classList.remove("is-invalid");
    nameCheck = true;
  } else {
    names.classList.add("is-invalid");
    nameCheck = false;
  }
}

// Function to validate the email input
function checkEmail() {
  // Basic email regex validation
  let reg = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([A-Za-z]){2,8}$/;
  let str = email.value;

  if (reg.test(str)) {
    emailCheck = true;
    email.classList.remove("is-invalid");
  } else {
    emailCheck = false;
    email.classList.add("is-invalid");
  }
}

// Function to validate the phone number input
function checkPhoneNumber() {
  // Regex: Accepts 10 to 12 digit numbers only
  let reg = /^([0-9]){10,12}$/;
  let str = phoneNumber.value;

  if (reg.test(str)) {
    phoneNumber.classList.remove("is-invalid");
    phoneCheck = true;
  } else {
    phoneCheck = false;
    phoneNumber.classList.add("is-invalid");
  }
}

// Add password validation function
function checkPassword() {
  let str = password.value;
  let userName = names.value.toLowerCase();

  // Check password requirements
  if (str.length < 8) {
    password.classList.add("is-invalid");
    password.nextElementSibling.innerHTML =
      "Password must be at least 8 characters long!";
    passwordCheck = false;
  } else if (str.toLowerCase() === "password") {
    password.classList.add("is-invalid");
    password.nextElementSibling.innerHTML = "Password cannot be 'password'!";
    passwordCheck = false;
  } else if (str.toLowerCase() === userName) {
    password.classList.add("is-invalid");
    password.nextElementSibling.innerHTML = "Password cannot be your name!";
    passwordCheck = false;
  } else {
    password.classList.remove("is-invalid");
    passwordCheck = true;
    checkConfirmPassword(); // Check confirm password when password is valid
  }
}

// Add confirm password validation function
function checkConfirmPassword() {
  let confirmStr = confirmPassword.value;
  let passwordStr = password.value;

  if (confirmStr !== passwordStr) {
    confirmPassword.classList.add("is-invalid");
    confirmPassword.nextElementSibling.innerHTML = "Passwords do not match!";
    passwordCheck = false;
  } else if (passwordCheck) {
    // Only validate if the main password is valid
    confirmPassword.classList.remove("is-invalid");
    passwordCheck = true;
  }
}
