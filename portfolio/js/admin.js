// ============================================================
// RIO JAX — ADMIN DASHBOARD JAVASCRIPT
// Full CMS: Login, All CRUD, Session Management
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
  initAdminLogin();
});

// ── AUTH ────────────────────────────────────────────────────
function checkAdminAuth() {
  const loginPage = document.getElementById('admin-login-page');
  const adminApp = document.getElementById('admin-app');

  if (RioJax.isAdminLoggedIn()) {
    loginPage.style.display = 'none';
    adminApp.style.display = 'flex';
    initAdminApp();
  } else {
    loginPage.style.display = 'flex';
    adminApp.style.display = 'none';
  }
}

function initAdminLogin() {
  const form = document.getElementById('admin-login-form');
  const errorEl = document.getElementById('admin-login-error');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    if (RioJax.verifyAdmin(username, password)) {
      RioJax.setAdminSession();
      checkAdminAuth();
    } else {
      errorEl.classList.add('show');
      errorEl.textContent = '✕ Invalid credentials. Try admin / admin123';
      setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
  });
}

// ── INACTIVITY TIMEOUT ──────────────────────────────────────
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  RioJax.refreshAdminSession();
  inactivityTimer = setTimeout(() => {
    adminLogout('Session expired due to inactivity.');
  }, 30 * 60 * 1000); // 30 min
}

function adminLogout(msg = '') {
  RioJax.clearAdminSession();
  if (msg) showToast(msg, 'error');
  setTimeout(() => location.reload(), 500);
}

// ── ADMIN APP INIT ──────────────────────────────────────────
function initAdminApp() {
  // Inactivity tracking
  ['mousemove', 'keydown', 'click', 'scroll'].forEach(e =>
    document.addEventListener(e, resetInactivityTimer, { passive: true })
  );
  resetInactivityTimer();

  // Logout buttons
  document.querySelectorAll('.admin-logout-btn').forEach(btn => {
    btn.addEventListener('click', () => adminLogout());
  });

  // Nav tabs
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const panel = item.dataset.panel;
      if (!panel) return;
      document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      const panelEl = document.getElementById(`panel-${panel}`);
      if (panelEl) panelEl.classList.add('active');
      updateAdminTitle(item.textContent.trim());
      loadPanel(panel);
    });
  });

  // Load dashboard by default
  loadPanel('dashboard');
  updateAdminStats();
}

function updateAdminTitle(text) {
  const title = document.getElementById('admin-page-title');
  if (title) title.textContent = text.replace(/^[^\w\s]+/, '').trim();
}

function loadPanel(panel) {
  const loaders = {
    dashboard: loadDashboard,
    profile: loadProfile,
    skills: loadSkillsPanel,
    projects: loadProjectsPanel,
    blogs: loadBlogsPanel,
    certs: loadCertsPanel,
    testimonials: loadTestimonialsPanel,
    achievements: loadAchievementsPanel,
    contacts: loadContactsPanel,
    repos: loadReposPanel,
    services: loadServicesPanel,
    seo: loadSEOPanel,
    settings: loadSettingsPanel,
    password: loadPasswordPanel,
  };
  if (loaders[panel]) loaders[panel]();
}

// ── DASHBOARD ───────────────────────────────────────────────
function loadDashboard() {
  const el = document.getElementById('dash-stats');
  if (!el) return;
  const items = [
    { label: 'Projects', val: RioJax.getProjects().length, icon: '💻' },
    { label: 'Skills', val: RioJax.getSkills().length, icon: '⚡' },
    { label: 'Blog Posts', val: RioJax.getBlogs().length, icon: '📝' },
    { label: 'Messages', val: RioJax.getContacts().length, icon: '✉️' },
    { label: 'Certifications', val: RioJax.getCertifications().length, icon: '🏅' },
    { label: 'Testimonials', val: RioJax.getTestimonials().length, icon: '⭐' },
  ];
  el.innerHTML = items.map(it => `
    <div class="admin-stat-card">
      <span style="font-size:1.8rem;">${it.icon}</span>
      <span class="admin-stat-num">${it.val}</span>
      <span class="admin-stat-label">${it.label}</span>
    </div>
  `).join('');
}

function updateAdminStats() { loadDashboard(); }

// ── PROFILE ─────────────────────────────────────────────────
function loadProfile() {
  const p = RioJax.getProfile();
  const fields = ['name','nickname','tagline','bio','bioExtended','email','instagram','github','linkedin','twitter','location','availability','resumeUrl','heroSubtitle'];
  fields.forEach(f => {
    const el = document.getElementById(`pf-${f}`);
    if (el) el.value = p[f] || '';
  });
}

function saveProfile() {
  const fields = ['name','nickname','tagline','bio','bioExtended','email','instagram','github','linkedin','twitter','location','availability','resumeUrl','heroSubtitle'];
  const data = {};
  fields.forEach(f => {
    const el = document.getElementById(`pf-${f}`);
    if (el) data[f] = el.value.trim();
  });
  RioJax.setProfile(data);
  showToast('✅ Profile saved!', 'success');
}

// ── SKILLS ──────────────────────────────────────────────────
function loadSkillsPanel() {
  renderSkillsTable();
}

function renderSkillsTable() {
  const tbody = document.getElementById('skills-table-body');
  if (!tbody) return;
  const skills = RioJax.getSkills();
  tbody.innerHTML = skills.map(s => `
    <tr>
      <td>${s.icon || ''} ${escA(s.name)}</td>
      <td>${escA(s.category)}</td>
      <td>
        <div class="skill-bar-track" style="width:80px;display:inline-block;"><div class="skill-bar-fill" style="width:${s.level}%;"></div></div>
        <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--accent);margin-left:6px;">${s.level}%</span>
      </td>
      <td><span class="admin-badge ${s.featured ? 'success' : 'warn'}">${s.featured ? 'Yes' : 'No'}</span></td>
      <td>
        <button class="admin-btn-sm" onclick="editSkill(${s.id})">Edit</button>
        <button class="admin-btn-sm danger" onclick="deleteSkill(${s.id})" style="margin-left:6px;">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No skills yet.</td></tr>';
}

function openSkillModal(skill = null) {
  const modal = document.getElementById('skill-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('skill-modal-title').textContent = skill ? 'Edit Skill' : 'Add Skill';
  document.getElementById('skill-id').value = skill ? skill.id : '';
  document.getElementById('skill-name').value = skill ? skill.name : '';
  document.getElementById('skill-category').value = skill ? skill.category : 'Cyber Security';
  document.getElementById('skill-level').value = skill ? skill.level : 70;
  document.getElementById('skill-icon').value = skill ? skill.icon : '';
  document.getElementById('skill-featured').checked = skill ? !!skill.featured : false;
}

function closeSkillModal() {
  const modal = document.getElementById('skill-modal');
  if (modal) modal.style.display = 'none';
}

function editSkill(id) {
  const skill = RioJax.getSkills().find(s => s.id == id);
  if (skill) openSkillModal(skill);
}

function deleteSkill(id) {
  if (confirm('Delete this skill?')) {
    RioJax.deleteSkill(id);
    renderSkillsTable();
    showToast('Skill deleted.', 'success');
  }
}

function saveSkill() {
  const id = document.getElementById('skill-id').value;
  const data = {
    name: document.getElementById('skill-name').value.trim(),
    category: document.getElementById('skill-category').value,
    level: parseInt(document.getElementById('skill-level').value, 10),
    icon: document.getElementById('skill-icon').value.trim(),
    featured: document.getElementById('skill-featured').checked,
  };
  if (!data.name) { showToast('Skill name is required.', 'error'); return; }
  if (id) RioJax.updateSkill(id, data);
  else RioJax.addSkill(data);
  closeSkillModal();
  renderSkillsTable();
  showToast(id ? 'Skill updated!' : 'Skill added!', 'success');
}

// ── PROJECTS ─────────────────────────────────────────────────
function loadProjectsPanel() {
  renderProjectsTable();
}

function renderProjectsTable() {
  const tbody = document.getElementById('projects-table-body');
  if (!tbody) return;
  const projects = RioJax.getProjects();
  tbody.innerHTML = projects.map(p => `
    <tr>
      <td>${escA(p.title)}</td>
      <td>${escA(p.category)}</td>
      <td>${escA(p.status || '')}</td>
      <td><span class="admin-badge ${p.featured ? 'success' : 'warn'}">${p.featured ? 'Featured' : 'Normal'}</span></td>
      <td>
        <button class="admin-btn-sm" onclick="editProject(${p.id})">Edit</button>
        <button class="admin-btn-sm danger" onclick="deleteProject(${p.id})" style="margin-left:6px;">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No projects yet.</td></tr>';
}

function openProjectModal(proj = null) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('proj-modal-title').textContent = proj ? 'Edit Project' : 'Add Project';
  document.getElementById('proj-id').value = proj ? proj.id : '';
  document.getElementById('proj-title').value = proj ? proj.title : '';
  document.getElementById('proj-description').value = proj ? proj.description : '';
  document.getElementById('proj-category').value = proj ? proj.category : 'Web Development';
  document.getElementById('proj-techstack').value = proj ? (proj.techStack || []).join(', ') : '';
  document.getElementById('proj-github').value = proj ? proj.github : '';
  document.getElementById('proj-demo').value = proj ? proj.demo : '';
  document.getElementById('proj-image').value = proj ? proj.image : '';
  document.getElementById('proj-status').value = proj ? (proj.status || 'Completed') : 'Completed';
  document.getElementById('proj-year').value = proj ? (proj.year || new Date().getFullYear()) : new Date().getFullYear();
  document.getElementById('proj-featured').checked = proj ? !!proj.featured : false;
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.style.display = 'none';
}

function editProject(id) {
  const proj = RioJax.getProjects().find(p => p.id == id);
  if (proj) openProjectModal(proj);
}

function deleteProject(id) {
  if (confirm('Delete this project?')) {
    RioJax.deleteProject(id);
    renderProjectsTable();
    showToast('Project deleted.', 'success');
  }
}

function saveProject() {
  const id = document.getElementById('proj-id').value;
  const techStackStr = document.getElementById('proj-techstack').value;
  const data = {
    title: document.getElementById('proj-title').value.trim(),
    description: document.getElementById('proj-description').value.trim(),
    category: document.getElementById('proj-category').value,
    techStack: techStackStr.split(',').map(s => s.trim()).filter(Boolean),
    github: document.getElementById('proj-github').value.trim(),
    demo: document.getElementById('proj-demo').value.trim(),
    image: document.getElementById('proj-image').value.trim(),
    status: document.getElementById('proj-status').value,
    year: document.getElementById('proj-year').value,
    featured: document.getElementById('proj-featured').checked,
  };
  if (!data.title) { showToast('Project title is required.', 'error'); return; }
  if (id) RioJax.updateProject(id, data);
  else RioJax.addProject(data);
  closeProjectModal();
  renderProjectsTable();
  showToast(id ? 'Project updated!' : 'Project added!', 'success');
}

// ── BLOGS ────────────────────────────────────────────────────
function loadBlogsPanel() {
  renderBlogsTable();
}

function renderBlogsTable() {
  const tbody = document.getElementById('blogs-table-body');
  if (!tbody) return;
  const blogs = RioJax.getBlogs();
  tbody.innerHTML = blogs.map(b => `
    <tr>
      <td>${escA(b.title)}</td>
      <td>${escA(b.category)}</td>
      <td>${escA(b.date)}</td>
      <td><span class="admin-badge ${b.published ? 'success' : 'warn'}">${b.published ? 'Published' : 'Draft'}</span></td>
      <td>
        <button class="admin-btn-sm" onclick="editBlog(${b.id})">Edit</button>
        <button class="admin-btn-sm" onclick="toggleBlogPublish(${b.id}, ${b.published})" style="margin-left:6px;">${b.published ? 'Unpublish' : 'Publish'}</button>
        <button class="admin-btn-sm danger" onclick="deleteBlog(${b.id})" style="margin-left:6px;">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No blog posts yet.</td></tr>';
}

function openBlogModal(blog = null) {
  const modal = document.getElementById('blog-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('blog-modal-title').textContent = blog ? 'Edit Blog Post' : 'New Blog Post';
  document.getElementById('blog-id').value = blog ? blog.id : '';
  document.getElementById('blog-title').value = blog ? blog.title : '';
  document.getElementById('blog-slug').value = blog ? blog.slug : '';
  document.getElementById('blog-category').value = blog ? blog.category : 'Cyber Security';
  document.getElementById('blog-tags').value = blog ? (blog.tags || []).join(', ') : '';
  document.getElementById('blog-cover').value = blog ? blog.coverImage : '';
  document.getElementById('blog-author').value = blog ? blog.author : 'Rio Jax';
  document.getElementById('blog-date').value = blog ? blog.date : new Date().toISOString().split('T')[0];
  document.getElementById('blog-readtime').value = blog ? blog.readTime : '5 min read';
  document.getElementById('blog-content').value = blog ? blog.content : '';
  document.getElementById('blog-published').checked = blog ? !!blog.published : false;
  document.getElementById('blog-featured').checked = blog ? !!blog.featured : false;
}

function closeBlogModal() {
  const modal = document.getElementById('blog-modal');
  if (modal) modal.style.display = 'none';
}

function editBlog(id) {
  const blog = RioJax.getBlogs().find(b => b.id == id);
  if (blog) openBlogModal(blog);
}

function deleteBlog(id) {
  if (confirm('Delete this blog post?')) {
    RioJax.deleteBlog(id);
    renderBlogsTable();
    showToast('Blog post deleted.', 'success');
  }
}

function toggleBlogPublish(id, current) {
  RioJax.updateBlog(id, { published: !current });
  renderBlogsTable();
  showToast(current ? 'Blog unpublished.' : 'Blog published!', 'success');
}

function generateSlug() {
  const title = document.getElementById('blog-title').value.trim();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  document.getElementById('blog-slug').value = slug;
}

function saveBlog() {
  const id = document.getElementById('blog-id').value;
  const tagsStr = document.getElementById('blog-tags').value;
  const data = {
    title: document.getElementById('blog-title').value.trim(),
    slug: document.getElementById('blog-slug').value.trim(),
    category: document.getElementById('blog-category').value,
    tags: tagsStr.split(',').map(t => t.trim()).filter(Boolean),
    coverImage: document.getElementById('blog-cover').value.trim(),
    author: document.getElementById('blog-author').value.trim() || 'Rio Jax',
    date: document.getElementById('blog-date').value,
    readTime: document.getElementById('blog-readtime').value.trim(),
    content: document.getElementById('blog-content').value,
    published: document.getElementById('blog-published').checked,
    featured: document.getElementById('blog-featured').checked,
  };
  if (!data.title) { showToast('Blog title is required.', 'error'); return; }
  if (!data.slug) {
    data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  if (id) RioJax.updateBlog(id, data);
  else RioJax.addBlog(data);
  closeBlogModal();
  renderBlogsTable();
  showToast(id ? 'Blog updated!' : 'Blog post created!', 'success');
}

// ── CERTIFICATIONS ────────────────────────────────────────────
function loadCertsPanel() {
  renderCertsTable();
}

function renderCertsTable() {
  const tbody = document.getElementById('certs-table-body');
  if (!tbody) return;
  const certs = RioJax.getCertifications();
  tbody.innerHTML = certs.map(c => `
    <tr>
      <td>${escA(c.title)}</td>
      <td>${escA(c.issuer)}</td>
      <td>${escA(c.date)}</td>
      <td><span class="admin-badge ${c.featured ? 'success' : 'warn'}">${c.featured ? 'Featured' : 'Normal'}</span></td>
      <td>
        <button class="admin-btn-sm" onclick="editCert(${c.id})">Edit</button>
        <button class="admin-btn-sm danger" onclick="deleteCert(${c.id})" style="margin-left:6px;">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No certifications yet.</td></tr>';
}

function openCertModal(cert = null) {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('cert-id').value = cert ? cert.id : '';
  document.getElementById('cert-title').value = cert ? cert.title : '';
  document.getElementById('cert-issuer').value = cert ? cert.issuer : '';
  document.getElementById('cert-date').value = cert ? cert.date : '';
  document.getElementById('cert-credentialid').value = cert ? (cert.credentialId || '') : '';
  document.getElementById('cert-url').value = cert ? (cert.url || '') : '';
  document.getElementById('cert-featured').checked = cert ? !!cert.featured : false;
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) modal.style.display = 'none';
}

function editCert(id) {
  const cert = RioJax.getCertifications().find(c => c.id == id);
  if (cert) openCertModal(cert);
}

function deleteCert(id) {
  if (confirm('Delete this certification?')) {
    RioJax.deleteCertification(id);
    renderCertsTable();
    showToast('Certification deleted.', 'success');
  }
}

function saveCert() {
  const id = document.getElementById('cert-id').value;
  const data = {
    title: document.getElementById('cert-title').value.trim(),
    issuer: document.getElementById('cert-issuer').value.trim(),
    date: document.getElementById('cert-date').value.trim(),
    credentialId: document.getElementById('cert-credentialid').value.trim(),
    url: document.getElementById('cert-url').value.trim(),
    featured: document.getElementById('cert-featured').checked,
  };
  if (!data.title) { showToast('Title is required.', 'error'); return; }
  if (id) RioJax.updateCertification(id, data);
  else RioJax.addCertification(data);
  closeCertModal();
  renderCertsTable();
  showToast(id ? 'Certification updated!' : 'Certification added!', 'success');
}

// ── TESTIMONIALS ──────────────────────────────────────────────
function loadTestimonialsPanel() {
  renderTestimonialsTable();
}

function renderTestimonialsTable() {
  const tbody = document.getElementById('testi-table-body');
  if (!tbody) return;
  const list = RioJax.getTestimonials();
  tbody.innerHTML = list.map(t => `
    <tr>
      <td>${escA(t.name)}</td>
      <td>${escA(t.role)} @ ${escA(t.company)}</td>
      <td>${'★'.repeat(t.rating || 5)}</td>
      <td>
        <button class="admin-btn-sm" onclick="editTestimonial(${t.id})">Edit</button>
        <button class="admin-btn-sm danger" onclick="deleteTestimonial(${t.id})" style="margin-left:6px;">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--text-dim);padding:24px;">No testimonials yet.</td></tr>';
}

function openTestimonialModal(t = null) {
  const modal = document.getElementById('testi-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('testi-id').value = t ? t.id : '';
  document.getElementById('testi-name').value = t ? t.name : '';
  document.getElementById('testi-role').value = t ? t.role : '';
  document.getElementById('testi-company').value = t ? (t.company || '') : '';
  document.getElementById('testi-content').value = t ? t.content : '';
  document.getElementById('testi-rating').value = t ? (t.rating || 5) : 5;
  document.getElementById('testi-featured').checked = t ? !!t.featured : true;
}

function closeTestimonialModal() {
  const modal = document.getElementById('testi-modal');
  if (modal) modal.style.display = 'none';
}

function editTestimonial(id) {
  const t = RioJax.getTestimonials().find(t => t.id == id);
  if (t) openTestimonialModal(t);
}

function deleteTestimonial(id) {
  if (confirm('Delete this testimonial?')) {
    RioJax.deleteTestimonial(id);
    renderTestimonialsTable();
    showToast('Testimonial deleted.', 'success');
  }
}

function saveTestimonial() {
  const id = document.getElementById('testi-id').value;
  const data = {
    name: document.getElementById('testi-name').value.trim(),
    role: document.getElementById('testi-role').value.trim(),
    company: document.getElementById('testi-company').value.trim(),
    content: document.getElementById('testi-content').value.trim(),
    rating: parseInt(document.getElementById('testi-rating').value, 10),
    featured: document.getElementById('testi-featured').checked,
  };
  if (!data.name || !data.content) { showToast('Name and content are required.', 'error'); return; }
  if (id) RioJax.updateTestimonial(id, data);
  else RioJax.addTestimonial(data);
  closeTestimonialModal();
  renderTestimonialsTable();
  showToast(id ? 'Testimonial updated!' : 'Testimonial added!', 'success');
}

// ── ACHIEVEMENTS ──────────────────────────────────────────────
function loadAchievementsPanel() {
  renderAchievementsTable();
}

function renderAchievementsTable() {
  const tbody = document.getElementById('ach-table-body');
  if (!tbody) return;
  const list = RioJax.getAchievements();
  tbody.innerHTML = list.map(a => `
    <tr>
      <td>${a.icon || '🏆'} ${escA(a.title)}</td>
      <td>${escA(a.type)}</td>
      <td>${escA(a.date)}</td>
      <td>
        <button class="admin-btn-sm danger" onclick="deleteAchievement(${a.id})">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--text-dim);padding:24px;">No achievements yet.</td></tr>';
}

function addAchievementInline() {
  const data = {
    title: document.getElementById('ach-title').value.trim(),
    type: document.getElementById('ach-type').value,
    date: document.getElementById('ach-date').value.trim(),
    description: document.getElementById('ach-desc').value.trim(),
    icon: document.getElementById('ach-icon').value.trim() || '🏆',
  };
  if (!data.title) { showToast('Title is required.', 'error'); return; }
  RioJax.addAchievement(data);
  renderAchievementsTable();
  showToast('Achievement added!', 'success');
  ['ach-title','ach-date','ach-desc','ach-icon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function deleteAchievement(id) {
  if (confirm('Delete this achievement?')) {
    RioJax.deleteAchievement(id);
    renderAchievementsTable();
    showToast('Achievement deleted.', 'success');
  }
}

// ── CONTACTS ──────────────────────────────────────────────────
function loadContactsPanel() {
  renderContactsTable();
}

function renderContactsTable() {
  const tbody = document.getElementById('contacts-table-body');
  if (!tbody) return;
  const msgs = RioJax.getContacts();
  tbody.innerHTML = msgs.map(m => `
    <tr style="${!m.read ? 'background:rgba(0,245,212,0.03);' : ''}">
      <td>${escA(m.name)} ${!m.read ? '<span class="admin-badge success" style="margin-left:6px;font-size:0.55rem;">NEW</span>' : ''}</td>
      <td>${escA(m.email)}</td>
      <td>${escA(m.subject || '')}</td>
      <td>${escA(new Date(m.date).toLocaleDateString())}</td>
      <td>
        <button class="admin-btn-sm" onclick="viewContact(${m.id})">View</button>
        <button class="admin-btn-sm danger" onclick="deleteContact(${m.id})" style="margin-left:6px;">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No messages yet.</td></tr>';
}

function viewContact(id) {
  const m = RioJax.getContacts().find(c => c.id == id);
  if (!m) return;
  RioJax.markContactRead(id);
  const modal = document.getElementById('contact-view-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.getElementById('contact-view-body').innerHTML = `
    <div style="margin-bottom:14px;"><span class="admin-label">From</span><div>${escA(m.name)} &lt;${escA(m.email)}&gt;</div></div>
    ${m.phone ? `<div style="margin-bottom:14px;"><span class="admin-label">Phone</span><div>${escA(m.phone)}</div></div>` : ''}
    <div style="margin-bottom:14px;"><span class="admin-label">Subject</span><div>${escA(m.subject || '(No Subject)')}</div></div>
    <div style="margin-bottom:14px;"><span class="admin-label">Date</span><div>${new Date(m.date).toLocaleString()}</div></div>
    <div><span class="admin-label">Message</span><div style="white-space:pre-wrap; margin-top:6px; padding:16px; background:var(--surface); border-radius:var(--radius); border:1px solid var(--border); font-size:0.9rem; color:var(--text-muted);">${escA(m.message)}</div></div>
  `;
  renderContactsTable();
}

function closeContactModal() {
  const modal = document.getElementById('contact-view-modal');
  if (modal) modal.style.display = 'none';
}

function deleteContact(id) {
  if (confirm('Delete this message?')) {
    RioJax.deleteContact(id);
    renderContactsTable();
    showToast('Message deleted.', 'success');
  }
}

function exportContacts() {
  const msgs = RioJax.getContacts();
  const csv = [
    ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Date'],
    ...msgs.map(m => [m.name, m.email, m.phone || '', m.subject || '', m.message.replace(/,/g,''), new Date(m.date).toLocaleString()])
  ].map(row => row.map(c => `"${c}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'riojax-contacts.csv';
  a.click();
  showToast('Contacts exported as CSV!', 'success');
}

// ── GITHUB REPOS ──────────────────────────────────────────────
function loadReposPanel() {
  renderReposTable();
}

function renderReposTable() {
  const tbody = document.getElementById('repos-table-body');
  if (!tbody) return;
  const repos = RioJax.getRepos();
  tbody.innerHTML = repos.map(r => `
    <tr>
      <td>${escA(r.name)}</td>
      <td>${escA(r.description)}</td>
      <td>${escA(r.language || '')}</td>
      <td>${r.stars || 0} ★</td>
      <td>
        <button class="admin-btn-sm danger" onclick="deleteRepo(${r.id})">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:24px;">No repos yet.</td></tr>';
}

function addRepoInline() {
  const data = {
    name: document.getElementById('repo-name').value.trim(),
    description: document.getElementById('repo-desc').value.trim(),
    url: document.getElementById('repo-url').value.trim(),
    language: document.getElementById('repo-lang').value.trim(),
    stars: parseInt(document.getElementById('repo-stars').value, 10) || 0,
    featured: true,
  };
  if (!data.name) { showToast('Repository name is required.', 'error'); return; }
  RioJax.addRepo(data);
  renderReposTable();
  showToast('Repository added!', 'success');
  ['repo-name','repo-desc','repo-url','repo-lang','repo-stars'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function deleteRepo(id) {
  if (confirm('Delete this repository?')) {
    RioJax.deleteRepo(id);
    renderReposTable();
    showToast('Repository deleted.', 'success');
  }
}

// ── SERVICES ──────────────────────────────────────────────────
function loadServicesPanel() {
  renderServicesTable();
}

function renderServicesTable() {
  const tbody = document.getElementById('services-table-body');
  if (!tbody) return;
  const services = RioJax.getData('services');
  tbody.innerHTML = services.map((s, i) => `
    <tr>
      <td>${s.icon} ${escA(s.title)}</td>
      <td>${escA(s.description.substring(0, 60))}...</td>
      <td>${escA(s.price)}</td>
      <td>
        <button class="admin-btn-sm danger" onclick="deleteService(${s.id})">Delete</button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="text-align:center;color:var(--text-dim);padding:24px;">No services yet.</td></tr>';
}

function addServiceInline() {
  const services = RioJax.getData('services');
  const newService = {
    id: Date.now(),
    title: document.getElementById('svc-title').value.trim(),
    description: document.getElementById('svc-desc').value.trim(),
    price: document.getElementById('svc-price').value.trim(),
    icon: document.getElementById('svc-icon').value.trim() || '⚙️',
    featured: true,
  };
  if (!newService.title) { showToast('Title is required.', 'error'); return; }
  services.push(newService);
  RioJax.setData('services', services);
  renderServicesTable();
  showToast('Service added!', 'success');
}

function deleteService(id) {
  if (confirm('Delete this service?')) {
    const services = RioJax.getData('services').filter(s => s.id != id);
    RioJax.setData('services', services);
    renderServicesTable();
    showToast('Service deleted.', 'success');
  }
}

// ── SEO ───────────────────────────────────────────────────────
function loadSEOPanel() {
  const p = RioJax.getProfile();
  const fields = ['siteTitle','metaDesc','metaKeywords'];
  fields.forEach(f => {
    const el = document.getElementById(`seo-${f}`);
    if (el) el.value = p[f] || '';
  });
}

function saveSEO() {
  const data = {
    siteTitle: document.getElementById('seo-siteTitle').value.trim(),
    metaDesc: document.getElementById('seo-metaDesc').value.trim(),
    metaKeywords: document.getElementById('seo-metaKeywords').value.trim(),
  };
  RioJax.setProfile(data);
  showToast('SEO settings saved!', 'success');
}

// ── SETTINGS ──────────────────────────────────────────────────
function loadSettingsPanel() {
  const s = RioJax.getSettings();
  const footerEl = document.getElementById('settings-footerText');
  if (footerEl) footerEl.value = s.footerText || '';
  const showBlog = document.getElementById('settings-showBlog');
  if (showBlog) showBlog.checked = s.showBlog !== false;
  const showTesti = document.getElementById('settings-showTestimonials');
  if (showTesti) showTesti.checked = s.showTestimonials !== false;
  const showSvc = document.getElementById('settings-showServices');
  if (showSvc) showSvc.checked = s.showServices !== false;
}

function saveSettings() {
  const data = {
    footerText: document.getElementById('settings-footerText').value.trim(),
    showBlog: document.getElementById('settings-showBlog').checked,
    showTestimonials: document.getElementById('settings-showTestimonials').checked,
    showServices: document.getElementById('settings-showServices').checked,
  };
  RioJax.setSettings(data);
  showToast('Settings saved!', 'success');
}

// ── PASSWORD ──────────────────────────────────────────────────
function loadPasswordPanel() {}

function changePassword() {
  const current = document.getElementById('pwd-current').value;
  const newPwd = document.getElementById('pwd-new').value;
  const confirm = document.getElementById('pwd-confirm').value;
  const creds = RioJax.getAdminCreds();

  if (current !== creds.password) { showToast('Current password is incorrect.', 'error'); return; }
  if (newPwd.length < 6) { showToast('New password must be at least 6 characters.', 'error'); return; }
  if (newPwd !== confirm) { showToast('Passwords do not match.', 'error'); return; }

  RioJax.updateAdminPassword(newPwd);
  showToast('Password changed successfully!', 'success');
  ['pwd-current','pwd-new','pwd-confirm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// ── UTILS ──────────────────────────────────────────────────────
function escA(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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

// ── MODAL CLOSE ON BACKDROP ────────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});
