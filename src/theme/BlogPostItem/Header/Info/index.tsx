/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/BlogPostItem/Header/Info';
import styles from './styles.module.css';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogPostItemHeaderInfo({
  className,
}: Props): JSX.Element {
  const {metadata} = useBlogPost();
  const {date, readingTime, tags} = metadata;

  return (
    <div className={clsx(styles.meta, className)}>
      <div className={styles.metaItem}>
        <span className={styles.metaLabel}>DATE</span>
        <time className={styles.metaValue} dateTime={date} itemProp="datePublished">
          {formatDate(date)}
        </time>
      </div>

      {typeof readingTime !== 'undefined' && (
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>READ</span>
          <span className={styles.metaValue}>{Math.ceil(readingTime)} min</span>
        </div>
      )}

      {tags.length > 0 && (
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
      )}
    </div>
  );
}
