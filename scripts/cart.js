// having cart store the items that are added to cart in loacal storage 
// reads the cart from localStorage, returns an empty array if nothing saved yet
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

// saves the cart back to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// adds a product to the cart and saves it
function addToCart(name, desc, price) {
  const cart = getCart();
  cart.push({ name, desc, price });
  saveCart(cart);
}

// having the add to cart button add the item to the cart page 
const cartBtn = document.getElementById("cartBtn");
const cartConfirm = document.getElementById("cartConfirm");

// have an interaction to confirm to the user that the item is being added
if (cartBtn && cartConfirm) {
  cartBtn.addEventListener("click", () => {
    cartBtn.textContent = "Adding...";
    cartBtn.disabled = true;

    setTimeout(() => {
      // read the product details from the page
      const name  = document.querySelector(".product-name")?.textContent  || "Product";
      const desc  = document.querySelector(".product-desc")?.textContent  || "";
      const priceText = document.querySelector(".product-price")?.textContent || "$0";
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

      // add to cart in localStorage
      addToCart(name, desc, price);

      // show message that the item is added to cart
      cartBtn.textContent = "Add to cart";
      cartBtn.disabled = false;
      cartConfirm.style.opacity = "1";
      setTimeout(() => (cartConfirm.style.opacity = "0"), 2000);
    }, 900);
  });
}

// Cart page only functions
function renderCart() {
  const container = document.getElementById("cartItems");
  const footer    = document.getElementById("cartFooter");
  if (!container || !footer) return;

  const cart = getCart();
  container.innerHTML = "";

  // if cart is empty show a message and take away the checkout btn
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footer.innerHTML = "";
    return;
  }

  // build a row for each item
  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
        <button class="cart-remove-btn" data-index="${i}">×</button>
      </div>
    `;
    container.appendChild(div);
  });

  // adding to get the total price of all the items in a cart
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  footer.innerHTML = `
    <div class="cart-total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <button class="checkout-btn" id="checkoutBtn">Proceed to checkout</button>
  `;

  // remove item when the X button is clicked
  document.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cart = getCart();
      cart.splice(Number(btn.dataset.index), 1);
      saveCart(cart);
      renderCart();
    });
  });

  // checkout, clears cart then go to confirmation page
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const btn = document.getElementById("checkoutBtn");
    btn.textContent = "Processing...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {
      localStorage.removeItem("cart"); // empty the cart after ordering
      window.location.href = "../pages/orderConfirm.html";
    }, 1200);
  });
}

// run on page load, only does anything on cart.html where cartItems exists
renderCart();