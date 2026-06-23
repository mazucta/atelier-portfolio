// ============================================================
//  Дерево сакуры (sumi-e на бумаге) + опадающие лепестки.
//  Вверху — цветущее дерево; при скролле вниз лепестки отрываются
//  с веток (со стаггером) и падают по экрану, дерево растворяется.
//  Прогресс привязан к скроллу → вверх крона расцветает обратно.
//  ponytail: дерево строится один раз на resize; падение — без физики,
//  чисто scroll-прогресс + покачивание; rAF засыпает после p≈1.
// ============================================================
(function () {
  var canvas = document.getElementById("constellation");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var PINK = "227,140,158", PINKL = "240,206,214", VERM = "232,68,42", INK = "26,22,18";
  var dpr = 1, W = 0, H = 0, heroH = 1, raf = null;
  var branches = [], tips = [], petals = [];

  function rand(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function smooth(a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

  // Рекурсивный рост ветви; кончики и часть внешних узлов → точки цветения
  function grow(x, y, ang, len, wid, depth) {
    var ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len;
    branches.push({ x1: x, y1: y, x2: ex, y2: ey, w: wid });
    if (depth >= 6 || len < 12 * dpr) { tips.push({ x: ex, y: ey }); return; }
    var n = depth < 2 ? 2 : (Math.random() < 0.4 ? 3 : 2);
    for (var i = 0; i < n; i++) {
      var spread = n === 1 ? 0 : (i / (n - 1) - 0.5);
      var na = ang + spread * rand(0.55, 1.1) + rand(-0.12, 0.12);
      na += (-Math.PI / 2 - na) * 0.1;                   // лёгкий тяг вверх
      grow(ex, ey, na, len * rand(0.6, 0.74), wid * 0.68, depth + 1);
    }
    if (depth >= 3 && Math.random() < 0.55) tips.push({ x: ex, y: ey });
  }

  function buildTree() {
    branches = []; tips = [];
    grow(W * 0.9, H * 1.0, -Math.PI / 2 - 0.22 + rand(-0.05, 0.05),
         H * 0.22, Math.max(6 * dpr, W * 0.0052), 0);
  }

  // Пул лепестков: каждый «висит» на случайном кончике (образует цветы),
  // затем по прогрессу скролла отрывается и падает
  function buildPetals() {
    petals = [];
    if (!tips.length) return;
    var count = Math.min(440, Math.max(160, Math.round((W * H) / (dpr * dpr) / 2400)));
    for (var i = 0; i < count; i++) {
      var t = tips[(Math.random() * tips.length) | 0];
      var a = Math.random() * 6.2832, rr = Math.pow(Math.random(), 0.7) * 24 * dpr, roll = Math.random();
      petals.push({
        sx: t.x + Math.cos(a) * rr, sy: t.y + Math.sin(a) * rr,
        r: rand(2.2, 5.4) * dpr,
        col: roll < 0.12 ? VERM : (roll < 0.42 ? PINKL : PINK),
        baseA: 0.72,
        phase: rand(0, 6.2832),
        swayAmp: rand(26, 90) * dpr, swayFreq: rand(0.0006, 0.0015),
        fall: rand(0.9, 1.7), delay: Math.random() * 0.5,
        spin0: rand(0, 6.2832), spinSpd: rand(0.0006, 0.0018) * (Math.random() < 0.5 ? -1 : 1)
      });
    }
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.round(rect.width * dpr);
    H = canvas.height = Math.round(rect.height * dpr);
    heroH = rect.height;
    buildTree(); buildPetals();
  }

  function petal(x, y, s, rot, col, a) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.fillStyle = "rgba(" + col + "," + a + ")";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(s * 0.62, -s * 0.5, 0, -s * 1.7);
    ctx.quadraticCurveTo(-s * 0.62, -s * 0.5, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function frame(time) {
    time = time || 0;
    var p = clamp(window.scrollY / (heroH * 0.95), 0, 1);   // 0 — цветёт, 1 — осыпалось
    var treeFade = 1 - smooth(0.45, 1, p);
    ctx.clearRect(0, 0, W, H);

    // Ствол и ветви (чернила), растворяются по мере осыпания
    if (treeFade > 0.01) {
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(" + INK + "," + (0.6 * treeFade) + ")";
      for (var s = 0; s < branches.length; s++) {
        var b = branches[s];
        ctx.lineWidth = b.w;
        ctx.beginPath(); ctx.moveTo(b.x1, b.y1); ctx.lineTo(b.x2, b.y2); ctx.stroke();
      }
    }

    // Лепестки: на ветке — цветение; по прогрессу отрываются и падают
    for (var k = 0; k < petals.length; k++) {
      var q = petals[k];
      var lp = clamp((p - q.delay) / (1 - q.delay), 0, 1);
      var pe = lp * lp * (3 - 2 * lp);
      var bx = q.sx + Math.sin(time * 0.0006 + q.phase) * 3 * dpr;
      var by = q.sy + Math.cos(time * 0.0007 + q.phase) * 3 * dpr;
      var fy = pe * (H * 1.3) * q.fall;
      var fx = Math.sin(time * q.swayFreq + q.phase) * q.swayAmp * pe;
      var x = bx + fx, y = by + fy;
      var rot = q.spin0 + time * q.spinSpd * pe;
      var yn = y / H, fade = yn > 0.74 ? Math.max(0, 1 - (yn - 0.74) / 0.26) : 1;
      petal(x, y, q.r, rot, q.col, q.baseA * fade);
    }

    if (!reduce && p < 0.999) raf = requestAnimationFrame(frame);
    else raf = null;
  }

  function start() { if (!raf && !reduce) raf = requestAnimationFrame(frame); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  resize();
  window.addEventListener("resize", function () { stop(); resize(); reduce ? frame() : start(); });
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  // цикл засыпает, когда крона осыпалась; скролл будит его и пересобирает вверх
  window.addEventListener("scroll", function () { reduce ? frame() : start(); }, { passive: true });

  reduce ? frame() : start();
})();
