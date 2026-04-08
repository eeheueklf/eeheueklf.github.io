import React, { useState } from 'react';
import styles from './index.module.css';

export default function Modal({ isOpen, onClose, title, children }) {
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!isOpen) return null;

  const handleBodyClick = (e) => {
    if (e.target.tagName === 'IMG') {
      e.stopPropagation(); 
      setZoomedImage(e.target.src);
    }
  };

  const closeZoom = (e) => {
    e.stopPropagation();
    setZoomedImage(null);
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
          </div>
          <div className={styles.modalBody} onClick={handleBodyClick}>
            {children}
          </div>
        </div>
      </div>
      {zoomedImage && (
        <div className={styles.imageZoomOverlay} onClick={closeZoom}>
          <img src={zoomedImage} alt="Zoomed" className={styles.zoomedImage} />
        </div>
      )}
    </>
  );
}