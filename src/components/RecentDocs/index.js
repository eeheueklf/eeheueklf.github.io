import React from 'react';
import Link from '@docusaurus/Link';
import recentDocs from '@site/src/data/recent-docs.json';
import styles from '../index.module.css';

function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function RecentDocs() {
  const sortedDocs = [...recentDocs].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <ul className={styles.postList}>
      {sortedDocs.slice(0, 5).map((doc, idx) => (
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