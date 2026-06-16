// ============================================================
// RIO JAX PORTFOLIO - DATA MANAGEMENT LAYER
// All content stored and retrieved from localStorage
// ============================================================

const RioJax = {
  version: '2.0.0',

  defaults: {
    profile: {
      name: 'Dharshan S',
      nickname: 'Rio Jax',
      tagline: 'Cyber Security Student & Web Developer',
      roles: ['Cyber Security Student', 'Web Developer', 'Python Developer', 'Tech Enthusiast', 'Linux Enthusiast'],
      bio: 'I am Dharshan S, also known as Rio Jax. I am currently pursuing B.Tech Cyber Security and constantly exploring technology, cybersecurity, development, networking, Linux, and innovation. I aim to become a well-rounded tech professional and continuously learn, build, and grow.',
      bioExtended: 'Passionate about the intersection of security and technology, I spend my time breaking things apart to understand how they work — and then building them better. From crafting web experiences with pixel-perfect precision to diving deep into the layers of network protocols and vulnerability research, I embrace every challenge as a step toward mastery.',
      email: 'dharshan.rio13@gmail.com',
      instagram: 'mr_rio_jax',
      github: 'dharshan-rio13',
      linkedin: '',
      twitter: '',
      location: 'India',
      availability: 'Open to Opportunities',
      avatar: '',
      resumeUrl: '#',
      heroSubtitle: 'Building Secure Digital Futures',
      siteTitle: 'Rio Jax | Cyber Security & Web Developer',
      metaDesc: 'Portfolio of Dharshan S (Rio Jax) — Cyber Security Student, Web Developer, Python Developer, and Tech Enthusiast.',
      metaKeywords: 'cyber security, web developer, python, linux, networking, portfolio, dharshan, rio jax',
      ogImage: '',
      accentColor: '#00f5d4',
      secondaryColor: '#8b5cf6',
    },

    skills: [
      { id: 1, name: 'Penetration Testing', category: 'Cyber Security', level: 70, icon: '🛡️', featured: true },
      { id: 2, name: 'Network Security', category: 'Cyber Security', level: 75, icon: '🔒', featured: true },
      { id: 3, name: 'OSINT', category: 'Cyber Security', level: 80, icon: '🔍', featured: true },
      { id: 4, name: 'Ethical Hacking', category: 'Cyber Security', level: 65, icon: '💻', featured: true },
      { id: 5, name: 'Vulnerability Assessment', category: 'Cyber Security', level: 72, icon: '⚠️', featured: false },
      { id: 6, name: 'HTML5', category: 'Web Development', level: 92, icon: '🌐', featured: true },
      { id: 7, name: 'CSS3 / Tailwind', category: 'Web Development', level: 88, icon: '🎨', featured: true },
      { id: 8, name: 'JavaScript', category: 'Web Development', level: 82, icon: '⚡', featured: true },
      { id: 9, name: 'Responsive Design', category: 'Web Development', level: 90, icon: '📱', featured: false },
      { id: 10, name: 'Python', category: 'Python Development', level: 85, icon: '🐍', featured: true },
      { id: 11, name: 'Automation Scripts', category: 'Python Development', level: 80, icon: '🤖', featured: true },
      { id: 12, name: 'Data Analysis', category: 'Python Development', level: 70, icon: '📊', featured: false },
      { id: 13, name: 'TCP/IP Protocols', category: 'Networking', level: 78, icon: '🌍', featured: true },
      { id: 14, name: 'Wireshark', category: 'Networking', level: 75, icon: '📡', featured: true },
      { id: 15, name: 'Linux Administration', category: 'Linux', level: 82, icon: '🐧', featured: true },
      { id: 16, name: 'Bash Scripting', category: 'Linux', level: 75, icon: '💾', featured: true },
      { id: 17, name: 'Git & GitHub', category: 'Tools & Technologies', level: 85, icon: '🔧', featured: true },
      { id: 18, name: 'Kali Linux', category: 'Tools & Technologies', level: 78, icon: '🖥️', featured: true },
      { id: 19, name: 'Nmap', category: 'Tools & Technologies', level: 74, icon: '🗺️', featured: false },
      { id: 20, name: 'Metasploit', category: 'Tools & Technologies', level: 65, icon: '⚔️', featured: false },
    ],

    projects: [
      {
        id: 1,
        title: 'Air Gesture Mouse',
        description: 'A webcam-based hand-tracking mouse controller using MediaPipe and Python. Features a customtkinter UI with cross-platform support for Windows and Linux. Uses computer vision to translate hand gestures into mouse movements and clicks.',
        image: '',
        category: 'Python Development',
        techStack: ['Python', 'MediaPipe', 'OpenCV', 'CustomTkinter'],
        github: '#',
        demo: '#',
        featured: true,
        status: 'Completed',
        year: '2025'
      },
      {
        id: 2,
        title: 'Network Scanner Tool',
        description: 'A Python-based network scanning utility that performs host discovery, port scanning, and service detection. Outputs detailed reports in both JSON and HTML formats for network auditing purposes.',
        image: '',
        category: 'Cyber Security',
        techStack: ['Python', 'Nmap', 'Socket', 'Scapy'],
        github: '#',
        demo: '',
        featured: true,
        status: 'Completed',
        year: '2025'
      },
      {
        id: 3,
        title: 'Personal Portfolio Website',
        description: 'A premium, futuristic personal portfolio website with dark/light themes, admin dashboard, blog CMS, and full animation suite. Built purely with HTML, Tailwind CSS, and Vanilla JavaScript.',
        image: '',
        category: 'Web Development',
        techStack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'GSAP', 'AOS'],
        github: '#',
        demo: '#',
        featured: true,
        status: 'Completed',
        year: '2025'
      },
      {
        id: 4,
        title: 'OSINT Framework Tool',
        description: 'An automated OSINT information gathering tool that aggregates data from multiple public sources. Helps security researchers collect and organize publicly available intelligence.',
        image: '',
        category: 'Cyber Security',
        techStack: ['Python', 'Requests', 'BeautifulSoup', 'SQLite'],
        github: '#',
        demo: '',
        featured: false,
        status: 'In Progress',
        year: '2025'
      },
      {
        id: 5,
        title: 'Cyber Quiz Platform',
        description: 'An interactive quiz platform focused on cybersecurity concepts. Features timed quizzes, leaderboards, and adaptive difficulty. Built to help students prepare for security certifications.',
        image: '',
        category: 'Web Development',
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
        github: '#',
        demo: '#',
        featured: false,
        status: 'Completed',
        year: '2024'
      },
    ],

    certifications: [
      { id: 1, title: 'Cybersecurity Fundamentals', issuer: 'Google', date: '2024', credentialId: 'GCS-2024', url: '#', image: '', featured: true },
      { id: 2, title: 'Python for Everybody', issuer: 'Coursera', date: '2024', credentialId: 'PY-C-2024', url: '#', image: '', featured: true },
      { id: 3, title: 'Web Development Bootcamp', issuer: 'Udemy', date: '2023', credentialId: 'WD-2023', url: '#', image: '', featured: false },
      { id: 4, title: 'Linux Essentials', issuer: 'NDG Linux', date: '2024', credentialId: 'LX-2024', url: '#', image: '', featured: true },
    ],

    education: [
      {
        id: 1,
        degree: 'B.Tech Cyber Security',
        institution: 'Currently Pursuing',
        location: 'India',
        period: '2023 – Present',
        description: 'Pursuing a comprehensive degree in Cyber Security, covering network security, cryptography, ethical hacking, digital forensics, and secure software development.',
        gpa: '',
        achievements: ['Active in cybersecurity clubs', 'Self-study certifications', 'Hackathon participant'],
        icon: '🎓'
      },
      {
        id: 2,
        degree: 'Higher Secondary Education',
        institution: 'Pre-University',
        location: 'India',
        period: '2021 – 2023',
        description: 'Completed higher secondary with Computer Science as a major subject, building a strong foundation in programming and mathematics.',
        gpa: '',
        achievements: ['Computer Science distinction'],
        icon: '📚'
      },
    ],

    experience: [
      {
        id: 1,
        role: 'Freelance Web Developer',
        company: 'Self-Employed',
        period: '2023 – Present',
        description: 'Building custom websites and web applications for clients. Specializing in modern, responsive designs with clean code.',
        type: 'Freelance',
        skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
        icon: '💼'
      },
      {
        id: 2,
        role: 'Open Source Contributor',
        company: 'GitHub Community',
        period: '2024 – Present',
        description: 'Contributing to open-source security tools and documentation. Reporting bugs and submitting pull requests.',
        type: 'Open Source',
        skills: ['Python', 'Git', 'GitHub', 'Documentation'],
        icon: '🔓'
      },
    ],

    testimonials: [
      {
        id: 1,
        name: 'Alex Chen',
        role: 'Senior Developer',
        company: 'TechCorp',
        content: 'Dharshan delivered exceptional work on our web project. His attention to detail and clean code structure impressed our entire team. Would highly recommend!',
        avatar: '',
        rating: 5,
        featured: true
      },
      {
        id: 2,
        name: 'Sarah Kumar',
        role: 'Project Manager',
        company: 'StartupHub',
        content: 'Working with Rio Jax was a fantastic experience. He brought creative solutions and deep technical knowledge to every problem. Delivered ahead of schedule!',
        avatar: '',
        rating: 5,
        featured: true
      },
      {
        id: 3,
        name: 'Rahul Sharma',
        role: 'Cybersecurity Educator',
        company: 'CyberAcademy',
        content: 'Impressive understanding of cybersecurity concepts for a student at this level. Dharshan shows the rare combination of theory knowledge and practical skills.',
        avatar: '',
        rating: 5,
        featured: true
      },
    ],

    blogs: [
      {
        id: 1,
        title: 'Getting Started with Ethical Hacking in 2025',
        slug: 'getting-started-ethical-hacking-2025',
        category: 'Cyber Security',
        tags: ['hacking', 'beginner', 'kali linux', 'penetration testing'],
        coverImage: '',
        content: `<h2>Introduction</h2><p>Ethical hacking is the practice of legally breaking into computers and devices to test an organization's defenses. It's one of the most exciting careers in cybersecurity, and getting started has never been more accessible.</p><h2>Why Ethical Hacking?</h2><p>As cyber threats continue to evolve, organizations need skilled professionals who can think like attackers. Ethical hackers — also called penetration testers — help identify vulnerabilities before malicious actors do.</p><h2>Essential Tools to Learn</h2><ul><li><strong>Kali Linux</strong> — The go-to OS for security testing</li><li><strong>Nmap</strong> — Network discovery and security auditing</li><li><strong>Metasploit Framework</strong> — The world's most used penetration testing framework</li><li><strong>Burp Suite</strong> — Web vulnerability scanning</li><li><strong>Wireshark</strong> — Network protocol analyzer</li></ul><h2>Learning Path</h2><p>Start with the fundamentals: networking, Linux, and programming (Python is ideal). Then progress through platforms like TryHackMe and HackTheBox to practice in legal environments.</p><h2>Conclusion</h2><p>Ethical hacking is a journey, not a destination. Stay curious, keep learning, and always practice legally and ethically.</p>`,
        author: 'Rio Jax',
        date: '2025-01-15',
        readTime: '5 min read',
        published: true,
        featured: true
      },
      {
        id: 2,
        title: 'Python Automation: Scripts That Save Hours of Work',
        slug: 'python-automation-scripts-save-time',
        category: 'Python Development',
        tags: ['python', 'automation', 'scripting', 'productivity'],
        coverImage: '',
        content: `<h2>The Power of Automation</h2><p>Python is arguably the best language for automation. Its simple syntax, vast library ecosystem, and cross-platform compatibility make it the tool of choice for automating repetitive tasks.</p><h2>File Organization Automation</h2><p>One of the most practical automation scripts organizes files by extension, moving photos to Photos folder, documents to Docs, etc. A 20-line script can replace hours of manual sorting.</p><h2>Web Scraping for Data Collection</h2><p>Using libraries like BeautifulSoup and Requests, you can collect data from websites automatically. This is invaluable for research, price tracking, and content aggregation.</p><h2>Email Automation</h2><p>Python's smtplib makes sending automated emails straightforward. Combine with schedule library for timed reports and notifications.</p><h2>Getting Started</h2><p>The best way to learn automation is by identifying a task you do repeatedly and automating it. Start small — even a 10-line script that saves 5 minutes a day is worth building.</p>`,
        author: 'Rio Jax',
        date: '2025-02-10',
        readTime: '4 min read',
        published: true,
        featured: true
      },
      {
        id: 3,
        title: 'Linux for Security Professionals: Essential Commands',
        slug: 'linux-security-professionals-commands',
        category: 'Linux',
        tags: ['linux', 'security', 'terminal', 'commands'],
        coverImage: '',
        content: `<h2>Why Linux?</h2><p>Linux is the backbone of cybersecurity. From Kali Linux for pentesting to Ubuntu servers in production, understanding Linux is non-negotiable for security professionals.</p><h2>Essential Security Commands</h2><ul><li><strong>netstat / ss</strong> — Monitor network connections</li><li><strong>ps aux</strong> — View running processes</li><li><strong>chmod / chown</strong> — Manage file permissions</li><li><strong>find / locate</strong> — Search for files and configurations</li><li><strong>grep</strong> — Search file content patterns</li></ul><h2>Log Analysis</h2><p>Logs tell the story of what happened on a system. Learning to read /var/log/auth.log, /var/log/syslog, and application logs is a critical security skill.</p><h2>Network Monitoring</h2><p>Tools like tcpdump and ss give you visibility into network activity. Combine with iptables for firewall management and you have a powerful security toolkit.</p>`,
        author: 'Rio Jax',
        date: '2025-03-05',
        readTime: '6 min read',
        published: true,
        featured: false
      },
    ],

    achievements: [
      { id: 1, title: 'Cybersecurity Bootcamp Graduate', type: 'Education', date: '2024', description: 'Completed intensive cybersecurity bootcamp with distinction.', icon: '🏆' },
      { id: 2, title: 'First CTF Completion', type: 'Competition', date: '2024', description: 'Successfully completed first Capture The Flag competition on TryHackMe.', icon: '🚩' },
      { id: 3, title: '100+ GitHub Contributions', type: 'Achievement', date: '2024', description: 'Reached 100 contributions on GitHub in a single year.', icon: '⭐' },
    ],

    stats: {
      projectsCompleted: 5,
      certificationsEarned: 4,
      githubContributions: 120,
      ctfsSolved: 15,
      linesOfCode: '10K+',
      hoursOfLearning: 500
    },

    services: [
      { id: 1, title: 'Web Development', description: 'Modern, responsive websites built with clean code and beautiful design. From landing pages to full web apps.', icon: '🌐', price: 'From ₹5,000', featured: true },
      { id: 2, title: 'Security Auditing', description: 'Basic vulnerability assessment and security review for small websites and applications.', icon: '🔒', price: 'From ₹3,000', featured: true },
      { id: 3, title: 'Python Scripting', description: 'Custom automation scripts, data processing tools, and utility programs tailored to your needs.', icon: '🐍', price: 'From ₹2,000', featured: true },
      { id: 4, title: 'Tech Consultation', description: 'Guidance on tech stack selection, security best practices, and project architecture.', icon: '💡', price: 'Free (30 min)', featured: false },
    ],

    githubRepos: [
      { id: 1, name: 'air-gesture-mouse', description: 'Webcam-based hand tracking mouse controller using MediaPipe and Python.', url: '#', stars: 12, language: 'Python', featured: true },
      { id: 2, name: 'network-scanner', description: 'Python network scanning and host discovery tool.', url: '#', stars: 8, language: 'Python', featured: true },
      { id: 3, name: 'rio-jax-portfolio', description: 'Personal portfolio website — futuristic cybersecurity theme.', url: '#', stars: 5, language: 'HTML/CSS/JS', featured: true },
    ],

    settings: {
      theme: 'dark',
      primaryFont: "'Syncopate', sans-serif",
      bodyFont: "'Outfit', sans-serif",
      footerText: '© 2025 Rio Jax (Dharshan S). Built with passion and caffeine.',
      analyticsId: '',
      maintenanceMode: false,
      showBlog: true,
      showTestimonials: true,
      showServices: true,
    },

    contacts: [],
  },

  // ── STORAGE HELPERS ──────────────────────────────────────────
  get(key) {
    try {
      const val = localStorage.getItem(`riojax_${key}`);
      return val ? JSON.parse(val) : null;
    } catch { return null; }
  },

  set(key, value) {
    try {
      localStorage.setItem(`riojax_${key}`, JSON.stringify(value));
      return true;
    } catch { return false; }
  },

  getData(key) {
    return this.get(key) ?? this.defaults[key];
  },

  setData(key, value) {
    return this.set(key, value);
  },

  // ── PROFILE ─────────────────────────────────────────────────
  getProfile() { return this.getData('profile'); },
  setProfile(data) {
    const current = this.getProfile();
    return this.setData('profile', { ...current, ...data });
  },

  // ── SKILLS ──────────────────────────────────────────────────
  getSkills() { return this.getData('skills'); },
  addSkill(skill) {
    const skills = this.getSkills();
    skill.id = Date.now();
    skills.push(skill);
    return this.setData('skills', skills);
  },
  updateSkill(id, data) {
    const skills = this.getSkills().map(s => s.id == id ? { ...s, ...data } : s);
    return this.setData('skills', skills);
  },
  deleteSkill(id) {
    const skills = this.getSkills().filter(s => s.id != id);
    return this.setData('skills', skills);
  },

  // ── PROJECTS ────────────────────────────────────────────────
  getProjects() { return this.getData('projects'); },
  addProject(project) {
    const projects = this.getProjects();
    project.id = Date.now();
    projects.push(project);
    return this.setData('projects', projects);
  },
  updateProject(id, data) {
    const projects = this.getProjects().map(p => p.id == id ? { ...p, ...data } : p);
    return this.setData('projects', projects);
  },
  deleteProject(id) {
    const projects = this.getProjects().filter(p => p.id != id);
    return this.setData('projects', projects);
  },

  // ── BLOGS ───────────────────────────────────────────────────
  getBlogs(publishedOnly = false) {
    const blogs = this.getData('blogs');
    return publishedOnly ? blogs.filter(b => b.published) : blogs;
  },
  getBlog(id) { return this.getBlogs().find(b => b.id == id || b.slug == id); },
  addBlog(blog) {
    const blogs = this.getBlogs();
    blog.id = Date.now();
    blog.date = blog.date || new Date().toISOString().split('T')[0];
    blogs.push(blog);
    return this.setData('blogs', blogs);
  },
  updateBlog(id, data) {
    const blogs = this.getBlogs().map(b => b.id == id ? { ...b, ...data } : b);
    return this.setData('blogs', blogs);
  },
  deleteBlog(id) {
    const blogs = this.getBlogs().filter(b => b.id != id);
    return this.setData('blogs', blogs);
  },

  // ── CERTS ───────────────────────────────────────────────────
  getCertifications() { return this.getData('certifications'); },
  addCertification(cert) {
    const certs = this.getCertifications();
    cert.id = Date.now();
    certs.push(cert);
    return this.setData('certifications', certs);
  },
  updateCertification(id, data) {
    const certs = this.getCertifications().map(c => c.id == id ? { ...c, ...data } : c);
    return this.setData('certifications', certs);
  },
  deleteCertification(id) {
    const certs = this.getCertifications().filter(c => c.id != id);
    return this.setData('certifications', certs);
  },

  // ── TESTIMONIALS ────────────────────────────────────────────
  getTestimonials() { return this.getData('testimonials'); },
  addTestimonial(t) {
    const ts = this.getTestimonials();
    t.id = Date.now();
    ts.push(t);
    return this.setData('testimonials', ts);
  },
  updateTestimonial(id, data) {
    const ts = this.getTestimonials().map(t => t.id == id ? { ...t, ...data } : t);
    return this.setData('testimonials', ts);
  },
  deleteTestimonial(id) {
    const ts = this.getTestimonials().filter(t => t.id != id);
    return this.setData('testimonials', ts);
  },

  // ── ACHIEVEMENTS ────────────────────────────────────────────
  getAchievements() { return this.getData('achievements'); },
  addAchievement(a) {
    const list = this.getAchievements();
    a.id = Date.now();
    list.push(a);
    return this.setData('achievements', list);
  },
  deleteAchievement(id) {
    const list = this.getAchievements().filter(a => a.id != id);
    return this.setData('achievements', list);
  },

  // ── CONTACT MESSAGES ────────────────────────────────────────
  getContacts() { return this.get('contacts') || []; },
  addContact(msg) {
    const contacts = this.getContacts();
    msg.id = Date.now();
    msg.date = new Date().toISOString();
    msg.read = false;
    contacts.unshift(msg);
    return this.set('contacts', contacts);
  },
  deleteContact(id) {
    const contacts = this.getContacts().filter(c => c.id != id);
    return this.set('contacts', contacts);
  },
  markContactRead(id) {
    const contacts = this.getContacts().map(c => c.id == id ? { ...c, read: true } : c);
    return this.set('contacts', contacts);
  },

  // ── SETTINGS ────────────────────────────────────────────────
  getSettings() { return this.getData('settings'); },
  setSettings(data) {
    const s = this.getSettings();
    return this.setData('settings', { ...s, ...data });
  },

  // ── GITHUB REPOS ────────────────────────────────────────────
  getRepos() { return this.getData('githubRepos'); },
  addRepo(repo) {
    const repos = this.getRepos();
    repo.id = Date.now();
    repos.push(repo);
    return this.setData('githubRepos', repos);
  },
  deleteRepo(id) {
    const repos = this.getRepos().filter(r => r.id != id);
    return this.setData('githubRepos', repos);
  },

  // ── STATS ───────────────────────────────────────────────────
  getStats() { return this.getData('stats'); },
  setStats(data) { return this.setData('stats', { ...this.getStats(), ...data }); },

  // ── ADMIN AUTH ──────────────────────────────────────────────
  getAdminCreds() {
    return this.get('adminCreds') || { username: 'admin', password: 'admin123' };
  },
  verifyAdmin(username, password) {
    const creds = this.getAdminCreds();
    return username === creds.username && password === creds.password;
  },
  updateAdminPassword(newPassword) {
    const creds = this.getAdminCreds();
    return this.set('adminCreds', { ...creds, password: newPassword });
  },
  setAdminSession() {
    this.set('adminSession', { loggedIn: true, time: Date.now() });
  },
  clearAdminSession() {
    localStorage.removeItem('riojax_adminSession');
  },
  isAdminLoggedIn() {
    const session = this.get('adminSession');
    if (!session || !session.loggedIn) return false;
    const elapsed = Date.now() - session.time;
    if (elapsed > 30 * 60 * 1000) { // 30 min timeout
      this.clearAdminSession();
      return false;
    }
    return true;
  },
  refreshAdminSession() {
    if (this.isAdminLoggedIn()) {
      this.setAdminSession();
    }
  },

  // ── THEME ───────────────────────────────────────────────────
  getTheme() { return this.get('theme') || 'dark'; },
  setTheme(theme) { this.set('theme', theme); },

  // ── INIT ────────────────────────────────────────────────────
  init() {
    // Apply saved theme
    const theme = this.getTheme();
    document.documentElement.setAttribute('data-theme', theme);

    // Apply SEO meta from profile
    const p = this.getProfile();
    const titleEl = document.querySelector('title');
    if (titleEl) titleEl.textContent = p.siteTitle;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', p.metaDesc);
  }
};

// Auto-init when DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => RioJax.init());
}
