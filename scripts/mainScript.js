//Search dropdown for all teh pages
const searchDropBtn = document.getElementById("searchDropBtn");
const searchDropMenu = document.getElementById("searchDropMenu");

if (searchDropBtn && searchDropMenu) {
  searchDropBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    searchDropMenu.classList.toggle("open");
  });

  // Closes the options when user clicks somewhere else
  document.addEventListener("click", function () {
    searchDropMenu.classList.remove("open");
  });
}

//prevent crashes for mobile
function selectSearch(e, value) {
  e.preventDefault();
  if (searchDropBtn) searchDropBtn.textContent = value + " ▼";
  if (searchDropMenu) searchDropMenu.classList.remove("open");
}


// adding in the data from our products selection
const products = [
  { name: "ThinkPad X1",     category: "ThinkPad",  price: 1699.99},
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
    if (resultsText) resultsText.textContent = "Showing all results";
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
  if (searchBar && !searchBar.contains(e.target)) hideSuggestions();
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
        if (searchInput) searchInput.value = product.name;
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

// showing Loading indicators for submitting feedback form
const submitBtn = document.querySelector(".submitBtn");
 
if (submitBtn) {
  // fades the container when submitting
  submitBtn.addEventListener("click", function (e) {
 
    // Change button text to show something is happening
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    submitBtn.style.opacity = "6s";
    submitBtn.style.cursor = "not-allowed";
 
    // After 1.5s the form is submitted and go to the submission page
    setTimeout(() => {
      window.location.href = "FeedbackSubmission.html";
    }, 1500);
  });
}
 
//animation for the feedback page, fades in the container 
const feedbackContainer = document.querySelector(".feedbackContainer");
 
if (feedbackContainer) {
  // Start invisible and slightly below
  feedbackContainer.style.opacity = "0";
  feedbackContainer.style.transform = "translateY(24px)";
  feedbackContainer.style.transition = "opacity 3s ease, transform 3s ease";
 
  // Small delay so the browser has painted the page first
  setTimeout(() => {
    feedbackContainer.style.opacity = "1";
    feedbackContainer.style.transform = "translateY(0)";
  }, 100);
}