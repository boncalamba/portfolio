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
        filters: ['All', 'Build from Scratch', 'Website Changes and Maintenance', 'WordPress', 'E-commerce'],
        projects: [
          {
            name: "Whitestone Australia",
            short: "WA",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://whitestoneaustralia.com.au/",
            description: "Australian property development and project management company showcasing residential, childcare, disability and mixed-use developments.",
            tags: ["WordPress", "Elementor/Custom Front-e", "JavaScript/Swiper"],
            tone: 1,
            image: "assets/portfolio/whitestoneaustralia.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Sadek Group",
            short: "SG",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://sadekgroup.com.au/",
            description: "Sydney concrete pumping and placement company serving residential and commercial projects, with equipment, services and project galleries.",
            tags: ["WordPress", "Elementor", "CSS/JS"],
            tone: 2,
            image: "assets/portfolio/sadekgroup.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Little Blossom",
            short: "LB",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://littleblossom.net.au/",
            description: "Early learning and childcare website for Little Blossom Early Learning in Glenorie, NSW.",
            tags: ["WordPress", "Elementor", "Responsive"],
            tone: 3,
            image: "assets/portfolio/littleblossom.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Phenyx",
            short: "PHE",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress", "Marketing"],
            url: "https://phenyx.com.au/",
            description: "Australian digital growth studio promoting Google Ads, Meta Ads, SEO and conversion-focused website services.",
            tags: ["WordPress", "Custom Front-end", "JavaScript/GSAP"],
            tone: 4,
            image: "assets/portfolio/phenyx.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Grand Reve",
            short: "GR",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://grandreve.com.au/",
            description: "Property development website for the Grand Rêve residential apartment project in Castle Hill, with residences, news and project information.",
            tags: ["WordPress", "Elementor/Custom Front-e", "responsive media"],
            tone: 5,
            image: "assets/portfolio/grandreve.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Elite",
            short: "ELI",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://elite.com.au/",
            description: "Australia-wide cleaning, restoration and maintenance services website covering carpet cleaning, mould, water and fire restoration.",
            tags: ["WordPress/custom CMS fro", "custom JavaScript"],
            tone: 6,
            image: "assets/portfolio/elite.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Elite Test & Tag",
            short: "ETT",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://elitetestandtag.com.au/",
            description: "Electrical test-and-tag service website for workplace electrical safety, compliance and related commercial services.",
            tags: ["WordPress", "Elementor/Custom Front-e"],
            tone: 1,
            image: "assets/portfolio/elitetestandtag.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Westmix",
            short: "WES",
            category: "Changes & maintenance · Shopify",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "E-commerce"],
            url: "https://westmix.com.au/",
            description: "Australian construction and trade equipment brand website featuring mixers, wheelbarrows and related product ranges.",
            tags: ["Shopify", "Liquid theme", "JavaScript"],
            tone: 3,
            image: "assets/portfolio/westmix.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Bayside Pools",
            short: "BP",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://baysidepools.com.au/",
            description: "Swimming pool design, construction and service website focused on residential pool projects and customer enquiries.",
            tags: ["WordPress", "Elementor", "CSS/JS"],
            tone: 4,
            image: "assets/portfolio/baysidepools.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Kin Property",
            short: "KP",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://kinproperty.com.au/",
            description: "Property settlement and defect-management website supporting Australian developers, builders and off-the-plan purchasers.",
            tags: ["WordPress", "custom theme/plugins", "project filtering"],
            tone: 5,
            image: "assets/portfolio/kinproperty.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "South Melbourne Glass",
            short: "SMG",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "Marketing"],
            url: "https://southmelbourneglass.com.au/",
            description: "Melbourne glazing company website promoting commercial glazing, glass replacement, mirrors, splashbacks, showers and balustrades.",
            tags: ["WordPress", "Page Builder", "Forms"],
            tone: 6,
            image: "assets/portfolio/southmelbourneglass.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Tuscan Path",
            short: "TP",
            category: "Changes & maintenance · Shopify",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "E-commerce"],
            url: "https://tuscanpath.com.au/",
            description: "Outdoor living and garden products catalogue for pots, pavers, pebbles, edging, screens and landscaping inspiration.",
            tags: ["Shopify", "Liquid theme", "JavaScript"],
            tone: 1,
            image: "assets/portfolio/tuscanpath.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Epping Secondary College",
            short: "ESC",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://eppingsc.vic.edu.au/",
            description: "Victorian secondary school website containing enrolment, curriculum, student resources, forms, policies and college information.",
            tags: ["WordPress", "custom theme/page templa", "document management"],
            tone: 3,
            image: "assets/portfolio/eppingsc.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Goulburn Australia",
            short: "GA",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://goulburnaustralia.com.au/",
            description: "Destination and regional tourism website for Goulburn, NSW featuring events, attractions, guides, lifestyle and visitor information.",
            tags: ["WordPress", "custom theme", "WP_Query"],
            tone: 4,
            image: "assets/portfolio/goulburnaustralia.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Nylex",
            short: "NYL",
            category: "Changes & maintenance · Shopify",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "E-commerce"],
            url: "https://nylex.com.au/",
            description: "Australian garden watering brand website showcasing hoses, hose storage, sprayers, watering accessories and advice.",
            tags: ["Shopify", "Liquid theme", "JavaScript"],
            tone: 5,
            image: "assets/portfolio/nylex.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Truckers Toy Store",
            short: "TTS",
            category: "Changes & maintenance · WooCommerce",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "E-commerce"],
            url: "https://truckerstoystore.com.au/",
            description: "Australian ecommerce store selling truck parts and accessories with online ordering, finance options, account features and product support.",
            tags: ["WordPress", "WooCommerce", "custom ecommerce front-e"],
            tone: 1,
            image: "assets/portfolio/truckerstoystore.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Skyon Group",
            short: "SG",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://www.skyongroup.com/",
            description: "Corporate services website presenting the Skyon Group brand, services, projects and business information.",
            tags: ["WordPress", "Elementor/Custom Front-e"],
            tone: 2,
            image: "assets/portfolio/skyongroup.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Chris Kille",
            short: "CK",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress", "Marketing"],
            url: "https://chriskille.com/",
            description: "Personal brand and business website for entrepreneur Chris Kille, featuring services, content and conversion-focused calls to action.",
            tags: ["WordPress", "Elementor", "CSS/JS"],
            tone: 3,
            image: "assets/portfolio/chriskille.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Healthy ZZZs",
            short: "HZ",
            category: "Changes & maintenance · WooCommerce",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "E-commerce", "Marketing"],
            url: "https://shophealthyzzzs.com/",
            description: "Mattress and sleep-products ecommerce website with product catalogues, promotional content and online shopping.",
            tags: ["WordPress", "WooCommerce", "Elementor"],
            tone: 4,
            image: "assets/portfolio/shophealthyzzzs.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Mattress Superstore",
            short: "MS",
            category: "Changes & maintenance · WooCommerce",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "E-commerce", "Marketing"],
            url: "https://mattress-superstore.com/",
            description: "Mattress retail ecommerce website featuring mattress brands, product pages, promotions and local-store shopping information.",
            tags: ["WordPress", "WooCommerce", "Elementor"],
            tone: 5,
            image: "assets/portfolio/mattress-superstore.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Midwest Mattress Company",
            short: "MMC",
            category: "Changes & maintenance · WooCommerce",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "E-commerce", "Marketing"],
            url: "https://midwestmattresscompany.com/",
            description: "Regional mattress retailer website with ecommerce catalogue, mattress collections, promotions and store-focused content.",
            tags: ["WordPress", "WooCommerce", "Elementor"],
            tone: 6,
            image: "assets/portfolio/midwestmattresscompany.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Jacksonville Bedding",
            short: "JB",
            category: "Changes & maintenance · WooCommerce",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "E-commerce"],
            url: "https://jacksonvillebedding.com/",
            description: "Mattress and bedding retailer website with product catalogue, sleep products, promotions and local customer information.",
            tags: ["WordPress", "WooCommerce", "Elementor"],
            tone: 1,
            image: "assets/portfolio/jacksonvillebedding.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Sleeptronic",
            short: "SLE",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://sleeptronic.com/",
            description: "American mattress manufacturer website showcasing product lines, mattress technologies, retailer information and sleep education.",
            tags: ["WordPress", "ACF Pro", "Custom PHP"],
            tone: 2,
            image: "assets/portfolio/sleeptronic.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Golden Isles Mattress",
            short: "GIM",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "E-commerce", "Marketing"],
            url: "https://goldenislesmattress.com/",
            description: "Brunswick, Georgia mattress retailer with ecommerce products, local showroom information, appointments, financing and delivery content.",
            tags: ["WordPress/ecommerce", "GoHighLevel integrations", "Custom Front-end"],
            tone: 3,
            image: "assets/portfolio/goldenislesmattress.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Boise Mattress",
            short: "BM",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "Marketing"],
            url: "https://boisemattress.com/",
            description: "Local mattress retailer website with location-focused landing pages, mattress products and search-optimized store content.",
            tags: ["WordPress", "Elementor", "SEO/location landing pag"],
            tone: 4,
            image: "assets/portfolio/boisemattress.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Juna Sleep",
            short: "JS",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress", "Marketing"],
            url: "https://junasleep.com/",
            description: "Sleep and mattress brand website supporting product marketing, landing pages and campaign assets.",
            tags: ["WordPress", "Elementor", "campaign landing pages"],
            tone: 5,
            image: "assets/portfolio/junasleep.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Origami Design Build",
            short: "ODB",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://origamidesignbuild.com/",
            description: "Bay Area and Sacramento design-build company website for custom homes, ADUs, additions, remodels and commercial improvements.",
            tags: ["WordPress", "Elementor/Page Builder", "Forms"],
            tone: 1,
            image: "assets/portfolio/origamidesignbuild.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Elevate Construction Group",
            short: "ECG",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://elevatebld.com/",
            description: "Northern California construction website focused on window, siding and door replacement, financing, service areas and project leads.",
            tags: ["WordPress", "Elementor/Page Builder", "interactive estimator/Fo"],
            tone: 3,
            image: "assets/portfolio/elevatebld.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Do It Better LLLP",
            short: "DIB",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://doitbetterlllp.com/",
            description: "Chicagoland commercial and semi-truck tire company website covering tire sales, installation, delivery and wholesale supply.",
            tags: ["WordPress", "Page Builder", "Forms"],
            tone: 4,
            image: "assets/portfolio/doitbetterlllp.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Seattle Modern Buildings",
            short: "SMB",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://seattlemodernbuildings.com/",
            description: "Seattle ADU/DADU design-build website featuring feasibility reviews, projects, pricing guidance, permitting and construction services.",
            tags: ["WordPress", "Divi", "Contact Form 7"],
            tone: 5,
            image: "assets/portfolio/seattlemodernbuildings.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Tico's Farm & Cattle",
            short: "TSF",
            category: "Built from scratch · WordPress",
            workType: "Build from Scratch",
            type: ["Build from Scratch", "WordPress"],
            url: "https://ticosfarmandcattle.com/",
            description: "East Texas farm and cattle website showcasing Red Brahman genetics, breeding programs, premium sires and commercial beef operations.",
            tags: ["WordPress", "Page Builder", "Responsive"],
            tone: 2,
            image: "assets/portfolio/ticosfarmandcattle.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Thomas Harris / Harris Team",
            short: "THH",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://harristeam.co/",
            description: "Professional/team website used for brand positioning, services, lead generation and client-facing information.",
            tags: ["WordPress", "Page Builder", "Forms"],
            tone: 3,
            image: "assets/portfolio/harristeam.webp",
            imageLoaded: false,
            imageFailed: false
          },
          {
            name: "Forbidden Well",
            short: "FW",
            category: "Changes & maintenance · WordPress",
            workType: "Website Changes and Maintenance",
            type: ["Website Changes and Maintenance", "WordPress"],
            url: "https://forbiddenwell.com/",
            description: "New York luxury medical spa and wellness website for IV therapy, aesthetics, recovery and optimization services.",
            tags: ["WordPress", "Elementor/Page Builder", "Booking / Forms"],
            tone: 4,
            image: "assets/portfolio/forbiddenwell.webp",
            imageLoaded: false,
            imageFailed: false
          }
        ],
        capabilities: [
          {
            title: 'WordPress Engineering',
            description: 'End-to-end WordPress delivery covering production builds, custom functionality, content architecture, e-commerce, and long-term maintenance.',
            items: ['WooCommerce', 'Elementor Pro', 'ACF Pro / CPT', 'Themes & plugins']
          },
          {
            title: 'Front-End Development',
            description: 'Responsive and mobile-first interfaces built with clean front-end code, reusable components, and interaction that supports usability.',
            items: ['HTML5 / CSS3', 'JavaScript / jQuery', 'Vue.js / AJAX', 'GSAP / Bootstrap']
          },
          {
            title: 'Back-End & Integrations',
            description: 'Practical PHP and data work for custom WordPress behavior, integrations, APIs, webhooks, and production troubleshooting.',
            items: ['PHP / MySQL', 'REST APIs', 'JSON / Webhooks', 'Third-party integrations']
          },
          {
            title: 'SEO & Analytics',
            description: 'Technical and on-page SEO implementation paired with analytics and auditing tools to improve visibility, measurement, and site health.',
            items: ['Technical SEO', 'GA4 / GTM', 'Search Console', 'Semrush / Screaming Frog']
          },
          {
            title: 'Performance & Security',
            description: 'Performance tuning across front-end assets, caching, image delivery, databases, and CDN layers with Core Web Vitals in mind.',
            items: ['PageSpeed', 'WP Rocket', 'Cloudflare / CDN', 'WebP / CSS-JS optimization']
          },
          {
            title: 'Hosting & Infrastructure',
            description: 'Hands-on ownership of the infrastructure around a website, including staging, migrations, domains, SSL, DNS, and email authentication.',
            items: ['Hostinger / WP Engine', 'cPanel / Bluehost', 'DNS / SSL', 'SPF / DKIM / DMARC']
          },
          {
            title: 'CRM & Automation',
            description: 'Lead-generation and marketing integrations connecting websites, funnels, forms, CRMs, and follow-up workflows.',
            items: ['GoHighLevel', 'Make', 'HubSpot / ActiveCampaign', 'Zapier / Webhooks']
          },
          {
            title: 'Development & QA',
            description: 'Reliable release workflows using source control, debugging tools, staging, and cross-browser testing before production handoff.',
            items: ['Git / GitHub', 'VS Code', 'Chrome DevTools', 'FTP / SFTP & QA']
          },
          {
            title: 'Design & Collaboration',
            description: 'Comfortable working from design files and coordinating delivery inside the project-management tools used by distributed teams.',
            items: ['Figma / Photoshop', 'Canva', 'Jira / Asana / Trello', 'Slack / Teams / Notion']
          }
        ],
        experience: [
          {
            period: 'May 2025 — Aug 2026',
            role: 'Web Developer & SEO',
            company: 'First Direct Marketing',
            location: 'United States · Remote',
            summary: 'Built and maintained conversion-focused WordPress websites, landing pages, and GoHighLevel funnels while supporting technical SEO, analytics, CRM workflows, lead generation, and campaign performance.',
            highlights: [
              'Performed on-page and technical SEO updates across metadata, heading structure, internal linking, image optimization, indexability, and service/campaign pages.',
              'Used GA4, Search Console, Rank Math, and PageSpeed Insights to identify SEO, usability, and performance issues and support ongoing optimization.',
              'Built forms, CRM workflows, lead routing, follow-up automation, reusable campaign sections, and custom HTML, CSS, JavaScript, and GSAP interactions; troubleshot front-end, tracking, and integration issues across devices.'
            ]
          },
          {
            period: 'Mar 2024 — Apr 2025',
            role: 'Senior Web Developer',
            company: 'Phenyx',
            location: 'Australia · Remote',
            summary: 'Owned end-to-end development, optimization, and maintenance of client WordPress sites in a fast-paced agency environment.',
            highlights: [
              'Handled Hostinger setup, advanced functionality, compatibility troubleshooting, GSAP interface work, DNS, Cloudflare, and email deliverability.',
              'Ran on-page SEO and site-health work with Rank Math, GA4, and Search Console; used ACF Pro for custom fields and WP Rocket / PageSpeed Insights for performance tuning.',
              'Coordinated multi-client delivery through Trello and consistently worked to production deadlines.'
            ]
          },
          {
            period: 'Feb 2023 — Feb 2024',
            role: 'Web Developer',
            company: 'Oracle NetSuite',
            location: 'United States · Remote',
            summary: 'Published and maintained HTML content and event experiences while collaborating with content, design, and SEO specialists.',
            highlights: [
              'Built and maintained webinar and event pages with registration and confirmation flows.',
              'Maintained sitemap structure and page updates supporting SEO and user navigation.',
              'Troubleshot functionality, compatibility, and performance issues with cross-functional teams.'
            ]
          },
          {
            period: 'Apr 2022 — Sep 2022',
            role: 'Full Stack Web Developer',
            company: 'Elite Carpet Dry Cleaning Pty Ltd',
            location: 'Australia · Remote',
            summary: 'Combined custom WordPress development, responsive redesign work, creative production, documentation, and domain/DNS administration.',
            highlights: [
              'Built a custom WordPress plugin that served dynamic contact details, social links, and chat widgets based on visitor postcode, IP, or GPS location.',
              'Redesigned the homepage and delivered full mobile responsiveness across viewports.',
              'Produced InVision/Photoshop mockups, an animated email signature, internal standards, and nameserver/DNS updates.'
            ]
          },
          {
            period: 'Mar 2020 — Mar 2022',
            role: 'Web Developer → Senior Web Developer',
            company: 'QL PTY LTD',
            location: 'Philippines · Remote',
            summary: 'Owned technical SEO, tracking implementation, hosting migrations, staging, infrastructure, and custom WordPress fixes.',
            highlights: [
              'Managed meta tags, canonicals, robots.txt, sitemaps, GTM, GA/GA4, and goal tracking, including SEO overrides through custom functions.php code.',
              'Migrated sites across hosts, built staging environments, configured SSL/DNS, and managed G Suite email accounts.',
              'Used Screaming Frog for technical site audits and issue tracking.'
            ]
          },
          {
            period: 'Dec 2017 — Dec 2019',
            role: 'Full Stack Web Developer',
            company: 'Blaze Online',
            location: 'Australia · Remote',
            summary: 'Built and prepared WordPress and WooCommerce websites for client handoff, covering development, QA, infrastructure, and analytics setup.',
            highlights: [
              'Built WooCommerce e-commerce and catalog sites using Elementor and custom PHP functionality.',
              'Owned cross-browser, front-end, and back-end QA before client handoff.',
              'Handled backups, staging, domain setup, DNS, and Google Analytics / Webmaster Tools integration.'
            ]
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
          this.initPremiumMotion();
          this.initCursor();
          if (!document.documentElement.classList.contains('low-motion')) {
            this.initCodePanel();
          }

          window.__PORTFOLIO_READY__ = true;

          window.dispatchEvent(
            new CustomEvent('portfolio:ready', {
              detail: { version: '9.0.0' }
            })
          );

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (window.ScrollTrigger) {
                ScrollTrigger.refresh(true);
                ScrollTrigger.update();
              }

              window.dispatchEvent(new Event('resize'));

              console.info('[Portfolio V9] animations started after preloader', {
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

      initPremiumMotion() {
        if (!window.gsap || !window.ScrollTrigger) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (document.documentElement.classList.contains('low-motion')) return;

        gsap.registerPlugin(ScrollTrigger);

        const ease = 'power3.out';
        const premiumTargets = [
          '.section-head',
          '.capability',
          '.cms-card',
          '.timeline-row',
          '.statement-card',
          '.contact-card',
          '.portrait-wrap',
          '.about-points > div'
        ].join(',');

        gsap.timeline({ defaults: { ease }, delay: .04 })
          .fromTo('.site-header', { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: .65 })
          .fromTo('.hero-copy > *',
            { autoAlpha: 0, y: 28, scale: .985 },
            { autoAlpha: 1, y: 0, scale: 1, duration: .78, stagger: .065 },
            '-=.35')
          .fromTo('.hero-code-panel',
            { autoAlpha: 0, y: 38, scale: .965, rotateX: 5 },
            { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: .95, ease: 'power4.out' },
            '-=.68');

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom 25%',
            scrub: .65
          }
        });

        heroTimeline
          .to('.hero-copy', { yPercent: -7, scale: .975, autoAlpha: .28, ease: 'none' }, 0)
          .to('.hero-code-panel', { yPercent: 8, scale: .96, rotateX: -2.5, autoAlpha: .35, ease: 'none', transformPerspective: 1400 }, 0);

        gsap.to('.scroll-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: .18
          }
        });

        gsap.utils.toArray('.project-card').forEach((card, index) => {
          gsap.fromTo(card,
            {
              autoAlpha: 0,
              y: 52,
              scale: .965,
              rotateX: 4,
              transformPerspective: 1200,
              transformOrigin: '50% 100%'
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: .88,
              delay: (index % 3) * .055,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        gsap.utils.toArray(premiumTargets).forEach((el, index) => {
          if (el.closest('.project-card')) return;
          gsap.fromTo(el,
            { autoAlpha: 0, y: 34, scale: .985 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: .8,
              delay: (index % 3) * .035,
              ease,
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });

        const marquee = document.querySelector('.marquee');
        if (marquee) {
          gsap.to(marquee, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
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
        if (!shell || !dot || window.__PORTFOLIO_CURSOR_LIGHT__) return;

        let x = window.innerWidth * .5;
        let y = window.innerHeight * .5;
        let frame = 0;

        const draw = () => {
          dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
          frame = 0;
        };

        const onMove = (event) => {
          x = event.clientX;
          y = event.clientY;
          shell.classList.add('cursor-ready');
          if (!frame) frame = requestAnimationFrame(draw);
        };

        const setHover = (event) => {
          shell.classList.toggle('is-active', !!event.target.closest('a,button,[role="button"]'));
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerover', setHover, { passive: true });
        document.addEventListener('pointerout', setHover, { passive: true });

        window.__PORTFOLIO_CURSOR_LIGHT__ = true;
      },

      bindCursorTargets() {
        // Lightweight cursor uses event delegation; no per-element listeners required.
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

        /* Pointer-driven editor tilt removed for lower input latency.
           CSS now provides a restrained hover lift without continuous tracking. */
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
