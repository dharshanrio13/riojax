# RIO JAX — Personal Portfolio Website

**Dharshan S (Rio Jax)** · Cyber Security Student · Web Developer · Python Developer

A premium, futuristic, fully-animated personal portfolio with a complete CMS admin dashboard. Zero backend — pure HTML, CSS, and Vanilla JavaScript.

---

## 🚀 Quick Deploy to Cloudflare Pages

1. Upload or push this folder to a GitHub repository
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create → Pages → Connect to Git
3. Select your repo
4. Build settings:
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**

**Or use Direct Upload:** Cloudflare Pages → Create → Upload assets → drag this folder → Deploy

---

## 📁 File Structure

```
/
├── index.html          # Homepage
├── about.html          # About page
├── skills.html         # Skills page
├── projects.html       # Projects page
├── blog.html           # Blog listing
├── blog-post.html      # Blog post reader
├── contact.html        # Contact form
├── resume.html         # Resume preview
├── admin.html          # CMS Dashboard (protected)
├── css/
│   └── style.css       # Full stylesheet
├── js/
│   ├── data.js         # Data layer + localStorage
│   ├── main.js         # Core interactions
│   ├── render.js       # Dynamic content rendering
│   ├── contact.js      # Contact form handler
│   └── admin.js        # Admin CRUD operations
├── netlify.toml        # Netlify config
├── _redirects          # URL redirects
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search bot rules
└── README.md           # This file
```

---

## 🔐 Admin Dashboard

Access at: `yoursite.pages.dev/admin.html`

**Default credentials:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Change the password immediately** after first login via Settings → Password.

**Admin can manage:**
- Profile, Bio, Social Links
- Skills (add/edit/delete/reorder)
- Projects (full CRUD + featured toggle)
- Blog Posts (create/edit/publish/unpublish)
- Certifications & Achievements
- Testimonials
- Contact message inbox + CSV export
- GitHub Repositories showcase
- Services offered
- SEO settings
- Footer & general settings

---

## 🎨 Features

- **Dark/Light Mode** — toggle with memory
- **Custom Cursor** — smooth tracking with hover effects
- **Typed Text Animation** — cycling role titles in hero
- **Floating Particles** — mouse-interactive canvas
- **Cyber Grid Background** — animated
- **GSAP Animations** — scroll-triggered reveals
- **AOS Animations** — scroll reveal on all cards
- **Magnetic Buttons** — desktop hover effect
- **Command Palette** — Ctrl+K to search
- **Konami Code** → Cyber Matrix Mode 👾
- **Scroll Progress Bar** — top of page
- **Back to Top** — appears on scroll
- **LocalStorage CMS** — all content editable via admin

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Markup |
| CSS3 (Custom) | Styles, themes, animations |
| Vanilla JavaScript | All logic and interactivity |
| GSAP 3 | Premium animations |
| AOS.js | Scroll reveal |
| LocalStorage | CMS data persistence |
| Google Fonts | Typography (Syncopate, Outfit, Share Tech Mono) |

---

## ✏️ Customising Content

All content is stored in `js/data.js` defaults and managed via the Admin Dashboard at `/admin.html`.

**To permanently update defaults** (so they appear for all visitors, not just your browser):
1. Log into Admin Dashboard
2. Make your changes
3. Open browser DevTools → Application → Local Storage
4. Copy the stored values back into `js/data.js` `defaults` object
5. Redeploy to Cloudflare Pages

---

## 🐣 Easter Egg

Type the **Konami Code** anywhere on the site:
`↑ ↑ ↓ ↓ ← → ← → B A`

Unlocks **Cyber Matrix Mode** 🟢

---

## 📞 Contact

- Email: dharshan.rio13@gmail.com
- Instagram: [@mr_rio_jax](https://instagram.com/mr_rio_jax)

---

*Built with 🖤 by Rio Jax*
