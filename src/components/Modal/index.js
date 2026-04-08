import React, { useState } from 'react';
import styles from './index.module.css';

export default function Modal({ isOpen, onClose, children }) {
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!isOpen) return null;

  const handleBodyClick = (e) => {
    if (e.target.tagName === 'IMG') {
      e.stopPropagation(); 
      setZoomedImage(e.target.src);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className={styles.modalBody} onClick={handleBodyClick}>
            {children}
          </div>
        </div>
      </div>
      
      {zoomedImage && (
        <div className={styles.imageZoomOverlay} onClick={() => setZoomedImage(null)}>
          <img src={zoomedImage} alt="Zoomed View" className={styles.zoomedImage} />
        </div>
      )}
    </>
  );
}