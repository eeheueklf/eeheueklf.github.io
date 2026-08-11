import React, { useState, useEffect } from 'react';
import styles from './Root.module.css';

function getStarDate(): string {
  const now = new Date();
  const doy = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return `STARDATE ${now.getFullYear()}.${String(doy).padStart(3, '0')}`;
}


function StarDate() {
  const [label, setLabel] = useState('');
  useEffect(() => { setLabel(getStarDate()); }, []);
  if (!label) return null;
  return <div className={styles.stardate}>{label}</div>;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? scrollY / total : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${pct * 100}%` }} />
    </div>
  );
}

function LoadingBar() {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href]');
      if (a) setKey(k => k + 1);
    };
    document.addEventListener('click', handle);
    return () => document.removeEventListener('click', handle);
  }, []);
  return <div key={key} className={styles.loadingBar} />;
}

interface Ripple { id: number; x: number; y: number; }

function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (window.location.pathname === '/') return;
      const id = Date.now();
      setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
    };
    window.addEventListener('click', handle);
    return () => window.removeEventListener('click', handle);
  }, []);
  return (
    <>
      {ripples.map(rp => (
        <div key={rp.id} className={styles.ripple} style={{ left: rp.x, top: rp.y }} />
      ))}
    </>
  );
}


function LinkPreview() {
  const [href, setHref] = useState('');
  useEffect(() => {
    const over = (e: MouseEvent) => {
      const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      setHref(a ? (a.getAttribute('href') || '') : '');
    };
    const out = () => setHref('');
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <div className={`${styles.linkPreview} ${href ? styles.linkPreviewVisible : ''}`}>
      {href}
    </div>
  );
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <LoadingBar />
      <ScrollProgress />

      <StarDate />
      <ClickRipple />
      <LinkPreview />
    </>
  );
}
