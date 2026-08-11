(function(){
  // ---- Rabi interactive ----
  var slider = document.getElementById('delta-slider');
  var path = document.getElementById('rabi-path');
  var deltaVal = document.getElementById('delta-val');
  var omegaGenEl = document.getElementById('omega-gen');
  var peakPopEl = document.getElementById('peak-pop');

  var X0 = 45, X1 = 620, Y0 = 205, Y1 = 20; // plot box
  var T_MAX = 26; // in units of 1/Omega

  function render(delta) {
    var omegaGen = Math.sqrt(1 + delta*delta);
    var peak = 1 / (1 + delta*delta);
    var N = 260;
    var d = '';
    for (var i = 0; i <= N; i++) {
      var t = (i / N) * T_MAX;
      var p = peak * Math.pow(Math.sin(omegaGen * t / 2), 2);
      var x = X0 + (t / T_MAX) * (X1 - X0);
      var y = Y0 - p * (Y0 - Y1);
      d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2) + ' ';
    }
    path.setAttribute('d', d);
    deltaVal.textContent = delta.toFixed(1);
    omegaGenEl.textContent = omegaGen.toFixed(2);
    peakPopEl.textContent = peak.toFixed(2);
  }

  slider.addEventListener('input', function(){ render(parseFloat(slider.value)); });
  render(0);

  // ---- localStorage persistence: checkboxes + notes (all phases) ----
  var STORE_PREFIX = 'physics-notebook:';

  document.querySelectorAll('.checklist input[type="checkbox"]').forEach(function(box){
    var key = STORE_PREFIX + box.id;
    var saved = localStorage.getItem(key);
    if (saved === '1') box.checked = true;
    box.addEventListener('change', function(){
      localStorage.setItem(key, box.checked ? '1' : '0');
    });
  });

  document.querySelectorAll('.notes-field').forEach(function(notes){
    var notesKey = STORE_PREFIX + notes.id;
    var savedFlag = document.getElementById('saved-flag-' + notes.id.split('-').pop());
    var savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) notes.value = savedNotes;
    var saveTimeout;
    notes.addEventListener('input', function(){
      localStorage.setItem(notesKey, notes.value);
      if (savedFlag) {
        savedFlag.classList.add('show');
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function(){ savedFlag.classList.remove('show'); }, 900);
      }
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
    // No in-page jump to undo — go back to whichever page linked here (works cross-page, e.g. lectures/index.html → a lecture note, or phy/index.html → papers/*.html).
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
