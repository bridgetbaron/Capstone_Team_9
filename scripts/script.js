const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const themeToggleDesktop = document.getElementById("themeToggleDesktop");

const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const categoryPills = document.querySelectorAll(".category-pill");

const desktopFilterInputs = document.querySelectorAll('input[name="desktopFilter"]');
const desktopSortInputs = document.querySelectorAll('input[name="desktopSort"]');
const mobileFilterInputs = document.querySelectorAll('input[name="mobileFilter"]');
const mobileSortInputs = document.querySelectorAll('input[name="mobileSort"]');

const mobileFilterToggle = document.getElementById("mobileFilterToggle");
const mobileSortToggle = document.getElementById("mobileSortToggle");
const mobileFilterPanel = document.getElementById("mobileFilterPanel");
const mobileSortPanel = document.getElementById("mobileSortPanel");

const resultsGrid = document.getElementById("resultsGrid");
const resultsText = document.getElementById("resultsText");
const skeletonGrid = document.getElementById("skeletonGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let activeCategory = "all";
let activeSort = "default";
let visibleCount = 6;

function getCards() {
  return Array.from(resultsGrid.querySelectorAll(".result-card"));
}

function applyThemeButtonLabels() {
  const isDark = document.body.classList.contains("dark");
  if (themeToggleMobile) themeToggleMobile.textContent = isDark ? "☀" : "☾";
  if (themeToggleDesktop) themeToggleDesktop.textContent = isDark ? "☀️" : "🌙☀️";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  applyThemeButtonLabels();
}

function updateCategoryPills() {
  categoryPills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.category === activeCategory);
  });
}

function syncCategoryControls() {
  if (searchCategory) searchCategory.value = activeCategory;

  desktopFilterInputs.forEach((input) => {
    input.checked = input.value === activeCategory;
  });

  mobileFilterInputs.forEach((input) => {
    input.checked = input.value === activeCategory;
  });

  updateCategoryPills();
}

function syncSortControls() {
  desktopSortInputs.forEach((input) => {
    input.checked = input.value === activeSort;
  });

  mobileSortInputs.forEach((input) => {
    input.checked = input.value === activeSort;
  });
}

function filterAndSortCards() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  let cards = getCards();

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const cardName = card.dataset.name.toLowerCase();
    const cardDesc = card.querySelector(".result-desc").textContent.toLowerCase();

    const matchesCategory = activeCategory === "all" || cardCategory === activeCategory;
    const matchesSearch =
      query === "" || cardName.includes(query) || cardDesc.includes(query);

    card.dataset.visible = matchesCategory && matchesSearch ? "true" : "false";
  });

  let visibleCards = cards.filter((card) => card.dataset.visible === "true");

  if (activeSort === "price-low") {
    visibleCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
  } else if (activeSort === "price-high") {
    visibleCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
  } else if (activeSort === "name-az") {
    visibleCards.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
  }

  visibleCards.forEach((card) => resultsGrid.appendChild(card));

  cards.forEach((card) => {
    card.classList.add("hidden");
  });

  visibleCards.slice(0, visibleCount).forEach((card) => {
    card.classList.remove("hidden");
  });

  const shownCount = Math.min(visibleCards.length, visibleCount);

  if (resultsText) {
    resultsText.textContent =
      visibleCards.length === 0
        ? "No results found."
        : `Showing ${shownCount} of ${visibleCards.length} result${visibleCards.length === 1 ? "" : "s"}.`;
  }

  if (loadMoreBtn) {
    loadMoreBtn.classList.toggle("hidden", shownCount >= visibleCards.length || visibleCards.length === 0);
  }
}

function setCategory(category) {
  activeCategory = category;
  visibleCount = 6;
  syncCategoryControls();
  filterAndSortCards();
}

function setSort(sortValue) {
  activeSort = sortValue;
  visibleCount = 6;
  syncSortControls();
  filterAndSortCards();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);
if (themeToggleDesktop) themeToggleDesktop.addEventListener("click", toggleTheme);

if (searchInput) {
  searchInput.addEventListener("input", () => {
    visibleCount = 6;
    filterAndSortCards();
  });
}

if (searchCategory) {
  searchCategory.addEventListener("change", (e) => {
    setCategory(e.target.value);
  });
}

categoryPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    setCategory(pill.dataset.category);
  });
});

desktopFilterInputs.forEach((input) => {
  input.addEventListener("change", () => {
    setCategory(input.value);
  });
});

mobileFilterInputs.forEach((input) => {
  input.addEventListener("change", () => {
    setCategory(input.value);
  });
});

desktopSortInputs.forEach((input) => {
  input.addEventListener("change", () => {
    setSort(input.value);
  });
});

mobileSortInputs.forEach((input) => {
  input.addEventListener("change", () => {
    setSort(input.value);
  });
});

if (mobileFilterToggle && mobileFilterPanel && mobileSortPanel) {
  mobileFilterToggle.addEventListener("click", () => {
    mobileFilterPanel.classList.toggle("open");
    mobileSortPanel.classList.remove("open");
  });
}

if (mobileSortToggle && mobileSortPanel && mobileFilterPanel) {
  mobileSortToggle.addEventListener("click", () => {
    mobileSortPanel.classList.toggle("open");
    mobileFilterPanel.classList.remove("open");
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 3;
    filterAndSortCards();
  });
}

function initLoading() {
  if (!skeletonGrid || !resultsGrid) return;
  resultsGrid.classList.add("hidden");
  skeletonGrid.classList.remove("hidden");

  setTimeout(() => {
    skeletonGrid.classList.add("hidden");
    resultsGrid.classList.remove("hidden");
    filterAndSortCards();
  }, 850);
}

applyThemeButtonLabels();
syncCategoryControls();
syncSortControls();
initLoading();