/**
 * PS2 Portable Pack - Main JavaScript
 * Handles navigation loading and 3 MEGA download buttons
 */

(function() {
  'use strict';

  // Configuration loaded from config.js
  // Make sure config.js is loaded before main.js in HTML
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG not found! Make sure js/config.js is loaded before main.js');
  }
  
  // Add NAV_SELECTOR to config if not present
  if (CONFIG && !CONFIG.NAV_SELECTOR) {
    CONFIG.NAV_SELECTOR = '#nav-placeholder';
  }

  /**
   * Fix navigation paths after loading
   */
  function fixNavigationPaths() {
    const path = window.location.pathname;
    const isSubDir = path.includes('/html/');
    const base = isSubDir ? '../' : '';
    
    console.log('Fixing nav paths...');
    console.log('Current path:', path);
    console.log('Is subdirectory:', isSubDir);
    console.log('Base:', base);
    
    // Fix logo
    const logo = document.getElementById('nav-logo');
    if (logo) {
      logo.src = base + 'assets/Transparent_Logo_app_ps2.png';
      console.log('Logo set to:', logo.src);
    } else {
      console.warn('Logo element not found');
    }
    
    // Fix all navigation links (including dropdown items)
    const links = {
      'nav-home': base + 'index.html',
      'nav-download-toggle': base + 'index.html#download',
      'nav-download-emulator': base + 'index.html#download',
      'nav-download-freegames': base + 'html/docs.html#games',
      'nav-howto': base + 'index.html#howto',
      'nav-docs': base + 'html/docs.html',
      'nav-burning': base + 'html/burning.html',
      'nav-resources': base + 'index.html#resources'
    };
    
    for (const [id, href] of Object.entries(links)) {
      const element = document.getElementById(id);
      if (element) {
        element.href = href;
        console.log(`${id} → ${href}`);
      } else {
        console.warn(`Element ${id} not found`);
      }
    }
  }

  /**
   * Load navigation HTML dynamically
   */
  function loadNavigation() {
    const navPlaceholder = document.querySelector(CONFIG.NAV_SELECTOR);
    if (!navPlaceholder) {
      console.warn('Nav placeholder not found');
      return;
    }

    // Determine correct path based on current location
    const isSubDir = window.location.pathname.includes('/html/');
    const navPath = isSubDir ? './nav.html' : './html/nav.html';
    
    console.log('Loading nav from:', navPath);

    fetch(navPath)
      .then(response => {
        if (!response.ok) throw new Error('Navigation load failed');
        return response.text();
      })
      .then(html => {
        navPlaceholder.innerHTML = html;
        console.log('Nav loaded successfully');
        
        // FIX PATHS AFTER NAV IS LOADED
        setTimeout(fixNavigationPaths, 50);
      })
      .catch(error => {
        console.error('Error loading navigation:', error);
        
        // Try alternative path
        const altPath = isSubDir ? '../html/nav.html' : 'html/nav.html';
        console.log('Trying alternative path:', altPath);
        
        fetch(altPath)
          .then(response => response.text())
          .then(html => {
            navPlaceholder.innerHTML = html;
            setTimeout(fixNavigationPaths, 50);
          })
          .catch(err => console.error('Alternative path also failed:', err));
      });
  }

  /**
   * Initialize all MEGA download buttons
   */
  function initMegaButtons() {
    const buttons = [
      { id: 'megaPcsx2', url: CONFIG.MEGA_URLS.pcsx2 },
      { id: 'megaGames', url: CONFIG.MEGA_URLS.games },
      { id: 'megaSaves', url: CONFIG.MEGA_URLS.saves },
      { id: 'megaAdditionalGames', url: CONFIG.MEGA_URLS.additionalGames },
      { id: 'downloadFDVDB', url: CONFIG.MEGA_URLS.fdvdb },
      { id: 'downloadFreeMCBoot', url: CONFIG.MEGA_URLS.freemcboot }
    ];

    buttons.forEach(btn => {
      const element = document.getElementById(btn.id);
      if (element) {
        if (!btn.url || btn.url.includes('placeholder')) {
          element.classList.add('disabled');
          element.title = 'Owner: set download link in config.js';
        } else {
          element.classList.remove('disabled');
          element.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(btn.url, '_blank', 'noopener,noreferrer');
          });
        }
      }
    });
  }

  /**
   * Initialize smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const targetId = target.getAttribute('href');
      if (targetId === '#' || targetId === '#download') return;

      e.preventDefault();
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /**
   * Initialize accordion
   */
  function initAccordions() {
    document.querySelectorAll('.accordion-toggle').forEach(toggle => {
      toggle.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Close all accordions (both content and toggle button)
        document.querySelectorAll('.accordion-content').forEach(c => {
          c.classList.remove('active');
        });
        document.querySelectorAll('.accordion-toggle').forEach(t => {
          t.classList.remove('open');
        });
        
        // Toggle current (both content and toggle button)
        if (!isActive) {
          content.classList.add('active');
          this.classList.add('open');
        }
      });
    });
  }

  /**
   * Initialize navigation dropdown
   */
  function initDropdown() {
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownToggle && dropdown) {
      // Toggle dropdown on click
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
      
      // Prevent dropdown from closing when clicking inside menu
      const dropdownMenu = dropdown.querySelector('.nav-dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }
    }
  }

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    console.log('Initializing PS2 Portable Pack...');
    loadNavigation();
    
    // Wait for navigation to load before initializing buttons
    setTimeout(() => {
      initMegaButtons();   // NEW: 3 buttons
      initSmoothScroll();
      initAccordions();    // NEW: accordion support
      initDropdown();      // NEW: dropdown navigation
    }, 200);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
