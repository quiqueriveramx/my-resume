/**
 * Quique Rivera — Personal Resume
 * Main JavaScript
 */
(function() {
  "use strict";

  /**
   * Helper: selector
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Helper: event listener
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Helper: scroll listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scroll to element with offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle('active', window.scrollY > 100);
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Scroll on click for .scrollto links
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      let body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Scroll on page load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /**
   * Hero typed effect
   */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000
    });
  }

  /**
   * Skills animation (Waypoint)
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function() {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });
      let portfolioFilters = select('#portfolio-flters li', true);
      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        portfolioIsotope.arrange({ filter: this.getAttribute('data-filter') });
        portfolioIsotope.on('arrangeComplete', () => AOS.refresh());
      }, true);
    }
  });

  /**
   * Lightbox
   */
  GLightbox({ selector: '.portfolio-lightbox' });

  /**
   * Swiper sliders
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 20 }
    }
  });

  /**
   * AOS - Animate On Scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /**
   * PureCounter
   */
  new PureCounter();

  /**
   * Footer year
   */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

/**
 * Preloader
 */
window.addEventListener("load", function() {
  const loader = document.getElementById("preloader");
  if (loader) loader.style.display = "none";
});

/* ============================================================
   AI CHAT ASSISTANT
   Smart chatbot with knowledge about Quique Rivera's CV
   ============================================================ */
(function() {
  "use strict";

  const chatToggle = document.getElementById('ai-chat-toggle');
  const chatWindow = document.getElementById('ai-chat-window');
  const chatClose = document.getElementById('ai-chat-close');
  const chatInput = document.getElementById('ai-chat-input');
  const chatSend = document.getElementById('ai-chat-send');
  const chatMessages = document.getElementById('ai-chat-messages');

  if (!chatToggle) return;

  // Toggle chat window
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
    }
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Send on Enter
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
      handleUserMessage(chatInput.value.trim());
    }
  });

  chatSend.addEventListener('click', () => {
    if (chatInput.value.trim()) {
      handleUserMessage(chatInput.value.trim());
    }
  });

  // Suggestion clicks
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('ai-suggestion')) {
      const q = e.target.getAttribute('data-q');
      if (q) handleUserMessage(q);
    }
  });

  function handleUserMessage(text) {
    addMessage(text, 'user');
    chatInput.value = '';
    showTyping();
    setTimeout(() => {
      removeTyping();
      const response = getResponse(text);
      addMessage(response, 'bot');
    }, 600 + Math.random() * 800);
  }

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `ai-msg ${type}`;
    const p = document.createElement('p');
    p.innerHTML = text;
    div.appendChild(p);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'ai-msg bot';
    div.id = 'ai-typing';
    div.innerHTML = '<div class="ai-typing"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('ai-typing');
    if (el) el.remove();
  }

  /* ---- Knowledge Base ---- */
  const KB = {
    name: "Enrique 'Quique' Rivera",
    title: "Digital Marketing Manager",
    current: "Digital Marketing Manager at Kia (August 2025 – Present), leading digital marketing strategy, omnichannel campaigns, AI-powered analytics, and cross-functional team collaboration.",
    tdsynnex_mgr: "Marketing Manager at TD SYNNEX Mexico (April 2024 – July 2025): Led a 12-person team, managed $3M+ USD budgets, implemented Marketo & Salesforce ABM strategies, increased ROI by 30%, boosted MQL-to-SQL by 35%, and reduced sales cycle by 20%.",
    tdsynnex_lac: "Digital Marketing Manager for Latin America & Caribbean at TD SYNNEX (2021–2024): Managed regional marketing strategies, client relationships, partner agencies, and project budgets.",
    education: "Master's Degree in Senior Management — Communication & Advertising (Centro Universitario de la Comunicacion, 2015–2016, Honorable Mention). Bachelor's in Communication Sciences & Journalism (Universidad Latina, 2011–2014).",
    hard_skills: "Marketing Automation (Marketo, HubSpot, Pardot), CRM (Salesforce, Dynamics 365), Demand Generation, ABM, SEO/SEM, Google Analytics/GA4, Google Ads, Meta Ads, Content Marketing, Email Marketing, Power BI, AI-Powered Marketing, Predictive Lead Scoring, WordPress, Adobe Creative Suite, UX/UI, HTML/CSS/JS, Social Media Strategy, Video & Photo Production, Budget Management, A/B Testing, CRO, Event Planning, Influencer Marketing, Brand Positioning.",
    soft_skills: "Leadership, Strategic Thinking, Cross-Functional Collaboration, Stakeholder Communication, Project Management (Agile/Scrum), Analytical Mindset, Problem Solving, Attention to Detail, Negotiation, Conflict Resolution, Adaptability, Creative Thinking, Time Management, Public Speaking, Mentoring, Emotional Intelligence, Results Orientation, Multicultural Awareness.",
    location: "Mexico City, Mexico",
    contact: "Email: quiqueriveramx@gmail.com | Phone/WhatsApp: +52 55 3875 4910 | LinkedIn: linkedin.com/in/enrique-rivera-gonzalez",
    languages: "Spanish (Native), English (Professional proficiency)",
    achievements: "40% ROI increase, 35% MQL-to-SQL improvement, 20% sales cycle reduction, managed $3M+ annual budgets, led 12-person teams, worked with 20+ tech vendors (Microsoft, IBM, AWS, Cisco).",
    services: "Demand Generation & Growth, AI-Powered Marketing, Data Analytics & BI, Content & Brand Strategy, Video & Creative Production, Event Planning & Experiences."
  };

  function getResponse(input) {
    const q = input.toLowerCase();

    // Current role / Kia
    if (match(q, ['current', 'role', 'kia', 'now', 'present', 'working', 'actual', 'trabajo', 'donde trabaja', 'position'])) {
      return KB.current;
    }

    // TD SYNNEX
    if (match(q, ['td synnex', 'synnex', 'previous'])) {
      return `<strong>TD SYNNEX (2021–2025):</strong><br><br>${KB.tdsynnex_mgr}<br><br>${KB.tdsynnex_lac}`;
    }

    // Experience / career / resume
    if (match(q, ['experience', 'career', 'resume', 'background', 'work history', 'experiencia', 'trayectoria', 'cv'])) {
      return `<strong>Career Summary:</strong><br><br>1. ${KB.current}<br><br>2. ${KB.tdsynnex_mgr}<br><br>3. ${KB.tdsynnex_lac}`;
    }

    // Education
    if (match(q, ['education', 'degree', 'study', 'university', 'master', 'bachelor', 'school', 'estudios', 'universidad'])) {
      return KB.education;
    }

    // Hard skills / tools / platforms
    if (match(q, ['hard skill', 'tool', 'platform', 'technical', 'software', 'marketo', 'salesforce', 'hubspot', 'tech stack', 'herramientas'])) {
      return `<strong>Hard Skills & Tools:</strong><br>${KB.hard_skills}`;
    }

    // Soft skills
    if (match(q, ['soft skill', 'interpersonal', 'leadership', 'habilidades blandas'])) {
      return `<strong>Soft Skills:</strong><br>${KB.soft_skills}`;
    }

    // Skills (general)
    if (match(q, ['skill', 'abilities', 'competenc', 'habilidades'])) {
      return `<strong>Hard Skills:</strong><br>${KB.hard_skills}<br><br><strong>Soft Skills:</strong><br>${KB.soft_skills}`;
    }

    // Achievements / results / numbers
    if (match(q, ['achievement', 'result', 'number', 'metric', 'roi', 'impact', 'logros', 'resultados', 'kpi'])) {
      return `<strong>Key Achievements:</strong><br>${KB.achievements}`;
    }

    // Contact
    if (match(q, ['contact', 'email', 'phone', 'whatsapp', 'linkedin', 'reach', 'contacto', 'correo'])) {
      return `<strong>Contact:</strong><br>${KB.contact}`;
    }

    // Location
    if (match(q, ['location', 'city', 'where', 'based', 'ubicacion', 'ciudad', 'donde vive'])) {
      return `Quique is based in ${KB.location}. He's open to remote, hybrid, and on-site opportunities.`;
    }

    // Languages
    if (match(q, ['language', 'english', 'spanish', 'idioma', 'bilingual'])) {
      return `<strong>Languages:</strong> ${KB.languages}`;
    }

    // Services
    if (match(q, ['service', 'offer', 'help', 'can do', 'servicio', 'ofrece'])) {
      return `<strong>Services:</strong><br>${KB.services}`;
    }

    // AI / automation
    if (match(q, ['ai', 'artificial intelligence', 'automation', 'machine learning', 'inteligencia artificial', 'automatizacion'])) {
      return "Quique specializes in AI-powered marketing strategies including predictive lead scoring, automated nurturing campaigns, AI-driven audience segmentation, and marketing process automation. He has hands-on experience implementing AI tools across Marketo, Salesforce, and custom solutions.";
    }

    // ABM
    if (match(q, ['abm', 'account-based', 'account based'])) {
      return "Quique designed and executed Account-Based Marketing (ABM) strategies with Salesforce at TD SYNNEX, reducing the sales cycle by 20% and increasing average deal size. He combines ABM with AI-driven insights for targeted, high-value account engagement.";
    }

    // Greeting
    if (match(q, ['hello', 'hi', 'hey', 'hola', 'good morning', 'good afternoon', 'buenos', 'que tal'])) {
      return "Hello! I'm Quique's AI assistant. How can I help you? You can ask about his experience, skills, education, achievements, or services.";
    }

    // Thank you
    if (match(q, ['thank', 'thanks', 'gracias'])) {
      return "You're welcome! Feel free to ask anything else, or reach out to Quique directly at <strong>quiqueriveramx@gmail.com</strong>.";
    }

    // Hire / availability
    if (match(q, ['hire', 'available', 'opportunity', 'contratar', 'disponible', 'open to'])) {
      return `Quique is open to new opportunities! He's currently a Digital Marketing Manager at Kia. You can reach him at: <br>${KB.contact}`;
    }

    // About / who is
    if (match(q, ['who is', 'about', 'tell me about', 'quien es', 'sobre'])) {
      return `${KB.name} is a ${KB.title} at Kia with 10+ years of experience in demand generation, marketing automation, and AI-driven strategies across LATAM. ${KB.languages}. Based in ${KB.location}.`;
    }

    // Fallback
    return "I'm not sure I understood that. Try asking about Quique's <strong>experience</strong>, <strong>skills</strong>, <strong>education</strong>, <strong>achievements</strong>, <strong>services</strong>, or <strong>contact info</strong>. You can also ask in Spanish!";
  }

  function match(query, keywords) {
    return keywords.some(kw => query.includes(kw));
  }

})();
