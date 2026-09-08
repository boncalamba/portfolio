(() => {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const $all = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function decorateRevealTargets() {
    const groups = [
      ['.section-head > .eyebrow', 'reveal-scale'],
      ['.filters', 'reveal-left'],
      ['.project-card', null],
      ['.capability', null],
      ['.cms-card', null],
      ['.timeline-row', null],
      ['.statement-card', 'reveal-scale'],
      ['.contact-card', 'reveal-scale']
    ];

    groups.forEach(([selector, extra], groupIndex) => {
      $all(selector).forEach((el, i) => {
        if (el.dataset.localRevealBound === '1') return;
        el.dataset.localRevealBound = '1';
        el.classList.add('reveal-local');

        if (extra) el.classList.add(extra);

        if (!extra && (selector === '.project-card' || selector === '.capability' || selector === '.cms-card' || selector === '.timeline-row')) {
          el.classList.add((i + groupIndex) % 2 ? 'reveal-right' : 'reveal-left');
        }

        el.style.setProperty('--reveal-delay', `${Math.min((i % 3) * 55, 110)}ms`);
      });
    });

    // Make list-style areas stagger their direct children.
    [
      '.capability ul',
      '.tag-list',
      '.statement-steps',
      '.contact-actions',
      '.cms-grid',
      '.timeline'
    ].forEach((selector) => {
      $all(selector).forEach((el) => {
        if (el.dataset.localListBound === '1') return;
        el.dataset.localListBound = '1';
        el.classList.add('list-stagger');

        Array.from(el.children).forEach((child, i) => {
          child.style.setProperty('--child-delay', `${Math.min(i * 55, 330)}ms`);
        });
      });
    });
  }

  function splitImportantHeadings() {
    const selectors = [
      '.statement-text'
    ];

    $all(selectors.join(',')).forEach((el) => {
      if (el.dataset.wordRevealBound === '1') return;
      if (el.children.length && el.querySelector('span.split-word')) return;

      el.dataset.wordRevealBound = '1';

      const text = el.textContent.trim();
      if (!text) return;

      const words = text.split(/\s+/);
      el.textContent = '';

      words.forEach((word, index) => {
        const wrap = document.createElement('span');
        wrap.className = 'word-reveal';
        wrap.style.setProperty('--word-delay', `${Math.min(index * 26, 260)}ms`);

        const inner = document.createElement('span');
        inner.textContent = word;

        wrap.appendChild(inner);
        el.appendChild(wrap);

        if (index !== words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      });
    });
  }

  function observeReveals() {
    if (reduce || !('IntersectionObserver' in window)) {
      $all('.reveal-local,.word-reveal,.list-stagger').forEach((el) => el.classList.add('is-inview'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Repeat in both directions: visible = animate in,
          // outside viewport = animate back out.
          entry.target.classList.toggle('is-inview', entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -7% 0px'
      }
    );

    $all('.reveal-local,.word-reveal,.list-stagger').forEach((el) => observer.observe(el));

    window.__portfolioRevealObserver = observer;
  }

  function fallbackCodeEditor() {
    const panel = document.querySelector('.hero-code-panel');
    if (!panel || window.gsap) return;

    // Only use the CSS fallback if GSAP genuinely failed to load.
    window.setTimeout(() => {
      if (!panel.classList.contains('code-fallback-ready')) {
        panel.classList.add('code-fallback-ready');
      }
    }, 650);
  }

  function diagnostics() {
    window.__PORTFOLIO_DIAGNOSTICS__ = {
      vue: !!window.Vue,
      gsap: !!window.gsap,
      scrollTrigger: !!window.ScrollTrigger,
      lenis: !!window.Lenis,
      intersectionObserver: 'IntersectionObserver' in window,
      localReveal: true,
      version: '7.1.0'
    };

    console.info('[Portfolio V7.1] motion diagnostics', window.__PORTFOLIO_DIAGNOSTICS__);
  }

  function boot() {
    root.classList.add('motion-ready');

    // Vue's synchronous mount normally has finished before this file runs,
    // but defer one frame so all v-for cards are guaranteed to exist.
    requestAnimationFrame(() => {
      decorateRevealTargets();
      splitImportantHeadings();
      observeReveals();
      fallbackCodeEditor();
      diagnostics();

      // Rebind when Vue filters replace project cards.
      const app = document.getElementById('app');
      if (app && 'MutationObserver' in window) {
        const mutationObserver = new MutationObserver(() => {
          decorateRevealTargets();
          splitImportantHeadings();

          const observer = window.__portfolioRevealObserver;
          if (observer) {
            $all('.reveal-local,.word-reveal,.list-stagger').forEach((el) => observer.observe(el));
          }
        });

        mutationObserver.observe(app, { childList: true, subtree: true });
      }
    });
  }

  /*
   * Critical V7.1 fix:
   * reveal.js no longer starts at DOMContentLoaded.
   * It waits until app.js confirms the preloader has completely left.
   */
  if (window.__PORTFOLIO_READY__) {
    boot();
  } else {
    window.addEventListener('portfolio:ready', boot, { once: true });
  }

  /*
   * Safety fallback: if app.js or GSAP fails, do not leave the page
   * permanently without local section animations.
   */
  window.setTimeout(() => {
    if (!document.documentElement.classList.contains('motion-ready') &&
        !document.getElementById('page-loader')) {
      boot();
    }
  }, 5000);
})();
