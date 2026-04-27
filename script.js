/* ===== Detailing Masters — GSAP Animations & Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Preloader ──
  const preloader = document.getElementById('preloader');
  let animsInit = false;
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      if (!animsInit) { initAnimations(); animsInit = true; }
    }, 2200);
  });
  // Fallback
  setTimeout(() => {
    preloader.classList.add('hidden');
    if (!animsInit) { initAnimations(); animsInit = true; }
  }, 4000);

  // ── Mobile Menu ──
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ── Header scroll effect ──
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Init all GSAP animations ──
  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance — full cover bg version
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTL
      .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
      .to('.hero-title', { opacity: 1, y: 0, duration: 1 }, 0.4)
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 0.7)
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, 0.9)
      .to('.hero-brands', { opacity: 1, y: 0, duration: 0.8 }, 1.1)
      .to('#shimmerOverlay', {
        x: '300%', duration: 2.5, ease: 'power2.inOut'
      }, 1.2);

    // Repeat shimmer every 6 seconds
    setInterval(() => {
      gsap.fromTo('#shimmerOverlay',
        { x: '-150%' },
        { x: '300%', duration: 2.5, ease: 'power2.inOut' }
      );
    }, 6000);

    // ── Service cards ──
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.8,
        delay: i * 0.15,
        scrollTrigger: {
          trigger: card, start: 'top 85%', toggleActions: 'play none none none'
        }
      });
    });

    // ── Process section ──
    gsap.to('.process-text', {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.process-text', start: 'top 80%' }
    });
    gsap.to('.process-visual', {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.process-visual', start: 'top 80%' }
    });
    gsap.utils.toArray('.process-step').forEach((step, i) => {
      gsap.to(step, {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.12,
        scrollTrigger: { trigger: step, start: 'top 90%' }
      });
    });

    // ── Gallery items ──
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.to(item, {
        opacity: 1, scale: 1, duration: 0.7, delay: i * 0.1,
        scrollTrigger: { trigger: item, start: 'top 85%' }
      });
    });

    // ── Booking section ──
    gsap.to('.booking-info', {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.booking-info', start: 'top 80%' }
    });
    gsap.to('.booking-form-wrap', {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.booking-form-wrap', start: 'top 80%' }
    });

    // ── Location ──
    gsap.to('.location-info', {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.location-info', start: 'top 80%' }
    });
    gsap.to('.map-wrap', {
      opacity: 1, x: 0, duration: 1,
      scrollTrigger: { trigger: '.map-wrap', start: 'top 80%' }
    });

    // ── Parallax on hero bg ──
    gsap.to('.hero-bg img', {
      scale: 1.1,
      scrollTrigger: {
        trigger: '#hero', start: 'top top', end: 'bottom top',
        scrub: 1
      }
    });
  }

  // ── Before/After Slider (draggable reveal) ──
  const slider = document.getElementById('processSlider');
  const baAfterWrap = document.getElementById('baAfterWrap');
  if (slider && baAfterWrap) {
    const wrap = document.getElementById('beforeAfterWrap');
    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = wrap.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const pct = (x / rect.width) * 100;
      slider.style.left = pct + '%';
      baAfterWrap.style.width = pct + '%';
    };

    slider.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
    slider.addEventListener('touchstart', (e) => { isDragging = true; }, { passive: true });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
    window.addEventListener('touchmove', (e) => { if (isDragging) setPosition(e.touches[0].clientX); }, { passive: true });

    // Also allow clicking anywhere on the wrap to jump
    wrap.addEventListener('click', (e) => setPosition(e.clientX));
  }

  // ── Booking form handler ──
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    // Set min date to today
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName').value;
      const phone = document.getElementById('bookPhone').value;
      const service = document.getElementById('bookService').value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value;
      const notes = document.getElementById('bookNotes').value;

      // Build WhatsApp message
      const msg = `Hi! I'd like to book a slot at Detailing Masters.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Date:* ${encodeURIComponent(date)}%0A*Time:* ${encodeURIComponent(time)}${notes ? '%0A*Notes:* ' + encodeURIComponent(notes) : ''}`;

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/08977306032?text=${msg}`, '_blank');

      // Show confirmation
      const btn = document.getElementById('btn-cta-main');
      const originalText = btn.textContent;
      btn.textContent = '✓ SENT TO WHATSAPP';
      btn.style.background = '#25D366';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    });
  }

});
