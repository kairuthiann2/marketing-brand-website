/**
 * Reusable portfolio card components.
 * Single source of truth: change structure here and it reflects across Long Form, Short Form, Design.
 */
(function () {
  'use strict';

  const IFRAME_ALLOW = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
  const IFRAME_REFERRER = 'strict-origin-when-cross-origin';

  /** Left card: video or image inside mat frame */
  class PortfolioCardLeft extends HTMLElement {
    connectedCallback() {
      const type = (this.getAttribute('type') || 'image').toLowerCase();
      const src = this.getAttribute('src') || '';
      const title = this.getAttribute('title') || '';
      const alt = this.getAttribute('alt') || '';

      const isVideo = type === 'video';
      const innerClass = isVideo ? 'portfolio-card-left-inner portfolio-card-left-inner--video' : 'portfolio-card-left-inner';

      const innerContent = isVideo
        ? `<iframe data-src="${src}" allow="${IFRAME_ALLOW}" referrerpolicy="${IFRAME_REFERRER}" title="${title}"></iframe>`
        : `<img src="${src}" alt="${alt}" class="w-full h-full object-cover object-center grayscale rounded-lg">`;

      this.innerHTML = `
        <div class="portfolio-card-left">
          <div class="portfolio-card-left-mat">
            <div class="${innerClass}">${innerContent}</div>
          </div>
        </div>
      `;
    }
  }

  /** Right card: video (stands alone) or placeholder */
  class PortfolioCardRight extends HTMLElement {
    connectedCallback() {
      const type = (this.getAttribute('type') || 'placeholder').toLowerCase();
      const src = this.getAttribute('src') || '';
      const title = this.getAttribute('title') || '';

      const isVideo = type === 'video';
      const mediaClass = isVideo
        ? 'portfolio-card-right-media portfolio-card-right-media--video'
        : 'portfolio-card-right-media';

      const innerContent = isVideo
        ? `<div class="portfolio-card-right-video-wrap"><iframe data-src="${src}" allow="${IFRAME_ALLOW}" referrerpolicy="${IFRAME_REFERRER}" title="${title}"></iframe></div>`
        : `<div class="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center">
            <svg class="w-16 h-16 text-white/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5z"/></svg>
          </div>`;

      this.innerHTML = `
        <div class="portfolio-card-right">
          <div class="portfolio-card-right-frame">
            <div class="${mediaClass}">${innerContent}</div>
          </div>
        </div>
      `;
    }
  }

  customElements.define('portfolio-card-left', PortfolioCardLeft);
  customElements.define('portfolio-card-right', PortfolioCardRight);
})();
