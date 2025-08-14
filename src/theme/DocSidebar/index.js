/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useWindowSize} from '@docusaurus/theme-common';
import DocSidebarDesktop from '@theme/DocSidebar/Desktop';
import DocSidebarMobile from '@theme/DocSidebar/Mobile';
import styles from './style.module.css';

export default function DocSidebar(props) {
  const {siteConfig} = useDocusaurusContext();
  const windowSize = useWindowSize();
  // Desktop sidebar visible on hydration: need SSR rendering
  const shouldRenderSidebarDesktop =
    windowSize === 'desktop' || windowSize === 'ssr';
  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRenderSidebarMobile = windowSize === 'mobile';
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
  return (
    <>
      <div className={styles.searchContainer}>
        <img src="/img/favicon.ico" alt="Logo" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="문서 검색하기"
          onInput={handleSearch}
        />
      </div>
      {shouldRenderSidebarDesktop && <DocSidebarDesktop {...props} />}
      {shouldRenderSidebarMobile && <DocSidebarMobile {...props} />}
    </>
  );
}
