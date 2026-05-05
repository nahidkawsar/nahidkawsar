// Simple nav functionality
(function() {
  function buildNav(basePath) {
    // Mark active links
    const current = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.split('/').pop() === current) {
        a.classList.add('active');
      }
    });

    // Hamburger menu toggle
    const ham = document.querySelector('.nav-hamburger');
    const linksEl = document.querySelector('.nav-links');
    
    if (ham && linksEl) {
      ham.addEventListener('click', () => {
        linksEl.classList.toggle('open');
        ham.classList.toggle('active');
      });
      
      // Close menu when link clicked
      linksEl.querySelectorAll('a, .dropbtn').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 900) {
            linksEl.classList.remove('open');
            ham.classList.remove('active');
          }
        });
      });
    }
  }

  window.initNav = buildNav;
})();