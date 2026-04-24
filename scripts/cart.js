// using json so the cart can store the items that are added to cart in loacal storage 
// reads the cart from localStorage, and returns an empty array if nothing saved yet
function getCart() {
  // getting saved in cart data
  // converts string to JavaScript array
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

// saves the cart back to localStorage
function saveCart(cart) {
  // converts the item to a string and saves it in localStorage in cart
  localStorage.setItem("cart", JSON.stringify(cart));
}

// adds the product from the product page to the cart and saves it in the cart page
function addToCart(name, desc, price) {
  const cart = getCart();
  // adds new items as an object
  cart.push({ name, desc, price });
  // updates the cart back to localStorage
  saveCart(cart);
}

// having the add to cart button add the item to the cart page 
const cartBtn = document.getElementById("cartBtn");
const cartConfirm = document.getElementById("cartConfirm");

// have an interaction to confirm to the user that the item is being added
if (cartBtn && cartConfirm) {
  cartBtn.addEventListener("click", () => {
    cartBtn.textContent = "Adding...";
    // prevents spam clicking and disables the btn
    cartBtn.disabled = true;

    // loading effect
    setTimeout(() => {
      // read the product details from the page
      // finding the element with class .product-name
      const name  = document.querySelector(".product-name")?.textContent  || "Product";
      // getting product description
      const desc  = document.querySelector(".product-desc")?.textContent  || "";
      //getting price
      const priceText = document.querySelector(".product-price")?.textContent || "$0";
      // removing everything except numbers, the $
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
// the main function that displays cart items
// if there are items in the cart than show if not than dont
function renderCart() {
  // where the products go
  const container = document.getElementById("cartItems");
  // the total and checkout button
  const footer    = document.getElementById("cartFooter");
  // makes the function stops if not on cart page
  if (!container || !footer) return;

  // Gets cart data and clears previous HTML
  const cart = getCart();
  container.innerHTML = "";

  // if cart is empty show a message and take away the checkout btn
  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    footer.innerHTML = "";
    return;
  }

  // adding css to build a row for each product added in the cart
  // loops through each item
  cart.forEach((item, i) => {
    // makes a div for each item
    const div = document.createElement("div");
    div.className = "cart-item";
    // Adds the item name, price, and a remove button
    // stores index for removal
    div.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
        <button class="cart-remove-btn" data-index="${i}">×</button>
      </div>
    `;
    // Adds the item to the page
    container.appendChild(div);
  });

  // adding to get the total price of all the items in a cart
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // css for the checkout button
  // shows the total price and checkout button
  // makes the price to two decimal places
  footer.innerHTML = `
    <div class="cart-total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
    <button class="checkout-btn" id="checkoutBtn">Proceed to checkout</button>
  `;

  // remove item when the X button is clicked
  // removes the item from the dataset
  document.querySelectorAll(".cart-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cart = getCart();
      // Removes one item in the index
      cart.splice(Number(btn.dataset.index), 1);
      // Saves the new updated cart
      saveCart(cart);
      // draws the cart UI
      renderCart();
    });
  });

  // checkout, clears cart then go to confirmation page
  // shows animation to confirm user their order is proccessing 
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const btn = document.getElementById("checkoutBtn");
    btn.textContent = "Processing...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    // removes all items from the local storage when user clicks on the checkout
    setTimeout(() => {
      // deletes the cart completely
      localStorage.removeItem("cart"); 
      //going to new page
      window.location.href = "orderConfirm.html";
    }, 1200);
  });
}

// run on page load, only does anything on cart.html where cartItems exists
// Refreshs the cart display so it matches the current data
renderCart();