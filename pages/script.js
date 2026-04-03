<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lenovo Search Results</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="header">
    <div class="header-left">
      <div class="logo">Lenovo</div>
      <a href="home.html" class="back" aria-label="Back">←</a>
    </div>

    <div class="search-container">
      <input type="text" placeholder="Search" aria-label="Search" />
      <select aria-label="Search category">
        <option>Select</option>
        <option>Laptops</option>
        <option>Desktop</option>
        <option>Software</option>
        <option>Tablet</option>
        <option>Accessories</option>
      </select>
    </div>

    <button class="menu-toggle" id="menu-toggle" aria-label="Open menu">☰</button>
    <button class="dark-toggle" id="dark-toggle" aria-label="Toggle dark mode">☾</button>

    <nav class="nav" id="nav">
      <a href="home.html">Home</a>
      <a href="search-results.html" class="active">Search</a>
      <a href="feedback.html">Feedback</a>
      <a href="#">Settings</a>
    </nav>
  </header>

  <section class="mobile-controls">
    <button type="button">Filter</button>
    <button type="button">Sort</button>
  </section>

  <main class="search-page">
    <aside class="search-sidebar">
      <h2 class="sidebar-section-title">Filters</h2>
      <div class="sidebar-item">Product type <span>⌄</span></div>
      <div class="sidebar-item">Processor <span>⌄</span></div>
      <div class="sidebar-item">Memory <span>⌄</span></div>
      <div class="sidebar-item">Screen Size <span>⌄</span></div>
      <div class="sidebar-item">Graphics <span>⌄</span></div>
      <div class="sidebar-item">Storage <span>⌄</span></div>

      <h2 class="sidebar-section-title" style="margin-top: 28px;">Sort</h2>
      <div class="sidebar-item">Price <span>⌄</span></div>
      <div class="sidebar-item">Color <span>⌄</span></div>
      <div class="sidebar-item">Rating <span>⌄</span></div>
    </aside>

    <section class="results-section">
      <p class="results-text">Showing results for......</p>

      <div class="results-grid">
        <article class="result-card">
          <div class="result-image"></div>
          <div class="result-card-header">
            <h3>ThinkPad X1</h3>
            <span class="result-price">$1,935.46</span>
          </div>
          <div class="result-desc">14" premium PC with AI productivity-based features</div>
          <button class="shop-btn" type="button">Shop</button>
        </article>

        <article class="result-card">
          <div class="result-image"></div>
          <div class="result-card-header">
            <h3>Yoga Pro 9i</h3>
            <span class="result-price">$1,699.99</span>
          </div>
          <div class="result-desc">Windows 11 Home 64</div>
          <button class="shop-btn" type="button">Shop</button>
        </article>

        <article class="result-card">
          <div class="result-image"></div>
          <div class="result-card-header">
            <h3>ThinkPad X9</h3>
            <span class="result-price">$1,539.00</span>
          </div>
          <div class="result-desc">Windows 11 Home. Lenovo recommends Windows 11 Pro.</div>
          <button class="shop-btn" type="button">Shop</button>
        </article>

        <article class="result-card">
          <div class="result-image"></div>
          <div class="result-card-header">
            <h3>ThinkPad T16</h3>
            <span class="result-price">$1,379.00</span>
          </div>
          <div class="result-desc">14" WUXGA, anti-glare display.</div>
          <button class="shop-btn" type="button">Shop</button>
        </article>

        <article class="result-card">
          <div class="result-image"></div>
          <div class="result-card-header">
            <h3>ThinkPad P16</h3>
            <span class="result-price">$2,396.00</span>
          </div>
          <div class="result-desc">Built for performance.</div>
          <button class="shop-btn" type="button">Shop</button>
        </article>

        <article class="result-card">
          <div class="result-image"></div>
          <div class="result-card-header">
            <h3>ThinkPad 2-in-1</h3>
            <span class="result-price">$1,519.00</span>
          </div>
          <div class="result-desc">Intel Core Ultra processor.</div>
          <button class="shop-btn" type="button">Shop</button>
        </article>
      </div>

      <div class="load-more-wrap">
        <button class="load-more-btn" type="button">Load more results</button>
      </div>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>