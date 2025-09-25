import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {useWindowSize} from '@docusaurus/theme-common';
import Content from './intro.mdx';


import Heading from '@theme/Heading';
import styles from './index.module.css';
import HomeSidebar from './HomeSidebar';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const windowSize = useWindowSize();
  const shouldRenderSidebarDesktop =
    windowSize === 'desktop' || windowSize === 'ssr';
  const { blogCount, docsCount, totalCount } = siteConfig.customFields;

  const startDay = new Date('2025-07-24')
  const today = new Date();
  const diffDate = Math.floor(Math.abs((startDay.getTime() - today.getTime())/(1000*60*60*24)))
  return (
    <Layout title="𝙷𝚘𝚖𝚎" description="프론트엔드 개발블로그">
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <HomeSidebar/>
        <main style={{ flex: 1, padding: '2rem' }}>
          {/* <HomepageHeader /> */}
          <Content/>
          <section>
            <div>
              📚 Docs: {docsCount} <br />
              📝 Blog: {blogCount} <br />
              🔢 총 포스팅 {totalCount} <br/>
              블로그 시작한지 {diffDate}일
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
