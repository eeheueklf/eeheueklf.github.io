
import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import '../index.module.css'
function HomeSideBar() {
  return (
    <aside className={styles.homepageSidebar} >
    <div className={styles.searchContainer}>
        <div className={styles.LogoContainer}>
        <img src="/img/favicon.ico" alt="Logo" />
        <span>히리로그</span>
        </div>
    </div>
    <nav aria-label='Home sidebar' class='menu'>
        <ul class='menu__list'>
            <li>
                <a class="menu__link" href="/docs/intro">유히리 개발 아카이브</a>
            </li>
            <li>
                <a class="menu__link" href="/blog">유히리 데일리 로그</a>
            </li>
        </ul>
    </nav>

    </aside>
  );
};
export default React.memo(HomeSideBar);
