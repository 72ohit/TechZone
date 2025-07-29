// usersdata.js
document.addEventListener('DOMContentLoaded', () => {
    const usersTableBody = document.getElementById('users-table-body'); // Use a more specific ID

    // Access control: Only allow admin to view this page
    const loggedInUserEmail = localStorage.getItem('userEmail');
    if (loggedInUserEmail !== 'admin@techzone.com') {
        alert('Access Denied. You must be an administrator to view this page.');
        window.location.href = 'index.html';
        return; // Stop execution
    }

    // Function to load and display users
    function loadUsers() {
        if (!usersTableBody) return; // Exit if element not found

        usersTableBody.innerHTML = ''; // Clear existing rows
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.length === 0) {
            const row = usersTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 3; // Ensure it spans all columns
            cell.textContent = 'No users registered yet.';
            cell.style.textAlign = 'center';
            return;
        }

        users.forEach(user => {
            const row = usersTableBody.insertRow();
            row.insertCell().textContent = user.username;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = user.password; // For demonstration ONLY - NEVER store real passwords this way
        });
    }

    // Call loadUsers on page load
    loadUsers();
});