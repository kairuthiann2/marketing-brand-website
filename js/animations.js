/**
 * Vanilla JS animations - Scroll Reveal & Micro-interactions
 * No external libraries. Uses Intersection Observer.
 */

(function () {
  'use strict';

  // Scroll Reveal: sections fade in, translate from 20px down, 500ms
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function initScrollReveal() {
    document.querySelectorAll('.reveal').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // Testimonials carousel - auto-play, right-to-left slide, manual buttons
  const TESTIMONIAL_DWELL_MS = 7000; // 7 seconds per slide - time to read

  function initTestimonialsCarousel() {
    const carousel = document.querySelector('[data-testimonials-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('[data-testimonial-track]');
    const slides = carousel.querySelectorAll('[data-testimonial-slide]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const prevBtnMobile = carousel.querySelector('[data-carousel-prev-mobile]');
    const nextBtnMobile = carousel.querySelector('[data-carousel-next-mobile]');

    if (!track || slides.length === 0) return;

    track.style.setProperty('--slide-count', slides.length);

    let currentIndex = 0;
    let autoPlayTimer = null;

    function updatePagination() {
      const currentSpan = carousel.querySelector('[data-carousel-current]');
      const totalSpan = carousel.querySelector('[data-carousel-total]');
      if (currentSpan) currentSpan.textContent = currentIndex + 1;
      if (totalSpan) totalSpan.textContent = slides.length;
    }

    function goToSlide(index) {
      currentIndex = ((index % slides.length) + slides.length) % slides.length;
      const percentPerSlide = 100 / slides.length;
      track.style.transform = `translateX(-${currentIndex * percentPerSlide}%)`;
      updatePagination();
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, TESTIMONIAL_DWELL_MS);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function handlePrev() {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    }
    function handleNext() {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    }

    if (prevBtn) prevBtn.addEventListener('click', handlePrev);
    if (nextBtn) nextBtn.addEventListener('click', handleNext);
    if (prevBtnMobile) prevBtnMobile.addEventListener('click', handlePrev);
    if (nextBtnMobile) nextBtnMobile.addEventListener('click', handleNext);

    goToSlide(0);
    startAutoPlay();
  }

  // Services section - hover (desktop) / click (mobile) to expand
  function initServicesExpandable() {
    const container = document.querySelector('[data-service-entries]');
    if (!container) return;

    const entries = container.querySelectorAll('[data-service-entry]');
    const triggers = container.querySelectorAll('[data-service-trigger]');
    const mq = window.matchMedia('(min-width: 1024px)');

    function expand(entry) {
      entry.classList.add('is-expanded');
      const trigger = entry.querySelector('[data-service-trigger]');
      const content = entry.querySelector('.service-expanded');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'true');
      }
      if (content) content.removeAttribute('aria-hidden');
    }

    function collapse(entry) {
      entry.classList.remove('is-expanded');
      const trigger = entry.querySelector('[data-service-trigger]');
      const content = entry.querySelector('.service-expanded');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (content) content.setAttribute('aria-hidden', 'true');
    }

    function collapseAll() {
      entries.forEach((e) => collapse(e));
    }

    triggers.forEach((trigger, i) => {
      const entry = trigger.closest('[data-service-entry]');

      trigger.addEventListener('click', (e) => {
        if (mq.matches) return;
        e.preventDefault();
        const isExpanded = entry.classList.contains('is-expanded');
        if (isExpanded) {
          collapse(entry);
        } else {
          collapseAll();
          expand(entry);
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });

      trigger.addEventListener('mouseenter', () => {
        if (mq.matches) expand(entry);
      });
      entry.addEventListener('mouseleave', () => {
        if (mq.matches) collapse(entry);
      });
    });

    mq.addEventListener('change', (e) => {
      if (!e.matches) collapseAll();
    });
  }

  // FAQ accordion - smooth open AND close (native details hides content instantly on close)
  const FAQ_DURATION_MS = 400;

  function initFAQAccordion() {
    const cards = document.querySelectorAll('.faq-card');
    cards.forEach((details) => {
      const summary = details.querySelector('summary');
      const content = details.querySelector('.faq-content');
      if (!summary || !content) return;

      summary.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpening = !details.classList.contains('faq-open');

        if (isOpening) {
          details.setAttribute('open', '');
          details.classList.add('faq-open');
        } else {
          details.classList.remove('faq-open');
          setTimeout(() => {
            details.removeAttribute('open');
          }, FAQ_DURATION_MS);
        }
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initTestimonialsCarousel();
      initServicesExpandable();
      initFAQAccordion();
    });
  } else {
    initScrollReveal();
    initTestimonialsCarousel();
    initServicesExpandable();
    initFAQAccordion();
  }
})();
