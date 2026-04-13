import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {useWindowSize} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';

import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import RecentLogs from '../components/RecentLogs';
import RecentDocs from '../components/RecentDocs';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className="container">
      <header className="heroBanner">
          <Heading as="h1" className="hanna-text">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className="hero__description">화면 너머의 구조를 설계합니다.</p>
      </header>
    </div>
  );
}

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14">
    <path
      d="M21.44 11.05l-8.49 8.49a5 5 0 01-7.07-7.07l8.49-8.49a3 3 0 114.24 4.24l-8.49 8.49a1 1 0 01-1.41-1.41l7.78-7.78"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const { blogCount, docsCount } = siteConfig.customFields;

  const docsHref = useBaseUrl('/docs');
  const blogHref = useBaseUrl('/blog');
  const resumeHref = useBaseUrl('/resume');

  const startDay = new Date('2025-07-24')
  const today = new Date();
  const diffDate = Math.floor(Math.abs((startDay.getTime() - today.getTime())/(1000*60*60*24)))
  
  return (
    <Layout description="프론트엔드 개발블로그">
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <main>
          <HomepageHeader />
          <section className="container">
            <Heading as="h2" className="menuHref">
              <Link href={blogHref}>Logs</Link> 
            </Heading>
            <RecentLogs />
            <Heading as="h2" className="menuHref">
              <Link href={docsHref}>Docs</Link> 
            </Heading>
            <RecentDocs />
            <Heading as="h2" className="menuHref">
              activities
            </Heading>
              <ul className="contact-list">
                <li>
                  시작한지 {diffDate}일
                </li>
                <li>
                  작성한 글 {blogCount+docsCount}+개
                </li>
                <li>🥳
                  <Link href={resumeHref} className="about-link">
                    about me
                  </Link>
                </li>
              </ul>
            <Heading as="h2" className="menuHref">
              contact
            </Heading>
            <ul className="contact-list">
              <li>
                <Link to="https://github.com/eeheueklf" className="contact-link">
                  <span className="link-icon"><LinkIcon /></span>
                  GitHub
                </Link>
              </li>

              <li>
                <Link to="mailto:eeheueklf@email.com" className="contact-link">
                  <span className="link-icon">
                    <span className="link-icon"><LinkIcon /></span>
                  </span>
                  eeheueklf@email.com
                </Link>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </Layout>
  );
}
