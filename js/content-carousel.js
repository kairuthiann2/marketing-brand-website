/**
 * Reusable content carousel - film-strip pattern (same as testimonial)
 * Use on portfolio, case studies, or any slide-based content.
 *
 * HTML structure:
 *   <div data-content-carousel data-dwell-ms="7000">
 *     <div class="content-carousel-viewport">   <!-- overflow hidden -->
 *       <div data-content-carousel-track>
 *         <div data-content-carousel-slide>...</div>
 *         <div data-content-carousel-slide>...</div>
 *       </div>
 *     </div>
 *     <button data-content-carousel-tab data-slide-index="0">Tab 1</button>
 *     <button data-content-carousel-tab data-slide-index="1">Tab 2</button>
 *   </div>
 *
 * Options (data attributes on root):
 *   data-dwell-ms     - Auto-advance interval (default: 7000)
 *   data-autoplay     - "false" to disable (default: true when dwell set)
 *
 * Visibility: Auto-play only runs when the carousel is visible (Intersection Observer).
 * Nested carousels get a full dwell period when their slide comes into view.
 */
(function () {
  'use strict';

  const DEFAULT_DWELL_MS = 7000;

  function initContentCarousel(root) {
    const viewport = root.querySelector(':scope > .content-carousel-viewport');
    if (!viewport) return;
    const track = viewport.querySelector(':scope > [data-content-carousel-track]');
    if (!track) return;
    const slides = track.querySelectorAll(':scope > [data-content-carousel-slide]');
    const tabs = Array.from(root.querySelectorAll('[data-content-carousel-tab]')).filter(
      (tab) => tab.closest('[data-content-carousel]') === root
    );

    if (slides.length === 0) return;

    const dwellMs = parseInt(root.dataset.dwellMs, 10) || DEFAULT_DWELL_MS;
    const autoplay = root.dataset.autoplay !== 'false';

    // Film-strip layout: track width = N * 100%, each slide = 100/N %
    track.style.width = `${slides.length * 100}%`;
    slides.forEach((slide) => {
      slide.style.flex = `0 0 ${100 / slides.length}%`;
    });

    let currentIndex = 0;
    let autoPlayTimer = null;

    function goToSlide(index) {
      currentIndex = ((index % slides.length) + slides.length) % slides.length;
      const percentPerSlide = 100 / slides.length;
      track.style.transform = `translateX(-${currentIndex * percentPerSlide}%)`;

      tabs.forEach((tab) => {
        const idx = parseInt(tab.dataset.slideIndex, 10);
        if (idx === currentIndex) {
          tab.classList.add('content-carousel-tab--active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('content-carousel-tab--active');
          tab.setAttribute('aria-selected', 'false');
        }
      });
    }

    function startAutoPlay() {
      if (!autoplay) return;
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, dwellMs);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    // Only run auto-play when carousel is visible (pauses when off-screen, e.g. nested in hidden slide)
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoPlay();
          } else {
            stopAutoPlay();
          }
        });
      },
      { threshold: 0.1 }
    );
    visibilityObserver.observe(viewport);

    tabs.forEach((tab) => {
      const index = parseInt(tab.dataset.slideIndex, 10);
      if (isNaN(index)) return;
      tab.addEventListener('click', () => {
        goToSlide(index);
        startAutoPlay();
      });
    });

    goToSlide(0);
    // Start only if visible; observer handles visibility changes (e.g. nested carousel coming into view)
    if (autoplay) {
      const rect = viewport.getBoundingClientRect();
      const inView =
        rect.right > 0 &&
        rect.left < window.innerWidth &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight;
      if (inView) startAutoPlay();
    }
  }

  function initAll() {
    document.querySelectorAll('[data-content-carousel]').forEach(initContentCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.initContentCarousel = initAll;
})();
