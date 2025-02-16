const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    container.classList.remove("active");
});

signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = 'panel.html';
});
