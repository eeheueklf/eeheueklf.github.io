import React from 'react';
import Link from '@docusaurus/Link';
import recentLogs from '@site/src/data/recent-blogs.json';
import styles from '../index.module.css';


function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function RecentLogs() {
  return (
    <ul className={styles.postList}>
      {recentLogs.map((doc, idx) => (
        <li key={idx} className={styles.postItem}>
          <time className={styles.postDate}>
            {formatDate(doc.date)}
          </time>
          <Link to={doc.path} className={styles.postTitle}>{doc.title}</Link>
        </li>
      ))}
    </ul>
  );
}
