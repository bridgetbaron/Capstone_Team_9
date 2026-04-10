const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const themeToggleDesktop = document.getElementById("themeToggleDesktop");

const searchInput =
  document.getElementById("searchInput") ||
  document.querySelector(".search-bar input");
const searchCategory = document.getElementById("searchCategory");
const categoryPills = document.querySelectorAll(".category-pill");

const desktopFilterInputs = document.querySelectorAll(
  'input[name="desktopFilter"]',
);
const desktopSortInputs = document.querySelectorAll(
  'input[name="desktopSort"]',
);
const mobileFilterInputs = document.querySelectorAll(
  'input[name="mobileFilter"]',
);
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

// this cleans up text so thinkpad x1 still matches even with spaces or symbols
function normalizeForMatch(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getCards() {
  return Array.from(resultsGrid.querySelectorAll(".result-card"));
}

function applyThemeButtonLabels() {
  const isDark = document.body.classList.contains("dark");
  if (themeToggleMobile) themeToggleMobile.textContent = isDark ? "☀" : "☾";
  if (themeToggleDesktop)
    themeToggleDesktop.textContent = isDark ? "☀️" : "🌙☀️";
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
  // this grabs what user typed and gets it ready for exact or partial matching
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const normalizedQuery = normalizeForMatch(query);
  let cards = getCards();

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const cardName = card.dataset.name.toLowerCase();
    const normalizedCardName = normalizeForMatch(card.dataset.name);
    const cardDesc = card
      .querySelector(".result-desc")
      .textContent.toLowerCase();

    const matchesCategory =
      activeCategory === "all" || cardCategory === activeCategory;
    const hasExactMatch =
      normalizedQuery !== "" && normalizedCardName === normalizedQuery;
    const hasPartialMatch =
      normalizedQuery !== "" &&
      (cardName.includes(query) ||
        cardDesc.includes(query) ||
        normalizedCardName.includes(normalizedQuery));

    // this gives cards a rank so exact match comes first then partial then the rest
    card.dataset.matchRank =
      query === "" ? "2" : hasExactMatch ? "0" : hasPartialMatch ? "1" : "2";

    // this keeps category filter working while still letting other models show after best match
    card.dataset.visible = matchesCategory ? "true" : "false";
  });

  let visibleCards = cards.filter((card) => card.dataset.visible === "true");

  // this sorting puts better search matches first then uses selected sort option
  visibleCards.sort((a, b) => {
    const matchDiff = Number(a.dataset.matchRank) - Number(b.dataset.matchRank);
    if (matchDiff !== 0) return matchDiff;

    if (activeSort === "price-low") {
      return Number(a.dataset.price) - Number(b.dataset.price);
    }

    if (activeSort === "price-high") {
      return Number(b.dataset.price) - Number(a.dataset.price);
    }

    if (activeSort === "name-az") {
      return a.dataset.name.localeCompare(b.dataset.name);
    }

    return Number(a.dataset.order) - Number(b.dataset.order);
  });

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
    loadMoreBtn.classList.toggle(
      "hidden",
      shownCount >= visibleCards.length || visibleCards.length === 0,
    );
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
if (themeToggleDesktop)
  themeToggleDesktop.addEventListener("click", toggleTheme);

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

  // this saves original card order so default view can be restored later
  getCards().forEach((card, index) => {
    card.dataset.order = String(index);
  });

  // this reads ?q= from url and puts it in search box when page opens
  const queryFromUrl = new URLSearchParams(window.location.search).get("q");
  if (searchInput && queryFromUrl) {
    searchInput.value = queryFromUrl;
  }

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
