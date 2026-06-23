// Enhanced scroll reveal: auto-apply `.reveal` to common UI blocks and observe them
const selectors = ['.reveal', '.hero', '.card', '.valueCard', '.aboutText', '.heroInfo', '.homeSection'];

function setup() {
  if (typeof window === 'undefined') return;

  // We'll create the observer after we collect elements so we can compute order-based delays

  const query = selectors.join(', ');
  const nodeList = document.querySelectorAll(query);
  const els = Array.from(nodeList);

  els.forEach(el => {
    // ensure initial hidden state via `.reveal` class so CSS handles it
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  // Stagger helper: set transition-delay based on document order when observed
  const orderedEls = els; // capture order

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // compute index for stagger (cap at 12 to avoid huge delays)
        const idx = Math.max(0, Math.min(12, orderedEls.indexOf(entry.target)));
        const delay = idx * 70; // ms
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  // Re-observe with the created observer (remove previous observation if any)
  els.forEach(el => observer.observe(el));

  // Scroll fallback: ensure reveal triggers on manual scroll (throttled via rAF)
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      orderedEls.forEach((el, i) => {
        if (el.classList.contains('active')) return;
        const r = el.getBoundingClientRect();
        // trigger when top is within 85% of viewport
        if (r.top <= vh * 0.85 && r.bottom >= 0) {
          const delay = Math.max(0, Math.min(12, i)) * 70;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('active');
        }
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Auto-init on DOMContentLoaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
}

export default setup;
