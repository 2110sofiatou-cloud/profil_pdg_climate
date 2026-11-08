/* ─────────────────────────────────────────────────
   Théodore Gbovou - Climate Invest — main.js v5
   Navigation + lien actif + révélation au scroll
   (aucun loader : le contenu n'est jamais bloqué)
───────────────────────────────────────────────── */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Ombre de la barre au scroll */
  const navHeader = document.querySelector('.nav-header');
  const onScroll = () => navHeader.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', menuLabel(open));
  }

  function menuLabel(open) {
    if (window.i18n) return window.i18n.t(open ? 'menu.close' : 'menu.open');
    return open ? 'Fermer le menu' : 'Ouvrir le menu';
  }

  document.addEventListener('langchange', () => {
    navToggle.setAttribute('aria-label', menuLabel(navLinks.classList.contains('open')));
  });

  navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      navToggle.focus();
    }
  });
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navHeader.contains(e.target)) setMenu(false);
  });

  /* Retour en haut : #top cible la barre sticky, toujours « visible », donc l'ancre seule ne défile pas */
  document.querySelectorAll('a[href="#top"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', location.pathname + location.search);
  }));

  /* Lien actif : section qui traverse une fine bande au tiers supérieur de l'écran */
  const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinkEls)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinkEls.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === id));
      });
    }, { rootMargin: '-30% 0px -69% 0px', threshold: 0 });
    sections.forEach(s => sectionObs.observe(s));
  }

  /* Révélation au scroll avec décalage progressif (stagger) */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    document.documentElement.classList.add('reveal-ready');

    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
        const delay = Math.min(siblings.indexOf(el) * 110, 440);
        setTimeout(() => el.classList.add('visible'), delay);
        revealObs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ── Compteurs numériques animés (8 ans, 100 ha, 1000 ha, 30 PME) ── */
  const counterEls = document.querySelectorAll('[data-counter]');
  if (counterEls.length && 'IntersectionObserver' in window && !reduceMotion) {
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-counter'), 10);
        const isSpaced = el.getAttribute('data-format') === 'spaced';
        const duration = 1400;
        const startTime = performance.now();
        el.dataset.counting = 'true';

        // Séparateur de milliers selon la langue active (« 1 000 » / « 1,000 »)
        const format = n => {
          if (!isSpaced || n < 1000) return String(n);
          return window.i18n ? window.i18n.formatNumber(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        };

        function stepCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing: easeOutCubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = progress < 1 ? Math.round(ease * targetVal) : targetVal;
          // Préfixe et suffixe relus à chaque image : ils changent si l'on bascule FR/EN pendant l'animation
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';

          el.textContent = `${prefix}${format(current)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(stepCounter);
          } else {
            delete el.dataset.counting;
          }
        }

        requestAnimationFrame(stepCounter);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.25 });

    counterEls.forEach(el => counterObs.observe(el));
  }

  /* ── Timeline animée Climate Invest (auto-rotation & interactivité) ── */
  const timelineSteps = document.querySelectorAll('.ci-timeline-step');
  const timelineProgress = document.getElementById('ciTimelineProgress');
  const tlContainer = document.getElementById('ciTimeline');

  if (timelineSteps.length && timelineProgress) {
    const progressHeights = { '1': '32%', '2': '66%', '3': '100%' };
    let currentStepIdx = 0;
    let timelineTimer = null;
    let isHoveringTimeline = false;

    function setActiveStep(stepEl) {
      timelineSteps.forEach(s => s.classList.remove('is-active'));
      stepEl.classList.add('is-active');
      const stepNum = stepEl.getAttribute('data-step') || '1';
      timelineProgress.style.height = progressHeights[stepNum] || '32%';
      currentStepIdx = Array.from(timelineSteps).indexOf(stepEl);
    }

    function autoAdvanceTimeline() {
      if (isHoveringTimeline || reduceMotion) return;
      currentStepIdx = (currentStepIdx + 1) % timelineSteps.length;
      setActiveStep(timelineSteps[currentStepIdx]);
    }

    timelineSteps.forEach(stepEl => {
      stepEl.addEventListener('mouseenter', () => {
        isHoveringTimeline = true;
        setActiveStep(stepEl);
      });
      stepEl.addEventListener('click', () => {
        isHoveringTimeline = true;
        setActiveStep(stepEl);
      });
    });

    if (tlContainer) {
      tlContainer.addEventListener('mouseenter', () => { isHoveringTimeline = true; });
      tlContainer.addEventListener('mouseleave', () => { isHoveringTimeline = false; });

      if ('IntersectionObserver' in window && !reduceMotion) {
        const tlObs = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              timelineProgress.style.height = '100%';
              setTimeout(() => {
                setActiveStep(timelineSteps[0]);
                timelineTimer = setInterval(autoAdvanceTimeline, 3800);
              }, 600);
              tlObs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.25 });
        tlObs.observe(tlContainer);
      }
    }
  }

  /* ── Carrousel Projets animé (spotlight, navigation, dots & auto-play) ── */
  const projectsTrack = document.getElementById('projectsTrack');
  const projectCards = document.querySelectorAll('.project-card');
  const projectDots = document.querySelectorAll('.pdot');
  const projectPrev = document.getElementById('projectPrev');
  const projectNext = document.getElementById('projectNext');
  const projectsSection = document.getElementById('projets');

  if (projectCards.length) {
    let currentProjIdx = 0;
    let carouselTimer = null;
    let isHoveringCarousel = false;

    function updateActiveProject(idx, shouldScroll = true) {
      currentProjIdx = (idx + projectCards.length) % projectCards.length;

      // Mise à jour visuelle des cartes (spotlight actif)
      projectCards.forEach((c, i) => {
        c.classList.toggle('is-active', i === currentProjIdx);
      });

      // Mise à jour des pastilles / dots
      projectDots.forEach((d, i) => {
        const isActive = i === currentProjIdx;
        d.classList.toggle('is-active', isActive);
        d.setAttribute('aria-selected', String(isActive));
      });

      // Défilement fluide de la piste
      if (shouldScroll && projectsTrack) {
        const targetCard = projectCards[currentProjIdx];
        if (targetCard) {
          const trackRect = projectsTrack.getBoundingClientRect();
          const cardRect = targetCard.getBoundingClientRect();
          const isOverflowing = projectsTrack.scrollWidth > projectsTrack.clientWidth;

          if (isOverflowing) {
            const scrollLeftTarget = targetCard.offsetLeft - (projectsTrack.clientWidth - targetCard.clientWidth) / 2;
            projectsTrack.scrollTo({ left: Math.max(0, scrollLeftTarget), behavior: 'smooth' });
          }
        }
      }
    }

    function autoCycleProjects() {
      if (isHoveringCarousel || reduceMotion) return;
      updateActiveProject(currentProjIdx + 1, true);
    }

    function pulseBtn(btn) {
      if (!btn) return;
      btn.classList.add('clicked');
      setTimeout(() => btn.classList.remove('clicked'), 180);
    }

    if (projectPrev) {
      projectPrev.addEventListener('click', () => {
        pulseBtn(projectPrev);
        updateActiveProject(currentProjIdx - 1, true);
      });
    }

    if (projectNext) {
      projectNext.addEventListener('click', () => {
        pulseBtn(projectNext);
        updateActiveProject(currentProjIdx + 1, true);
      });
    }

    projectDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateActiveProject(idx, true);
      });
    });

    projectCards.forEach((card, idx) => {
      card.addEventListener('mouseenter', () => {
        isHoveringCarousel = true;
        updateActiveProject(idx, false);
      });
      card.addEventListener('click', () => {
        updateActiveProject(idx, true);
      });
    });

    if (projectsSection) {
      projectsSection.addEventListener('mouseenter', () => { isHoveringCarousel = true; });
      projectsSection.addEventListener('mouseleave', () => { isHoveringCarousel = false; });
      projectsSection.addEventListener('touchstart', () => { isHoveringCarousel = true; }, { passive: true });

      // Lancement de l'auto-play dès que la section entre dans l'écran
      if ('IntersectionObserver' in window && !reduceMotion) {
        const projObs = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!carouselTimer) {
                carouselTimer = setInterval(autoCycleProjects, 4500);
              }
            } else {
              if (carouselTimer) {
                clearInterval(carouselTimer);
                carouselTimer = null;
              }
            }
          });
        }, { threshold: 0.15 });
        projObs.observe(projectsSection);
      }
    }

    // Synchronisation lors du défilement tactile sur mobile
    if (projectsTrack) {
      let scrollTimeout;
      projectsTrack.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const trackCenter = projectsTrack.scrollLeft + projectsTrack.clientWidth / 2;
          let closestIdx = 0;
          let minDiff = Infinity;

          projectCards.forEach((c, i) => {
            const cardCenter = c.offsetLeft + c.offsetWidth / 2;
            const diff = Math.abs(trackCenter - cardCenter);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = i;
            }
          });

          if (closestIdx !== currentProjIdx) {
            updateActiveProject(closestIdx, false);
          }
        }, 80);
      }, { passive: true });
    }
  }
}());
