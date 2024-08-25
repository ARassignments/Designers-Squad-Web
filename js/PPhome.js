'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);


addEventOnElem(window, "scroll", showElemOnScroll);



/**
 * product filter
 */

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  filterBox.setAttribute("data-filter", this.dataset.filterBtn)
}

addEventOnElem(filterBtns, "click", filter);





let cart = []; // Shopping cart items ko store karega

// Function to add item to cart
function addToCart(name, price) {
    const item = cart.find(product => product.name === name);
    
    if (item) {
        item.quantity += 1; // Agar item already cart mein hai, to quantity increase karo
    } else {
        cart.push({ name, price, quantity: 1 }); // Naya item add karo
    }
    updateCartDisplay(); // Cart ko update karne wala function call karo
}

// Cart display ko update karne ka function
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pehle se existing items clear karo
    
    cart.forEach(product => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price} x ${product.quantity}</span>
            <button onclick="removeFromCart('${product.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    updateCartTotal(); // Cart ke total amount ko update karo
}

// Cart ke total amount ko update karne ka function
function updateCartTotal() {
    const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: $${total.toFixed(2)}`;
}

// Cart se item remove karne ka function
function removeFromCart(name) {
    cart = cart.filter(product => product.name !== name);
    updateCartDisplay();
}

// Har "Add to Cart" button ke click par item cart mein add karo
document.querySelectorAll('.card-action-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.querySelector('.card-title').innerText;
        const price = parseFloat(productCard.querySelector('.price').getAttribute('value'));
        
        addToCart(name, price);
    });
});



