// fake data (no backend)
const items = ["Home", "Explore", "About", "Contact"];

const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const loader = document.getElementById("loader");

searchInput.addEventListener("input", () => {
  // clear old results immediately
  results.innerHTML = "";

  // show loader
  loader.classList.remove("hidden");

  // simulate loading delay
  setTimeout(() => {
    loader.classList.add("hidden");

    const query = searchInput.value.toLowerCase();

    const matches = items.filter((item) => item.toLowerCase().includes(query));

    // show message if nothing matches
    if (matches.length === 0 && query !== "") {
      const li = document.createElement("li");
      li.textContent = "No results found";
      results.appendChild(li);
    }

    matches.forEach((match) => {
      const li = document.createElement("li");
      li.textContent = match;
      results.appendChild(li);
    });
  }, 1200); // long delay so spinner is visible
});
