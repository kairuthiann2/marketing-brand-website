/**
 * Services page: View More / View Less toggle.
 * Shows 4 services by default, expands to 7 with smooth animation.
 */
(function () {
  const DATA_LIST = 'data-services-list';
  const DATA_EXTRA = 'data-services-extra';
  const DATA_TOGGLE = 'data-services-toggle';
  const CLASS_EXPANDED = 'is-expanded';

  function init() {
    const list = document.querySelector('[' + DATA_LIST + ']');
    const extra = document.querySelector('[' + DATA_EXTRA + ']');
    const btn = document.querySelector('[' + DATA_TOGGLE + ']');
    if (!list || !extra || !btn) return;

    btn.addEventListener('click', function () {
      const isExpanded = list.classList.contains(CLASS_EXPANDED);
      if (isExpanded) {
        list.classList.remove(CLASS_EXPANDED);
        btn.textContent = 'View More';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        list.classList.add(CLASS_EXPANDED);
        btn.textContent = 'View Less';
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', extra.id);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
