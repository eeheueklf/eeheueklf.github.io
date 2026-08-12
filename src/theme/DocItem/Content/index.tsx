/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/DocItem/Content';
import {useWindowSize} from '@docusaurus/theme-common';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return { hidden, desktop };
}

function useSyntheticTitle(): string | null {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

export default function DocItemContent({children}: Props): JSX.Element {
  const syntheticTitle = useSyntheticTitle();
  const {metadata: {lastUpdatedAt, tags}} = useDoc();
  const docTOC = useDocTOC();

  const lastUpdated = lastUpdatedAt
    ? (() => {
        const d = new Date(lastUpdatedAt * 1000);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
      })()
    : null;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header className={styles.header}>
          <div className={styles.ticket}>
            <div className={styles.ticketTop}>
              <span />
              {lastUpdated && (
                <time className={styles.ticketDate}>{lastUpdated}</time>
              )}
            </div>
            <Heading as="h1" className="hanna-text">{syntheticTitle}</Heading>
            {tags && tags.length > 0 && (
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>TAGS</span>
                  <ul className={styles.tagList}>
                    {tags.map((tag) => (
                      <li key={tag.permalink}>
                        <Link to={tag.permalink} className={styles.tag}>
                          {tag.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </header>
      )}
      {docTOC.desktop}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
