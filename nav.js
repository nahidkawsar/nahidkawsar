// Simple navigation with hamburger menu - NO DROPDOWNS
(function() {
  function initNav() {
    // Mark active links based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPage = href.split('/').pop();
        if (linkPage === currentPage || (currentPage === 'index.html' && linkPage === 'index.html')) {
          link.classList.add('active');
        }
      }
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
      });
      
      // Close menu when a link is clicked (mobile)
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 900) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
          }
        });
      });
    }
  }

  window.initNav = initNav;
})();