// cart items — add more products here as needed
const cartItems = [
  { name: "ThinkPad X1 Carbon", desc: "14\" premium laptop", price: 1935.46 },
  { name: "Yoga Pro 9i",        desc: "Windows 11 Home 64", price: 1699.99 },
];

// builds the cart list and total every time something changes
function renderCart() {
  const container = document.getElementById("cartItems");
  const footer    = document.getElementById("cartFooter");
  if (!container || !footer) return;

  container.innerHTML = "";

  // if cart is empty show a message instead
  if (cartItems.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footer.innerHTML = "";
    return;
  }

  // build a row for each item
  cartItems.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-desc">${item.desc}</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
        <button class="cart-remove-btn" data-index="${i}">×</button>
      </div>
    `;
    container.appendChild(div);
  });

  // calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  footer.innerHTML = `
    <div class="cart-total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <button class="checkout-btn" id="checkoutBtn">Proceed to checkout</button>
  `;

  // remove item when × is clicked
  document.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cartItems.splice(Number(btn.dataset.index), 1);
      renderCart();
    });
  });

  // checkout button — shows loading state then goes to confirmation page
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const btn = document.getElementById("checkoutBtn");
    btn.textContent = "Processing...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {
      window.location.href = "../pages/orderconfirm.html";
    }, 1200);
  });
}

// run on page load
renderCart();