/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Unlisted from '@theme/Unlisted';
import type {Props} from '@theme/DocItem/Layout';

import styles from './styles.module.css';

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: Props): JSX.Element {
  const docTOC = useDocTOC();
  
  const {
  frontMatter,
  metadata: { lastUpdatedAt, unlisted, title, tags },
} = useDoc();

  const lastUpdated = lastUpdatedAt
  ? (() => {
      const d = new Date(lastUpdatedAt * 1000);
      return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
    })()
  : null;

const colors = ['var(--cus-tag-color-first)',
   'var(--cus-tag-color-sec)',
    'var(--cus-tag-color-third)'];

  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        {unlisted && <Unlisted />}
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">
        {/* <div className={styles.docImageContainer}>
          <div className={styles.LogoContainer}>
              <img src="/icon/box.jpg" alt="Logo" />
          </div>
        </div> */}
        {lastUpdated && (
          <div className={styles.docDateContainer}>
            {title && <h3 className={styles.docTitle}>{title}</h3>}
            {lastUpdated}
            <div className={styles.docTags}>
              {tags.map((tag, idx) => (
                <div key={idx} className={styles.tagItem} style={{ backgroundColor: colors[idx % colors.length] }}>
                  {tag.label}
                </div>
              ))}
            </div>
          </div>
        )}
      {docTOC.desktop}
      
      </div>}
    </div>
  );
}
