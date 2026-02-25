/**
 * Portfolio deep linking via URL hash.
 * Supports: #design, #design-digital, #design-print
 * Run after content-carousel.js init.
 */
(function () {
  'use strict';

  function applyPortfolioHash() {
    var hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
    if (!hash) return;

    var tablist = document.querySelector('[aria-label="Portfolio category"]');
    var outerCarousel = tablist ? tablist.closest('[data-content-carousel]') : null;
    if (!outerCarousel) return;

    var designTab = outerCarousel.querySelector('[data-content-carousel-tab][data-slide-index="1"]');
    if (!designTab) return;

    // #design, #design-digital, or #design-print → Design tab first
    if (hash === 'design' || hash === 'design-digital' || hash === 'design-print') {
      designTab.click();

      // #design-print → also select Print sub-tab (after Design slide is visible)
      if (hash === 'design-print') {
        setTimeout(function () {
          var designTablist = document.querySelector('[aria-label="Design category"]');
          var printTab = designTablist ? designTablist.querySelector('[data-content-carousel-tab][data-slide-index="1"]') : null;
          if (printTab) {
            printTab.click();
          }
        }, 150);
      }
    }
  }

  function init() {
    applyPortfolioHash();
    window.addEventListener('hashchange', applyPortfolioHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }
})();
