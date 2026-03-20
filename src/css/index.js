import React from 'react';
import Link from '@docusaurus/Link';
import recentDocs from '@site/src/data/recent-docs.json';
import styles from './index.module.css';

export default function RecentDocs() {
  return (
    <ul className={styles.postList}>
      {recentDocs.map((doc, idx) => (
        <li key={idx} className={styles.postItem}>
          <Link to={doc.path} className={styles.postTitle}>{doc.title}</Link>
          <time className={styles.postDate}>
            {new Date(doc.date).toLocaleDateString('ko-KR')}
          </time>
        </li>
      ))}
    </ul>
  );
}