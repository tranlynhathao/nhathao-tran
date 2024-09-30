import { useState, useEffect } from 'react';
import styles from '../../styles/structure/ScrollIndicator.module.scss';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className={styles.scrollIndicator}>
      <div className={styles.scrollIndicatorBar} style={{ height: `${scrollProgress}%` }} />
    </div>
  );
};

export default ScrollIndicator;
