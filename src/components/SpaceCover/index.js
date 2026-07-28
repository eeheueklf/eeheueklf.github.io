import { useEffect, useRef } from 'react';
import styles from './index.module.css';

const COLORS = [
  '#FF6B6B', '#FF8E53',  // Fuecoco
  '#FFE566', '#FFCF56',  // Cattiva
  '#FF85A1', '#FFB3C6',  // Kitty
  '#A8D8EA', '#C3B1E1',  // space
];

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 3 + 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: Math.random() * 0.6 + 0.4,
  };
}

export default function SpaceCover() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      starsRef.current = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.7 + 0.2,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = Array.from({ length: 55 }, () =>
      createParticle(canvas.width, canvas.height)
    );

    let animId;
    const draw = () => {
      const { width, height } = canvas;

      ctx.fillStyle = '#06060f';
      ctx.fillRect(0, 0, width, height);

      starsRef.current.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.fill();
      });

      const mouse = mouseRef.current;
      particlesRef.current.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        if (Math.abs(p.vx) < 0.15) p.vx += (Math.random() - 0.5) * 0.06;
        if (Math.abs(p.vy) < 0.15) p.vy += (Math.random() - 0.5) * 0.06;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const speed = Math.random() * 3 + 1.5;
      const p = createParticle(canvas.width, canvas.height);
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      particlesRef.current.push(p);
    }

    if (particlesRef.current.length > 100) {
      particlesRef.current.splice(0, 10);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
}
