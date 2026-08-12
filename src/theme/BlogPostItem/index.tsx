/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItemContainer from '@theme/BlogPostItem/Container';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import type { Props } from '@theme/BlogPostItem';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? 'margin-bottom--xl' : undefined;
}

export default function BlogPostItem({
  children,
  className,
}: Props): JSX.Element {
  const containerClassName = useContainerClassName();
  const homeHref = useBaseUrl('/');
  const iconSrc = useBaseUrl('/img/logo.png');
  const blogHref = useBaseUrl('/blog');
  const docsHref = useBaseUrl('/docs');
  const resumeHref = useBaseUrl('/resume');

  return (
    <div className="page-wrapper">
      <nav className={styles.topNav}>
        <Link href={homeHref} className={styles.topNavLogo}>
          <img src={iconSrc} alt="히리로그" className={styles.topNavLogoImg} />
        </Link>
        <span className={styles.topNavDivider} />
        <Link href={blogHref} className={styles.topNavLink}>logs</Link>
        <Link href={docsHref} className={styles.topNavLink}>docs</Link>
        <Link href={resumeHref} className={styles.topNavLink}>about</Link>
      </nav>
      <main>
        <article>
          <BlogPostItemContainer className={clsx('container', containerClassName, className)}>
            <BlogPostItemHeader />
            <BlogPostItemContent>{children}</BlogPostItemContent>
          </BlogPostItemContainer>
        </article>
      </main>
      <footer className={styles.footer}>
        <span className={styles.footerText}>© 2026 히리로그</span>
      </footer>
    </div>
  );
}
