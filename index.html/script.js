// =============================
// CART SYSTEM - SPORTX
// =============================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
    const item = {
        name: name,
        price: price,
        quantity: 1
    };

    // Check if item already exists
    let found = cart.find(p => p.name === name);

    if (found) {
        found.quantity++;
    } else {
        cart.push(item);
    }

    saveCart();
    alert(name + " added to cart!");
}

// Display cart items
function loadCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="increaseQty(${index})">+</button>
                    <button onclick="decreaseQty(${index})">-</button>
                    <button onclick="removeItem(${index})" style="background:red;color:white;">Remove</button>
                </div>
            </div>
        `;
    });

    totalPriceElement.innerText = total;
}

// Increase quantity
function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
    loadCart();
}

// Decrease quantity
function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    loadCart();
    alert("Cart cleared!");
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase! 🎉");
    cart = [];
    saveCart();
    loadCart();
}

// Load cart on page open
window.onload = loadCart;
