/**
 * PS2 Portable Pack - Main JavaScript
 * Handles navigation loading and MEGA download button
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    MEGA_URL: 'MEGA_LINK_HERE', // Owner must update this
    NAV_SELECTOR: '#nav-placeholder',
    MEGA_BTN_ID: 'megaLink'
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
   * Initialize MEGA download button
   */
  function initMegaButton() {
    const megaBtn = document.getElementById(CONFIG.MEGA_BTN_ID);
    if (!megaBtn) return;

    if (!CONFIG.MEGA_URL || CONFIG.MEGA_URL === 'MEGA_LINK_HERE') {
      megaBtn.classList.add('disabled');
      megaBtn.title = 'Owner: set MEGA_URL in main.js';
      return;
    }

    megaBtn.addEventListener('click', function() {
      window.open(CONFIG.MEGA_URL, '_blank', 'noopener,noreferrer');
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
   * Initialize all functionality when DOM is ready
   */
  function init() {
    console.log('Initializing PS2 Portable Pack...');
    loadNavigation();
    
    // Wait for navigation to load before initializing buttons
    setTimeout(() => {
      initMegaButton();
      initSmoothScroll();
    }, 200);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
