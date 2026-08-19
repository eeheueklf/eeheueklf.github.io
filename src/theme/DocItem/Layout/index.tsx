/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import type {Props} from '@theme/DocItem/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function DocItemLayout({children}: Props): JSX.Element {
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
        <Link href={blogHref} className={styles.topNavLink}>log</Link>
        <Link href={docsHref} className={styles.topNavLink}>docs</Link>
        <Link href={resumeHref} className={styles.topNavLink}>about</Link>
      </nav>
      <main>
        <article className="container">
          <DocItemContent>{children}</DocItemContent>
          <DocItemFooter />
        </article>
      </main>
      <footer className={styles.footer}>
        <span className={styles.footerText}>© 2026 히리로그</span>
      </footer>
    </div>
  );
}
