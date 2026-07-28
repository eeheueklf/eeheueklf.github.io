import { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

// ── Icons ─────────────────────────────────────────────────────────────────────

const IMAGE_SRCS = [
  '/img/home/그림1.png',
  '/img/home/그림2.png',
  '/img/home/그림3.png',
  '/img/home/그림4.png',
  '/img/home/그림5.png',
  '/img/home/그림6.png',
  '/img/home/그림7.png',
  '/img/home/그림8.png',
  '/img/home/그림9.png',
  '/img/home/그림10.png',
  '/img/home/그림11.png',
  '/img/home/그림12.png',
];

// 그림7(index 6), 그림10(index 9)은 1개, 나머지는 3개
const IMAGE_COUNTS = [3, 3, 3, 3, 3, 3, 1, 3, 3, 1, 3, 3];

const GLOW_COLORS = Array(12).fill('#ffffff60');

// ── Debris ────────────────────────────────────────────────────────────────────

const DEBRIS_COLORS = [
  'rgba(61,47,106,0.55)', 'rgba(45,106,143,0.5)', 'rgba(93,78,138,0.5)',
  'rgba(255,97,80,0.35)', 'rgba(244,208,63,0.3)', 'rgba(255,107,157,0.35)',
  'rgba(74,96,128,0.45)',
];

function drawDebris(ctx, shape, s, color) {
  ctx.fillStyle = color;
  switch (shape) {
    case 0:
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.866, s * 0.5);
      ctx.lineTo(-s * 0.866, s * 0.5);
      ctx.closePath();
      ctx.fill();
      break;
    case 1:
      ctx.fillRect(-s, -s * 0.45, s * 2, s * 0.9);
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.65, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.65, 0);
      ctx.closePath();
      ctx.fill();
      break;
    default:
      ctx.beginPath();
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────

const ROUTES = [
  { path: '/blog', label: 'logs' },
  { path: '/docs', label: 'docs' },
  { path: '/resume', label: 'about' },
];

// ── Entity factories ──────────────────────────────────────────────────────────

function makeChar(type, w, h) {
  return {
    kind: 'char', type,
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 9 + 13,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.007,
    alpha: 0.82 + Math.random() * 0.18,
    hovered: false,
    bobPhase: Math.random() * Math.PI * 2,
    bobAmp: Math.random() * 3 + 2,
  };
}

function spawnMeteor(W, H) {
  const dx = 5 + Math.random() * 5;
  const dy = 2.5 + Math.random() * 2.5;
  return {
    x: Math.random() * W * 1.1,
    y: -10,
    dx, dy,
    len: 90 + Math.random() * 70,
    age: 0,
    maxAge: 50 + Math.floor(Math.random() * 35),
  };
}

function makeDebris(w, h) {
  return {
    kind: 'debris',
    shape: Math.floor(Math.random() * 4),
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.65, vy: (Math.random() - 0.5) * 0.65,
    size: Math.random() * 4 + 2,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.022,
    color: DEBRIS_COLORS[Math.floor(Math.random() * DEBRIS_COLORS.length)],
    alpha: 0.35 + Math.random() * 0.4,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const entitiesRef = useRef([]);
  const starsRef = useRef([]);
  const gravityWellsRef = useRef([]);
  const rafRef = useRef(null);
  const bgImgRef = useRef(null);
  const charImgsRef = useRef([]);
  const frameRef = useRef(0);
  const meteorsRef = useRef([]);
  const nextMeteorRef = useRef(120);
  const nebulaRef = useRef([]);
  const trailRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.15,
        op: Math.random() * 0.55 + 0.1,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.005 + Math.random() * 0.015,
      }));
    };

    const bg = new Image();
    bg.src = '/img/wallpaper.jpg';
    bgImgRef.current = bg;

    charImgsRef.current = IMAGE_SRCS.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    resize();
    window.addEventListener('resize', resize);

    const cw = () => canvas.width;
    const ch = () => canvas.height;

    nebulaRef.current = Array.from({ length: 4 }, () => ({
      x: Math.random() * cw(),
      y: Math.random() * ch(),
      r: 160 + Math.random() * 180,
      hue: Math.random() < 0.5 ? 260 : 220,
      vx: (Math.random() - 0.5) * 0.07,
      vy: (Math.random() - 0.5) * 0.07,
      phase: Math.random() * Math.PI * 2,
    }));

    entitiesRef.current = [
      ...IMAGE_SRCS.flatMap((_, i) => Array.from({ length: IMAGE_COUNTS[i] }, () => makeChar(i, cw(), ch()))),
      ...Array.from({ length: 90 }, () => makeDebris(cw(), ch())),
    ];

    const tick = () => {
      const W = cw(), H = ch();
      const mouse = mouseRef.current;

      const frame = ++frameRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background image — Ken Burns (slow zoom + drift)
      const bgImg = bgImgRef.current;
      if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
        const kbScale = 1 + 0.055 * (Math.sin(frame * 0.00025) * 0.5 + 0.5);
        const kbX = 22 * Math.sin(frame * 0.00018);
        const kbY = 10 * Math.cos(frame * 0.00013);
        const ir = bgImg.naturalWidth / bgImg.naturalHeight;
        const cr = W / H;
        let sx, sy, sw, sh;
        if (cr > ir) {
          sw = bgImg.naturalWidth; sh = sw / cr;
          sx = 0; sy = (bgImg.naturalHeight - sh) / 2;
        } else {
          sh = bgImg.naturalHeight; sw = sh * cr;
          sy = 0; sx = (bgImg.naturalWidth - sw) / 2;
        }
        ctx.save();
        ctx.translate(W / 2, H / 2);
        ctx.scale(kbScale, kbScale);
        ctx.translate(-W / 2 + kbX, -H / 2 + kbY);
        ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, W, H);
        ctx.restore();
        ctx.fillStyle = 'rgba(0,0,8,0.38)';
        ctx.fillRect(0, 0, W, H);
      } else {
        ctx.fillStyle = '#020208';
        ctx.fillRect(0, 0, W, H);
      }

      // Nebulas
      nebulaRef.current.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -n.r) n.x = W + n.r;
        if (n.x > W + n.r) n.x = -n.r;
        if (n.y < -n.r) n.y = H + n.r;
        if (n.y > H + n.r) n.y = -n.r;
        const pulse = 0.04 + 0.012 * Math.sin(frame * 0.003 + n.phase);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, `hsla(${n.hue},70%,60%,${pulse})`);
        grad.addColorStop(1, 'hsla(0,0%,0%,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Stars (twinkling) — batched by quantized opacity
      const starBuckets = {};
      starsRef.current.forEach(s => {
        const twinkle = s.op * (0.6 + 0.4 * Math.sin(frame * s.twinkleSpeed + s.twinklePhase));
        const key = (Math.round(twinkle * 20) / 20).toFixed(2);
        if (!starBuckets[key]) starBuckets[key] = [];
        starBuckets[key].push(s);
      });
      Object.entries(starBuckets).forEach(([alpha, stars]) => {
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        stars.forEach(s => { ctx.moveTo(s.x + s.r, s.y); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); });
        ctx.fill();
      });

      // Mouse trail
      if (frame % 2 === 0 && mouse.x > 0) {
        trailRef.current.push({ x: mouse.x, y: mouse.y, age: 0, maxAge: 28, r: 3 });
      }
      trailRef.current = trailRef.current.filter(t => t.age < t.maxAge);
      trailRef.current.forEach(t => {
        t.age++;
        const p = t.age / t.maxAge;
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r * (1 - p * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,160,255,${((1 - p) * 0.45).toFixed(3)})`;
        ctx.fill();
      });

      // Meteors
      if (--nextMeteorRef.current <= 0) {
        meteorsRef.current.push(spawnMeteor(W, H));
        nextMeteorRef.current = 180 + Math.floor(Math.random() * 180);
      }
      meteorsRef.current = meteorsRef.current.filter(m => m.age < m.maxAge);
      meteorsRef.current.forEach(m => {
        m.x += m.dx; m.y += m.dy; m.age++;
        const p = m.age / m.maxAge;
        const a = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
        const angle = Math.atan2(m.dy, m.dx);
        const tx = m.x - Math.cos(angle) * m.len;
        const ty = m.y - Math.sin(angle) * m.len;
        const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
        g.addColorStop(0, 'rgba(255,255,240,0)');
        g.addColorStop(1, `rgba(255,255,240,${(a * 0.85).toFixed(2)})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Black holes — attract phase → burst phase
      gravityWellsRef.current = gravityWellsRef.current.filter(g => g.age < g.maxAge);
      gravityWellsRef.current.forEach(g => {
        g.age++;
        const pulling = g.age < g.pullAge;
        const p = pulling
          ? g.age / g.pullAge
          : (g.age - g.pullAge) / (g.maxAge - g.pullAge);

        if (pulling) {
          for (let i = 0; i < 3; i++) {
            const offset = (i / 3) * g.maxR;
            const r = g.maxR * (1 - p) - offset * p;
            if (r <= 0) continue;
            ctx.beginPath();
            ctx.arc(g.x, g.y, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(100,60,220,${(0.15 + p * 0.4) * (1 - i * 0.25)})`;
            ctx.lineWidth = 1.5 - i * 0.4;
            ctx.stroke();
          }
          const coreR = 18 * p;
          const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, coreR);
          grad.addColorStop(0, `rgba(0,0,0,${p * 0.9})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(g.x, g.y, coreR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          for (let i = 0; i < 3; i++) {
            const r = g.maxR * p * (1 + i * 0.4);
            ctx.beginPath();
            ctx.arc(g.x, g.y, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${180 + i * 25},${120 + i * 30},255,${(1 - p) * (0.5 - i * 0.12)})`;
            ctx.lineWidth = 2 - i * 0.5;
            ctx.stroke();
          }
        }
      });

      // Constellation lines between nearby char entities
      const chars = entitiesRef.current.filter(e => e.kind === 'char');
      for (let i = 0; i < chars.length; i++) {
        for (let j = i + 1; j < chars.length; j++) {
          const a = chars[i], b = chars[j];
          const cdx = a.x - b.x, cdy = a.y - b.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 110) {
            const alpha = (1 - cdist / 110) * 1.0;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(220,210,255,${alpha.toFixed(3)})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      }

      // Hover detection
      let anyHovered = false;
      entitiesRef.current.forEach(e => {
        if (e.kind !== 'char') return;
        const dx = e.x - mouse.x, dy = e.y - mouse.y;
        e.hovered = Math.sqrt(dx * dx + dy * dy) < e.size * 2.2;
        if (e.hovered) anyHovered = true;
      });
      canvas.style.cursor = anyHovered ? 'pointer' : 'crosshair';

      // Entities
      entitiesRef.current.forEach(e => {
        if (e.kind === 'char' && e.hovered) {
          e.vx *= 0.72;
          e.vy *= 0.72;
          e.rotSpeed *= 0.92;
        } else {
          gravityWellsRef.current.forEach(g => {
            const gdx = g.x - e.x, gdy = g.y - e.y;
            const gd = Math.sqrt(gdx * gdx + gdy * gdy);
            if (gd < 0.1) return;
            if (g.age < g.pullAge) {
              if (gd < 380) {
                const p = g.age / g.pullAge;
                const f = Math.pow(1 - gd / 380, 0.7) * 6.0 * p;
                e.vx += (gdx / gd) * f;
                e.vy += (gdy / gd) * f;
              }
            } else {
              const p = (g.age - g.pullAge) / (g.maxAge - g.pullAge);
              if (p < 0.3 && gd < 280) {
                const f = Math.pow(1 - gd / 280, 1.5) * 12.0 * (1 - p / 0.3);
                e.vx -= (gdx / gd) * f;
                e.vy -= (gdy / gd) * f;
              }
            }
          });

          e.vx *= 0.965;
          e.vy *= 0.965;
          const speed = Math.sqrt(e.vx * e.vx + e.vy * e.vy);
          const maxSpeed = e.kind === 'char' ? 6 : 8;
          if (speed > maxSpeed) { e.vx = (e.vx / speed) * maxSpeed; e.vy = (e.vy / speed) * maxSpeed; }
          if (speed < 0.25) {
            e.vx += (Math.random() - 0.5) * 0.06;
            e.vy += (Math.random() - 0.5) * 0.06;
          }
        }

        e.x += e.vx;
        e.y += e.vy;
        e.rotation += e.rotSpeed;

        const pad = (e.size || 5) * 2.5;
        if (e.x < -pad) e.x = W + pad;
        if (e.x > W + pad) e.x = -pad;
        if (e.y < -pad) e.y = H + pad;
        if (e.y > H + pad) e.y = -pad;

        const bobY = e.kind === 'char'
          ? Math.sin(frame * 0.038 + e.bobPhase) * e.bobAmp
          : 0;

        ctx.save();
        ctx.translate(e.x, e.y + bobY);
        ctx.rotate(e.rotation);
        ctx.globalAlpha = e.alpha;

        if (e.kind === 'char') {
          const charImg = charImgsRef.current[e.type];
          const sc = e.hovered ? 1.15 : 1;
          const r = e.size * sc;

          if (e.hovered) {
            ctx.shadowColor = GLOW_COLORS[e.type];
            ctx.shadowBlur = 28;
          }

          if (charImg && charImg.complete && charImg.naturalWidth > 0) {
            const aspect = charImg.naturalWidth / charImg.naturalHeight;
            const dw = aspect >= 1 ? r * 2 : r * 2 * aspect;
            const dh = aspect >= 1 ? r * 2 / aspect : r * 2;
            ctx.drawImage(charImg, -dw / 2, -dh / 2, dw, dh);
          }
        } else {
          drawDebris(ctx, e.shape, e.size, e.color);
        }

        ctx.restore();

      });

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
  const handleMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
  const handleClick = e => {
    const hit = entitiesRef.current.find(ent => ent.kind === 'char' && ent.hovered);
    if (hit) {
      window.location.href = ROUTES[hit.type % ROUTES.length].path;
      return;
    }
    gravityWellsRef.current.push({ x: e.clientX, y: e.clientY, age: 0, pullAge: 60, maxAge: 110, maxR: 220 });
  };
  const handleDblClick = e => {
    gravityWellsRef.current.push({ x: e.clientX, y: e.clientY, age: 0, pullAge: 90, maxAge: 160, maxR: 360 });
  };

  const blogHref = useBaseUrl('/blog');
  const docsHref = useBaseUrl('/docs');
  const resumeHref = useBaseUrl('/resume');

  return (
    <Layout description="프론트엔드 개발블로그">
      <div className={styles.root}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onDoubleClick={handleDblClick}
        />
        <div className={styles.overlay}>
          <p className={styles.eyebrow}>Frontend Dev Blog</p>
          <h1 className={styles.title}>{siteConfig.title}</h1>
          <nav className={styles.nav}>
            <Link href={blogHref} className={styles.navLink}>logs →</Link>
            <Link href={docsHref} className={styles.navLink}>docs →</Link>
            <Link href={resumeHref} className={styles.navLink}>about →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  );
}
