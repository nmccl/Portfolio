     // Initialize Vanta background
        window.addEventListener("DOMContentLoaded", function () {
            try {
                VANTA.NET({
                    el: "#element",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0xffffff,
                    backgroundColor: 0x111111,
                });
            } catch (e) {
                console.log("Vanta initialization failed:", e);
            }
        });

        // Loading screen with skip functionality
        const loadingScreen = document.getElementById('loading');
        const skipButton = document.getElementById('skipIntro');
        let loadingTimeout;

        function hideLoading() {
            loadingScreen.classList.add('hidden');
            clearTimeout(loadingTimeout);
            
            // Trigger entrance animations
            setTimeout(() => {
                const activeContent = document.querySelector('.section.active .section-content');
                if (activeContent) {
                    activeContent.style.animation = 'slideIn 1s ease-out';
                }
            }, 300);
        }

        // Skip button functionality
        skipButton.addEventListener('click', hideLoading);

        // Auto-hide after 5.5 seconds
        window.addEventListener('load', () => {
            loadingTimeout = setTimeout(hideLoading, 5500);
        });

        // Navigation functionality
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        const sections = document.querySelectorAll('.section');
        const indicator = document.querySelector('.nav-indicator');

        function updateIndicator(activeLink) {
            if (!activeLink || !indicator) return;
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = activeLink.closest('.navbar').getBoundingClientRect();
            const offset = linkRect.top - navRect.top + linkRect.height / 2 - 8;
            indicator.style.top = offset + 'px';
        }

        function showSection(targetId) {
            sections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update desktop nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === targetId) {
                    link.classList.add('active');
                    updateIndicator(link);
                }
            });

            // Update mobile nav
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === targetId) {
                    link.classList.add('active');
                }
            });
        }

        // Desktop nav click handlers
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                showSection(targetSection);
                history.pushState(null, null, `#${targetSection}`);
            });
        });

        // Mobile nav click handlers
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                showSection(targetSection);
                history.pushState(null, null, `#${targetSection}`);
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'about';
            showSection(hash);
        });

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            const initialHash = window.location.hash.substring(1) || 'about';
            showSection(initialHash);
        });

        // Update indicator on resize
        window.addEventListener('resize', () => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) {
                updateIndicator(activeLink);
            }
        });

        // Prevent double-tap zoom on iOS
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Handle viewport height changes on mobile (keyboard, etc.)
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', setViewportHeight);