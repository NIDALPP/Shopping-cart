let cart = [];
const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');
const cartItemElement = document.getElementById('cartItem');
const rootElement = document.getElementById('root');


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
  }


fetch('products.json')
  .then(response => response.json())
  .then(products => {
    displayProducts(products);
  })
  .catch(error => console.error('Error loading products:', error));

function displayProducts(products) {
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
    rootElement.appendChild(productElement);
  });
}

function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItemElement.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.name} (${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemElement.appendChild(cartItem);
  });

  if (cart.length === 0) {
    cartItemElement.innerHTML = 'Your cart is empty';
  }

  totalElement.textContent = `₹${total.toFixed(2)}`;
  countElement.textContent = cart.length;
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}
