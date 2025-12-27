// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const item = { name, price, quantity: 1 };
    let found = cart.find(p => p.name === name);
    if (found) {
        found.quantity++;
    } else {
        cart.push(item);
    }
    saveCart();
    alert(name + " added to cart!");
}

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

function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
    loadCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCart();
}

function clearCart() {
    cart = [];
    saveCart();
    loadCart();
    alert("Cart cleared!");
}

// Formspree Checkout
const orderForm = document.getElementById("orderForm");
if (orderForm) {
    orderForm.addEventListener("submit", function(e) {
        if (cart.length === 0) {
            alert("Cart is empty!");
            e.preventDefault();
            return;
        }

        const orderSummary = cart.map(i => `${i.name} x ${i.quantity} = ₹${i.price*i.quantity}`).join("\n");
        document.getElementById("orderData").value = orderSummary;

        const name = document.getElementById("nameInput").value;
        const email = document.getElementById("emailInput").value;
        if (!name || !email) {
            alert("Please fill your name and email!");
            e.preventDefault();
            return;
        }
        document.getElementById("customerName").value = name;
        document.getElementById("customerEmail").value = email;

        alert("Your order will be sent to our email!");
        clearCart();
    });
}

// Load cart on page open
window.onload = loadCart;
