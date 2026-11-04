/* =============================================
   RESUME.JS
   "Pick up where you left off."
   - On an article: remembers the exact spot you reached (the paragraph
     at the top of your screen and how far into it) and puts you back
     there next time you open it.
   - On the homepage: shows a "Continue reading" card for the last
     article you were in the middle of.
   Everything is saved in this browser only (localStorage). If storage
   is blocked, the site simply works as normal without it.
   ============================================= */

const PREFIX = 'hdp-resume:';
const LAST_KEY = 'hdp-last-read';
const MAX_AGE = 90 * 24 * 60 * 60 * 1000; // forget after 90 days
const MIN_P = 0.02;                       // ignore the very top
const DONE_P = 0.97;                      // treat as finished

const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (_) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) { /* storage blocked */ } },
  del(k) { try { localStorage.removeItem(k); } catch (_) { /* storage blocked */ } },
};

const pageKey = () => PREFIX + (location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/');
const fresh = (rec) => rec && typeof rec.t === 'number' && Date.now() - rec.t < MAX_AGE;

export function initResume() {
  const body = document.querySelector('.article-body');
  if (body && !location.pathname.startsWith('/tools/')) {
    setupArticle(body);
  } else if (document.getElementById('articles') && document.querySelector('.hero')) {
    setupHome();
  }
}

/* ---------- article: save + restore ---------- */

function blocksOf(body) {
  return [...body.querySelectorAll('p, h2, h3, h4, li, blockquote, tr')].filter((el) => el.textContent.trim());
}
const snippet = (el) => el.textContent.trim().replace(/\s+/g, ' ').slice(0, 48);

function setupArticle(body) {
  const key = pageKey();
  const titleEl = document.querySelector('h1');
  const title = titleEl ? titleEl.textContent.trim() : document.title;
  const cover = document.querySelector('.editorial-cover img, .article-cover img');
  const image = cover && /^https:/.test(cover.src) ? cover.src : '';

  const blocks = blocksOf(body);
  let userMoved = false;
  let restoring = false;

  function progress() {
    const rect = body.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.6;
    return total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
  }

  // Binary search for the first block that reaches the top of the screen.
  function topBlockIndex() {
    let lo = 0;
    let hi = blocks.length - 1;
    let found = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (blocks[mid].getBoundingClientRect().bottom > 4) { found = mid; hi = mid - 1; } else { lo = mid + 1; }
    }
    return found;
  }

  function save() {
    if (restoring) return;
    const p = progress();
    if (p < MIN_P) { store.del(key); return; }
    if (p >= DONE_P) { store.del(key); store.del(LAST_KEY); return; }
    const i = topBlockIndex();
    if (i < 0) return;
    const el = blocks[i];
    const rec = {
      t: Date.now(), p: Math.round(p * 1000) / 1000, y: Math.round(window.scrollY),
      i, s: snippet(el), o: Math.round(-el.getBoundingClientRect().top),
    };
    store.set(key, rec);
    store.set(LAST_KEY, {
      t: rec.t, p: rec.p, path: location.pathname + location.search, title, image,
    });
  }

  let timer = 0;
  function scheduleSave() {
    if (timer) return;
    timer = window.setTimeout(() => { timer = 0; save(); }, 350);
  }

  function place(rec) {
    let el = blocks[rec.i];
    if (!el || snippet(el) !== rec.s) el = blocks.find((b) => snippet(b) === rec.s);
    let target;
    if (el) target = window.scrollY + el.getBoundingClientRect().top + rec.o;
    else target = rec.y;
    window.scrollTo(0, Math.max(0, target));
    window.dispatchEvent(new CustomEvent('hdr:restored'));
  }

  const saved = store.get(key);
  const canRestore = fresh(saved) && saved.p >= MIN_P && saved.p < DONE_P && !location.hash;

  if (canRestore) {
    try { history.scrollRestoration = 'manual'; } catch (_) { /* older browsers */ }
    restoring = true;
    place(saved);
    // Images above your spot can load late and nudge the page: put it back once, unless you have started scrolling.
    const again = () => { if (!userMoved) place(saved); restoring = false; };
    if (document.readyState === 'complete') window.setTimeout(again, 120);
    else window.addEventListener('load', () => window.setTimeout(again, 120), { once: true });
    window.setTimeout(() => { restoring = false; }, 2500);
    showToast(() => {
      userMoved = true;
      restoring = false;
      store.del(key);
      store.del(LAST_KEY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((ev) => {
    window.addEventListener(ev, () => { userMoved = true; restoring = false; }, { passive: true, once: true });
  });
  window.addEventListener('scroll', scheduleSave, { passive: true });
  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') save(); });
}

function showToast(onStartOver) {
  const el = document.createElement('div');
  el.className = 'resume-toast';
  el.setAttribute('role', 'status');
  const msg = document.createElement('span');
  msg.textContent = 'Welcome back ♡ We saved your place.';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Start from top';
  el.append(msg, btn);
  document.body.appendChild(el);
  window.requestAnimationFrame(() => el.classList.add('show'));
  const close = () => { el.classList.remove('show'); window.setTimeout(() => el.remove(), 400); };
  btn.addEventListener('click', () => { onStartOver(); close(); });
  window.setTimeout(close, 7000);
}

/* ---------- homepage: "continue reading" card ---------- */

function setupHome() {
  const last = store.get(LAST_KEY);
  if (!fresh(last) || !(last.p >= MIN_P && last.p < DONE_P) || !last.path || !last.title) return;
  const anchor = document.getElementById('articles');
  if (!anchor || !anchor.parentNode || document.querySelector('.resume-card')) return;

  const pct = Math.round(last.p * 100);
  const card = document.createElement('section');
  card.className = 'resume-card';
  card.setAttribute('aria-label', 'Continue reading');

  const link = document.createElement('a');
  link.className = 'resume-link';
  link.href = last.path;

  const thumb = document.createElement('span');
  thumb.className = 'resume-thumb';
  if (last.image && /^https:/.test(last.image)) thumb.style.backgroundImage = `url("${encodeURI(last.image)}")`;

  const copy = document.createElement('span');
  copy.className = 'resume-copy';
  const kicker = document.createElement('span');
  kicker.className = 'resume-kicker';
  kicker.textContent = 'Pick up where you left off ♡';
  const h = document.createElement('strong');
  h.className = 'resume-title';
  h.textContent = last.title;
  const bar = document.createElement('span');
  bar.className = 'resume-bar';
  const fill = document.createElement('i');
  fill.style.width = `${pct}%`;
  bar.appendChild(fill);
  const meta = document.createElement('span');
  meta.className = 'resume-meta';
  meta.textContent = `${pct}% read · Continue →`;
  copy.append(kicker, h, bar, meta);
  link.append(thumb, copy);

  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'resume-x';
  x.setAttribute('aria-label', 'Dismiss');
  x.textContent = '×';
  x.addEventListener('click', () => { store.del(LAST_KEY); card.remove(); });

  card.append(link, x);
  anchor.parentNode.insertBefore(card, anchor);
}
