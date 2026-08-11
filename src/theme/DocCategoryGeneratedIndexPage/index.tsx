import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  useCurrentSidebarCategory,
} from '@docusaurus/theme-common';
import docTagsMap from '@site/src/data/doc-tags.json';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/DocCategoryGeneratedIndexPage';
import SpaceBackground from '@site/src/components/SpaceBackground';

import styles from './styles.module.css';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

type SvgState = {
  pathD: string;
  segments: string[];
  waypoints: Array<{ x: number; y: number }>;
  height: number;
};

function DocTimelineItem({
  item, idx, isLeft, isVisible, isScrollActive, onMouseEnter, onMouseLeave,
}: {
  item: any; idx: number; isLeft: boolean; isVisible: boolean;
  isScrollActive: boolean; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const href       = item.href ?? item.items?.[0]?.href;

  type DocMeta = { tags: string[]; date: string | null };
  const isCategory = item.type === 'category';
  const isDoc      = item.type === 'link' && !!item.docId;
  const docId      = isDoc ? (item.docId ?? (item.href ?? '').replace(/^\/docs\//, '')) : '';
  const meta: DocMeta | undefined = docId ? (docTagsMap as Record<string, DocMeta>)[docId] : undefined;
  const tags   = meta?.tags ?? [];
  const date   = meta?.date ?? null;
  const count  = isCategory ? (item.items?.length ?? 0) : null;
  const status = (item.customProps?.status as string | undefined) ?? null;

  if (!href) return null;
  return (
    <div
      className={clsx(
        styles.timelineItem,
        isLeft ? styles.left : styles.right,
        isVisible && styles.itemVisible,
        isScrollActive && styles.scrollActive,
      )}
      style={{ '--idx': idx } as React.CSSProperties}
      data-timeline-item=""
      data-item-idx={String(idx)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={href} className={styles.ticket}>
        <div className={styles.ticketMeta}>
          <div className={styles.docCode}>
            DOC {String(idx + 1).padStart(2, '0')}
            {status && (
              <span className={clsx(styles.statusTag, styles[`status${status.replace(/\s/g, '')}`])}>
                ● {status}
              </span>
            )}
          </div>
          <div className={styles.routeMeta}>
            <span className={styles.routeFrom}>{item.label}</span>
          </div>
          {count !== null && (
            <div className={styles.ticketDate}>{count} docs</div>
          )}
          {date && (
            <div className={styles.ticketDate}>{formatDate(date)}</div>
          )}
          {tags.length > 0 && (
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className={styles.ticketBody} data-ticket-body="" />
      </Link>
    </div>
  );
}

function DocCategoryGeneratedIndexPageMetadata({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({
  categoryGeneratedIndex,
}: Props): JSX.Element {
  const category   = useCurrentSidebarCategory();
  const homeHref   = useBaseUrl('/');
  const iconSrc    = useBaseUrl('/img/logo.png');
  const blogHref   = useBaseUrl('/blog');
  const docsHref   = useBaseUrl('/docs');
  const resumeHref = useBaseUrl('/resume');

  const timelineRef    = useRef<HTMLDivElement>(null);
  const routePathRef   = useRef<SVGPathElement>(null);
  const hasAnimatedRef = useRef(false);

  const [svgState,        setSvgState]        = useState<SvgState>({ pathD: '', segments: [], waypoints: [], height: 0 });
  const [hoveredIdx,      setHoveredIdx]      = useState<number | null>(null);
  const [itemsVisible,    setItemsVisible]    = useState(false);
  const [scrollActiveIdx, setScrollActiveIdx] = useState<number | null>(null);

  const categoryItems = category?.items ?? [];

  // ── 경로 + 웨이포인트 계산 (ResizeObserver) ────────────
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const compute = () => {
      const itemEls = Array.from(
        container.querySelectorAll<HTMLElement>('[data-timeline-item]')
      );
      const W  = container.offsetWidth;
      const H  = container.offsetHeight;
      const cx = W / 2;

      const wps = itemEls.map(el => {
        const bodyEl = el.querySelector<HTMLElement>('[data-ticket-body]');
        return {
          x: cx,
          y: bodyEl
            ? el.offsetTop + bodyEl.offsetTop
            : el.offsetTop + el.offsetHeight / 2,
        };
      });

      let d = '';
      const segments: string[] = [];

      if (wps.length > 0) {
        d = `M ${cx} ${wps[0].y.toFixed(1)}`;

        for (let i = 0; i < wps.length - 1; i++) {
          const curr = wps[i];
          const next = wps[i + 1];
          const dist = next.y - curr.y;
          const drift = (i % 2 === 0 ? 1 : -1) * Math.min(28, dist * 0.1);

          const cp1x = (curr.x + drift).toFixed(1);
          const cp1y = (curr.y + dist * 0.38).toFixed(1);
          const cp2x = (next.x + drift).toFixed(1);
          const cp2y = (next.y - dist * 0.38).toFixed(1);
          const ex   = next.x.toFixed(1);
          const ey   = next.y.toFixed(1);

          segments.push(
            `M ${curr.x.toFixed(1)} ${curr.y.toFixed(1)} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`
          );
          d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
        }

        segments.push(`M ${cx} ${wps[wps.length - 1].y.toFixed(1)} L ${cx} ${H}`);
        d += ` L ${cx} ${H}`;
      }

      setSvgState({ pathD: d, segments, waypoints: wps, height: H });
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, [categoryItems]);

  // ── 진입 애니메이션: 항로 그리기 → 카드 순차 등장 ────
  useEffect(() => {
    if (hasAnimatedRef.current || !svgState.pathD || !routePathRef.current) return;
    hasAnimatedRef.current = true;

    const path = routePathRef.current;
    const len  = path.getTotalLength();

    path.style.strokeDasharray  = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    requestAnimationFrame(() => {
      path.style.transition       = 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)';
      path.style.strokeDashoffset = '0';
    });

    const timer = setTimeout(() => {
      path.style.transition       = '';
      path.style.strokeDasharray  = '';
      path.style.strokeDashoffset = '';
      setItemsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [svgState.pathD]);

  // ── 스크롤 활성화: 뷰포트 중앙 구간 IntersectionObserver ─
  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const itemEls = Array.from(
      container.querySelectorAll<HTMLElement>('[data-timeline-item]')
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const idx = parseInt(entry.target.getAttribute('data-item-idx') ?? '0', 10);
          if (entry.isIntersecting) {
            setScrollActiveIdx(idx);
          } else {
            setScrollActiveIdx(prev => (prev === idx ? null : prev));
          }
        });
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 },
    );

    itemEls.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [categoryItems]);

  return (
    <div className={clsx('page-wrapper', styles.docsRoot)}>
      <SpaceBackground />
      <nav className={styles.topNav}>
        <Link href={homeHref} className={styles.topNavLogo}>
          <img src={iconSrc} alt="히리로그" className={styles.topNavLogoImg} />
        </Link>
        <span className={styles.topNavDivider} />
        <Link href={blogHref} className={styles.topNavLink}>logs</Link>
        <Link href={docsHref} className={styles.topNavLink}>docs</Link>
        <Link href={resumeHref} className={styles.topNavLink}>about</Link>
      </nav>
      <main className={styles.docsMain}>
        <div className="container">
          <article>
            <div className={styles.timeline} ref={timelineRef}>
              <svg className={styles.timelineSvg} aria-hidden="true">
                <defs>
                  <linearGradient
                    id="route-fade-docs"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={svgState.height || 1000}
                  >
                    <stop offset="0%"   stopColor="var(--space-line)" stopOpacity="0.85" />
                    <stop offset="65%"  stopColor="var(--space-line)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--space-line)" stopOpacity="0.08" />
                  </linearGradient>
                  <filter id="wp-glow-docs" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {svgState.pathD && (
                  <path
                    ref={routePathRef}
                    d={svgState.pathD}
                    className={styles.routePath}
                    stroke="url(#route-fade-docs)"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                    fill="none"
                  />
                )}

                {svgState.segments.map((seg, si) => {
                  const activeIdx = hoveredIdx ?? scrollActiveIdx;
                  const isActive  = activeIdx !== null && si < activeIdx;
                  return (
                    <path
                      key={`seg-${si}`}
                      d={seg}
                      className={clsx(styles.segmentHighlight, isActive && styles.segmentHighlightActive)}
                      stroke="var(--space-line)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  );
                })}

                {svgState.waypoints.map((wp, i) => {
                  const active       = i === hoveredIdx;
                  const scrollActive = i === scrollActiveIdx && !active;
                  return (
                    <g
                      key={i}
                      className={clsx(
                        styles.waypointGroup,
                        active       && styles.waypointActive,
                        scrollActive && styles.waypointScrollActive,
                      )}
                    >
                      {active && (
                        <>
                          <circle cx={wp.x} cy={wp.y} r={26} className={styles.waypointGlowArea} />
                          {[30, 150, 270].map((deg, pi) => {
                            const rad = (deg * Math.PI) / 180;
                            return (
                              <circle
                                key={pi}
                                cx={wp.x + Math.cos(rad) * 20}
                                cy={wp.y + Math.sin(rad) * 20}
                                r={1.5}
                                className={styles.waypointParticle}
                                style={{ animationDelay: `${pi * 0.1}s` }}
                              />
                            );
                          })}
                        </>
                      )}
                      <circle cx={wp.x} cy={wp.y} r={14} className={styles.waypointRing} />
                      <circle cx={wp.x} cy={wp.y} r={4}  className={styles.waypointDot}  />
                    </g>
                  );
                })}
              </svg>

              {categoryItems.map((item, idx) => (
                <DocTimelineItem
                  key={idx}
                  item={item}
                  idx={idx}
                  isLeft={idx % 2 === 0}
                  isVisible={itemsVisible}
                  isScrollActive={idx === scrollActiveIdx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(
  props: Props,
): JSX.Element {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
