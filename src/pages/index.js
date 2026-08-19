import { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

// ── Icons ─────────────────────────────────────────────────────────────────────

const IMAGE_SRCS = [
  '/img/home/그림1.webp',
  '/img/home/그림2.webp',
  '/img/home/그림3.webp',
  '/img/home/그림4.webp',
  '/img/home/그림5.webp',
  '/img/home/그림6.webp',
  '/img/home/그림7.webp',
  '/img/home/그림8.webp',
  '/img/home/그림9.webp',
  '/img/home/그림10.webp',
  '/img/home/그림11.webp',
  '/img/home/그림12.webp',
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

// ── Discord Status ────────────────────────────────────────────────────────────

const STATUS_COLOR = { online: '#43b581', idle: '#faa61a', dnd: '#f04747', offline: '#747f8d' };
const STATUS_LABEL = { online: 'online', idle: 'idle', dnd: 'do not disturb', offline: 'offline' };

function DiscordStatus() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const USER_ID = '797413208339906571';
    const fetch_ = () =>
      fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
        .then(r => r.json())
        .then(j => j.success && setData(j.data))
        .catch(() => {});
    fetch_();
    const id = setInterval(fetch_, 30000);
    return () => clearInterval(id);
  }, []);

  if (!data) return null;

  const status = data.discord_status ?? 'offline';
  const spotify = data.spotify;

  return (
    <div className={styles.discordStatus}>
      <span className={styles.discordDot} style={{ background: STATUS_COLOR[status] }} />
      {spotify ? (
        <span className={styles.discordText}>
          <span className={styles.discordSpotify}>♫</span>
          {spotify.song} — {spotify.artist}
        </span>
      ) : (
        <span className={styles.discordText}>{STATUS_LABEL[status]}</span>
      )}
    </div>
  );
}

// ── Routes ────────────────────────────────────────────────────────────────────

const ROUTES = [
  { path: '/blog', label: 'log' },
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

// ── Module-level snapshot — survives SPA navigation (unmount → remount) ───────

let _snapshot = null;

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
  const pressStartRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.bg = 'space';
    return () => { delete document.documentElement.dataset.bg; };
  }, []);

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

    if (_snapshot) {
      nebulaRef.current = _snapshot.nebula;
      entitiesRef.current = _snapshot.entities;
    } else {
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
    }

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
      // Charging & Holding Black Hole Visual (while holding press)
      if (pressStartRef.current) {
        const elapsed = Date.now() - pressStartRef.current.time;
        const px = pressStartRef.current.x;
        const py = pressStartRef.current.y;
        const progress = Math.min(1, elapsed / 1000);

        if (elapsed > 100) {
          const coreR = 16 + progress * 42;

          // 1. 차징 나선형 소용돌이 먼지 입자 (Swirling Dust while holding)
          if (pressStartRef.current.dust) {
            pressStartRef.current.dust.forEach(d => {
              d.angle += d.rotSpeed;
              d.dist -= d.inwardSpeed;
              if (d.dist <= 4) d.dist = (200 + progress * 180) * (0.8 + Math.random() * 0.2);

              const dx = px + Math.cos(d.angle) * d.dist;
              const dy = py + Math.sin(d.angle) * d.dist;
              const da = Math.min(1, d.dist / 160) * (0.4 + progress * 0.6);

              const tailAngle = d.angle - d.rotSpeed * 2.5;
              const tailDist = d.dist + d.inwardSpeed * 2.5;
              const tx = px + Math.cos(tailAngle) * tailDist;
              const ty = py + Math.sin(tailAngle) * tailDist;

              ctx.beginPath();
              ctx.moveTo(dx, dy);
              ctx.lineTo(tx, ty);
              ctx.strokeStyle = `${d.color}${(da * 0.65).toFixed(2)})`;
              ctx.lineWidth = d.size;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(dx, dy, d.size * 0.9, 0, Math.PI * 2);
              ctx.fillStyle = `${d.color}${da.toFixed(2)})`;
              ctx.fill();
            });
          }

          // 2. 칠흑같이 검은 블랙홀 본체 - 윤곽선 뚜렷하게 보존 (Solid Sharp Black Core)
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, coreR, 0, Math.PI * 2);
          ctx.fillStyle = '#000000';
          ctx.fill();
          ctx.restore();
        }
      }

      // Black holes — attract phase → burst phase
      gravityWellsRef.current = gravityWellsRef.current.filter(g => g.age < g.maxAge);
      gravityWellsRef.current.forEach(g => {
        g.age++;

        const pulling = g.age < g.pullAge;
        const p = pulling
          ? g.age / g.pullAge
          : (g.age - g.pullAge) / (g.maxAge - g.pullAge);

        if (pulling) {
          // 1. 나선형 소용돌이 먼지 입자 (Swirling Gravitational Dust) 렌더링
          if (g.dust) {
            g.dust.forEach(d => {
              d.angle += d.rotSpeed;
              d.dist -= d.inwardSpeed;
              if (d.dist <= 4) d.dist = g.maxR * (0.8 + Math.random() * 0.2);

              const dx = g.x + Math.cos(d.angle) * d.dist;
              const dy = g.y + Math.sin(d.angle) * d.dist;
              const da = Math.min(1, d.dist / (g.maxR * 0.5)) * p;

              const tailAngle = d.angle - d.rotSpeed * 2.5;
              const tailDist = d.dist + d.inwardSpeed * 2.5;
              const tx = g.x + Math.cos(tailAngle) * tailDist;
              const ty = g.y + Math.sin(tailAngle) * tailDist;

              ctx.beginPath();
              ctx.moveTo(dx, dy);
              ctx.lineTo(tx, ty);
              ctx.strokeStyle = `${d.color}${(da * 0.65).toFixed(2)})`;
              ctx.lineWidth = d.size;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(dx, dy, d.size * 0.9, 0, Math.PI * 2);
              ctx.fillStyle = `${d.color}${da.toFixed(2)})`;
              ctx.fill();
            });
          }

          // 2. 기존 흡입 파동 고리 렌더링
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

          // 3. 블랙홀 코어 렌더링 (차징 시에만 검은 코어 원 표시)
          if (g.showCore !== false) {
            const coreR = 18 * p;
            const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, coreR);
            grad.addColorStop(0, `rgba(0,0,0,${p * 0.9})`);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.beginPath();
            ctx.arc(g.x, g.y, coreR, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }
        } else {
          // 폭발 전환 시점: 호킹 방사(Hawking Radiation) 파티클 생성
          if (!g.burstSparks) {
            const sparkCount = 36;
            g.burstSparks = Array.from({ length: sparkCount }, () => {
              const angle = Math.random() * Math.PI * 2;
              const speed = 3.5 + Math.random() * 7.5;
              return {
                x: g.x,
                y: g.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                len: 10 + Math.random() * 16,
                size: 1 + Math.random() * 1.5,
                age: 0,
                maxAge: 20 + Math.floor(Math.random() * 20),
                color: Math.random() < 0.5 ? 'rgba(60, 60, 60,' : 'rgba(100, 100, 100,',
              };
            });
          }

          // 호킹 방사 방사선 스파크 렌더링
          g.burstSparks.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.95;
            s.vy *= 0.95;
            s.age++;
            const sa = 1 - (s.age / s.maxAge);
            if (sa <= 0) return;

            const angle = Math.atan2(s.vy, s.vx);
            const tailX = s.x - Math.cos(angle) * s.len * sa;
            const tailY = s.y - Math.sin(angle) * s.len * sa;

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = `${s.color}${sa.toFixed(2)})`;
            ctx.lineWidth = s.size;
            ctx.stroke();
          });

          // 검은색이 바깥으로 갈수록 연해지는 확산 효과
          const discR = g.maxR * p * 1.4;
          const discGrad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, discR);
          discGrad.addColorStop(0, `rgba(0,0,0,${((1 - p) * 0.55).toFixed(2)})`);
          discGrad.addColorStop(0.45, `rgba(40,40,40,${((1 - p) * 0.25).toFixed(2)})`);
          discGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(g.x, g.y, discR, 0, Math.PI * 2);
          ctx.fillStyle = discGrad;
          ctx.fill();
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
          // 누르고 있는 동안(Holding): 실시간으로 지속적 인력(Suction) 작용!
          if (pressStartRef.current) {
            const elapsed = Date.now() - pressStartRef.current.time;
            const px = pressStartRef.current.x;
            const py = pressStartRef.current.y;
            const progress = Math.min(1, elapsed / 1000);
            const gdx = px - e.x, gdy = py - e.y;
            const gd = Math.sqrt(gdx * gdx + gdy * gdy);
            const pullR = 240 + progress * 200;
            if (gd > 0.1 && gd < pullR) {
              const f = Math.pow(1 - gd / pullR, 0.7) * (3.5 + progress * 4.5);
              e.vx += (gdx / gd) * f;
              e.vy += (gdy / gd) * f;
            }
          }

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
      _snapshot = { entities: entitiesRef.current, nebula: nebulaRef.current };
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = e => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    if (pressStartRef.current) {
      pressStartRef.current.x = e.clientX;
      pressStartRef.current.y = e.clientY;
    }
  };
  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    pressStartRef.current = null;
  };

  const handlePointerDown = e => {
    const dust = Array.from({ length: 32 }, () => {
      const initialDist = (0.25 + Math.random() * 0.75) * 360;
      const angle = Math.random() * Math.PI * 2;
      return {
        dist: initialDist,
        angle,
        rotSpeed: (0.04 + Math.random() * 0.07) * (Math.random() < 0.5 ? 1 : -1),
        inwardSpeed: 1.5 + Math.random() * 2.5,
        size: Math.random() * 1.8 + 1.2,
        color: Math.random() < 0.6 ? 'rgba(60, 60, 60,' : 'rgba(100, 100, 100,',
      };
    });

    pressStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      dust,
    };
  };

  const handlePointerUp = e => {
    if (!pressStartRef.current) return;
    const elapsed = Date.now() - pressStartRef.current.time;
    const { x, y } = pressStartRef.current;
    pressStartRef.current = null;

    if (elapsed < 250) {
      // 짧은 클릭 시: 미니 인력 파동 후 순간 폭발
      const dust = Array.from({ length: 24 }, () => {
        const initialDist = (0.2 + Math.random() * 0.8) * 180;
        const angle = Math.random() * Math.PI * 2;
        return {
          dist: initialDist,
          angle,
          rotSpeed: (0.04 + Math.random() * 0.07) * (Math.random() < 0.5 ? 1 : -1),
          inwardSpeed: 1.5 + Math.random() * 2.5,
          size: Math.random() * 1.8 + 1.2,
          color: Math.random() < 0.6 ? 'rgba(60, 60, 60,' : 'rgba(100, 100, 100,',
        };
      });
      gravityWellsRef.current.push({ x, y, age: 0, pullAge: 60, maxAge: 110, maxR: 220, dust, burstSparks: null });
      return;
    }

    // 2단계: 꾹 누르고 있다가 손을 뗀 순간 -> 누르는 동안 빨려들어왔으므로 떼는 순간 즉시 사방 척력 폭발(Burst) 시작!
    const progress = Math.min(1, (elapsed - 250) / 750);
    const maxR = 300 + progress * 140;

    // 손을 떼는 첫 프레임: 커서 근처에 조여들었던 모든 캐릭터와 파편에 방사형 폭발 충격파(Radial Blast) 부여!
    entitiesRef.current.forEach(ent => {
      const edx = ent.x - x;
      const edy = ent.y - y;
      const dist = Math.sqrt(edx * edx + edy * edy);
      if (dist < maxR * 0.95) {
        const blastFactor = Math.pow(Math.max(0, 1 - dist / maxR), 0.5);
        const blastSpeed = (7.0 + progress * 13.0) * blastFactor;
        const angle = dist < 2 ? Math.random() * Math.PI * 2 : Math.atan2(edy, edx);

        // 당겨지던 인력 속도를 튕겨 나가는 척력 속도로 강제 전환!
        ent.vx = Math.cos(angle) * blastSpeed;
        ent.vy = Math.sin(angle) * blastSpeed;
      }
    });

    gravityWellsRef.current.push({
      x, y,
      age: 60,       // pullAge(60)와 동일하게 설정하여 떼는 순간 즉시 폭발(Burst) 모드로 전환!
      pullAge: 60,
      maxAge: 110,
      maxR,
      dust: null,
      burstSparks: null,
      showCore: true,
    });
  };

  const homeHref = useBaseUrl('/');
  const iconSrc = useBaseUrl('/img/logo.png');
  const blogHref = useBaseUrl('/blog');
  const docsHref = useBaseUrl('/docs');
  const resumeHref = useBaseUrl('/resume');

  return (
    <Layout description="프론트엔드 개발블로그">
      <div className={styles.root}>
        <nav className={styles.topNav}>
          <Link href={homeHref} className={styles.topNavLogo}>
            <img src={iconSrc} alt="히리로그" className={styles.topNavLogoImg} />
          </Link>
          <span className={styles.topNavDivider} />
          <Link href={blogHref} className={styles.topNavLink}>log</Link>
          <Link href={docsHref} className={styles.topNavLink}>docs</Link>
          <Link href={resumeHref} className={styles.topNavLink}>about</Link>
        </nav>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handleMouseLeave}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>{siteConfig.title}</h1>
          <DiscordStatus />
        </div>
      </div>
    </Layout>
  );
}
