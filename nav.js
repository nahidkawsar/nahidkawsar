// Shared navigation with responsive hamburger menu.
(function () {
  function initNav() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    // Highlight the active page link.
    document.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") ||
          /^(mailto:|tel:|javascript:)/i.test(href)) return;

      try {
        const url = new URL(href, window.location.href);

        if (
          url.origin === window.location.origin &&
          url.pathname.split("/").pop() === currentPage
        ) {
          link.classList.add("active");
        }
      } catch (error) {
        // Ignore invalid links.
      }
    });

    const hamburger = document.querySelector(".nav-hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;
    if (hamburger.dataset.navInitialized === "true") return;

    hamburger.dataset.navInitialized = "true";

    function setMenuOpen(isOpen) {
      navLinks.classList.toggle("open", isOpen);
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    }

    hamburger.setAttribute("aria-expanded", "false");

    hamburger.addEventListener("click", () => {
      setMenuOpen(!navLinks.classList.contains("open"));
    });

    // Close the menu after selecting a link on mobile.
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
          setMenuOpen(false);
        }
      });
    });

    // Close the menu with Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });
  }

  window.initNav = initNav;

  // Initialize automatically on every page.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav, {
      once: true
    });
  } else {
    initNav();
  }
})();