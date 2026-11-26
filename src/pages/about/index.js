import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
import { useEffect, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import resumeStyles from './resume.module.css';
import styles from './index.module.css';

const CAL_COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const TYPE_LABEL = { notice: '공지', update: '업데이트' };

function ProjectUpdateCard() {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    fetch('https://ddingtown.vercel.app/api/notices')
      .then(r => r.json())
      .then(data => setNotices(data.slice(0, 3)))
      .catch(() => {});
  }, []);
  return (
    <div className={resumeStyles.infoCard}>
      <span className={resumeStyles.infoCardTitle}>Project update</span>
      {notices.length === 0 ? (
        <span className={resumeStyles.updateLoading}>불러오는 중...</span>
      ) : (
        notices.map(n => (
          <div key={n.id} className={resumeStyles.updateItem}>
            <div className={resumeStyles.updateMeta}>
              <span className={resumeStyles.updateType}>{TYPE_LABEL[n.type] ?? n.type}</span>
              <span className={resumeStyles.updateDate}>{n.date}</span>
            </div>
            <span className={resumeStyles.updateTitle}>{n.title}</span>
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
      .then(json => setData(json.contributions.slice(-14)))
      .catch(() => {});
  }, []);
  if (!data.length) return null;
  const total = data.reduce((sum, d) => sum + d.count, 0);
  return (
    <div className={`${resumeStyles.infoCard} ${resumeStyles.infoCardDark}`}>
      <span className={resumeStyles.infoCardTitle}>Making Lately</span>
      <div className={resumeStyles.gridCal}>
        {data.map((d, i) => (
          <div key={i} title={`${d.date}: ${d.count}`} className={resumeStyles.gridCell} style={{ backgroundColor: CAL_COLORS[d.level] }} />
        ))}
      </div>
      <span className={resumeStyles.calFoot}>{total} contributions in the last 2 weeks</span>
    </div>
  );
}

const VALUES = [
  {
    heading: '더 나은 유저 경험을 위해 노력합니다.',
    items: [
      '좋은 경험은 큰 기능보다 매일 지나가는 동선에서 결정된다고 생각합니다. 자주 쓰는 페이지로 바로 가는 Quick Access 패널을 만들었고, 로그인 유저의 약 40%가 쓰고 있습니다.',
      '"빠른 것 같다"는 느낌을 믿지 않습니다. Lighthouse와 Vercel Observability로 수치를 먼저 확인한 뒤에 코드를 고치고, 고친 뒤에도 같은 지표로 다시 재서 확인합니다.',
      '유저 피드백은 다음에 무엇을 만들지 알려 주는 신호라고 생각합니다. 혼자 운영하면서 피드백 35건 이상을 받아 서비스에 반영했습니다.',
    ],
  },
  {
    heading: '사람이 챙기던 일은 구조로 덜어냅니다.',
    items: [
      '사람이 매번 확인해야 하는 일은 결국 놓친다고 생각합니다. 명예의 전당 인증 신청이 등록되면 바로 Discord로 알림이 오게 해, 어드민 페이지를 계속 열어 두지 않아도 신청을 놓치지 않게 했습니다.',
      "쉬운 해법으로 버티면 결국 유저가 그 비용을 치른다고 생각합니다. 곱셈 계산기였던 연금 도구가 자원 제약 최적화 문제로 커지자, 휴리스틱과 Cramer's Rule을 거쳐 ILP로 다시 설계했고 brute force 참조 구현과 1,000개 케이스로 결과를 검증했습니다.",
    ],
  },
];
const PROJECTS = [
  {
    name: '띵타운',
    image: { src: '/img/resume/ddingtown-calculator.webp', alt: '띵타운 연금 계산기 화면' },
    sub: '개인 프로젝트 (기획/개발/운영) · 2026. 05 - 운영 중',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS', 'Vercel', 'Cloudflare CDN', 'Discord OAuth 2.0'],
    desc: '띵타이쿤 플레이어를 위한 유틸리티·커뮤니티 사이트를 혼자 기획·개발·운영하고 있습니다. 하루 평균 400명이 방문하고, 유저 피드백 35건 이상을 받아 반영했습니다.',
    blocks: [
      {
        heading: '계산 방식을 직접 검증하며 두 번 다시 설계했습니다.',
        items: [
          <>타 서비스 계산기가 입력값이 늘수록 10분 이상 걸리는 문제를 Ruin &amp; Recreate 휴리스틱으로 개선했으나, 무작위로 해를 부수고 다시 만드는 방식이라 실행마다 결과가 달라짐</>,
          "선형계획법의 꼭짓점을 Cramer's Rule로 직접 계산해 결과를 고정했지만, 1,000개 케이스로 검증하니 정수 조건을 반영하지 못해 최적해는 11%, 약 9%는 재료가 부족해 실제로 만들 수 없는 결과",
          <>생산 계획 문제와 같은 형태라는 점에 착안해 <b>정수 선형계획법(ILP)으로 재설계, 최적해 비율 11% → 100%</b>. javascript-lp-solver로 브라우저에서 평균 약 1ms 안에 계산</>,
        ],
      },
      {
        heading: '운영 데이터로 숨은 비용을 찾아 끊어냈습니다.',
        items: [
          'Edge Request가 월 300만 건으로 Vercel 무료 한도(100만 건)의 3배를 넘겨 서비스가 일시 정지됨. 한 달은 Pro 플랜으로 버텼지만, 유저가 늘수록 같은 일이 반복될 거라 보고 원인을 고치기로 함',
          'Vercel Observability로 요청을 추적해 겹치던 robots.txt를 지우고, 링크 대부분(44개 중 42개)의 prefetch를 끔',
          <>주 원인은 Vercel이 직접 내보내던 정적 이미지 파일 요청. 이미지를 <b>Cloudflare R2 + CDN으로 옮겨 Edge Request를 월 300만 → 50만 건(약 87%)</b>으로 줄이고, 이후 무료 플랜 한도 안에서 운영</>,
        ],
      },
      {
        heading: '로그인 정보를 한 곳에서 관리해 앱 전체가 함께 쓰게 했습니다.',
        items: [
          <><code>useUser</code> 훅 하나로 세션 조회와 프로필 수정 5종(마크 ID·한글 닉네임·마을 이름·공개 여부·주력 직업)을 묶고, React Query(<code>staleTime</code> 30분)로 26곳이 같은 캐시를 공유</>,
          '프로필을 고치면 캐시를 다시 불러오고, 로그아웃하면 바로 비움',
          <>로그인 정보를 불러올 때 <code>auth.getUser</code>와 <code>profiles upsert</code>를 한 흐름으로 묶어 프로필이 없는 유저가 생기지 않게 함</>,
        ],
      },
      {
        heading: '유저가 매번 반복하던 수고를 덜어냈습니다.',
        items: [
          '스킬트리 설정은 항상 기기에 저장하고, 로그인하면 DB와 동기화해 다른 기기에서도 이어 쓰게 함 (값이 다르면 DB 우선)',
          '스킬을 연달아 골라도 저장 요청은 1500ms Debounce로 한 번만 보내고, 페이지를 떠날 때(pagehide·탭 전환·언마운트) 대기 중인 저장을 keepalive 요청으로 바로 보내 마지막 변경까지 보존',
          <>메뉴를 거치지 않고 자주 쓰는 페이지로 바로 가도록 즐겨찾기 → 최근 방문 → 직업별 기본값 순으로 슬롯을 채우는 Quick Access 패널 구현, <b>로그인 유저의 약 40%가 사용</b> (Amplitude)</>,
        ],
      },
      {
        heading: '혼자서도 신청을 놓치지 않게 알림과 승인 흐름을 만들었습니다.',
        items: [
          <>유저가 도구 강화 정보를 등록하면 등록 직후 Discord Webhook으로 알림이 와서, 사이트를 계속 지켜보지 않고도 <b>누적 357건 처리</b></>,
          '승인은 버튼과 확인 한 번, 반려는 사유 3개 중 하나를 고르거나 직접 입력하게 하고, 유저는 반려 사유를 보고 고쳐서 다시 신청할 수 있게 함',
        ],
      },
    ],
    links: [{ label: 'Demo ↗', href: 'https://ddingtown.vercel.app/' }],
  },
  {
    name: 'Noiton',
    image: { src: '/img/resume/noiton-home.webp', alt: '노션 템플릿 공유 서비스 Noiton 메인 화면' },
    sub: '개인 프로젝트 · 2026. 01 - 2026. 03',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
    desc: '노션 템플릿을 공유하고 카테고리별로 찾아보는 서비스를 혼자 기획·개발했습니다. 느린 첫 화면과, 카테고리를 타고 들어가다 길을 잃는 문제를 주로 다뤘습니다.',
    blocks: [
      {
        heading: '느린 첫 화면을 원인별로 나눠 줄였습니다.',
        items: [
          '메인 페이지에서 템플릿 썸네일과 배너가 한꺼번에 로드되며 LCP가 모바일 18.2초, 데스크톱 3.0초 (Lighthouse)',
          '썸네일·배너에 priority를 주고 sizes·quality로 이미지 용량을 줄였으며, 폰트는 TTF → WOFF2로 변환',
          <><b>LCP 모바일 18.2s → 6.6s(약 64%), 데스크톱 3.0s → 1.1s(약 63%)</b></>,
        ],
      },
      {
        heading: '화면에 필요한 조회는 서버에서, 사용자 동작은 브라우저에서 처리했습니다.',
        items: [
          '템플릿 목록·카테고리 조회는 서버 컴포넌트에서 처리해 첫 HTML에 데이터를 담아 보냄',
          '좋아요·업로드·프로필 수정처럼 사용자가 직접 하는 동작은 브라우저 Supabase 클라이언트로 처리',
          'Google 로그인은 NextAuth로 서버(Route Handler)에서 처리하고, 세션은 JS에서 읽을 수 없는 httpOnly JWT 쿠키로 유지',
        ],
      },
      {
        heading: '주소창을 상태 저장소로 삼아 탐색 UX를 개선했습니다.',
        items: [
          '카테고리가 깊어져도 현재 위치를 잃지 않고, 새로고침·링크 공유 후에도 같은 화면이 나오도록 상태를 URL에 둠',
          <>처음엔 <code>?category=</code> 쿼리스트링이던 카테고리를 경로 세그먼트(<code>/templates/[[...category]]</code>)로 바꾸고, 정렬은 <code>?sort=</code>에 담음. 거쳐 온 단계는 Breadcrumb으로 표시</>,
          '카테고리·필터 상태는 전역 상태 저장소 없이 URL만으로 공유 가능',
        ],
      },
      {
        heading: '실패 영향이 작은 동작에 낙관적 업데이트를 적용했습니다.',
        items: [
          <>'좋아요'처럼 실패해도 피해가 크지 않은 동작에 TanStack Query의 <code>onMutate</code>/<code>onError</code> 롤백 패턴 적용</>,
          '서버 응답을 기다리지 않고 화면이 먼저 바뀌고, 실패하면 이전 값으로 되돌림. 카드별 좋아요 여부는 5분간 캐싱해 같은 카드를 다시 볼 때 재조회하지 않음',
        ],
      },
    ],
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/eeheueklf/noiton' },
      { label: 'Demo ↗', href: 'https://noitoner.vercel.app/' },
    ],
  },
  {
    name: 'TYLE',
    image: { src: '/img/resume/tyle-typing.webp', alt: 'TYLE 타자 연습 화면' },
    sub: '2인 프로젝트 · Frontend Developer · 2025. 08 - 2025. 10',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Hangul.js', 'Web Audio API', 'Jest'],
    desc: '2인 팀에서 프론트엔드를 맡은 한국어 타자 연습 서비스입니다. 타수 계산 최적화와 테스트, 효과음, 화면 안정화를 맡았습니다.',
    blocks: [
      {
        heading: '입력할 때마다 반복되던 자모 분리 계산을 줄였습니다.',
        items: [
          '100ms 타이머가 돌 때마다 지금까지 입력한 글 전체를 자모로 다시 분리하던 구조',
          <><code>useMemo</code>로 자모 수 계산은 입력이 바뀔 때만 하도록 캐싱하고, <code>setInterval</code>은 <code>useEffect</code> cleanup으로 연습 종료·언마운트 때 정리</>,
        ],
      },
      {
        heading: '빠르게 쳐도 소리가 밀리지 않게 했습니다.',
        items: [
          <><code>&lt;audio&gt;</code>는 요소 하나가 한 번에 한 소리만 내고 재생 시작에 지연이 있어, 짧은 효과음을 빠르게 겹쳐 내면 소리가 밀림</>,
          <>효과음을 <code>AudioBuffer</code>로 미리 디코딩해 두고, 키를 누를 때마다 새 <code>AudioBufferSourceNode</code>로 재생</>,
        ],
      },
      {
        heading: '키보드가 늦게 그려지며 화면이 밀리던 문제를 없앴습니다.',
        items: [
          '마운트 전에는 키보드를 그리지 않아(return null) 서버 HTML에 키보드 자리가 없었고, 화면이 뜬 뒤 키보드가 끼어들며 위 내용이 밀림',
          '이 코드를 없애고 실제 키보드와 같은 높이(236px)의 Skeleton으로 자리를 먼저 확보',
          <><b>CLS 0.137 → 0 (Lighthouse)</b></>,
        ],
      },
      {
        heading: '계산 로직이 깨지지 않게 테스트로 지켰습니다.',
        items: [
          <>정확도·타수 계산을 UI에서 떼어 순수 함수로 만들고 Jest 테스트 작성. 겹받침·쌍자음·0 나누기 케이스 포함, <b>라인 커버리지 100%</b></>,
        ],
      },
      {
        heading: '협업 방식을 제안했습니다.',
        items: [
          '처음에는 API 명세를 노션에 정리했지만, API가 자주 바뀌면서 명세를 따로 물어봐야 하는 일이 생김',
          'Swagger로 명세를 관리하자고 제안해 백엔드 팀원이 문서를 작성했고, 이후 명세를 따로 묻는 일이 없어짐. PR 리뷰 규칙도 제안해 팀에 적용',
        ],
      },
    ],
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/eeheueklf/typinggame' },
      { label: 'Demo ↗', href: 'https://tyletype.vercel.app/' },
    ],
  },
];

const ACTIVITIES = [
  { title: '동국대학교 여름 종합설계 결과 발표회 최우수상', meta: '2025. 06', desc: '파인튜닝한 SigLIP 모델 기반 웹 서비스 개발' },
  { title: '동국대학교 어드벤처디자인경진대회 장려상', meta: '2021. 12', desc: '아두이노 기반 스마트 창문 제어 시스템 구현' },
  { title: 'CAPS 동국대학교 중앙 프로그래밍 동아리 회장', meta: '2021. 03 - 2022. 06', desc: '임원진을 거쳐 회장을 맡아 동아리 운영을 담당' },
  { title: '시립서울청소년센터 코딩 교육 활동', meta: '2022. 06 - 2022. 08', desc: '아두이노 활용 코딩 교육 총 57시간 진행' },
];

const EDUCATION = [
  { title: '동국대학교', meta: '2021. 03 - 2026. 03', desc: '컴퓨터정보통신공학부 컴퓨터공학전공 · 학사' },
];

function Section({ label, title, children }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabel}>{label}</div>
      <Heading as="h2" className={styles.sectionTitle}>{title}</Heading>
      {children}
    </section>
  );
}

function Block({ heading, items }) {
  return (
    <div className={styles.block}>
      <h4 className={styles.blockHeading}>{heading}</h4>
      <ul>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

function Project({ project }) {
  const imageSrc = useBaseUrl(project.image.src);
  return (
    <article className={styles.project}>
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>{project.name}</h3>
        <p className={styles.projectSub}>{project.sub}</p>
        <div className={styles.stack}>
          {project.stack.map(s => <span key={s} className={styles.stackChip}>{s}</span>)}
        </div>
      </div>
      <img
        className={styles.projectImage}
        src={imageSrc}
        alt={project.image.alt}
        width={1200}
        height={744}
        loading="lazy"
        decoding="async"
      />
      <p className={styles.projectDesc}>{project.desc}</p>
      {project.blocks.map((b, i) => <Block key={i} heading={b.heading} items={b.items} />)}
      {project.links?.length > 0 && (
        <div className={styles.links}>
          {project.links.map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </div>
      )}
    </article>
  );
}

function ItemList({ items }) {
  return items.map(it => (
    <div key={it.title} className={styles.item}>
      <p className={styles.itemTitle}>{it.title}</p>
      <p className={styles.itemMeta}>{it.meta}</p>
      <p className={styles.itemDesc}>{it.desc}</p>
    </div>
  ));
}

export default function Resume2() {
  return (
    <Layout title="Portfolio" description="하유경 Portfolio">
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </Head>
      <div className={styles.root}>
        <div className={styles.container}>
          <header className={styles.hero}>
            <Heading as="h1" className={styles.heroTitle}>하유경</Heading>
            <p className={styles.tagline}>유저를 가장 가까이에서 보고, 숫자로 문제를 정의하는 프론트엔드 개발자</p>
            <div className={styles.meta}>
              <span>eeheueklf@gmail.com</span>
              <span>
                <a href="https://github.com/eeheueklf" target="_blank" rel="noopener noreferrer">github.com/eeheueklf</a>
              </span>
            </div>
          </header>

          <div className={resumeStyles.statusSection}>
            <div className={resumeStyles.statusRow}>
              <ProjectUpdateCard />
              <GitHubMiniCalendar />
            </div>
          </div>

          <Section label="About" title="지향">
            <div className={styles.value}>
              {VALUES.map((v, i) => (
                <div key={i} className={styles.valueRow}>
                  <h3 className={styles.valueHeading}>{v.heading}</h3>
                  <ul className={styles.valueList}>
                    {v.items.map((it, j) => <li key={j}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Project" title="프로젝트">
            {PROJECTS.map(p => <Project key={p.name} project={p} />)}
          </Section>

          <Section label="Activities & Awards" title="활동 · 수상">
            <ItemList items={ACTIVITIES} />
          </Section>

          <Section label="Education" title="학력">
            <ItemList items={EDUCATION} />
          </Section>

          <footer className={styles.footer}>
            <a href="mailto:eeheueklf@gmail.com">Email</a>
            <a href="https://github.com/eeheueklf" target="_blank" rel="noopener noreferrer">Github</a>
          </footer>
        </div>
      </div>
    </Layout>
  );
}
