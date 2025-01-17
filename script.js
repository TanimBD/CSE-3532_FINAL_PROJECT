document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (button.textContent === 'Add to Cart') {
                event.stopPropagation(); // Prevent triggering product details
                if (isUserLoggedIn()) {
                    addToCart(button.dataset.product, parseFloat(button.dataset.price));
                } else {
                    alert('Please log in to add items to the cart.');
                }
            }
        });
    });

    updateAuthUI();
    updateCartCount();
    updateCartTotal();
});

const hardcodedEmail = 'test@example.com';
const hardcodedPassword = '123456';

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
}

function showSignUpForm() {
    document.getElementById('signUpForm').style.display = 'block';
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}

function signUp(event) {
    event.preventDefault();
    
    alert('Sign Up functionality is disabled in this demo.');
    closeForm('signUpForm');
}

function login(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === hardcodedEmail && password === hardcodedPassword) {
        localStorage.setItem('loggedIn', 'true');
        alert('Login Successful! Welcome back.');
        closeForm('loginForm');
        updateAuthUI();
    } else {
        alert('Login Failed! Incorrect email or password.');
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    alert('You have been logged out.');
    updateAuthUI();
}

function updateAuthUI() {
    const loggedIn = isUserLoggedIn();
    document.getElementById('logoutLink').style.display = loggedIn ? 'inline' : 'none';
}

function isUserLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

let cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function updateCartTotal() {
    displayCartItems();
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Clear existing items
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>${item.name}</div>
            <div>${item.quantity} x $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItemsDiv.appendChild(totalDiv);
}

function showProductDetails(productName, productImage, productPrice) {
    document.getElementById('productTitle').textContent = productName;
    document.getElementById('productImage').src = productImage;
    document.getElementById('productPrice').textContent = `Price: $${productPrice}`;
    document.getElementById('productDetails').style.display = 'block';
}

function showCart() {
    updateCartTotal();
    document.getElementById('cartModal').style.display = 'block';
}

function payWithBkash() {
    alert('Proceeding to pay with bKash.');
}

function payWithNagad() {
    alert('Proceeding to pay with Nagad.');
}
