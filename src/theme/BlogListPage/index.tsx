/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogListPage';

import styles from './styles.module.css'; 

function BlogListPageMetadata(props: Props): JSX.Element {
  const {metadata} = props;
  return <PageMetadata title={metadata.blogTitle} description={metadata.blogDescription} />;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const CLASS_CODES = [
  { label: 'LOG',    cls: styles.classLog },
  { label: 'DATA',   cls: styles.classData },
  { label: 'FILE',   cls: styles.classFile },
  { label: 'REPORT', cls: styles.classReport },
  { label: 'MEMO',   cls: styles.classMemo },
];

function BlogListPageContent(props: Props): JSX.Element {
  const {metadata, items} = props;
  const homeHref = useBaseUrl('/');

  return (
    <div className="page-wrapper">
        <main>
          <div className="container">
          <div className={styles.generatedIndexPage}>
          <header className="docsBanner">
            / <Link href={homeHref} className="docs__subtitle">홈</Link>
            <Heading as="h1" className="hanna-text">
              {metadata.blogTitle}
            </Heading>
          </header>

          <article>
            <section>
              <div className="menu__title">전체 포스트 ({items.length})</div>
              <ul className="menu__list">
                {items.map(({content: BlogPostContent}, idx) => {
                  const {metadata: postMetadata} = BlogPostContent;
                  const code = CLASS_CODES[idx % CLASS_CODES.length];
                  return (
                    <li key={postMetadata.permalink} style={{ margin: 0 }}>
                      <Link to={postMetadata.permalink} className="menu__link">
                        <span className={`${styles.classCode} ${code.cls}`}>{code.label}</span>
                        {postMetadata.title}
                        <span style={{ marginLeft: '10px', fontSize: '0.8em', opacity: 0.6 }}>
                          {formatDate(postMetadata.date)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </article>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}