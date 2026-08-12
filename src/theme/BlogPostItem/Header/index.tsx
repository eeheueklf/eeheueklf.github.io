/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import BlogPostItemHeaderTitle from '@theme/BlogPostItem/Header/Title';
import BlogPostItemHeaderInfo from '@theme/BlogPostItem/Header/Info';
import styles from './styles.module.css';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogPostItemHeader(): JSX.Element {
  const {metadata, frontMatter} = useBlogPost();
  const {date} = metadata;
  const status = (frontMatter as Record<string, unknown>)?.status as string | undefined;

  const statusClassMap: Record<string, string> = {
    '비행 중': styles.statusFlying,
    '순항 중': styles.statusCruising,
    '착륙 완료': styles.statusLanded,
  };

  return (
    <header className={styles.header}>
      <div className={styles.ticket}>
        <div className={styles.ticketTop}>
          {status ? (
            <span className={clsx(styles.statusTag, statusClassMap[status])}>
              ● {status}
            </span>
          ) : (
            <span />
          )}
          <time className={styles.ticketDate} dateTime={date}>{formatDate(date)}</time>
        </div>
        <BlogPostItemHeaderTitle />
        <BlogPostItemHeaderInfo />
      </div>
    </header>
  );
}
