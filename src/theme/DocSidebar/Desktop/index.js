/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
// import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import IconHome from '@theme/Icon/Home';
import IconDocs from '@theme/Icon/WordWrap';
import IconBlog from '@theme/Icon/DarkMode';
import IconSearch from '../../Icon/Search.tsx';
import Link from '@docusaurus/Link';
function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}) {
  const [openSearch, setOpenSearch] = useState(false);


  const {
    navbar: {hideOnScroll},
    docs: {
      sidebar: {hideable},
    },
  } = useThemeConfig();
    const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.menu__list-item');

    items.forEach((item) => {
      const link = item.querySelector('.menu__link');
      const text = link ? link.textContent.toLowerCase() : '';

      const childLinks = item.querySelectorAll('.menu__link');
      const matchesChild = Array.from(childLinks).some((child) =>
        child.textContent.toLowerCase().includes(query)
      );

      if (text.includes(query) || matchesChild) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  };

  const homeHref = useBaseUrl('/');
  const docsHref = useBaseUrl('/docs/intro');
  const blogHref = useBaseUrl('/blogs/intro');

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}>
      <div className={styles.searchContainer}>
        <div className={styles.LogoContainer}>
          <img src="/img/favicon.ico" alt="Logo" />
          <span>히리로그</span>
        </div>
      </div>
      {openSearch && 
        <input
          type="text"
          className={styles.searchInput}
          placeholder="문서 검색하기"
          onInput={handleSearch}
        />
      }
      
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <Content path={path} sidebar={sidebar} />
    </div>
  );
}
export default React.memo(DocSidebarDesktop);
