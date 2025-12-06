// Basic interactive behaviors: theme switching, smooth scroll, reveal on scroll, menu toggle
document.addEventListener('DOMContentLoaded', () => {

  // Elements
  const themeSelect = document.getElementById('themeSelect');
  const yearEl = document.getElementById('year');
  const nav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelectorAll('.nav a');

  // Set year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme switcher
  function applyTheme(name){
    document.body.classList.remove('theme-neon','theme-minimal','theme-dark');
    if(name === 'neon') document.body.classList.add('theme-neon');
    else if(name === 'dark') document.body.classList.add('theme-dark');
    else document.body.classList.add('theme-minimal');

    // persist
    localStorage.setItem('portfolioTheme', name);
  }

  // load saved theme
  const saved = localStorage.getItem('portfolioTheme') || 'minimal';
  themeSelect.value = saved;
  applyTheme(saved);

  themeSelect.addEventListener('change', e => applyTheme(e.target.value));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      // ignore if link is placeholder '#'
      const target = this.getAttribute('href');
      if(target === '#') return;
      const el = document.querySelector(target);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if(getComputedStyle(menuToggle).display !== 'none' && nav.style.display === 'block'){
          nav.style.display = 'none';
        }
      }
    });
  });

  // Mobile menu toggle
  menuToggle?.addEventListener('click', () => {
    if(nav.style.display === 'block') nav.style.display = 'none';
    else nav.style.display = 'block';
  });

  // Reveal on scroll (simple)
  const revealEls = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    revealEls.forEach((el, i) => {
      const top = el.getBoundingClientRect().top;
      if(top < trigger){
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      } else {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
      }
    });
  };
  // Add small delays set via classes .delay-1 .delay-2 etc
  document.querySelectorAll('.reveal').forEach((el) => {
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
  });
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Highlight active nav link based on scroll position
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    let current = sections[0]?.id || '';
    for(const s of sections){
      if(s.offsetTop <= scrollPos) current = s.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
  };
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // Contact form basic handling (client-side only)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    // For demo: show a toast-like alert
    alert(`Thanks ${fd.get('name')}! Message received (demo).`);
    contactForm.reset();
  });

});
