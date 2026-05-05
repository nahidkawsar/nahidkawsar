// Shared nav functionality with dropdown support
(function() {
  function buildNav(basePath) {
    const brand = document.querySelector('.nav-brand');
    const linksEl = document.querySelector('.nav-links');
    if (!brand || !linksEl) return;

    const current = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.split('/').pop() === current) {
        a.classList.add('active');
      }
    });
    
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

    const ham = document.querySelector('.nav-hamburger');
    if (ham) {
      ham.addEventListener('click', () => {
        linksEl.classList.toggle('open');
        ham.classList.toggle('active');
      });
      
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropbtn');
        if (btn) {
          btn.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
              e.preventDefault();
              dropdown.classList.toggle('active');
            }
          });
        }
      });
      
      const closeNav = () => {
        if (window.innerWidth <= 900) {
          linksEl.classList.remove('open');
          ham.classList.remove('active');
        }
      };
      
      linksEl.querySelectorAll('.dropdown-content a, .nav-links > a').forEach(link => {
        link.addEventListener('click', closeNav);
      });
    }
  }

  window.initNav = buildNav;
})();