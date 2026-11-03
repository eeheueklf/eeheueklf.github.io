import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useState, useEffect } from 'react';

import Heading from '@theme/Heading';
import styles from './index.module.css';
import { ProjectItem } from '../../components/ProjectItem';
import { projects } from '../../data/projects';
import { GitHubIcon } from '../../components/Icons';

const COLORS = ['#2a2a2a', '#0e4429', '#006d32', '#26a641', '#39d353'];

const TYPE_LABEL = { notice: '공지', update: '업데이트' };

const SKILL_ICONS = {
  'React': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/react-VS4Vwy6It1uAZy63ihXuYvHqqYkY1X.png',
  'TypeScript': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/typescript-50YJFG5dzDLgPyvDvGxy6XZ6oMqjKi.png',
  'Redux': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/Redux-OPRBQPUl3kg0BnNpys48ZbhxE3zWJO.png',
  'Figma': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/figma-IiFO7yrdgnjBSjpxsCokIusUg6AoGO.png',
  'TailwindCSS': '/img/tailwind.png',
  'Next.js': 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
  'Jest': '/img/jest.png',
  'Supabase': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg',
};

const SKILLS = [
  'React', 'Next.js', 'TypeScript', 'TailwindCSS',
  'Supabase', 'Redux', 'Jest', 'Figma',
];

const TECH_STACK = [
  { label: 'Frontend', value: 'Next.js, React, TypeScript, Tailwind CSS, Styled-components, TanStack Query' },
  { label: 'Backend', value: 'Supabase (PostgreSQL, Auth, Storage)' },
  { label: 'Auth', value: 'Discord OAuth 2.0, JWT' },
  { label: 'Infra', value: 'Vercel, Cloudflare CDN' },
  { label: 'Tools', value: 'Jest, Vercel Analytics, Amplitude, Figma, Git, Notion' },
];

const EDUCATION = [
  {
    school: '동국대학교',
    dept: '컴퓨터정보통신공학부 컴퓨터공학전공 · 학사',
    period: '2021.03 - 2026.03',
  },
];

const AWARDS = [
  {
    title: '동국대학교 여름 종합설계 결과 발표회 최우수상',
    desc: 'SigLIP 모델 파인튜닝 및 웹 서비스 개발',
    date: '2025.06',
  },
  {
    title: '동국대학교 어드벤처디자인경진대회 장려상',
    desc: '아두이노 기반 스마트 창문 제어 시스템 구현',
    date: '2021.12',
  },
];

const ACTIVITIES = [
  {
    title: '아두이노 활용 코딩 교육 활동 (총 57시간)',
    org: '시립서울청소년센터',
    period: '2022.06 - 2022.08',
  },
  {
    title: 'CAPS (동국대학교 중앙 프로그래밍 동아리) 임원진 → 회장',
    period: '2021.03 - 2022.06',
  },
];

function ProjectUpdateCard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetch('https://ddingtown.vercel.app/api/notices')
      .then(r => r.json())
      .then(data => setNotices(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className={styles.infoCard}>
      <span className={styles.infoCardTitle}>Project update</span>
      {notices.length === 0 ? (
        <span className={styles.updateLoading}>불러오는 중...</span>
      ) : (
        notices.map(n => (
          <div key={n.id} className={styles.updateItem}>
            <div className={styles.updateMeta}>
              <span className={styles.updateType}>{TYPE_LABEL[n.type] ?? n.type}</span>
              <span className={styles.updateDate}>{n.date}</span>
            </div>
            <span className={styles.updateTitle}>{n.title}</span>
          </div>
        ))
      )}
    </div>
  );
}

function GitHubMiniCalendar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/eeheueklf?y=last')
      .then(r => r.json())
      .then(json => setData(json.contributions.slice(-14)));
  }, []);

  if (!data.length) return null;

  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className={`${styles.infoCard} ${styles.infoCardDark}`}>
      <span className={styles.infoCardTitle}>Making Lately</span>
      <div className={styles.gridCal}>
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.date}: ${d.count}`}
            className={styles.gridCell}
            style={{ backgroundColor: COLORS[d.level] }}
          />
        ))}
      </div>
      <span className={styles.calFoot}>
        {total} contributions in the last 2 weeks
      </span>
    </div>
  );
}

const SocialLinks = () => {
  const socialData = [
    { label: 'GitHub', href: 'https://github.com/eeheueklf', icon: <GitHubIcon/> },
    { label: 'Instagram', href: 'https://www.instagram.com/_uyouu', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg> },
    { label: 'Email', href: 'mailto:eeheueklf@gmail.com', icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
    { label: 'Blog', href: 'https://eeheueklf.github.io/', icon: '/img/icon.png' },
  ];

  return (
    <div className={styles.socialContainer}>
      {socialData.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={styles.iconButton}
          aria-label={item.label}
          target={item.label === 'Email' ? '_self' : '_blank'}
          rel="noopener noreferrer"
        >
          {typeof item.icon === 'string' ? (
            <img src={item.icon} alt={item.label} className={styles.svgIcon} />
          ) : (
            item.icon
          )}
          <span className={styles.iconTooltip}>{item.label}</span>
        </a>
      ))}
    </div>
  );
};

function LeftColumn() {
  return (
    <div className={styles.leftColumn}>
      <header className={styles.heroBanner}>
        <p className={styles.eyebrow}>Portfolio / 2026</p>
        <p className={styles.hero__subtitle}>안녕하세요,</p>
        <Heading as="h1" className={styles.hanna}>
          프론트엔드 개발자 하유경입니다.
        </Heading>

        <div className={styles.printContact}>
          <span>(+82) 10-4257-7240</span>
          <span className={styles.printContactSep}>·</span>
          <a href="mailto:eeheueklf@gmail.com">eeheueklf@gmail.com</a>
          <span className={styles.printContactSep}>·</span>
          <a href="https://github.com/eeheueklf">github.com/eeheueklf</a>
          <span className={styles.printContactSep}>·</span>
          <a href="https://eeheueklf.github.io">eeheueklf.github.io</a>
        </div>

        <p className={styles.hero__description}>
          Next.js App Router 서버 컴포넌트 기반 아키텍처와 성능 최적화를 중심으로, 일 평균 방문자 400명 규모의 서비스를 1인으로 설계·운영 중인 프론트엔드 개발자입니다.
        </p>
        <p className={styles.hero__description}>
          계산 알고리즘 재설계, Edge Request 99% 절감처럼 문제의 원인을 수치로 확인하고 구조를 바꿔 해결해 왔으며, 유저 피드백 30건 이상을 직접 수집해 서비스에 반영했습니다.
        </p>
        <p className={styles.hero__description}>
          프론트엔드를 중심으로 인증·백엔드·운영까지 직접 구현하며 서비스 전체를 책임진 경험이 있습니다.
        </p>
      </header>

      <div className={styles.printTechStack}>
        {TECH_STACK.map(({ label, value }) => (
          <div key={label} className={styles.printTechRow}>
            <span className={styles.printTechLabel}>{label}</span>
            <span className={styles.printTechValue}>{value}</span>
          </div>
        ))}
      </div>

      <div className={styles.skillChips}>
        {SKILLS.map(skill => {
          const icon = SKILL_ICONS[skill];
          return (
            <span
              key={skill}
              className={`${styles.skillChip} ${!icon ? styles.skillChipTextOnly : ''}`}
            >
              {icon && <img src={icon} alt="" className={styles.skillChipIcon} />}
              {skill}
            </span>
          );
        })}
      </div>

      <div className={styles.socialAndPrint}>
        <SocialLinks />
        <button
          className={styles.printButton}
          onClick={() => window.print()}
          aria-label="PDF로 저장"
        >
          PDF 저장
        </button>
      </div>
    </div>
  );
}

function StatusRow() {
  return (
    <div className={styles.statusRow}>
      <ProjectUpdateCard />
      <GitHubMiniCalendar />
    </div>
  );
}

function EducationSection() {
  return (
    <section className={`container ${styles.resumeSection}`}>
      <div className={styles.sectionDivider}>
        <span className={styles.sectionDividerLine} />
        <span className={styles.sectionDividerLabel}>Education</span>
        <span className={styles.sectionDividerLine} />
      </div>
      {EDUCATION.map(({ school, dept, period }) => (
        <div key={school} className={styles.listRow}>
          <div className={styles.listMain}>
            <span className={styles.listTitle}>{school}</span>
            <span className={styles.listSub}>{dept}</span>
          </div>
          <span className={styles.listPeriod}>{period}</span>
        </div>
      ))}
    </section>
  );
}

function AwardsSection() {
  return (
    <section className={`container ${styles.resumeSection}`}>
      <div className={styles.sectionDivider}>
        <span className={styles.sectionDividerLine} />
        <span className={styles.sectionDividerLabel}>Awards</span>
        <span className={styles.sectionDividerLine} />
      </div>
      {AWARDS.map(({ title, desc, date }) => (
        <div key={title} className={styles.listRow}>
          <div className={styles.listMain}>
            <span className={styles.listTitle}>{title}</span>
            <span className={styles.listSub}>{desc}</span>
          </div>
          <span className={styles.listPeriod}>{date}</span>
        </div>
      ))}
    </section>
  );
}

function ActivitiesSection() {
  return (
    <section className={`container ${styles.resumeSection}`}>
      <div className={styles.sectionDivider}>
        <span className={styles.sectionDividerLine} />
        <span className={styles.sectionDividerLabel}>Activities</span>
        <span className={styles.sectionDividerLine} />
      </div>
      {ACTIVITIES.map(({ title, org, period }) => (
        <div key={title} className={styles.listRow}>
          <div className={styles.listMain}>
            <span className={styles.listTitle}>{title}</span>
            {org && <span className={styles.listSub}>{org}</span>}
          </div>
          <span className={styles.listPeriod}>{period}</span>
        </div>
      ))}
    </section>
  );
}

export default function Resume() {
  const homeHref = useBaseUrl('/');
  const iconSrc = useBaseUrl('/img/logo.png');
  const blogHref = useBaseUrl('/blog');
  const docsHref = useBaseUrl('/docs');
  const resumeHref = useBaseUrl('/resume');

  return (
    <Layout title="Resume" description="프론트엔드 개발자">
      <div className={styles.resumeRoot}>
        <nav className={styles.topNav}>
          <Link href={homeHref} className={styles.topNavLogo}>
            <img src={iconSrc} alt="히리로그" className={styles.topNavLogoImg} />
          </Link>
          <span className={styles.topNavDivider} />
          <Link href={blogHref} className={styles.topNavLink}>log</Link>
          <Link href={docsHref} className={styles.topNavLink}>docs</Link>
          <Link href={resumeHref} className={styles.topNavLink}>about</Link>
        </nav>
        <main className="main-container">
          <div className={`container ${styles.topSection}`}>
            <LeftColumn />
          </div>

          <div className={`container ${styles.statusSection}`}>
            <StatusRow />
          </div>

          <section className={`container ${styles.projectSection}`}>
            <div className={styles.sectionDivider}>
              <span className={styles.sectionDividerLine} />
              <span className={styles.sectionDividerLabel}>Projects</span>
              <span className={styles.sectionDividerLine} />
            </div>

            <Heading as="h2" className={styles.sectionHeading}>프로젝트</Heading>
            <div className={styles.projectList}>
              {projects.map(({ Content, DetailContent, data }, idx) => (
                <ProjectItem key={idx} {...data} DetailContent={DetailContent}>
                  <Content />
                </ProjectItem>
              ))}
            </div>
          </section>

          <EducationSection />
          <AwardsSection />
          <ActivitiesSection />
          <div className={styles.pageEnd} />
        </main>
      </div>
    </Layout>
  );
}
