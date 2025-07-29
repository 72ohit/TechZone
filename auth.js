// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutLink = document.getElementById('logout-link');
    const userMenu = document.querySelector('.user-menu');
    const userNameSpan = document.querySelector('.user-name');
    const authLinks = document.querySelectorAll('.auth-link'); // Select all auth links (Login, Register, Logout)
    const adminLink = document.getElementById('admin-link');

    // Function to update UI based on login status
    function updateAuthUI() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userEmail = localStorage.getItem('userEmail'); // Still useful for admin check

        if (loggedInUser) {
            // Hide Login and Register links
            authLinks.forEach(link => {
                if (link.id !== 'logout-link') { // Keep logout link to be controlled below
                    link.style.display = 'none';
                }
            });
            // Show user menu and logout link
            userMenu.style.display = 'block';
            userNameSpan.textContent = `Hello, ${loggedInUser}!`;
            if (logoutLink) logoutLink.style.display = 'inline-block'; // Ensure logout link is visible

            // Show admin link only if logged in user is admin
            if (userEmail === 'admin@techzone.com' && adminLink) {
                adminLink.style.display = 'block';
            } else if (adminLink) {
                adminLink.style.display = 'none';
            }
        } else {
            // Show Login and Register links
            authLinks.forEach(link => {
                if (link.id !== 'logout-link') {
                    link.style.display = 'inline-block';
                }
            });
            // Hide user menu and logout link
            userMenu.style.display = 'none';
            if (logoutLink) logoutLink.style.display = 'none'; // Ensure logout link is hidden
            if (adminLink) {
                adminLink.style.display = 'none';
            }
        }
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.querySelector('#login-username').value;
            const password = loginForm.querySelector('#login-password').value;
            const termsAccepted = loginForm.querySelector('#login-terms').checked; //

            if (!termsAccepted) { //
                alert('You must agree to the Terms and Conditions to log in.'); //
                return; //
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            // Authenticate by username and password
            const user = users.find(u => u.username === username && u.password === password); //

            if (user) {
                localStorage.setItem('loggedInUser', user.username); // Store username
                localStorage.setItem('userEmail', user.email); // Keep email for admin check
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                alert('Invalid username or password.');
            }
        });
    }

    // Register Form Submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = registerForm.querySelector('#register-username').value; //
            const email = registerForm.querySelector('#register-email').value; //
            const password = registerForm.querySelector('#register-password').value; //
            const confirmPassword = registerForm.querySelector('#confirm-password').value; //
            const termsAccepted = registerForm.querySelector('#register-terms').checked; //

            if (password !== confirmPassword) { //
                alert('Passwords do not match.');
                return;
            }

            if (!termsAccepted) { //
                alert('You must agree to the Terms and Conditions to register.'); //
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if username or email already exists
            if (users.some(u => u.username === username)) { //
                alert('Username already exists. Please choose a different one.'); //
                return;
            }
            if (users.some(u => u.email === email)) { //
                alert('Email already registered. Please login or use a different email.'); //
                return;
            }

            // Store username, email, password, and default role
            users.push({ username, email, password, role: 'user' }); //
            localStorage.setItem('users', JSON.stringify(users)); //
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    // Logout Functionality
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('userEmail');
            alert('You have been logged out.');
            window.location.href = 'index.html'; // Redirect to home page
        });
    }

    // Initial load UI update
    updateAuthUI();

    // Initialize dummy admin user if not exists for demonstration
    // Ensure the admin user also has a username
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!users.some(u => u.email === 'admin@techzone.com')) {
        users.push({ username: 'admin', email: 'admin@techzone.com', password: 'adminpassword', role: 'admin' });
        localStorage.setItem('users', JSON.stringify(users));
    }
});