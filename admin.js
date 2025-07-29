// admin.js
document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');

    // Handle Add New Product Form Submission
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const productName = document.getElementById('product-name').value;
            const productImage = document.getElementById('product-image').value;
            const productDescription = document.getElementById('product-description').value;
            const productPrice = parseFloat(document.getElementById('product-price').value);
            const productOldPrice = document.getElementById('product-old-price').value ? parseFloat(document.getElementById('product-old-price').value) : null;
            const productDiscount = document.getElementById('product-discount').value ? parseInt(document.getElementById('product-discount').value) : null;
            const productCategory = document.getElementById('product-category').value.toLowerCase();

            let products = JSON.parse(localStorage.getItem('products')) || [];

            const newProduct = {
                id: Date.now(), // Simple unique ID based on timestamp
                name: productName,
                image: productImage,
                description: productDescription,
                price: productPrice,
                oldPrice: productOldPrice,
                discount: productDiscount,
                category: productCategory,
                addedDate: new Date().toISOString() // Store addition date
            };

            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            alert('Product added successfully!');
            addProductForm.reset(); // Clear the form
        });
    }

    // Access control for admin page (redundant with auth.js but good for direct access)
    const loggedInUserEmail = localStorage.getItem('userEmail');
    if (window.location.pathname.includes('admin.html') && loggedInUserEmail !== 'admin@techzone.com') {
        alert('Access Denied. You must be an administrator to view this page.');
        window.location.href = 'index.html';
    }
});