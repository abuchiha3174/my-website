// ============================================================
//  PORTFOLIO MAIN JS — reads from PORTFOLIO_DATA in data.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
            const D = PORTFOLIO_DATA;
            let activeRoleIndex = 0;

            // ── Helpers ─────────────────────────────────────────────
            const $ = id => document.getElementById(id);
            const el = (tag, cls, html) => {
                const e = document.createElement(tag);
                if (cls) e.className = cls;
                if (html !== undefined) e.innerHTML = html;
                return e;
            };

            // ── Page title & nav name ────────────────────────────────
            document.title = D.personal.name + ' | Portfolio';
            $('nav-name').textContent = D.personal.name.split(' ').map(w => w[0]).join('');

            // ── HERO ────────────────────────────────────────────────
            $('hero-name').textContent = D.personal.name;
            $('hero-tagline').textContent = D.personal.tagline;
            const badges = ['MS Data Science', 'GPA 3.9', 'EvoStar 2026 Author', 'Open to Full-Time'];
            badges.forEach(b => {
                const span = el('span', 'hero-badge', b);
                $('hero-badges').appendChild(span);
            });

            // ── ABOUT ────────────────────────────────────────────────
            $('about-bio').textContent = D.personal.bio;
            const metaItems = [
                { icon: svgPin(), text: D.personal.location },
                { icon: svgMail(), text: `<a href="mailto:${D.personal.email}">${D.personal.email}</a>` },
                { icon: svgPhone(), text: D.personal.phone },
                { icon: svgLinkedIn(), text: `<a href="${D.personal.linkedin}" target="_blank">linkedin.com/in/absingh95</a>` },
            ];
            metaItems.forEach(item => {
                const div = el('div', 'about-meta-item');
                div.innerHTML = item.icon + `<span>${item.text}</span>`;
                $('about-meta').appendChild(div);
            });

            // Education
            D.education.forEach(edu => {
                        const div = el('div');
                        div.innerHTML = `
      <div class="edu-school">${edu.school}</div>
      <div class="edu-degree">${edu.degree}</div>
      <div class="edu-meta">${edu.period} &nbsp;·&nbsp; ${edu.location}</div>
      <div class="edu-gpa">⭐ GPA ${edu.gpa}</div>
      <div class="edu-courses">${edu.courses.map(c => `<span class="edu-course">${c}</span>`).join('')}</div>`;
    $('about-edu').appendChild(div);
  });

  // ── ROLE TABS ────────────────────────────────────────────
  D.roles.forEach((role, i) => {
    const btn = el('button', 'role-tab' + (i === 0 ? ' active' : ''));
    btn.style.setProperty('--role-color', role.color);
    btn.innerHTML = `<span class="role-icon">${role.icon}</span><span>${role.label}</span>`;
    btn.addEventListener('click', () => switchRole(i));
    $('role-tabs').appendChild(btn);
  });

  function switchRole(i) {
    activeRoleIndex = i;
    const role = D.roles[i];
    // Update tab buttons
    document.querySelectorAll('.role-tab').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === i);
      btn.style.setProperty('--role-color', D.roles[idx].color);
    });
    // Update CSS var for accent on project section
    document.documentElement.style.setProperty('--role-color', role.color);
    // Heading
    $('proj-label').textContent = role.label;
    $('proj-heading').textContent = 'Featured Projects';
    $('proj-tagline').textContent = role.tagline;
    // Resume button
    const resumeBtn = $('resume-btn');
    const resumeFile = D.personal.resumeFiles[role.label] || '#';
    resumeBtn.href = resumeFile;
    resumeBtn.download = role.label.replace(/\s+/g,'-') + '-Resume.pdf';
    // Skills
    const sr = $('skills-row');
    sr.innerHTML = '';
    role.skills.forEach((s, idx) => {
      const tag = el('span', 'skill-tag', s);
      tag.style.animationDelay = (idx * 40) + 'ms';
      sr.appendChild(tag);
    });
    // Projects
    const grid = $('projects-grid');
    grid.innerHTML = '';
    role.projects.forEach((p, idx) => {
      const card = buildProjectCard(p, role, idx);
      grid.appendChild(card);
    });
    // Scroll to projects
    $('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function buildProjectCard(p, role, idx) {
    const card = el('div', 'project-card reveal');
    card.style.animationDelay = (idx * 80) + 'ms';
    const imgHtml = p.image
      ? `<div class="project-img"><img src="${p.image}" alt="${p.title}" onerror="this.parentElement.innerHTML='${getProjectEmoji(p.title)}'"></div>`
      : `<div class="project-img">${getProjectEmoji(p.title)}</div>`;
    const tagsHtml = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
    const highlightsHtml = p.highlights.map(h => `<div class="project-highlight">${h}</div>`).join('');
    const linksHtml = [
      p.github ? `<a href="${p.github}" class="proj-link" target="_blank">${svgGithubSm()} GitHub</a>` : '',
      p.demo ? `<a href="${p.demo}" class="proj-link" target="_blank">${svgExternal()} Demo / PDF</a>` : ''
    ].filter(Boolean).join('');
    card.innerHTML = `
      ${imgHtml}
      <div class="project-body">
        <div class="project-tags">${tagsHtml}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-highlights">${highlightsHtml}</div>
        ${linksHtml ? `<div class="project-links">${linksHtml}</div>` : ''}
      </div>`;
    return card;
  }

  function getProjectEmoji(title) {
    const t = title.toLowerCase();
    if (t.includes('travel')) return '🗺️';
    if (t.includes('compliance') || t.includes('video')) return '🎬';
    if (t.includes('quant') || t.includes('financial')) return '📈';
    if (t.includes('fine') || t.includes('transformer')) return '🤖';
    if (t.includes('neuro') || t.includes('evo') || t.includes('neural')) return '🧬';
    if (t.includes('recommend') || t.includes('filter')) return '⭐';
    if (t.includes('solar') || t.includes('energy')) return '☀️';
    if (t.includes('sales')) return '📊';
    if (t.includes('region') || t.includes('project')) return '🗂️';
    if (t.includes('simulation') || t.includes('experiment')) return '🔬';
    return '💡';
  }

  // Init first role
  const firstRole = D.roles[0];
  $('proj-label').textContent = firstRole.label;
  $('proj-tagline').textContent = firstRole.tagline;
  $('resume-btn').href = D.personal.resumeFiles[firstRole.label] || '#';
  firstRole.skills.forEach((s, i) => {
    const tag = el('span', 'skill-tag', s);
    tag.style.animationDelay = (i * 40) + 'ms';
    $('skills-row').appendChild(tag);
  });
  firstRole.projects.forEach((p, i) => {
    $('projects-grid').appendChild(buildProjectCard(p, firstRole, i));
  });
  document.documentElement.style.setProperty('--role-color', firstRole.color);

  // ── EXPERIENCE / TIMELINE ────────────────────────────────
  D.experience.forEach(job => {
    const item = el('div', 'timeline-item reveal');
    item.innerHTML = `
      <div class="timeline-header">
        <div>
          <div class="timeline-role">${job.role}</div>
          <div class="timeline-company">${job.company}</div>
        </div>
        <div class="timeline-meta">${job.period} &nbsp;·&nbsp; ${job.location}</div>
      </div>
      <ul class="timeline-bullets">${job.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    $('timeline').appendChild(item);
  });

  // ── PUBLICATION ──────────────────────────────────────────
  const pub = D.publication;
  $('pub-card').innerHTML = `
    <div>
      <div class="pub-badge">✅ ${pub.status} · ${pub.venue}</div>
      <div class="pub-title">${pub.title}</div>
      <div class="pub-authors">${pub.authors}</div>
      <p class="pub-summary">${pub.summary}</p>
      ${pub.pdfLink ? `<div style="margin-top:20px"><a href="${pub.pdfLink}" class="btn btn-outline" target="_blank" style="font-size:.85rem">📄 Read Paper</a></div>` : ''}
    </div>
    <div class="pub-result">
      <span class="pub-result-num">23%</span>
      <span class="pub-result-label">Model size reduction (p = 0.0019)</span>
    </div>`;

  // ── WORK SAMPLES ─────────────────────────────────────────
  D.workSamples.forEach(s => {
    const card = el('div', 'sample-card reveal');
    const typeEmoji = s.type === 'pdf' ? '📄' : s.type === 'image' ? '🖼️' : '🔗';
    const thumbHtml = s.thumb
      ? `<img src="${s.thumb}" alt="${s.title}" onerror="this.parentElement.innerHTML='${typeEmoji}'">`
      : typeEmoji;
    card.innerHTML = `
      <div class="sample-thumb">${thumbHtml}</div>
      <div class="sample-body">
        <div class="sample-type">${s.type}</div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>`;
    if (s.file) card.addEventListener('click', () => window.open(s.file, '_blank'));
    if (s.url) card.addEventListener('click', () => window.open(s.url, '_blank'));
    $('samples-grid').appendChild(card);
  });

  // ── CONTACT ──────────────────────────────────────────────
  const c = D.personal;
  $('contact-avail').textContent = D.contact.availability;
  const cItems = [
    { icon: svgMail(), label: 'Email', val: `<a href="mailto:${c.email}">${c.email}</a>` },
    { icon: svgPhone(), label: 'Phone', val: c.phone },
    { icon: svgPin(), label: 'Location', val: c.location },
    { icon: svgLinkedIn(), label: 'LinkedIn', val: `<a href="${c.linkedin}" target="_blank">linkedin.com/in/absingh95</a>` },
  ];
  cItems.forEach(item => {
    const div = el('div', 'contact-item');
    div.innerHTML = `<div class="contact-icon">${item.icon}</div><div><div class="contact-label">${item.label}</div><div class="contact-value">${item.val}</div></div>`;
    $('contact-info').appendChild(div);
  });

  // Contact form
  const form = $('contact-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const note = $('form-note');
    const btn = $('form-submit');
    const formspreeId = D.contact.formspreeId;
    if (formspreeId === 'YOUR_FORMSPREE_ID') {
      note.textContent = 'Please set up Formspree: add your ID to data.js → contact.formspreeId';
      note.style.color = '#e02424';
      return;
    }
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      if (res.ok) {
        note.textContent = '✅ Message sent! I will get back to you soon.';
        note.style.color = '#15803d';
        form.reset();
      } else { throw new Error(); }
    } catch {
      note.textContent = '❌ Something went wrong. Please email me directly.';
      note.style.color = '#e02424';
    }
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });

  // ── FOOTER ───────────────────────────────────────────────
  // const fn = el('p', 'footer-name', D.personal.name);
  // $('footer-name').replaceWith(fn);
  const flLinks = [
    { text: 'Email', href: 'mailto:' + D.personal.email },
    { text: 'LinkedIn', href: D.personal.linkedin },
    { text: 'GitHub', href: D.personal.github },
  ];
  flLinks.forEach(l => {
    const a = el('a', '', l.text);
    a.href = l.href;
    if (!l.href.startsWith('mailto')) a.target = '_blank';
    $('footer-links').appendChild(a);
  });
  $('footer-name').textContent = D.personal.name;

  // ── NAV / SCROLL ─────────────────────────────────────────
  window.addEventListener('scroll', () => {
    document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 40);
    revealOnScroll();
  });
  const ham = $('hamburger');
  const nl = document.querySelector('.nav-links');
  ham.addEventListener('click', () => nl.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nl.classList.remove('open')));

  // Reveal animation
  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add('visible');
    });
  }
  setTimeout(revealOnScroll, 100);

  // ── SVG ICONS ────────────────────────────────────────────
  function svgPin() { return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 018 1.5z" stroke="currentColor" stroke-width="1.4"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.4"/></svg>'; }
  function svgMail() { return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 5l6.5 4L14.5 5" stroke="currentColor" stroke-width="1.4"/></svg>'; }
  function svgPhone() { return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2.5h3l1 3-2 1a9 9 0 004.5 4.5l1-2 3 1V13a1.5 1.5 0 01-1.5 1.5A12 12 0 011.5 4 1.5 1.5 0 013 2.5z" stroke="currentColor" stroke-width="1.3"/></svg>'; }
  function svgLinkedIn() { return '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0013.5 1h-11zm2 5h-2v6h2V6zm-1-3a1 1 0 100 2 1 1 0 000-2zm3 3h-2v6h2V9.5c0-1 .5-1.5 1.5-1.5s1.5.5 1.5 1.5V12h2V9.5C11.5 7.5 10.5 6 8.5 6z"/></svg>'; }
  function svgGithubSm() { return '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>'; }
  function svgExternal() { return '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9M10 2h4m0 0v4m0-4L7 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'; }
});