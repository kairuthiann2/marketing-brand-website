/**
 * Persistent navigation state - URL-based routing for multi-page site.
 *
 * Uses hash routing for same-page state (portfolio tabs). On load and hashchange,
 * restores the correct section, category, and subcategory without full reload.
 *
 * URL structure (portfolio):
 *   portfolio.html           → Content system, Long Form (default)
 *   portfolio.html#content  → Content system, Long Form
 *   portfolio.html#content-longform
 *   portfolio.html#content-shortform
 *   portfolio.html#design    → Design, Digital (default)
 *   portfolio.html#design-digital
 *   portfolio.html#design-print
 *
 * API:
 *   NavState.getState()     → { page, section, category, subcategory }
 *   NavState.applyFromURL() → restore UI from current URL
 *   NavState.updateHash(hash) → set hash without reload (for tab clicks)
 */
(function () {
  'use strict';

  const VALID_HASHES = [
    'content',
    'content-longform',
    'content-shortform',
    'design',
    'design-digital',
    'design-print',
  ];

  const DEFAULT_HASH = 'content-longform';

  /**
   * Parse current URL into state.
   */
  function getState() {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const basePage = pathname.split('/').pop() || 'index.html';
    const hash = (window.location.hash || '').replace(/^#/, '').toLowerCase().trim();

    return {
      page: basePage,
      hash: hash || DEFAULT_HASH,
      category: hash.startsWith('design') ? 'design' : 'content',
      subcategory: parseSubcategory(hash),
    };
  }

  function parseSubcategory(hash) {
    if (!hash) return 'longform';
    if (hash === 'content-shortform') return 'shortform';
    if (hash === 'design-print') return 'print';
    if (hash === 'design' || hash === 'design-digital') return 'digital';
    return 'longform';
  }

  /**
   * Derive hash from category + subcategory.
   */
  function toHash(category, subcategory) {
    if (category === 'design') {
      return subcategory === 'print' ? 'design-print' : 'design-digital';
    }
    return subcategory === 'shortform' ? 'content-shortform' : 'content-longform';
  }

  /**
   * Map category + subcategory to outer and inner slide indices.
   */
  function getSlideIndices(category, subcategory) {
    const outerIndex = category === 'design' ? 1 : 0;
    const innerIndex =
      subcategory === 'shortform' || subcategory === 'print' ? 1 : 0;
    return { outerIndex, innerIndex };
  }

  /**
   * Restore portfolio UI from current URL hash. Uses carousel API directly
   * instead of programmatic clicks to avoid polluting history on load.
   */
  function applyPortfolioState() {
    const { category, subcategory } = getState();
    const { outerIndex, innerIndex } = getSlideIndices(category, subcategory);

    const outerTablist = document.querySelector('[aria-label="Portfolio category"]');
    const outerCarousel = outerTablist ? outerTablist.closest('[data-content-carousel]') : null;
    if (!outerCarousel || typeof outerCarousel._goToSlide !== 'function') return;

    outerCarousel._goToSlide(outerIndex);

    const track = outerCarousel.querySelector('[data-content-carousel-track]');
    const outerSlides = track ? track.querySelectorAll(':scope > [data-content-carousel-slide]') : [];
    const activeSlide = outerSlides[outerIndex];
    const innerCarousel = activeSlide ? activeSlide.querySelector('[data-content-carousel]') : null;

    if (innerCarousel && typeof innerCarousel._goToSlide === 'function') {
      innerCarousel._goToSlide(innerIndex);
    }

    if (outerCarousel._updateViewportHeight) outerCarousel._updateViewportHeight();
    if (innerCarousel && innerCarousel._updateViewportHeight) innerCarousel._updateViewportHeight();
  }

  /**
   * Update URL hash without reload. Uses replaceState to avoid polluting history
   * on programmatic restore; use pushState when user explicitly navigates.
   */
  function updateHash(hash, replace) {
    const method = replace ? 'replaceState' : 'pushState';
    const base = window.location.pathname + window.location.search;
    const url = hash ? base + '#' + hash : base;
    try {
      window.history[method]({ navState: hash }, '', url);
    } catch (_) {
      window.location.hash = hash || '';
    }
  }

  /**
   * Apply state from current URL (load + hashchange + popstate).
   */
  function applyFromURL() {
    const basePage = (window.location.pathname.split('/').pop() || '').toLowerCase();
    if (basePage === 'portfolio.html') {
      applyPortfolioState();
    }
  }

  /**
   * Handle tab click: update URL to match the tab's data-nav-hash.
   */
  function onPortfolioTabClick(ev) {
    const tab = ev.target.closest('[data-content-carousel-tab][data-nav-hash]');
    if (!tab) return;
    const hash = tab.getAttribute('data-nav-hash');
    if (hash) {
      updateHash(hash, false);
    }
  }

  /**
   * Bind portfolio tab listeners.
   */
  function bindPortfolioTabs() {
    const outer = document.querySelector('[aria-label="Portfolio category"]');
    if (!outer) return;
    const root = outer.closest('[data-content-carousel]');
    if (!root) return;

    root.addEventListener('click', onPortfolioTabClick, true);

    const contentTablist = document.querySelector('[aria-label="Content format"]');
    const designTablist = document.querySelector('[aria-label="Design category"]');
    if (contentTablist) contentTablist.addEventListener('click', onPortfolioTabClick, true);
    if (designTablist) designTablist.addEventListener('click', onPortfolioTabClick, true);
  }

  function init() {
    bindPortfolioTabs();
    applyFromURL();
    window.addEventListener('hashchange', applyFromURL);
    window.addEventListener('popstate', applyFromURL);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 120);
    });
  } else {
    setTimeout(init, 120);
  }

  window.NavState = {
    getState,
    applyFromURL,
    updateHash,
    toHash,
    VALID_HASHES,
    DEFAULT_HASH,
  };
})();
