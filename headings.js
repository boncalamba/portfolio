(() => {
  'use strict';

  const VERSION = '8.0.0';

  function splitWords(element) {
    if (!element || element.dataset.gsapHeadingSplit === '1') {
      return element ? Array.from(element.querySelectorAll('.heading-reveal-word')) : [];
    }

    element.dataset.gsapHeadingSplit = '1';
    element.classList.add('heading-reveal-ready');

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          if (
            node.parentElement &&
            node.parentElement.closest('.heading-reveal-mask')
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => {
      const parts = textNode.nodeValue.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (!part) return;

        if (/^\s+$/.test(part)) {
          fragment.appendChild(document.createTextNode(part));
          return;
        }

        const mask = document.createElement('span');
        mask.className = 'heading-reveal-mask';

        const word = document.createElement('span');
        word.className = 'heading-reveal-word';
        word.textContent = part;

        mask.appendChild(word);
        fragment.appendChild(mask);
      });

      textNode.parentNode.replaceChild(fragment, textNode);
    });

    return Array.from(element.querySelectorAll('.heading-reveal-word'));
  }

  function buildHeadingAnimation(heading, index) {
    const words = splitWords(heading);
    if (!words.length) return;

    // Nothing is hidden until GSAP is confirmed available.
    gsap.set(words, {
      autoAlpha: 0,
      yPercent: 120,
      rotateX: -38,
      filter: 'blur(8px)',
      transformOrigin: '50% 100%'
    });

    const timeline = gsap.timeline({ paused: true });

    timeline.to(words, {
      autoAlpha: 1,
      yPercent: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: heading.tagName === 'H1' ? 0.82 : 0.72,
      stagger: heading.tagName === 'H1' ? 0.055 : 0.045,
      ease: 'power4.out'
    });

    ScrollTrigger.create({
      trigger: heading,
      start: 'top 88%',
      end: 'bottom 12%',
      animation: timeline,

      // down: enter=play, leave=reverse
      // up:   enterBack=play, leaveBack=reverse
      toggleActions: 'play reverse play reverse',
      invalidateOnRefresh: true
    });
  }

  function boot() {
    // Retry briefly if a CDN fallback is still loading.
    if (!window.gsap || !window.ScrollTrigger) {
      window.__headingGsapRetries = (window.__headingGsapRetries || 0) + 1;

      if (window.__headingGsapRetries < 30) {
        setTimeout(boot, 150);
      } else {
        console.warn('[Portfolio V8] GSAP/ScrollTrigger did not load. Headings left visible.');
      }

      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const headings = Array.from(document.querySelectorAll('h1, h2'));

    headings.forEach((heading, index) => {
      if (heading.dataset.gsapHeadingBound === '1') return;
      heading.dataset.gsapHeadingBound = '1';
      buildHeadingAnimation(heading, index);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    window.__PORTFOLIO_HEADING_ANIMATION__ = {
      version: VERSION,
      gsap: gsap.version,
      scrollTrigger: true,
      headingCount: headings.length
    };

    console.info(
      '[Portfolio V8] GSAP H1/H2 reveal active',
      window.__PORTFOLIO_HEADING_ANIMATION__
    );
  }

  // Vue mount is synchronous, but one frame guarantees all rendered headings exist.
  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      () => requestAnimationFrame(boot),
      { once: true }
    );
  } else {
    requestAnimationFrame(boot);
  }
})();
