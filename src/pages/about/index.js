import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Heading from '@theme/Heading';
import { useEffect, useState } from 'react';

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
      '좋은 경험은 큰 기능보다 매일 닿는 동선에서 결정된다고 생각합니다. 바로가기 패널부터 버튼 하나까지, 유저가 더 편하고 직관적으로 사용할 수 있도록 개발합니다.',
      '"빠른 것 같다"는 느낌을 믿지 않습니다. LCP·CLS·모니터링 도구로 수치를 먼저 확인한 뒤에 코드를 건드리고, 개선 후에도 같은 지표로 다시 재서 결과를 증명합니다.',
      '유저 피드백은 기능 요청이 아니라 제품의 다음 방향이라고 생각합니다. 1인 운영 중에도 피드백 35건 이상을 직접 수집해 서비스에 반영했습니다.',
    ],
  },
  {
    heading: '손이 덜 가도록 자동화하고, 체계적으로 만듭니다.',
    items: [
      '사람이 매번 확인해야 하는 일은 결국 놓치게 된다고 생각합니다. 어드민을 열어야 처리하던 명예의 전당 인증 신청을, Insert 시점에 Discord 웹훅으로 자동 전송해 모바일에서 승인·반려까지 끝낼 수 있게 바꿨습니다.',
      '규칙 없는 코드는 미래의 저와 다음 사람에게 업보를 남긴다고 생각합니다. 린트·타입·컴포넌트 패턴 같은 규칙을 먼저 정하고 그 위에서 코드를 작성해, 사람의 집중력이 아니라 구조가 품질을 지키게 만듭니다.',
      '쉬운 해법으로 타협하면 결국 유저가 그 비용을 치른다고 생각합니다. 곱셈 계산기였던 연금 도구가 자원 제약 최적화 문제로 번지자, 패치로 버티던 로직을 ILP solver로 재설계하고 brute force 참조 구현으로 정확도·성능까지 직접 검증했습니다.',
    ],
  },
];
const PROJECTS = [
  {
    name: '띵타운',
    sub: '개인 프로젝트 (기획/개발/운영) · 2026. 05 - 재직중',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS', 'Vercel', 'Cloudflare CDN', 'Discord OAuth 2.0'],
    desc: '띵타이쿤 게임 플레이어를 위한 유틸리티·커뮤니티 플랫폼입니다. 일 평균 방문자 400명 규모로 혼자 운영하며, 유저 피드백 30건 이상을 직접 수집해 서비스에 반영하고 있습니다.',
    blocks: [
      {
        heading: '계산 방식을 직접 검증하며 두 번 다시 설계했습니다.',
        items: [
          <>타 서비스 계산기가 입력값이 늘수록 10분 이상 걸리는 문제를 Ruin &amp; Recreate 휴리스틱으로 개선했으나, 무작위로 해를 부수고 다시 만드는 방식이라 실행마다 결과가 달라지는 일관성 문제 발생</>,
          "선형계획법의 꼭짓점을 Cramer's Rule로 직접 계산하는 방식으로 전환해 결과를 고정했지만, 1,000개 테스트 케이스로 검증한 결과 정수 조건을 반영하지 못해 최적해는 11%에 그쳤고 9%는 재료가 부족해 실제로 실행할 수 없는 결과였음",
          <>생산 계획 문제와 같은 형태라는 점에 착안해 <b>정수 선형계획법(ILP)으로 재설계, 최적해 비율 11% → 100%</b>, 계산 시간 평균 1ms 이내, 동일 입력에 항상 같은 최적해 보장</>,
        ],
      },
      {
        heading: '운영 데이터로 숨은 비용을 찾아 끊어냈습니다.',
        items: [
          'Edge Request가 월 300만 건으로 Vercel 무료 플랜 한도(100만 건)의 3배를 넘겨 서비스가 2~3일 중단되자, 유료 전환 대신 원인 해결을 선택',
          'Vercel Observability로 요청을 추적해 중복 robots.txt와 불필요한 prefetch를 정리하고, next/image를 거치는 이미지 요청이 주 원인임을 확인',
          <>이미지를 <b>Cloudflare R2 + CDN으로 옮겨 Edge Request를 월 300만 → 50만 건(약 87%)</b>으로 줄이고, 무료 플랜 한도 안에서 운영 유지</>,
        ],
      },
      {
        heading: 'React Query 기반 인증 상태 단일 소스 설계로 앱 전역 52개 지점의 중복 요청 제거',
        items: [
          '컴포넌트마다 Supabase 세션과 프로필을 따로 불러와, 앱 전역 52곳에서 같은 조회가 반복되던 구조',
          <><code>useUser</code> 훅 하나로 세션 조회와 프로필 수정 6종(닉네임·직업 등) 뮤테이션을 통합하고 React Query <code>staleTime</code> 30분을 적용해, 한 번 불러온 로그인 정보를 앱 전체가 함께 사용 (수정·로그아웃 시에는 캐시를 바로 갱신)</>,
          <>로그인 직후 <code>auth.getUser()</code>와 <code>profiles upsert</code>를 한 흐름으로 묶어 프로필 누락 케이스 사전 차단</>,
          '브라우저 Supabase 클라이언트는 싱글턴으로 재사용, 매 요청 인스턴스 생성 방지',
        ],
      },
      {
        heading: '유저가 매번 반복하던 수고를 덜어냈습니다.',
        items: [
          '기기 변경·브라우저 초기화 시 스킬트리 설정이 사라지는 문제를 비로그인은 localStorage, 로그인은 DB에 저장하도록 나눠 해결, 로그인 유저는 어느 기기에서든 같은 설정 유지 (값이 다르면 DB 우선)',
          '스킬을 연달아 선택할 때마다 나가던 저장 요청을 1500ms Debounce로 묶어 요청 1번으로 처리하고, 페이지를 나갈 때는 대기 중인 저장을 즉시 실행해 마지막 변경까지 보존',
          <>메뉴를 거치지 않고 자주 쓰는 페이지로 바로 가도록 즐겨찾기 → 최근 방문 → 직업별 기본값 순으로 슬롯을 채우는 Quick Access 패널 구현, <b>로그인 유저의 약 40%가 사용</b> (Amplitude 기준)</>,
        ],
      },
      {
        heading: '1인 운영을 자동화로 지탱했습니다.',
        items: [
          <>유저가 게임 내 도구 강화 정보를 등록하면 관리자가 검토하는 구조에서, 신청이 들어오는 즉시 Discord Webhook으로 알림이 오게 해 사이트를 계속 지켜보지 않고도 <b>누적 357건 처리</b></>,
          '승인·반려를 어드민 화면에서 두 번의 클릭으로 끝나게 만들고, 반려할 때는 사유를 목록에서 고르게 해 유저가 이유를 보고 바로 고쳐 다시 신청할 수 있도록 함',
        ],
      },
    ],
    links: [{ label: 'Demo ↗', href: 'https://ddingtown.vercel.app/' }],
  },
  {
    name: 'Noiton',
    sub: '개인 프로젝트 · 2026. 01 - 2026. 03',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
    desc: '복잡한 노션 템플릿을 자유롭게 공유하고 체계적으로 탐색하는 플랫폼입니다. 단순한 파일 공유가 아니라, 생산성 노하우를 영감으로 주고받는 커뮤니티 공간을 지향했습니다.',
    blocks: [
      {
        heading: '초기 렌더링 성능을 수치로 끌어내렸습니다.',
        items: [
          '메인 페이지에서 템플릿 썸네일과 메인 배너가 한꺼번에 로드되면서 LCP가 모바일 18.2초, 데스크탑 3.0초까지 지연 (Lighthouse 기준)',
          '화면 상단 핵심 이미지만 priority로 먼저 불러오고 sizes·quality로 이미지 용량을 줄였으며, 첫 화면에 필요 없는 검색바는 next/dynamic으로 초기 JS 번들에서 분리',
          <><b>LCP 모바일 18.2s → 6.6s(약 64%), 데스크탑 3.0s → 1.1s(약 63%) 단축</b></>,
        ],
      },
      {
        heading: '데이터 페칭을 서버 컴포넌트에 위임하는 구조로 설계했습니다.',
        items: [
          '템플릿 목록·카테고리 조회처럼 초기 렌더에 필요한 질의는 서버 컴포넌트에서 수행해, 클라이언트는 Supabase SDK 없이 HTML만 받는 구조로 시작',
          '좋아요·업로드처럼 사용자 상호작용이 필요한 호출만 브라우저 Supabase 클라이언트로 분리, 접근 제어는 Supabase RLS에 위임',
          '세션은 NextAuth의 httpOnly 쿠키로 유지해 스크립트에서 토큰을 읽을 수 없는 구조 확보',
        ],
      },
      {
        heading: '주소창을 상태 저장소로 삼아 탐색 UX를 개선했습니다.',
        items: [
          '카테고리가 깊어질수록 현재 위치를 잃고, 새로고침·링크 공유 시 필터가 초기화되는 문제를 URL 기반 상태 관리로 해결',
          <>현재 위치는 경로 세그먼트(<code>/templates/[[...category]]</code>), 정렬 필터는 쿼리스트링(<code>?sort=</code>)에 담아 주소 자체를 데이터로 만들고, 거쳐온 단계는 Breadcrumb으로 노출</>,
          '카테고리/필터 상태에 한해 전역 상태 저장소 없이 공유 가능한 URL 구조 완성, 어떤 링크로도 의도한 화면에 바로 도달',
        ],
      },
      {
        heading: '실패 영향이 작은 동작에 낙관적 업데이트를 적용했습니다.',
        items: [
          <>'좋아요'처럼 실패해도 피해가 크지 않은 인터랙션에 TanStack Query의 <code>onMutate</code>/<code>onError</code> 롤백 패턴을 적용해 즉각적 피드백 제공</>,
          '서버 왕복을 기다리지 않고 UI가 먼저 반응, 실패 시 이전 값으로 안전하게 되돌아가는 흐름 확보',
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
    sub: '2인 프로젝트 · Frontend Developer · 2025. 08 - 2025. 10',
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Hangul.js', 'Web Audio API', 'Jest'],
    desc: '사용자의 타수와 정확도를 실시간으로 측정해 시각화하는 한국어 타자 연습 어플리케이션입니다. 잦은 상태 변화와 오디오 재생 등 브라우저 부하가 높은 환경에서도 끊김 없는 사용자 경험을 제공하는 데 집중했습니다.',
    blocks: [
      {
        heading: '끊김 없는 실시간 타이핑 경험을 위해 연산을 다듬었습니다.',
        items: [
          '매 입력마다 자소 분리 로직이 실행되고 100ms 타이머로 무의미한 연산이 반복되며 텍스트가 길어질수록 입력 지연이 발생하는 문제를 확인',
          <><code>useMemo</code>로 타이머 상태와 무관하게 실제 입력이 변할 때만 타수 계산이 실행되도록 캐싱, <code>setInterval</code>은 <code>useEffect</code> Cleanup으로 언마운트·연습 종료 시 확실히 정리</>,
          '긴 문장 입력에도 CPU 점유율을 안정적으로 유지',
        ],
      },
      {
        heading: 'Web Audio API로 저지연 사운드를 구현했습니다.',
        items: [
          <>기존 <code>&lt;audio&gt;</code> 태그 방식이 브라우저 오디오 스트리밍 한계로 빠른 타이핑을 따라오지 못해 사운드 밀림이 발생</>,
          '효과음 데이터를 메모리에 미리 로드해 재생 시점의 디스크 I/O를 제거하고, 메인 렌더링 스레드와 분리된 비동기 재생으로 즉각 피드백 구현',
          '초당 10타 이상의 빠른 입력에도 리드미컬한 UX 완성',
        ],
      },
      {
        heading: '성능 지표를 코드 구조로 관리했습니다.',
        items: [
          '커스텀 키보드 컴포넌트의 복잡한 DOM과 스타일 연산이 하이드레이션을 지연시키며 상단 콘텐츠가 밀리는 Layout Shift 발생',
          '실제 키보드와 동일한 높이의 Skeleton UI를 만들고 Suspense fallback으로 적용, 리소스가 준비되는 동안 영역을 미리 점유',
          <><b>CLS 0.137 → 0, Lighthouse 기준 0 달성</b></>,
        ],
      },
      {
        heading: '핵심 로직의 신뢰성을 테스트로 담보했습니다.',
        items: [
          <>정확도·타수 계산 로직을 UI에서 분리해 Jest 단위 테스트 작성, 겹받침·쌍자음과 0 나누기 같은 엣지 케이스까지 포함해 <b>라인·분기 커버리지 100%</b></>,
          <><code>FileReader</code> + <code>TextDecoder</code> 기반 클라이언트 파싱으로 대용량 텍스트 로드 시 메인 스레드 차단 방지, 서버 부하도 함께 감소</>,
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
  return (
    <article className={styles.project}>
      <div className={styles.projectHeader}>
        <h3 className={styles.projectTitle}>{project.name}</h3>
        <p className={styles.projectSub}>{project.sub}</p>
        <div className={styles.stack}>
          {project.stack.map(s => <span key={s} className={styles.stackChip}>{s}</span>)}
        </div>
      </div>
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
