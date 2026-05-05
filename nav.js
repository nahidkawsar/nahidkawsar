// Shared nav functionality with dropdown support
(function() {
  function buildNav(basePath) {
    const brand = document.querySelector('.nav-brand');
    const linksEl = document.querySelector('.nav-links');
    if (!brand || !linksEl) return;

    const current = window.location.pathname.split('/').pop() || 'index.html';
    
    // Mark active links
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.split('/').pop() === current) {
        a.classList.add('active');
      }
    });
    
    // Handle dropdown active states for nested pages/sections
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(current)) {
        link.classList.add('active');
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          parentDropdown.querySelector('.dropbtn').classList.add('active');
        }
      }
    });

    // Hamburger menu for mobile
    const ham = document.querySelector('.nav-hamburger');
    if (ham) {
      ham.addEventListener('click', () => {
        linksEl.classList.toggle('open');
        ham.classList.toggle('active');
        // Close all open dropdowns when hamburger menu closes
        if (!linksEl.classList.contains('open')) {
          document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
          });
        }
      });
      
      // For mobile: make dropdowns work on click (not hover)
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropbtn');
        if (btn) {
          // Remove any existing listeners to avoid duplicates
          btn.removeEventListener('click', handleDropdownClick);
          btn.addEventListener('click', handleDropdownClick);
          
          function handleDropdownClick(e) {
            // Check if we're on mobile (hamburger menu is visible or screen width <= 900)
            const isMobile = window.innerWidth <= 900 || linksEl.classList.contains('open');
            
            if (isMobile) {
              e.preventDefault();
              e.stopPropagation();
              
              // Close other open dropdowns
              dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                  otherDropdown.classList.remove('active');
                }
              });
              
              // Toggle current dropdown
              dropdown.classList.toggle('active');
            }
          }
        }
      });
      
      // Close menu and dropdowns when a link is clicked
      const closeAll = () => {
        if (window.innerWidth <= 900) {
          linksEl.classList.remove('open');
          ham.classList.remove('active');
          document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
          });
        }
      };
      
      // Close when clicking on any nav link
      linksEl.querySelectorAll('.dropdown-content a, .nav-links > a').forEach(link => {
        link.addEventListener('click', closeAll);
      });
      
      // Close when clicking outside (optional - improves UX)
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 900 && linksEl.classList.contains('open')) {
          if (!linksEl.contains(e.target) && !ham.contains(e.target)) {
            closeAll();
          }
        }
      });
    }
  }

  window.initNav = buildNav;
})();