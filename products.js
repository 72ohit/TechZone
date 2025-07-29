// products.js
document.addEventListener('DOMContentLoaded', () => {
    // Function to generate a product card HTML
    function createProductCardHtml(product) {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <p>${product.description || ''}</p>
                <div class="price">₹${product.price.toLocaleString()} ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString()}</span>` : ''}</div>
                ${product.discount ? `<span class="discount">(${product.discount}% off)</span>` : ''}
                <button class="btn btn-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
    }

    // --- ONLY Initialize dummy products IF localStorage.products DOES NOT EXIST ---
    if (!localStorage.getItem('products')) {
        const initialProducts = [
            {
                id: 1,
                name: "NVIDIA GeForce RTX 4080 Super Graphics Card",
                image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTE1EspICzhMEcxPVAqjF9RfIfBjExrGC1WgxGz5mNQlu_RT-O9YcpDWZF2OEijEipLj15TJ8FYnBIoO77jQ3tjTGRCwxha9QkltRTLgkEOLrccngnTc67MJg",
                description: "16GB GDDR6X, High Performance",
                price: 109999,
                oldPrice: 115000,
                discount: 4,
                category: "graphics_cards",
                addedDate: new Date().toISOString()
            },
            {
                id: 2,
                name: "AMD Ryzen 7 7800X3D Processor",
                image: "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-7-7800x3d.jpg",
                description: "8 Cores, 16 Threads, AM5",
                price: 35000,
                oldPrice: 38000,
                discount: 8,
                category: "cpus",
                addedDate: new Date().toISOString()
            },
            {
                id: 3,
                name: "Corsair Vengeance DDR5 32GB Kit",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSmSGlSFxyaeiwmTyXM-cdIIHkaqD9x99pQ&s",
                description: "6000MHz, RGB Lighting",
                price: 12500,
                oldPrice: 14000,
                discount: 11,
                category: "ram",
                addedDate: new Date().toISOString()
            },
             {
                id: 4,
                name: "Intel Core i5 12400F 12th Gen Desktop PC",
                image: "https://m.media-amazon.com/images/I/51A6E9HPocL._AC_UY327_FMwebp_QL65_.jpg",
                description: "6 Cores, 12 Threads, LGA1700",
                price: 9000,
                oldPrice: 10000,
                discount: 10,
                category: "cpus",
                addedDate: new Date().toISOString()
            },
            {
                id: 5,
                name: "Cooler Master ML240L Core CPU Liquid Cooler",
                image: "https://m.media-amazon.com/images/I/41mZbJjAVCL._AC_UY327_FMwebp_QL65_.jpg",
                description: "240mm AIO, Black",
                price: 5000,
                oldPrice: null,
                discount: null,
                category: "cooling",
                addedDate: new Date().toISOString()
            }
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    // --- END of initial dummy product setup ---

    // Now, retrieve products from localStorage (which might include new ones)
    const products = JSON.parse(localStorage.getItem('products'));


    // Logic for index.html (Popular Products)
    if (document.getElementById('popular-products-grid')) {
        const popularProductsGrid = document.getElementById('popular-products-grid');
        // Sort by some popularity metric or just pick a few for demo
        const productsToDisplay = products.sort(() => 0.5 - Math.random()).slice(0, 4); // Random 4 products
        productsToDisplay.forEach(product => {
            popularProductsGrid.innerHTML += createProductCardHtml(product);
        });
    }

    // Logic for category pages (e.g., cpu.html)
    if (document.getElementById('category-products-grid')) {
        const categoryTitle = document.getElementById('category-title');
        const categoryProductsGrid = document.getElementById('category-products-grid');

        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');

        let filteredProducts = [];
        if (category) {
            categoryTitle.textContent = category.replace(/_/g, ' ').toUpperCase() + ' Components';
            filteredProducts = products.filter(p => p.category === category);
        } else {
            categoryTitle.textContent = 'All Components';
            filteredProducts = products;
        }

        if (filteredProducts.length === 0) {
            categoryProductsGrid.innerHTML = '<p style="text-align: center; width: 100%;">No products found in this category.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            categoryProductsGrid.innerHTML += createProductCardHtml(product);
        });
    }

    // Logic for new-products.html
    if (document.getElementById('new-products-grid')) {
        const newProductsGrid = document.getElementById('new-products-grid');
        // Get products added in the last 7 days (or adjust as needed)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const newlyAddedProducts = products
            .filter(p => new Date(p.addedDate) > sevenDaysAgo)
            .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)); // Sort newest first

        if (newlyAddedProducts.length === 0) {
            newProductsGrid.innerHTML = '<p style="text-align: center; width: 100%;">No new products added recently.</p>';
        } else {
            newlyAddedProducts.forEach(product => {
                newProductsGrid.innerHTML += createProductCardHtml(product);
            });
        }
    }

    // Add to cart functionality (simplified for demonstration)
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            if (productId) {
                // In a real scenario, you'd add this to a 'cart' array in localStorage
                // and update the cart count. For simplicity, just an alert.
                alert(`Product ${productId} added to cart! (Functionality limited to demo)`);

                // Update cart count (simple increment for demo)
                let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
                cartCount++;
                localStorage.setItem('cartCount', cartCount);
                document.querySelector('.cart-count').textContent = cartCount;
            }
        });
    });

    // Initial cart count display
    const cartCountSpan = document.querySelector('.cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = localStorage.getItem('cartCount') || '0';
    }
});