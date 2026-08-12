(function(){
  // ---- localStorage persistence: checklist ----
  var STORE_PREFIX = 'physics-notebook:';

  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function(box){
    var key = STORE_PREFIX + box.id;
    var saved = localStorage.getItem(key);
    if (saved === '1') box.checked = true;
    box.addEventListener('change', function(){
      localStorage.setItem(key, box.checked ? '1' : '0');
    });
  });

  // ---- back-to-where-you-were: in-page #jumps, falling back to the page you actually arrived from ----
  var navStack = [];
  var backLink = document.getElementById('back-link');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var referrer = document.referrer;
  var hasUsableReferrer = !!referrer && referrer !== location.href;

  if (hasUsableReferrer) backLink.classList.add('show');

  document.addEventListener('click', function(e){
    var link = e.target.closest('a[href^="#"]');
    if (!link || link.id === 'back-link') return;
    var targetId = link.getAttribute('href').slice(1);
    if (!targetId || !document.getElementById(targetId)) return;
    navStack.push(window.scrollY);
    backLink.classList.add('show');
  });

  backLink.addEventListener('click', function(e){
    e.preventDefault();
    var pos = navStack.pop();
    if (pos !== undefined) {
      window.scrollTo({ top: pos, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (navStack.length === 0 && !hasUsableReferrer) backLink.classList.remove('show');
      return;
    }
    if (hasUsableReferrer) { window.location.href = referrer; return; }
    backLink.classList.remove('show');
  });

  // ---- section quick-nav popup ----
  var sectionNav = document.getElementById('section-nav');
  var sectionNavToggle = document.getElementById('section-nav-toggle');

  function closeSectionNav() {
    sectionNav.classList.remove('open');
    sectionNavToggle.setAttribute('aria-expanded', 'false');
  }
  function openSectionNav() {
    sectionNav.classList.add('open');
    sectionNavToggle.setAttribute('aria-expanded', 'true');
  }

  sectionNavToggle.addEventListener('click', function(e){
    e.stopPropagation();
    if (sectionNav.classList.contains('open')) closeSectionNav(); else openSectionNav();
  });
  sectionNav.querySelectorAll('.section-nav-menu a').forEach(function(a){
    a.addEventListener('click', closeSectionNav);
  });
  document.getElementById('section-nav-close').addEventListener('click', closeSectionNav);
  document.getElementById('section-nav-backdrop').addEventListener('click', closeSectionNav);
  document.addEventListener('click', function(e){
    if (sectionNav.classList.contains('open') && !sectionNav.contains(e.target)) closeSectionNav();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeSectionNav();
  });
})();
