(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyAOSAttributes() {
    const sections = document.querySelectorAll('.section-head');
    sections.forEach((el, i) => {
      if (el.dataset.aosBound) return;
      el.dataset.aos = 'fade-blur';
      el.dataset.aosDuration = '850';
      el.dataset.aosOffset = '80';
      el.dataset.aosBound = '1';
    });

    const selectors = [
      '.project-card',
      '.capability',
      '.cms-card',
      '.timeline-row',
      '.statement-card',
      '.contact-card'
    ];

    document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
      if (el.dataset.aosBound) return;
      const types = ['slide-soft-left', 'zoom-soft', 'slide-soft-right', 'fade-blur'];
      el.dataset.aos = types[i % types.length];
      el.dataset.aosDuration = String(700 + (i % 3) * 100);
      el.dataset.aosDelay = String((i % 3) * 45);
      el.dataset.aosOffset = '65';
      el.dataset.aosBound = '1';
    });

    document.querySelectorAll('.filters, .statement-steps, .contact-actions, .cms-card-copy').forEach((el, i) => {
      if (el.dataset.aosBound) return;
      el.dataset.aos = i % 2 ? 'fade-left' : 'fade-right';
      el.dataset.aosDuration = '650';
      el.dataset.aosOffset = '55';
      el.dataset.aosBound = '1';
    });
  }

  function initAOS() {
    if (!window.AOS || reduceMotion) return;

    applyAOSAttributes();
    AOS.init({
      once: false,
      mirror: true,
      duration: 800,
      easing: 'ease-out-cubic',
      offset: 70,
      anchorPlacement: 'top-bottom',
      disableMutationObserver: false
    });

    requestAnimationFrame(() => AOS.refreshHard());

    const observer = new MutationObserver(() => {
      applyAOSAttributes();
      AOS.refreshHard();
    });

    const app = document.getElementById('app');
    if (app) observer.observe(app, { childList: true, subtree: true });

    window.addEventListener('load', () => AOS.refreshHard());
    window.addEventListener('resize', () => AOS.refresh());
  }

  function initLenis() {
    if (!window.Lenis || reduceMotion) return null;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: .9,
      touchMultiplier: 1.1,
      syncTouch: false,
      anchors: true
    });

    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    if (window.gsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    window.__portfolioLenis = lenis;
    return lenis;
  }

  function initSplitText() {
    if (!window.gsap || !window.ScrollTrigger || !window.SplitText || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    document.querySelectorAll('.section-head h2, .statement-text, .contact-card h2').forEach((heading) => {
      if (heading.dataset.splitMotionBound) return;
      heading.dataset.splitMotionBound = '1';

      const split = new SplitText(heading, {
        type: 'words',
        wordsClass: 'split-word'
      });

      const tween = gsap.fromTo(
        split.words,
        {
          autoAlpha: 0,
          yPercent: 105,
          rotateX: -28,
          filter: 'blur(8px)'
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: .025,
          duration: .62,
          ease: 'power4.out',
          paused: true
        }
      );

      ScrollTrigger.create({
        trigger: heading,
        start: 'top 88%',
        end: 'bottom 8%',
        animation: tween,
        toggleActions: 'play reverse play reverse'
      });
    });
  }

  function initCmsLogoMotion() {
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

    gsap.utils.toArray('.cms-card').forEach((card, i) => {
      const logo = card.querySelector('.cms-logo-plate');
      if (!logo) return;

      gsap.to(logo, {
        y: i % 2 ? 8 : -8,
        rotate: i % 2 ? 2.2 : -2.2,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: .8
        }
      });
    });
  }

  function boot() {
    applyAOSAttributes();
    initLenis();
    initAOS();

    // Give Vue one frame to finish dynamic lists before splitting text.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initSplitText();
        initCmsLogoMotion();
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
