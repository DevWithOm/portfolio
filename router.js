// ============================================
//  POKÉMON PORTFOLIO — SPA ROUTER
//  Page transitions & History API navigation
// ============================================

class PokeRouter {
    constructor() {
        this.overlay = document.getElementById('page-transition');
        this.isTransitioning = false;
        this.currentPage = document.body.dataset.page || 'home';
        this.init();
    }

    init() {
        // Intercept internal link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-page]');
            if (!link) return;

            const href = link.getAttribute('href');
            const targetPage = link.dataset.page;

            // Don't transition to the current page
            if (targetPage === this.currentPage) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            if (this.isTransitioning) return;

            // Calculate click origin for transition
            const rect = link.getBoundingClientRect();
            const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
            const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

            this.navigateTo(href, targetPage, x, y);
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            if (this.isTransitioning) return;
            const page = this.getPageFromUrl(location.href);
            this.navigateTo(this.getUrlFromPage(page), page, 50, 50, false);
        });

        // Set initial active nav
        this.updateActiveNav();
    }

    getPageFromUrl(url) {
        const filename = url.split('/').pop().split('?')[0].split('#')[0] || 'index.html';
        if (filename === '' || filename === 'index.html') return 'home';
        return filename.replace('.html', '');
    }

    getUrlFromPage(page) {
        if (page === 'home') return 'index.html';
        return page + '.html';
    }

    async navigateTo(url, targetPage, originX = 50, originY = 50, pushState = true) {
        this.isTransitioning = true;

        // Close mobile nav
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (navToggle) navToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('open');

        // Set transition origin point
        this.overlay.style.setProperty('--tx', originX + '%');
        this.overlay.style.setProperty('--ty', originY + '%');

        // --- EXIT: Pokéball covers screen ---
        await this.playCover();

        try {
            // Fetch the new page
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Swap main content
            const newMain = doc.querySelector('#page-content');
            const currentMain = document.querySelector('#page-content');

            if (newMain && currentMain) {
                currentMain.innerHTML = newMain.innerHTML;
                // Remove initial fade animation class
                currentMain.style.animation = 'none';
            }

            // Update metadata
            document.title = doc.title;
            document.body.dataset.page = targetPage;
            this.currentPage = targetPage;

            // Update URL
            if (pushState) {
                history.pushState({ page: targetPage }, '', url);
            }

            // Update nav highlights
            this.updateActiveNav();

            // Scroll to top
            window.scrollTo(0, 0);

            // Run page-specific scripts
            if (typeof initPageSpecific === 'function') {
                initPageSpecific();
            }

        } catch (error) {
            console.error('Navigation failed (likely CORS issue with file:// protocol). Falling back to standard navigation:', error);
            // Fallback for local testing without a server
            window.location.href = url;
            return;
        }

        // --- ENTER: Pokéball reveals new content ---
        await this.playReveal();
        this.isTransitioning = false;
    }

    playCover() {
        return new Promise(resolve => {
            this.overlay.classList.remove('is-revealing');
            void this.overlay.offsetWidth; // force reflow
            this.overlay.classList.add('is-covering');
            setTimeout(resolve, 600);
        });
    }

    playReveal() {
        return new Promise(resolve => {
            this.overlay.classList.remove('is-covering');
            void this.overlay.offsetWidth; // force reflow
            this.overlay.classList.add('is-revealing');
            setTimeout(() => {
                this.overlay.classList.remove('is-revealing');
                resolve();
            }, 600);
        });
    }

    updateActiveNav() {
        document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
            link.classList.toggle('active', link.dataset.page === this.currentPage);
        });
    }
}

// Initialize router
document.addEventListener('DOMContentLoaded', () => {
    window.pokeRouter = new PokeRouter();
});
