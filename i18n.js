/* ─────────────────────────────────────────────────
   Théodore Gboyou - Climate Invest — i18n.js
   Bascule FR / EN sans rechargement.
   Le français reste dans le HTML (langue source) ;
   seules les traductions anglaises vivent ici.
───────────────────────────────────────────────── */

(function () {
  const STORAGE_KEY = 'ci-lang';
  const LANGS = ['fr', 'en'];

  /* Chaînes générées par le JavaScript (absentes du HTML) */
  const UI = {
    fr: {
      'menu.open': 'Ouvrir le menu',
      'menu.close': 'Fermer le menu',
      'lang.group': 'Choisir la langue',
      'thousands': ' '
    },
    en: {
      'menu.open': 'Open menu',
      'menu.close': 'Close menu',
      'lang.group': 'Choose language',
      'thousands': ','
    }
  };

  const META = {
    fr: {
      title: document.title,
      description: (document.querySelector('meta[name="description"]') || {}).content || ''
    },
    en: {
      title: 'Théodore Gboyou - President of Climate Invest, Benin Youth Delegate to COP31',
      description: 'Théodore Gboyou, President of Climate Invest. Eight years of experience in West Africa, expertise in Article 6 of the Paris Agreement and MRV technologies. Benin Youth Delegate to COP31.'
    }
  };

  /* Traductions anglaises (clé data-i18n → HTML) */
  const EN = {
    'skip': 'Skip to content',
    'nav.aria': 'Main navigation',
    'nav.profil': 'My profile',
    'nav.projets': 'My projects',
    'nav.mou': 'Join',
    'nav.contact': 'Contact me',

    'hero.flag': 'Benin Delegation',
    'hero.event': 'COP31 - Türkiye 2026',
    'hero.role': 'President of <strong class="hero-role-co">Climate Invest</strong>',
    'hero.pitch': 'For eight years, I have been working on the ground across West Africa to design, audit and structure high-impact climate projects. Through my company Climate Invest and my mandate as Benin\'s youth delegate to COP31, I champion a clear vision: putting <strong>Article 6 of the Paris Agreement</strong> and <strong>MRV</strong> technologies at the service of sovereign, rigorous carbon finance that creates value for our territories.',
    'hero.cta': 'Get in touch',
    'hero.join': 'Join Climate Invest',
    'hero.award': 'African Union Climate Innovator (AU)',
    'hero.specialty': 'Article 6 &amp; AFOLU specialist',
    'hero.vcard': 'Download my business card (vCard)',
    'hero.portraitAlt': 'Official portrait of Théodore Gboyou, President of Climate Invest',
    'hero.metaTitle': 'National youth delegate',
    'hero.metaSub': 'COP31 - Republic of Benin',

    'profil.kicker': 'My journey &amp; vision',
    'profil.badge': 'West Africa',
    'profil.title': 'My on-the-ground commitment to African climate finance',
    'profil.lead': 'I devote my career to the practical mechanisms that make it possible to finance, audit and add value to climate action in West Africa. As President of Climate Invest, I combine uncompromising technical standards with a command of multilateral negotiations to help our businesses, institutions and project developers achieve tangible, measurable results.',
    'profil.metaLabel': 'Mandate &amp; Presidency',
    'profil.metaVal': 'Climate Invest - COP31 Delegate',
    'profil.eduLabel': 'Education',
    'profil.eduVal': 'Rural engineering, Statistics &amp; Public economics',
    'profil.card1.title': 'of experience and direct field work',
    'profil.card1.text': 'Eight years of audits, agronomic assessments and hands-on field support across West Africa, working with public and private stakeholders.',
    'profil.card2.title': 'Article 6 of the Paris Agreement',
    'profil.card2.text': 'I structure bilateral cooperation mechanisms, ITMO transfers and carbon valuation models that protect our States\' sovereignty while attracting large-scale private capital.',
    'profil.card3.title': 'MRV Engineering &amp; Protocols',
    'profil.card3.text': 'I lead the digitalisation of the measurement, reporting and verification of carbon impact in line with the most rigorous international standards (ISO 14064, GHG Protocol).',

    'cop.kicker': 'My diplomatic mandate',
    'cop.title': 'Carrying Benin\'s voice to COP31',
    'cop.lead': 'I am honoured to have been selected to represent Beninese youth at the 31<sup>st</sup> Conference of the Parties on climate change (COP31), held in Türkiye.',
    'cop.sub': 'At the negotiating table, I advocate action-driven environmental diplomacy: making adaptation finance tangible for West Africa, securing the implementation of Article 6 and unlocking the ecological and economic potential of our territories.',
    'cop.verified': 'Official mandate of Beninese youth - COP31',
    'cop.phoneChip': 'COP31 - Türkiye',
    'cop.phoneRole': 'Youth Climate Delegate, Benin',
    'cop.phoneBadge': 'Article 6 &amp; Negotiations',
    'cop.step1.title': 'Selected through a national competition',
    'cop.step1.text': 'I was named a laureate of the excellence competition held in Benin to select delegates committed to climate engineering and action.',
    'cop.step1.pill': 'Phase 01 - National competition',
    'cop.step2.title': 'Two months of intensive training',
    'cop.step2.text': 'I completed a rigorous preparatory programme on UNFCCC negotiation rules, Article 6 mechanisms and environmental diplomacy.',
    'cop.step2.pill': 'Phase 02 - UNFCCC negotiations',
    'cop.step3.title': 'My official mandate in Türkiye',
    'cop.step3.text': 'I will sit with the Beninese delegation at COP31 to negotiate concrete adaptation mechanisms and fair sustainable finance flows for Africa.',
    'cop.step3.pill': 'Phase 03 - COP31 Summit',

    'ci.badge': 'MRV Operator',
    'ci.photoAlt': 'Climate Invest field project: resilient agriculture and sustainable land management in Benin',
    'ci.kicker': 'My company &amp; my tool for action',
    'ci.title': 'Climate Invest: the engineering firm I built to act',
    'ci.lead': 'I founded and lead Climate Invest to give West Africa a leading engineering, audit and sustainable finance firm. With my teams in Benin, we support businesses, project developers and institutions in measuring, certifying and financially valuing their climate assets.',
    'ci.partnerTitle': 'Private on-the-ground technical partner',
    'ci.partnerText': 'Climate Invest acts as technical implementation operator and MRV integrator to deliver the goals of <strong>Benin’s NDC 3.0</strong>, in synergy with the institutional framework. For all our projects, ITMO transfers remain under the strict sovereignty of the State.',
    'ci.timelineAria': 'Climate Invest intervention cycle',
    'ci.step1.title': 'Environmental assets',
    'ci.step1.text': 'With my teams, I identify, model and secure your emission reductions so they can be valued under the most demanding standards of the international carbon market.',
    'ci.step2.title': 'Low-carbon pathways',
    'ci.step2.text': 'I design realistic, ambitious decarbonisation roadmaps that meet the strict requirements of ISO 14064 and the GHG Protocol.',
    'ci.step3.title': 'MRV integrator &amp; certified data',
    'ci.step3.text': 'I work in the field with Climate Invest as a leading technical partner, directly supporting Benin\'s NDC targets and Article 6 of the Paris Agreement.',
    'ci.visit': 'Visit climateinvest.bj',
    'ci.contact': 'Talk with me',

    'projects.kicker': 'Post-COP31 programme',
    'projects.title': 'The projects we are launching in Benin',
    'projects.desc': 'Three large-scale programmes we are rolling out in Benin, combining resilient agriculture, soil regeneration and productive decarbonisation.',
    'projects.trackAria': 'Projects carousel',
    'projects.details': 'Project details',
    'projects.p1.alt': 'MRV digitalisation of rice-growing plots in Benin',
    'projects.p1.title': 'Rice farming &amp; MRV',
    'projects.p1.badge': 'AWD management & CH₄ reduction',
    'projects.p1.label': 'AWD pilot plots',
    'projects.p1.text': 'I support farmers across 100 hectares of lowland rice fields using AWD irrigation (<em>Alternate Wetting and Drying</em>): we cut methane emissions by around 45% while digitalising MRV monitoring to certify their efforts.',
    'projects.p2.alt': 'Soil restoration and carbon sequestration with biochar in Benin',
    'projects.p2.title': 'Fertisol Africa',
    'projects.p2.award': 'African Union Prize',
    'projects.p2.badge': 'Soil carbon sequestration',
    'projects.p2.label': 'Soils, Biochar &amp; SOC MRV',
    'projects.p2.text': 'I lead agronomic assessments and biochar amendment across 1,000 hectares to durably restore soil fertility and quantify organic carbon sequestration (SOC MRV) under strict protocols.',
    'projects.p3.alt': 'Decarbonisation and energy transition of agro-industrial SMEs in Benin',
    'projects.p3.title': 'SME decarbonisation',
    'projects.p3.badge': 'ISO 14064-1 inventories & decarbonisation',
    'projects.p3.label': 'ISO 14064 &amp; Pathways',
    'projects.p3.text': 'I directly support the managers of 30 Beninese SMEs and agro-industries in carrying out their ISO 14064-1 carbon footprint assessments and co-developing operational, profitable decarbonisation pathways.',
    'projects.navAria': 'Projects navigation',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',
    'projects.dotsAria': 'Project indicators',
    'projects.dot1': 'Project 1: Rice farming & MRV',
    'projects.dot2': 'Project 2: Fertisol Africa',
    'projects.dot3': 'Project 3: SME decarbonisation',
    'projects.note': '* The figures shown describe the operational scope of our interventions. The schedule and detailed progress are available on request.',

    'mou.kicker': 'Join the journey',
    'mou.title': 'Expression of interest (MoU)',
    'mou.lead': 'The MoU is the single entry point to the post-COP31 programme. Choose the option that matches your status to activate your signature.',
    'mou.recommended': 'Recommended',
    'mou.calendly': 'Access to the Calendly link for the post-COP31 B2B session',
    'mou.ind.option': 'Option 1',
    'mou.ind.title': 'Individual / Researcher',
    'mou.ind.audience': 'Consultants, independent experts, researchers',
    'mou.ind.f1': 'Activation of the individual letter of intent',
    'mou.ind.f2': 'Summary impact report on the 3 projects',
    'mou.ind.f3': 'Climate commitment certificate',
    'mou.ind.cta': 'Activate the MoU',
    'mou.org.option': 'Option 2',
    'mou.org.title': 'SME / NGO / Institution',
    'mou.org.audience': 'Local SMEs, NGOs, firms, cooperatives',
    'mou.org.f1': 'Activation of the organisational letter of intent',
    'mou.org.f2': 'Official mention of your logo and name in the annual report',
    'mou.org.f3': 'CSR/ESG certificate for your organisation',
    'mou.org.cta': 'Activate the MoU',
    'mou.question': 'Any questions before committing?',
    'mou.questionLink': 'Write to us on WhatsApp',

    'b2b.kicker': 'After MoU validation',
    'b2b.title': 'Post-COP31 B2B session',
    'b2b.lead': 'A strategic working session, scheduled at your convenience, to turn your commitment into concrete next steps.',
    'b2b.step1.title': 'MoU validation',
    'b2b.step1.text': 'Your expression of interest is recorded and your signature activated.',
    'b2b.step2.title': 'Calendly link received',
    'b2b.step2.text': 'It is sent to you automatically so you can book the slot that suits you.',
    'b2b.step3.title': 'B2B working session',
    'b2b.step3.text': 'One to two weeks after COP31, to explore scale-up opportunities or consolidate your initial commitment.',
    'b2b.security.title': 'Confidentiality:',
    'b2b.security.text': 'raw data and GIS files are only shared under a firm contract and a non-disclosure agreement (NDA).',

    'counter.years': ' years',
    'counter.smes': ' SMEs',

    'footer.badge': 'Carbon Cooperation &amp; Diplomacy',
    'footer.title': 'Let\'s build sovereign, measurable climate finance together',
    'footer.desc': 'Institutions, international funders, businesses or technical partners: I am at your disposal to bring your projects to life in West Africa and within the framework of COP31.',
    'footer.whatsapp': 'Chat on WhatsApp',
    'footer.whatsappHref': 'https://wa.me/2290194772347?text=Hello%20Th%C3%A9odore%2C%20I%20would%20like%20to%20discuss...',
    'footer.email': 'Send a direct email',
    'footer.avatarAlt': 'Théodore Gboyou, President of Climate Invest',
    'footer.badgeTitle': 'Climate Invest firm',
    'footer.logoAlt': 'Climate Invest logo',
    'footer.role': 'President of <strong>Climate Invest</strong>',
    'footer.event': 'Benin Youth Delegate to COP31',
    'footer.bio': 'For eight years, I have been working on the ground across West Africa to put Article 6 of the Paris Agreement and MRV technologies at the service of sovereign, rigorous, value-creating carbon finance.',
    'footer.pill1': 'Official COP31 Mandate - Republic of Benin',
    'footer.pill2': 'Engineering firm &amp; MRV operator',
    'footer.nav.profil': 'My profile &amp; vision',
    'footer.nav.cop': 'COP31 mandate - Türkiye',
    'footer.nav.ci': 'Climate Invest firm',
    'footer.nav.projets': 'My field projects',
    'footer.nav.mou': 'Expression of interest (MoU)',
    'footer.nav.b2b': 'Post-COP31 B2B session',
    'footer.nav.contact': 'Get in touch',
    'footer.progTitle': 'Programmes &amp; Expertise',
    'footer.prog1': 'Sustainable rice farming &amp; AWD (100 ha)',
    'footer.prog2': 'Fertisol Africa - Soils &amp; Biochar (1,000 ha)',
    'footer.prog3': 'Decarbonisation &amp; ISO 14064 (30 SMEs)',
    'footer.prog4': 'Article 6 &amp; ITMO negotiations',
    'footer.prog5': 'MRV protocols &amp; technologies',
    'footer.contactTitle': 'Contact &amp; Exchanges',
    'footer.location': 'Cotonou, Republic of Benin',
    'footer.copy': '&copy; 2026 Théodore Gboyou - All rights reserved.',
    'footer.subtext': 'Beninese youth delegation to COP31 - Republic of Benin',
    'footer.topAria': 'Back to top',
    'footer.top': 'Back to top'
  };

  /* Mémorise le français d'origine présent dans le HTML */
  const FR = {};
  const contentEls = Array.from(document.querySelectorAll('[data-i18n]'));
  const attrEls = Array.from(document.querySelectorAll('[data-i18n-attr]'));

  contentEls.forEach(el => {
    const key = el.dataset.i18n;
    if (!(key in FR)) FR[key] = el.innerHTML;
  });

  function parseAttrSpec(el) {
    return el.dataset.i18nAttr.split(';').map(pair => {
      const [attr, key] = pair.split(':');
      return { attr: attr.trim(), key: key.trim() };
    });
  }

  attrEls.forEach(el => {
    parseAttrSpec(el).forEach(({ attr, key }) => {
      if (!(key in FR)) FR[key] = el.getAttribute(attr) || '';
    });
  });

  let current = 'fr';

  function t(key) {
    const dict = current === 'en' ? EN : FR;
    if (key in UI[current]) return UI[current][key];
    return key in dict ? dict[key] : FR[key];
  }

  /* Réaffiche la valeur finale des compteurs avec le suffixe et le séparateur de la langue */
  function formatNumber(n) {
    return n >= 1000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, UI[current].thousands) : String(n);
  }

  function refreshCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
      if (el.dataset.counting === 'true') return;
      const n = parseInt(el.getAttribute('data-counter'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + formatNumber(n) + suffix;
    });
  }

  function apply(lang) {
    if (!LANGS.includes(lang)) lang = 'fr';
    current = lang;

    contentEls.forEach(el => {
      const html = t(el.dataset.i18n);
      if (el.innerHTML !== html) el.innerHTML = html;
    });

    attrEls.forEach(el => {
      parseAttrSpec(el).forEach(({ attr, key }) => el.setAttribute(attr, t(key)));
    });

    document.documentElement.lang = lang;
    document.title = META[lang].title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = META[lang].description;

    refreshCounters();

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
    document.querySelectorAll('.lang-switch').forEach(group => {
      group.setAttribute('aria-label', UI[lang]['lang.group']);
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* stockage indisponible */ }
  }

  function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(stored)) return stored;
    } catch (e) { /* stockage indisponible */ }
    return 'fr';
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === current) return;
      apply(lang);
      save(lang);
      const url = new URL(location.href);
      if (lang === 'fr') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    });
  });

  window.i18n = { t, apply, formatNumber, get lang() { return current; } };

  const start = initialLang();
  if (start !== 'fr') apply(start);
}());
