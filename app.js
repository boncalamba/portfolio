(() => {
  const { createApp, nextTick } = Vue;

  const REVEAL_VARIANTS = {
    up: { opacity: 0, y: 52 },
    down: { opacity: 0, y: -36 },
    left: { opacity: 0, x: -64 },
    right: { opacity: 0, x: 64 },
    scale: { opacity: 0, y: 26, scale: .88 },
    blur: { opacity: 0, y: 34, filter: 'blur(12px)' }
  };

  createApp({
    data() {
      return {
        menuOpen: false,
        menuScrollY: 0,
        theme: 'light',
        selectedFilter: 'All',
        filters: ['All', 'WordPress', 'E-commerce', 'Marketing'],
        projects: [
          {
            name: 'Phenyx',
            short: 'PHX',
            category: 'Agency / WordPress',
            type: ['WordPress', 'Marketing'],
            url: 'https://phenyx.com.au/',
            description: 'Ongoing WordPress development, optimization, maintenance, troubleshooting, performance work, and technical SEO in an agency environment.',
            tags: ['WordPress', 'GSAP', 'Performance'],
            tone: 1
          },
          {
            name: 'Little Blossom',
            short: 'LB',
            category: 'Client Website',
            type: ['WordPress'],
            url: 'https://littleblossom.net.au/',
            description: 'Responsive client-site development and ongoing implementation work focused on usability, consistency, and maintainability.',
            tags: ['WordPress', 'Responsive', 'CMS'],
            tone: 2
          },
          {
            name: 'Chris Kille',
            short: 'CK',
            category: 'Personal Brand / Marketing',
            type: ['WordPress', 'Marketing'],
            url: 'https://chriskille.com/',
            description: 'Marketing-focused WordPress implementation with attention to conversion flows, presentation, performance, and content management.',
            tags: ['WordPress', 'Marketing', 'SEO'],
            tone: 3
          },
          {
            name: 'Grand Reve',
            short: 'GR',
            category: 'Client Website',
            type: ['WordPress'],
            url: 'https://grandreve.com.au/',
            description: 'WordPress development and optimization work supporting a polished front-end experience and reliable site operations.',
            tags: ['WordPress', 'UI', 'Optimization'],
            tone: 4
          },
          {
            name: 'Kelso Tools',
            short: 'KT',
            category: 'E-commerce / Catalog',
            type: ['WordPress', 'E-commerce'],
            url: 'https://www.kelsotools.com.au/',
            description: 'E-commerce and catalog website implementation including WordPress, WooCommerce, product content, custom front-end work, and QA.',
            tags: ['WooCommerce', 'PHP', 'QA'],
            tone: 5
          },
          {
            name: 'Kin Property',
            short: 'KIN',
            category: 'Business Website',
            type: ['WordPress', 'Marketing'],
            url: 'https://www.kinproperty.com.au/',
            description: 'WordPress development and maintenance covering front-end implementation, hosting workflows, analytics, SEO foundations, and site reliability.',
            tags: ['WordPress', 'Analytics', 'Hosting'],
            tone: 6
          }
        ],
        capabilities: [
          {
            title: 'WordPress Engineering',
            description: 'Full lifecycle WordPress work from setup and templates to custom functionality and long-term maintenance.',
            items: ['Custom PHP', 'ACF & CPTs', 'Theme / plugin work', 'Elementor']
          },
          {
            title: 'E-commerce',
            description: 'Product-driven sites that are easy to manage and dependable under real client workflows.',
            items: ['WooCommerce', 'Shopify', 'Product imports', 'Catalog QA']
          },
          {
            title: 'Front-end & Motion',
            description: 'Responsive interfaces with interaction and motion used to improve clarity rather than distract from it.',
            items: ['HTML / CSS', 'JavaScript', 'GSAP', 'Responsive UI']
          },
          {
            title: 'Performance',
            description: 'Practical performance improvements across assets, templates, hosting, caching, and Core Web Vitals.',
            items: ['Core Web Vitals', 'WP Rocket', 'PageSpeed', 'Asset optimization']
          },
          {
            title: 'SEO & Analytics',
            description: 'Technical implementation that helps marketing and content teams measure and improve what matters.',
            items: ['Technical SEO', 'RankMath', 'GA4 / GTM', 'Search Console']
          },
          {
            title: 'Hosting & Reliability',
            description: 'Hands-on infrastructure work for migrations, staging, domains, DNS, SSL, and security layers.',
            items: ['Hostinger / cPanel', 'Cloudflare', 'DNS / SSL', 'Migrations']
          }
        ],
        experience: [
          {
            period: '2024 — Present',
            role: 'Senior Web Developer',
            company: 'Phenyx',
            location: 'Australia · Remote',
            summary: 'Develop, optimize, troubleshoot, and maintain WordPress sites while handling performance, technical SEO, DNS, Cloudflare, analytics, and client delivery.'
          },
          {
            period: '2023 — 2024',
            role: 'Web Developer',
            company: 'Oracle NetSuite',
            location: 'United States · Remote',
            summary: 'Maintained web content, event and webinar pages, forms, sitemaps, and site updates while collaborating with content, design, and SEO teams.'
          },
          {
            period: '2022',
            role: 'Full Stack Web Developer',
            company: 'Elite Carpet Dry Cleaning',
            location: 'Australia · Remote',
            summary: 'Built custom WordPress functionality, responsive layouts, location-aware content, design assets, documentation, and DNS configuration.'
          },
          {
            period: '2020 — 2022',
            role: 'Senior Web Developer',
            company: 'QL PTY LTD',
            location: 'Philippines · Remote',
            summary: 'Handled technical SEO, GA/GTM implementation, front-end fixes, staging, migrations, SSL, DNS, and website maintenance.'
          },
          {
            period: '2017 — 2019',
            role: 'Full Stack Web Developer',
            company: 'Blaze Online',
            location: 'Australia · Remote',
            summary: 'Built WordPress and WooCommerce sites using PHP, JavaScript, CSS, Elementor, product workflows, performance optimization, and cross-browser QA.'
          }
        ],
        currentYear: new Date().getFullYear()
      };
    },

    computed: {
      filteredProjects() {
        if (this.selectedFilter === 'All') return this.projects;
        return this.projects.filter(project => project.type.includes(this.selectedFilter));
      }
    },

    watch: {
      selectedFilter() {
        nextTick(() => {
          this.animateCards();
          this.bindTilt();
          this.bindCursorTargets();
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        });
      },

      menuOpen(open) {
        const touchMenu = window.matchMedia('(max-width: 720px), (pointer: coarse)').matches;
        document.documentElement.classList.toggle('menu-open', open);

        if (open && touchMenu) {
          this.menuScrollY = window.scrollY || window.pageYOffset || 0;
          document.body.style.position = 'fixed';
          document.body.style.top = `-${this.menuScrollY}px`;
          document.body.style.left = '0';
          document.body.style.right = '0';
          document.body.style.width = '100%';
          document.body.style.overflow = 'hidden';
          return;
        }

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        if (!open && touchMenu) window.scrollTo(0, this.menuScrollY || 0);
      }
    },

    mounted() {
      nextTick(() => {
        this.initTheme();
        this.initSmoothAnchors();
        this.initMenuControls();

        this.initLoader(() => {
          this.startExperienceAnimations();
        });
      });
    },

    methods: {
      initTheme() {
        const savedTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
        this.applyTheme(savedTheme, false);
      },

      applyTheme(theme, persist = true) {
        this.theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.dataset.theme = this.theme;

        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) themeMeta.setAttribute('content', this.theme === 'dark' ? '#080808' : '#f3f4ee');

        if (persist) {
          try { localStorage.setItem('bon-theme', this.theme); } catch (_) {}
        }

        requestAnimationFrame(() => {
          if (window.ScrollTrigger) ScrollTrigger.refresh();
        });
      },

      toggleTheme() {
        this.applyTheme(this.theme === 'dark' ? 'light' : 'dark');
      },

      initLoader(onReady) {
        const loader = document.getElementById('page-loader');
        const percent = document.getElementById('loader-percent');

        const finish = () => {
          if (loader && loader.parentNode) loader.remove();

          document.documentElement.classList.add('loader-complete');
          document.body.classList.remove('is-loading');

          if (typeof onReady === 'function') {
            onReady();
          }
        };

        if (!loader || !percent || !window.gsap) {
          finish();
          return;
        }

        document.body.classList.add('is-loading');

        const counter = { value: 0 };

        gsap.to(counter, {
          value: 100,
          duration: 1.15,
          ease: 'power2.out',
          onUpdate: () => {
            percent.textContent = String(Math.round(counter.value)).padStart(3, '0');
          },
          onComplete: () => {
            gsap.timeline({
              onComplete: finish
            })
              .to('.loader-copy', {
                y: -24,
                opacity: 0,
                duration: .32,
                ease: 'power2.in'
              })
              .to(loader, {
                clipPath: 'inset(0 0 100% 0)',
                duration: .72,
                ease: 'power4.inOut'
              }, '-=.06');
          }
        });
      },

      startExperienceAnimations() {
        const start = () => {
          if (window.__PORTFOLIO_ANIMATIONS_STARTED__) return;
          window.__PORTFOLIO_ANIMATIONS_STARTED__ = true;

          const coarsePointer = window.matchMedia('(pointer:coarse)').matches;
          const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
          const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
          if (coarsePointer || lowCores || lowMemory) {
            document.documentElement.classList.add('low-motion');
          }

          /*
           * Start every V7 effect ONLY after the loader is gone.
           * This preserves the V7 experience without letting its
           * entrance animations play invisibly behind the preloader.
           */
          this.initLenis();
          this.initMotion();
          this.initGsapTextReveals();
          this.initCursor();
          this.initCodePanel();
          if (!document.documentElement.classList.contains('low-motion')) {
            this.bindProjectScrollMotion();
            this.bindListingScrollMotion();
            this.bindTilt();
            this.initInteractiveScrollFx();
          }

          window.__PORTFOLIO_READY__ = true;

          window.dispatchEvent(
            new CustomEvent('portfolio:ready', {
              detail: { version: '7.14.0' }
            })
          );

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (window.ScrollTrigger) {
                ScrollTrigger.refresh(true);
                ScrollTrigger.update();
              }

              window.dispatchEvent(new Event('resize'));

              console.info('[Portfolio V7.4] animations started after preloader', {
                gsap: !!window.gsap,
                scrollTrigger: !!window.ScrollTrigger,
                loaderRemoved: !document.getElementById('page-loader')
              });
            });
          });
        };

        /*
         * Fonts can change heading dimensions. Waiting for them avoids
         * incorrect ScrollTrigger start/end positions.
         */
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready
            .then(() => requestAnimationFrame(() => requestAnimationFrame(start)))
            .catch(() => requestAnimationFrame(() => requestAnimationFrame(start)));
        } else {
          requestAnimationFrame(() => requestAnimationFrame(start));
        }
      },


      initSmoothAnchors() {
        document.addEventListener('click', (event) => {
          const link = event.target.closest('a[href^="#"]');
          if (!link) return;

          const target = document.querySelector(link.getAttribute('href'));
          if (!target) return;

          event.preventDefault();
          target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start'
          });
        });
      },

      initMenuControls() {
        const closeMenu = () => { this.menuOpen = false; };
        window.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') closeMenu();
        });
        window.addEventListener('resize', () => {
          if (window.innerWidth > 720 && this.menuOpen) closeMenu();
        }, { passive: true });
      },

      animateCards() {
        if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        gsap.fromTo(
          '.project-card',
          { opacity: 0, y: 36, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: .65,
            stagger: .08,
            ease: 'power3.out',
            clearProps: 'transform'
          }
        );
      },

      bindReversibleElement(el, variant = 'up', trigger = null, start = 'top 90%', end = 'bottom 8%') {
        if (!el || !window.gsap || !window.ScrollTrigger) return;
        if (el.dataset.scrollCycleBound === '1') return;

        el.dataset.scrollCycleBound = '1';
        el.classList.add('scroll-cycle');

        const source = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.up;
        const fromVars = {
          autoAlpha: 0,
          x: source.x || 0,
          y: source.y || 0,
          scale: source.scale || 1,
          filter: source.filter || 'blur(0px)'
        };

        const tl = gsap.timeline({ paused: true }).fromTo(
          el,
          fromVars,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: .72,
            ease: 'power4.out'
          }
        );

        ScrollTrigger.create({
          trigger: trigger || el,
          start,
          end,
          animation: tl,
          toggleActions: 'play reverse play reverse'
        });
      },

      bindProjectScrollMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        gsap.utils.toArray('.project-card').forEach((card, index) => {
          const link = card.querySelector('.project-link');
          if (!link || link.dataset.projectMotionBound === '1') return;

          link.dataset.projectMotionBound = '1';
          link.classList.add('scroll-cycle');

          const direction = index % 2 === 0 ? -34 : 34;

          const tl = gsap.timeline({ paused: true })
            .fromTo(
              link,
              {
                autoAlpha: 0,
                x: direction,
                y: 34,
                scale: .96,
                filter: 'blur(8px)'
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: .72,
                ease: 'power4.out'
              }
            );

          const visual = card.querySelector('.project-visual');
          const meta = card.querySelector('.project-meta');
          const description = card.querySelector('.project-description');
          const tags = card.querySelectorAll('.tag-list li');

          if (visual) {
            tl.fromTo(
              visual,
              { clipPath: 'inset(12% 6% 12% 6%)', scale: 1.035 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
                duration: .55,
                ease: 'power3.out'
              },
              '-=.52'
            );
          }

          if (meta) {
            tl.fromTo(
              meta,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: .4, ease: 'power3.out' },
              '-=.32'
            );
          }

          if (description) {
            tl.fromTo(
              description,
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: .38, ease: 'power3.out' },
              '-=.27'
            );
          }

          if (tags.length) {
            tl.fromTo(
              tags,
              { autoAlpha: 0, y: 10, scale: .92 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: .28,
                stagger: .045,
                ease: 'back.out(1.6)'
              },
              '-=.22'
            );
          }

          ScrollTrigger.create({
            trigger: card,
            start: 'top 91%',
            end: 'bottom 8%',
            animation: tl,
            toggleActions: 'play reverse play reverse'
          });
        });
      },

      bindListingScrollMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;

        /* Capability cards: the card and every list item animate. */
        gsap.utils.toArray('.capability').forEach((card, index) => {
          if (card.dataset.listMotionBound === '1') return;
          card.dataset.listMotionBound = '1';

          const side = index % 2 === 0 ? -28 : 28;

          const tl = gsap.timeline({ paused: true })
            .fromTo(
              card,
              {
                autoAlpha: 0,
                x: side,
                y: 34,
                scale: .965,
                filter: 'blur(7px)'
              },
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: .7,
                ease: 'power4.out'
              }
            );

          const title = card.querySelector('h3');
          const copy = card.querySelector('p');
          const items = card.querySelectorAll('li');

          if (title) {
            tl.fromTo(title, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .35 }, '-=.35');
          }
          if (copy) {
            tl.fromTo(copy, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .32 }, '-=.25');
          }
          if (items.length) {
            tl.fromTo(
              items,
              { autoAlpha: 0, x: -10 },
              {
                autoAlpha: 1,
                x: 0,
                duration: .26,
                stagger: .045,
                ease: 'power2.out'
              },
              '-=.16'
            );
          }

          ScrollTrigger.create({
            trigger: card,
            start: 'top 91%',
            end: 'bottom 8%',
            animation: tl,
            toggleActions: 'play reverse play reverse'
          });
        });

        /* Experience rows: alternating direction + child stagger. */
        gsap.utils.toArray('.timeline-row').forEach((row, index) => {
          if (row.dataset.listMotionBound === '1') return;
          row.dataset.listMotionBound = '1';

          const side = index % 2 === 0 ? -48 : 48;
          const children = row.children;

          const tl = gsap.timeline({ paused: true })
            .fromTo(
              row,
              { autoAlpha: 0, x: side, filter: 'blur(7px)' },
              {
                autoAlpha: 1,
                x: 0,
                filter: 'blur(0px)',
                duration: .68,
                ease: 'power4.out'
              }
            )
            .fromTo(
              children,
              { autoAlpha: 0, y: 14 },
              {
                autoAlpha: 1,
                y: 0,
                duration: .36,
                stagger: .07,
                ease: 'power3.out'
              },
              '-=.34'
            );

          ScrollTrigger.create({
            trigger: row,
            start: 'top 90%',
            end: 'bottom 9%',
            animation: tl,
            toggleActions: 'play reverse play reverse'
          });
        });

        /* Statement content. */
        const statement = document.querySelector('.statement-card');
        if (statement && statement.dataset.listMotionBound !== '1') {
          statement.dataset.listMotionBound = '1';

          const pieces = statement.querySelectorAll('.eyebrow,.statement-text,.statement-steps span');
          const tl = gsap.timeline({ paused: true })
            .fromTo(
              statement,
              { autoAlpha: 0, scale: .94, y: 38, filter: 'blur(10px)' },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: .72,
                ease: 'power4.out'
              }
            )
            .fromTo(
              pieces,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: .38,
                stagger: .055,
                ease: 'power3.out'
              },
              '-=.35'
            );

          ScrollTrigger.create({
            trigger: statement,
            start: 'top 88%',
            end: 'bottom 9%',
            animation: tl,
            toggleActions: 'play reverse play reverse'
          });
        }

        /* Contact content and every contact button. */
        const contact = document.querySelector('.contact-card');
        if (contact && contact.dataset.listMotionBound !== '1') {
          contact.dataset.listMotionBound = '1';

          const pieces = contact.querySelectorAll('.eyebrow,h2,p,.contact-actions a,.contact-number');

          const tl = gsap.timeline({ paused: true })
            .fromTo(
              contact,
              { autoAlpha: 0, scale: .94, y: 42, filter: 'blur(10px)' },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: .72,
                ease: 'power4.out'
              }
            )
            .fromTo(
              pieces,
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: .36,
                stagger: .055,
                ease: 'power3.out'
              },
              '-=.34'
            );

          ScrollTrigger.create({
            trigger: contact,
            start: 'top 90%',
            end: 'bottom 6%',
            animation: tl,
            toggleActions: 'play reverse play reverse'
          });
        }
      },

      initLenis() {
        if (!window.Lenis || !window.gsap) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.matchMedia('(pointer:coarse)').matches) return;
        if (document.documentElement.classList.contains('low-motion')) return;
        if (window.__PORTFOLIO_LENIS__) return;

        const lenis = new Lenis({
          duration: .9,
          smoothWheel: true,
          wheelMultiplier: .92,
          touchMultiplier: 1,
          infinite: false
        });

        window.__PORTFOLIO_LENIS__ = lenis;

        lenis.on('scroll', () => {
          if (window.ScrollTrigger) ScrollTrigger.update();
        });

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      },

      initInteractiveScrollFx() {
        if (!window.gsap || !window.ScrollTrigger) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (document.documentElement.classList.contains('low-motion')) return;

        /* Portrait depth/parallax */
        const portrait = document.querySelector('.portrait-wrap');
        const portraitImg = document.querySelector('.portrait-frame img');
        const sheen = document.querySelector('.portrait-sheen');

        if (portrait && portraitImg) {
          gsap.fromTo(
            portrait,
            {
              autoAlpha: 0,
              y: 70,
              rotateY: -8,
              rotateX: 5,
              scale: .94
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: .95,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: portrait,
                start: 'top 88%',
                end: 'bottom 8%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );

          gsap.to(portraitImg, {
            yPercent: 11,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: portrait,
              start: 'top bottom',
              end: 'bottom top',
              scrub: .9
            }
          });

          if (sheen) {
            gsap.fromTo(
              sheen,
              { xPercent: -140, rotate: 12 },
              {
                xPercent: 170,
                rotate: 12,
                ease: 'none',
                scrollTrigger: {
                  trigger: portrait,
                  start: 'top 85%',
                  end: 'bottom 20%',
                  scrub: .7
                }
              }
            );
          }

          gsap.set(portrait, { transformPerspective: 1000 });

          const portraitRy = gsap.quickTo(portrait, 'rotateY', {
            duration: .34,
            ease: 'power3.out'
          });
          const portraitRx = gsap.quickTo(portrait, 'rotateX', {
            duration: .34,
            ease: 'power3.out'
          });
          const portraitX = gsap.quickTo(portrait, 'x', {
            duration: .34,
            ease: 'power3.out'
          });
          const portraitY = gsap.quickTo(portrait, 'y', {
            duration: .34,
            ease: 'power3.out'
          });

          let portraitRect = null;

          portrait.addEventListener('pointerenter', () => {
            portraitRect = portrait.getBoundingClientRect();
          }, { passive: true });

          portrait.addEventListener('pointermove', (event) => {
            if (!portraitRect) portraitRect = portrait.getBoundingClientRect();

            const px = (event.clientX - portraitRect.left) / portraitRect.width - .5;
            const py = (event.clientY - portraitRect.top) / portraitRect.height - .5;

            portraitRy(px * 7);
            portraitRx(-py * 7);
            portraitX(px * 5);
            portraitY(py * 4);
          }, { passive: true });

          portrait.addEventListener('pointerleave', () => {
            portraitRect = null;
            portraitRy(0);
            portraitRx(0);
            portraitX(0);
            portraitY(0);
          }, { passive: true });
        }

        /* About text cards cascade and reverse. */
        gsap.utils.toArray('.about-points > div').forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              autoAlpha: 0,
              x: index % 2 ? 34 : -34,
              y: 18,
              filter: 'blur(6px)'
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              filter: 'blur(0px)',
              duration: .62,
              delay: index * .05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'bottom 8%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        });

        /* Section transition: slight scale/fade on enter/exit. */
        gsap.utils.toArray('main > section').forEach((section, index) => {
          if (section.classList.contains('hero')) return;

          gsap.fromTo(
            section,
            {
              '--sectionGlow': 0
            },
            {
              '--sectionGlow': 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'center center',
                scrub: .8
              }
            }
          );
        });

        /* Footer arrival. */
        const footer = document.querySelector('.site-footer');
        if (footer) {
          gsap.fromTo(
            footer.children,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              stagger: .08,
              duration: .5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footer,
                start: 'top 92%',
                end: 'bottom 8%',
                toggleActions: 'play reverse play reverse'
              }
            }
          );
        }
      },


      initMotion() {
        if (!window.gsap) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const touchLayout = window.matchMedia('(pointer: coarse), (hover: none), (max-width: 720px)').matches;
        if (reduce || touchLayout || document.documentElement.classList.contains('low-motion')) return;

        gsap.registerPlugin(ScrollTrigger);

        /* Initial hero entrance. */
        gsap.timeline({ defaults: { ease: 'power3.out' }, delay: .08 })
          .from('.site-header', { opacity: 0, y: -20, duration: .7 })
          .from('.hero-reveal:not(.hero-title):not(.hero-code-panel)', { opacity: 0, y: 42, duration: .92, stagger: .09 }, '-=.3')
          .from('.hero-code-panel', { opacity: 0, y: 48, rotateX: 5, duration: 1.05 }, '-=.8');

        /* Hero fades/parallaxes away as you leave it. This is scrubbed,
           therefore scrolling upward reverses it automatically. */
        gsap.to('.hero-copy', {
          yPercent: -10,
          autoAlpha: .16,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 24%',
            scrub: .9
          }
        });

        gsap.to('.hero-code-panel', {
          yPercent: 13,
          rotateX: -3,
          autoAlpha: .22,
          ease: 'none',
          transformPerspective: 1200,
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 22%',
            scrub: .9
          }
        });

        gsap.to('.scroll-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: .22
          }
        });

        /* A very subtle velocity skew makes fast scrolling feel fluid. */
        const skewTarget = document.querySelector('main');

        if (skewTarget && window.matchMedia('(min-width:900px) and (pointer:fine)').matches && !document.documentElement.classList.contains('low-motion')) {
          const skewProxy = { value: 0 };
          const skewSetter = gsap.quickSetter(skewTarget, 'skewY', 'deg');
          const clampSkew = gsap.utils.clamp(-1.5, 1.5);

          ScrollTrigger.create({
            onUpdate: (self) => {
              const target = clampSkew(self.getVelocity() / -620);

              if (Math.abs(target) > Math.abs(skewProxy.value)) {
                skewProxy.value = target;
                gsap.to(skewProxy, {
                  value: 0,
                  duration: .65,
                  ease: 'power3.out',
                  overwrite: true,
                  onUpdate: () => skewSetter(skewProxy.value)
                });
              }
            }
          });
        }

        /* Marquee direction and position remain tied to scroll,
           so it also reverses when scrolling upward. */
        /* Continuous marquee. Scrolling changes its direction without
           making the animation dependent on page scroll distance. */
        const marquee = document.querySelector('.marquee');
        if (marquee) {
          const marqueeTween = gsap.fromTo(
            marquee,
            { xPercent: 0 },
            {
              xPercent: -50,
              duration: 22,
              ease: 'none',
              repeat: -1
            }
          );

          ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
              gsap.to(marqueeTween, {
                timeScale: self.direction < 0 ? -1 : 1,
                duration: .28,
                overwrite: true
              });
            }
          });
        }

        /* Regular content reveal is handled by AOS in motion.js. */

        /* Section reveal/wipe is handled independently by AOS + CSS. */


        /* Every capability, timeline listing, statement and contact item. */

        /* Ambient hero shapes: pure scrub = perfect reverse on scroll up. */
        gsap.to('.orb-one', {
          yPercent: 40,
          xPercent: -12,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to('.orb-two', {
          yPercent: -36,
          xPercent: 14,
          scale: .82,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });

        /* Project scan line hover remains independent of scroll. */
        gsap.utils.toArray('.project-card').forEach((card) => {
          const scan = card.querySelector('.project-scanline');
          if (!scan || card.dataset.scanBound === '1') return;
          card.dataset.scanBound = '1';

          card.addEventListener('pointerenter', () => {
            gsap.fromTo(
              scan,
              { yPercent: -110 },
              { yPercent: 110, duration: .85, ease: 'power2.inOut' }
            );
          });
        });

        /* Horizontal storytelling section.
           Because the horizontal tween itself is scrubbed, it reverses
           exactly as the user scrolls upward. */
        const horizontalTrack = document.querySelector('.horizontal-track');
        const lab = document.querySelector('.horizontal-lab');

        if (horizontalTrack && lab && window.matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
          const getDistance = () => Math.max(0, horizontalTrack.scrollWidth - window.innerWidth);

          const horizontalTween = gsap.to(horizontalTrack, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: lab,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              invalidateOnRefresh: true
            }
          });

          gsap.utils.toArray('.lab-panel').forEach((panel) => {
            const copy = panel.querySelector('p');
            const index = panel.querySelector('.lab-index');

            if (copy) {
              gsap.fromTo(
                copy,
                {
                  autoAlpha: .08,
                  scale: .84,
                  filter: 'blur(12px)',
                  y: 28
                },
                {
                  autoAlpha: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  y: 0,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalTween,
                    start: 'left 82%',
                    end: 'center center',
                    scrub: .7
                  }
                }
              );
            }

            if (index) {
              gsap.fromTo(
                index,
                { autoAlpha: .1, x: -30 },
                {
                  autoAlpha: 1,
                  x: 0,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalTween,
                    start: 'left 88%',
                    end: 'left 50%',
                    scrub: .6
                  }
                }
              );
            }
          });
        }

        /* Magnetic buttons. */
        document.querySelectorAll('.magnetic').forEach((el) => {
          if (el.dataset.magneticBound === '1') return;
          el.dataset.magneticBound = '1';

          const xTo = gsap.quickTo(el, 'x', {
            duration: .22,
            ease: 'power2.out'
          });

          const yTo = gsap.quickTo(el, 'y', {
            duration: .22,
            ease: 'power2.out'
          });

          let rect = null;

          el.addEventListener('pointerenter', () => {
            rect = el.getBoundingClientRect();
          }, { passive: true });

          el.addEventListener('pointermove', (event) => {
            if (!rect) rect = el.getBoundingClientRect();

            xTo((event.clientX - rect.left - rect.width / 2) * .14);
            yTo((event.clientY - rect.top - rect.height / 2) * .18);
          }, { passive: true });

          el.addEventListener('pointerleave', () => {
            rect = null;
            xTo(0);
            yTo(0);
          }, { passive: true });
        });

        ScrollTrigger.refresh();
      },


      splitTextForGsap(element) {
        if (!element || element.dataset.gsapTextSplit === '1') {
          return element ? Array.from(element.querySelectorAll('.gsap-word')) : [];
        }

        element.dataset.gsapTextSplit = '1';
        element.classList.add('gsap-text-heading');

        const walker = document.createTreeWalker(
          element,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode(node) {
              if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
              if (node.parentElement && node.parentElement.closest('.gsap-word-wrap')) return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        textNodes.forEach((textNode) => {
          const parts = textNode.nodeValue.split(/(\s+)/);
          const frag = document.createDocumentFragment();

          parts.forEach((part) => {
            if (!part) return;

            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              return;
            }

            const wrap = document.createElement('span');
            wrap.className = 'gsap-word-wrap';

            const inner = document.createElement('span');
            inner.className = 'gsap-word';
            inner.textContent = part;

            wrap.appendChild(inner);
            frag.appendChild(wrap);
          });

          textNode.parentNode.replaceChild(frag, textNode);
        });

        return Array.from(element.querySelectorAll('.gsap-word'));
      },

      initGsapTextReveals() {
        if (!window.gsap || !window.ScrollTrigger) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const touchLayout = window.matchMedia('(pointer: coarse), (hover: none), (max-width: 720px)').matches;
        const hero = document.querySelector('h1.hero-title');
        const headings = Array.from(document.querySelectorAll('h2'));

        /* Keep heading animation ownership in GSAP. A parent reveal class
           must never leave an H1/H2 hidden after the loader completes. */
        [hero, ...headings].filter(Boolean).forEach((heading) => {
          heading.style.visibility = 'visible';
        });

        if (reduce || touchLayout || document.documentElement.classList.contains('low-motion')) {
          [hero, ...headings].filter(Boolean).forEach((heading) => {
            this.splitTextForGsap(heading);
            gsap.set(heading.querySelectorAll('.gsap-word'), {
              autoAlpha: 1,
              yPercent: 0,
              x: 0,
              rotateX: 0,
              rotateZ: 0,
              filter: 'blur(0px)'
            });
          });
          return;
        }

        /* Hero H1: premium word reveal after the loader. */
        if (hero) {
          const heroWords = this.splitTextForGsap(hero);

          gsap.set(heroWords, {
            autoAlpha: 0,
            yPercent: 115,
            rotateX: -38,
            filter: 'blur(9px)',
            transformOrigin: '50% 100%'
          });

          const heroTl = gsap.timeline({ delay: .18 });

          heroTl
            .to(heroWords, {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              duration: .82,
              stagger: {
                each: .055,
                from: 'start'
              },
              ease: 'power4.out'
            })
            .fromTo(
              hero.querySelectorAll('.accent-line .gsap-word'),
              { color: 'rgba(159,155,148,.28)' },
              {
                color: 'var(--muted)',
                duration: .55,
                stagger: .035,
                ease: 'power2.out'
              },
              '-=.52'
            );

          heroTl.set(heroWords, {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            filter: 'blur(0px)'
          });

          /* As the hero leaves, the H1 subtly folds/fades with scroll.
             Scrub makes the motion perfectly reversible when scrolling up. */
          if (window.matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
            gsap.to(heroWords, {
              yPercent: -22,
              autoAlpha: .05,
              rotateX: 16,
              stagger: {
                each: .018,
                from: 'start'
              },
              ease: 'none',
              scrollTrigger: {
                trigger: '.hero',
                start: '38% top',
                end: 'bottom 20%',
                scrub: .8
              }
            });
          }
        }

        /* Every H2: reveal word-by-word on entry, reverse on exit,
           and repeat in either scroll direction. */
        headings.forEach((heading, index) => {
          if (heading.dataset.gsapTextAnimationBound === '1') return;
          heading.dataset.gsapTextAnimationBound = '1';

          const words = this.splitTextForGsap(heading);
          if (!words.length) return;

          const fromX = index % 2 === 0 ? -12 : 12;

          const tl = gsap.timeline({ paused: true })
            .fromTo(
              words,
              {
                autoAlpha: 0,
                yPercent: 118,
                x: fromX,
                rotateX: -34,
                rotateZ: index % 2 === 0 ? -1.25 : 1.25,
                filter: 'blur(8px)',
                transformOrigin: '50% 100%'
              },
              {
                autoAlpha: 1,
                yPercent: 0,
                x: 0,
                rotateX: 0,
                rotateZ: 0,
                filter: 'blur(0px)',
                duration: .72,
                stagger: {
                  each: .045,
                  from: 'start'
                },
                ease: 'power4.out'
              }
            );

          ScrollTrigger.create({
            trigger: heading,
            start: 'top 92%',
            end: 'bottom top',
            animation: tl,
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
            fastScrollEnd: true
          });
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      },

      initCursor() {
        if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

        const shell = document.querySelector('.cursor-shell');
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        const label = document.querySelector('.cursor-label');

        if (!shell || !dot || !ring || !label) return;
        if (window.__PORTFOLIO_CURSOR_LOOP__) return;

        shell.classList.add('cursor-ready');

        let mouseX = window.innerWidth * .5;
        let mouseY = window.innerHeight * .5;
        let dotX = mouseX;
        let dotY = mouseY;
        let ringX = mouseX;
        let ringY = mouseY;
        let rafId = 0;
        let running = true;

        /*
         * Direct transform writes are cheaper than creating a GSAP tween
         * for every pointermove. The ring still eases behind the pointer,
         * but all of it happens inside one animation frame loop.
         */
        const render = () => {
          if (!running) return;

          dotX += (mouseX - dotX) * .72;
          dotY += (mouseY - dotY) * .72;
          ringX += (mouseX - ringX) * .28;
          ringY += (mouseY - ringY) * .28;

          dot.style.transform = `translate3d(${dotX}px,${dotY}px,0) translate(-50%,-50%)`;
          ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) translate(-50%,-50%)`;

          rafId = requestAnimationFrame(render);
        };

        const onMove = (event) => {
          mouseX = event.clientX;
          mouseY = event.clientY;
          shell.classList.add('cursor-ready');

          /*
           * Update the soft background spotlight at a lower cost:
           * CSS variables only, no animation tween creation.
           */
          document.documentElement.style.setProperty('--mx', `${(mouseX / window.innerWidth) * 100}%`);
          document.documentElement.style.setProperty('--my', `${(mouseY / window.innerHeight) * 100}%`);
        };

        const onDown = () => {
          ring.classList.add('cursor-pressed');
        };

        const onUp = () => {
          ring.classList.remove('cursor-pressed');
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });

        render();

        window.__PORTFOLIO_CURSOR_LOOP__ = {
          stop() {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
          }
        };

        this.bindCursorTargets();
      },


      bindCursorTargets() {
        const shell = document.querySelector('.cursor-shell');
        const label = document.querySelector('.cursor-label');

        if (!shell || !label) return;

        document.querySelectorAll('[data-cursor]').forEach((el) => {
          if (el.dataset.cursorBound === '1') return;
          el.dataset.cursorBound = '1';

          el.addEventListener('pointerenter', () => {
            label.textContent = el.dataset.cursor || '';
            shell.classList.add('is-active');
          });

          el.addEventListener('pointerleave', () => {
            shell.classList.remove('is-active');
          });
        });

        document.querySelectorAll('p,h1,h2,h3,li').forEach((el) => {
          if (el.dataset.textCursorBound === '1') return;
          el.dataset.textCursorBound = '1';

          el.addEventListener('pointerenter', () => {
            shell.classList.add('is-text');
          });

          el.addEventListener('pointerleave', () => {
            shell.classList.remove('is-text');
          });
        });
      },

      initCodePanel() {
        if (!window.gsap) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const panel = document.querySelector('.hero-code-panel');
        const shell = document.getElementById('editor-shell');
        const lines = gsap.utils.toArray('.code-line');
        const marker = document.querySelector('.active-line-marker');
        const command = document.querySelector('.terminal-command');
        const outputs = gsap.utils.toArray('.terminal-output');

        if (!panel || !shell || !lines.length) return;

        /* Code writes itself on load. */
        gsap.timeline({ delay: .32 })
          .fromTo(
            lines,
            {
              autoAlpha: 0,
              x: -12,
              clipPath: 'inset(0 100% 0 0)'
            },
            {
              autoAlpha: 1,
              x: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: .28,
              stagger: .065,
              ease: 'power2.out'
            }
          )
          .to(
            command,
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: .78,
              ease: 'steps(24)'
            },
            '-=.18'
          )
          .to(
            outputs,
            {
              autoAlpha: 1,
              y: 0,
              duration: .32,
              stagger: .18,
              ease: 'power2.out'
            },
            '+=.15'
          );

        /* The active line continuously moves through the editor,
           like code being executed/debugged. */
        if (marker) {
          const runner = gsap.timeline({ repeat: -1, repeatDelay: .7, delay: 1.45 });

          lines.forEach((line, index) => {
            runner
              .to(marker, {
                autoAlpha: .9,
                y: index * 20,
                duration: .18,
                ease: 'power2.out'
              })
              .to(
                line,
                {
                  color: '#eef2ed',
                  textShadow: '0 0 14px rgba(201,255,74,.18)',
                  duration: .16
                },
                '<'
              )
              .to(
                line,
                {
                  color: '#a7adb5',
                  textShadow: 'none',
                  duration: .24
                },
                '+=.22'
              );
          });

          runner.to(marker, { autoAlpha: 0, duration: .25 });
        }

        /* Floating build-status badges. */
        gsap.to('.badge-top', {
          y: -8,
          rotate: 1.5,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to('.badge-bottom', {
          y: 9,
          rotate: -1.8,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        /* Mouse movement gives the entire editor a restrained 3D tilt. */
        gsap.set(shell, { transformPerspective: 1200 });

        const shellRy = gsap.quickTo(shell, 'rotateY', { duration: .38, ease: 'power3.out' });
        const shellRx = gsap.quickTo(shell, 'rotateX', { duration: .38, ease: 'power3.out' });
        const shellX = gsap.quickTo(shell, 'x', { duration: .38, ease: 'power3.out' });
        const shellY = gsap.quickTo(shell, 'y', { duration: .38, ease: 'power3.out' });

        const badgeTop = document.querySelector('.badge-top');
        const badgeBottom = document.querySelector('.badge-bottom');

        const badgeTopX = badgeTop ? gsap.quickTo(badgeTop, 'x', { duration: .38, ease: 'power3.out' }) : null;
        const badgeTopY = badgeTop ? gsap.quickTo(badgeTop, 'y', { duration: .38, ease: 'power3.out' }) : null;
        const badgeBottomX = badgeBottom ? gsap.quickTo(badgeBottom, 'x', { duration: .38, ease: 'power3.out' }) : null;
        const badgeBottomY = badgeBottom ? gsap.quickTo(badgeBottom, 'y', { duration: .38, ease: 'power3.out' }) : null;

        let panelRect = null;

        panel.addEventListener('pointerenter', () => {
          panelRect = panel.getBoundingClientRect();
        }, { passive: true });

        panel.addEventListener('pointermove', (event) => {
          if (!panelRect) panelRect = panel.getBoundingClientRect();

          const px = (event.clientX - panelRect.left) / panelRect.width - .5;
          const py = (event.clientY - panelRect.top) / panelRect.height - .5;

          shellRy(px * 5.5);
          shellRx(-py * 5.5);
          shellX(px * 5);
          shellY(py * 4);

          if (badgeTopX && badgeTopY) {
            badgeTopX(px * 16);
            badgeTopY(py * 10 - 8);
          }

          if (badgeBottomX && badgeBottomY) {
            badgeBottomX(-px * 13);
            badgeBottomY(-py * 8 + 9);
          }
        }, { passive: true });

        panel.addEventListener('pointerleave', () => {
          panelRect = null;
          shellRy(0);
          shellRx(0);
          shellX(0);
          shellY(0);

          if (badgeTopX && badgeTopY) {
            badgeTopX(0);
            badgeTopY(-8);
          }

          if (badgeBottomX && badgeBottomY) {
            badgeBottomX(0);
            badgeBottomY(9);
          }
        }, { passive: true });
      },


      bindTilt() {
        if (!window.gsap) return;
        if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
        if (document.documentElement.classList.contains('low-motion')) return;

        document.querySelectorAll('.tilt-card').forEach((card) => {
          if (card.dataset.tiltBound === '1') return;
          card.dataset.tiltBound = '1';

          const rotateYTo = gsap.quickTo(card, 'rotateY', {
            duration: .28,
            ease: 'power2.out'
          });

          const rotateXTo = gsap.quickTo(card, 'rotateX', {
            duration: .28,
            ease: 'power2.out'
          });

          let rect = null;

          gsap.set(card, {
            transformPerspective: 900,
            transformOrigin: 'center'
          });

          card.addEventListener('pointerenter', () => {
            rect = card.getBoundingClientRect();
          }, { passive: true });

          card.addEventListener('pointermove', (event) => {
            if (!rect) rect = card.getBoundingClientRect();

            const px = (event.clientX - rect.left) / rect.width - .5;
            const py = (event.clientY - rect.top) / rect.height - .5;

            rotateYTo(px * 7);
            rotateXTo(-py * 7);
          }, { passive: true });

          card.addEventListener('pointerleave', () => {
            rect = null;
            rotateYTo(0);
            rotateXTo(0);
          }, { passive: true });
        });
      }
    }
  }).mount('#app');
})();
