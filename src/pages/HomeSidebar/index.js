
import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import '../index.module.css'
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconHome from '@theme/Icon/Home';
import IconDocs from '@theme/Icon/WordWrap';
import IconBlog from '@theme/Icon/DarkMode';
import IconSearch from '../../theme/Icon/Search.tsx';

function HomeSideBar() {
    const homeHref = useBaseUrl('/');
    const docsHref = useBaseUrl('/docs/intro');
    const blogHref = useBaseUrl('/blogs/intro');

  return (
    <aside className={styles.homepageSidebar} >
    <div className={styles.searchContainer}>
        <div className={styles.LogoContainer}>
            <img src="/img/favicon.ico" alt="Logo" />
            <span>히리로그</span>
        </div>
    </div>
    <ol className={styles.iconContainer}>
        <li>
          <Link href={homeHref}>
            <IconHome className={styles.collapseSidebarHomeIcon}/>𝙷𝚘𝚖𝚎
          </Link>
        </li>
        <li>
          <Link href={docsHref}>
            <IconDocs className={styles.collapseSidebarHomeIcon}/>𝙳𝚘𝚌𝚜
          </Link>
        </li>
        <li>
          <Link href={blogHref}>
            <IconBlog className={styles.collapseSidebarHomeIcon}/>𝙱𝚕𝚘𝚐
          </Link>
        </li>
    </ol>
    {/* <nav aria-label='Home sidebar' class='menu'>
        <ul class='menu__list'>
            <li class='menu__list-item'>
                <a class="menu__link" href="/docs/intro">유히리 개발 아카이브</a>
            </li>
            <li class='menu__list-item'>
                <a class="menu__link" href="/blogs/intro">유히리 데일리 로그</a>
            </li>
        </ul>
    </nav> */}

    </aside>
  );
};
export default React.memo(HomeSideBar);
