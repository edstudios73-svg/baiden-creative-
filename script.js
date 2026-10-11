/* Baiden Creatives: site scripts */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* header */
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  const solid = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', solid, { passive: true });
  solid();

  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    document.documentElement.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); burger.focus(); }
  });
  addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); });

  /* carousels */
  $$('[data-car]').forEach(car => {
    const track = $('.car-track', car), prev = $('.car-prev', car), next = $('.car-next', car), count = $('.car-count', car);
    const slides = [...track.children];
    const total = slides.length;
    const pad = n => String(n).padStart(2, '0');
    const index = () => {
      let best = 0, d = Infinity;
      slides.forEach((s, i) => { const x = Math.abs(s.offsetLeft - track.scrollLeft - slides[0].offsetLeft); if (x < d) { d = x; best = i; } });
      return best;
    };
    const update = () => {
      const i = index(), max = track.scrollWidth - track.clientWidth - 2;
      count.innerHTML = pad(i + 1) + ' <span>/ ' + pad(total) + '</span>';
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    const go = dir => {
      const w = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24);
      track.scrollBy({ left: dir * w, behavior: 'smooth' });
    };
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    addEventListener('resize', update);
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
    /* drag to scroll with a mouse */
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; });
    addEventListener('pointerup', () => { if (!down) return; down = false; track.classList.remove('drag'); });
    track.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 6) { moved = true; track.classList.add('drag'); } track.scrollLeft = sl - dx; });
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    update();
  });

  /* image viewer for the branding gallery */
  const lb = $('#lb');
  if (lb && lb.showModal) {
    const items = $$('.gallery button');
    const img = $('img', lb), cap = $('figcaption', lb);
    let i = 0;
    const show = n => {
      i = (n + items.length) % items.length;
      const b = items[i];
      img.src = b.dataset.full; img.alt = $('img', b).alt; cap.textContent = b.dataset.cap + '  (' + (i + 1) + '/' + items.length + ')';
    };
    items.forEach((b, n) => b.addEventListener('click', () => { show(n); lb.showModal(); }));
    $('.lb-x', lb).addEventListener('click', () => lb.close());
    $('.lb-prev', lb).addEventListener('click', () => show(i - 1));
    $('.lb-next', lb).addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  }

  /* start a project form */
  const form = $('#form');
  if (form) {
    const text = f => `Hello Baiden Creatives, I'd like to start a project.\n` +
      `Name: ${f.get('name')}\nPhone: ${f.get('phone') || '-'}\nEmail: ${f.get('email') || '-'}\n` +
      `Service: ${f.get('service')}\nBudget: ${f.get('budget')}\n\n${f.get('msg') || ''}`;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const f = new FormData(form);
      location.href = 'mailto:edstudios77@gmail.com?subject=' +
        encodeURIComponent('New project inquiry from ' + f.get('name')) +
        '&body=' + encodeURIComponent(text(f));
    });
    $('#wa').addEventListener('click', () => {
      if (!form.reportValidity()) return;
      open('https://wa.me/233558362423?text=' + encodeURIComponent(text(new FormData(form))), '_blank', 'noopener');
    });
  }

  /* hero (home only) */
  const hero = $('.hero');
  if (!hero) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $$('.hero h1 > span').forEach((sp, k) => {
    const words = sp.textContent.trim().split(/\s+/);
    sp.innerHTML = words.map((w, i) => `<span class="w"><i style="--i:${k * 3 + i}">${w}</i></span>`).join(' ');
  });

  const cv = $('#net');
  if (!cv || reduce) return;
  const ctx = cv.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2), LINK = 130;
  let W, H, pts = [], sig = [], rip = [], run = true, t = 0;
  const mouse = { x: -999, y: -999 };

  function size() {
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(110, Math.floor(W * H / 12000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.4 + 1, ph: Math.random() * 6.3
    }));
  }
  size();
  addEventListener('resize', size);

  hero.addEventListener('mousemove', e => {
    const r = cv.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', () => { mouse.x = mouse.y = -999; });
  hero.addEventListener('click', e => {
    if (e.target.closest('a,button')) return;
    const r = cv.getBoundingClientRect();
    rip.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 0 });
  });
  new IntersectionObserver(([e]) => { run = e.isIntersecting; if (run) loop(); }).observe(cv);

  function loop() {
    if (!run) return;
    t += .02;
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 160 && d > 0) { p.x += dx / d * 1.6; p.y += dy / d * 1.6; }
      for (const r of rip) {
        const rd = Math.hypot(p.x - r.x, p.y - r.y);
        if (Math.abs(rd - r.r) < 24 && rd > 0) { p.x += (p.x - r.x) / rd * 2.5; p.y += (p.y - r.y) / rd * 2.5; }
      }
      ctx.fillStyle = `rgba(255,255,255,${.45 + .35 * Math.sin(t * 2 + p.ph)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.3); ctx.fill();
    }
    const edges = [];
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK) {
        edges.push([a, b]);
        ctx.strokeStyle = `rgba(255,255,255,${.26 * (1 - d / LINK)})`;
        ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    if (edges.length && sig.length < 14 && Math.random() < .12) sig.push({ e: edges[Math.random() * edges.length | 0], k: 0 });
    sig = sig.filter(s => {
      s.k += .03;
      const [a, b] = s.e, x = a.x + (b.x - a.x) * s.k, y = a.y + (b.y - a.y) * s.k;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
      g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 10, 0, 6.3); ctx.fill();
      return s.k < 1;
    });
    if (mouse.x > 0) for (const p of pts) {
      const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (d < 190) {
        ctx.strokeStyle = `rgba(255,255,255,${.55 * (1 - d / 190)})`; ctx.lineWidth = .8;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    rip = rip.filter(r => {
      r.r += 5;
      ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, .5 - r.r / 600)})`; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.3); ctx.stroke();
      return r.r < 600;
    });
    requestAnimationFrame(loop);
  }
  loop();
})();
