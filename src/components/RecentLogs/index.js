import React from 'react';
import Link from '@docusaurus/Link';
import recentLogs from '@site/src/data/recent-blogs.json';
import styles from './index.module.css';

export default function RecentLogs() {
  console.log(recentLogs)
  return (
    <ul className={styles.postList}>
      {recentLogs.map((doc, idx) => (
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