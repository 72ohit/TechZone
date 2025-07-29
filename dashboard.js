// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const totalUsersCount = document.getElementById('total-users-count');
    const totalProductsCount = document.getElementById('total-products-count');

    // Access control: Only allow admin to view this page
    const loggedInUserEmail = localStorage.getItem('userEmail');
    if (loggedInUserEmail !== 'admin@techzone.com') {
        alert('Access Denied. You must be an administrator to view this page.');
        window.location.href = 'index.html';
        return; // Stop execution
    }

    function loadDashboardStats() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (totalUsersCount) {
            totalUsersCount.textContent = users.length;
        }
        if (totalProductsCount) {
            totalProductsCount.textContent = products.length;
        }
    }

    loadDashboardStats();
});