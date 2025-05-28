// Get references to form input elements
let names = document.getElementById("inputName");
let email = document.getElementById("inputEmail");
let phoneNumber = document.getElementById("inputPhoneNumber");

// Flags to track if individual input fields are valid
let nameCheck = false;
let phoneCheck = false;
let emailCheck = false;

// Attach blur event listeners to input fields for validation on losing focus
names.addEventListener("blur", checkName);
email.addEventListener("blur", checkEmail);
phoneNumber.addEventListener("blur", checkPhoneNumber);

// Get reference to the submit button and alert display area
let submit = document.getElementById("submit");
let alerts = document.getElementById("alert");

// Handle form submission
submit.addEventListener("click", function (e) {
  // Check if all validation flags are true
  if (nameCheck && phoneCheck && emailCheck) {
    // Show success alert if all inputs are valid
    alerts.innerHTML = `
      <div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Successfully</strong> submitted form
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
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
