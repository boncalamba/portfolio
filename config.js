/**
 * HEADLESS WORDPRESS CONFIGURATION
 * 1. Install and activate the included WordPress plugin and ACF Free.
 * 2. Import starter content from Tools > Bon Portfolio.
 * 3. Replace the empty wordpressUrl below with your WordPress homepage URL.
 *    Example: 'https://cms.example.com' (no /wp-json suffix).
 * 4. Upload this frontend/ folder to GitHub Pages, Netlify, Cloudflare Pages,
 *    Hostinger static hosting, or any HTTPS-enabled static web server.
 *
 * When wordpressUrl is empty, the complete bundled portfolio still works.
 * If your CMS is temporarily unreachable, the bundled content is used instead.
 */
window.BON_CONFIG = Object.freeze({
  wordpressUrl: '',
  requestTimeoutMs: 7000,
  debug: false
});
