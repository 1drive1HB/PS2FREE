/**
 * PS2 Portable Pack - Main JavaScript
 * Handles navigation loading and 3 MEGA download buttons
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    MEGA_URLS: {  // Updated to support 3 buttons
      pcsx2: 'YOUR_PCSX2_MEGA_LINK_HERE',
      games: 'YOUR_PS2_GAMES_MEGA_LINK_HERE', 
      saves: 'YOUR_PS2_SAVES_MEGA_LINK_HERE'
    },
    NAV_SELECTOR: '#nav-placeholder'
  };

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
    
    // Fix all navigation links
    const links = {
      'nav-home': base + 'index.html',
      'nav-download': base + 'index.html#download',
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
   * Initialize 3 MEGA download buttons
   */
  function initMegaButtons() {
    // 1. PCSX2 button on index.html (id="megaPcsx2")
    const pcsx2Btn = document.getElementById('megaPcsx2');
    if (pcsx2Btn) {
      if (!CONFIG.MEGA_URLS.pcsx2 || CONFIG.MEGA_URLS.pcsx2 === 'YOUR_PCSX2_MEGA_LINK_HERE') {
        pcsx2Btn.classList.add('disabled');
        pcsx2Btn.title = 'Owner: set PCSX2 MEGA link in main.js';
      } else {
        pcsx2Btn.addEventListener('click', function() {
          window.open(CONFIG.MEGA_URLS.pcsx2, '_blank', 'noopener,noreferrer');
        });
      }
    }

    // 2. Games button on docs.html (id="megaGames") 
    const gamesBtn = document.getElementById('megaGames');
    if (gamesBtn) {
      if (!CONFIG.MEGA_URLS.games || CONFIG.MEGA_URLS.games === 'YOUR_PS2_GAMES_MEGA_LINK_HERE') {
        gamesBtn.classList.add('disabled');
        gamesBtn.title = 'Owner: set Games MEGA link in main.js';
      } else {
        gamesBtn.addEventListener('click', function() {
          window.open(CONFIG.MEGA_URLS.games, '_blank', 'noopener,noreferrer');
        });
      }
    }

    // 3. Saves button on docs.html (id="megaSaves")
    const savesBtn = document.getElementById('megaSaves');
    if (savesBtn) {
      if (!CONFIG.MEGA_URLS.saves || CONFIG.MEGA_URLS.saves === 'YOUR_PS2_SAVES_MEGA_LINK_HERE') {
        savesBtn.classList.add('disabled');
        savesBtn.title = 'Owner: set Saves MEGA link in main.js';
      } else {
        savesBtn.addEventListener('click', function() {
          window.open(CONFIG.MEGA_URLS.saves, '_blank', 'noopener,noreferrer');
        });
      }
    }
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
        
        // Close all accordions
        document.querySelectorAll('.accordion-content').forEach(c => {
          c.classList.remove('active');
        });
        
        // Toggle current
        if (!isActive) {
          content.classList.add('active');
        }
      });
    });
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
    }, 200);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
