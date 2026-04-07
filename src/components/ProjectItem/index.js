import React, { useState } from 'react';
import styles from './index.module.css';
import { LinkIcon, BookIcon } from '../Icons';
import Modal from '../Modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const TECH_ICONS = {
  'React': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/react-VS4Vwy6It1uAZy63ihXuYvHqqYkY1X.png',
  'TypeScript': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/typescript-50YJFG5dzDLgPyvDvGxy6XZ6oMqjKi.png',
  'Redux': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/Redux-OPRBQPUl3kg0BnNpys48ZbhxE3zWJO.png',
  'Figma': 'https://lh8zlkkhlslw0zyz.public.blob.vercel-storage.com/skills/figma-IiFO7yrdgnjBSjpxsCokIusUg6AoGO.png',
  'TailwindCSS' : '/img/tailwind.png',
  'Next.js': 'https://cdn.worldvectorlogo.com/logos/next-js.svg',
  'Jest': '/img/jest.png',
  'Supabase': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg',
  'Vercel': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg',
};

export function ProjectItem({ date, title, description, badges = [], links = [], children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readmeHtml, setReadmeHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentRawBaseUrl, setCurrentRawBaseUrl] = useState('');


const handleLinkClick = async (e, link) => {
  if (link.label.toLowerCase() === 'readme') {
    e.preventDefault();
    setIsModalOpen(true);
    setIsLoading(true);

    const rawUrl = link.href
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');
    
    const baseUrl = rawUrl.substring(0, rawUrl.lastIndexOf('/') + 1);
    setCurrentRawBaseUrl(baseUrl);

    try {
      const response = await fetch(rawUrl);
      const text = await response.text();
      setReadmeHtml(text);
    } catch (err) {
      setReadmeHtml('README를 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }
};

  return (
    <div className={styles.projectItem}>
      <div className={styles.dateSection}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
        <p className={styles.dateText}>{date}</p>
      </div>

      <div className={styles.contentSection}>
        <p className={styles.title}><strong>{title}</strong></p>
        <p className={styles.description}>{description}</p>

        {links.length > 0 && (
          <ul className={styles.linkList}>
            {links.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link)}
                  className={styles.link}
                  target="_blank" 
                  rel="noreferrer"
                >
                  {link.label.toLowerCase() === 'readme' ? <BookIcon /> : <LinkIcon />}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.badgeList}>
          {badges.map((tech) => {
            const iconUrl = TECH_ICONS[tech];
            return (
              <div key={tech} className={styles.skillIconWrapper}>
                {iconUrl ? (
                  <>
                    <img src={iconUrl} alt={tech} className={styles.skillImage} />
                    <span className={styles.skillTooltip}>{tech}</span>
                  </>
                ) : (
                  <span className={styles.badge}>{tech}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.markdownContent}>
          {children}
        </div>
      </div>

<Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  title={`${title} README`}
>
  <div className={styles.readmeContent}>
    {isLoading ? (
      <p>README를 가져오는 중...</p>
    ) : (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} 
        components={{
          img: ({node, ...props}) => (
            <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} alt="readme-img" />
          ),
          table: ({node, ...props}) => (
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0' }} {...props} />
          ),
          th: ({node, ...props}) => (
            <th style={{ border: '1px solid rgba(var(--hiri-foreground), 0.2)', padding: '8px', background: 'rgba(var(--hiri-foreground), 0.05)' }} {...props} />
          ),
          td: ({node, ...props}) => (
            <td style={{ border: '1px solid rgba(var(--hiri-foreground), 0.2)', padding: '8px' }} {...props} />
          )
        }}
      >
        {readmeHtml}
      </ReactMarkdown>
    )}
  </div>
</Modal>
    </div>
  );
}