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
  return (
    <Layout title="𝙷𝚘𝚖𝚎" description="프론트엔드 개발블로그">
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {shouldRenderSidebarDesktop  && <HomeSidebar/>}
        <main style={{ flex: 1, padding: '2rem' }}>
          {/* <HomepageHeader /> */}
          <Content/>
          <section>
            <h2>메인 콘텐츠 영역</h2>
            <p>여기에 홈페이지 내용을 넣으세요.</p>
          </section>
        </main>
      </div>
    </Layout>
  );
}