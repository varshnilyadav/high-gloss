// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initGSAP();
    }, 1500); // Wait for the bar to finish
  });

  // Fallback if load event doesn't fire
  setTimeout(() => {
    if(!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      initGSAP();
    }
  }, 3000);

  // --- Header Scroll ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Menu ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const spans = menuToggle.querySelectorAll('span');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- GSAP Animations ---
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Timeline
    const tl = gsap.timeline();
    tl.to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

    // Hero Parallax
    gsap.to('.hero-bg img', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Services
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      });
    });

    // About Layout
    gsap.from('.about-image', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-layout',
        start: 'top 80%',
      }
    });

    gsap.from('.about-content', {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-layout',
        start: 'top 80%',
      }
    });

    // Gallery
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      });
    });

    // Testimonials
    gsap.utils.toArray('.testi-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testi-grid',
          start: 'top 85%',
        }
      });
    });

    // Contact Form
    gsap.from('.contact-info', {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-layout',
        start: 'top 80%',
      }
    });

    gsap.from('.map-container', {
      opacity: 0,
      x: 30,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-layout',
        start: 'top 80%',
      }
    });
  }
});
