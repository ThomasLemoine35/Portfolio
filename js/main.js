// ===========================
// Portfolio JavaScript
// ===========================

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupImageToggle();
        this.setupSmoothScroll();
    }

    // Gestion des filtres de projet
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Mise à jour visuelle du bouton actif
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filtrage des projets
                this.filterProjects(projectCards, filter);
            });
        });
    }

    filterProjects(cards, filter) {
        cards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                if (card.classList.contains(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    }

    // Toggle entre version normale et vectorielle de Goku
    setupImageToggle() {
        const toggleBtn = document.getElementById('toggle-version');
        const gokuImg = document.getElementById('goku-img');

        if (!toggleBtn || !gokuImg) return;

        let isVectorVersion = false;

        toggleBtn.addEventListener('click', () => {
            if (isVectorVersion) {
                gokuImg.src = './media/images/Goku.jpg';
                gokuImg.alt = 'Goku SSJ';
                toggleBtn.textContent = 'Version vectorielle';
            } else {
                gokuImg.src = './media/images/Goku_vectoriel.jpg';
                gokuImg.alt = 'Goku vectoriel';
                toggleBtn.textContent = 'Version originale';
            }
            isVectorVersion = !isVectorVersion;
        });
    }

    // Amélioration du smooth scroll (optionnel, car déjà géré en CSS)
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignore les liens vides ou juste "#"
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Utilitaires supplémentaires
const Utils = {
    // Détection du scroll pour animations futures
    onScroll(callback) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    callback();
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    // Lazy loading pour les images (optionnel)
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
};

// Export pour utilisation ultérieure si besoin
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, Utils };
}