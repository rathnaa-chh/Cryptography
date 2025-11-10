// Grab elements
const menuToggle = document.getElementById('menuToggle');
const sidebar    = document.getElementById('sidebar');
const overlay    = document.getElementById('overlay');

// If any are missing, do nothing (makes this safe to include on other pages too)
if (menuToggle && sidebar && overlay) {
  const openMenu = () => {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.classList.add('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = sidebar.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  };

  // Toggle on button click
  menuToggle.addEventListener('click', toggleMenu);

  // Close on overlay click
  overlay.addEventListener('click', closeMenu);

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when resizing back to desktop width (optional breakpoint)
  const DESKTOP_BREAKPOINT = 1024; // px
  window.addEventListener('resize', () => {
    if (window.innerWidth >= DESKTOP_BREAKPOINT) closeMenu();
  });

  // Close menu after clicking any link in the sidebar
  sidebar.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// Highlight the active nav link (both desktop and sidebar)
(
  function highlightActiveLink() {
  const path = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav a, #sidebar a');

  allNavLinks.forEach(a => {
    // Normalize
    const hrefFile = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
    // Consider anchor-less “Home” as index.html too
    const same = hrefFile === path || (hrefFile === '' && path === 'index.html');
    a.classList.toggle('active', same);
    if (same) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
)();
