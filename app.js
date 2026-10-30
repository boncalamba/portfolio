/** Bon Jun Calamba — headless WordPress portfolio frontend.
 * Vanilla JS. No framework or build process. Public GET endpoint only.
 */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const state = { data: window.BON_FALLBACK, filter: 'featured', cmsStatus: 'bundled' };
  const config = window.BON_CONFIG || { wordpressUrl: '' };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const appYear = new Date().getFullYear();
  const slug = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const text = (value) => String(value == null ? '' : value);
  const node = (tag, className, content) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content !== undefined) el.textContent = text(content);
    return el;
  };
  const safeUrl = (value, fallback = '') => {
    if (!value || typeof value !== 'string') return fallback;
    try {
      const u = new URL(value, document.baseURI);
      return ['https:', 'http:', 'mailto:'].includes(u.protocol) || (u.protocol === 'file:' && !value.includes(':')) ? u.href : fallback;
    } catch { return fallback; }
  };
  const asList = (value) => Array.isArray(value) ? value.filter(Boolean).map(text) : typeof value === 'string' ? value.split(/[\n,]+/).map(v => v.trim()).filter(Boolean) : [];
  const sortByOrder = (arr) => [...arr].sort((a, b) => (Number(a.order) || 999) - (Number(b.order) || 999));

  function hydrateProfile(profile) {
    if (!profile) return;
    $$('[data-field]').forEach(el => {
      const field = el.dataset.field;
      if (profile[field] !== null && profile[field] !== undefined && profile[field] !== '') el.textContent = text(profile[field]);
    });
    const title = $('#hero-title');
    if (profile.name) title.setAttribute('aria-label', text(profile.name));
    if (profile.hero_line_1 || profile.hero_line_2) {
      const top = $('.hero-title-row', title);
      const bottom = $('.title-gradient', title);
      if (profile.hero_line_1 && top.firstChild) top.firstChild.nodeValue = text(profile.hero_line_1);
      if (profile.hero_line_2 && bottom.firstChild) bottom.firstChild.nodeValue = text(profile.hero_line_2);
    }
    if (profile.contact_title) {
      const words = text(profile.contact_title).trim().split(/\s+/);
      const upper = words.slice(0, Math.min(2, words.length)).join(' ');
      const lower = words.slice(Math.min(2, words.length)).join(' ');
      const h = $('#contact-title');
      h.replaceChildren(document.createTextNode(upper), document.createElement('br'));
      h.append(node('span', '', lower || 'LET’S TALK.'));
    }
    const pic = safeUrl(profile.portrait_url);
    if (pic) $('#portrait').src = pic;
    const resume = safeUrl(profile.resume_url);
    if (resume) $$('[data-link="resume_url"]').forEach(a => a.href = resume);
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email || '') ? profile.email : 'bonjun.calamba@gmail.com';
    $('#email-cta').href = 'mailto:' + email;
    $('#footer-email').href = 'mailto:' + email;
    $('#footer-email').textContent = email;
    for (const [name, target] of [['linkedin', '#contact-linkedin'], ['whatsapp', '#contact-whatsapp'], ['github', '#contact-github']]) {
      const href = safeUrl(profile[name]);
      if (href) $(target).href = href;
    }
    const tags = asList(profile.hero_specialties);
    if (tags.length) {
      const ticker = $('#hero-specialties');
      ticker.replaceChildren();
      tags.forEach((tag, i) => {
        if (i) ticker.append(node('span', 'tick-star', '✳'));
        ticker.append(node('span', '', tag.toUpperCase()));
      });
    }
    if (profile.role) document.title = profile.name + ' — ' + profile.role;
    const meta = $('meta[name="description"]');
    if (meta && profile.intro) meta.content = text(profile.intro).slice(0, 155);
  }

  function getProjects() {
    const items = sortByOrder(state.data.projects || []);
    const f = state.filter;
    if (f === 'featured') {
      const featured = items.filter(p => p.featured);
      return featured.length ? featured : items.slice(0, 6);
    }
    if (f === 'build') return items.filter(p => /build from scratch|new build/i.test(p.work_type || p.category || ''));
    if (f === 'maintenance') return items.filter(p => /maintenance|changes/i.test(p.work_type || p.category || ''));
    if (f === 'ecommerce') return items.filter(p => /commerce|woo|shopify|store/i.test([p.category, p.work_type, ...asList(p.technologies)].join(' ')));
    return items;
  }

  function projectCard(project, index) {
    const article = node('article', 'project');
    article.dataset.reveal = '';
    const link = node('a', 'project-link');
    link.href = safeUrl(project.url, '#contact');
    if (safeUrl(project.url)) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    link.setAttribute('aria-label', 'View ' + text(project.title) + ' project website');
    const media = node('div', 'project-media');
    const image = node('img');
    image.src = safeUrl(project.image) || fallbackProjectImage(project);
    image.alt = text(project.title) + ' website preview';
    image.loading = index > 2 ? 'lazy' : 'eager';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      const fallback = fallbackProjectImage(project);
      if (fallback && image.dataset.fallbackUsed !== 'true') {
        image.dataset.fallbackUsed = 'true'; image.src = fallback;
      } else { image.remove(); media.classList.add('image-failed'); }
    }, { once: true });
    media.append(image, node('span', 'media-label', project.featured ? 'FEATURED / ' + String(index + 1).padStart(2, '0') : 'WORK / ' + String(index + 1).padStart(2, '0')), node('span', 'media-arrow', '↗'));
    const details = node('div', 'project-details');
    details.append(node('h3', '', project.title), node('span', 'project-index', String(index + 1).padStart(2, '0') + ' / ' + String((state.data.projects || []).length).padStart(2, '0')));
    const category = node('p', 'project-category', project.category || project.work_type || 'Web development');
    const desc = node('p', 'project-description', project.description || 'Website development and digital experience.');
    const tech = node('ul', 'project-tags');
    asList(project.technologies).slice(0, 4).forEach(t => tech.append(node('li', '', t)));
    link.append(media, details, category, desc, tech);
    article.append(link);
    return article;
  }

  function fallbackProjectImage(project) {
    const existing = (window.BON_FALLBACK?.projects || []).find(p => p.id === project.id || slug(p.title) === slug(project.title));
    return existing?.image || 'assets/og-card.svg';
  }

  function renderProjects() {
    const projects = getProjects();
    const grid = $('#project-grid');
    const fragment = document.createDocumentFragment();
    projects.forEach((p, i) => fragment.append(projectCard(p, i)));
    if (!projects.length) fragment.append(node('p', 'loading-data', 'No projects in this category yet.'));
    grid.replaceChildren(fragment);
    const total = (state.data.projects || []).length;
    $('#work-count').textContent = String(projects.length).padStart(2, '0') + ' / ' + String(total).padStart(2, '0') + ' PROJECTS';
    const featuredButton = $('[data-filter="featured"]');
    featuredButton.querySelector('span').textContent = String((state.data.projects || []).filter(p => p.featured).length || 6).padStart(2, '0');
    $('#view-all').classList.toggle('is-hidden', state.filter === 'all');
    $('#view-all').textContent = 'VIEW ALL ' + total + ' PROJECTS ↗';
    revealObserverObserve(grid);
  }

  function renderCapabilities() {
    const grid = $('#capability-grid');
    const fragment = document.createDocumentFragment();
    sortByOrder(state.data.capabilities || []).forEach((item, i) => {
      const c = node('article', 'capability-card');
      c.append(node('span', 'capability-num', 'CAPABILITY_' + String(i + 1).padStart(2, '0')),
        node('h3', '', item.title), node('p', '', item.description));
      const list = node('ul', 'tool-list');
      asList(item.tools).slice(0, 5).forEach(t => list.append(node('li', '', t)));
      c.append(list); fragment.append(c);
    });
    grid.replaceChildren(fragment);
  }

  function renderTimeline() {
    const container = $('#timeline');
    const fragment = document.createDocumentFragment();
    const progress = node('div', 'timeline-line'); progress.id = 'timeline-line';
    fragment.append(progress);
    sortByOrder(state.data.experience || []).forEach(item => {
      const row = node('article', 'timeline-entry'); row.dataset.reveal = '';
      const left = node('div', 'timeline-left');
      left.append(node('span', 'timeline-period', item.period), node('strong', 'timeline-company', item.company));
      const right = node('div', 'timeline-right');
      right.append(node('h3', '', item.title), node('p', '', item.description), node('span', 'timeline-location', item.location));
      row.append(left, right); fragment.append(row);
    });
    container.replaceChildren(fragment);
    revealObserverObserve(container);
  }

  function applyData(data, fromCms = false) {
    if (!data || !data.profile || !Array.isArray(data.projects)) throw new Error('Invalid portfolio payload');
    state.data = data; state.cmsStatus = fromCms ? 'connected' : 'bundled';
    document.documentElement.dataset.cms = state.cmsStatus;
    hydrateProfile(data.profile);
    renderProjects(); renderCapabilities(); renderTimeline();
    setTimeout(updateScroll, 40);
    if (config.debug) console.info('[Bon Portfolio]', fromCms ? 'WordPress CMS connected' : 'using bundled content');
  }

  async function connectWordPress() {
    const site = text(config.wordpressUrl).trim().replace(/\/+$/, '');
    if (!site) return;
    const url = safeUrl(site);
    if (!url || !/^https?:/.test(new URL(url).protocol)) { console.warn('Invalid WordPress URL'); return; }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), Number(config.requestTimeoutMs) || 7000);
    try {
      const res = await fetch(url + '/wp-json/bon/v1/portfolio', { mode: 'cors', credentials: 'omit', headers: { Accept: 'application/json' }, signal: controller.signal });
      if (!res.ok) throw new Error('WordPress API responded with HTTP ' + res.status);
      const payload = await res.json();
      applyData(payload, true);
    } catch (error) {
      console.warn('[Bon Portfolio] CMS unavailable; using bundled content.', error.message);
      document.documentElement.dataset.cms = 'offline-fallback';
    } finally { clearTimeout(timeout); }
  }

  // Reveal animation observer. Elements remain visible for reduced-motion users.
  const revealObserver = !reduceMotion && 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); revealObserver.unobserve(entry.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -35px 0px' }) : null;
  function revealObserverObserve(root = document) {
    $$('[data-reveal]', root).forEach(el => {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add('is-revealed');
    });
  }

  function initMenu() {
    const toggle = $('#menu-button'); const menu = $('#mobile-nav');
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
      menu.inert = !open;
      document.body.classList.toggle('menu-open', open);
      if (open) $('.mobile-nav-links a', menu).focus(); else toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false); });
    matchMedia('(min-width: 1021px)').addEventListener('change', event => { if (event.matches && toggle.getAttribute('aria-expanded') === 'true') setOpen(false); });
  }

  function initFilters() {
    $('#filters').addEventListener('click', e => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      state.filter = btn.dataset.filter;
      $$('button[data-filter]').forEach(b => { const active = b === btn; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
      renderProjects();
    });
    $('#view-all').addEventListener('click', () => {
      const all = $('[data-filter="all"]'); all.click();
      $('#project-grid').scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
    });
  }

  let scrollQueued = false;
  function updateScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    $('#site-progress').style.transform = 'scaleX(' + Math.max(0, Math.min(1, scrollY / max)) + ')';
    const timeline = $('#timeline'); const line = $('#timeline-line');
    if (timeline && line) {
      const bb = timeline.getBoundingClientRect();
      const length = Math.max(0, Math.min(bb.height, innerHeight * .5 - bb.top));
      line.style.height = length + 'px';
    }
    scrollQueued = false;
  }
  function onScroll() { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }

  function initMotion() {
    if (reduceMotion || matchMedia('(hover: none)').matches) return;
    const glow = $('#pointer-glow'); const portrait = $('#portrait');
    let x = innerWidth / 2, y = innerHeight / 2, gx = x, gy = y, px = 0, py = 0;
    window.addEventListener('pointermove', (event) => {
      x = event.clientX; y = event.clientY;
      glow.style.opacity = '1';
      px = (x / innerWidth - .5) * 16;
      py = (y / innerHeight - .5) * 10;
    }, { passive: true });
    window.addEventListener('pointerleave', () => glow.style.opacity = '0');
    let last = 0;
    const tick = (t) => {
      if (t - last > 16) {
        last = t; gx += (x - gx) * .09; gy += (y - gy) * .09;
        glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
        const heroVisible = scrollY < innerHeight * 1.3;
        if (heroVisible) portrait.style.transform = 'translate3d(' + (px * .3).toFixed(2) + 'px,' + (py * .3).toFixed(2) + 'px,0)';
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function initContours() {
    const canvas = $('#contours'); const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let width = 0, height = 0, inView = true, last = 0;
    const resize = () => {
      width = Math.max(1, canvas.clientWidth); height = Math.max(1, canvas.clientHeight);
      const dpr = Math.min(devicePixelRatio || 1, 1.4);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); window.addEventListener('resize', resize, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => inView = entries[0]?.isIntersecting ?? false, { rootMargin: '200px' }).observe(canvas);
    // Hand-drawn topographical contour field. The drawing has a fixed frame rate,
    // is paused when offscreen and honors prefers-reduced-motion.
    const draw = (time = 0) => {
      if (!inView || document.hidden) return;
      const step = width < 680 ? 27 : 29;
      const nx = Math.ceil(width / step) + 1, ny = Math.ceil(height / step) + 1;
      const field = new Float32Array(nx * ny);
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const u = i / nx * 6.3, v = j / ny * 5.7;
        field[j * nx + i] = Math.sin(u * 1.1 + time * .22) * .7 + Math.cos(v * 1.25 - time * .18) * .52 + Math.sin((u + v) * .9 + Math.cos(u * .6) + time * .1) * .6;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = .75;
      ctx.strokeStyle = 'rgba(255,170,53,.26)';
      for (let level = -1.6; level <= 1.6; level += .17) {
        ctx.beginPath();
        for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
          const a = field[j * nx + i], b = field[j * nx + i + 1], c = field[(j + 1) * nx + i + 1], d = field[(j + 1) * nx + i];
          const edges = []; const cross = (v1, v2, x1, y1, x2, y2) => { if ((v1 < level) !== (v2 < level)) { const k = (level - v1) / (v2 - v1); edges.push([x1 + (x2 - x1) * k, y1 + (y2 - y1) * k]); } };
          const x = i * step, y = j * step;
          cross(a,b,x,y,x+step,y);cross(b,c,x+step,y,x+step,y+step);cross(c,d,x+step,y+step,x,y+step);cross(d,a,x,y+step,x,y);
          if (edges.length >= 2) { ctx.moveTo(...edges[0]); ctx.lineTo(...edges[1]); }
          if (edges.length === 4) { ctx.moveTo(...edges[2]);ctx.lineTo(...edges[3]); }
        }
        ctx.stroke();
      }
    };
    if (reduceMotion) { draw(0); return; }
    function tick(ms) { if (ms - last > 90) { last = ms; draw(ms / 1000); } requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }

  function boot() {
    $('#year').textContent = appYear;
    applyData(window.BON_FALLBACK);
    initMenu(); initFilters(); initMotion(); initContours();
    revealObserverObserve();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScroll();
    const loader = $('#boot'); $('#boot-bar').style.width = '100%';
    setTimeout(() => loader.classList.add('is-done'), reduceMotion ? 40 : 450);
    connectWordPress();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
