'use strict';

const CONFIG = {
    MEGAURLS: {
        pcsx2: 'YOUR_PCSX2_MEGA_LINK_HERE',
        games: 'YOUR_PS2GAMES_MEGA_LINK_HERE',
        burner: 'YOUR_PSBURNER_MEGA_LINK_HERE'
    },
    NAVSELECTOR: '#nav-placeholder'
};

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
        logo.src = base + 'assets/TransparentLogoapp/ps2.png';
        console.log('Logo set to:', logo.src);
    } else {
        console.warn('Logo element not found');
    }
    
    // Fix all navigation links
    const links = {
        'nav-home': base + 'index.html',
        'nav-download': base + 'index.html#download',
        'nav-howto': base + 'index.html#howto',
        'nav-featured': base + 'index.html#featured-games',
        'nav-docs': base + 'docs.html',
        'nav-burning': base + 'burning.html',
        'nav-resources': base + 'index.html#resources'
    };
    
    for (const [id, href] of Object.entries(links)) {
        const element = document.getElementById(id);
        if (element) {
            element.href = href;
            console.log(id, '->', href);
        } else {
            console.warn('Element', id, 'not found');
        }
    }
}

function loadNavigation() {
    const navPlaceholder = document.querySelector(CONFIG.NAVSELECTOR);
    if (!navPlaceholder) {
        console.warn('Nav placeholder not found');
        return;
    }
    
    const isSubDir = window.location.pathname.includes('/html/');
    const navPath = isSubDir ? '../nav.html' : 'nav.html';
    
    console.log('Loading nav from:', navPath);
    
    fetch(navPath)
        .then(response => {
            if (!response.ok) throw new Error('Navigation load failed');
            return response.text();
        })
        .then(html => {
            navPlaceholder.innerHTML = html;
            console.log('Nav loaded successfully');
            setTimeout(fixNavigationPaths, 50);
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            // Try alternative path
            const altPath = isSubDir ? '../../nav.html' : '../nav.html';
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

function initMegaButtons() {
    const buttons = {
        megaPcsx2: CONFIG.MEGAURLS.pcsx2,
        megaGames: CONFIG.MEGAURLS.games
    };
    
    Object.entries(buttons).forEach(([id, url]) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        
        if (!url || url.includes('YOUR_')) {
            btn.classList.add('disabled');
            btn.title = 'Link coming soon - Owner to update';
            return;
        }
        
        btn.addEventListener('click', () => {
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    });
}

function initSmoothScroll() {
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        
        const targetId = target.getAttribute('href').slice(1);
        if (targetId === 'download') return;
        
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

function init() {
    console.log('Initializing PS2 Portable Pack...');
    loadNavigation();
    setTimeout(() => {
        initMegaButtons();
        initSmoothScroll();
    }, 200);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
