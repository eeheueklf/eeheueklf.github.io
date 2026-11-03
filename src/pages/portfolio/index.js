import Head from '@docusaurus/Head';
import styles from './index.module.css';

// ── Data ─────────────────────────────────────────────────────────

const profile = {
  name: '하유경',
  role: 'FRONTEND DEVELOPER',
  headline: ['문제를 수치로 확인하고,', '구조를 바꿔 해결합니다.'],
  intro:
    'Next.js App Router 기반 아키텍처와 성능 최적화를 중심으로, 일 평균 방문자 400명 규모의 서비스를 혼자 설계하고 운영하고 있습니다. 프론트엔드를 중심으로 인증, 백엔드, 운영까지 직접 책임집니다.',
  email: 'eeheueklf@gmail.com',
  github: 'https://github.com/eeheueklf',
};

const heroMetrics = [
  { value: '400', unit: '명', label: '일 평균 방문자', note: '띵타운 · 1인 설계·운영' },
  { value: '99', unit: '%', label: 'Edge Request 절감', note: '월 300만 건 이상 → 무료 플랜 유지' },
  { value: '0.1', unit: 'ms', label: '최적해 계산 시간', note: '기존 10분 이상 → 일관된 결과' },
  { value: '75', unit: '%', label: 'LCP 단축', note: 'Noiton · 9.8s → 2.4s' },
];

const projects = [
  {
    slug: 'ttingtown',
    name: '띵타운',
    summary: '띵타이쿤(게임) 유틸리티·커뮤니티 사이트',
    meta: '개인 프로젝트 · 기획/개발/운영 · 2026.05 – 현재',
    featured: true,
    live: true,
    highlights: [
      { metric: '0.1ms', text: "10분 이상 걸리던 계산을 선형계획법의 꼭짓점 성질과 Cramer's Rule로 재설계" },
      { metric: '−99%', text: '이미지 제공을 Cloudflare CDN으로 전환해 Edge Request를 줄이고 유료 플랜 없이 운영' },
      { metric: '357건', text: 'Discord Webhook 알림 기반 승인·반려 플로우로 상시 모니터링 없이 처리' },
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Discord OAuth', 'Cloudflare CDN'],
    caseStudyHref: null,
    links: [{ label: '서비스 바로가기', href: 'https://ddingtown.vercel.app/' }],
  },
  {
    slug: 'noiton',
    name: 'Noiton',
    summary: '노션 템플릿 공유 서비스',
    meta: '개인 프로젝트 · 기획/개발 · 2026.01 – 2026.03',
    highlights: [
      { metric: '9.8s → 2.4s', text: '이미지 프리로드, 번들 분리, 폰트 변환으로 LCP 단축' },
      { metric: 'RSC', text: '데이터 페칭·인증을 서버 컴포넌트로 옮겨 API 키 비노출' },
    ],
    tags: ['Next.js App Router', 'TanStack Query', 'Supabase', 'TypeScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/eeheueklf/noiton' },
      { label: 'Demo', href: 'https://noitoner.vercel.app/' },
    ],
  },
  {
    slug: 'tyle',
    name: 'TYLE',
    summary: '한국어 타자 연습 플랫폼',
    meta: '2인 팀 프로젝트 · Frontend · 2025.08 – 2025.10',
    highlights: [
      { metric: 'CLS 0', text: 'Suspense와 동일 높이 Skeleton으로 레이아웃 시프트 제거' },
      { metric: '100%', text: '한글 타수 계산 로직 Jest 라인·분기 커버리지' },
    ],
    tags: ['Next.js', 'Web Audio API', 'Jest', 'TypeScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/eeheueklf/typinggame' },
      { label: 'Demo', href: 'https://tyletype.vercel.app/' },
    ],
  },
];

const skills = [
  {
    category: 'Frontend',
    items: 'Next.js · React · TypeScript · Tailwind CSS · Styled-components · TanStack Query',
    usage: 'App Router 서버 컴포넌트 설계, 낙관적 업데이트, URL 상태 동기화',
  },
  {
    category: 'Backend',
    items: 'Supabase (PostgreSQL · Auth · Storage)',
    usage: '띵타운 사용자 데이터, 스킬트리 동기화, 신청 관리',
  },
  {
    category: 'Auth',
    items: 'Discord OAuth 2.0 · JWT',
    usage: 'Route Handler 토큰 교환, httpOnly 쿠키 세션',
  },
  {
    category: 'Infra',
    items: 'Vercel · Cloudflare CDN',
    usage: 'Vercel Observability로 원인 추적, 이미지 CDN 전환',
  },
  {
    category: 'Tools',
    items: 'Jest · Vercel Analytics · Amplitude · Figma · Git · Notion',
    usage: '핵심 로직 유닛 테스트, 사용 지표 수집',
  },
];

const aboutGroups = [
  {
    heading: '학력',
    items: [
      { title: '동국대학교', detail: '컴퓨터정보통신공학부 컴퓨터공학전공 학사', period: '2021.03 – 2026.03' },
    ],
  },
  {
    heading: '수상',
    items: [
      { title: '여름 종합설계 결과 발표회 최우수상', detail: 'SigLIP 모델 파인튜닝 및 웹 서비스 개발', period: '2025.06' },
      { title: '어드벤처디자인경진대회 장려상', detail: '아두이노 기반 스마트 창문 제어 시스템', period: '2021.12' },
    ],
  },
  {
    heading: '활동',
    items: [
      { title: 'CAPS 중앙 프로그래밍 동아리', detail: '임원진 → 회장', period: '2021.03 – 2022.06' },
      { title: '아두이노 활용 코딩 교육 (57시간)', detail: '시립서울청소년센터', period: '2022.06 – 2022.08' },
    ],
  },
];

// ── Shared UI ─────────────────────────────────────────────────────

function Btn({ href, children, variant = 'outline', className = '' }) {
  const variantCls = {
    primary: styles.btnPrimary,
    dark: styles.btnDark,
    outline: styles.btnOutline,
    ghost: styles.btnGhost,
    light: styles.btnLight,
  }[variant] ?? styles.btnOutline;

  const cls = [styles.btn, variantCls, className].filter(Boolean).join(' ');
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      className={cls}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

function Tag({ children }) {
  return <span className={styles.tag}>{children}</span>;
}

function SectionHeading({ index, title }) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionIdx}>{index}</span>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  );
}

function HighlightRow({ metric, text, wide = false }) {
  return (
    <li className={styles.highlightRow}>
      <span className={wide ? styles.hlMetricWide : styles.hlMetric}>{metric}</span>
      <span className={styles.hlText}>{text}</span>
    </li>
  );
}

// ── Header ────────────────────────────────────────────────────────

const NAV = [
  { href: '#projects', label: '프로젝트' },
  { href: '#skills', label: '기술' },
  { href: '#about', label: '소개' },
  { href: '#contact', label: '연락하기' },
];

function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/portfolio" className={styles.headerName}>{profile.name}</a>
        <nav aria-label="주요 메뉴" className={styles.headerNav}>
          {NAV.map(item => (
            <a key={item.href} href={item.href} className={styles.headerNavLink}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className={`${styles.c} ${styles.hero}`}>
      <p className={styles.heroEyebrow}>{profile.role}</p>
      <h1 className={styles.heroH1}>
        {profile.headline[0]}
        <br />
        {profile.headline[1]}
      </h1>
      <p className={styles.heroIntro}>{profile.intro}</p>
      <div className={styles.heroBtns}>
        <Btn href="#projects" variant="primary" className={styles.btnLg}>프로젝트 보기</Btn>
        <Btn href={profile.github} className={styles.btnLg}>GitHub</Btn>
        <Btn href={`mailto:${profile.email}`} className={styles.btnLg}>이메일</Btn>
      </div>
      <dl className={styles.metricsGrid}>
        {heroMetrics.map(m => (
          <div key={m.label} className={styles.metricItem}>
            <dd className={styles.metricValue}>
              {m.value}
              {m.unit && <span className={styles.metricUnit}>{m.unit}</span>}
            </dd>
            <dt className={styles.metricLabel}>{m.label}</dt>
            <dd className={styles.metricNote}>{m.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────

function FeaturedProject({ project }) {
  return (
    <article className={styles.featuredProject}>
      <div className={styles.featuredImgWrap}>
        <p className={styles.imgLabel}>[{project.name} 메인 화면 스크린샷]</p>
      </div>
      <div className={styles.featuredContent}>
        <div className={styles.badgeRow}>
          <span className={`${styles.badge} ${styles.badgeAccent}`}>대표 프로젝트</span>
          {project.live && (
            <span className={`${styles.badge} ${styles.badgeGood}`}>운영 중</span>
          )}
        </div>
        <div>
          <h3 className={styles.projectName}>{project.name}</h3>
          <p className={styles.projectSummary}>{project.summary}</p>
          <p className={styles.projectMeta}>{project.meta}</p>
        </div>
        <ul className={styles.highlightList}>
          {project.highlights.map(h => (
            <HighlightRow key={h.metric} {...h} wide />
          ))}
        </ul>
        <div className={styles.tagList}>
          {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className={styles.projectBtns}>
          {project.caseStudyHref && (
            <Btn href={project.caseStudyHref} variant="dark">케이스 스터디 보기 →</Btn>
          )}
          {project.links.map(l => (
            <Btn key={l.label} href={l.href}>{l.label}</Btn>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.cardImgWrap}>
        <p className={styles.imgLabel}>[{project.name} 스크린샷]</p>
      </div>
      <div className={styles.cardContent}>
        <div>
          <h3 className={styles.cardName}>{project.name}</h3>
          <p className={styles.projectSummary}>{project.summary}</p>
          <p className={styles.projectMeta}>{project.meta}</p>
        </div>
        <ul className={styles.cardHighlights}>
          {project.highlights.map(h => (
            <HighlightRow key={h.metric} {...h} />
          ))}
        </ul>
        <div className={styles.tagList}>
          {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className={styles.projectBtns}>
          {project.caseStudyHref && (
            <Btn href={project.caseStudyHref} className={styles.textSm}>자세히 보기 →</Btn>
          )}
          {project.links.map(l => (
            <Btn key={l.label} href={l.href} variant="ghost" className={styles.textSm}>{l.label}</Btn>
          ))}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  return (
    <section id="projects" className={`${styles.c} ${styles.projectsSection} ${styles.scrollTarget}`}>
      <SectionHeading index="01" title="프로젝트" />
      {featured && <FeaturedProject project={featured} />}
      <div className={styles.projectGrid}>
        {rest.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className={`${styles.c} ${styles.skillsSection} ${styles.scrollTarget}`}>
      <SectionHeading index="02" title="기술과 사용처" />
      <div className={styles.skillsTable}>
        {skills.map(s => (
          <div key={s.category} className={styles.skillRow}>
            <p className={styles.skillCategory}>{s.category}</p>
            <div className={styles.skillBody}>
              <p className={styles.skillItems}>{s.items}</p>
              <p className={styles.skillUsage}>{s.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className={`${styles.c} ${styles.aboutSection} ${styles.scrollTarget}`}>
      <SectionHeading index="03" title="소개" />
      <div className={styles.aboutGrid}>
        {aboutGroups.map(group => (
          <div key={group.heading}>
            <p className={styles.aboutGroupHead}>{group.heading}</p>
            <ul className={styles.aboutList}>
              {group.items.map(item => (
                <li key={item.title}>
                  <p className={styles.aboutItemTitle}>{item.title}</p>
                  <p className={styles.aboutItemDetail}>{item.detail}</p>
                  <p className={styles.aboutItemPeriod}>{item.period}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────

function Contact() {
  return (
    <footer id="contact" className={styles.contact}>
      <div className={styles.contactInner}>
        <p className={styles.contactEyebrow}>CONTACT</p>
        <h2 className={styles.contactH2}>
          서비스 전체를 책임지는
          <br />
          프론트엔드 개발자를 찾고 계신가요?
        </h2>
        <div className={styles.contactBtns}>
          <a href={`mailto:${profile.email}`} className={styles.ctaEmail}>
            {profile.email}
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.ctaGithub}>
            {profile.github.replace('https://', '')}
          </a>
        </div>
        <p className={styles.contactCopy}>© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className={styles.portfolioRoot}>
      <Head>
        <title>하유경 | Frontend Developer</title>
        <meta
          name="description"
          content="문제를 수치로 확인하고, 구조를 바꿔 해결하는 프론트엔드 개발자 하유경의 포트폴리오"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SiteHeader />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
      </main>
      <Contact />
    </div>
  );
}
