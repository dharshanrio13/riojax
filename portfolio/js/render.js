// ============================================================
// RIO JAX PORTFOLIO — DYNAMIC CONTENT RENDERER
// Populates pages with data from RioJax data layer
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderHero();
  renderHeroStats();
  renderSkillsPreview();
  renderSkillsFull();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderProjects();
  renderTestimonials();
  renderBlogPreview();
  renderBlogFull();
  renderBlogPost();
  renderServices();
  renderRepos();
  renderAchievements();
  renderStatsSection();
  renderAboutPage();
  renderContactInfo();
  renderResume();
  initHeroEffects();
});

// ── HERO ───────────────────────────────────────────────────
function renderHero() {
  const profile = RioJax.getProfile();
  document.querySelectorAll('[data-hero-name]').forEach(el => el.textContent = profile.name);
  document.querySelectorAll('[data-hero-nickname]').forEach(el => el.textContent = `aka ${profile.nickname}`);
  document.querySelectorAll('[data-hero-bio]').forEach(el => el.textContent = profile.bio);
  document.querySelectorAll('[data-hero-availability]').forEach(el => el.textContent = profile.availability);

  const typedEl = document.getElementById('hero-typed');
  if (typedEl) {
    const roles = profile.roles && profile.roles.length ? profile.roles : ['Developer'];
    initTypingEffect(typedEl, roles);
  }
}

function initTypingEffect(el, words) {
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.substring(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.substring(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 70);
  }
  tick();
}

function renderHeroStats() {
  const container = document.getElementById('hero-stats');
  if (!container) return;
  const stats = RioJax.getStats();
  const items = [
    { num: stats.projectsCompleted, label: 'Projects' },
    { num: stats.certificationsEarned, label: 'Certifications' },
    { num: stats.ctfsSolved, label: 'CTFs Solved' },
    { num: stats.githubContributions, label: 'Contributions' },
  ];
  container.innerHTML = items.map(it => `
    <div class="hero-stat">
      <span class="hero-stat-num" data-count="${it.num}">0</span>
      <div class="hero-stat-label">${it.label}</div>
    </div>
  `).join('');
  animateCounters(container);
}

function animateCounters(container) {
  const counters = container.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count, 10) || 0;
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));
    const update = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(() => setTimeout(update, 25));
      }
    };
    // trigger on scroll into view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          update();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(counter);
  });
}

// ── HERO EFFECTS: parallax + GSAP ──────────────────────────
function initHeroEffects() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // mouse parallax on orbs
  if (!window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.querySelectorAll('.orb').forEach((orb, i) => {
        const depth = (i + 1) * 8;
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });
  }

  // GSAP scroll-triggered fade for sections
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.gsap-fade').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
      });
    });
  }
}

// ── SKILLS PREVIEW (home page) ─────────────────────────────
function renderSkillsPreview() {
  const container = document.getElementById('skills-preview-grid');
  if (!container) return;
  const skills = RioJax.getSkills().filter(s => s.featured).slice(0, 8);
  container.innerHTML = skills.map((s, i) => skillCardHTML(s, i)).join('');
  animateSkillBars(container);
}

// ── SKILLS FULL (skills page) ──────────────────────────────
function renderSkillsFull() {
  const container = document.getElementById('skills-categories');
  if (!container) return;
  const skills = RioJax.getSkills();
  const categories = [...new Set(skills.map(s => s.category))];

  container.innerHTML = categories.map(cat => {
    const catSkills = skills.filter(s => s.category === cat);
    return `
      <div class="skill-category-section" data-aos="fade-up">
        <div class="skill-category-title">${cat}</div>
        <div class="skills-grid">
          ${catSkills.map((s, i) => skillCardHTML(s, i)).join('')}
        </div>
      </div>
    `;
  }).join('');

  animateSkillBars(container);
}

function skillCardHTML(s, i) {
  return `
    <div class="glass-card skill-card" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
      <div class="skill-card-header">
        <span class="skill-icon">${s.icon || '⚡'}</span>
        <div>
          <div class="skill-name">${escapeHTML(s.name)}</div>
          <div class="skill-category">${escapeHTML(s.category)}</div>
        </div>
      </div>
      <div class="skill-bar-track"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
      <div class="skill-level-label">${s.level}%</div>
    </div>
  `;
}

function animateSkillBars(container) {
  const bars = container.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.level + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(bar => observer.observe(bar));
}

// ── EXPERIENCE TIMELINE ─────────────────────────────────────
function renderExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;
  const items = RioJax.getData('experience');
  container.innerHTML = items.map(e => `
    <div class="timeline-item" data-aos="fade-up">
      <div class="timeline-period">${e.icon || '💼'} ${escapeHTML(e.period)}</div>
      <div class="timeline-title">${escapeHTML(e.role)}</div>
      <div class="timeline-subtitle">${escapeHTML(e.company)} ${e.type ? `· ${escapeHTML(e.type)}` : ''}</div>
      <div class="timeline-desc">${escapeHTML(e.description)}</div>
      ${e.skills ? `<div class="about-tags" style="margin-top:12px;">${e.skills.map(s => `<span class="about-tag">${escapeHTML(s)}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');
}

// ── EDUCATION TIMELINE ──────────────────────────────────────
function renderEducation() {
  const container = document.getElementById('education-timeline');
  if (!container) return;
  const items = RioJax.getData('education');
  container.innerHTML = items.map(e => `
    <div class="timeline-item" data-aos="fade-up">
      <div class="timeline-period">${e.icon || '🎓'} ${escapeHTML(e.period)}</div>
      <div class="timeline-title">${escapeHTML(e.degree)}</div>
      <div class="timeline-subtitle">${escapeHTML(e.institution)}${e.location ? ' · ' + escapeHTML(e.location) : ''}</div>
      <div class="timeline-desc">${escapeHTML(e.description)}</div>
      ${e.achievements && e.achievements.length ? `<div class="about-tags" style="margin-top:12px;">${e.achievements.map(a => `<span class="about-tag">${escapeHTML(a)}</span>`).join('')}</div>` : ''}
    </div>
  `).join('');
}

// ── CERTIFICATIONS ──────────────────────────────────────────
function renderCertifications() {
  const containers = document.querySelectorAll('[data-certs-grid]');
  if (!containers.length) return;
  const certs = RioJax.getCertifications();

  containers.forEach(container => {
    const featuredOnly = container.dataset.certsGrid === 'featured';
    const list = featuredOnly ? certs.filter(c => c.featured) : certs;
    container.innerHTML = list.map((c, i) => `
      <div class="glass-card cert-card" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
        <div class="cert-icon">🏅</div>
        <div class="cert-title">${escapeHTML(c.title)}</div>
        <div class="cert-issuer">${escapeHTML(c.issuer)}</div>
        <div class="cert-date">${escapeHTML(c.date)}</div>
        ${c.url ? `<a href="${escapeAttr(c.url)}" target="_blank" rel="noopener" class="cert-verify-link">Verify ↗</a>` : ''}
      </div>
    `).join('') || emptyState('No certifications added yet.');
  });
}

// ── PROJECTS ─────────────────────────────────────────────────
function renderProjects() {
  const containers = document.querySelectorAll('[data-projects-grid]');
  if (!containers.length) return;
  const allProjects = RioJax.getProjects();

  containers.forEach(container => {
    const featuredOnly = container.dataset.projectsGrid === 'featured';
    const list = featuredOnly ? allProjects.filter(p => p.featured) : allProjects;
    renderProjectCards(container, list);

    // If full project grid, wire up filters/search
    if (!featuredOnly) {
      setupProjectFilters(allProjects, container);
    }
  });
}

function renderProjectCards(container, list) {
  container.innerHTML = list.map((p, i) => `
    <div class="glass-card project-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}"
         data-category="${escapeAttr(p.category)}" data-title="${escapeAttr(p.title.toLowerCase())}">
      <div class="project-image">
        ${p.image ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}" loading="lazy">` : `<div class="project-image-placeholder">💻</div>`}
        <div class="project-image-overlay">
          ${p.github ? `<a href="${escapeAttr(p.github)}" target="_blank" rel="noopener" class="project-link-btn" aria-label="GitHub Repository" data-cursor-hover>⌥</a>` : ''}
          ${p.demo ? `<a href="${escapeAttr(p.demo)}" target="_blank" rel="noopener" class="project-link-btn" aria-label="Live Demo" data-cursor-hover>↗</a>` : ''}
        </div>
      </div>
      <div class="project-body">
        <span class="project-category-badge">${escapeHTML(p.category)}</span>
        <div class="project-title">${escapeHTML(p.title)}</div>
        <p class="project-desc">${escapeHTML(p.description)}</p>
        <div class="project-tech-tags">
          ${(p.techStack || []).map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('') || emptyState('No projects found.');
}

function setupProjectFilters(allProjects, container) {
  const filterBar = document.getElementById('project-filters');
  const searchInput = document.getElementById('project-search');
  if (!filterBar) return;

  const categories = ['All', ...new Set(allProjects.map(p => p.category))];
  filterBar.innerHTML = categories.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${escapeAttr(c)}">${escapeHTML(c)}</button>`
  ).join('');

  let currentFilter = 'All';
  let currentSearch = '';

  function applyFilters() {
    let list = allProjects;
    if (currentFilter !== 'All') list = list.filter(p => p.category === currentFilter);
    if (currentSearch) list = list.filter(p => p.title.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch));
    renderProjectCards(container, list);
    if (window.AOS) setTimeout(() => AOS.refresh(), 50);
  }

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilters();
  });

  searchInput?.addEventListener('input', () => {
    currentSearch = searchInput.value.toLowerCase().trim();
    applyFilters();
  });
}

// ── TESTIMONIALS ─────────────────────────────────────────────
function renderTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container) return;
  const list = RioJax.getTestimonials();
  container.innerHTML = list.map((t, i) => `
    <div class="glass-card testimonial-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
      <div class="testimonial-quote-icon">"</div>
      <p class="testimonial-text">${escapeHTML(t.content)}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${escapeHTML((t.name || '?').charAt(0))}</div>
        <div>
          <div class="testimonial-name">${escapeHTML(t.name)}</div>
          <div class="testimonial-role">${escapeHTML(t.role)}${t.company ? ' · ' + escapeHTML(t.company) : ''}</div>
          <div class="stars">${'★'.repeat(t.rating || 5)}</div>
        </div>
      </div>
    </div>
  `).join('') || emptyState('No testimonials yet.');
}

// ── BLOG PREVIEW (home) ──────────────────────────────────────
function renderBlogPreview() {
  const container = document.getElementById('blog-preview-grid');
  if (!container) return;
  const blogs = RioJax.getBlogs(true).filter(b => b.featured).slice(0, 3);
  container.innerHTML = blogs.map((b, i) => blogCardHTML(b, i)).join('') || emptyState('No blog posts yet.');
}

// ── BLOG FULL (blog page) ────────────────────────────────────
function renderBlogFull() {
  const container = document.getElementById('blog-full-grid');
  if (!container) return;
  const allBlogs = RioJax.getBlogs(true);

  renderBlogCards(container, allBlogs);
  setupBlogFilters(allBlogs, container);
}

function renderBlogCards(container, list) {
  container.innerHTML = list.map((b, i) => blogCardHTML(b, i)).join('') || emptyState('No blog posts found.');
}

function blogCardHTML(b, i) {
  return `
    <a href="blog-post.html?slug=${encodeURIComponent(b.slug)}" class="glass-card blog-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}"
       data-category="${escapeAttr(b.category)}" data-title="${escapeAttr(b.title.toLowerCase())}" data-tags="${escapeAttr((b.tags || []).join(' ').toLowerCase())}">
      <div class="blog-card-image">
        ${b.coverImage ? `<img src="${escapeAttr(b.coverImage)}" alt="${escapeAttr(b.title)}" loading="lazy">` : `<div class="blog-placeholder-icon">📰</div>`}
      </div>
      <div class="blog-card-body">
        <div class="blog-meta">
          <span class="blog-category-badge">${escapeHTML(b.category)}</span>
          <span>${formatDate(b.date)}</span>
          <span>${escapeHTML(b.readTime || '')}</span>
        </div>
        <div class="blog-title">${escapeHTML(b.title)}</div>
        <p class="blog-excerpt">${escapeHTML(stripHTML(b.content)).substring(0, 120)}...</p>
        <div class="blog-footer">
          <span class="read-more-link">Read More →</span>
        </div>
      </div>
    </a>
  `;
}

function setupBlogFilters(allBlogs, container) {
  const filterBar = document.getElementById('blog-filters');
  const searchInput = document.getElementById('blog-search');
  if (!filterBar) return;

  const categories = ['All', ...new Set(allBlogs.map(b => b.category))];
  filterBar.innerHTML = categories.map((c, i) =>
    `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${escapeAttr(c)}">${escapeHTML(c)}</button>`
  ).join('');

  let currentFilter = 'All';
  let currentSearch = '';

  function applyFilters() {
    let list = allBlogs;
    if (currentFilter !== 'All') list = list.filter(b => b.category === currentFilter);
    if (currentSearch) list = list.filter(b =>
      b.title.toLowerCase().includes(currentSearch) ||
      (b.tags || []).some(t => t.toLowerCase().includes(currentSearch))
    );
    renderBlogCards(container, list);
    if (window.AOS) setTimeout(() => AOS.refresh(), 50);
  }

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilters();
  });

  searchInput?.addEventListener('input', () => {
    currentSearch = searchInput.value.toLowerCase().trim();
    applyFilters();
  });
}

// ── BLOG POST PAGE ────────────────────────────────────────────
function renderBlogPost() {
  const container = document.getElementById('blog-post-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const blog = RioJax.getBlogs(true).find(b => b.slug === slug);

  if (!blog) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px 0;">
        <h1 class="section-title">Post Not Found</h1>
        <p class="section-desc" style="margin-bottom:24px;">The blog post you're looking for doesn't exist or has been unpublished.</p>
        <a href="blog.html" class="btn-primary" data-magnetic>Back to Blog</a>
      </div>`;
    return;
  }

  document.title = `${blog.title} | Rio Jax Blog`;

  container.innerHTML = `
    <div class="blog-post-header" data-aos="fade-up">
      <span class="blog-category-badge">${escapeHTML(blog.category)}</span>
      <h1 class="blog-post-title" style="margin-top:14px;">${escapeHTML(blog.title)}</h1>
      <div class="blog-post-meta">
        <span>✍️ ${escapeHTML(blog.author)}</span>
        <span>📅 ${formatDate(blog.date)}</span>
        <span>⏱️ ${escapeHTML(blog.readTime || '')}</span>
      </div>
    </div>
    ${blog.coverImage ? `<div class="blog-card-image" style="height:320px;border-radius:var(--radius-lg);margin-bottom:32px;border:1px solid var(--border);"><img src="${escapeAttr(blog.coverImage)}" alt="${escapeAttr(blog.title)}"></div>` : ''}
    <div class="blog-post-content" data-aos="fade-up">${blog.content}</div>
    <div class="blog-tags" style="margin:32px 0;">
      ${(blog.tags || []).map(t => `<span class="blog-tag">#${escapeHTML(t)}</span>`).join('')}
    </div>
    <div style="display:flex; gap:12px; align-items:center; padding:24px 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); margin-bottom:48px;">
      <span class="form-label" style="margin:0;">Share:</span>
      <button class="share-btn" onclick="shareToTwitter('${escapeAttr(blog.title)}')">🐦 Twitter</button>
      <button class="share-btn" onclick="shareToLinkedIn()">💼 LinkedIn</button>
      <button class="share-btn" onclick="copyLink()">🔗 Copy Link</button>
    </div>
  `;

  renderRelatedArticles(blog);
}

function renderRelatedArticles(currentBlog) {
  const container = document.getElementById('related-articles');
  if (!container) return;
  const all = RioJax.getBlogs(true).filter(b => b.id !== currentBlog.id);
  const related = all.filter(b => b.category === currentBlog.category).slice(0, 3);
  const list = related.length ? related : all.slice(0, 3);

  if (!list.length) {
    container.closest('section')?.remove();
    return;
  }

  container.innerHTML = list.map((b, i) => blogCardHTML(b, i)).join('');
}

function shareToTwitter(title) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(title);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}
function shareToLinkedIn() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard!', 'success'));
}

// ── SERVICES ────────────────────────────────────────────────
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;
  const list = RioJax.getData('services');
  container.innerHTML = list.map((s, i) => `
    <div class="glass-card service-card" data-aos="fade-up" data-aos-delay="${(i % 4) * 80}">
      <div class="service-icon-wrap">${s.icon}</div>
      <div class="service-title">${escapeHTML(s.title)}</div>
      <p class="service-desc">${escapeHTML(s.description)}</p>
      <div class="service-price">${escapeHTML(s.price)}</div>
    </div>
  `).join('');
}

// ── GITHUB REPOS ────────────────────────────────────────────
function renderRepos() {
  const container = document.getElementById('repos-grid');
  if (!container) return;
  const repos = RioJax.getRepos();
  container.innerHTML = repos.map((r, i) => `
    <a href="${escapeAttr(r.url)}" target="_blank" rel="noopener" class="glass-card repo-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
      <div class="repo-header">
        <span class="repo-icon">📦</span>
        <span class="repo-name">${escapeHTML(r.name)}</span>
      </div>
      <p class="repo-desc">${escapeHTML(r.description)}</p>
      <div class="repo-meta">
        <span>${escapeHTML(r.language || '')}</span>
        <span class="repo-stars">★ ${r.stars || 0}</span>
      </div>
    </a>
  `).join('') || emptyState('No repositories added yet.');
}

// ── ACHIEVEMENTS ────────────────────────────────────────────
function renderAchievements() {
  const container = document.getElementById('achievements-list');
  if (!container) return;
  const list = RioJax.getAchievements();
  container.innerHTML = list.map((a, i) => `
    <div class="timeline-item" data-aos="fade-up" data-aos-delay="${(i % 3) * 80}">
      <div class="timeline-period">${a.icon || '🏆'} ${escapeHTML(a.date)} · ${escapeHTML(a.type)}</div>
      <div class="timeline-title">${escapeHTML(a.title)}</div>
      <div class="timeline-desc">${escapeHTML(a.description)}</div>
    </div>
  `).join('') || emptyState('No achievements added yet.');
}

// ── STATS SECTION (security dashboard) ──────────────────────
function renderStatsSection() {
  const container = document.getElementById('stats-row');
  if (!container) return;
  const stats = RioJax.getStats();
  const items = [
    { num: stats.projectsCompleted, label: 'Projects Completed', suffix: '' },
    { num: stats.certificationsEarned, label: 'Certifications', suffix: '' },
    { num: stats.ctfsSolved, label: 'CTFs Solved', suffix: '' },
    { num: stats.githubContributions, label: 'GitHub Contributions', suffix: '+' },
    { num: stats.hoursOfLearning, label: 'Hours of Learning', suffix: '+' },
  ];
  container.innerHTML = items.map(it => `
    <div class="glass-card stat-card" data-aos="zoom-in">
      <div class="stat-number" data-count="${it.num}">0</div>
      <div class="stat-label">${it.label}</div>
    </div>
  `).join('');
  animateCounters(container);
}

// ── ABOUT PAGE ────────────────────────────────────────────────
function renderAboutPage() {
  const container = document.getElementById('about-bio-content');
  if (!container) return;
  const profile = RioJax.getProfile();
  container.innerHTML = `
    <h2>Who Am I?</h2>
    <p>${escapeHTML(profile.bio)}</p>
    <p>${escapeHTML(profile.bioExtended)}</p>
    <div class="about-tags">
      ${profile.roles.map(r => `<span class="about-tag">${escapeHTML(r)}</span>`).join('')}
    </div>
  `;
}

// ── CONTACT INFO ──────────────────────────────────────────────
function renderContactInfo() {
  const container = document.getElementById('contact-info-items');
  if (!container) return;
  const profile = RioJax.getProfile();
  const items = [
    { icon: '✉️', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: '📷', label: 'Instagram', value: '@' + profile.instagram, href: `https://instagram.com/${profile.instagram}` },
    { icon: '🐙', label: 'GitHub', value: profile.github, href: `https://github.com/${profile.github}` },
    { icon: '📍', label: 'Location', value: profile.location, href: null },
  ];
  container.innerHTML = items.filter(it => it.value).map(it => `
    <div class="contact-item">
      <div class="contact-item-icon">${it.icon}</div>
      <div>
        <div class="contact-item-label">${it.label}</div>
        ${it.href ? `<a href="${escapeAttr(it.href)}" target="_blank" rel="noopener" class="contact-item-value">${escapeHTML(it.value)}</a>` : `<div class="contact-item-value">${escapeHTML(it.value)}</div>`}
      </div>
    </div>
  `).join('');
}

// ── RESUME PAGE ────────────────────────────────────────────────
function renderResume() {
  const frame = document.getElementById('resume-frame');
  const downloadBtn = document.getElementById('resume-download-btn');
  if (!frame && !downloadBtn) return;
  const profile = RioJax.getProfile();

  if (downloadBtn) {
    if (profile.resumeUrl && profile.resumeUrl !== '#') {
      downloadBtn.href = profile.resumeUrl;
      downloadBtn.removeAttribute('disabled');
    } else {
      downloadBtn.href = '#';
    }
  }

  if (frame) {
    if (profile.resumeUrl && profile.resumeUrl !== '#' && profile.resumeUrl.endsWith('.pdf')) {
      frame.innerHTML = `<iframe src="${escapeAttr(profile.resumeUrl)}" style="width:100%;height:600px;border:none;border-radius:var(--radius-lg);"></iframe>`;
    } else {
      frame.innerHTML = `
        <div class="resume-placeholder">
          <div class="resume-placeholder-icon">📄</div>
          <p style="color:var(--text-muted);">No resume uploaded yet.</p>
          <p style="color:var(--text-dim); font-size:0.85rem; margin-top:8px;">Upload via the Admin Dashboard to display it here.</p>
        </div>`;
    }
  }
}

// ── UTILITY FUNCTIONS ─────────────────────────────────────────
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function escapeAttr(str) { return escapeHTML(str); }
function stripHTML(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return dateStr; }
}
function emptyState(message) {
  return `<div style="grid-column:1/-1; text-align:center; padding:60px 20px; color:var(--text-dim);">
    <div style="font-size:2.5rem; margin-bottom:12px; opacity:0.3;">∅</div>
    <p>${escapeHTML(message)}</p>
  </div>`;
}
