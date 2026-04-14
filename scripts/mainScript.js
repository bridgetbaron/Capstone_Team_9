//search dropdown for all teh pages
const searchDropBtn = document.getElementById("searchDropBtn");
const searchDropMenu = document.getElementById("searchDropMenu");

if (searchDropBtn && searchDropMenu) {
  searchDropBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    searchDropMenu.classList.toggle("open");
  });

  // closes the options when user clicks somewhere else
  document.addEventListener("click", function () {
    searchDropMenu.classList.remove("open");
  });
}

const searchBars = document.querySelectorAll(".search-bar");
const backButtons = document.querySelectorAll(".back-btn");

// this makes every back arrow go to home page no matter which page you are on
if (backButtons.length > 0) {
  const path = window.location.pathname.toLowerCase();
  const decodedPath = decodeURIComponent(path);
  let homePath = "index.html";

  if (decodedPath.includes("/pages/product pages/")) {
    homePath = "../../index.html";
  } else if (path.includes("/pages/")) {
    homePath = "../index.html";
  }

  backButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      window.location.href = homePath;
    });
  });
}

// this makes every search bar send what user typed over to searchresults.html with ?q=
searchBars.forEach((bar) => {
  const input = bar.querySelector("input");
  const link = bar.querySelector(".searchiconlink");
  if (!input || !link) return;

  // this builds the url and adds the search text so right product can show first
  function goToSearchResults() {
    const rawHref = link.getAttribute("href") || "";
    if (!rawHref.includes("searchResults.html")) {
      window.location.href = rawHref;
      return;
    }

    const query = input.value.trim();
    const separator = rawHref.includes("?") ? "&" : "?";
    const targetUrl = query
      ? `${rawHref}${separator}q=${encodeURIComponent(query)}`
      : rawHref;
    window.location.href = targetUrl;
  }

  // this runs when someone clicks the little search icon
  link.addEventListener("click", (e) => {
    e.preventDefault();
    goToSearchResults();
  });

  // this runs when someone presses enter in search box
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    goToSearchResults();
  });
});

//prevent crashes for mobile
function selectSearch(e, value) {
  e.preventDefault();
  if (searchDropBtn) searchDropBtn.textContent = value + " ▼";
  if (searchDropMenu) searchDropMenu.classList.remove("open");
}

// adding in the data from our products selection
const products = [
  { name: "ThinkPad X1", category: "ThinkPad", price: 1699.99 },
  { name: "Yoga Pro 9i", category: "Yoga", price: 1699.99 },
  { name: "ThinkPad X9", category: "ThinkPad", price: 1539.0 },
  { name: "ThinkPad T16", category: "ThinkPad", price: 1379.0 },
  { name: "ThinkPad P16", category: "ThinkPad", price: 2396.0 },
  { name: "ThinkPad 2-in-1", category: "ThinkPad", price: 1519.0 },
];

// this gets the first search input in the header and the results text element by id if it exists on this page
const headerSearchInput = document.querySelector(".search-bar input");
const headerResultsText = document.getElementById("resultsText");

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

// the search bar needs position:relative so the dropdown sits under it
const searchBar = document.querySelector(".search-bar");
if (searchBar) {
  searchBar.style.position = "relative";
  searchBar.appendChild(suggestionBox);
}

// this watches typing in the header search box
if (headerSearchInput)
  headerSearchInput.addEventListener("input", () => {
    const query = headerSearchInput.value.trim().toLowerCase();  

    // if input is empty we hide suggestion list and reset text if we can
    if (query === "") {
      hideSuggestions();
      if (typeof showAllCards === "function") showAllCards();
      if (headerResultsText)
        headerResultsText.textContent = "Showing all results";
      return;
    }

    // this finds matching products to show in suggestion dropdown
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    );

    // this fills the suggestion dropdown list
    updateSuggestions(matches, query);

    // this updates result cards only if that function exists on this page
    if (typeof filterCards === "function") filterCards(query);
  });

// this closes suggestions if user clicks outside search area
document.addEventListener("click", (e) => {
  if (searchBar && !searchBar.contains(e.target)) hideSuggestions();
});

// this builds the dropdown suggestions under the search bar
function updateSuggestions(matches, query) {
  suggestionBox.innerHTML = "";

  if (matches.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No results found";
    li.style.cssText = "padding: 10px 14px; color: #888; font-style: italic;";
    suggestionBox.appendChild(li);
  } else {
    matches.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `${product.name} — $${product.price.toFixed(2)}`;
      li.style.cssText = `
        padding: 10px 14px;
        cursor: pointer;
        border-bottom: 1px solid #eee;
        font-size: 0.9rem;
        transition: background 0.15s ease;
      `;
      li.addEventListener(
        "mouseenter",
        () => (li.style.background = "#f5f5f5"),
      );
      li.addEventListener("mouseleave", () => (li.style.background = "white"));

      // clicking a suggestion puts that name in input and runs filtering
      li.addEventListener("click", () => {
        if (headerSearchInput) headerSearchInput.value = product.name;
        hideSuggestions();
        if (typeof filterCards === "function")
          filterCards(product.name.toLowerCase());
      });

      suggestionBox.appendChild(li);
    });
  }

  // show the dropdown
  suggestionBox.style.opacity = "1";
  suggestionBox.style.transform = "translateY(0)";
  suggestionBox.style.pointerEvents = "auto";
}

function hideSuggestions() {
  suggestionBox.style.opacity = "0";
  suggestionBox.style.transform = "translateY(-4px)";
  suggestionBox.style.pointerEvents = "none";
}

// Feedback page only
//feedback questions dropdown
const dropBtn = document.getElementById("dropBtn");
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
 
function selectOption(e, value) {
  e.preventDefault();
  if (dropBtn) dropBtn.textContent = value + " ▼";
  if (dropMenu) dropMenu.classList.remove("open");
}
 
// feedback page animation that fades in the feedback container
const feedbackContainer = document.querySelector(".feedbackContainer");
 
if (feedbackContainer) {
  feedbackContainer.style.opacity = "0";
  feedbackContainer.style.transform = "translateY(24px)";
  feedbackContainer.style.transition = "opacity 0.4s ease, transform 0.4s ease";
 
  setTimeout(() => {
    feedbackContainer.style.opacity = "1";
    feedbackContainer.style.transform = "translateY(0)";
  }, 100);
}
 
// feedback page that make the textarea focus glow when user is using the textbox
const textBox = document.querySelector(".textBox");
 
if (textBox) {
  textBox.addEventListener("focus", () => {
    textBox.style.transition = "box-shadow 0.2s ease";
    textBox.style.boxShadow = "0 0 0 3px rgba(90, 159, 212, 0.25)";
  });
  textBox.addEventListener("blur", () => {
    textBox.style.boxShadow = "none";
  });
}

// verifying the email function
// in feedback form making the user enter their email or they will get an error message
const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");

// checking if the email is vaild with special characters 
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

if (emailInput && emailError) {
  // show error the moment the user clicks out of the field without a valid email
  emailInput.addEventListener("blur", function () {
    if (!isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add("invalid");
      emailError.textContent = "Please enter a valid email";
      emailError.classList.add("visible");
    }
  });

  // clears the error as soon as the user starts typing
  emailInput.addEventListener("input", function () {
    emailInput.classList.remove("invalid");
    emailError.classList.remove("visible");
  });
}

// making the submit button not work unless user has entered an email
const submitBtn = document.querySelector(".submitBtn");

if (submitBtn) {
  submitBtn.addEventListener("click", function () {

    // if email is missing or not a real email, show error and stop
    if (!emailInput || !isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add("invalid");
      emailError.textContent = "Please enter a valid email";
      emailError.classList.add("visible");
      return;
    }

    // email is valid navigate to the submission page
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";

    setTimeout(() => {
      window.location.href = "FeedbackSubmission.html";
    }, 1500);
  });
}

//loading anytime going to another page
// creating a white overlay with a spinning circle and hide it
const spinner = document.createElement("div");
spinner.innerHTML = `
  <div style="width:40px; 
  height:40px; border:4px solid #ddd; 
  border-top-color:#e2001a; border-radius:50%; 
  animation:spin 0.7s linear infinite;">
  </div>
  <style>@keyframes spin { to { transform:rotate(360deg); } }</style>
`;
spinner.style.cssText =
  "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.85); z-index:9999; align-items:center; justify-content:center;";
document.body.appendChild(spinner);

// show the spinner whenever the page is leaving
window.addEventListener("beforeunload", function () {
  spinner.style.display = "flex";
});
