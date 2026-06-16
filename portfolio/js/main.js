// ============================================================
// RIO JAX PORTFOLIO — MAIN INTERACTION LAYER
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  RioJax.init();
  initPreloader();
  initCursor();
  initNav();
  initThemeToggle();
  initScrollProgress();
  initBackToTop();
  initParticles();
  initCommandPalette();
  initKonamiCode();
  initActiveNavLink();
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });
  initMagneticButtons();
  initFooter();
});

// ── PRELOADER ──────────────────────────────────────────────
function initPreloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      pre.classList.add('hidden');
      document.body.classList.remove('loading');
      if (window.gsap) {
        gsap.from('.hero-content > *', {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
        });
      }
    }, 600);
  });
  // Fallback in case load event already fired
  setTimeout(() => {
    pre.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 2500);
}

// ── CUSTOM CURSOR ──────────────────────────────────────────
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = 'a, button, input, textarea, select, .glass-card, [data-cursor-hover]';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) document.body.classList.remove('cursor-hover');
  });
}

// ── NAVIGATION ─────────────────────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('nav-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
  });

  function closeMobile() {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMobile() {
    hamburger?.classList.add('open');
    mobileNav?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  hamburger?.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) closeMobile();
    else openMobile();
  });
  overlay?.addEventListener('click', closeMobile);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
}

function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── THEME TOGGLE ───────────────────────────────────────────
function initThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      RioJax.setTheme(next);
    });
  });
}

// ── SCROLL PROGRESS ────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  });
}

// ── BACK TO TOP ────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── FLOATING PARTICLES (Canvas) ────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const count = window.innerWidth < 768 ? 35 : 70;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.15
    });
  }

  function getAccent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#00f5d4';
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accent = getAccent();
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // mouse repel
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x += dx / dist * 0.6;
        p.y += dy / dist * 0.6;
      }

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(accent, p.o);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }
  tick();
}

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ── MAGNETIC BUTTONS ───────────────────────────────────────
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ── COMMAND PALETTE ────────────────────────────────────────
function initCommandPalette() {
  const overlay = document.getElementById('cmd-overlay');
  const input = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  if (!overlay || !input || !results) return;

  const commands = [
    { icon: '🏠', text: 'Home', hint: 'Go to', url: 'index.html' },
    { icon: '👤', text: 'About', hint: 'Go to', url: 'about.html' },
    { icon: '⚡', text: 'Skills', hint: 'Go to', url: 'skills.html' },
    { icon: '💻', text: 'Projects', hint: 'Go to', url: 'projects.html' },
    { icon: '📝', text: 'Blog', hint: 'Go to', url: 'blog.html' },
    { icon: '✉️', text: 'Contact', hint: 'Go to', url: 'contact.html' },
    { icon: '📄', text: 'Resume', hint: 'Go to', url: 'resume.html' },
    { icon: '🌗', text: 'Toggle Theme', hint: 'Action', action: () => document.querySelector('.theme-toggle')?.click() },
    { icon: '🔐', text: 'Admin Dashboard', hint: 'Go to', url: 'admin.html' },
  ];

  // Add project/blog/skill data dynamically
  try {
    RioJax.getProjects().forEach(p => commands.push({ icon: '🚀', text: p.title, hint: 'Project', url: 'projects.html' }));
    RioJax.getBlogs(true).forEach(b => commands.push({ icon: '📰', text: b.title, hint: 'Blog Post', url: `blog-post.html?slug=${b.slug}` }));
    RioJax.getSkills().forEach(s => commands.push({ icon: s.icon || '⚡', text: s.name, hint: s.category, url: 'skills.html' }));
  } catch (e) {}

  let filtered = commands;
  let selectedIndex = 0;

  function render() {
    results.innerHTML = filtered.map((c, i) => `
      <div class="cmd-item ${i === selectedIndex ? 'selected' : ''}" data-index="${i}">
        <span class="cmd-item-icon">${c.icon}</span>
        <span class="cmd-item-text">${c.text}</span>
        <span class="cmd-item-hint">${c.hint}</span>
      </div>
    `).join('') || `<div style="padding:24px;text-align:center;color:var(--text-dim);font-size:0.85rem;">No results found</div>`;
  }

  function execute(cmd) {
    if (!cmd) return;
    if (cmd.action) cmd.action();
    else if (cmd.url) window.location.href = cmd.url;
    closeCmd();
  }

  function openCmd() {
    overlay.classList.add('open');
    input.value = '';
    filtered = commands;
    selectedIndex = 0;
    render();
    setTimeout(() => input.focus(), 50);
  }
  function closeCmd() {
    overlay.classList.remove('open');
  }

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      overlay.classList.contains('open') ? closeCmd() : openCmd();
    }
    if (e.key === 'Escape') closeCmd();
    if (overlay.classList.contains('open')) {
      if (e.key === 'ArrowDown') { e.preventDefault(); selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1); render(); scrollToSelected(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selectedIndex = Math.max(selectedIndex - 1, 0); render(); scrollToSelected(); }
      if (e.key === 'Enter') { e.preventDefault(); execute(filtered[selectedIndex]); }
    }
  });

  function scrollToSelected() {
    const el = results.querySelector('.cmd-item.selected');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    filtered = commands.filter(c => c.text.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
    selectedIndex = 0;
    render();
  });

  results.addEventListener('click', e => {
    const item = e.target.closest('.cmd-item');
    if (item) execute(filtered[+item.dataset.index]);
  });

  overlay.addEventListener('click', e => { if (e.target === overlay) closeCmd(); });

  document.querySelectorAll('.cmd-btn').forEach(b => b.addEventListener('click', openCmd));
}

// ── KONAMI CODE EASTER EGG ─────────────────────────────────
function initKonamiCode() {
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let progress = 0;

  document.addEventListener('keydown', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === sequence[progress]) {
      progress++;
      if (progress === sequence.length) {
        toggleMatrixMode();
        progress = 0;
      }
    } else {
      progress = key === sequence[0] ? 1 : 0;
    }
  });

  const exitBtn = document.getElementById('matrix-exit');
  exitBtn?.addEventListener('click', toggleMatrixMode);
}

let matrixInterval = null;
function toggleMatrixMode() {
  const canvas = document.getElementById('matrix-canvas');
  const exitBtn = document.getElementById('matrix-exit');
  if (!canvas) return;

  const active = canvas.classList.toggle('active');
  exitBtn?.classList.toggle('active', active);

  if (active) {
    showToast('🟢 Cyber Matrix Mode Activated', 'success');
    startMatrixRain(canvas);
  } else {
    showToast('Matrix Mode Deactivated', 'success');
    clearInterval(matrixInterval);
  }
}

function startMatrixRain(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const chars = 'アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン0123456789';
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  clearInterval(matrixInterval);
  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(6,6,16,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 35);
}

// ── TOAST NOTIFICATIONS ────────────────────────────────────
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── DYNAMIC FOOTER ─────────────────────────────────────────
function initFooter() {
  const profile = RioJax.getProfile();
  const settings = RioJax.getSettings();

  document.querySelectorAll('[data-footer-text]').forEach(el => el.textContent = settings.footerText);
  document.querySelectorAll('[data-profile-name]').forEach(el => el.textContent = profile.name);
  document.querySelectorAll('[data-profile-nickname]').forEach(el => el.textContent = profile.nickname);
  document.querySelectorAll('[data-profile-bio]').forEach(el => el.textContent = profile.bio);
  document.querySelectorAll('[data-profile-bio-extended]').forEach(el => el.textContent = profile.bioExtended);
  document.querySelectorAll('[data-profile-email]').forEach(el => {
    el.textContent = profile.email;
    if (el.tagName === 'A') el.href = `mailto:${profile.email}`;
  });
  document.querySelectorAll('[data-profile-instagram]').forEach(el => {
    el.href = `https://instagram.com/${profile.instagram}`;
  });
  document.querySelectorAll('[data-profile-github]').forEach(el => {
    el.href = `https://github.com/${profile.github}`;
  });
  document.querySelectorAll('[data-profile-availability]').forEach(el => el.textContent = profile.availability);
}
