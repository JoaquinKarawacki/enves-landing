document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    // Hysteresis: separate enter/exit thresholds so a scroll position
    // hovering right at one fixed value can't flip the class back and
    // forth (which visibly shakes the header while it grows/shrinks).
    let isScrolled = false;
    let ticking = false;
    const applyScrollState = () => {
      ticking = false;
      const y = window.scrollY;
      if (!isScrolled && y > 40) {
        isScrolled = true;
      } else if (isScrolled && y < 16) {
        isScrolled = false;
      }
      header.classList.toggle('is-scrolled', isScrolled);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyScrollState);
      }
    };
    applyScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ---- */
  const burger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mm-submenu a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
    mobileMenu.querySelectorAll(':scope > a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- Mobile menu accordion (Seguros Personales) ---- */
  mobileMenu && mobileMenu.querySelectorAll('.mm-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.closest('.mm-group').classList.toggle('is-open');
    });
  });

  /* ---- Desktop dropdown (Seguros Personales) ---- */
  document.querySelectorAll('.main-nav .nav-item.has-dropdown').forEach(item => {
    const trigger = item.querySelector('.dropdown-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---- Hero slider ---- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (slides.length) {
    let current = 0;
    let timer;
    const show = (i) => {
      slides.forEach(s => s.classList.remove('is-active'));
      dots.forEach(d => d.classList.remove('is-active'));
      slides[i].classList.add('is-active');
      if (dots[i]) dots[i].classList.add('is-active');
      current = i;
    };
    const next = () => show((current + 1) % slides.length);
    const start = () => { timer = setInterval(next, 5500); };
    const reset = () => { clearInterval(timer); start(); };
    dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); reset(); }));
    start();
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Contact & CV forms (real backend via /api/contacto) ---- */
  function wireForm(form, successText) {
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    const msg = form.querySelector('.form-msg');
    const setMsg = (text, isError) => {
      if (!msg) return;
      msg.textContent = text;
      msg.classList.add('is-visible');
      msg.classList.toggle('is-error', !!isError);
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      setMsg('Enviando...', false);
      try {
        const res = await fetch('/api/contacto', { method: 'POST', body: new FormData(form) });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'No se pudo enviar');
        setMsg(successText, false);
        form.reset();
      } catch (err) {
        setMsg('No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.', true);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
  wireForm(document.querySelector('.js-contact-form'), 'Gracias, recibimos tu consulta. Te vamos a contactar a la brevedad.');
  wireForm(document.querySelector('.js-cv-form'), 'Gracias, recibimos tu CV. Te vamos a contactar si hay una oportunidad para vos.');
});
