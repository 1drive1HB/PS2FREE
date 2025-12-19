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
   * Load navigation HTML dynamically
   */
  function loadNavigation() {
    const navPlaceholder = document.querySelector(CONFIG.NAV_SELECTOR);
    if (!navPlaceholder) return;

    // Determine correct path based on current location
    const navPath = window.location.pathname.includes('/html/') 
      ? './nav.html'           // For docs.html and burning.html (same folder)
      : './html/nav.html';     // For index.html (html subfolder)

    fetch(navPath)
      .then(response => {
        if (!response.ok) throw new Error('Navigation load failed');
        return response.text();
      })
      .then(html => {
        navPlaceholder.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading navigation:', error);
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
    loadNavigation();
    
    // Wait for navigation to load before initializing buttons
    setTimeout(() => {
      initMegaButton();
      initSmoothScroll();
    }, 100);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
