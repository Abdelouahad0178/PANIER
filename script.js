const products = [
    { id: 1, name: "Produit 1", price: 100 },
    { id: 2, name: "Produit 2", price: 200 },
    { id: 3, name: "Produit 3", price: 300 },
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];

function displayProducts() {
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Prix : ${product.price} DHS</p>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        const subtotal = item.price * item.quantity;
        li.innerHTML = `
            <div class="cart-item-info">
                ${item.name} - ${item.price} DHS x ${item.quantity} = ${subtotal} DHS
            </div>
            <div>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItems.appendChild(li);
        total += subtotal;
    });
    cartTotal.textContent = total;
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCart();
    }
}

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
    } else {
        alert("Commande passée avec succès !");
        cart = [];
        updateCart();
    }
});

displayProducts();