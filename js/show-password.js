const passwordField = document.querySelector(
  '.form .field input[type="password"]'
);

const showPassword = document.querySelector(".btn");

showPassword.addEventListener("click", (event) => {
  event.preventDefault();
  if (passwordField.type === "password") {
    passwordField.type = "text";
    showPassword.textContent = "Hide";
  } else {
    passwordField.type = "password";
    showPassword.textContent = "Show";
  }
});
