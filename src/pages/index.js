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
    <header className="heroBanner">
      <div className="container">
        <Heading as="h1" className="hanna-text">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="hero__description">화면 너머의 구조를 설계합니다.</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const { blogCount, docsCount } = siteConfig.customFields;

  const docsHref = useBaseUrl('/docs/intro');
  const blogHref = useBaseUrl('/blogs/intro');

  const startDay = new Date('2025-07-24')
  const today = new Date();
  const diffDate = Math.floor(Math.abs((startDay.getTime() - today.getTime())/(1000*60*60*24)))
  
  return (
    <Layout description="프론트엔드 개발블로그">
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <main style={{ flex: 1, padding: '2rem' }}>
          <HomepageHeader />
          <section className="container">
            <Heading as="h2" className="menuHref">
              <Link href={blogHref}>Logs</Link> {blogCount}
            </Heading>
            <RecentLogs />
            <Heading as="h2" className="menuHref">
              <Link href={docsHref}>Docs</Link> {docsCount} 
            </Heading>
            <RecentDocs />
            <Heading as="h2" className="menuHref">
              activities
            </Heading>
              시작한지 {diffDate}일
            <Heading as="h2" className="menuHref">
              contact
            </Heading>
          </section>
        </main>
      </div>
    </Layout>
  );
}
