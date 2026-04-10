//Search dropdown for all teh pages
const searchDropBtn = document.getElementById("searchDropBtn");
const searchDropMenu = document.getElementById("searchDropMenu");

searchDropBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  searchDropMenu.classList.toggle("open");
 });

function selectSearch(e, value) {
  e.preventDefault();
  searchDropBtn.textContent = value + " ▼";
  searchDropMenu.classList.remove("open");
 }

// Closes the options when user clicks somewhere else
  document.addEventListener("click", function () {
  searchDropMenu.classList.remove("open");
  });

// adding in the data from our products selection
const products = [
  { name: "ThinkPad X1",     category: "ThinkPad",  price: 1935.46 },
  { name: "Yoga Pro 9i",     category: "Yoga",      price: 1699.99 },
  { name: "ThinkPad X9",     category: "ThinkPad",  price: 1539.00 },
  { name: "ThinkPad T16",    category: "ThinkPad",  price: 1379.00 },
  { name: "ThinkPad P16",    category: "ThinkPad",  price: 2396.00 },
  { name: "ThinkPad 2-in-1", category: "ThinkPad",  price: 1519.00 },
];
 
//grabbing the elements from the page
const searchInput  = document.querySelector(".search-bar input");
const skeletonGrid = document.getElementById("skeletonGrid");
const resultsGrid  = document.getElementById("resultsGrid");
const resultsText  = document.getElementById("resultsText");
const loadMoreBtn  = document.getElementById("loadMoreBtn");
 
// the suggestion dropdown
const suggestionBox = document.createElement("ul");
suggestionBox.style.cssText = `
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0 0 8px 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease; 
  pointer-events: none;
`;
 
// The search bar needs position:relative so the dropdown sits under it
const searchBar = document.querySelector(".search-bar");
if (searchBar) {
  searchBar.style.position = "relative";
  searchBar.appendChild(suggestionBox);
}
 
// works when the user is typing 
if (searchInput) searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
 
  // If the users input is empty, hide suggestions and show all cards
  if (query === "") {
    hideSuggestions();
    showAllCards();
    resultsText.textContent = "Showing all results";
    return;
  }
 
  // Filter the product list to find matches
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
 
  // Updating the suggestion dropdown
  updateSuggestions(matches, query);
 
  // Updating the results grid
  filterCards(query);
});
 
// Hide suggestions when clicking outside the search bar
document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target)) hideSuggestions();
});
 
// helps suggest stuff for the user when using the search bar for searching for a product
function updateSuggestions(matches, query) {
  suggestionBox.innerHTML = "";
 
  if (matches.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    li.style.cssText = "padding: 10px 14px; color: #888; font-style: italic;";
    suggestionBox.appendChild(li);
  } else {
    matches.forEach(product => {
      const li = document.createElement("li");
      li.textContent = `${product.name} — $${product.price.toFixed(2)}`;
      li.style.cssText = `
        padding: 10px 14px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        font-size: 0.9rem;
        transition: background 0.15s ease;
      `;
      li.addEventListener("mouseenter", () => li.style.background = "#f5f5f5");
      li.addEventListener("mouseleave", () => li.style.background = "white");
 
      // Clicking a suggestion fills the input and filters the grid
      li.addEventListener("click", () => {
        searchInput.value = product.name;
        hideSuggestions();
        filterCards(product.name.toLowerCase());
      });
 
      suggestionBox.appendChild(li);
    });
  }
 
  // Show the dropdown
  suggestionBox.style.opacity = "1";
  suggestionBox.style.transform = "translateY(0)";
  suggestionBox.style.pointerEvents = "auto";
}
 
function hideSuggestions() {
  suggestionBox.style.opacity = "0";
  suggestionBox.style.transform = "translateY(-4px)";
  suggestionBox.style.pointerEvents = "none";
}
 
// filters the cards / show or hide deppending on the search 
function filterCards(query) {
  const cards = resultsGrid.querySelectorAll(".result-card");
  let visibleCount = 0;
 
  cards.forEach(card => {
    const name     = card.dataset.name.toLowerCase();
    const category = card.dataset.category.toLowerCase();
 
    if (name.includes(query) || category.includes(query)) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });
 
  // Update the results count text
  if (visibleCount === 0) {
    resultsText.textContent = `No results found for "${searchInput.value.trim()}"`;
  } else {
    resultsText.textContent = `Showing ${visibleCount} result${visibleCount !== 1 ? "s" : ""}`;
  }
}
 
function showAllCards() {
  resultsGrid.querySelectorAll(".result-card").forEach(card => {
    card.style.display = "";
  });
}
 
// special animations for laoding in the page 
if (skeletonGrid && resultsGrid) setTimeout(() => {
  skeletonGrid.classList.add("hidden");
  resultsGrid.classList.remove("hidden");
 
  const cards = resultsGrid.querySelectorAll(".result-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(16px)";
    card.style.transition = `opacity 0.3s ease ${i * 0.08}s, transform 0.3s ease ${i * 0.08}s`;
    void card.offsetWidth; // force browser to register the starting state
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  });
 
  resultsText.textContent = `Showing ${cards.length} results`;
}, 1500);

// feedback page only 
const dropBtn  = document.getElementById("dropBtn");
const dropMenu = document.getElementById("dropMenu");
 
if (dropBtn && dropMenu) {
  dropBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropMenu.classList.toggle("open");
  });
 
  document.addEventListener("click", function () {
    dropMenu.classList.remove("open");
  });
}
 
// Makes selectOption available globally so the onclick in the HTML can call it
function selectOption(e, value) {
  e.preventDefault();
  if (dropBtn) dropBtn.textContent = value + " ▼";
  if (dropMenu) dropMenu.classList.remove("open");
}
